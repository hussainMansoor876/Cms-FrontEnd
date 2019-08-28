import React from 'react';
import './App.css';
import LoginComp from './Components/Login'

class App extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    return(
      <div style={{ position: 'fixed' }}>
      <LoginComp />
      </div>
    )
  }
}

export default App;
