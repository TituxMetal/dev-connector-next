import { createContext, useEffect, useContext, useMemo, useReducer } from 'react'

import { authReducer } from './reducers'
import {
  authLoginUser,
  authRegisterUser,
  authLogoutUser,
  authUpdateStore,
  toggleIsLoading,
  userMustBeAuth,
  userMustNotBeAuth,
  fieldChange
} from './actions'
import { checkContext } from '../utils'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

export const AuthProvider = ({ children, success, user }) => {
  const initialState = {
    user,
    isAuthenticated: success,
    fields: {
      name: '',
      email: '',
      password: ''
    },
    error: false,
    isLoading: false
  }
  const [state, dispatch] = useReducer(authReducer, initialState)
  useMemo(() => ({ state }), [state])

  useEffect(
    () => {
      !state.isAuthenticated === success && dispatch(authUpdateStore({ success, user }))
    },
    [user, success]
  )

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useAuthState = () => {
  const context = useContext(AuthStateContext)

  checkContext(context, 'useAuthState', 'AuthProvider')

  return context
}

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext)

  checkContext(context, 'useAuthDispatch', 'AuthProvider')

  return {
    authLoginUser,
    authRegisterUser,
    authLogoutUser,
    toggleIsLoading,
    userMustBeAuth,
    userMustNotBeAuth,
    fieldChange,
    dispatch: context
  }
}
