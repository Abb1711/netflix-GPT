// GptMovieSuggestions.js
import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  // console.log('movieNames:', movieNames);
  // console.log('movieResults:', movieResults);

  if (!Array.isArray(movieNames) || movieNames.length === 0) {
    // console.log('No movie names or empty array.');
    return null;
  }

  return (
    <div className='p-4 m-4 bg-black bg-opacity-90 text-white'>
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggestions;
