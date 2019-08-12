import React, { createContext, useState, useEffect} from 'react';
import arrayMove from 'array-move';
import app from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../firebase/config';
export const TodoContext = createContext();

app.initializeApp(firebaseConfig);
const db = app.firestore();
const initial = [
  {name: 'hola', completed: false}
]
const TodoContextProvider = props => {
  const[todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
  }, [])

  const getTodos = () => {
    db.collection('todos').orderBy('index').get()
    .then( snapshot => {
      const todos = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data()}
      });
      setTodos(todos);
    });
  }

  const addTodo = name => {
    const lastTodo = todos.length + 1;
    const newTodo = {
      name,
      completed: false,
      index: lastTodo,
    }
    setTodos([...todos, newTodo]);
    db.collection('todos').add(newTodo).then(() => {
      getTodos();
    })
  }

  const sortTodos = (todos, oldIndex, newIndex) => {
    setTodos( arrayMove(todos, oldIndex, newIndex) );

    const newTodos = document.querySelectorAll('.todo');
    const newIDS = [];

    newTodos.forEach( (todo, index) => {
      todo.classList.remove('.selected');
      newIDS.push(todo.getAttribute('data-id'));
    });

    todos.forEach((todo, index) => {
      const ref = db.collection('todos').doc(newIDS[index]);
      return ref.update({ index: index + 1 })
    })

  }



  const completeTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed;
          const ref = db.collection('todos').doc(id);
          ref.update({ completed: todo.completed })
          return todo
        }
        return todo
      })
    )
  }

  const editTodo = (id, final) => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.name = final
          const ref = db.collection('todos').doc(id)
          ref.update({name: final})
          .then(function() {
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
            console.error("Error updating document: ", error);
          });
          return todo
        }
        return todo
      })
    )
  }

  const deleteTodo = id => {
    setTodos( todos.filter( todo => todo.id !== id)   )
    db.collection('todos').doc(id).delete();
  }

  return (
    <TodoContext.Provider value={{ todos, sortTodos, addTodo, completeTodo, editTodo, deleteTodo}}>
      { props.children }
    </TodoContext.Provider>
  )
}

export default TodoContextProvider;
