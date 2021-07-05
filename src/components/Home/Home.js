import React, { Component } from "react";
// we bring react component

// then we create class Home from component
export class Home extends Component {
  render() {
    return (
      // Create header
      <div style={{ textAlign: "center", marginTop: "15%", fontSize: 75 }}>
        Welcome to Coolest APP
      </div>
    );
  }
}

// export Home to use in other components
export default Home;
