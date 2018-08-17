import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import { Link } from 'react-static'

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
  color: #307375;
  font-size: 0.70711rem;
  letter-spacing: 0.0075rem;
  line-height: 1;
  padding: 0.525rem 1.05rem;
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
    <Link to="/">
      <Menu>
        <Icon className="icon" type="user" />
        Home
      </Menu>
    </Link>
    <Link to="/daily-hunt">
      <Menu>
        <Icon className="icon" type="book" />
        Daily Hunt
      </Menu>
    </Link>
    <Link to="/add">
      <Menu>
        <Icon className="icon" type="qrcode" />
        Add
      </Menu>
    </Link>
    <Link to="/friends">
      <Menu>
        <Icon className="icon" type="usergroup-add" />
        Friends
      </Menu>
    </Link>
  </Container>
)

export default Navbar
