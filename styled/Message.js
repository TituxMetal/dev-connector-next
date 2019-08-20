import styled, { css } from 'styled-components'
import { tint } from 'polished'

import { type } from '../styled'

const Message = styled.p`
  font-weight: 700;
  margin: 1rem 0;

  ${({ global, theme, ...rest }) => css`
    color: ${tint(0.4, theme[type(rest)])};
    ${global &&
      `
        border: 2px solid ${tint(0.2, theme[type(rest)])};
        border-radius: 8px;
        padding: 2rem;
        text-align: center;
        width: 100%;
    `}
  `}
`

export default Message
