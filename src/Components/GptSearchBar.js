import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstant';
import { useRef } from 'react';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMoviesResults } from '../utils/GptSlice';

const GptSearchBar = () => {
    const movieResults = useSelector((state) => state.gpt.movieResults);
    const movieNames = useSelector((state) => state.gpt.movieNames);


    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(' ');
    
    //search movie  in TMDB
    const searchMovieTMDB = async (movie) =>{
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS
        );

        const json = await data.json();
        
        return json.results;
    }

   

    const handleGPTSearchClick = async () => {
        // console.log(searchText.current.value);
        // here I will make an API call to get the Movie Results
        const gptQuery =
            'Act as a Movie Recommendation system and suggest some movies for the query : ' +
            searchText.current.value +
            '. only give me name of 5 movies,comma separated like the example result given ahead. Example results: Gadar 2,Golmaal,koi mil gya, krish,chupke chupke';
    
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
        });
    
        if (!gptResults.choices) {
            // TODO ERROR (DO it )
        }
    
        //   console.log(gptResults.choices?.[0]?.message.content);
    
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(',');
        // for each movie, I will search TMDB API
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    
        try {
            // because this searchMovieTMDB is an async function, this will return an array of promises: [promise, promise...]
            // so to extract the promises, we use a function called Promise.all
            const tmdbResults = await Promise.all(promiseArray);
            // console.log(tmdbResults);
    
            dispatch(addGptMoviesResults({ movieNames: gptMovies, movieResults: tmdbResults }));
        } catch (error) {
            // Handle error if Promise.all fails
            console.error('Error fetching TMDB results:', error);
        }
    };
    
    // console.log("langKey:" 


    return (
        <div className='pt-[50%] ml-0 justify-around md:pt-[10%] flex md:justify-center '>
            <form className='w-full md:w-1/2 bg-gray-900 grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input  ref={searchText} type='text'
                    className='col-span-9 p-2 m-2 md:p-2 md:m-3 md:col-span-10'
                    placeholder={lang[langKey]?.gptSearchPlaceholder} />
                <button className='text-center col-span-3 md:col-span-2 px-6 py-3 md:m-5 md:py-4 md:px-4 bg-red-700 text-white rounded-lg' onClick={handleGPTSearchClick}>
                    {lang[langKey]?.search}
                </button>
            </form>
        </div>
    )
}

export default GptSearchBar;
