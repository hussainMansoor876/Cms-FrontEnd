const reducer = (state = {}, action) =>{
    switch(action.type){
        case "LOGIN_USER": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default: {
            return state;
        }
    }
}
export default reducer