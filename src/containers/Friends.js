import React from 'react'
import { Avatar } from 'antd'
import { connect } from 'react-redux'

import { capitalizeFirstLetter } from '../libs/capitalize-first-letter'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import ConnectAvatar from '../components/Core/Avatar'
import { getRealtimeFriends } from '../firebase/data'
import { getThemeByColor } from '../App'
class Friends extends React.Component {
  state = {
    friends: []
  }
  async componentDidMount() {
    this.mounted = true
    await getRealtimeFriends(this.props.userInfo.uid, friends => {
      if (this.mounted) {
        if (friends !== null) {
          this.setState({
            friends
          })
        }
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false
  }

  render() {
    return (
      <Layout>
        <Section id="mode">
          <div className="container position-relative">
            <div className="row">
              <div className="col">
                <h3 className="m-0">รายชื่อทั้งหมด</h3>
              </div>
            </div>
          </div>
        </Section>
        <section className="friend-list">
          {this.state.friends.map((friend, index) => (
            <Section id="friend" key={index}>
              <div className="container position-relative d-flex align-items-center">
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
                    {`${capitalizeFirstLetter(
                      friend.name
                    )} / ชั้นปี: ${friend.level || 'ไม่ระบุ'}`}
                  </p>
                  <p className="small m-0">{`"${friend.bio ||
                    'มาตามล่าหารหัสลับกันเถอะ!'}"`}</p>
                </div>
              </div>
            </Section>
          ))}
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
