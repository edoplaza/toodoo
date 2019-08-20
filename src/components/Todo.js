import React, { useContext } from 'react';
import { SortableElement,  sortableHandle } from 'react-sortable-hoc';
import { TodoContext } from '../contexts/TodoContext';

const DragHandle = sortableHandle(() => <span className="todo__handle">: :</span>);
const Todo = SortableElement(( {todo} ) => {

  const { deleteTodo, completeTodo, editTodo} = useContext(TodoContext);
  const all = document.querySelectorAll('.todo');

  const handleEdit = (e, id) => {
    const edit = e.target.parentNode;
    const li = edit.parentNode;
    const text = li.querySelector('.todo__name');

    all.forEach(todo => {
      todo.classList.remove('editable');
      todo.querySelector('.todo__name').contentEditable = false;
      if (!todo.querySelector('.todo__name').classList.contains('completed')){
        todo.querySelector('.todo__edit').classList.remove('hidden');
      }
    });

    edit.classList.add('hidden');

    if ( !li.classList.contains('.completed')){
      li.classList.add('editable');
      text.contentEditable = true;
      text.focus();

      const createRange = (node, chars, range) => {
        if (!range) {
          range = document.createRange();
          range.selectNode(node);
          range.setStart(node, 0);
        }

        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.length < chars.count) {
            chars.count -= node.textContent.length;
          } else {
            range.setEnd(node, chars.count);
            chars.count = 0;
          }
        } else {
          for (var lp = 0; lp < node.childNodes.length; lp++) {
            range = createRange(node.childNodes[lp], chars, range);
            if (chars.count === 0) {
              break;
            }
          }
        }

        return range;
      };

      function setCurrentCursorPosition(chars) {
        let selection = window.getSelection();
        let range = createRange(text, { count: chars });
        if (range) {
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      };

      let length = text.textContent.length;
      setCurrentCursorPosition(length);

      text.addEventListener('keydown', function(event) {
        if (li.textContent.length > 50 && event.keyCode !== 8) {
          event.preventDefault();
        }
      })
    }

  }

  const handleCommit = (e, id, name) => {
    const text = e.target;
    const li = e.target.parentNode;
    const edit = li.querySelector('.todo__edit');

    all.forEach(todo => {
      todo.classList.remove('editable');
      todo.querySelector('.todo__name').contentEditable = false;
    });

    li.classList.remove('editable');
    edit.classList.remove('hidden');

    if (text.innerHTML ==='') text.innerHTML = name;
    let final = text.innerHTML;
    final = final.replace(/&nbsp;/g, '');

    editTodo(id, final);

  }

  const handleKey = (e, id, name) => {
    var key = e.which;
    if ( key === 13) {
      e.preventDefault();
      handleCommit(e, id, name);
    }
  }

  const handleBlur = (e, id, name) => {
    handleCommit(e, id, name);
  }

  const handleComplete = (e, id) => {
    const li = e.target.parentNode;
    if ( !li.classList.contains('editable') ) completeTodo(id)
  }

  return(
    <li className="todo" data-id={todo.id}>
      <DragHandle/>
      <span
        className={todo.completed ? 'todo__name completed' : 'todo__name'}
        onClick={e => handleComplete(e, todo.id)}
        onBlur={e => handleBlur(e, todo.id, todo.name)}
        onKeyPress={e => handleKey(e, todo.id, todo.name)}
      >
        {todo.name}
      </span>
      <span className={todo.completed ? 'todo__delete visible' : 'todo__delete'} onClick={() => deleteTodo(todo.id)}><i className="fa fa-times"></i></span>
      <span
        className={todo.completed ? 'todo__edit hidden' : 'todo__edit'}
        onClick={e => handleEdit(e, todo.id)}
      >
        <i className="fas fa-edit"></i>
      </span>

    </li>
  )

})

export default Todo;
