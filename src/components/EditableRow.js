import React, { Component } from 'react'

export default class EditableRow extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     id: this.props.task.id,
  //     task: this.props.state.task,
  //     completed: this.props.state.completed,
  //     editTaskID: tjhos 
  //   }
  // }
  
  
  render() {
    return (
    <tr key = { this.props.task.id }>
      <td className="text-center align-middle" >
        <input 
          type="text"
          placeholder="Enter a task..."
          name="task"
          value={this.props.state.task}
          onChange={(e) => this.props.handleEditChange(e)}
          required="required"

        />
      </td>
      <td 
        className="text-center align-middle" 
        width="5%">
          <input 
            className="form-check-input" 
            type="checkbox" 
            value={this.props.state.completed} 
            checked={this.props.state.taskCompleted}
            id="completed-checkbox"
            onChange={(e) => this.props.handleCompletedChange(e)}
          />
      </td>
      <td 
        className="text-center align-middle" 
        width="25%">
        {/* Update and Delete buttons */}
        <div className="btn-grp">
          <button 
            className="btn btn-link nounderline save"
            type="submit"
            onClick={(e) => this.props.handleEditSave(e, this.props.task.id)}
          >save</button>
          <button 
            className="btn btn-link nounderline delete"
            onClick={(e) => this.props.handleEditCancel(e)}
          >cancel</button>
        </div>
      </td>
    </tr>
    )
  }
}
