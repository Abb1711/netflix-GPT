import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/Firebase';

import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {USER_AVATAR} from '../utils/constants';
import { BG_URL } from '../utils/constants';

const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage] = useState(null);
  

  const dispatch = useDispatch(); 


const name = useRef(null);  
const email = useRef(null);
const password = useRef(null);



const handleButtonClick =() =>{
  //Validate the form data
  // checkValidData(email,password);
  
  const message = checkValidData(email.current.value,password.current.value)
  setErrorMessage(message);
  if(message) return;

  //Sign In ,Sign Up logic
  if(!isSignInForm){
    //Sign UP logic
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value)

  .then((userCredential) => {
    // Signed In
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: USER_AVATAR
    }).then(() => {
      // Profile updated!
      // ...
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(
        addUser({
          uid:uid, 
          email:email,
          displayName:displayName,
          photoURL:photoURL 
        }));
     
    }).catch((error) => {
      // An error occurred
      // ...
      setErrorMessage(errorMessage);
    });
    // console.log(user);
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
    // ..
  });
     
  }
  else{
    signInWithEmailAndPassword( 
      auth,
      email.current.value,
      password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
  }
}
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    
    <div>
    <Header/>
      
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed' style={{ backgroundImage: `url(${BG_URL})` }}>
     
     
     {/* <div className='absolute inset-0'>
        <img className='w-full h-full object-cover' src={BG_URL} alt='Bg-Img'/>
        </div>
        */}
      <form 
       onSubmit={(e) => e.preventDefault()}
       className='w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
 
        {!isSignInForm && (
          <input
            ref={name}
            type='text'
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}
        <input
          ref={email}
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700'
        />

     

        <input
        ref={password}
          type='text'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700'
        />
        
        
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

        <button className='p-4 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already a user? Sign In now...'}
        </p>
      </form>
    </div>
    </div>
    
  );
};

export default Login;
