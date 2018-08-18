import React from 'react'
import { Router, Switch, Route, withRouter } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import firebase from 'firebase/app'
import { connect } from 'react-redux'
import * as R from 'ramda'

// Internal Libs
import './libs/initFirebase'
import './App.css'

import NotFound from './containers/404'
import Login from './containers/Login'
import Home from './containers/Home'
import DailyHunt from './containers/DailyHunt'
import Add from './containers/Add'
import Friends from './containers/Friends'
import Identify from './containers/Identify'

import { setUserData, createOtpForUserIfNotExist } from './firebase/login'
import { getUser, getRealtimeUser } from './firebase/data'

import { actions as userActions } from './redux/modules/user'
import Loading from './components/Core/Loading'

injectGlobal`
  body {
    font-family: 'Rubik', 'Kanit', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif, tohama;
    font-weight: 300;
    font-size: 14px;
    margin: 0;
    padding: 0;
    background: #dfeae9;
  }
`

class App extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        await this.handleLoggedIn(authUser)
        await this.setState({
          loading: false
        })
      } else {
        await this.props.history.push('/login')
        await this.setState({
          loading: false
        })
      }
    })
  }

  handleLoggedIn = async authUser => {
    const user = await getUser(authUser.uid)
    if (user !== null) {
      console.log('already registration')
      await createOtpForUserIfNotExist(authUser)
    } else {
      console.log('not registration')
      await setUserData(authUser)
      await createOtpForUserIfNotExist(authUser)
    }
    const newUser = await getUser(authUser.uid)
    this.props.setUser(newUser)
    await getRealtimeUser(authUser.uid, user => this.props.setUser(user))
  }

  handleNonLoggedIn() {
    this.setState({ authUser: null })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <Loading />
        ) : (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/identify" component={Identify} />
            <Route exact path="/" component={Home} />
            <Route exact path="/daily-hunt" component={DailyHunt} />
            <Route exact path="/add" component={Add} />
            <Route exact path="/friends" component={Friends} />
            <Route component={NotFound} />
          </Switch>
        )}
      </React.Fragment>
    )
  }
}

export default R.compose(
  hot(module),
  withRouter,
  connect(
    null,
    {
      setUser: userActions.setUser
    }
  )
)(App)
