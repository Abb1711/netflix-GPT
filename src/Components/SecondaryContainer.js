import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  const getMarginBasedOnOverviewLength = (overview) => {
    // Add additional margin or padding based on the length of the overview text
    if (overview && overview.length > 100) {
      return 'mt-36'; // Adjust the value as needed
    }
    return 'mt-0';
  };

  return (
    movies.nowPlayingMovies  && (
    <div className={`bg-black ${getMarginBasedOnOverviewLength(movies?.nowPlayingMovies[0]?.overview)}`}>
      <div className='mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20'>
        <MovieList title={'Now Playing'} movies={movies.nowPlayingMovies} />
        <MovieList title={'Top Rated Movies'} movies={movies.topRatedMovies} />
        <MovieList title={'Popular Movies'} movies={movies.popularMovies} />
        <MovieList title={'Upcoming Movies'} movies={movies.upcomingMovies} />
      </div>
    </div>
    )
  );
};

export default SecondaryContainer;
