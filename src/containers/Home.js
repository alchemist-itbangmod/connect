import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Core/Layout'

import EditProfileButton from '../components/Home/EditProfileButton'
import LogoutButton from '../components/Home/LogoutButton'
import { Avatar } from 'antd'

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
            <Avatar size={64} icon="user" />
            <p className="small mb-0 mt-2">{`รหัสนักศึกษา: 58130500009`}</p>
            <h2 className="mb-1">{`Kanisorn Sutham`}</h2>
            <p>{`ชั้นปี: 4`}</p>
          </div>
        </Section>
      </Layout>
    )
  }
}

export default Home
