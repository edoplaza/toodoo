import React, {useContext, useState} from 'react';
import { TodoContext } from '../contexts/TodoContext';

const Header = () => {
  const { logout } = useContext(TodoContext);

  const handleLogout = e => {
    e.preventDefault();
    logout();
  }

  return (
    <div className="header">
      <h1 className="header__title">Too - Doo</h1>
      <a className="header__out" onClick={handleLogout}>Logout</a>
    </div>
  )
}

export default Header;