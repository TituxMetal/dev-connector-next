import Link from 'next/link'

import { useProtectedRoute } from '../hooks'
import { Page } from '../components/layout'
import { LoginForm } from '../components/sections'
import { Lead } from '../components/UI'

const Login = () => {
  useProtectedRoute(false)

  return (
    <Page title='Login Page'>
      <Lead text='Login' subText='Login to your account' />
      <LoginForm />
      <p>
        Don't have an account?{' '}
        <Link href='/register'>
          <a>Register</a>
        </Link>
      </p>
    </Page>
  )
}

export default Login
