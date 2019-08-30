import React from 'react';
import './Login.css'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom'

const title = "Error"
const desc = 'Please Enter Correct UserName, Email and Password!'

const message = "Please check your email for verification link"


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


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ disable: true })
        console.log('Received values of form: ', values);
        fetch('https://cmsbackend123.herokuapp.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then((result) => {
            console.log(result)
            if(result.success){
              this.openNotification('Wellcome', result.message, 'check')
              this.props.history.push('/home')
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
          <div className="container">
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



export default SignupComp;
