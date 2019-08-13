import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import {Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(TodoContext);
  const [passwordLogin, setPasswordLogin] = useState('');
  const [emailLogin, setEmailLogin] = useState('');

  const handleEmail = e => {
    setEmailLogin(e.target.value);
  }

  const handlePassword = e => {
    setPasswordLogin(e.target.value);
  }

  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    login(email, password);
  }

  return (
    <div className="login">
     <form className="login__form" onSubmit={e => handleSubmit(e, emailLogin, passwordLogin)}>
        <input
          type="email"
          placeholder="Your Email"
          onChange={e => handleEmail(e)}
          value={emailLogin}
        />
        <input
          type="password"
          placeholder="Your Password"
          onChange={e => handlePassword(e)}
          value={passwordLogin}
        />
        <button type="submit">Submit</button>
      </form>
      <p className="login__account">Don't have an account?</p>
      <Link className="login__register" to='/register'>Register</Link>
    </div>
  );
}

export default Login;
