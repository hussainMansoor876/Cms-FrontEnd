import * as actionTypes from './Types';

// GET JOBS ACTIONS
export const getMyJobs = () => { 
    return {
        type: actionTypes.GEY_MY_JOBS,
    }
}

export const getMyJobsSuccess = (data) => { 
    return {
        type: actionTypes.GEY_MY_JOBS_SUCCESS,
        data
    }
}


export const getMyJobsFail = (data) => { 
    return {
        type: actionTypes.GEY_MY_JOBS_FAIL,
        data
    }
}


// POST JOB ACTIONS
export const postJobs = () => { 
    return {
        type: actionTypes.POST_JOB,
    }
}

export const postJobsSuccess = (data) => { 
    return {
        type: actionTypes.POST_JOB_SUCCESS,
        data
    }
}


export const postJobsFail = (data) => { 
    return {
        type: actionTypes.POST_JOB_FAIL,
        data
    }
}

// UPDATE JOBS ACTIONS
export const updateJob = () => { 
    return {
        type: actionTypes.UPDATE_JOB,
    }
}

export const updateJobSuccess = (data) => { 
    return {
        type: actionTypes.UPDATE_JOB_SUCCESS,
        data
    }
}


export const updateJobFail = (data) => { 
    return {
        type: actionTypes.UPDATE_JOB_FAIL,
        data
    }
}


export const removeJob = () => { 
    return {
        type: actionTypes.REMOVE_JOB,
    }
}

export const removeJobSuccess = (data) => { 
    return {
        type: actionTypes.REMOVE_JOB_SUCCESS,
        data
    }
}


export const removeJobFail = (data) => { 
    return {
        type: actionTypes.REMOVE_JOB_FAIL,
        data
    }
}
