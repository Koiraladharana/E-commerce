import { useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navMain">
        <div className="navLogo">
          <Link to="/">Movie<span>Fetch</span></Link>
        </div>

        <div className="navDiv">
          <div className="searchBar">
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="Search movies..." />
          </div>

          {/* DESKTOP MENU */}
          <div className="nav-desktop">
            <div className="nav-user">
            {user ? <>Hi, <span>{user?.name}</span></> : <></>}
          </div>
            {user ? (
              <>
                <button className="nav-btn"><Link to="/">🏠 Home</Link></button>
                <button className="nav-btn fav-btn"><Link to="/favorites">❤️ Favorites</Link></button>
                <button className="nav-btn signout-btn" onClick={handleLogout}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="nav-btn"><Link to="/">🏠 Home</Link></button>
                <button className="nav-btn"><Link to="/signup">Sign Up</Link></button>
                <button className="nav-btn"><Link to="/login">Sign In</Link></button>
              </>
            )}
          </div>

          {/* mobile */}
          <button className="hamburger-menu" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="sidebar-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* SIDEBAR */}
      <div className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        {/* CLOSE BUTTON */}
        <button className="sidebar-close" onClick={() => setMenuOpen(false)}>✕</button>

        {/* USER GREETING */}
        <div className="sidebar-user">
          {user ? <>Hi, <span>{user?.name}</span></> : "Welcome"}
        </div>

        <hr className="sidebar-divider" />

        {/* LINKS */}
        {user ? (
          <>
            <Link to="/" className="sidebar-btn" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
            <Link to="/favorites" className="sidebar-btn" onClick={() => setMenuOpen(false)}>❤️ Favorites</Link>
            <button className="sidebar-btn" onClick={handleLogout}>🚪 Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/" className="sidebar-btn" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
            <Link to="/login" className="sidebar-btn" onClick={() => setMenuOpen(false)}>🔑 Sign In</Link>
            <Link to="/signup" className="sidebar-btn " onClick={() => setMenuOpen(false)}>✨ Sign Up</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;