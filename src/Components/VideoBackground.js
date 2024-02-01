
import {useSelector } from 'react-redux';
import useMoviesTrailer from '../hooks/useMoviesTrailer';


const VideoBackground =  ({movieId}) => {
//  for fetching trailerVideo from strore we use useSelector hook for updating the video data
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);


 // const [trailerId,setTrailerId] = useState(null); One way of doing dynamic Id for trailer video,and the 
 //other one is using dispatch hook by adding trailerVideo in movieSlice and then 
 //dispatching it ,this concept uses Redux store see 👆
 // everywhere where * is written and commented this means this is part of maintaing useState for trailer.
  useMoviesTrailer(movieId);
 
  return (
    <div className='w-screen'>
    {trailerVideo && (
    <iframe
    className='w-screen aspect-video'
    src={"https://www.youtube.com/embed/" + trailerVideo.key + "?&autoplay=1&mute=1"}
    title="YouTube video player"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
)}

    </div>
  )
}

export default VideoBackground
