import React from 'react'
<<<<<<< HEAD
import { Button, message, Icon } from 'antd'
=======
import styled from 'styled-components'
import DefaultQrReader from 'react-qr-reader'
import { Button, Input, Icon, message } from 'antd'
>>>>>>> 492a8d5ec73fa75f026a006902076c1390cda197
import { connect } from 'react-redux'

import { addFriendWithOTP } from '../firebase/add'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import Scanner from '../components/Core/Scanner'
import { CodeInput } from '../components/Core/Input'

class Add extends React.Component {
  state = {
    cameraOpen: false,
    otp: ''
  }

  openCamera = () => {
    const { cameraOpen } = this.state
    this.setState({ cameraOpen: !cameraOpen })
  }

  handleScan = otp => {
    if (otp !== null) {
      this.setState({ otp })
    }
  }
  handleChange = event => {
    this.handleScan(event.target.value)
  }

  submitOtp = async () => {
    message.loading('Adding...')
    await addFriendWithOTP(this.props.userInfo.uid, this.state.otp)
    this.setState({
      otp: ''
    })
  }

  render() {
    const { cameraOpen, otp } = this.state
    return (
      <Layout>
        <Section id="mode">
          <div className="container text-center position-relative">
            <div className="row">
              <div className="col">
                <Button type="dashed" size="large">
                  ตามล่าลายชื่อ
                </Button>
              </div>
              <div className="col">
                <Button type="dashed" size="large">
                  ตามล่าสายรหัส
                </Button>
              </div>
            </div>
          </div>
        </Section>
        <CodeInput
          otp={otp}
          handleChange={this.handleChange}
          submitOtp={this.submitOtp}
        />
        <Section id="scan-qrcode">
          <div className="container text-center position-relative">
            <div className="row">
              <div className="col-12 py-2 px-0">
                {!cameraOpen ? (
                  <Button onClick={this.openCamera} type="dashed" size="large">
                    <Icon type="scan" />
                    เปิดกล้อง
                  </Button>
                ) : (
                  <Scanner onScan={this.handleScan} />
                )}
              </div>
            </div>
          </div>
        </Section>
<<<<<<< HEAD
=======
        <Section id="typing">
          <div className="container text-center position-relative">
            <div className="row">
              <div className="col-12">
                <label htmlFor="">ช่องกรอกรหัสลับ</label>
                <Input
                  className="text-center"
                  onChange={this.handleChange}
                  value={otp}
                />
              </div>
              <div className="col-12 mt-2">
                <Button type="dashed" onClick={() => this.submitOtp()}>
                  <Icon type="api" />
                  ยืนยันรหัสลับ
                </Button>
              </div>
            </div>
          </div>
        </Section>
>>>>>>> 492a8d5ec73fa75f026a006902076c1390cda197
      </Layout>
    )
  }
}

export default connect(
  state => ({
    userInfo: state.user.userInfo
  }),
  null
)(Add)
