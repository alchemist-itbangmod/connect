import React from 'react'
import { Button, Input, Icon } from 'antd'

import Section from './Section'

export const CodeInput = ({ otp, handleChange, submitOtp }) => (
  <Section id="typing">
    <div className="container text-center position-relative">
      <div className="row">
        <div className="col-12">
          <label htmlFor="">ช่องกรอกรหัสลับ</label>
          <Input
            className="text-center"
            onChange={handleChange}
            value={otp}
            maxLength={5}
          />
        </div>
        <div className="col-12 mt-2">
          <Button type="dashed" onClick={submitOtp}>
            <Icon type="api" />
            ยืนยันรหัสลับ
          </Button>
        </div>
      </div>
    </div>
  </Section>
)
