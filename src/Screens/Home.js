import React from 'react';

class Home extends React.Component {
  constructor(){
    super();
  }
  
  render(){
    return(
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'ceenter' }}>
          <h1>Wellcome to regionalHeute.de</h1>
      </div>
    )
  }
}

export default Home;
