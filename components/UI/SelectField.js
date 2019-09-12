import styled from 'styled-components'
import { transparentize, tint } from 'polished'

import { Message } from '../../styled'

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  padding-bottom: 2rem;
  width: 100%;
`

const Select = styled.select`
  appearance: none;
  outline: none;
  box-shadow: none;
  background-color: ${({ error, theme }) =>
    error ? transparentize(0.8, theme.danger) : 'transparent'};
  border: 2px solid ${({ error, theme }) => (error ? tint(0.2, theme.danger) : theme.secondary)};
  border-radius: 5px;
  color: ${({ error, theme }) => (error ? tint(0.4, theme.danger) : theme.textOnMain)};
  padding: 0.5rem;
`

const SelectField = ({ change, children, defaults, error, name, options, value }) => (
  <FormControl>
    <Select error={error} onChange={change} name={name} defaults={defaults} value={value}>
      {options.map((option, key) => (
        <option value={option} key={key}>
          {option}
        </option>
      ))}
    </Select>
    {children}
    {error && <Message danger>{error}</Message>}
  </FormControl>
)

export default SelectField
