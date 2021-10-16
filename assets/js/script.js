const buttonEl = document.querySelector('#save-task');
const tasksToDoEl = document.querySelector('#tasks-to-do');

const createTaskHandler = function() {
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent= 'new task';
    tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener('click', createTaskHandler);