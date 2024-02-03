import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";


//As hook is nothing but a js functions:-

const usePopularMovies = () => {

    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', 
    API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() =>{
    getNowPlayingMovies();
  },[]);
}


export default usePopularMovies;