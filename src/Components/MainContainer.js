import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    //to get the movies from Store by use of Use selector
    const movies = useSelector(store => store.movies?.nowPlayingMovies)

  
    if(!movies) return //know as early return

    const mainMovie = movies[0];
    //  // Generate a random index within the range of the movies array length
    // const randomIndex = Math.floor(Math.random() * movies.length);
    // const mainMovie = movies[randomIndex];
    const {original_title,overview,id} = mainMovie;
  return (
    <div className='pt-[30%] bg-black md:pt-0'>
    <VideoTitle title={original_title} overview = {overview}/>
    <VideoBackground movieId ={id} /> 
    </div>
  )
}

export default MainContainer
