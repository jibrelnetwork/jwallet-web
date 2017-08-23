import React, { Component } from 'react';
import './App.css';

import JbButton from '../../components/JbButton/';
import Demo from  '../../components/Demo/';
import NavBar from  '../../components/NavBar/';
import TransactionsList from  '../../components/TransactionsList/';
import Settings from  '../../components/Settings/';
import Login from  '../../components/Login/';

import { HashRouter, Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <HashRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={TransactionsList}/>
        <Route path="/login" component={Login}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/list" component={TransactionsList}/>
      </Switch>
  </HashRouter>);
  }
}

export default App;
