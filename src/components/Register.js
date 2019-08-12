import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import {Link } from 'react-router-dom';
import Header from './Header';

const Register = () => {
  const { register } = useContext(TodoContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleName = e => {
    setName(e.target.value);
  }

  const handleEmail = e => {
    setEmail(e.target.value);
  }

  const handlePassword = e => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e, name, email, password) => {
    e.preventDefault();
    register(name, email, password);
  }

  return (
    <div className="register">
    <h1 className="register__title">Register</h1>
     <form onSubmit={e => handleSubmit(e, name, email, password)}>
      <input
          type="text"
          placeholder="Your Name"
          onChange={e => handleName(e)}
          value={name}
        />
        <input
          type="email"
          placeholder="Your Email"
          onChange={e => handleEmail(e)}
          value={email}
        />
        <input
          type="password"
          placeholder="Your Password"
          onChange={e => handlePassword(e)}
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
      <Link className="login__register" to='/auth'>Back to login</Link>
    </div>
  );
}

export default Register;