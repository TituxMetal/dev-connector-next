import Link from 'next/link'

import { useProtectedRoute } from '../hooks'
import { Page } from '../components/layout'
import { RegisterForm } from '../components/sections'
import { Lead } from '../components/UI'

const Register = () => {
  useProtectedRoute(false)

  return (
    <Page title='Register Page'>
      <Lead text='Register' subText='Create your account' />
      <RegisterForm />
      <p>
        Already have an account?{' '}
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </p>
    </Page>
  )
}

export default Register
