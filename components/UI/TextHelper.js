import styled from 'styled-components'

const Text = styled.small`
  margin-top: 1rem;
`

const TextHelper = ({ children }) => <Text>{children}</Text>

export default TextHelper
