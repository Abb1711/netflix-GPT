import usePopularMovies from '../hooks/usePopularMovies';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useTopRated from '../hooks/useTopRated';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpcomingMovies();

    return (
    <div>
     <Header/>
     {
      showGptSearch ? (
        <GptSearch/>
      ) : (
        <>
        <MainContainer/>
        <SecondaryContainer/>
        </>
      )
     }
     
     
     {
      
        /* MainContainer
        -VideoBackground
        -videoTitle
        SecondaryContainer
        - MovieList * n
          - cards * n
        */
      }
     
    </div>  
  );
}
export default Browse
