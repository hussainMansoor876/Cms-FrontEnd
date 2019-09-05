class Path {

    static BASE_URL = "https://cmsbackend123.herokuapp.com/"

    // static BASE_URL = "http://localhost:3001"

    static USER_LOGIN = Path.BASE_URL + "/login/signin"

    static GET_MY_JOBS = Path.BASE_URL + "/job/getPostedJobs"

    static POST_JOB = Path.BASE_URL + "/job/addNewJob"

    static EDIT_JOB = Path.BASE_URL + "/job/edit"

    static REMOVE_JOB = Path.BASE_URL + "/job/removeJob"

}

export default Path