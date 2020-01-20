import React, { createContext, useState, useEffect} from 'react';
import arrayMove from 'array-move';
import {withRouter } from 'react-router-dom';
import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseConfig from '../firebase/config';
export const TodoContext = createContext();

app.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

const TodoContextProvider = props => {
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [authID, setAuthID] = useState(null);
  const [errors, setErrors] = useState({});
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    authUser(props);
    if(authID !== null) {
      getTodos();
    }
  }, [authID])

  const register = (name, email, password, errors) => {
    const noErrors = Object.keys(errors).length;

    if (noErrors !== 0) {
      setErrors(errors);
    } else {
      auth.createUserWithEmailAndPassword(email, password)
      .then(userData => {
        userData.user.updateProfile({
          displayName: name
        })
      }).catch(err => {
        setErrors({...errors, server: err.message});
      });
    }
  }

  const clearErrors = () => {
    setErrors({})
  }

  const login = (email, password, errors) => {
    const noErrors = Object.keys(errors).length;
    if (noErrors !== 0) {
      setErrors(errors);
    } else {
      auth.signInWithEmailAndPassword(
        email,
        password
      ).then((data) => {
        console.log(data);
      }).catch(err => {
        setErrors({...errors, server: err.message});
      })
    }
  }

  const resetPassword = (email, errors) => {
    const noErrors = Object.keys(errors).length;
    if (noErrors !== 0) {
      setErrors(errors);
    } else {
       auth.sendPasswordResetEmail(email)
       .then(() => {
        clearErrors();
        setIsPasswordReset(true);
      }).catch(err => {
        setErrors({...errors, server: err.message});
        console.log(err.message);
      })
    }
  }

  const logout = () => {
    auth.signOut().then( () => {
      setAuthID(null);
      setTodos([])
    })
  }

  const authUser = props => {
    auth.onAuthStateChanged(user => {
      if( user  ) {
        setCurrentUser(user);
        setAuthID(user.uid);
        props.history.push('/');
      } else if ( props.history.location.pathname !== '/register') {
        setCurrentUser(null);
        setAuthID(null);
        props.history.push('/auth')
      }
    })
  }

  const getTodos = () => {
    db.collection(authID).orderBy('index').get()
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
    db.collection(authID).add(newTodo).then(() => {
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
      const ref = db.collection(authID).doc(newIDS[index]);
      return ref.update({ index: index + 1 })
    })

  }

  const completeTodo = id => {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed;
          const ref = db.collection(authID).doc(id);
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
          const ref = db.collection(authID).doc(id)
          ref.update({name: final})
          .then(function() {
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
    db.collection(authID).doc(id).delete();
  }

  return (
    <TodoContext.Provider value={{ register, errors, resetPassword, isPasswordReset, login, clearErrors, logout, todos, currentUser, sortTodos, addTodo, completeTodo, editTodo, deleteTodo}}>
      { props.children }
    </TodoContext.Provider>
  )
}

export default withRouter(TodoContextProvider);
