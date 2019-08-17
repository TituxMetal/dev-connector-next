import styled from 'styled-components'

import { NavLink, NavButton } from '../navigation'
import { Button } from '../UI'

const SignedInLinks = () => (
  <>
    <li>
      <NavLink href='/dashboard'>Dashboard</NavLink>
    </li>
    <li>
      <NavLink href='/posts'>Posts</NavLink>
    </li>
    <li>
      <NavButton>
        Logout
      </NavButton>
    </li>
  </>
)

export default SignedInLinks
