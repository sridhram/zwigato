import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, Login } from './containers';
import {useDispatch} from "react-redux";
import { app } from './config/firebase.config';
import { setUserDetails } from './context/actions/userActions';
import { getAuth } from 'firebase/auth';
import { authenticateUser } from './api';
import loadingIcon from './assets/oval.svg'

function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged(async (credentials) => {
      if(credentials){
        const token = await credentials.getIdToken();
        const userData = await authenticateUser(token);
        dispatch(setUserDetails(userData));
        setIsLoading(false);
      }
    })
  }, [dispatch, firebaseAuth])

  return (
    <main className='w-screen min-h-screen grid'>
      {isLoading && 
        <div className='z-50 w-full fixed inset-0 bg-black grid place-content-center'>
          <img src={loadingIcon} alt="loading icon" />
        </div>
      }
      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
