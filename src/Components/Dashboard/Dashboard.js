/*eslint-disable*/
import React, { Component } from 'react';
import './Dashboard.css'
import InfoCard from '../InfoCard/InfoCard';
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import 'antd/dist/antd.css';
import { Menu, Icon, Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;
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

  componentWillMount() {
    const user = SessionStorageManager.getUser();
    if (user) {
      this.setState({ user })
    }
  }

  logout() {
    sessionStorage.clear()
    window.location.reload()
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }


  render() {
    const { user } = this.state
    return (
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ paddingTop: 10, paddingBottom: 10, height: 70, backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="right">
          <Search
            placeholder="Search by"
            enterButton="Search"
            size="large"
            // style={{ paddingTop: 5 }}
            className="search1"
            style={{ paddingTop: 18, paddingBottom: 10, paddingLeft: 5, alignSelf: 'center' }}
            onSearch={value => console.log(value)}
          />
          <Select defaultValue="City" size="large" className="selector" style={{ width: 120, marginLeft: 10, paddingTop: 8 }} onChange={(value) => this.handleChange(value)}>
            <Option value="city">City</Option>
            <Option value="categories">Category</Option>
            <Option value="topics">Topic</Option>
          </Select>
        </div>
        <div style={{ height: 70, backgroundColor: 'white' }} className="left">


          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
            <Menu.Item key="article">
              <Link to="/home">
                Add New Article
          </Link>
            </Menu.Item>
            <Menu.Item key="gallery">
              <Link to="/home">
                Photos-Gallery
          </Link>
            </Menu.Item>
            {user ?
              <Menu.Item key="logout" onClick={() => this.logout()}>
                {/* <Button onClick={() => this.logout()}> */}
                  <Icon
                    type="arrow-right"
                  />
                  Logout
              {/* </Button> */}
              </Menu.Item> : <Menu.Item key="logout" style={{ paddingRight: 30, paddingLeft: 20, height: 70, paddingTop: 10 }}>
                <Icon
                  type="arrow-right"
                />
                Logout
              </Menu.Item>}
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