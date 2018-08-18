import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  background: white;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
`

export default ({ children, ...props }) => (
  <Section className="py-3 my-2" {...props}>
    {children}
  </Section>
)
