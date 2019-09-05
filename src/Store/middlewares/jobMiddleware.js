import * as JobActions from '../actions/jobActions'
import axios from 'axios'
import Path from '../../Config/Path'
import SessionStorageManager from '../../Config/SessionStorageManager';

export const getPostedJobs = () => {
    return dispatch => {
        dispatch(JobActions.getMyJobs());
        const userId = SessionStorageManager.getUser()._id
        axios.post(Path.GET_MY_JOBS, {
            posterId: userId
        }).then(response => {
            if (!response.data.success) {
                return dispatch(JobActions.getMyJobsFail({ success: false, message: response.data.message }))
            }

            dispatch(JobActions.getMyJobsSuccess({ success: true, message: response.data.message, myJobs: response.data.jobs }))
        }).catch(err => {
            dispatch(JobActions.getMyJobsFail({ success: false, message: "Something went wrong please try again later" }))

        })
    }
}


export const postJob = (data) => {
    return dispatch => {
        dispatch(JobActions.postJobs());
        const userId = SessionStorageManager.getUser()._id
        axios.post(Path.POST_JOB, {
            posterId: userId,
            jobTitle: data.jobTitle,
            jobDescription: data.rawHtml,
            location: data.location,
            role: data.role
        }).then(response => {
            console.log("POST JOB RESPONSE", response)
            if (!response.data.success) {
                return dispatch(JobActions.postJobsFail({ success: false, message: response.data.message }))
            }

            dispatch(JobActions.postJobsSuccess({ success: true, message: response.data.message }))
        }).catch(err => {
            dispatch(JobActions.postJobsFail({ success: false, message: "Something went wrong please try again later" }))

        })
    }

}

export const updateNewJob = data => {
    return dispatch => {
        dispatch(JobActions.updateJob())
        const { jobId, title, role, location, desc } = data
        axios.post(Path.EDIT_JOB, {
            jobId,
            title,
            role,
            location,
            desc,
        }).then(response => {
            console.log("UPDATE JOB RESPONSE", response)
            if (!response.data.success) {
                return dispatch(JobActions.updateJobFail({ success: false, message: response.data.message }))
            }

            dispatch(JobActions.updateJobSuccess({ success: true, message: response.data.message }))
        }).catch(err => {
            dispatch(JobActions.updateJobFail({ success: false, message: "Something went wrong please try again later" }))

        })
    }
}

export const removeNewJob = data => {
    return dispatch => {
        dispatch(JobActions.removeJob())
        const { jobId } = data
        axios.post(Path.REMOVE_JOB, {
            jobId
        }).then(response => {

            console.log("remove job", response)

            if (!response.data.success) {
                return dispatch(JobActions.removeJobFail({ success: false, message: response.data.message }))
            }

            dispatch(JobActions.removeJobSuccess({ success: true, message: response.data.message }))


        }).catch(err => {
            dispatch(JobActions.removeJobFail({ success: false, message: "Something went wrong please try again later" }))
        })
    }
}