import React from 'react'
import { withTheme } from 'styled-components'
import { Avatar, Button, Input, message, Modal } from 'antd'
import { connect } from 'react-redux'
import * as R from 'ramda'

import ConnectAvatar from '../Core/Avatar'
import { capitalizeFirstLetter } from '../../libs/capitalize-first-letter'
import UploadAvatar from './UploadAvatar'
import { setUser } from '../../firebase/data'

const confirm = Modal.confirm

const getYear = year => {
  if (year <= 57) return 'Senior'
  else return 62 - year
}

const isAvailableYear = year => year > 61 || year < 57

const isValidSITCode = stdID => stdID.substring(2, 8) === '130500'

const isValidStudentID = stdID => stdID.length !== 11

class Profile extends React.Component {
  state = {
    loading: false,
    stdID: this.props.stdID || '',
    nickName: this.props.nickName || '',
    bio: this.props.bio || ''
  }

  setField = (field, value) => this.setState({ [field]: value })

  handleUpdateProfile = async () => {
    // Update Student ID
    if (
      this.state.stdID !== '' &&
      (R.isEmpty(this.props.stdID) || R.isNil(this.props.stdID))
    ) {
      if (isValidStudentID(this.state.stdID)) {
        message.error('Your Student ID is not valid!')
        return
      }

      if (!isValidSITCode(this.state.stdID)) {
        message.error('You are not IT Student!')
        return
      }

      const year = this.state.stdID.substring(0, 2)
      if (isAvailableYear(+year)) {
        message.error('Your study level is wrong.')
        return
      }

      confirm({
        title: 'คุณจะสามารถตั้งรหัสนักศึกษาได้เพียงครั้งเดียว',
        content: `คุณจะสามารถตั้งรหัสนักศึกษาได้เพียงครั้งเดียว, รหัสนักศึกษา ${
          this.state.stdID
        } นี้เป็นของคุณหรือไม่ ?`,
        onOk: async () => {
          await setUser(this.props.userInfo.uid, {
            ...R.pick(['stdID'], this.state),
            level: getYear(year)
          })
        }
      })
    }

    // Update nickname & bio
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
    const { stdID, name, level, nickName, bio, colorCode } = this.props
    return (
      <React.Fragment>
        {!this.props.isEdit ? (
          <React.Fragment>
            <div className="text-center">
              {!this.props.avatarUrl ? (
                <Avatar size={128} icon="user" src={this.props.avatarUrl} />
              ) : (
                <ConnectAvatar
                  size={128}
                  avatarUrl={this.props.avatarUrl}
                  color={this.props.theme.primaryColor}
                />
              )}
            </div>
            <h2 className="my-1">{nickName || '-'}</h2>
            <p className="small mb-0 mt-2">{`รหัสนักศึกษา: ${stdID || '-'}`}</p>
            <p className="mb-2">
              {`${capitalizeFirstLetter(name)}, ชั้นปี: ${level || '-'}, `}
              <b>{colorCode}</b>
            </p>
            <p className="small mb-2">{bio}</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <UploadAvatar avatarUrl={this.props.avatarUrl} />
            {R.isEmpty(this.props.stdID) || R.isNil(this.props.stdID) ? (
              <Input
                className="mb-1"
                placeholder="Student ID"
                onChange={e => this.setField('stdID', e.target.value)}
                value={this.state.stdID}
              />
            ) : null}
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

export default R.compose(
  withTheme,
  connect(
    state => ({
      isEdit: state.home.isEdit,
      userInfo: state.user.userInfo
    }),
    null
  )
)(Profile)
