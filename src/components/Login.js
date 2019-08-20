import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { login, errors, clearErrors } = useContext(TodoContext);
  const [passwordLogin, setPasswordLogin] = useState('');
  const [emailLogin, setEmailLogin] = useState('');

  useEffect(() => {
    clearErrors();
  }, [])

  const handleEmail = e => {
    setEmailLogin(e.target.value);
  }

  const handlePassword = e => {
    setPasswordLogin(e.target.value);
  }

  const handleSubmit = (e, email, password) => {
    e.preventDefault();
    let errors = {};

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

    login(email, password, errors);

  }

  return (
    <div className="login">
      <form className="form" onSubmit={e => handleSubmit(e, emailLogin, passwordLogin)} noValidate>
        <div className="form__field">
          <input
            type="email"
            placeholder="Your Email"
            onChange={e => handleEmail(e)}
            value={emailLogin}
            className={ errors.email ? 'form__input form__input--error' : 'form__input' }
          />
          {errors.email && <p className="form__inline">{errors.email}</p>}
        </div>
        <div className="form__field">
          <input
            type="password"
            placeholder="Your Password"
            onChange={e => handlePassword(e)}
            value={passwordLogin}
            className={ errors.password ? 'form__input form__input--error' : 'form__input' }
          />
          { errors.password && <p className="form__inline">{errors.password}</p>}
        </div>
        <button className="form__submit" type="submit">Submit</button>
      </form>
      <p className="login__account">Don't have an account?</p>
      <Link className="login__register" to='/register'>Register</Link>
      <Link className="login__forgot" to='/forgot'>Forgot password?</Link>
      {errors.server && <div className="login__error">{errors.server}</div>}
    </div>
  );
}

export default Login;
