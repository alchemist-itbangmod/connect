import React from 'react'
import { Avatar } from 'antd'
import { connect } from 'react-redux'

import { capitalizeFirstLetter } from '../libs/capitalize-first-letter'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import { getFriends } from '../firebase/data'
class Friends extends React.Component {
  state = {
    friends: []
  }
  async componentDidMount() {
    console.log(this.props.userInfo.uid)
    const friends = await getFriends(this.props.userInfo.uid)
    await this.setState({
      friends
    })
  }

  render() {
    console.log('state', this.state)
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
              {console.log(friend)}
              <div className="container position-relative d-flex align-items-center">
                <Avatar size={64} icon="user" />
                <div className="info ml-2">
                  <h4 className="my-0">{friend.nickName || '-'}</h4>
                  <p className="small mb-0">
                    {`${capitalizeFirstLetter(
                      friend.name
                    )} / ชั้นปี: ${friend.level || 'ไม่ระบุ'}`}
                  </p>
                  <p className="small m-0">{`Bio: "${friend.bio ||
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
