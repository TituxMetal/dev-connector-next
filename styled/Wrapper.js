import styled, { css } from 'styled-components'
import { shade } from 'polished'

const Wrapper = styled.section`
  display: flex;
  margin-bottom: 2rem;
  padding: 0;

  ${({ center, color, size, spaced, theme, vertical }) => css`
    ${color && `background-color: ${shade(0.4, theme[color])}; border-radius: 6px;`}
    ${vertical && `flex-direction: column;`}
    ${center && `align-items: center; justify-content: center;`}
    ${spaced && `justify-content: space-${spaced};`}
    width: ${size || '100%'};
  `}
`

export default Wrapper
