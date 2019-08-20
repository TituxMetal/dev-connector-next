import App, { Container } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { ContextProvider } from '../context'
import { getSessionFromClient, getSessionFromServer } from '../lib'
import { theme } from '../styled'

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}

    const authStatus = !ctx.req ? await getSessionFromClient() : await getSessionFromServer(ctx.req)

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, authStatus }
  }

  render () {
    const {
      Component,
      authStatus,
      pageProps,
      router: { pathname }
    } = this.props

    return (
      <Container>
        <ContextProvider pathname={pathname} authStatus={authStatus}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ContextProvider>
      </Container>
    )
  }
}

export default MyApp
