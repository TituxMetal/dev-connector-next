import styled from 'styled-components'
import { tint } from 'polished'

import { ActiveLink } from '../navigation'

const NavLink = styled.a`
  color: ${({ theme }) => tint(0.35, theme.secondary)};
  cursor: pointer;
  text-decoration: none;
  padding: 1rem 0.5rem;
  margin: 0 0.25rem;
  font-weight: 700;

  &:hover {
    color: ${({ theme }) => tint(0.5, theme.secondary)};
  }

  &.isActive {
    color: ${({ theme }) => tint(0.3, theme.complementary)};

    &:hover {
      color: ${({ theme }) => tint(0.5, theme.complementary)};
    }
  }

  @media screen and (min-width: 600px) {
    padding: 2rem 0.5rem;
  }
`

export const NavButton = styled(NavLink)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin: -1rem 0.25rem;
  padding: 1rem 0.5rem;

  @media screen and (min-width: 600px) {
    margin: -2rem 0.5rem;
    padding: 2rem 0.5rem;
  }
`

export default ({ children, href }) => (
  <ActiveLink href={href}>
    <NavLink>{children}</NavLink>
  </ActiveLink>
)
