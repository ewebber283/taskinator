let taskIdCounter = 0;
const formEl = document.querySelector('#task-form');
const tasksToDoEl = document.querySelector('#tasks-to-do');

const taskFormHandler = function(event) {
    event.preventDefault();

    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!")
        return false;
    }
    formEl.reset();
    //package up data as object
    const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send as argument to createTaskEl
    createTaskEl(taskDataObj);
};
//accepting object as argument
const createTaskEl = function(taskDataObj) {
    // create list item
    const listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    // add task id as custom attribute
    listItemEl.setAttribute('data-task-id', taskIdCounter);
    // create div to hold task info and add to list item
    const taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML ="<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    //add div to li
    listItemEl.appendChild(taskInfoEl);

   const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    //add li to ul
    tasksToDoEl.appendChild(listItemEl);
    //increment for unique id
    taskIdCounter++;
};

const createTaskActions = function(taskId) {
    const actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';
    // edit button
    const editButtonEl = document.createElement('button');
    editButtonEl.textContent= "Edit";
    editButtonEl.className= "btn edit-btn";
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    // delete button
    const deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent= "Delete";
    deleteButtonEl.className= "btn delete-btn";
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    const statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);
    
    const statusChoices= ["To Do", "In Progress", "Completed"];
    for(let i = 0; i<statusChoices.length; i++) {
        const statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);
        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);
    return actionContainerEl;
}

formEl.addEventListener('submit', taskFormHandler);