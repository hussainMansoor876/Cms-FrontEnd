/*eslint-disable*/

import React from 'react';
import './Login.css'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom'
import validator from 'validator'
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import SessionStorageManager from '../../Config/SessionStorageManager';

const title = "Error"
const desc = 'Please Enter Email and Password!'
console.log(sessionStorage)


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      disable: false,
      loggedIn: false,
      loading: false,
      errorMessage: "",
      successMessage: ""

    }
  }

  static getDerivedStateFromProps = (props, state) => {

    if (!props.currentUser && props.isError) {
      return {
        loading: false,
        errorMessage: props.errorMessage,
      }
    }

    return {
      successMessage: props.successMessage,
      loading: false,
      loggedIn: true,
    }

  }

  componentDidMount() {
    const user = SessionStorageManager.getUser();

    if (user) {
      this.props.history.push('/dashboard')
    }
  }


  componentDidUpdate(prevProps, prevState) {

    if (prevProps.isError !== this.props.isError) {
      if (this.props.isError && !this.props.isLoggedIn) {
        this.setState({ disable: false })
        return this.openNotification("Problem", this.props.errorMessage, 'close-circle', 'red')
      }
    }

    if (!this.props.isError && this.props.currentUser) {
      this.props.history.push('/dashboard')
    }

  }



  openNotification = (title, desc, icon, color = '#108ee9') => {
    notification.open({
      message: title,
      description: desc,
      icon: <Icon type={icon} style={{ color: color }} />,
    });
  };


  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {

      if (!validator.isEmail(values.email)) {
        return this.openNotification("Email", "Invalid Email", 'close-circle', 'red')
      }
      else if (values.password.length < 6) {
        return this.openNotification("Password", "Password must be Atleast 6 Digits", 'close-circle', 'red')
      }

      this.setState({ loading: true, disable: true })
      console.log(values)
      fetch('https://cmsbackend123.herokuapp.com/login/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result)
          if (result.success) {
            this.openNotification('Wellcome', 'Successfully Login!!!', 'check')
            SessionStorageManager.setUser(result)
            this.props.loginUser(true)
            window.location.reload()
            this.props.history.push('/dashboard')
          }
          else {
            this.openNotification(title, result.message, 'close-circle', 'red')
            this.setState({ disable: false })
          }
        })

    });

  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card">
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <h1 style={{ textAlign: 'center' }}>Login</h1>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your Email!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
                    type="email"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="">
                  Forgot password
          </a>
                <Button htmlType="submit" className="login-form-button" disabled={this.state.disable} style={{ backgroundColor: '#37A000', color: 'white', fontWeight: 'bold', fontSize: 14, height: 40 }}>
                  Log in
          </Button>
                Or <Link to="/register">Register Now!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}


const LoginComp = Form.create({ name: 'normal_login' })(Login);


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


export default connect(mapStateToProps, mapDispatchToProps)(LoginComp)
