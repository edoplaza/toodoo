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
  const[todos, setTodos] = useState([]);
  const[currentUser, setCurrentUser] = useState(null);
  const[authID, setAuthID] = useState(null);

  useEffect(() => {
    authUser(props);
    //createCollection(authID);
    if(authID !== null) {
      getTodos();
    }
  }, [authID])

  const register = (name, email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
    .then(userData => {
      userData.user.updateProfile({
        displayName: name
      })
    })
  }

  const login = (email, password) => {
    auth.signInWithEmailAndPassword(
      email,
      password
    ).then( () => {
       console.log('new user Logged in');
    })
  }

  const logout = () => {
    auth.signOut().then( () => {
      setAuthID(null);
      setTodos([])
      console.log('user has Logged out');
    })
  }

  const authUser = props => {
    auth.onAuthStateChanged(user => {
      if(user) {
        setCurrentUser(user);
        setAuthID(user.uid);
        props.history.push('/');
      } else {
        setCurrentUser(null);
        setAuthID(null);
        props.history.push('/auth')
      }
    })


  }

  // const createCollection = () => {
  //   const initialTodo = {
  //     id: 1,
  //     name: 'welcome',
  //     completed: false
  //   }
  //   if(authID != null) {
  //     db.collection(authID).add(initialTodo).then(() => {
  //       console.log('collection created');
  //     })
  //   }
  // }

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

  const completeTodo = (id) => {
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
    db.collection(authID).doc(id).delete();
  }

  return (
    <TodoContext.Provider value={{ register, login, logout, todos, currentUser, sortTodos, addTodo, completeTodo, editTodo, deleteTodo}}>
      { props.children }
    </TodoContext.Provider>
  )
}

export default withRouter(TodoContextProvider);
