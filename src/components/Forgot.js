import React, { useContext, useState, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Link } from 'react-router-dom';

const Forgot = () => {
  const { resetPassword, isPasswordReset, errors, clearErrors } = useContext(TodoContext);
  const[resetPasswordEmail, setResetPasswordEmail] = useState('');

   useEffect(() => {
    clearErrors();
  }, [])

  const handleSubmit = (e, email) => {
    e.preventDefault();
    let errors = {};

    if(!resetPasswordEmail) {
      errors.email = 'Email required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(resetPasswordEmail)) {
      errors.email = 'Invalid Email';
    }
    resetPassword(resetPasswordEmail, errors);
  }

  const handleReset = () => {
    resetPassword(resetPasswordEmail);
  }

  const handleEmail = e => {
    setResetPasswordEmail(e.target.value);
  }

   return (
    <div className="reset">
      <h1 className="reset__title">Reset Password</h1>
      <form className="form" onSubmit={e => handleSubmit(e, resetPasswordEmail)} noValidate>
        <div className="form__field">
          <input
            type="email"
            placeholder="Your Email"
            onChange={e => handleEmail(e)}
            value={resetPasswordEmail}
            className={ errors.email ? 'form__input form__input--error' : 'form__input' }
          />
          {errors.email && <p className="form__inline">{errors.email}</p>}
        </div>
        <button className="form__submit" type="submit">Reset Password</button>
      </form>
       <Link className="register__login" to='/auth'>Back to login</Link>
      { isPasswordReset ? <p>Please check your email</p> : <p>{errors.server}</p> }
    </div>
  );
}

export default Forgot;
