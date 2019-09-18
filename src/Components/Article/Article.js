/*eslint-disable*/
import React, { Component } from 'react';
import './Article.css'
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import 'antd/dist/antd.css';
import { Menu, Icon, Input, Button, Select, Typography, Form, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;
const { Search, TextArea } = Input;
const { Title } = Typography
// const AutoCompleteOption = AutoComplete.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



class Article extends React.Component {


  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    user: null
  }

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
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

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.state

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
                  <Icon
                    type="arrow-right"
                  />
                  Logout
              </Menu.Item> : null}
            </Menu>
          </div>
        </div>
        <br />
        <Title style={{ paddingLeft: 20 }}>Add New Article</Title>
        <div className='articleForm'>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Headline">
                {getFieldDecorator('headline', {
                  rules: [{ required: true, message: 'Please input Article Headline' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Article Headline"
                    type="text"
                  />,
                )}
              </Form.Item>
              <Form.Item label="Sub-Headline">
                {getFieldDecorator('subheadline', {
                  rules: [{ required: true, message: 'Please input Article Sub-Headline' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="text"
                    placeholder="Article Sub-Headline"
                  />,
                )}
              </Form.Item>
            <Form.Item label="Article-Description">
              {getFieldDecorator('text', {
                rules: [
                  {
                    required: true,
                    message: 'Please input Article Headline',
                  },
                ],
              })(<TextArea rows={4} />)}
            </Form.Item>
            <Form.Item label="Headline">
              {getFieldDecorator('a', {
                rules: [
                  {
                    required: true,
                    message: 'Please input Article Headline',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
          </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Article);



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



export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm)