import React from 'react';
import Header from './Header';
import Sortable from './Sortable';
import AddTodo from './AddTodo';

const Home = () => {
  return (
    <div>
      <Header/>
      <AddTodo />
      <Sortable/>
    </div>
  );
}

export default Home;
