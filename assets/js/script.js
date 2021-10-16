const formEl = document.querySelector('#task-form');
const tasksToDoEl = document.querySelector('#tasks-to-do');

const createTaskHandler = function() {
    event.preventDefault();
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent= 'new task';
    tasksToDoEl.appendChild(listItemEl);
   
};

formEl.addEventListener('submit', createTaskHandler);