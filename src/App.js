import React from 'react';
import TodoContextProvider from './contexts/TodoContext';
import Header from './components/Header';
import Sortable from './components/Sortable';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <TodoContextProvider>
        <Header/>
        <AddTodo />
        <Sortable/>
        <Footer/>
      </TodoContextProvider>
    </div>
  );
}

export default App;
