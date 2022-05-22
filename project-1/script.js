const newTasks      = document.querySelector(".input-task");
const newAddTaskBtn = document.querySelector(".btn-add-task");
const taskList      = document.querySelector(".task-list");

newAddTaskBtn.addEventListener("click", taskAddFunc);
taskList.addEventListener("click", taskDeleteFunc);
document.addEventListener('DOMContentLoaded', localStorageRead);

function taskDeleteFunc(e) {
    const elementClicked = e.target;

    if(elementClicked.classList.contains('btn-complete-mission')) {
        elementClicked.parentElement.classList.toggle('mission-completed');
    }
    if(elementClicked.classList.contains('btn-task-delete')) {
        if (confirm('Are you sure?')) {
            elementClicked.parentElement.classList.toggle('get-lost');
            const deleteOfTask = elementClicked.parentElement.children[0].innerText;
            localStorageDelete(deleteOfTask);
            elementClicked.parentElement.addEventListener('transitionend', function () {
                elementClicked.parentElement.remove();
            })
        }
    }

}

function taskAddFunc(e) {
    e.preventDefault();
    
    if(newTasks.value.length > 0) {
        taskItemCreate(newTasks.value);

        /* local storage save */
        localStorageSave(newTasks.value);
        /* delete input content after insert */
        newTasks.value = '';
    }
    else {
        alert("can't create empty task");
    }  
}

function localStorageToArray () {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function localStorageSave(taskList) {
    let tasks = localStorageToArray();

    tasks.push(taskList);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function localStorageRead() {
    let tasks = localStorageToArray();

    tasks.forEach(function (task) {
        taskItemCreate(task);
    });
}

function taskItemCreate(task) {
    /* creating a div*/
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");

    /* creating a li */
    const taskLi = document.createElement("li");
    taskLi.classList.add("task-description");
    taskLi.innerText = task;
    taskDiv.appendChild(taskLi);

    /* add completed button */
    const taskDoneBtn = document.createElement("button");
    taskDoneBtn.classList.add("task-btn");
    taskDoneBtn.classList.add("btn-complete-mission");
    taskDoneBtn.innerHTML = "<i class='fa-solid fa-check'></i>";
    taskDiv.appendChild(taskDoneBtn);

    /* add delete button */
    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.classList.add("task-btn");
    taskDeleteBtn.classList.add("btn-task-delete");
    taskDeleteBtn.innerHTML = "<i class='fa-solid fa-minus'></i>";
    taskDiv.appendChild(taskDeleteBtn);

    /* Adding created div to ul */
    taskList.appendChild(taskDiv);
}

function localStorageDelete(task) {
    let tasks = localStorageToArray();

    // splice item delete
    const elementDeleteIndex = tasks.indexOf(task);
    tasks.splice(elementDeleteIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}