import React from 'react';
import TodoContextProvider from './contexts/TodoContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Register from './components/Register';
import Forgot from './components/Forgot';

const App = () => (
  <BrowserRouter>
    <TodoContextProvider>
      <div className="route-container">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' component={Auth} />
          <Route path='/register' component={Register} />
          <Route path='/forgot' component={Forgot} />
        </Switch>
      </div>
    </TodoContextProvider>
  </BrowserRouter>
)

export default App;
