import { forwardRef, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { transparentize, tint } from 'polished'

import { UserContext } from '../../context'
import { Message } from '../../styled'

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin-bottom: 2rem;
  width: 100%;

  &.error {
    input,
    textarea {
      color: ${({ theme }) => tint(0.4, theme.danger)};
      background: ${({ theme }) => transparentize(0.8, theme.danger)};
      border: 2px solid ${({ theme }) => tint(0.2, theme.danger)};

      &::placeholder {
        color: ${({ theme }) => tint(0.4, theme.danger)};
      }
    }
  }

  input {
    border: 2px solid ${({ theme }) => theme.secondary};
    border-radius: 5px;
    display: block;
    margin: 0;
    padding: 0.5rem;
    width: 100%;
  }
`

const InputField = ({ change, className, name, label, type, value }, ref) => {
  const { handleChange, error } = useContext(UserContext)

  useEffect(() => {
    ref && ref.current.focus()
  }, [])

  return (
    <Field className={error[name] && 'error'}>
      <input
        onChange={handleChange}
        ref={ref}
        name={name}
        type={type}
        value={value}
        placeholder={label}
      />
      {error[name] && <Message danger>{error[name]}</Message>}
    </Field>
  )
}

export default forwardRef(InputField)
