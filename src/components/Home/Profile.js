import React from 'react'
import { Avatar } from 'antd'
import { capitalizeFirstLetter } from '../../libs/capitalize-first-letter'

const Profile = ({ stdID, name, level, nickName }) => (
  <React.Fragment>
    <Avatar size={64} icon="user" />
    <h2 className="my-1">{nickName || '-'}</h2>
    <p className="small mb-0 mt-2">{`รหัสนักศึกษา: ${stdID || '-'}`}</p>
    <p className="mb-0">{`${capitalizeFirstLetter(name)} / ชั้นปี: ${level ||
      '-'}`}</p>
  </React.Fragment>
)

export default Profile
