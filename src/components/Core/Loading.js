import React from 'react'
import { Spin, Icon } from 'antd'

import Section from './Section'

const antIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />

const Loading = () => (
  <div className="h-100 d-flex justify-content-center align-items-center text-center">
    <Spin indicator={antIcon} />
  </div>
)

export const LoadingSection = () => (
  <Section className="d-flex justify-content-center py-4">
    <Loading />
  </Section>
)

export default Loading
