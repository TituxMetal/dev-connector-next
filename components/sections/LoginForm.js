import { useContext, useRef } from 'react'

import { UserContext } from '../../context'
import { Button, InputField } from '../UI'
import { Form, Message, Wrapper } from '../../styled'

const LoginForm = () => {
  const { fields, error, handleChange, submitAuth } = useContext(UserContext)
  const inputRef = useRef()

  const handleSubmit = async event => {
    event.preventDefault()

    const { email, password } = fields

    await submitAuth({ email, password })
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
