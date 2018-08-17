import React from 'react'
import { Router, Switch, Route, withRouter } from 'react-static'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import firebase from 'firebase/app'

import NotFound from './containers/404'
import Login from './containers/Login'
import Home from './containers/Home'
import DailyHunt from './containers/DailyHunt'
import Add from './containers/Add'
import Friends from './containers/Friends'
import Identify from './containers/Identify'

import './App.css'

// [1] Initial Firebase
import './libs/initFirebase'
import { setUserData, createOtpForUserIfNotExist } from './firebase/login'
import { getUser } from './firebase/data'

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
      console.log(user)
    } else {
      console.log('not registration')
      console.log(user)
      await setUserData(authUser)
      await createOtpForUserIfNotExist(authUser)
    }
  }

  handleNonLoggedIn() {
    this.setState({ authUser: null })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading ? (
          <div>Loading</div>
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

export default hot(module)(withRouter(App))
