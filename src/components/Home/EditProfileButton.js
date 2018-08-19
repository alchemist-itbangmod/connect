import React from 'react'
import { withRouter } from 'react-static'
import { Button } from 'antd'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/home'

class EditProfileButton extends React.Component {
  render() {
    return (
      <Button type="dashed" onClick={() => this.props.toggleEdit()}>
        แก้ไขข้อมูล
      </Button>
    )
  }
}

export default R.compose(
  withRouter,
  connect(
    null,
    {
      toggleEdit: actions.toggleEdit
    }
  )
)(EditProfileButton)
