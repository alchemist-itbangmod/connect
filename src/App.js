import React from 'react'
import { Router, Switch, Route } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import firebase from 'firebase/app'
import Promise from 'bluebird'
import NotFound from './containers/404'
import Login from './containers/Login'
import Home from './containers/Home'
import DailyHunt from './containers/DailyHunt'
import Add from './containers/Add'
import Friends from './containers/Friends'

import './App.css'

// [1] Initial Firebase
import './libs/initFirebase'

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

class App extends React.Component {
  state = {
    loading: true,
    user: {}
  }

  componentDidMount() {
    const userPromise = new Promise(resolve => {
      firebase.auth().onAuthStateChanged(() => {
        resolve()
      })
    })

    Promise.all([userPromise, Promise.delay(500)]).then(() => {
      this.setState({
        loading: false
      })
    })

    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        // console.log(authUser)
        this.setState({
          user: authUser
        })
      } else {
        this.setState({
          user: {}
        })
      }
    })
  }

  render() {
    return (
      <Router>
        {this.state.loading ? (
          <div>Loading</div>
        ) : (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/daily-hunt" component={DailyHunt} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/friends" component={Friends} />
            <Route component={NotFound} />
          </Switch>
        )}
      </Router>
    )
  }
}

export default hot(module)(App)
