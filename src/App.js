import React from 'react'
import { Switch, Route, withRouter } from 'react-static'
import { injectGlobal, ThemeProvider } from 'styled-components'
import { hot } from 'react-hot-loader'
import firebase from 'firebase/app'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { message } from 'antd'
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

import {
  setUserData,
  createOtpForUserIfNotExist,
  generateAndSaveOtpToDB
} from './firebase/login'
import { getUser, getRealtimeUser } from './firebase/data'

import { actions as userActions } from './redux/modules/user'
import Loading from './components/Core/Loading'
import { checkMailKmutt } from './libs/check-mail-kmutt'

injectGlobal`
  body, .ant-collapse {
    font-family: 'Rubik', 'Kanit', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif, tahoma;
    font-weight: 300;
    font-size: 14px;
  }
  body {
    margin: 0;
    padding: 0;
    background: #e8edfa;
  }

  * {
    transition: all .3s;
  }
`

const themes = {
  pink: {
    primaryColor: '#ff727f',
    backgroundColor: '#ffd8db'
  },
  blue: {
    primaryColor: '#8bdbdb',
    backgroundColor: '#d8f3f3'
  },
  orange: {
    primaryColor: '#ff9819',
    backgroundColor: '#ffd199'
  },
  green: {
    primaryColor: '#53d270',
    backgroundColor: '#c8f9d3'
  },
  red: {
    primaryColor: '#d03439',
    backgroundColor: '#efdddb'
  },
  yellow: {
    primaryColor: '#e5cd17',
    backgroundColor: '#fff4a3'
  },
  none: {
    primaryColor: '#204dd3',
    backgroundColor: '#e8edfa'
  }
}

export const getThemeByColor = color => {
  if (R.isEmpty(color) || R.isNil(color)) {
    return themes['none']
  }
  return themes[color]
}

class App extends React.Component {
  state = {
    loading: true
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        if (checkMailKmutt(authUser.email)) {
          await this.handleLoggedIn(authUser)
        } else {
          await firebase.auth().signOut()
          message.error('กรุณาเข้าสู่ระบบด้วย KMUTT Email นะครับ!')
          this.props.history.push('/login')
          setTimeout(() => {
            this.setState({
              loading: false
            })
          }, 2000)
        }
      } else {
        this.props.history.push('/login')
        setTimeout(() => {
          this.setState({
            loading: false
          })
        }, 2000)
      }
    })
  }

  handleLoggedIn = async authUser => {
    const user = await getUser(authUser.uid)
    if (user !== null) {
      await generateAndSaveOtpToDB(authUser.uid)
    } else {
      await setUserData(authUser)
      await createOtpForUserIfNotExist(authUser)
    }
    const newUser = await getUser(authUser.uid)
    await this.props.setUser(newUser)

    // force change background color
    document.body.style.backgroundColor = getThemeByColor(
      newUser.color
    ).backgroundColor

    await getRealtimeUser(authUser.uid, user => {
      this.props.setUser(user)
      // force change background color
      document.body.style.backgroundColor = getThemeByColor(
        user.color
      ).backgroundColor
    })
    await this.setState({
      loading: false
    })
  }

  render() {
    return (
      <ThemeProvider
        theme={getThemeByColor(R.path(['userInfo', 'color'], this.props))}
      >
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
      </ThemeProvider>
    )
  }
}

export default R.compose(
  hot(module),
  withRouter,
  connect(
    state => ({
      userInfo: state.user.userInfo
    }),
    {
      setUser: userActions.setUser
    }
  )
)(App)
