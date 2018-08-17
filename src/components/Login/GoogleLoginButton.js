import React from 'react'
import { Button } from 'antd'
import firebase from 'firebase/app'

export default class GoogleLoginButton extends React.Component {
  login = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      firebase.auth().signInWithRedirect(provider)
    } catch (error) {
      // Handle Error here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      // const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential;

      console.log(`${errorCode}: ${errorMessage}`)
    }
  }

  render() {
    return (
      <Button onClick={this.login} size="large">
        Login with Google
      </Button>
    )
  }
}
