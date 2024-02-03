import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/moviesSlice";


//As hook is nothing but a js functions:-

const useUpcomingMovies = () => {

    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', 
    API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    
    dispatch(addUpcomingMovies(json.results));
  };

  useEffect(() =>{
    getNowPlayingMovies();
  },[]);
}


export default useUpcomingMovies;