import './carousel.css'
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://moviefetch-bdcv.onrender.com';

export default function Carousel({ activeTab, setActiveTab, favorites, setFavorites }) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favLoading, setFavLoading] = useState(false);

  async function movieCarouselFetch() {
    setLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setMovies(data.results.slice(0, 6));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { movieCarouselFetch(); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev === movies.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [movies]);

  const isFavorited = (movieId) => favorites.some(f => f.movieId === movieId);

  async function handleSave(movie) {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }

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

  async function handleViewDetails(movie) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error(err);
    }
  }

  const current = movies[currentSlide];

  return (
    <div className='carouselMain'>
      {movies.length > 0 && (
        <div className='main-Carousel-card'>
          <div className='carouselImg'>
            <img className='desktop-image' src={`https://image.tmdb.org/t/p/original${current.backdrop_path}`} alt={current.title} />
            <img className='mobile-image' src={`https://image.tmdb.org/t/p/original${current.poster_path}`} alt={current.title} />
          </div>
          <div className='fireEmoji'>🔥TRENDING NOW</div>
          <div className='movieTitle'>{current.title.slice(0, 12)}</div>
          <div className='starFlex'>
            <div className='vote'>⭐{current.vote_average.toFixed(2)}</div>
            <div className='date'>{current.release_date.slice(0, 4)}</div>
          </div>
          <div className='movieDesc'>{current.overview}</div>
          <div className='emojiFlex'>
            <button className='carouselBtn' onClick={() => handleViewDetails(current)}>
              <span>▶ View Details</span>
            </button>
            <button
              className='carouselSave'
              disabled={favLoading}
              onClick={() => handleSave(current)}
              style={localStorage.getItem('token') && isFavorited(current.id) ? { color: 'red' } : {}}
            >
              <span>{localStorage.getItem('token') && isFavorited(current.id) ? '❤️' : '🤍'}</span>
              {localStorage.getItem('token') && isFavorited(current.id) ? ' Saved' : ' Save'}
            </button>
          </div>
          <div className='carousel-last-btn'>
            <button className={activeTab === 'trending' ? 'end-btn active' : 'end-btn'} onClick={() => setActiveTab('trending')}><span>🔥</span><p>TRENDING</p></button>
            <button className={activeTab === 'topRated' ? 'end-btn active' : 'end-btn'} onClick={() => setActiveTab('topRated')}><span>⭐</span><p>Top Rated</p></button>
            <button className={activeTab === 'upcoming' ? 'end-btn active' : 'end-btn'} onClick={() => setActiveTab('upcoming')}><span>🎬</span><p>upcoming</p></button>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedMovie && (
        <div className='modal-overlay' onClick={() => setSelectedMovie(null)}>
          <div className='modal-box' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={() => setSelectedMovie(null)}>✕</button>
            <img className='modal-img' src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`} alt={selectedMovie.title} />
            <div className='modal-info'>
              <h2>{selectedMovie.title}</h2>
              <div className='modal-meta'>
                <span className='modal-vote'>⭐ {selectedMovie.vote_average?.toFixed(1)} / 10</span>
                <span className='modal-year'>📅 {selectedMovie.release_date?.slice(0, 4)}</span>
                <span className='modal-lang'>🌐 {selectedMovie.original_language?.toUpperCase()}</span>
                <span className='modal-votes'>🗳 {selectedMovie.vote_count} votes</span>
              </div>
              <p className='modal-desc'>{selectedMovie.overview}</p>
              <button
                className='modal-fav-btn'
                disabled={favLoading}
                onClick={() => handleSave(selectedMovie)}
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
  );
}