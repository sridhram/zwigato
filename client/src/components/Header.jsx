import React, { useState } from 'react';
import {NavLink, Link, useNavigate} from 'react-router-dom';
import Logo from '../assets/logo.png'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getAuth, signOut } from 'firebase/auth';
import { menuAnimation } from '../animations';

const Header = () => {
    const user = useSelector(state => state.user);
    const [isImagePresent, setIsImagePresent] = useState(true);
    const navigate = useNavigate();
    const firebaseAuth = getAuth();

    const logout = async () => {
        try{
            
            await signOut(firebaseAuth);
            navigate('/login', { replace: true });
        }catch(err){
            console.log(err);
        }
    }

  return (
    <header className='flex px-8 py-4 gap-4 items-center shadow-md'>
        <NavLink className="p-1" to={"/"}>
            <img className='w-9 h-9' src={Logo} alt="logo" />
        </NavLink>
        <nav className='grow'>
            <ul className='flex gap-4 justify-end'>
                  <NavLink className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-[#ff6c6c]' : 'text-base' }`} to={"/"}>Home</NavLink>
                  <NavLink className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-[#ff6c6c]' : 'text-base' }`} to={"/menu"}>Menu</NavLink>
                  <NavLink className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-[#ff6c6c]' : 'text-base' }`} to={"/services"}>Services</NavLink>
                  <NavLink className={({ isActive }) => `text-lg ${isActive ? 'font-bold text-[#ff6c6c]' : 'text-base' }`} to={"/about"}>About Us</NavLink>
            </ul>
        </nav>
        <section className='flex gap-4 px-4'>
            <div className='relative p-1 cursor-pointer'>
                  <ShoppingCartIcon className='w-9 h-9' />
                  <div className='absolute top-0 right-0 w-4 h-4 text-xs flex items-center justify-center rounded-full text-white bg-red-500'>1</div>
            </div>
              <div className='p-1 cursor-pointer object-cover group'>
                {
                    user ? 
                        (user.picture && isImagePresent) ? 
                            <motion.img whileHover={{scale: 1.05}} referrerPolicy='no-referrer' className='w-9 h-9 rounded-full' src={user.picture} alt='user profile' onError={() => {setIsImagePresent(false);}} /> 
                        : 
                            <UserCircleIcon className='w-9 h-9 text-gray-700' />  
                    : 
                        <NavLink className='text-lg cursor-pointer hover:text-[#ff6c6c]' to={"/login"} >Login</NavLink>
                }
                  {
                    user && (
                          <motion.nav {...menuAnimation} className='absolute right-12 top-14 py-4 bg-[#ffd7d7] hidden group-hover:block rounded-md'>
                              <ul className='flex flex-col gap-1'>
                                  <Link className='px-4 py-1 hover:bg-[#ff6c6c] hover:text-white' to={"/dashboard"}>Dashboard</Link>
                                  <Link className='px-4 py-1 hover:bg-[#ff6c6c] hover:text-white' to={"/profile"}>My Profile</Link>
                                  <Link className='px-4 py-1 hover:bg-[#ff6c6c] hover:text-white' to={"/orders"}>Orders</Link>
                                  <button className='px-4 py-1 hover:bg-[#ff6c6c] hover:text-white text-start' onClick={logout}>Logout</button>
                              </ul>
                          </motion.nav>
                    )
                  }
            </div>
        </section>
    </header>
  )
}

export default Header