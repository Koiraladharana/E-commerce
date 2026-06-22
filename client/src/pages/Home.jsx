import './home.css'
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { useState } from 'react';

function Home({ favorites, setFavorites, searchQuery }) {
  const [activeTab, setActiveTab] = useState('trending');
  const [selectedMovie, setSelectedMovie] = useState(null);
  return (
    <>
      <Carousel activeTab={activeTab} setActiveTab={setActiveTab} favorites={favorites} setFavorites={setFavorites} setSelectedMovie={setSelectedMovie} />
      <Card activeTab={activeTab} setActiveTab={setActiveTab} favorites={favorites} setFavorites={setFavorites} searchQuery={searchQuery} />
    </>
  )
}

export default Home