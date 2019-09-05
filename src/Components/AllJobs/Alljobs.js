import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import { connect } from 'react-redux'
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware'

class Alljobs extends Component {

    state = {
        currentJob: {},
        jobs: [],
        isLoading: false,
        isError: false,
        errorMessage: "",
        successMessage: "",
        showCandidates: false,
        visible: false,

    }

    static getDerivedStateFromProps(props) {
        if (props.myJobs.length) {
            return {
                jobs: props.myJobs,
                isLoading: false,
                successMessage: props.successMessage,
            }
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        this.props.getPostedJobs()
    }

    showModal = (title, desc, location, role, date, CVS) => {

        var currentJob = {
            jobTitle: title,
            jobDescription: desc,
            location,
            role,
            createdAt: date,
            CVS,
        }

        this.setState({
            visible: true,
            currentJob
        });
    };


    handleOk = e => {
        this.setState({
            visible: false,
            showCandidates: false
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
            showCandidates: false
        });
    };


    handleCandidates = () => {
        this.setState({ showCandidates: true })
    }



    render() {
        const { currentJob, visible, jobs } = this.state
        return (
            <main role="main">
                <section className="panel important ">
                    <h2>All Jobs</h2>

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
                                    <tr style={{ cursor: 'pointer' }} onClick={() => this.showModal(
                                        item.jobTitle,
                                        item.jobDescription,
                                        item.location,
                                        item.role,
                                        item.createdAt,
                                        item.CVS
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

                            <Modal
                                title={currentJob.jobTitle}
                                visible={visible}
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}

                            >
                                <div className="modal-desc">
                                    <h6><b>Job Title:</b> {currentJob.jobTitle}</h6>
                                    <h6><b>Job Description:</b> {currentJob.jobDescription}</h6>
                                    <h6><b>Location</b> {currentJob.location}</h6>
                                    <h6><b>Role</b> {currentJob.role}</h6>
                                    <h6><b>Posted On:</b> {new Date(currentJob.createdAt).toDateString()}</h6>

                                    <Button type="primary" onClick={this.handleCandidates}>View Candidates</Button>

                                    {this.state.showCandidates && <table>
                                        <tbody>
                                            <tr>
                                                <th>Email</th>
                                                <th>CV</th>

                                            </tr>
                                            {currentJob.CVS.map(CV => (
                                                <tr key={CV._id}>
                                                    <td>{CV.email}</td>
                                                    <td><a href={CV.cvLink}>Download CV</a></td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>}

                                </div>

                            </Modal>

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
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Alljobs)
