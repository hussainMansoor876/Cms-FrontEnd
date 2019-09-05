import * as actionTypes from '../actions/Types'

const initialAuthState = {
    isLoading: false,
    isError: false,
    isLoggedIn: false,
    currentUser: null,
    errorMessage: "",
    successMessage: ""

}

export const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isLoggedIn: false,
                currentUser: null,
                errorMessage: "",
                successMessage: ""
            }

        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isLoggedIn: true,
                currentUser: action.data.currentUser,
                errorMessage: "",
                successMessage: action.data.message
            }

        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                isLoggedIn: false,
                currentUser: null,
                errorMessage: action.data.message,
                successMessage: ""
            }

        default:
            return state
    }
}