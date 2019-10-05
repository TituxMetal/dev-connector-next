import { useRef } from 'react'

import { useAuthState, useAuthDispatch } from '../../store'
import { Button, InputField } from '../UI'
import { Form, Message, Wrapper } from '../../styled'

const LoginForm = () => {
  const { fields, error } = useAuthState()
  const { fieldChange, authLoginUser, dispatch } = useAuthDispatch()
  const { email, password } = fields
  const inputRef = useRef()

  const handleChange = event => {
    dispatch(fieldChange(event.target.name, event.target.value))
  }

  const handleSubmit = async event => {
    event.preventDefault()

    await authLoginUser({ email, password }, dispatch)
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error.message && (
        <Message danger global>
          {error.message}
        </Message>
      )}
      <InputField
        ref={inputRef}
        change={handleChange}
        name='email'
        type='email'
        label='Email'
        value={fields.email}
        error={error.email}
      />
      <InputField
        change={handleChange}
        name='password'
        type='password'
        label='Password'
        value={fields.password}
        error={error.password}
      />
      <Wrapper>
        <Button type='submit' color='info'>
          Login
        </Button>
      </Wrapper>
    </Form>
  )
}

export default LoginForm
