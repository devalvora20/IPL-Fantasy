import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter style={{padding:30}}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Redirect from='*' to='/home' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
