import React from 'react'
import styled from 'styled-components'
import { Icon, Badge } from 'antd'
import { NavLink } from 'react-static'

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

const Menu = styled(NavLink)`
  color: ${props => props.theme.primaryColor};
  font-size: 0.70711rem;
  letter-spacing: 0.0075rem;
  line-height: 1;
  padding: 0.525rem 1.05rem;
  text-decoration: none;
  text-align: center;
  position: relative;
  transition: all 0.3s;

  // Active Mode
  opacity: 0.4;
  &.active {
    opacity: 1;
  }

  .icon {
    height: 32px;
    font-size: 28px;
    display: block;
  }
`

const Navbar = () => (
  <Container>
    <Menu to="/" exact>
      <Icon className="icon" type="user" />
      Home
    </Menu>
    {/* <Menu to="/daily-hunt">
      <Icon className="icon" type="book" />
      Daily Hunt
    </Menu> */}
    <Menu to="/add">
      <Icon className="icon" type="qrcode" />
      Add
    </Menu>
    <Menu to="/friends">
      <Icon className="icon" type="profile" />
      List
    </Menu>
  </Container>
)

export default Navbar
