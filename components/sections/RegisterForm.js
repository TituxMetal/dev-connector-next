import { useContext, useRef } from 'react'

import { UserContext } from '../../context'
import { Button, InputField } from '../UI'
import { Form, Message, Wrapper } from '../../styled'

const RegisterForm = () => {
  const { fields, error, submitAuth } = useContext(UserContext)
  const inputRef = useRef()

  const handleSubmit = async event => {
    event.preventDefault()

    const { name, email, password } = fields

    await submitAuth({ name, email, password })
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error.message && (
        <Message danger global>
          {error.message}
        </Message>
      )}
      <InputField ref={inputRef} name='name' type='text' label='Name' value={fields.name} />
      <InputField name='email' type='email' label='Email' value={fields.email} />
      <InputField name='password' type='password' label='Password' value={fields.password} />
      <Wrapper>
        <Button type='submit' color='info'>
          Register
        </Button>
      </Wrapper>
    </Form>
  )
}

export default RegisterForm
