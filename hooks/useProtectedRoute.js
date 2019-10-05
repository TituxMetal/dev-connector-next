import { useEffect } from 'react'

import { useAuthDispatch, useAuthState } from '../store'

export const useProtectedRoute = mustBeAuth => {
  const { isAuthenticated } = useAuthState()
  const { dispatch, toggleIsLoading, userMustBeAuth, userMustNotBeAuth } = useAuthDispatch()

  useEffect(
    () => {
      mustBeAuth === true
        ? !isAuthenticated && userMustBeAuth(dispatch)
        : mustBeAuth === false
          ? isAuthenticated && userMustNotBeAuth(dispatch)
          : dispatch(toggleIsLoading(false))

      return () => {
        dispatch(toggleIsLoading(false))
      }
    },
    [isAuthenticated]
  )
}
