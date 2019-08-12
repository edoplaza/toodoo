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

  const handleChange = e => {
    if (name.length < 50) setName(e.target.value)
  }

  return (
    <div className="add">
     <form onSubmit={handleSubmit}>
      <input onChange={ e => handleChange(e) } name="name" type="text" placeholder="What do you need to do?" value={name} />
      <button>Add Todo</button>
     </form>
    </div>
  )
}

export default AddTodo;