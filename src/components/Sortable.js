import React, { Component } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import Todos from './Todos';

class Sortable extends Component {
  static contextType = TodoContext;

  onSortStart = ({node}) => {
    node.classList.add('selected');
  };

  onSortEnd = ({todos, oldIndex, newIndex}) => {
    this.context.sortTodos(this.context.todos, oldIndex, newIndex);
    const all = document.querySelectorAll('.todo');
    all.forEach(todo => todo.classList.remove('selected'));
  };

  render() {
    return (
      <Todos
        onSortEnd={this.onSortEnd}
        //useDragHandle
        pressDelay={200}
        updateBeforeSortStart={this.onSortStart}
      />
    )
  }
}

export default Sortable;