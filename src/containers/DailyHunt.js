import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Collapse, Icon, Modal } from 'antd'

import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import Scanner from '../components/Core/Scanner'
import { CodeInput } from '../components/Core/Input'

const Nickname = styled.h3`
  margin: .3em 0;
  text-decoration-line: ${props => props.isScan ? 'line-through' : 'un-set'};
`
const Panel = styled(Collapse.Panel)`

`

const QuestList = ({ quests, handleCamera }) => (
  <Fragment>
    {quests.map(({ title, score, members }, index) => (
      <Collapse className="mt-3" key={`quest-${index}`}>
        <Panel
          header={
            <div className="container d-flex align-items-center justify-content-between">
              <h5 className="mb-0">{`ค้นหา ${title}`}</h5>
              <Icon onClick={handleCamera} type="scan" style={{ fontSize: 24 }} />
            </div>
          }
          key="1"
          showArrow={false}
        >
          <div className="container d-flex align-items-center justify-content-between">
            <div className="info">
              <h6 className="mb-0">{`คะแนน : ${score}`}</h6>
            </div>
            <div className="info text-center">
              <h6 className="mb-0">{`ทั้งหมด ${members.length} คน`}</h6>
            </div>
          </div>
          <div className="info text-center">
            {
              members.map(({ nickname, isScan }, index) => (
                <Nickname key={`${nickname}-${index}`} isScan={isScan}>{nickname}</Nickname>
              ))
            }
          </div>
        </Panel>
      </Collapse>
    ))}
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

const example = {
  title: 'แก๊งเดฟวะหลับเป่อ',
  current: 1,
  score: 3000,
  members: [
    {
      nickname: 'เต้',
      isScan: false
    }
  ]
}

class DailyHunt extends React.Component {
  state = { visible: false, otp: '' }

  handleCamera = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleChange = (event) => {
    this.setState({
      otp: event.target.value
    })
  }

  submitOtp = () => {

  }

  handleScan = otp => {
    console.log(otp)
    if (otp) {
      this.setState({ otp })
    }
  }

  render() {
    const { otp } = this.state
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
        <QuestList handleCamera={this.handleCamera} quests={[example, example, example]} />
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <CodeInput otp={otp} handleChange={this.handleChange} submitOtp={this.submitOtp} />
          <Scanner onScan={this.handleScan} />
        </Modal>
      </Layout>
    )
  }
}
export default DailyHunt
