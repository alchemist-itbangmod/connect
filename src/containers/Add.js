import React from 'react'
import styled from 'styled-components'
import DefaultQrReader from 'react-qr-reader'
import { Button, Input, Icon } from 'antd'
import { connect } from 'react-redux'

import { addFriendWithOTP } from '../firebase/add'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'

const QrReader = styled(DefaultQrReader)`
  width: 100%;
`

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
    console.log(otp)
    if (otp) {
      this.setState({ otp })
    }
  }

  handleError = err => {
    console.log(err)
  }

  handleChange = event => {
    this.handleScan(event.target.value)
  }

  submitOtp = () => {
    addFriendWithOTP(this.props.userInfo.uid, this.state.otp)
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
        <Section id="scan-qrcode">
          <div className="container text-center position-relative">
            <div className="row">
              <div className="col-12 py-4">
                {!cameraOpen ? (
                  <Button onClick={this.openCamera} type="dashed" size="large">
                    <Icon type="scan" />
                    เปิดกล้อง
                  </Button>
                ) : (
                  <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                  />
                )}
              </div>
            </div>
          </div>
        </Section>
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
                <Button type="dashed" onClick={this.submitOtp}>
                  <Icon type="api" />
                  ยืนยันรหัสลับ
                </Button>
              </div>
            </div>
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
)(Add)
