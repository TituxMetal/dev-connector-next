import Link from 'next/link'

import { Page } from '../components/layout'
import { RegisterForm } from '../components/sections'
import { Button, Lead } from '../components/UI'

const Register = () => {
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
