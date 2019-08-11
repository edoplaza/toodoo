import React, { Component } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import Todos from './Todos';

class Sortable extends Component {
  static contextType = TodoContext;

  onSortEnd = ({todos, oldIndex, newIndex}) => {
    this.context.sortTodos(this.context.todos, oldIndex, newIndex);
  };

  render() {
    return (
      <Todos
        onSortEnd={this.onSortEnd}
        useDragHandle
      />
    )
  }
}

export default Sortable;