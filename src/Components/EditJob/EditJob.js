/*eslint-disable*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware'
import './EditJob.css'
import { countries, roles } from '../../Config/constants'
import { message } from 'antd'

class EditJob extends Component {

    state = {
        currentJob: {
            ID: "",
            jobTitle: "",
            jobDescription: "",
            location: "",
            role: "",
        },
        jobs: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
        showCandidates: false,
        edit: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.myJobs && nextProps.myJobs.length) {
            this.setState({
                jobs: nextProps.myJobs,
                isLoading: false,
                successMessage: nextProps.successMessage,
                edit: false
            })
        }

        if (nextProps.isError) {
            return message.error(nextProps.errorMessage)
        }


        if (nextProps.successMessage === "Job Updated") {
            message.success(nextProps.successMessage)
            let currentJob = {
                ID: "",
                jobTitle: "",
                jobDescription: "",
                location: "",
                role: "",
            }
            this.props.getPostedJobs()
            this.setState({ currentJob, isLoading: false, edit: false })

        } else if (nextProps.successMessage === "Job Removed") {
            message.success(nextProps.successMessage)
            let currentJob = {
                ID: "",
                jobTitle: "",
                jobDescription: "",
                location: "",
                role: "",
            }
            this.props.getPostedJobs()
            this.setState({ currentJob, isLoading: false, edit: false })
        }

    }


    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.getPostedJobs()
    }

    updateSetter = (ID, jobTitle, jobDescription, location, role, ) => {
        let currentJob = {
            ID,
            jobTitle,
            jobDescription,
            location,
            role,
        }
        this.setState({ currentJob, edit: true })

    }


    handleChange = event => {
        const { currentJob } = this.state
        currentJob[event.target.name] = event.target.value
        this.setState({ currentJob })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { currentJob } = this.state
        const updatedJob = currentJob;

        this.setState({ isLoading: true, })
        this.props.updatedNewJob({
            jobId: updatedJob.ID,
            title: updatedJob.jobTitle,
            role: updatedJob.role,
            location: updatedJob.location,
            desc: updatedJob.jobDescription,
        })

    }

    removeJob = (event) => {
        event.preventDefault()
        const { currentJob } = this.state
        const updatedJob = currentJob
        this.setState({ isLoading: true })
        this.props.removeNewJob({ jobId: updatedJob.ID })
    }


    render() {
        const { currentJob, jobs, edit } = this.state
        return (
            <main role="main">
                <section className="panel important ">
                    <h2>Edit Job</h2>
                    <h6 className="mt-0" style={{ margin: '1rem' }}>Select a job to edit</h6>

                    <div className="form-style-6 panel important">
                        <form >

                            <label htmlFor="jobTitle">Job Title</label>
                            <input type="text" onChange={this.handleChange} value={currentJob.jobTitle} name="jobTitle" placeholder="Job title" />

                            <label htmlFor="jobDescription">Job Description</label>
                            <input type="text" onChange={this.handleChange} value={currentJob.jobDescription} name="jobDescription" placeholder="Job description" />

                            <label htmlFor="location">Location</label>
                            <select value={currentJob.location} name="location" onChange={this.handleChange}>
                                {countries.map((item, idx) => (
                                    <option key={idx} value={item.name}>{item.name}</option>
                                ))}
                            </select>

                            <label htmlFor="role">Role</label>
                            <select value={currentJob.role} name="role" onChange={this.handleChange}>
                                {roles.map((item, idx) => (
                                    <option key={idx} value={item.position}>{item.position}</option>
                                ))}
                            </select>

                            <input onClick={this.handleSubmit} type="submit" value="Update"></input>

                            {edit ? <input onClick={this.removeJob} className="dltBtn" type="submit" value="Remove"></input> : null}

                        </form>
                    </div>

                    <table>
                        <tbody >
                            <tr className="table-header">
                                <th>S.No</th>
                                <th>Job Title</th>
                                <th>Job Description</th>
                                <th>Location</th>
                                <th>Role</th>
                                <th>Posted On</th>
                            </tr>
                            {jobs.map((item, idx) => (
                                <React.Fragment key={item._id} >
                                    <tr style={{ cursor: 'pointer' }} onClick={() => this.updateSetter(
                                        item._id,
                                        item.jobTitle,
                                        item.jobDescription,
                                        item.location,
                                        item.role,
                                    )}>
                                        <td>{idx + 1}</td>
                                        <td>{item.jobTitle}</td>
                                        <td>{item.jobDescription}</td>
                                        <td>{item.location}</td>
                                        <td>{item.role}</td>

                                        <td>{new Date(item.createdAt).toDateString()}</td>
                                    </tr>


                                </React.Fragment>

                            ))}



                        </tbody>
                    </table>
                </section>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        isLoading: state.jobs.isLoading,
        isError: state.jobs.isError,
        errorMessage: state.jobs.errorMessage,
        successMessage: state.jobs.successMessage,
        myJobs: state.jobs.myJobs,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostedJobs: () => {
            dispatch(jobMiddleware.getPostedJobs())
        },

        updatedNewJob: (data) => {
            dispatch(jobMiddleware.updateNewJob(data))
        },
        removeNewJob: (data) => {
            dispatch(jobMiddleware.removeNewJob(data))
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(EditJob)
