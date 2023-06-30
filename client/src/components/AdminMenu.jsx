import React from 'react'
import Logo from '../assets/Logo.png'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <aside className='min-w-[200px] rounded-md shadow-lg p-4 bg-white'>
        <NavLink to={"/"} className="flex items-center gap-2">
              <img className='w-10 h-10' src={Logo} alt="logo" />
              <span className='font-semibold'>City</span>
        </NavLink>
        <nav className='flex flex-col gap-6 mt-8'>
            <NavLink className={({ isActive }) => `text-lg relative ${isActive ? 'active-link font-bold text-[#ff6c6c]' : 'text-base'}`} to={"/dashboard/"}>Home</NavLink>
            <NavLink className={({ isActive }) => `text-lg relative ${isActive ? 'active-link font-bold text-[#ff6c6c]' : 'text-base'}`} to={"/dashboard/orders"}>Orders</NavLink>
            <NavLink className={({ isActive }) => `text-lg relative ${isActive ? 'active-link font-bold text-[#ff6c6c]' : 'text-base'}`} to={"/dashboard/items"}>Items</NavLink>
            <NavLink className={({ isActive }) => `text-lg relative ${isActive ? 'active-link font-bold text-[#ff6c6c]' : 'text-base'}`} to={"/dashboard/add-new-items"}>Add New Items</NavLink>
            <NavLink className={({ isActive }) => `text-lg relative ${isActive ? 'active-link font-bold text-[#ff6c6c]' : 'text-base'}`} to={"/dashboard/users"}>Users</NavLink>
        </nav>
    </aside>
  )
}

export default AdminMenu