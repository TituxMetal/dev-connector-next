import { useContext, useRef } from 'react'

import { UserContext } from '../../context'
import { Button, InputField } from '../UI'
import { Form, Message, Wrapper } from '../../styled'

const LoginForm = () => {
  const { fields, error, submitAuth } = useContext(UserContext)
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
      <InputField ref={inputRef} name='email' type='email' label='Email' value={fields.email} />
      <InputField name='password' type='password' label='Password' value={fields.password} />
      <Wrapper>
        <Button type='submit' color='info'>
          Login
        </Button>
      </Wrapper>
    </Form>
  )
}

export default LoginForm
