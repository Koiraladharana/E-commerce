import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout( { setFavorites, setSearchQuery } ) {
  return (
    <>
    <div> <Navbar setFavorites={setFavorites} setSearchQuery={setSearchQuery} /> </div>
    <div> <Outlet /> </div>
    <div> <Footer /></div>
    </>
  )
}

export default Layout