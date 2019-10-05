import { useRef } from 'react'

import { useAuthState, useAuthDispatch } from '../../store'
import { Button, InputField } from '../UI'
import { Form, Message, Wrapper } from '../../styled'

const RegisterForm = () => {
  const { fields, error } = useAuthState()
  const { fieldChange, authRegisterUser, dispatch } = useAuthDispatch()
  const { name, email, password } = fields
  const inputRef = useRef()

  const handleChange = event => {
    dispatch(fieldChange(event.target.name, event.target.value))
  }

  const handleSubmit = async event => {
    event.preventDefault()

    await authRegisterUser({ name, email, password }, dispatch)
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
        value={name}
        error={error.name}
      />
      <InputField
        change={handleChange}
        name='email'
        type='email'
        label='Email'
        value={email}
        error={error.email}
      />
      <InputField
        change={handleChange}
        name='password'
        type='password'
        label='Password'
        value={password}
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
