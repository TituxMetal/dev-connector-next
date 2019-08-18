import styled, { css } from 'styled-components'
import { tint, transparentize } from 'polished'

const Button = styled.button`
  border-radius: 10px;
  cursor: pointer;
  font: inherit;
  padding: 1rem 2rem;
  text-align: center;
  transition: all ease-in-out 250ms;

  &:active,
  &:focus,
  &:hover {
    border-radius: 5px;
    outline: none;
  }

  ${({ theme, color }) =>
    color &&
    css`
      background: ${transparentize(0.75, theme[color])};
      color: ${tint(0.4, theme[color])};
      border: 2px solid ${tint(0.2, theme[color])};

      &:active,
      &:focus,
      &:hover {
        color: ${tint(0.4, theme[color])};
        background: ${transparentize(0.85, theme[color])};
      }
    `}
`

export default Button
