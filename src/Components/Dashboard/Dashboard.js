/*eslint-disable*/
import React, { Component } from 'react';
import './Dashboard.css'
import InfoCard from '../InfoCard/InfoCard';
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import { Modal, Button, Input } from 'antd'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

const { Search } = Input

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
  }



  handleCandidates = () => {
    this.setState({ showCandidates: true })
  }


  render() {
    const user = SessionStorageManager.getUser()
    const { myJobs, visible, currentJob, filteredJobs } = this.state
    return (
      <div >


        <main role="main">
          <div className="searchHeader" style={{ flex: 1, flexDirection: 'row'}}>
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              onSearch={value => console.log(value)}
              style={{ width: 500 }}
            />
          </div>

        </main>
        <footer role="contentinfo">Admin Panel by Umair Ahmed</footer>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  console.log("mapToState", state.authReducer)
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (isLoggedIn) => dispatch(loginUser(isLoggedIn)),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
