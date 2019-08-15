import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import {Link } from 'react-router-dom';

const Register = () => {
  const { register, errors, clearErrors } = useContext(TodoContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    clearErrors();
  }, [])

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

    let errors = {};

    if(!name) {
      errors.name = 'Name required';
    } else if (name.length < 3) {
      errors.name = 'Name is too short'
    }

    if(!email) {
      errors.email = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = 'Invalid Email';
    }

    if (!password) {
      errors.password = 'Password required';
    } else if(password.length < 6) {
      errors.password = 'Password is too short';
    }

    register(name, email, password, errors);
  }

  return (
    <div className="register">
      <div className="register__inner">
        <h1 className="register__title">Register</h1>
        <form className="form" onSubmit={e => handleSubmit(e, name, email, password)} noValidate>
          <div className="form__field">
            <input
              type="text"
              placeholder="Your Name"
              onChange={e => handleName(e)}
              value={name}
              className={ errors.name ? 'form__input form__input--error' : 'form__input' }
            />
            {errors.name && <p className="form__inline">{errors.name}</p>}
          </div>
          <div className="form__field">
            <input
              type="email"
              placeholder="Your Email"
              onChange={e => handleEmail(e)}
              value={email}
              className={ errors.email ? 'form__input form__input--error' : 'form__input' }
            />
            {errors.email && <p className="form__inline">{errors.email}</p>}
          </div>
          <div className="form__field">
            <input
              type="password"
              placeholder="Your Password"
              onChange={e => handlePassword(e)}
              value={password}
              className={ errors.password ? 'form__input form__input--error' : 'form__input' }
            />
            {errors.password && <p className="form__inline">{errors.password}</p>}
          </div>
          <button className="form__submit" type="submit">Submit</button>
        </form>
        <Link className="register__login" to='/auth'>Back to login</Link>
        {errors.server &&   <div className="login__error">{errors.server}</div>}
      </div>
    </div>
  );
}

export default Register;