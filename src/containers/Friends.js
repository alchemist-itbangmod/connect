import React from 'react'
import { capitalizeFirstLetter } from '../libs/capitalize-first-letter'
import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'
import { Avatar } from 'antd'

const Home = () => (
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
      {[...Array(360)].map((friend, index) => (
        <Section id="friend" key={index}>
          <div className="container position-relative d-flex align-items-center">
            <Avatar size={64} icon="user" />
            <div className="info ml-2">
              <h4 className="my-0">{'เฟิส'}</h4>
              <p className="small mb-0">
                {`${capitalizeFirstLetter(`kanisorn sutham`)} / ชั้นปี: 4`}
              </p>
              <p className="small m-0">{`Bio: "อยากบอกพี่รหัสว่า ชอบกินเหล้าค้าบ"`}</p>
            </div>
          </div>
        </Section>
      ))}
    </section>
  </Layout>
)

export default Home
