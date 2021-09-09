import axios from 'axios';

const TASK_API_BASE_URL = 'http://localhost:8080/api/tasks';

class TaskService {

  // GET tasks
  getTasks() {
    return axios.get(TASK_API_BASE_URL);
  }

  // POST tasks
  createTask(task) {
    return axios.post(TASK_API_BASE_URL, task);
  }

  // Delete tasks
  deleteTask(id) {
    return axios.delete(TASK_API_BASE_URL + '/' + id);
  }
}

export default new TaskService(); 