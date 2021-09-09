import React, { Component } from 'react'
import TaskService from '../services/TaskService'
import { Redirect, withRouter } from 'react-router';



export default class ListTaskComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: [],
      newTask: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }


  componentDidMount() {
    TaskService.getTasks().then((res) => {
      this.setState({tasks: res.data });
    });
  }

  // Completd a task
  didCompleteTask(completed) {
    if (completed)
      return <p>yes</p>;
    return <p>no</p>;
  }

  // Handle task submission
  handleSubmit(e) {
    e.preventDefault();
    let task = {content: this.state.newTask, completed: false};
    console.log('NEW TASK: ' + JSON.stringify(task));

    TaskService.createTask(task).then(res => {
      this.componentDidMount();
      
    });
  }

  // Handle task input
  handleChange(e) {
    this.setState({newTask: e.target.value});
  }

  // Delete a task
  deleteTask(id) {
    TaskService.deleteTask(id).then(res =>  {
      this.setState({tasks: this.state.tasks.filter(t => t.id !== id)});
    });
  }

  render() {
    return (
      <div>
        {/* Input field for new task */}
        <div>
          <form className="row ms-auto"  onSubmit={this.handleSubmit} action="http://localhost:3000/tasks">
            <div className="col">
              <input className="form-control my-sm-2" type="text" value={this.state.newTask} onChange={this.handleChange} placeholder="Go to the gorcery store"/>                
            </div>
            <div className="col-auto my-sm-2">
              <button className="btn btn-outline-primary add" type="submit">Add</button>
            </div>
          </form>
        </div> 

        {/* Task List */}
        <div className="row ms-auto">
            <table className="table table-hover table-borderless table-sm">
              {/* Table Header */}
              <thead className="table-light">
                <tr>
                  <th className="text-center">Tasks</th>
                  <th className="text-center">Completed</th>
                  <th className="text-center">Actions</th>
                </tr> 
              </thead>
              <tbody>
                {/* Dynamically display available tasks in table body */}
                {
                  this.state.tasks.map(
                    task => 
                    <tr key = { task.id } completed= {task.completed}>
                      <td className="text-center align-middle" >{ task.content }</td>
                      <td className="text-center align-middle" width="5%"> <b>{String(task.completed) == "true"? 'yes':'no'}</b></td>
                      <td className="text-center align-middle" width="25%">
                        {/* Update and Delete buttons */}
                        <div className="btn-grp">
                          <button className="btn btn-link nounderline edit">edit</button>
                          <button className="btn btn-link nounderline delete" onClick={() => this.deleteTask(task.id)}>delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}
