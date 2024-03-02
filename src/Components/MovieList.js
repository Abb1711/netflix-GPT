import React from 'react'
import MovieCart from './MovieCart'

const MovieList = ({title,movies}) => {
    // Check if movies is null or undefined
  if (!movies) {
    return null; // or handle it in a way that makes sense for your application
  }
    // console.log(movies);

  return (
    <div className='px-3'>
        <h1 className=' text-lg md:text-3xl  py-2 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll'>
        
        <div className='flex'>
            {movies.map((movie) => (
            <MovieCart key={movie.id}  posterPath={movie.poster_path}/>
            ))}

        </div>
        </div>
    </div>
  )
}

export default MovieList
