import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'

const Container = styled.div`
  height: 100%;
  min-height: 100%;
`

const Layout = ({ children }) => (
  <Container>
    {children}
    <Navbar />
  </Container>
)

export default Layout
