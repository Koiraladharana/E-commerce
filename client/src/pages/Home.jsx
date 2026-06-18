import './home.css'
import Carousel from '../components/Carousel';
import Card from '../components/Card';
import { useState } from 'react';

function Home() {
  const [activeTab, setActiveTab] = useState('trending');

  return (
    <>
   <Carousel activeTab={activeTab} setActiveTab={setActiveTab} />
   <Card activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}

export default Home