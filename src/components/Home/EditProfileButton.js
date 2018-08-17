import React from 'react'
import { withRouter } from 'react-static'
import { Button } from 'antd'

class EditProfileButton extends React.Component {
  render() {
    return <Button type="dashed">EditProfile</Button>
  }
}

export default withRouter(EditProfileButton)
