import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import firebase from 'firebase/app'
import { message, Avatar, Collapse, Icon, Modal as DefaultModal } from 'antd'
import * as R from 'ramda'

import { getThemeByColor } from '../App'
import ConnectAvatar from '../components/Core/Avatar'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import Scanner from '../components/Core/Scanner'
import { CodeInput } from '../components/Core/Input'
import { LoadingSection } from '../components/Core/Loading'

import { getQuests } from '../firebase/data'
import { addQuestMember } from '../firebase/add'

const Nickname = styled.h4`
  margin-bottom: 0;
  text-decoration-line: ${props => (props.isScan ? 'line-through' : 'un-set')};
  color: ${props => (props.isScan ? '#777777' : '#000')};
  line-height: 1;
`
const Panel = styled(Collapse.Panel)`
  .ant-collapse-header {
    padding-left: 0 !important;
    padding-bottom: 0 !important;
  }
`

const Modal = styled(DefaultModal)`
  top: 25px;
  .ant-modal-body {
    padding: auto 0 0 0;
  }
`

const StatusBox = styled.div`
  width: 16.6666666667%;
  height: 50px;
  background-color: ${props => getThemeByColor(props.color).primaryColor};
`

const colors = ['blue', 'green', 'yellow', 'orange', 'pink', 'red']

const countColor = R.groupBy(({ color }) => {
  return color === colors[0]
    ? colors[0]
    : color === colors[1]
      ? colors[1]
      : color === colors[2]
        ? colors[2]
        : color === colors[3]
          ? colors[3]
          : color === colors[4]
            ? colors[4]
            : colors[5]
})
const formatCount = (value, max) =>
  value === max ? (
    <Icon type="check-circle" style={{ fontSize: '24px', color: '#fff' }} />
  ) : (
    value
  )
const StatusList = ({ value = {}, max }) => (
  <div className="d-flex">
    {colors.map(color => (
      <StatusBox
        key={`${color}`}
        color={color}
        className="d-flex justify-content-center align-items-center"
      >
        {(value[color] && formatCount(value[color].length, max)) || 0}
      </StatusBox>
    ))}
  </div>
)

const MemberList = ({ members }) => (
  <Fragment>
    {members.map(({ nickname, color, bio, avatarUrl }, index) => (
      <Section key={`${nickname}-${index}`}>
        <div className="container">
          <div className="row">
            <div className="col-4 d-flex align-items-center">
              {!avatarUrl ? (
                <Avatar
                  size={45}
                  icon="user"
                  src={avatarUrl}
                  style={{ margin: '0 auto' }}
                />
              ) : (
                <ConnectAvatar
                  size={45}
                  avatarUrl={avatarUrl}
                  color={getThemeByColor(color).primaryColor}
                />
              )}
            </div>
            <div className="col-8 pl-0">
              <Nickname className="my-0">{nickname || '-'}</Nickname>
              <p className="small m-0">{`"${bio ||
                'มาตามล่าหารหัสลับกันเถอะ!'}"`}</p>
            </div>
          </div>
        </div>
      </Section>
    ))}
  </Fragment>
)

const QuestList = ({ quests = [], handleCamera }) => (
  <Fragment>
    {quests && quests.length === 0 ? (
      <LoadingSection />
    ) : quests.length > 0 && quests[0].isLoad === false ? (
      <Section className="d-flex justify-content-center py-4">
        ไม่มีเควสประจำวันจ้า
      </Section>
    ) : (
      quests.map(({ id, title, score, members, colors }) => (
        <Collapse className="mt-3" key={`${id}-${title}`}>
          <Panel
            header={
              <Fragment>
                <div className="container mb-2 d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">{`${title}`}</h5>
                  <Icon
                    onClick={() => handleCamera(id)}
                    type="scan"
                    style={{ fontSize: 24 }}
                  />
                </div>
                <StatusList value={countColor(colors)} max={members.length} />
              </Fragment>
            }
            key="1"
            showArrow={false}
          >
            <div className="container d-flex align-items-center justify-content-between">
              <div className="info">
                <h6 className="mb-0">{`คะแนน : ${score || 0}`}</h6>
              </div>
              <div className="info">
                <h6 className="mb-0">{`จำนวนทั้งหมด ${members.length}`}</h6>
              </div>
            </div>
            <div className="info text-center pt-3">
              <MemberList members={members} />
            </div>
          </Panel>
        </Collapse>
      ))
    )}
  </Fragment>
)

QuestList.propTypes = {
  quests: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      current: PropTypes.number,
      max: PropTypes.number,
      score: PropTypes.number,
      members: PropTypes.array
    })
  )
}

class DailyHunt extends React.Component {
  state = {
    quests: [],
    visible: false,
    questId: '',
    otp: ''
  }

  handleCamera = questId => {
    this.setState({
      visible: !this.state.visible,
      questId
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleChange = event => {
    this.setState({
      otp: event.target.value
    })
  }

  submitOtp = () => {
    message.loading('กำลังถอดรหัสลับ...')
    const { questId, otp } = this.state
    const {
      userInfo: { uid: userUID, color }
    } = this.props
    addQuestMember(questId, otp, { userUID, color })
  }

  handleScan = otp => {
    if (otp) {
      this.setState({ otp })
      message.success('แสกนสำเร็จ กรุณากดยืนยันรหัสลับ!')
    }
  }

  componentDidMount = async () => {
    const currentDate = moment('00:00:00', 'hh:mm:ss').toDate()
    const timestamp = firebase.firestore.Timestamp.fromDate(currentDate)
    await getQuests(timestamp, quests => {
      if (quests === null) {
        this.setState({ quests: [{ isLoad: false }] })
      } else {
        this.setState({ quests })
      }
    })
  }

  render() {
    const { otp, quests } = this.state
    return (
      <Layout>
        <Section id="mode">
          <div className="container position-relative">
            <div className="row">
              <div className="col">
                <h3 className="m-0">ล่ารายชื่อประจำวัน</h3>
              </div>
            </div>
          </div>
        </Section>
        <QuestList handleCamera={this.handleCamera} quests={quests} />
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CodeInput
            otp={otp}
            handleChange={this.handleChange}
            submitOtp={this.submitOtp}
          />
          <Scanner onScan={this.handleScan} />
        </Modal>
      </Layout>
    )
  }
}
export default connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  null
)(DailyHunt)
