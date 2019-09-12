import { forwardRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { transparentize, tint } from 'polished'

import { Message } from '../../styled'

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin-bottom: 2rem;
  width: 100%;

  ${({ error, theme }) =>
    error &&
    css`
      & input,
      & textarea {
        color: ${({ theme }) => tint(0.4, theme.danger)};
        background: ${({ theme }) => transparentize(0.8, theme.danger)};
        border: 2px solid ${({ theme }) => tint(0.2, theme.danger)};

        &::placeholder {
          color: ${({ theme }) => tint(0.4, theme.danger)};
        }
      }
    `}
`

const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 5px;
  display: block;
  margin: 0;
  padding: 0.5rem;
  width: 100%;
`

const Textarea = styled.textarea`
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.textOnMain};
  padding: 0.5rem;
`

const InputField = ({ change, children, error, name, label, type, value }, ref) => {
  useEffect(() => {
    ref && ref.current.focus()
  }, [])

  return (
    <Field error={error}>
      {type === 'textarea' ? (
        <Textarea onChange={change} name={name} placeholder={label} value={value} />
      ) : (
        <Input
          onChange={change}
          ref={ref}
          name={name}
          type={type}
          value={value}
          placeholder={label}
        />
      )}
      {children}
      {error && <Message danger>{error}</Message>}
    </Field>
  )
}

export default forwardRef(InputField)
