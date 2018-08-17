import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #f5f3f7;
  background: #fbfafc;
`

const Menu = styled.div`
  color: #663399;
  font-size: 0.70711rem;
  letter-spacing: 0.0075rem;
  line-height: 1;
  padding: 0.2625rem 1.05rem 0.525rem;
  text-decoration: none;
  text-align: center;

  .icon {
    height: 32px;
    font-size: 28px;
    display: block;
  }
`

const Navbar = () => (
  <Container>
    <Menu>
      <Icon className="icon" type="user" />
      Home
    </Menu>
    <Menu>
      <Icon className="icon" type="book" />
      Daily Hunt
    </Menu>
    <Menu>
      <Icon className="icon" type="qrcode" />
      Scan
    </Menu>
    <Menu>
      <Icon className="icon" type="usergroup-add" />
      Friends
    </Menu>
  </Container>
)

export default Navbar
