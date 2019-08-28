import React from 'react';
import './Login.css'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom'

const title = "Error"
const desc = 'Invalid User name or Email!'


class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  openNotification = (title, desc, icon) => {
    notification.open({
      message: title,
      description: desc,
      icon: <Icon type={icon} style={{ color: '#108ee9' }} />,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.setState({ email: values.email })
      }
      else{
        this.openNotification(title, desc, 'close-circle')
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
              <h1 style={{ textAlign: 'center' }}>Login</h1>
              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your Email!' }],
                })(
                  <Input
                    prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Email"
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
                <Button htmlType="submit" className="login-form-button" style={{ backgroundColor: '#37A000', color: 'white', fontWeight: 'bold', fontSize: 14, height: 40 }}>
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



export default LoginComp;
