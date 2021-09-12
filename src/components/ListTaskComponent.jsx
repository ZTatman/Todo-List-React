import React, { Component } from 'react'
import TaskService from '../services/TaskService'
import { Fragment } from 'react/cjs/react.production.min';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';
import { useState } from 'react';
export default class ListTaskComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: [],
      task: "",
      taskCompleted: false,
      editTaskId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }
  

  // Get tasks 
  componentDidMount() {
    TaskService.getTasks().then((res) => {
      this.setState({tasks: res.data });
    });
  }

  // Task input field change
  handleChange(e) {
    this.setState({task: e.target.value});
  }

  // Submit task button click
  handleSubmit(e) {
    e.preventDefault();
    let task = {
      content: this.state.task, 
      completed: false
    };
    console.log('NEW TASK: ' + JSON.stringify(task));

    TaskService.createTask(task).then(res => {
      this.componentDidMount();
    });
  }

  // Delete task click
  deleteTask(id) {
    TaskService.deleteTask(id).then(res =>  {
      this.setState({tasks: this.state.tasks.filter(t => t.id !== id)});
    });
  }

  
  // Edit button click
  handleEditClick(e, task) {

    // Change editTaskID
    e.preventDefault();
    this.setState({
      editTaskId: task.id
    });
    

    // Set state to hold current task being edited
    TaskService.getTaskByID(task.id).then(res => {
      let curr = res.data;
      this.setState({
        task: task.content,
        taskCompleted: task.completed
      });
      console.log('CURR TASK: ' + JSON.stringify(this.state));
      
    });
  }

  // Handle edit input change
  handleEditChange(e) {
    let newInput = {newTask: e.target.value};
    this.setState({task: newInput.newTask});
    // console.log('EDITING TASK:' + JSON.stringify(this.state));
    
  }

  handleCompletedChange(e) {
    let newInput = {newCompleted: e.target.checked};
    this.setState({taskCompleted: newInput.newCompleted});
    console.log('EDITING TASK:' + JSON.stringify(this.state));

  }

  handleEditCancel(e) {
    this.setState({
      editTaskId: null
    })
    console.log('CANCELED:' + JSON.stringify(this.state));
  }

  handleEditSave(e){
    e.preventDefault();
    if (this.state.task != "") {
      let editTask = {
        content: this.state.task,
        completed: this.state.taskCompleted
      }
      console.log('SAVED TASK:' + JSON.stringify(editTask));
      TaskService.editTask(editTask, this.state.editTaskId).then(res => {
        this.componentDidMount();
        this.setState({
          editTaskId: null
        });
      });
    }
    else {
      alert("You must enter a task...");
    }

  }

  render() {
    return (
      <div>
        {/* Input field for new task */}
        <div className="">
          <form className="row justify-content-center"  onSubmit={this.handleSubmit}>
            <div className="col-sm-6 ">
              <input className="form-control my-sm-2" type="text" value={this.state.task} onChange={this.handleChange} placeholder="Go to the gorcery store" required="required"/>                
            </div>
            <div className="col-sm-3 my-sm-2">
              <button className="btn btn-outline-primary add form-control" type="submit">Add</button>
            </div>
          </form>
        </div> 

        {/* Task List */}
        <div className="row ms-auto justify-content-center">
            <table className="table table-hover table-borderless table-sm w-75">
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
                {this.state.tasks.map(
                    task => (
                      <Fragment>
                        {this.state.editTaskId === task.id ? 
                        <EditableRow 
                          task={task}
                          state={this.state}
                          handleEditChange={this.handleEditChange}
                          handleEditCancel={this.handleEditCancel}
                          handleEditSave={this.handleEditSave}
                          handleCompletedChange={this.handleCompletedChange}
                        /> : 
                        <ReadOnlyRow 
                          task={task}
                          state={this.state} 
                          deleteTask={() => this.deleteTask(task.id)} 
                          handleEditClick={(e) => this.handleEditClick(e, task)}
                        />}
                      </Fragment>
                    ))}
              </tbody>
            </table>
        </div>
      </div>
    )
  }
}
