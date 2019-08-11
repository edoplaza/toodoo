import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';

const AddTodo = () => {
  const { addTodo } = useContext(TodoContext);
  const [name, setName] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name !=='') {
      addTodo(name);
      setName('');
    }

  }

  return (
    <div className="add">
     <form onSubmit={handleSubmit}>
      <input onChange={ e => setName(e.target.value) } name="name" type="text" placeholder="What do you need to do?" value={name} />
      <button>Add Todo</button>
     </form>
    </div>
  )
}

export default AddTodo;