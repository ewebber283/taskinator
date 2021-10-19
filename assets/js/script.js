let taskIdCounter = 0;
const formEl = document.querySelector('#task-form');
const tasksToDoEl = document.querySelector('#tasks-to-do');
const pageContentEl = document.querySelector('#page-content');
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");

const tasks =[]
const taskFormHandler = function(event) {
    event.preventDefault();

    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!")
        return false;
    }
    formEl.reset();

    const isEdit = formEl.hasAttribute('data-task-id');
   
    // send as argument to createTaskEl
    if(isEdit) {
        //has data attribute
        const taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } 
    else {
        const taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
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
    //grabbing id
    taskDataObj.id = taskIdCounter;
    //pushing to task array 
    tasks.push(taskDataObj);

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
const taskButtonHandler = function(event) {
    //get target element
    let targetEl = event.target;

    if(targetEl.matches('.edit-btn')) {
        taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    }

    else if(targetEl.matches('.delete-btn')) {
        taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
    }
    
};
//no spacing between task-item and []
const deleteTask = function(taskId) {
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    const updatedTaskArr = [];

    // loop through current tasks
    for(var i = 0; i <tasks.length; i++) {
        if(tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks= updatedTaskArr
};

const editTask = function(taskId) {
    
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    const taskName = taskSelected.querySelector('h3.task-name').textContent;
    const taskType = taskSelected.querySelector('span.task-type').textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute('data-task-id', taskId);
}

const completeEditTask = function(taskName, taskType, taskId) {
    //find matching task list item
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;
// confirms task we want to update 
    for(var i = 0; i<tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    alert("Task Updated!")

    //reset form by removing taskId and changing button text back to normal
    formEl.removeAttribute('data-task-id');
    document.querySelector("#save-task").textContent = "Add Task";
};

const taskStatusChangeHandler = function(event) {
    const taskId = event.target.getAttribute('data-task-id');

    const statusValue = event.target.value.toLowerCase();

    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //references to ul elements created earlier
    if(statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    for(var i = 0; i < tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
}

formEl.addEventListener('submit', taskFormHandler);
pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);