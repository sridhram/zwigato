import React, { useEffect } from 'react'
import { getAllUsers } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../context/actions/userListActions';
import {UserCircleIcon, CheckCircleIcon, QuestionMarkCircleIcon} from '@heroicons/react/24/outline';

const DBUsers = () => {
  let usersList = useSelector((state) => state.userList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!usersList){
      const getUsersList = async () => {
        return await getAllUsers();
      }
      getUsersList().then((users) => {
        dispatch(setUserDetails(users));
        console.log(usersList);
      });
    }
    
  }, [dispatch, usersList] );
  return (
    !usersList ? <div>Loading...</div> : <>
      <aside className='flex flex-col gap-4 mt-4'>
        <section className='grid grid-flow-col gap-4 items-center grid-cols-usersListing font-semibold text-xl'>
          <span>Images</span>
          <span>User Name</span>
          <span>Email</span>
          <span>Activity Status</span>
        </section>
          {usersList.map((users) => {
            return (
              <section className='grid group grid-flow-col gap-4 p-2 rounded-md items-center grid-cols-usersListing hover:bg-gray-200' key={users.uid}>
                {users.photoURL ? <img className='w-10 h-10 rounded-md' src={users.photoURL} alt="product image" /> : <UserCircleIcon className='w-10 h-10 text-gray-500' />}
                <span>{users.displayName}</span>
                <div className='flex items-center'>
                  <span className='text-ellipsis'>{users.email}</span>
                  {users.emailVerified ? <CheckCircleIcon title='verified' className='w-5 h-5 text-green-500' /> : <QuestionMarkCircleIcon title='unverified' className='w-5 h-5 text-gray-500' /> }
                </div>
                <span className={` w-[125px] text-center p-2 rounded-md text-white ${!users.disabled ? ' bg-green-500 ' : ' bg-red-500 '}`}>{!users.disabled ? 'Enabled' : 'Disabled'}</span>
              </section>
            );
          })}
      </aside>
    </>
  )
}

export default DBUsers