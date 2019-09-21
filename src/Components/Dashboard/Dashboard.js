/*eslint-disable*/
import React, { Component } from 'react';
import './Dashboard.css'
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import 'antd/dist/antd.css';
import { Menu, Icon, Input, Button, Select, Table, Skeleton, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;
const { Search } = Input;

const columns = [
  {
    title: 'Headline',
    dataIndex: 'headline',
    render: text => <Link to={`article/${text.slug}`} onClick={() => sessionStorage.setItem("article", JSON.stringify(text))}>{text.headline.length > 30 ? text.headline.slice(0, 30) : text.headline}</Link>
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
];

const data = [];
for (let i = 0; i < 460; i++) {
  data.push({
    key: i,
    name: `Edward King ABc hello rfjygyjgfyh ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

class Dashboard extends React.Component {


  state = {
    current: 'mail',
    user: null,
    allData: [],
    filter: 'city'
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  openNotification = (title, desc, icon, color = '#108ee9') => {
    notification.open({
      message: title,
      description: desc,
      icon: <Icon type={icon} style={{ color: color }} />,
    });
  };


  async componentWillMount() {
    const { allData } = this.state
    await axios.get('https://cmsbackend123.herokuapp.com/get/article/getAll')
      .then((res) => {
        console.log(res.data.data)
        const { data } = res.data
        data.map((v, i) => {
          return allData.push({
            key: i,
            headline: v,
            status: v.status,
            author: v.author,
            date: v.timestamp
          })
        })
        this.setState({ allData })
        console.log(allData)
      })
      .catch((err) => console.log(err))
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
    this.setState({ filter: value })
  }

  searchValue(value) {
    var { filter, allData } = this.state
    allData = []
    // this.setState({ allData: [] })
    axios.get(`https://cmsbackend123.herokuapp.com/get/article/${filter}/${value}`)
      .then((res) => {
        console.log(res)
        const { data } = res.data
        data.length ? data.map((v, i) => {
          return allData.push({
            key: i,
            headline: v,
            status: v.status,
            author: v.author,
            date: v.timestamp
          })
        }) : this.openNotification("Sorry","No Result found","close-circle","red")
        this.setState({ allData })
        !data.length && setTimeout(() => {
          window.location.reload()
        },1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }


  render() {
    const rowSelection = {
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
            });
          },
        },
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    const { user, allData } = this.state
    return (
      <div>
        <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ paddingTop: 10, paddingBottom: 10, height: 70, backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="right">
            <Search
              placeholder="Search by"
              enterButton="Search"
              size="large"
              // style={{ paddingTop: 5 }}
              className="search1"
              style={{ paddingTop: 18, paddingBottom: 10, paddingLeft: 5, alignSelf: 'center' }}
              onSearch={value => this.searchValue(value)}
            />
            <Select defaultValue="City" size="large" className="selector" style={{ width: 120, marginLeft: 10, paddingTop: 8 }} onChange={(value) => this.handleChange(value)}>
              <Option value="city">City</Option>
              <Option value="category">Category</Option>
              <Option value="topic">Topic</Option>
            </Select>
          </div>
          <div style={{ height: 70, backgroundColor: 'white' }} className="left">


            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
              <Menu.Item key="article">
                <Link to="/article">
                  Add New Article
          </Link>
              </Menu.Item>
              <Menu.Item key="gallery">
                <Link to="/gallery">
                  Photos-Gallery
          </Link>
              </Menu.Item>
              {user ?
                <Menu.Item key="logout" onClick={() => this.logout()}>
                  <Icon
                    type="arrow-right"
                  />
                  Logout
              </Menu.Item> : null}
            </Menu>
          </div>
        </div>
        <br />
        <h1 style={{ justifyContent: 'center', textAlign: 'center' }}>News Articles</h1>
        <br />
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex', textAlign: 'center' }}>
          {allData.length ? <Table
            style={{ width: '94%' }}
            columns={columns}
            dataSource={allData}
          /> : <Skeleton active />}
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