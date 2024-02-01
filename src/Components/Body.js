import React, { useEffect } from 'react'
import Login from './Login';
import Browse from './Browse';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/Firebase';
import { useDispatch } from 'react-redux';


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



  return (
    <div>
   <RouterProvider router = {appRouter} />
        

    </div>
  )
}

export default Body;