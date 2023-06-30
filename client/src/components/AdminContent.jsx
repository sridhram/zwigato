import React from 'react'
import AdminHeader from './AdminHeader'
import { Route, Routes } from 'react-router-dom'
import DBHome from './Dashboard/DBHome'
import DBUsers from './Dashboard/DBUsers'
import DBAddNewUsers from './Dashboard/DBAddNewUsers'
import DBItems from './Dashboard/DBItems'
import DBOrders from './Dashboard/DBOrders'

const AdminContent = () => {
  return (
      <section className='rounded-md shadow-lg grow p-4 bg-white'>
        <AdminHeader />
        <section>
            <Routes>
                  <Route path='/' element={<DBHome />} />
                  <Route path='/orders' element={<DBOrders />} />
                  <Route path='/items' element={<DBItems />} />
                  <Route path='/add-new-items' element={<DBAddNewUsers />} />
                  <Route path='/users' element={<DBUsers />} />
            </Routes>
        </section>
      </section>
  )
}

export default AdminContent