import React, { Component } from 'react'

export default class AddTaskBarComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
    }
  }


  render() {
    return (
      <div>
        <form class="row ms-auto">
          <div class="col">
              <input class="form-control my-sm-2" type="text" placeholder="Go to the gorcery store"/>                
          </div>
          <div class="col-auto my-sm-2">
              <button class="btn btn-outline-primary" type="submit">Add</button>
          </div>
        </form>
      </div>
    )
  }
}
