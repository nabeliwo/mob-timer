import React from 'react'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { ThemeProvider, createTheme } from 'smarthr-ui'

import { htmlFontSize } from '../theme'

const theme = createTheme({
  size: { htmlFontSize },
})

const MyApp = ({ Component, pageProps }) => (
  <>
    <GlobalStyle />

    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default MyApp

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
  }
  body {
    word-wrap: break-word;
    font-family: system-ui,sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img {
    vertical-align: middle;
  }
  input, button, textarea {
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    background-color: inherit;
    color: inherit;
  }
`
