import './footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-top'>

        {/* Brand */}
        <div className='footer-brand'>
          <h2 className='footer-logo'>🎬 MOVIEFetch</h2>
          <p className='footer-tagline'>Your ultimate destination for movies. Discover trending, top rated and upcoming films all in one place.</p>
          <div className='footer-socials'>
            <a href='#'>📘</a>
            <a href='#'>🐦</a>
            <a href='#'>📸</a>
            <a href='#'>▶️</a>
          </div>
        </div>

        {/* Navigation */}
        <div className='footer-col'>
          <h4>Navigation</h4>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/favorites'>Favorites</a></li>
            <li><a href='/login'>Login</a></li>
            <li><a href='/signup'>Signup</a></li>
          </ul>
        </div>

        {/* Movies */}
        <div className='footer-col'>
          <h4>Movies</h4>
          <ul>
            <li><a href='#'>Trending</a></li>
            <li><a href='#'>Top Rated</a></li>
            <li><a href='#'>Upcoming</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className='footer-col'>
          <h4>Contact</h4>
          <ul>
            <li>📧 MOVIEFetch@gmail.com</li>
            <li>📞 +977 9800000000</li>
            <li>📍 Kathmandu, Nepal</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className='footer-bottom'>
        <p>© 2024 MOVIEFetch. All rights reserved.</p>
        <div className='footer-bottom-links'>
          <a href='#'>Privacy Policy</a>
          <a href='#'>Terms of Service</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer