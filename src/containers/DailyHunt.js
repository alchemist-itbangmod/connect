import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Layout from '../components/Core/Layout'
import Section from '../components/Core/Section'

const QuestList = ({ quests }) => (
  <Fragment>
    {
      quests.map(({title, current, max, score}, index) => (
        <Section key={`quest-${index}`} >
          <div className="container d-flex align-items-center justify-content-between">
            <div className="info">
              <h5 className="mb-0">{`ค้นหา ${title}`}</h5>
              <h6>{`คะแนน : ${score}`}</h6>
            </div>
            <div className="info text-center">
              <h6 className="mb-0">{`จำนวน`}</h6>
              <h6 className="mb-0">{`${current}/${max}`}</h6>
            </div>
          </div>
        </Section>
      ))
    }
  </Fragment>
)

QuestList.propTypes = {
  quests: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    current: PropTypes.number,
    max: PropTypes.number,
    score: PropTypes.number
  }))
}

const example = {
  title: 'แก๊งเดฟวะหลับเป่อ',
  current: 1,
  max: 3,
  score: 3000
}

const DailyHunt = () => (
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
    <QuestList quests={[example, example, example]} />
  </Layout>
)

export default DailyHunt
