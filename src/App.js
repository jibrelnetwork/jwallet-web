import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import JbNavBar from  'components/JbNavBar/'
import JbLogo from  'components/base/JbLogo/'
import TransactionsList from  'containers/TransactionsList/'
import Settings from  'containers/Settings/'
import Login from  'containers/Login/'

import './styles/core.scss'

function App() {
  return (
    <div>
      <JbNavBar/>
      <JbLogo />
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
