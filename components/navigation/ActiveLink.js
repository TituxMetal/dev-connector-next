import Link from 'next/link'
import { useRouter } from 'next/router'
import { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const { pathname } = useRouter()
  const child = Children.only(children)
  const className =
    pathname === props.href ? `${child.props.className || ''} isActive`.trim() : null

  return (
    <Link {...props} passHref>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default ActiveLink
