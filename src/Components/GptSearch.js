import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
    <div className='absolute overflow-x-hidden overflow-y-hidden -z-10 '>
       <img className='h-full w-full object-cover' src={BG_URL}
       alt='Bg-Img'/>
    </div>
     <GptSearchBar/>
     <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearch
