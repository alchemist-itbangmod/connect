import React from 'react'
import styled from 'styled-components'
import { Upload, Icon, message, Button, Avatar } from 'antd'
import { uploadAvatar } from '../../firebase/storage'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/home'
import ConnectAvatar from '../Core/Avatar'

class UploadAvatar extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.avatarUrl || null
  }

  handleUpload = async e => {
    e.persist()
    const file = e.target.files[0]

    this.setState({
      loading: true,
      imageUrl: null
    })
    message.loading('กำลังอัพโหลดรูปของคุณ...')
    const uploadObj = await uploadAvatar(this.props.userInfo.uid, file)
    const url = await uploadObj.ref.getDownloadURL().then(url => url)
    this.setState({
      loading: false,
      imageUrl: url
    })
    message.success('อัพโหลดเรียบร้อย!')
    this.props.setAvatar(url)
  }

  render() {
    return (
      <React.Fragment>
        <div className="mb-2">
          {!this.state.imageUrl ? (
            <Avatar size={128} icon="user" src={this.state.imageUrl} />
          ) : (
            <ConnectAvatar size={128} avatarUrl={this.state.imageUrl} />
          )}
        </div>
        <div className="mb-3">
          <input
            type="file"
            id="upload-file"
            className="d-none"
            onChange={e => this.handleUpload(e)}
          />
          <Button
            loading={this.state.loading}
            onClick={() => {
              document.getElementById('upload-file').click()
            }}
          >
            <Icon type="upload" />{' '}
            {this.state.loading ? 'กำลังอัพโหลด' : 'อัพโหลด'}
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  {
    setAvatar: actions.setAvatar
  }
)(UploadAvatar)
