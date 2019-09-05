import * as actionTypes from '../actions/Types'

const initialJobState = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
    myJobs: []

}

export const jobReducer = (state = initialJobState, action) => {
    switch (action.type) {
        case actionTypes.GEY_MY_JOBS:
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: "",
                successMessage: "",
                myJobs: []
            }

        case actionTypes.GEY_MY_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: "",
                successMessage: action.data.message,
                myJobs: action.data.myJobs
            }

        case actionTypes.GEY_MY_JOBS_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.data.message,
                successMessage: "",
                myJobs: []
            }

        case actionTypes.POST_JOB:
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: "",
                successMessage: "",
            }

        case actionTypes.POST_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: "",
                successMessage: action.data.message,
            }

        case actionTypes.POST_JOB_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.data.message,
                successMessage: "",
            }


        case actionTypes.UPDATE_JOB:
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: "",
                successMessage: "",
            }

        case actionTypes.UPDATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: "",
                successMessage: action.data.message,
            }

        case actionTypes.UPDATE_JOB_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.data.message,
                successMessage: "",
            }

        case actionTypes.REMOVE_JOB:
            return {
                isLoading: true,
                isError: false,
                errorMessage: "",
                successMessage: "",
            }

        case actionTypes.REMOVE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: "",
                successMessage: action.data.message,
            }

        case actionTypes.REMOVE_JOB_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.data.message,
                successMessage: "",
            }

        default:
            return state
    }
}