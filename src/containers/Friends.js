import React from 'react'
import styled from 'styled-components'
import { Avatar, Button, Badge, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { Router } from 'react-router'

import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import ConnectAvatar from '../components/Core/Avatar'
import { getRealtimeFriends } from '../firebase/data'
import { getThemeByColor } from '../App'
import { LoadingSection } from '../components/Core/Loading'

const FriendItem = styled.div`
  overflow: hidden;
`

class Friends extends React.Component {
  state = {
    friends: []
  }
  toAddPage = () => {
    this.props.history.push('/add')
  }
  async componentDidMount() {
    this.mounted = true
    await getRealtimeFriends(this.props.userInfo.uid, friends => {
      if (this.mounted) {
        if (friends !== null) {
          this.setState({
            friends
          })
        } else {
          this.setState({
            friends: [{ isLoad: false }]
          })
        }
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    const { friends } = this.state
    return (
      <Layout>
        <Section id="mode">
          <div className="container position-relative">
            <div className="row">
              <div className="col text-left">
                <h3 className="m-0">
                  รายชื่อทั้งหมด{' '}
                  <small>
                    (
                    {this.state.friends.length === 0
                      ? '-'
                      : this.state.friends.length}{' '}
                    คน)
                  </small>
                </h3>
              </div>
            </div>
          </div>
        </Section>
        <section className="friend-list">
          {friends && friends.length === 0 ? (
            <LoadingSection />
          ) : friends.length > 0 && friends[0].isLoad === false ? (
            <Section className="text-center py-4">
              <h2 className="mt-3 mb-2">ยังไม่มีรายชื่อ</h2> <br />
              <Button type="primary" size="large" onClick={this.toAddPage}>
                ไปแสกนเร็ว !
              </Button>
            </Section>
          ) : (
            <React.Fragment>
              {friends.map((friend, index) => (
                <Section id="friend" key={index}>
                  <FriendItem className="container position-relative d-flex align-items-center">
                    <div>
                      {!friend.avatarUrl ? (
                        <Avatar size={76} icon="user" src={friend.avatarUrl} />
                      ) : (
                        <ConnectAvatar
                          size={76}
                          avatarUrl={friend.avatarUrl}
                          color={getThemeByColor(friend.color).primaryColor}
                        />
                      )}
                    </div>
                    <div className="info ml-2">
                      <h4 className="my-0">{friend.nickName || '-'}</h4>
                      <p className="small mb-0">
                        {`${friend.name || '-'} / ชั้นปี: ${friend.level ||
                          'ไม่ระบุ'}`}
                      </p>
                      <p className="small m-0">{`"${friend.bio ||
                        'มาตามล่าหารหัสลับกันเถอะ!'}"`}</p>
                    </div>
                  </FriendItem>
                </Section>
              ))}
            </React.Fragment>
          )}
        </section>
      </Layout>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  null
)(Friends)
