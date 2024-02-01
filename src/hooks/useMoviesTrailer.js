import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTrailerVideo } from '../utils/moviesSlice';

const useMoviesTrailer = (movieId) => {

    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        try {
          const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, 
            API_OPTIONS
          );
          const json = await data.json();
          // console.log(json);
      
          if (Array.isArray(json.results)) {
            const filterData = json.results.filter((video) => video.type === "Trailer");
            const trailer = filterData.length >= 1 ? filterData[0] : json.results[0];
         
    
            // console.log(trailer);
            // dispatch(addTrailerVideo(trailer));
            // Check if the required properties exist
            // if (trailer && trailer.title && trailer.description) {
            dispatch(addTrailerVideo(trailer));
        // } 
            // setTrailerId(trailer.key); *
          } 
         
        }
       
        catch (error) {
          console.error("Error fetching movie videos:", error);
        }
      };
      
      useEffect(() => {
        getMovieVideos();
      },[]);
}

export default useMoviesTrailer
