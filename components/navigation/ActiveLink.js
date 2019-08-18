import Link from 'next/link'
import { withRouter } from 'next/router'
import { Children } from 'react'

const ActiveLink = withRouter(({ router, children, ...props }) => {
  const child = Children.only(children)
  let className = child.props.className || ''

  return (
    <Link {...props} passHref>
      {React.cloneElement(Children.only(children), {
        className: router.pathname === props.href ? `${className} isActive`.trim() : null
      })}
    </Link>
  )
})

export default ActiveLink
