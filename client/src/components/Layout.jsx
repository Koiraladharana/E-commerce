import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout( { setFavorites } ) {
  return (
    <>
    <div> <Navbar setFavorites={setFavorites} /> </div>
    <div> <Outlet /> </div>
    <div> <Footer /></div>
    </>
  )
}

export default Layout