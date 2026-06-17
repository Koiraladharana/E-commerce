import './carousel.css'
import { useEffect, useState } from 'react';


export default function Carousel({activeTab, setActiveTab}) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [loading, setLoading]= useState(false);
  const [movies, setMovies]= useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  async function movieCarouselFetch(){
    setLoading(true);
    try{
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
      if(!response.ok){
        throw new Error(await response.text());
      }
      const data = await response.json();
      console.log(data);
      setMovies(data.results.slice(0, 6));
    }
    catch(error){
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    movieCarouselFetch();
  },[]);

  useEffect(()=> {
    const interval = setInterval(() => {
        setCurrentSlide((prev) => {
            if(prev === movies.length - 1){
                return 0;
            }
            return prev + 1;
        });
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className='carouselMain'>
        {movies.length > 0 && (
                <div className='main-Carousel-card'>
                    <div className='carouselImg'>
                        <img className='desktop-image' src={ `https://image.tmdb.org/t/p/original${movies[currentSlide].backdrop_path}`} alt={movies[currentSlide].title} />
                        <img className='mobile-image' src={`https://image.tmdb.org/t/p/original${movies[currentSlide].poster_path}`} alt={movies[currentSlide].title} />
                    </div>
                    <div className='fireEmoji'>🔥TRENDING NOW</div>
                    <div className='movieTitle'>{movies[currentSlide].title.slice(0,12)}</div>
                   <div className='starFlex'> 
                    <div className='vote'>⭐{movies[currentSlide].vote_average.toFixed(2)}</div>
                    <div className='date'>{movies[currentSlide].release_date.slice(0,4)}</div>
                   </div>
                    <div className='movieDesc'>{movies[currentSlide].overview}</div>
                    <div className='emojiFlex'>
                      <button className='carouselBtn'><span>▶View Details</span></button>
                      <button className='carouselSave'><span>🤍</span> Save</button>
                    </div>
                    <div className='carousel-last-btn'>
                      <button className={activeTab === 'trending'? 'end-btn active':'end-btn'} onClick={()=>{setActiveTab('trending')}}><span>🔥</span><p>TRENDING</p></button>
                      <button className={activeTab === 'topRated'? 'end-btn active':'end-btn'} onClick={()=> {setActiveTab('topRated')}}><span>⭐</span><p>Top Rated</p></button>
                      <button className={activeTab === 'upcoming'? 'end-btn active':'end-btn'} onClick={()=>{setActiveTab('upcoming')}}><span>🎬</span><p>upcoming</p></button>
                    </div>
                </div>
        )}
    </div>
  )
}
