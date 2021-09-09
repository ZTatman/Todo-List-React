import React, { Component } from 'react'

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div>
<nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="http://localhost:3000">Todo</a>
  </div>
</nav>    
      </div>
    )
  }
}
