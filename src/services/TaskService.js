import axios from 'axios';

const TASK_API_BASE_URL = 'http://localhost:8080/api/tasks';

class TaskService {

  // GET tasks
  getTasks() {
    return axios.get(TASK_API_BASE_URL);
  }
  
  // GET BY ID task
  getTaskByID(id) {
    return axios.get(TASK_API_BASE_URL + '/' + id);
  }

  // POST tasks
  createTask(task) {
    return axios.post(TASK_API_BASE_URL, task);
  }

  // DELETE a task
  deleteTask(id) {
    return axios.delete(TASK_API_BASE_URL + '/' + id);
  }

  // PUT a task
  editTask(task, id) {
    return axios.put(TASK_API_BASE_URL + '/' + id, task);
  }


}

export default new TaskService(); 