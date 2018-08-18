import React from 'react'
import styled from 'styled-components'
import DefaultQrReader from 'react-qr-reader'

const QrReader = styled(DefaultQrReader)`
    width: 100%;
    section {
        padding-top: 0 !important;
    }
    div, video {
        position: static !important;
        border: none !important;
        box-shadow: none !important;
    }
`

const handleError = err => {
  console.log(err)
}

const Scanner = ({onScan}) => (
  <QrReader
    delay={300}
    onError={handleError}
    onScan={onScan}
  />
)

export default Scanner
