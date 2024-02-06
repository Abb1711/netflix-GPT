import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/moviesSlice";


//As hook is nothing but a js functions:-

const useTopRated = () => {

    const dispatch = useDispatch();
    const topRatedMovies = useSelector(
      store =>store.movies.topRatedMovies
    )
    const getNowPlayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', 
    API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() =>{
    !topRatedMovies && getNowPlayingMovies();
  },[]);
}


export default useTopRated;