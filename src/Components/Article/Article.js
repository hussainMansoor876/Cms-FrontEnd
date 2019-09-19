/*eslint-disable*/
import React, { Component } from 'react';
import './Article.css'
import SessionStorageManager from '../../Config/SessionStorageManager';
import { connect } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions'
import 'antd/dist/antd.css';
import { TweenOneGroup } from 'rc-tween-one';
import moment from 'moment';
import { Menu, Icon, Input, Button, Select, Typography, Form, Radio, Tag, DatePicker, Modal, Upload, notification } from 'antd';
import { Link } from 'react-router-dom';
import ArticleImage from './ArticleImage'

const { Option } = Select;
const { Search, TextArea } = Input;
const { Title } = Typography

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

const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select Publish and Depublish Date and Time!' }],
};




class Article extends React.Component {


  state = {
    author: [],
    cities: [],
    categories: [],
    topics: [],
    gNews: [],
    gVisible: false,
    topicVisible: false,
    catVisible: false,
    confirmDirty: false,
    autoCompleteResult: [],
    user: null,
    inputVisible: false,
    inputVisible1: false,
    inputValue: '',
    visible: false,
    publishedDate: moment().endOf('day')
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  openNotification = (title, desc, icon, color = '#108ee9') => {
    notification.open({
      message: title,
      description: desc,
      icon: <Icon type={icon} style={{ color: color }} />,
    });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleClose = removedTag => {
    const author = this.state.author.filter(tag => tag !== removedTag);
    this.setState({
      author,
    });
  };

  handleClose1 = removedTag => {
    const cities = this.state.cities.filter(tag => tag !== removedTag);
    this.setState({
      cities
    });
  };

  handleClose2 = removedTag => {
    const categories = this.state.categories.filter(tag => tag !== removedTag);
    this.setState({
      categories
    });
  };

  handleClose3 = removedTag => {
    const topics = this.state.topics.filter(tag => tag !== removedTag);
    this.setState({
      topics
    });
  };

  handleClose4 = removedTag => {
    const gNews = this.state.gNews.filter(tag => tag !== removedTag);
    this.setState({
      gNews
    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { author } = this.state;
    if (inputValue && author.indexOf(inputValue) === -1) {
      author = [...author, inputValue];
    }
    console.log(author);
    this.setState({
      author,
      inputVisible: false,
      inputValue: '',
      inputVisible: false,
    });
  };

  handleCityConfirm = () => {
    const { inputValue } = this.state;
    let { cities } = this.state;
    if (inputValue && cities.indexOf(inputValue) === -1) {
      cities = [...cities, inputValue];
    }
    this.setState({
      cities,
      inputVisible1: false,
      inputValue: '',
    });
  };

  handleCatConfirm = () => {
    const { inputValue } = this.state;
    let { categories } = this.state;
    if (inputValue && categories.indexOf(inputValue) === -1) {
      categories = [...categories, inputValue];
    }
    this.setState({
      categories,
      catVisible: false,
      inputValue: '',
    });
  };

  disabledDate(current) {
    return current && current < moment().endOf('day');
  }

  disabledDate1(current) {
    const { publishedDate } = this.state
    return current && current < moment(publishedDate).endOf('day');
  }

  handleTopicConfirm = () => {
    const { inputValue } = this.state;
    let { topics } = this.state;
    if (inputValue && topics.indexOf(inputValue) === -1) {
      topics = [...topics, inputValue];
    }
    this.setState({
      topics,
      topicVisible: false,
      inputValue: '',
    });
  };

  handleGNewsConfirm = () => {
    const { inputValue } = this.state;
    let { gNews } = this.state;
    if (inputValue && gNews.indexOf(inputValue) === -1) {
      gNews = [...gNews, inputValue];
    }
    this.setState({
      gNews,
      gVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  forMap = tag => {
    const tagElem = (
      <Tag
        closable
        style={{ fontSize: 16, paddingRight: 10, paddingLeft: 10 }}
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

  forMap1 = tag => {
    const tagElem = (
      <Tag
        closable
        style={{ fontSize: 16, paddingRight: 10, paddingLeft: 10 }}
        onClose={e => {
          e.preventDefault();
          this.handleClose1(tag);
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

  forMap2 = tag => {
    const tagElem = (
      <Tag
        closable
        style={{ fontSize: 16, paddingRight: 10, paddingLeft: 10 }}
        onClose={e => {
          e.preventDefault();
          this.handleClose2(tag);
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

  forMap3 = tag => {
    const tagElem = (
      <Tag
        closable
        style={{ fontSize: 16, paddingRight: 10, paddingLeft: 10 }}
        onClose={e => {
          e.preventDefault();
          this.handleClose3(tag);
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

  forMap4 = tag => {
    const tagElem = (
      <Tag
        closable
        style={{ fontSize: 16, paddingRight: 10, paddingLeft: 10 }}
        onClose={e => {
          e.preventDefault();
          this.handleClose4(tag);
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
        const rangeTimeValue = values['range-time-picker'];
        values = {
          ...values,
          'depublishing': values['depublishing'].format('YYYY-MM-DD HH:mm:ss')
        };
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
    const { user, inputVisible, inputValue, author, inputVisible1, cities, catVisible, categories, topics, topicVisible, gNews, gVisible } = this.state
    const tagChild = author.map(this.forMap)
    const tagCity = cities.map(this.forMap1)
    const tagCategory = categories.map(this.forMap2)
    const tagTopic = topics.map(this.forMap3)
    const tagGNews = gNews.map(this.forMap4)

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
            <Form.Item label="Publishing">
              {getFieldDecorator('publishing', {
                rules: [{ type: 'object', required: true, message: 'Please select Publish Date and Time!' }]
              })(
                <DatePicker
                  disabledDate={(date) => this.disabledDate(date)}
                  onChange={(value) => this.setState({ publishedDate: value._d })}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss" />,
              )}
            </Form.Item>
            <Form.Item label="Depublishing">
              {getFieldDecorator('depublishing', {
                rules: [{ type: 'object', required: true, message: 'Please select Depublish Date and Time!' }],
              })(
                <DatePicker
                  disabledDate={(date) => this.disabledDate1(date)}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss" />
              )}
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
            <Form.Item label={author.length ? "Author" : "Add Author"}>
              {getFieldDecorator('author', {
                rules: [{ required: true, message: 'Please Add Author Name' }]
              })(
                <div>
                  <div>
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
                      size="default"
                      style={{ width: 120 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag className="addtag" onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed', fontSize: 14, padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Icon type="plus" /> Add Author
          </Tag>
                  )}
                </div>
              )}
            </Form.Item>
            <Form.Item label={cities.length ? "Cities" : "Add Cities"}>
              {getFieldDecorator('city', {
                rules: [{ required: true, message: 'Please Add City' }]
              })(
                <div>
                  <div>
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
                      {tagCity}
                    </TweenOneGroup>
                  </div>
                  {inputVisible1 && (
                    <Input
                      ref={input => (this.city = input)}
                      type="text"
                      size="default"
                      style={{ width: 120 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleCityConfirm}
                      onPressEnter={this.handleCityConfirm}
                    />
                  )}
                  {!inputVisible1 && (
                    <Tag className="addtag" onClick={() => this.setState({ inputVisible1: true }, () => this.city.focus())} style={{ background: '#fff', borderStyle: 'dashed', fontSize: 14, padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Icon type="plus" /> Add City
          </Tag>
                  )}
                </div>
              )}
            </Form.Item>
            <Form.Item label={categories.length ? "Categories" : "Add Categories"}>
              {getFieldDecorator('categories', {
                rules: [{ required: true, message: 'Please Add Category' }]
              })(
                <div>
                  <div>
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
                      {tagCategory}
                    </TweenOneGroup>
                  </div>
                  {catVisible && (
                    <Input
                      ref={input => (this.cat = input)}
                      type="text"
                      size="default"
                      style={{ width: 120 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleCatConfirm}
                      onPressEnter={this.handleCatConfirm}
                    />
                  )}
                  {!catVisible && (
                    <Tag className="addtag" onClick={() => this.setState({ catVisible: true }, () => this.cat.focus())} style={{ background: '#fff', borderStyle: 'dashed', fontSize: 14, padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Icon type="plus" /> Add Category
          </Tag>
                  )}
                </div>
              )}
            </Form.Item>
            <Form.Item label={topics.length ? "Topics" : "Add Topics"}>
              {getFieldDecorator('topics', {
                rules: [{ required: true, message: 'Please Add Topic' }]
              })(
                <div>
                  <div>
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
                      {tagTopic}
                    </TweenOneGroup>
                  </div>
                  {topicVisible && (
                    <Input
                      ref={input => (this.topic = input)}
                      type="text"
                      size="default"
                      style={{ width: 120 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleTopicConfirm}
                      onPressEnter={this.handleTopicConfirm}
                    />
                  )}
                  {!topicVisible && (
                    <Tag className="addtag" onClick={() => this.setState({ topicVisible: true }, () => this.topic.focus())} style={{ background: '#fff', borderStyle: 'dashed', fontSize: 14, padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Icon type="plus" /> Add Topic
          </Tag>
                  )}
                </div>
              )}
            </Form.Item>
            <Form.Item label={gNews.length ? "Add Google News Keywords" : "Google News Keywords"}>
              {getFieldDecorator('gNews', {
                rules: [{ required: true, message: 'Please Add Google News Keyword' }]
              })(
                <div>
                  <div>
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
                      {tagGNews}
                    </TweenOneGroup>
                  </div>
                  {gVisible && (
                    <Input
                      ref={input => (this.gNews = input)}
                      type="text"
                      size="default"
                      style={{ width: 120 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleGNewsConfirm}
                      onPressEnter={this.handleGNewsConfirm}
                    />
                  )}
                  {!gVisible && (
                    <Tag className="addtag" onClick={() => this.setState({ gVisible: true }, () => this.gNews.focus())} style={{ background: '#fff', borderStyle: 'dashed', fontSize: 14, padding: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Icon type="plus" /> Add Keyword
          </Tag>
                  )}
                </div>
              )}
            </Form.Item>
            <Form.Item label="Add Image">
              {getFieldDecorator('Image', {
                rules: [{ required: true, message: 'Please Upload the Image and Add the Description' }],
              })(
                <div>
                  <Button type="primary" onClick={this.showModal}>
                    Add Image
                </Button>
                  <ArticleImage
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                    openNotification={this.openNotification}
                  />
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

