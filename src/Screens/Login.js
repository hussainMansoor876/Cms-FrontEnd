import React from 'react';
import './Login.css'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { Link } from 'react-router-dom'

const title = "Error"
const desc = 'Please Enter Email and Password!'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

        fetch('https://cmsbackend123.herokuapp.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then(response => response.json())
          .then((result) => {
            console.log(result)
            if (result.success) {
              this.props.history.push('/home')
            }
            else {
              this.openNotification(title, result.message, 'close-circle', 'red')
              this.setState({ disable: false })
            }
          })
        this.setState({ email: values.email })
      }
      else {
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



export default LoginComp;
