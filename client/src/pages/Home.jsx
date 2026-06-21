import './home.css'
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { useState } from 'react';

function Home({ favorites, setFavorites}) {
  const [activeTab, setActiveTab] = useState('trending');

  return (
    <>
   <Carousel activeTab={activeTab} setActiveTab={setActiveTab} />
   <Card activeTab={activeTab} setActiveTab={setActiveTab} favorites={favorites} setFavorites={setFavorites}/>
    </>
  )
}

export default Home