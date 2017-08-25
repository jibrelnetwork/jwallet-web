import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import 'styles/core.scss'

import Demo from  'components/Demo/'
import JbNavBar from  'components/JbNavBar/'
import TransactionsList from  'containers/TransactionsList/'
import Settings from  'containers/Settings/'
import Login from  'containers/Login/'

function App() {
  return (
    <div>
      <Demo/>
      <JbNavBar/>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={TransactionsList}/>
          <Route path="/login" component={Login}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/list" component={TransactionsList}/>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
