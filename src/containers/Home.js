import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Section from '../components/Core/Section'
import Layout from '../components/Core/Layout'
import EditProfileButton from '../components/Home/EditProfileButton'
import LogoutButton from '../components/Home/LogoutButton'
import Profile from '../components/Home/Profile'

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
    editState: false
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
            />
          </div>
        </Section>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  null
)(Home)
