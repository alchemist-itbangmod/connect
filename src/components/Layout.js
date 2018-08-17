import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  min-height: 100%;
`

const Layout = ({ children }) => <Container>{children}</Container>

export default Layout
