import React from 'react'
import { auth } from '../utils/Firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser,removeUser } from '../utils/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { LOGO } from '../utils/constants';

const Header = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const user = useSelector((store) => store.user);

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      // window.location.reload();
      // Sign-out successful.

    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  useEffect(() =>{//here i have use useEffect becoz i want to run the below code once only.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(
          addUser({
            uid:uid, 
            email:email,
            displayName:displayName,
            photoURL:photoURL 
          }));
          navigate("/browse");
        // ...As if user logged in navigate it to browse page
      } else {
        // User is signed out
        // ...navigate user to main page if user sign - out
       dispatch(removeUser());
       navigate("/");
      }
    });
    //we unsubscribe kind of like event listner onauthchnged -> when the component is unmount
    return  () => unsubscribe();
  },[]);
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
      <img 
      className="  w-44 mx-auto md:mx-0"
      src={LOGO}
      alt='Logo'
      />
      
      {user && <div  className='flex p-2'>
        <button className='py-2 px-4 mx-4 my-2  bg-purple-800 text-white rounded-lg'>
          GPT Search
        </button>
        <img className='w-12 h-12'
        alt='user-icon'
        src={user?.photoURL}
        />
        <button onClick={handleSignOut} className=' py-2 px-4 mx-4 my-2 font-bold text-white bg-blue-800 rounded-lg '>Log-Out</button>
      </div>
      }
    </div>
  )
}

export default Header
