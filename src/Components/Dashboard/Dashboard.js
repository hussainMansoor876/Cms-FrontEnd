/*eslint-disable*/
import React, { Component } from 'react';
import './Dashboard.css'
import InfoCard from '../InfoCard/InfoCard';
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import 'antd/dist/antd.css';
import { Menu, Icon, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Search } = Input;


class Dashboard extends React.Component {


  state = {
    current: 'mail',
    user: null
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  componentWillMount(){
    const user = SessionStorageManager.getUser();
        if (user) {
            this.setState({ user })
        }
  }




  render() {
    const { user } = this.state
    return (
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '50%', height: "auto", backgroundColor: 'red' }}>


          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>



            <Menu.Item style={{ fontSize: 24, fontWeight: 'bold', alignSelf: 'flex-start' }}>
              CMS News Article
        </Menu.Item>
            <Menu.Item key="app">
              <Link to="/home">
                Add New Article
          </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/home">
                Photos-Gallery
          </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ width: '50%', paddingTop: 10, paddingBottom: 10, height: "auto", backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Search
            placeholder="Search by"
            enterButton="Search"
            size="large"
            style={{ paddingTop: 5 }}
            onSearch={value => console.log(value)}
          />
          <Menu>
            {user ? 
            <Menu.Item key="app" style={{ paddingRight: 30, paddingLeft: 20 }}>
              <Icon
                type="arrow-right"
              />
              Logout
            </Menu.Item> : null}
          </Menu>
        </div>
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
