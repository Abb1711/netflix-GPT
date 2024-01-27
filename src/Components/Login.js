import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage:
            'url("https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg")',
        }}
      />
      <form className='relative w-3/12 p-12 bg-black text-white rounded-lg bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>
 
        {!isSignInForm && (
          <input
            type='text'
            placeholder='Full Name'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}
        <input
          type='text'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700'
        />

        {!isSignInForm && (
          <input
            type='text'
            placeholder='Phone Number'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}

        <input
          type='text'
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700'
        />
        {!isSignInForm && (
          <input
            type='text'
            placeholder='Confirm Password'
            className='p-4 my-4 w-full bg-gray-700'
          />
        )}

        <button className='p-4 my-4 bg-red-700 w-full rounded-lg'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm
            ? 'New to Netflix? Sign Up Now'
            : 'Already a user? Sign In now...'}
        </p>
      </form>
    </div>
  );
};

export default Login;