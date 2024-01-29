import React, { useEffect } from 'react'
import Login from './Login';
import Browse from './Browse';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
//  import Header from './Header';

const Body = () => {
  const dispatch = useDispatch();//whenever we take into acct this hooke this hool should be at top 
 
  const appRouter = createBrowserRouter([
    {
        path:'/',
        element:<Login/>
    },
    {
        path:'/browse',
        element:<Browse/>
    },
    
  ])

  useEffect(() =>{//here i have use useEffect becoz i want to run the below code once only.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName,photoURL} = user;
        dispatch(
          addUser({
            uid:uid, 
            email:email,
            displayName:displayName,
            photoURL:photoURL 
          }));
      
        // ...As if user logged in navigate it to browse page
      } else {
        // User is signed out
        // ...navigate user to main page if user sign - out
       

      }
    });
  })

  return (
    <div>
   <RouterProvider router = {appRouter} />
        

    </div>
  )
}

export default Body;