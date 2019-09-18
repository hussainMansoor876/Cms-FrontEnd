/*eslint-disable*/
import React, { Component } from 'react';
import './Article.css'
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import 'antd/dist/antd.css';
import { TweenOneGroup } from 'rc-tween-one';
import { Menu, Icon, Input, Button, Select, Typography, Form, Radio, Tag } from 'antd';
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
    tags: [],
    confirmDirty: false,
    autoCompleteResult: [],
    user: null
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
      inputVisible: false,
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

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


  render() {
    const { getFieldDecorator } = this.props.form;
    const { user, inputVisible, inputValue, tags } = this.state
    const tagChild = tags.map(this.forMap);

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
                    message: 'Please input Article Description',
                  },
                ],
              })(<TextArea
                type="text"
                placeholder="Article Description"
                rows={4} />)}
            </Form.Item>
            <Form.Item label="Free">
              {getFieldDecorator('free', {
                rules: [{ required: true, message: 'Please Select True or False' }]
              })(
                <Radio.Group>
                  <Radio.Button value={true}>True</Radio.Button>
                  <Radio.Button value={false}>False</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label={tags.length ? "Author" : "Add Author"}>
              {getFieldDecorator('author', {
                rules: [{ required: true, message: 'Please Select True or False' }]
              })(
                <div>
                  <div style={{ marginBottom: 16 }}>
                    <TweenOneGroup
                      enter={{
                        scale: 0.8,
                        opacity: 0,
                        type: 'from',
                        duration: 100,
                        onComplete: e => {
                          e.target.style = '';
                        },
                      }}
                      leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                      appear={false}
                    >
                      {tagChild}
                    </TweenOneGroup>
                  </div>
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                      <Icon type="plus" /> Add Author
          </Tag>
                  )}
                </div>
              )}
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