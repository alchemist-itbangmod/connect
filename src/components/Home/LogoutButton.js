import React from 'react'
import firebase from 'firebase/app'
import { withRouter } from 'react-static'
import { Button, Modal } from 'antd'

const confirm = Modal.confirm

class LogoutButton extends React.Component {
  logout = async () => {
    confirm({
      title: 'Do you want to logout ?',
      content: `Please don't go! Stay with us.`,
      onOk: async () => {
        await firebase.auth().signOut()
        this.props.history.push('/login')
      },
      onCancel() {}
    })
  }
  render() {
    return (
      <Button onClick={() => this.logout()} type="dashed">
        ออกจากระบบ
      </Button>
    )
  }
}

export default withRouter(LogoutButton)
