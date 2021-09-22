import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: ""
  });
  const history = useHistory();

  function changeLoginForm(e) {
    setLoginFormData((loginFormData)=> ({
      ...loginFormData,
      [e.target.name]: e.target.value
    }))
  }

  function submitLoginForm(e) {
    e.preventDefault();

    fetch('/login', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginFormData)
    })
    .then(res=>res.json())
    .then(userData=>{
      // Set user data with Redux
      history.push(`/${userData.username}`)
    })
  }

  return(
    <form onSubmit={submitLoginForm}>
      <label
        for="username"
        className="login-label"
      >
        Username
      </label>
      <input 
        type="text" 
        name="username"
        value={loginFormData.username}
        className="login-input"
        onChange={changeLoginForm}
      />

      <label
        for="password"
        className="login-label"
      >
        Password
      </label>
      <input 
        type="password" 
        name="password"
        value={loginFormData.password}
        className="login-input"
        onChange={changeLoginForm}
      />

      <button>Login</button>
    </form>
  )
}

export default LoginForm;