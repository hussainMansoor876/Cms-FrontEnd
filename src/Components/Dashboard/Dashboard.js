/*eslint-disable*/
import React, { Component } from 'react';
import './Dashboard.css'
import InfoCard from '../InfoCard/InfoCard';
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import * as jobMiddleware from '../../Store/middlewares/jobMiddleware';
import { Modal, Button } from 'antd'
import {Link} from 'react-router-dom'
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

class Dashboard extends React.Component {


  state = {
    isLoading: false,
    isError: false,
    errorMessage: "",
    successMessage: "",
    myJobs: [],
    showCandidates: false,
    visible: false,
    currentJob: {},
    filteredJobs: []
  }


  showModal = (title, desc, location, role, date, CVS) => {

    var currentJob = {
      jobTitle: title,
      jobDescription: desc,
      // salary,
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





  componentDidMount() {
    this.setState({ isLoading: true })
    this.props.getPostedJobs()
  }

  static getDerivedStateFromProps(props, state) {

    if (props.myJobs.length) {
      return {
        myJobs: props.myJobs,
        isLoading: false,
        successMessage: props.successMessage,
        filteredJobs: props.myJobs.slice(0,10)
      }
    }
  }

  handleCandidates = () => {
    this.setState({ showCandidates: true })
  }


  render() {
    const user = SessionStorageManager.getUser()
    const { myJobs, visible, currentJob, filteredJobs } = this.state
    return (
      <div >
          {/* <Header user={user}/> */}
          
          {/* <nav role="navigation">
            <ul className="main">
              <li className="dashboard"><a href="#">Dashboard</a></li>
              <li className="users"><Link to="/alljobs">Manage Users</Link></li>
             
            </ul>
          </nav> */}
          
          <main role="main">
            <InfoCard title="Welcome to your dashboard" active items={[
              {
                desc: "New Jobs"
              },
              {
                desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
              },
              {
                desc: "Aliquam tincidunt mauris eu risus."
              }
            ]} />

            <section className="panel important ">
              <h2>Jobs</h2>

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
                  {filteredJobs.map((item, idx) => (
                    <React.Fragment key={item._id} >
                      <tr style={{ cursor: 'pointer' }} onClick={() => this.showModal(
                        item.jobTitle,
                        item.jobDescription,
                        // item.salary,
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
                      <h6><b>Location:</b> {currentJob.location}</h6>
                      <h6><b>Role:</b> {currentJob.role}</h6>
                      <h6><b>Posted On:</b> {new Date(currentJob.createdAt).toDateString()}</h6>

                      <Button type="primary" onClick={this.handleCandidates}>View Candidates</Button>

                      {this.state.showCandidates && <table>
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
                      </table>}

                    </div>

                  </Modal>

                </tbody>
              </table>
            </section>


            <InfoCard title="Jobs" items={[{ imp: "100", desc: "New Jobs" }]} />
            <InfoCard title="Chart" items={[
              { desc: "New Jobs" },
              { desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." },
              { desc: "Aliquam tincidunt mauris eu risus." }
            ]} />


           
            {/* <section className="panel">
              <h2>feedback</h2>
              <div className="feedback">This is neutral feedback Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Alias, praesentium. Libero perspiciatis quis aliquid iste quam dignissimos, accusamus temporibus ullam
                voluptatum, tempora pariatur, similique molestias blanditiis at sunt earum neque.</div>
              <div className="feedback error">This is warning feedback
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                  <li>Vestibulum auctor dapibus neque.</li>
                </ul>
              </div>
              <div className="feedback success">This is positive feedback</div>
            </section> */}

          </main>
          <footer role="contentinfo">Admin Panel by Umair Ahmed</footer>
      </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
