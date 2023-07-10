import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../api';

const DBUsers = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const getUsersList = async () => {
      return await getAllUsers();
    }
    getUsersList().then((users) => setUsersList(users));
    
  }, [] );
  return (
    usersList.length == 0 ? <div>Loading...</div> : <>
      {usersList.map((user) => {
        return (
          <div key={user.uid}>{user.email}</div>
        )
      })}
    </>
  )
}

export default DBUsers