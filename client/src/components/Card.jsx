import './card.css'
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://moviefetch-bdcv.onrender.com';

function Card({activeTab, setActiveTab, favorites, setFavorites, searchQuery }) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favLoading, setFavLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

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

    // NEW: check if movie is already in favorites
    const isFavorited = (movieId) => favorites.some(f => f.movieId === movieId);

    // NEW: add or remove from favorites
    async function handleFavoriteToggle(movie) {
        const token = localStorage.getItem('token');
        if (!token) {  window.location.href = '/login'; return;  }

        setFavLoading(true);
        try {
            if (isFavorited(movie.id)) {
                await fetch(`${API_BASE}/api/favorites/${movie.id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFavorites(prev => prev.filter(f => f.movieId !== movie.id));
            } else {
                const res = await fetch(`${API_BASE}/api/favorites`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        movieId: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        rating: movie.vote_average,
                    }),
                });
                const saved = await res.json();
                setFavorites(prev => [...prev, saved]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setFavLoading(false);
        }
    }

    useEffect(() => {
        if (!searchQuery || searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }
        async function doSearch() {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
                );
                const data = await res.json();
                setSearchResults(data.results);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        // debounce — wait 400ms after user stops typing
        const timer = setTimeout(doSearch, 400);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // decide which movies to show
    const isSearching = searchQuery && searchQuery.trim() !== '';
    const movies = isSearching
        ? searchResults
        : activeTab === 'trending' ? trending
        : activeTab === 'topRated' ? topRated
        : upcoming;

    const tabLabel = isSearching
        ? `RESULTS FOR "${searchQuery.toUpperCase()}"`
        : activeTab === 'trending' ? 'TRENDING'
        : activeTab === 'topRated' ? 'TOP RATED'
        : 'UPCOMING';

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

              {/* NEW: button changes based on favorite status */}
             <button
  className='modal-fav-btn'
  disabled={favLoading}
  onClick={() => handleFavoriteToggle(selectedMovie)}
  style={localStorage.getItem('token') && isFavorited(selectedMovie.id) ? {
      backgroundColor: '#c0392b',
      color: 'white',
      border: '2px solid #c0392b',
  } : {}}
>
  {localStorage.getItem('token') && isFavorited(selectedMovie.id) ? '💔 Remove from Favorites' : '♥ Add to Favorites'}
</button>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default Card;