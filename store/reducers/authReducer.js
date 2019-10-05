import actionType from '../actions'

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case actionType.authUpdateStore: {
      const { success, user } = payload

      return { ...state, isAuthenticated: success, user }
    }
    case actionType.fieldChange: {
      const { field, value } = payload

      return { ...state, fields: { ...state.fields, [field]: value } }
    }
    case actionType.toggleIsLoading: {
      return { ...state, isLoading: payload.isLoading }
    }
    case actionType.authUserSuccess: {
      const { success, user } = payload

      return {
        ...state,
        fields: { name: '', email: '', password: '' },
        error: false,
        isAuthenticated: success,
        user: user
      }
    }
    case actionType.authLogoutSuccess: {
      return { ...state, error: false, isAuthenticated: false, user: false }
    }
    case actionType.authUserFail: {
      const { error } = payload

      return { ...state, isLoading: false, error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}
