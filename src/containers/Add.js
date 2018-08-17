import React from 'react'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import { Button, Input, Icon } from 'antd'

const Add = () => (
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
            <Button type="dashed" size="large">
              <Icon type="scan" />
              เปิดกล้อง
            </Button>
          </div>
        </div>
      </div>
    </Section>
    <Section id="typing">
      <div className="container text-center position-relative">
        <div className="row">
          <div className="col-12">
            <label htmlFor="">ช่องกรอกรหัสลับ</label>
            <Input className="text-center" />
          </div>
          <div className="col-12 mt-2">
            <Button type="dashed">
              <Icon type="api" />
              ยืนยันรหัสลับ
            </Button>
          </div>
        </div>
      </div>
    </Section>
  </Layout>
)

export default Add
