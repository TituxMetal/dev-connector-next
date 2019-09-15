import { useContext, useRef } from 'react'

import { UserContext } from '../../context'
import { Button, InputField } from '../UI'
import { Form, Message, Wrapper } from '../../styled'

const RegisterForm = () => {
  const { fields, error, handleChange, submitAuth } = useContext(UserContext)
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
      <InputField
        ref={inputRef}
        change={handleChange}
        name='name'
        type='text'
        label='Name'
        value={fields.name}
        error={error.name}
      />
      <InputField
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
          Register
        </Button>
      </Wrapper>
    </Form>
  )
}

export default RegisterForm
