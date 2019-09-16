const loginUser = (isLoggedIn) => {
    return {
        type: "LOGIN_USER",
        isLoggedIn
    }
}


export {
    loginUser
}