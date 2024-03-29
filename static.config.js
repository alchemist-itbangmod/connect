import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'

export default {
  disableRouteInfoWarning: true,
  getSiteData: () => ({
    title: 'Connect.'
  }),
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Rubik"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Kanit"
              rel="stylesheet"
            />
            <link
              href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
              crossOrigin="anonymous"
            />
            <title>IT Connect 2018 | กิจกรรมตามล่ารหัสลับ</title>
            <meta property="og:title" content="IT Connect 2018" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://connect.itbangmod.in.th" />
            <meta property="og:image" content="/logo.png" />

            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#204dd3"
            />
            <meta name="msapplication-TileColor" content="#204dd3" />
            <meta name="theme-color" content="#204dd3" />

            {renderMeta.styleTags}
          </Head>
          <Body>
            {children}

            <script
              src="https://cdn.ravenjs.com/3.26.4/raven.min.js"
              crossOrigin="anonymous"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                Raven.config('https://7a8d4d33f145426d9eb80b930ac0ea8e@sentry.io/1264885').install()
              `
              }}
            />
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-82920412-5"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || []; function gtag()
              {dataLayer.push(arguments)}
              gtag('js', new Date()); gtag('config', 'UA-82920412-5');
              `
              }}
            />
          </Body>
        </Html>
      )
    }
  }
}
