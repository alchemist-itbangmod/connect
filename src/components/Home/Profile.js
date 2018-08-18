import React from 'react'
import { Avatar, Button, Input, message } from 'antd'
import { connect } from 'react-redux'
import * as R from 'ramda'

import { capitalizeFirstLetter } from '../../libs/capitalize-first-letter'
import UploadAvatar from './UploadAvatar'
import { setUser } from '../../firebase/data'
class Profile extends React.Component {
  state = {
    loading: false,
    stdID: '58130500009',
    nickName: this.props.nickName || '',
    bio: this.props.bio || ''
  }

  setField = (field, value) => this.setState({ [field]: value })

  handleUpdateProfile = async () => {
    this.setState({
      loading: true
    })
    message.loading('Updating Profile...')
    await setUser(
      this.props.userInfo.uid,
      R.pick(['nickName', 'bio'], this.state)
    )
    this.setState({
      loading: false
    })
    message.success('Finish!')
  }

  render() {
    const { stdID, name, level, nickName, bio } = this.props
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
            <p className="mb-2">{`${capitalizeFirstLetter(
              name
            )} / ชั้นปี: ${level || '-'}`}</p>
            <p className="small mb-2">{bio}</p>
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
            <Input
              className="mb-1"
              placeholder="Nickname"
              onChange={e => this.setField('nickName', e.target.value)}
              value={this.state.nickName}
            />
            <Input.TextArea
              className="mb-1"
              placeholder="Bio"
              rows={4}
              onChange={e => this.setField('bio', e.target.value)}
              value={this.state.bio}
            />
            <Button
              onClick={() => this.handleUpdateProfile()}
              loading={this.state.loading}
            >
              Update Profile
            </Button>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    isEdit: state.home.isEdit,
    userInfo: state.user.userInfo
  }),
  null
)(Profile)
