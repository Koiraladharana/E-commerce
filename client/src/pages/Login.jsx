import { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  })

  async function onSubmit(e) {
    e.preventDefault();
    let errors = {
      email: "",
      password: ""
    };
    let isValue = true;

    if (!formValue.email) {
      errors.email = "Please enter Email Id."
      isValue = false;
    }
    else if (!formValue.email.endsWith(".com")) {
      errors.email = "Email should end with .com"
      isValue = false;
    }
    if (!formValue.password) {
      errors.password = "Please enter Password."
      isValue = false;
    }
    else if (formValue.password.length <= 5) {
      errors.password = "Password must be more than 5 Letters"
      isValue = false;
    }
    setFormError(errors);
    if (!isValue) {
      return;
    }

    try{
      const response = await fetch('https://5000-cs-473132266018-default.cs-asia-southeast1-yelo.cloudshell.dev/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formValue.email,
          password: formValue.password
        }),
      })

      const data = await response.json();

      if(!response.ok){
        setFormError({...formError, password: data.message});
        return;
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));

      setFormValue({ email: '', password: ''});
      navigate('/');
    }
    catch (error) {
      alert('Something went wrong.Try again.')
    }

  }

  return (
    <form onSubmit={onSubmit}>
      <div className="login">
        <div className="login-form">
          <div className="login-logo"><Link to="/">Movie<span>Fetch</span></Link></div>
          <p className="pClass">Welcome back! Sign in to continue.</p>
          <div className="login-group">
            <label htmlFor="email">
            </label>
            <input type="email" className={formError.email ? "errorInput" : ""} id="email" value={formValue.email} onChange={(e) => { setFormValue({ ...formValue, email: e.target.value }) }} placeholder="Email" />
            {formError.email && <p className="errorDiv">{formError.email}</p>}
          </div>
          <div className="login-group">
            <label htmlFor="password">
            </label>
            <input type="password" className={formError.password ? "errorInput" : ""} id="password" value={formValue.password} onChange={(e) => { setFormValue({ ...formValue, password: e.target.value }) }} placeholder="Password" />
            {formError.password && <p className="errorDiv">{formError.password}</p>}
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="loginLink" >Don't have an account? <Link to="/signup">Sign up</Link></div>
        </div>
      </div>
    </form>
  );
}

export default Login;
