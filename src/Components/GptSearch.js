import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className=' -z-10 fixed'>
       <img className='min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed' src={BG_URL}
       alt='Bg-Img'/>
    </div>
    <div className=''>
    <GptSearchBar/>
     <GptMovieSuggestions/>
    </div>
    
      
    </>
  )
}

export default GptSearch
