import React from 'react';
import './App.css';
import LoginComp from './Screens/Login'
import Routes from './Config/routes'

class App extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    return(
      <Routes />
    )
  }
}

export default App;
