import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import QRCode from 'qrcode.react'

import { getAvatar } from '../firebase/storage'

import Section from '../components/Core/Section'
import Layout from '../components/Core/Layout'
import EditProfileButton from '../components/Home/EditProfileButton'
import LogoutButton from '../components/Home/LogoutButton'
import Profile from '../components/Home/Profile'
import { actions } from '../redux/modules/home'

const ActionContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0.8rem;

  > button {
    margin-left: 0.35rem;
  }
`

class Home extends React.Component {
  state = {
    avatarUrl: ''
  }

  async componentWillMount() {
    const url = await getAvatar(this.props.userInfo.uid)
    this.props.setAvatar(url)
  }

  render() {
    const { userInfo } = this.props
    return (
      <Layout>
        <Section id="profile">
          <div className="container text-center pt-5 position-relative">
            <ActionContainer>
              <EditProfileButton />
              <LogoutButton />
            </ActionContainer>
            <Profile
              name={userInfo.name}
              nickName={userInfo.nickName}
              level={userInfo.level}
              stdID={userInfo.stdID}
              avatarUrl={this.props.avatarUrl}
              bio={userInfo.bio}
            />
          </div>
        </Section>
        <Section id="otp">
          <div className="container text-center position-relative">
            <QRCode
              value={this.props.userInfo.otp || '-'}
              style={{ height: 'auto', width: '100%', maxWidth: '180px' }}
            />
            <h6 className="m-0">
              <span className="small">รหัสลับของคุณ (OTP) คือ </span>
              <u>{this.props.userInfo.otp || '-'}</u>
            </h6>
          </div>
        </Section>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.user.userInfo,
    avatarUrl: state.home.avatarUrl
  }),
  {
    setAvatar: actions.setAvatar
  }
)(Home)
