import './card.css'
import { useEffect, useState } from 'react';

function Card({activeTab, setActiveTab}) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);


    async function fetchAll() {
        setLoading(true);
        try {
            const trendingResponse = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
            if (!trendingResponse.ok) {
                throw new Error(await trendingResponse.ok);
            }
            const dataTrending = await trendingResponse.json();

            const topRatedResponse = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
            if(!topRatedResponse.ok){
                throw new Error(await topRatedResponse.ok); 
            }
            const dataTopRated = await topRatedResponse.json();

            const upcomingResponse = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
            if(!upcomingResponse.ok){
                throw new Error(await upcomingResponse.ok);
            }
            const dataUpcoming = (await upcomingResponse.json());

            console.log('this is trnding data',dataTrending);

            setTrending(dataTrending.results);
            setTopRated(dataTopRated.results);
            setUpcoming(dataUpcoming.results);
        }

        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAll();
    }, []);

    const movies = activeTab === 'trending' ? trending : activeTab === 'topRated' ? topRated : upcoming;
    const tabLabel = activeTab === 'trending' ? 'TRENDING' : activeTab === 'topRated' ? 'TOP RATED' : 'UPCOMING';

    return (
        <div className='card-section'>
            <h2 className='section-title'>
                <span className='active-heading'>{tabLabel} MOVIES</span>
            </h2>

           {loading ? (
        <p style={{color: 'white'}}>Loading...</p>
      ) : (
        <div className='movie-grid'>
          {movies.map((movie) => (
            <div className='movie-card' key={movie.id} onClick={() => setSelectedMovie(movie)}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
          ))}
        </div>
      )}

           {selectedMovie && (
        <div className='modal-overlay' onClick={() => setSelectedMovie(null)}>
          <div className='modal-box' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={() => setSelectedMovie(null)}>✕</button>
            <img className='modal-img' src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`} alt={selectedMovie.title} />
            <div className='modal-info'>
              <h2>{selectedMovie.title}</h2>
              <div className='modal-meta'>
                <span className='modal-vote'>⭐ {selectedMovie.vote_average.toFixed(1)} / 10</span>
                <span className='modal-year'>📅 {selectedMovie.release_date.slice(0, 4)}</span>
                <span className='modal-lang'>🌐 {selectedMovie.original_language.toUpperCase()}</span>
                <span className='modal-votes'>🗳 {selectedMovie.vote_count} votes</span>
              </div>
              <p className='modal-desc'>{selectedMovie.overview}</p>
              <button className='modal-fav-btn'>♥ Add to Favorites</button>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default Card;