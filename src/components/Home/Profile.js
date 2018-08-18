import React from 'react'
import { Avatar, Button, Input } from 'antd'
import { connect } from 'react-redux'

import { capitalizeFirstLetter } from '../../libs/capitalize-first-letter'
import UploadAvatar from './UploadAvatar'

class Profile extends React.Component {
  componentWillUpdate(nextProps) {
    if (nextProps.isEdit) {
      console.log('edit')
    }
  }

  render() {
    const { stdID, name, level, nickName } = this.props
    return (
      <React.Fragment>
        {!this.props.isEdit ? (
          <React.Fragment>
            <Avatar
              size={128}
              icon="user"
              src={this.props.avatarUrl}
              className="img-thumbnail"
            />
            <h2 className="my-1">{nickName || '-'}</h2>
            <p className="small mb-0 mt-2">{`รหัสนักศึกษา: ${stdID || '-'}`}</p>
            <p className="mb-0">{`${capitalizeFirstLetter(
              name
            )} / ชั้นปี: ${level || '-'}`}</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <UploadAvatar avatarUrl={this.props.avatarUrl} />
            <Input
              className="mb-1"
              placeholder="Student ID"
              disabled
              value={`58130500009`}
            />
            <Input className="mb-1" placeholder="Nickname" />
            <Input.TextArea className="mb-1" placeholder="Bio" />
            <Button>Update Profile</Button>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    isEdit: state.home.isEdit
  }),
  null
)(Profile)
