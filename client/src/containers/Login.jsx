import React, {useState} from 'react'
import Logo from '../assets/logo.png'
import {EnvelopeIcon, LockClosedIcon} from '@heroicons/react/24/solid'
import {motion} from 'framer-motion'
import {animateClick, fadeInOut} from '../animations'
import {signInWithPopup, getAuth, GoogleAuthProvider} from "firebase/auth"
import {app} from '../config/firebase.config'
import { authenticateUser } from '../api'

const InputCont = ({children, inputType, baseText, addAnimation=false}) => {
    return(
        addAnimation ?
            <motion.label {...fadeInOut} className='flex relative'>
                <input type={inputType} name={baseText.toLowerCase()} className='peer grow outline-[#ff6c6c] outline-none rounded-lg shadow-sm login-container px-4 py-2' />
                <span className='text-base login-container transition-all duration-300 absolute top-[8px] left-[30px] z-10 peer-focus:text-sm peer-focus:top-[-13px] peer-focus:left-[10px]'>{baseText}</span>
                {children}
            </motion.label>
        :
            <label className='flex relative'>
                <input type={inputType} name={baseText.toLowerCase()} className='peer grow outline-[#ff6c6c] outline-none rounded-lg shadow-sm login-container px-4 py-2' />
                <span className='text-base login-container transition-all duration-300 absolute top-[8px] left-[30px] z-10 peer-focus:text-sm peer-focus:top-[-13px] peer-focus:left-[10px]'>{baseText}</span>
                {children}
            </label>
    )
};

const ButtonContainer = ({ signUpBoolean, isSignupHandler }) => {
    return(
        <section>
            <div className='text-sm mb-2'>
                <span>{!signUpBoolean ? 'Dont have an account?' : 'Already have an account?'}&nbsp;</span>
                <motion.button {...animateClick} onClick={isSignupHandler} className='text-[#ff6c6c] font-semibold capitalize hover:underline'>{!signUpBoolean ? 'signup here' : 'login here'}</motion.button>
            </div>
            <button className='btn-primary'>{signUpBoolean ? 'Signup' : 'Login'}</button>
        </section>
    )
}

const Login = () => {
    const [isSignup, setIsSignup] = useState(false);

    const firebaseAuth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const googleLogin = async () => {
        await signInWithPopup(firebaseAuth, googleProvider);
        firebaseAuth.onAuthStateChanged(async (credentials) => {
            if(credentials){
                const token = await credentials.getIdToken();
                const userCredentials = await authenticateUser(token);
                console.log(userCredentials);
            }
        })
    }

    const toggleSignup = () => {
        event.preventDefault();
        setIsSignup(!isSignup);
    }
    const handleForm = () => {
        event.preventDefault();
        if (event.submitter.classList.contains("google-auth")){
            googleLogin();
        }else{
            //normal auth
        }
    }
  return (
      <aside className='bg-login w-full h-full grid place-items-center'>
        <form onSubmit={handleForm} className='rounded-lg shadow-md login-container flex flex-col gap-8 py-8 px-10 min-w-[400px]'>
            <img src={Logo} className='w-24 h-24 self-center' alt="product logo" />
              <h3 className='font-semibold self-center text-4xl'>{isSignup ? 'Signup' : 'Login' }</h3>
              <InputCont inputType="text" baseText="Email">
                  <EnvelopeIcon className='w-5 h-5 absolute top-[10px] left-[5px] z-10 peer-focus:hidden' />
            </InputCont>
            <InputCont inputType="password" baseText="Password" >
                  <LockClosedIcon className='w-5 h-5 absolute top-[8px] left-[5px] z-10 peer-focus:hidden' />
            </InputCont>
            {isSignup && 
                <InputCont inputType="password" baseText="Confirm Password" addAnimation={true} >
                    <LockClosedIcon className='w-5 h-5 absolute top-[8px] left-[5px] z-10 peer-focus:hidden' />
                </InputCont>
            }
            <ButtonContainer isSignupHandler={toggleSignup}  signUpBoolean={isSignup} />
              <div className='signin-seperator flex items-center gap-2 text-xs'>
                or
              </div>
              <button className='google-auth flex gap-3 p-2 items-center justify-center border border-[#ff6c6c] rounded-lg hover:shadow-md'>
                  <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.69 190.5"><g transform="translate(1184.583 765.171)"><path clipPath="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4" /><path clipPath="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853" /><path clipPath="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05" /><path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clipPath="none" mask="none" /></g></svg>
                Sign in with Google
            </button>
        </form>
    </aside>
  )
}

export default Login;