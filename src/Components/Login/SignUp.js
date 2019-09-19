import React from 'react';
import './Login.css'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Upload, notification } from 'antd';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import SessionStorageManager from '../../Config/SessionStorageManager';

const title = "Error"
const desc = 'Please Enter Correct UserName, Email and Password!'



class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      disable: false
    }
  }

  openNotification = (title, desc, icon, color='#108ee9') => {
    notification.open({
      message: title,
      description: desc,
      icon: <Icon type={icon} style={{ color: color }} />,
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  
  componentDidMount() {
    const user = SessionStorageManager.getUser();

    if(user){
      this.props.history.push('/dashboard')
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ disable: true })
        console.log('Received values of form: ', values);
        var formData = new FormData();
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('password', values.password)
        formData.append('upload', values.upload[0].originFileObj)
        axios.post('https://cmsbackend123.herokuapp.com/login/signup', formData)
          .then((result) => {
            console.log(result)
            if(result.data.success){
              this.openNotification('Wellcome', result.data.message, 'check')
              this.props.loginUser(true)
              SessionStorageManager.setUser(result.data)
              window.location.reload()
              this.props.history.push('/dashboard')
            }
            else{
              this.openNotification(title, result.message, 'close-circle', 'red')
              this.setState({ disable: false })
            }
          })
        // this.setState({ email: values.email, userName: values.user })
      }
      else{
        this.openNotification(title, desc, 'close-circle', 'red')
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'ceenter' }}>
        <div className="card">
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <h1 style={{ textAlign: 'center' }} >Register</h1>
              <Form.Item className="sign-up">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item className="sign-up">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your Email!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="email"
                    placeholder="Email"
                  />,
                )}
              </Form.Item>
              <Form.Item className="sign-up">
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
              <Form.Item className="sign-up">
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                })(
                  <Upload name="logo" accept="image/*">
                    <Button>
                      <Icon type="upload" /> Click to upload
                    </Button>
                  </Upload>,
                )}
              </Form.Item>
              
              <Form.Item className="sign-up">
                <Button htmlType="submit" className="login-form-button" disabled={this.state.disable} style={{ backgroundColor: '#37A000', color: 'white', fontWeight: 'bold', fontSize: 14, height: 40 }}>
                  Sign Up
          </Button>
                Or <Link to="/">Login Account</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}



const SignupComp = Form.create({ name: 'normal_login' })(Signup);


const mapStateToProps = (state) => {
  console.log("mapToState",state.authReducer)
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (isLoggedIn) => dispatch(loginUser(isLoggedIn)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupComp);