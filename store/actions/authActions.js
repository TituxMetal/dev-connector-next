import Router from 'next/router'

import actionType from '../actions'
import { login, logout, register } from '../../utils'

const authUserSuccess = ({ success, user }) => ({
  type: actionType.authUserSuccess,
  payload: {
    success,
    user
  }
})

const authLogoutSuccess = () => ({
  type: actionType.authLogoutSuccess
})

const authUserFail = error => ({
  type: actionType.authUserFail,
  payload: { error }
})

export const fieldChange = (field, value) => ({
  type: actionType.fieldChange,
  payload: { field, value }
})

export const authUpdateStore = ({ success, user }) => ({
  type: actionType.authUpdateStore,
  payload: {
    success,
    user
  }
})

export const toggleIsLoading = isLoading => ({
  type: actionType.toggleIsLoading,
  payload: { isLoading }
})

export const userMustBeAuth = dispatch => {
  dispatch(toggleIsLoading(true))
  Router.push('/login')
}

export const userMustNotBeAuth = dispatch => {
  dispatch(toggleIsLoading(true))
  Router.push('/dashboard')
}

export const authLoginUser = async ({ email, password }, dispatch) => {
  dispatch(toggleIsLoading(true))

  try {
    const { data } = await login({ email, password })

    dispatch(authUserSuccess({ user: data.user, success: data.success }))
  } catch (err) {
    const error = (err.response.data && err.response.data.errors) || err.message

    dispatch(authUserFail(error))
  }
}

export const authRegisterUser = async ({ name, email, password }, dispatch) => {
  dispatch(toggleIsLoading(true))

  try {
    const { data } = await register({ name, email, password })

    dispatch(authUserSuccess({ user: data.user, success: data.success }))
  } catch (err) {
    const error = (err.response.data && err.response.data.errors) || err.message

    dispatch(authUserFail(error))
  }
  dispatch(toggleIsLoading(false))
}

export const authLogoutUser = async dispatch => {
  dispatch(toggleIsLoading(true))

  try {
    await logout()

    dispatch(authLogoutSuccess())
  } catch (err) {
    const error = (err.response.data && err.response.data.errors) || err.message

    dispatch(authUserFail(error))
  }
}
