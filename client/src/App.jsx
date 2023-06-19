import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, Login } from './containers';

function App() {

  return (
    <main className='w-screen min-h-screen grid'>
      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
