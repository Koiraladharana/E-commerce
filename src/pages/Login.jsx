import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
          <div className="login-image">
            <img src="./login.jpg" alt="login image" />
          </div>
          <div className="login-form">
            <div className="loginHome"><Link to="/">  🏠Home</Link></div>
            <p>Login Page</p>
            <div className="login-group">
              <label htmlFor="email">
                Email:
              </label>
              <input type="email" id="email"/>
            </div>
            <div className="login-group">
              <label htmlFor="password">
                 Password:
              </label>
              <input type="password" id="password" />
            </div>
              <button type="submit" className="login-btn">Login</button>
            <div className="loginLink" >Don't have an account? <Link to="/signup">Sign up</Link></div>
          </div>
        </div>
  );
}

export default Login;
