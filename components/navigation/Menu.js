import { useContext } from 'react'
import styled from 'styled-components'
import { Code } from 'styled-icons/fa-solid/Code'
import { shade, tint, transparentize } from 'polished'

import { UserContext } from '../../context'
import { NavLink, SignedInLinks, SignedOutLinks } from '../navigation'

const NavBar = styled.nav`
  background-color: ${({ theme }) => shade(0.2, theme.primary)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2rem;
  position: relative;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Brand = styled.section`
  display: flex;
  align-items: center;

  svg {
    color: ${({ theme }) => transparentize(0.5, theme.complementary)};
    height: 2.75rem;
  }

  & > a {
    font-size: 2.4rem;
    margin-left: -5rem;
    padding-left: 6rem;
  }
`

const List = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 1rem;
`

const Menu = () => {
  const { isAuthenticated, handleLogout } = useContext(UserContext)

  return (
    <NavBar>
      <Brand>
        <Code />
        <NavLink href='/'>Dev connector</NavLink>
      </Brand>
      <List>
        <li>
          <NavLink href='/developers'>Developers</NavLink>
        </li>
        {isAuthenticated ? <SignedInLinks logout={handleLogout} /> : <SignedOutLinks />}
      </List>
    </NavBar>
  )
}

export default Menu
