import * as actionTypes from './Types';

export const userLogin = () => { 
    return {
        type: actionTypes.USER_LOGIN,
    }
}

export const userLoginSuccess = (data) => { 
    return {
        type: actionTypes.USER_LOGIN_SUCCESS,
        data
    }
}


export const userLoginFail = (data) => { 
    return {
        type: actionTypes.USER_LOGIN_FAIL,
        data
    }
}
