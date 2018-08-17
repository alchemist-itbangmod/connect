import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Core/Layout'

import EditProfileButton from '../components/Home/EditProfileButton'
import LogoutButton from '../components/Home/LogoutButton'
import { Avatar } from 'antd'
import Profile from '../components/Home/Profile'

const Section = styled.section`
  background: white;
  position: relative;
`

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
    return (
      <Layout>
        <Section id="profile" className="py-3">
          <div className="container text-center pt-5 position-relative">
            <ActionContainer>
              <EditProfileButton />
              <LogoutButton />
            </ActionContainer>
            <Profile
              name={`Kanisorn Sutham`}
              nickName={`เฟิส`}
              level={`4`}
              stdID={`58130500009`}
            />
          </div>
        </Section>
      </Layout>
    )
  }
}

export default Home
