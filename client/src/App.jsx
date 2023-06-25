import React, {useEffect, useState} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Main, Login } from './containers';
import {useDispatch, useSelector} from "react-redux";
import { app } from './config/firebase.config';
import { setUserDetails } from './context/actions/userActions';
import { getAuth } from 'firebase/auth';
import { authenticateUser } from './api';
import loadingIcon from './assets/oval.svg';
import Header from './components/Header';
import Alert from './components/Alert';

function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alert);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged(async (credentials) => {
      if(credentials){
        const token = await credentials.getIdToken();
        const userData = await authenticateUser(token);
        dispatch(setUserDetails(userData));
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      navigate('/login', { replace: true });
      
    })
  }, [dispatch, firebaseAuth])

  return (
    <>
      <main className='w-screen min-h-screen flex flex-col bg-login'>
        <Header />
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
      {alert?.type && <Alert alertType={alert?.type} message={alert?.message} />}
    </>
  )
}

export default App
