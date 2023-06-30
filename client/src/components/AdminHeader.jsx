import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, BellIcon, UserCircleIcon, ArrowLeftOnRectangleIcon} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { animateClick } from '../animations';
import { getAuth, signOut } from 'firebase/auth';
import { resetUserDetails } from '../context/actions/userActions';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const user = useSelector((state) => state.user);
    const [isImagePresent, setIsImagePresent] = useState(true);
    const navigate = useNavigate();
    const firebaseAuth = getAuth();
    const dispatch = useDispatch();
    const imgRef = useRef();
    const logoutRef = useRef();

    const logout = async () => {
        try {
            await signOut(firebaseAuth);
            dispatch(resetUserDetails());
            navigate('/login', { replace: true });
        } catch (err) {
            console.log(err);
        }
    }
    const showLogout = () => {
        imgRef.current.classList.add('hidden');
        logoutRef.current.classList.remove('hidden');
    }
    const hideLogout = () => {
        imgRef.current.classList.remove('hidden');
        logoutRef.current.classList.add('hidden');
    }
  return (
    <header className='flex justify-between p-2 items-center'>
        <span className='font-semibold text-xl'>{user?.name ? `Hello ${user.name},` : 'Hello User,'}</span>
        <section className='flex gap-2 items-center'>
            <div className='flex gap-2 items-center shadow-md p-2 rounded-md'>
                <MagnifyingGlassIcon className='w-5 h-5' />
                <input type="text" placeholder='Search' className='bg-transparent outline-none border-none' />
                <AdjustmentsHorizontalIcon title='Filters' className='w-5 h-5 cursor-pointer' />
            </div>
            <motion.div {...animateClick}>
                <BellIcon title='Notifications' className='w-10 h-10 p-2 shadow-md rounded-lg cursor-pointer' />
            </motion.div>
            <div onMouseEnter={showLogout} onMouseLeave={hideLogout}>
                <motion.div ref={imgRef} {...animateClick}>
                    {
                        (user?.picture && isImagePresent) ?
                            <motion.img whileHover={{ scale: 1.05 }} referrerPolicy='no-referrer' className='w-10 h-10 rounded-lg cursor-pointer' src={user.picture} alt='user profile' onError={() => { setIsImagePresent(false); }} />
                            :
                            <div>
                                <UserCircleIcon className='w-10 h-10 text-gray-700' />
                            </div>
                    }
                </motion.div>
                <motion.div ref={logoutRef} className='hidden'>
                    <ArrowLeftOnRectangleIcon onClick={logout} title='Log out' className='w-10 h-10 p-2 shadow-md rounded-lg cursor-pointer' />
                </motion.div>
            </div>
        </section>
    </header>
  )
}

export default AdminHeader