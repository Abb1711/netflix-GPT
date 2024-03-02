import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!Array.isArray(movieNames) || movieNames.length === 0) {
    return null;
  }

  // Filter out movie names with part/chapter numbers
  const uniqueMovieNames = movieNames.filter(movieName => !/\bPart\s*\d+|\bChapter\s*\d+|\b\d+\b/.test(movieName));

  return (
    <div className='p-4 m-4 bg-black bg-opacity-90 text-white'>
      {uniqueMovieNames.map((movieName, index) => (
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
