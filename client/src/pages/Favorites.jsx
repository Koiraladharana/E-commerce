import './favorite.css'
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://moviefetch-bdcv.onrender.com';

function Favorites({ favorites, setFavorites }) {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favLoading, setFavLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
            return;
        }
        async function loadFavorites() {
            try {
                const res = await fetch(`${API_BASE}/api/favorites`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setFavorites(data);
            } catch (err) {
                console.error(err);
            }
        }
        loadFavorites();
    }, []);

    async function handleCardClick(fav) {
        setDetailLoading(true);
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${fav.movieId}?api_key=${API_KEY}`
            );
            const data = await res.json();
            setSelectedMovie(data);
        } catch (err) {
            console.error(err);
        } finally {
            setDetailLoading(false);
        }
    }

    async function handleRemove(movieId) {
        const token = localStorage.getItem('token');
        setFavLoading(true);
        try {
            await fetch(`${API_BASE}/api/favorites/${movieId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            setFavorites(prev => prev.filter(f => f.movieId !== movieId));
            setSelectedMovie(null);
        } catch (err) {
            console.error(err);
        } finally {
            setFavLoading(false);
        }
    }

    return (
        <div className='favorite-section'>
            <h2 className='section-title'>
                <span className='active-heading'>YOUR FAVORITES</span>
            </h2>

            {favorites.length === 0 ? (
                <p className='empty-msg'>You have not added any favorites yet.</p>
            ) : (
                <div className='movie-grid'>
                    {favorites.map((fav) => (
                        <div className='movie-card' key={fav.movieId}
                            onClick={() => handleCardClick(fav)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                                alt={fav.title}
                            />
                        </div>
                    ))}
                </div>
            )}

            {detailLoading && (
                <div className='modal-overlay'>
                    <p style={{ color: 'white', fontSize: '1.2rem' }}>Loading...</p>
                </div>
            )}

            {selectedMovie && !detailLoading && (
                <div className='modal-overlay' onClick={() => setSelectedMovie(null)}>
                    <div className='modal-box' onClick={(e) => e.stopPropagation()}>
                        <button className='modal-close' onClick={() => setSelectedMovie(null)}>✕</button>
                        <img
                            className='modal-img'
                            src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                            alt={selectedMovie.title}
                        />
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
                                onClick={() => handleRemove(selectedMovie.id)}
                                style={{
                                    backgroundColor: '#c0392b',
                                    color: 'white',
                                    border: '2px solid #c0392b',
                                }}
                            >
                                💔 Remove from Favorites
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Favorites;