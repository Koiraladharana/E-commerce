import './favorite.css'
import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://moviefetch-bdcv.onrender.com';

function Favorites({ favorites, setFavorites }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [favLoading, setFavLoading] = useState(false);

    // Load favorites from backend when page opens
    useEffect(() => {
        async function loadFavorites() {
            const token = localStorage.getItem('token');
            if (!token) return;
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
                            onClick={() => setSelectedMovie(fav)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                                alt={fav.title}
                            />
                        </div>
                    ))}
                </div>
            )}

            {selectedMovie && (
                <div className='modal-overlay' onClick={() => setSelectedMovie(null)}>
                    <div className='modal-box' onClick={(e) => e.stopPropagation()}>
                        <button className='modal-close' onClick={() => setSelectedMovie(null)}>✕</button>
                        <img
                            className='modal-img'
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            alt={selectedMovie.title}
                        />
                        <div className='modal-info'>
                            <h2>{selectedMovie.title}</h2>
                            <div className='modal-meta'>
                                <span className='modal-vote'>⭐ {selectedMovie.rating?.toFixed(1)} / 10</span>
                            </div>

                            {/* Red broken heart remove button */}
                            <button
                                className='modal-fav-btn'
                                disabled={favLoading}
                                onClick={() => handleRemove(selectedMovie.movieId)}
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