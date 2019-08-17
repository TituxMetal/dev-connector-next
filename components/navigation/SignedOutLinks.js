import { NavLink } from '../navigation'

const SignedOutLinks = () => (
  <>
    <li>
      <NavLink href='/register'>Register</NavLink>
    </li>
    <li>
      <NavLink href='/login'>Login</NavLink>
    </li>
  </>
)

export default SignedOutLinks
