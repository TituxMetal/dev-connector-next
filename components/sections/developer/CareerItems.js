import { tint } from 'polished'
import styled from 'styled-components'

export const List = styled.ul`
  margin: 1rem;
`

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => tint(0.4, theme.secondary)};
  padding: 1rem 0;

  &:last-child {
    border-bottom: none;
  }
`

export const Title = styled.h3`
  color: ${({ theme }) => tint(0.4, theme.complementary)};
  margin: 1rem 0;
`

export const P = styled.p`
  margin: 1rem 0;
`
