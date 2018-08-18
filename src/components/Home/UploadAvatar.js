import React from 'react'
import styled from 'styled-components'
import { Upload, Icon, message, Button, Avatar } from 'antd'
import { uploadAvatar } from '../../firebase/storage'
import { connect } from 'react-redux'
import { actions } from '../../redux/modules/home'

const StyledUpload = styled(Upload)`
  .ant-upload {
    margin: 0;
    margin-bottom: 1rem;
  }
`

function isLt2M(file) {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isLt2M
}

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
    message.loading('Uploading...')
    if (!isLt2M(file)) {
      return
    }
    const uploadObj = await uploadAvatar(this.props.userInfo.uid, file)
    const url = await uploadObj.ref.getDownloadURL().then(url => url)
    this.setState({
      loading: false,
      imageUrl: url
    })
    message.success('Uploaded!')
    this.props.setAvatar(url)
  }

  render() {
    return (
      <React.Fragment>
        <div className="mb-2">
          <Avatar
            size={128}
            icon="user"
            src={this.state.imageUrl}
            className="img-thumbnail"
          />
        </div>
        <div className="mb-2">
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
            <Icon type="upload" /> {this.state.loading ? 'Uploading' : 'Upload'}
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