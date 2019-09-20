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
import ArticleVideo from './ArticleVideo'

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




class ViewArticle extends React.Component {


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
    videoVisible: false,
    publishedDate: moment().endOf('day')
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  showModalVideo = () => {
    this.setState({ videoVisible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCancelVideo = () => {
    this.setState({ videoVisible: false });
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
      this.setState({ visible: false });
    });
  };

  handleCreateVideo = () => {
    const { form } = this.formVideo.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      this.setState({ videoVisible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  saveFormVideo = formVideo => {
    this.formVideo = formVideo;
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
    console.log(this.props.match.params)
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
            <h1 style={{ paddingLeft: 20, paddingTop: 10 }} className="title">Create New Article</h1>
          </div>
          <div style={{ height: 70, backgroundColor: 'white' }} className="left">


            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
              <Menu.Item key="Dashboard">
                <Link to="/dashboard">
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="article">
                <Link to="/article">
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
        <br />
        <br />
        <h1 style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>View Articles</h1>
      </div>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(ViewArticle);



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

