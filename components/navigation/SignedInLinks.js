import styled from 'styled-components'

import { NavLink, NavButton } from '../navigation'
import { Button } from '../UI'

const SignedInLinks = ({ logout }) => (
  <>
    <li>
      <NavLink href='/dashboard'>Dashboard</NavLink>
    </li>
    <li>
      <NavLink href='/posts'>Posts</NavLink>
    </li>
    <li>
      <NavButton onClick={logout}>Logout</NavButton>
    </li>
  </>
)

export default SignedInLinks
