import React from 'react'
import styled from 'styled-components'

const AvatarContainer = styled.div`
  background-image: url('${props => props.src}');
  background-position: 50% 50%;
  background-size: cover;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  border-radius: 50%;
  margin: 0 auto;
border: 2px solid ${props => props.theme.primaryColor};
`

const Avatar = ({ avatarUrl, size = 64 }) => (
  <AvatarContainer src={avatarUrl} height={size} width={size} />
)

export default Avatar
