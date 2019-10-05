import App from 'next/app'
import { ThemeProvider } from 'styled-components'

import { AuthProvider } from '../store'
import { getSessionFromClient, getSessionFromServer } from '../utils'
import { theme } from '../styled'

class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    const authStatus = !ctx.req ? await getSessionFromClient() : await getSessionFromServer(ctx.req)

    return { authStatus }
  }

  render () {
    const {
      Component,
      authStatus,
      router: { pathname }
    } = this.props

    return (
      <AuthProvider {...authStatus}>
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
