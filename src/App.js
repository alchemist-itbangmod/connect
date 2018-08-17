import React from 'react'
import { Router, Switch, Route } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
//
import NotFound from './containers/404'
import Login from './containers/Login'

import './App.css'

injectGlobal`
  body {
    font-family: 'Rubik', 'Kanit', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif, tohama;
    font-weight: 300;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }
`

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default hot(module)(App)
