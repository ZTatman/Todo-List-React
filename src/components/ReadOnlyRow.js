import React, { Component } from 'react'

export default class ReadOnlyRow extends Component {


  render() {
    return (
    <tr key = { this.props.task.id }>
      <td className="text-center align-middle" >{ this.props.task.content }</td>
        {/* <td className="text-center align-middle" width="5%"> <b>{String(task.completed) == "true"? 'yes':'no'}</b></td> */}
      <td className="text-center align-middle" width="5%">
        <input 
          className="form-check-input" 
          type="checkbox" 
          value={this.props.state.taskCompleted} 
          id="completed-checkbox"
          disabled/>
      </td>
      <td className="text-center align-middle" width="25%">
        {/* Update and Delete buttons */}
        <div className="btn-grp">
          <button className="btn btn-link nounderline edit" onClick={(e) => this.props.handleEditClick(e, this.props.task.id)}>edit</button>
          <button className="btn btn-link nounderline delete" onClick={() => this.props.deleteTask(this.props.task.id)}>x</button>
        </div>
      </td>
    </tr>
    )
  }
}
