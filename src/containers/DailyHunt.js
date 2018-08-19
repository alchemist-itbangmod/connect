import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import firebase from 'firebase/app'

import { Collapse, Icon, Modal as DefaultModal } from 'antd'

import { getThemeByColor } from '../App'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import Scanner from '../components/Core/Scanner'
import { CodeInput } from '../components/Core/Input'

import { getQuests } from '../firebase/data'
import { addQuestMember } from '../firebase/add'

const Nickname = styled.h3`
  margin-bottom: 0;
  text-decoration-line: ${props => (props.isScan ? 'line-through' : 'un-set')};
  line-height: 1;
`
const Panel = styled(Collapse.Panel)`
  .ant-collapse-header {
    padding-left: 0 !important;
  }
`

const Modal = styled(DefaultModal)`
  top: 25px;
  .ant-modal-body {
    padding: auto 0 0 0;
  }
`

const StatusBox = styled.div`
  max-width: 16.6666666667%;
  width: 100px;
  height: 50px;
  background-color: ${props => getThemeByColor(props.color).primaryColor};
`

const colors = ['blue', 'green', 'yellow', 'orange', 'pink', 'red']

const StatusList = ({ value = 0 }) => (
  <div className='d-flex'>
    {
      colors.map(color => (
        <StatusBox color={color} className='d-flex justify-content-center align-items-center'>
          {value}
        </StatusBox>
      ))
    }
  </div>
)

const MemberList = ({ members }) => (
  <Fragment>
    {
      members.map(({ nickname, isScan }, index) => (
        <Nickname className='py-2' key={`${nickname}-${index}`} isScan={isScan}>
          {nickname}
        </Nickname>
      ))
    }
  </Fragment>
)

const QuestList = ({ quests, handleCamera }) => (
  <Fragment>
    { quests && quests.length > 0 && quests.map(({ id, title, score, members }, index) => (
      <Collapse className="mt-3" key={`quest-${index}`}>
        <Panel
          header={
            <div className="container d-flex align-items-center justify-content-between">
              <h5 className="mb-0">{`${title}`}</h5>
              <Icon onClick={() => handleCamera(id)} type="scan" style={{ fontSize: 24 }} />
            </div>
          }
          key="1"
          showArrow={false}
        >
          <div className="container d-flex align-items-center justify-content-between">
            <div className="info">
              <h6 className="mb-0">{`คะแนน : ${score}`}</h6>
            </div>
            <div className="info">
              <h6 className="mb-0">{`จำนวน ${members.length}`}</h6>
            </div>
          </div>
          <div className="info text-center pt-3">
            <MemberList members={members} />
          </div>
        </Panel>
        <StatusList />
      </Collapse>
    ))
    }
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
    const { questId, otp } = this.state
    const { userInfo: { uid: userUID, color } } = this.props
    addQuestMember(questId, otp, { userUID, color })
  }

  handleScan = otp => {
    if (otp) {
      this.setState({ otp })
    }
  }

  componentDidMount = async () => {
    const currentDate = moment('00:00:00', 'hh:mm:ss').toDate()
    const timestamp = firebase.firestore.Timestamp.fromDate(currentDate)
    const quests = await getQuests(timestamp)
    console.log(quests)
    this.setState({ quests })
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
