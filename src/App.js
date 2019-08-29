import React from 'react';
import './App.css';
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
