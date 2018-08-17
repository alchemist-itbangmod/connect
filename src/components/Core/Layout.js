import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'

const Container = styled.div`
  min-height: 100%;
  padding-bottom: 60px;
`

const Layout = ({ children }) => (
  <React.Fragment>
    <Container>{children}</Container>
    <Navbar />
  </React.Fragment>
)

export default Layout
