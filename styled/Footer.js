import styled from 'styled-components'
import { shade } from 'polished'

const Footer = styled.footer`
  background-color: ${({ theme }) => shade(0.2, theme.primary)};
  color: ${({ theme }) => theme.textOnMain};
  display: flex;
  justify-content: center;
  width: 100%;
`

export default Footer
