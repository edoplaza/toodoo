import React from 'react';
import TodoContextProvider from './contexts/TodoContext';
import Header from './components/Header';
import Sortable from './components/Sortable';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <div>
      <TodoContextProvider>
        <Header/>
        <AddTodo />
        <Sortable/>
      </TodoContextProvider>
    </div>
  );
}

export default App;
