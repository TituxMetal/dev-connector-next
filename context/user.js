import { useEffect, useState, createContext } from 'react'
import Router from 'next/router'

import { register, login, logout } from '../lib'
export const UserContext = createContext()

export const UserProvider = ({ children, pathname, authStatus }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authStatus.success)
  const initialFields = { name: '', email: '', password: '' }
  const [fields, setFields] = useState(initialFields)
  const [user, setUser] = useState(authStatus.user)
  const [error, setError] = useState('')

  useEffect(
    () => {
      user !== authStatus.user && setUser(authStatus.user)
      isAuthenticated !== authStatus.success && setIsAuthenticated(authStatus.success)

      return () => {
        setError('')
      }
    },
    [authStatus]
  )

  const handleChange = event => setFields({ ...fields, [event.target.name]: event.target.value })

  const submitAuth = async authData => {
    try {
      const { data } =
        (pathname === '/register' && (await register(authData))) ||
        (pathname === '/login' && (await login(authData)))

      setFields(initialFields)
      setError('')
      Router.push('/')
    } catch (err) {
      const msg = (err.response.data && err.response.data.errors) || err.massage
      setError(msg)
    }
  }

  const handleLogout = async () => {
    const { data } = await logout()

    if (data.success) {
      setUser('')
      setIsAuthenticated(false)
    }
  }

  return (
    <UserContext.Provider
      value={{ error, fields, handleChange, handleLogout, isAuthenticated, submitAuth }}>
      {children}
    </UserContext.Provider>
  )
}
