import React, { useContext } from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import { TodoContext } from '../contexts/TodoContext';
import Todo from './Todo';

const Todos = SortableContainer(() => {

  const { todos } = useContext(TodoContext);
  return (
    <div className="todos">
      <ul className="list">
        {todos.map((todo, index) => (
          <Todo key={`todo-${index}`} index={index} todo={todo} />
        ))}
      </ul>
    </div>
  );
});

export default Todos;