import "./signup.css"
import { Link } from "react-router-dom";


function Signup() {
  return (
    <div className="signup">
      <div className="signup-image">
        <img src="./login.jpg" alt="Register image" />
      </div>
      <div className="signup-form">
        <div className="formLink"><Link to="/">  🏠Home</Link></div>
        <h2>Sign in</h2>
        <p>Create your account in a seconds</p>
        <div className="form-group">
          <label htmlFor="name">
            Full Name:
          </label>
         <input type="text" id="name" placeholder={"eg.Ram Prasad Koirala"} />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email Address:
          </label>
          <input type="email" id="email" placeholder="eg.example@gmail.com" />
        </div>
        <div className="form-group">
          <label htmlFor="num">
            Phone Number:
          </label>
          <input type="tel" id="num" placeholder="98xxxxxxxx" />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Create Password:
          </label>
          <input type="password" id="password" placeholder="********" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">
            Confirm Password:
          </label>
           <input
              type="password" id="confirm_password" placeholder="********" />
        </div>
        <div className="checkbox-group">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            I agree to the terms and privacy
            policy
          </label>
        </div>
          <button type="submit" className="signup-btn">Create an account</button>
        <div className="signupLink" ><Link to="/login">Already Have an Account</Link></div>
      </div>
    </div>
  );
}

export default Signup;
