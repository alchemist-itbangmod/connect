import React from 'react'
import { Spin, Icon } from 'antd'

const antIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />

const Loading = () => (
  <div className="h-100 d-flex justify-content-center align-items-center text-center">
    <Spin indicator={antIcon} tip="รอสักครู่..." />
  </div>
)

export default Loading
