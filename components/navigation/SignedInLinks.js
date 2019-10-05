import { useAuthDispatch } from '../../store'
import { NavLink, NavButton } from '../navigation'

const SignedInLinks = () => {
  const { authLogoutUser, dispatch } = useAuthDispatch()

  const handleLogout = async () => {
    await authLogoutUser(dispatch)
  }

  return (
    <>
      <li>
        <NavLink href='/dashboard'>Dashboard</NavLink>
      </li>
      <li>
        <NavLink href='/posts'>Posts</NavLink>
      </li>
      <li>
        <NavButton onClick={handleLogout}>Logout</NavButton>
      </li>
    </>
  )
}

export default SignedInLinks
