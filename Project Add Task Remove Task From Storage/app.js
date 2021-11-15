//Define UI vars
let form = document.querySelector('#task-form');
let taskList = document.querySelector('.collection');
let clearTask = document.querySelector('.clear-task');
let filter = document.querySelector('#filter');
let taskInput = document.querySelector('#task');


//Invoke all events
loadAllEvents();



//All Events function
function loadAllEvents(){

    document.addEventListener('DOMContentLoaded', getTasks);

    //Add Task Event
    form.addEventListener('submit', addTask);

    //Remove Task
    taskList.addEventListener('click', removeTask);

    //Remove All Tasks
    clearTask.addEventListener('click', removeAllTasks);

    //Filter Task
    filter.addEventListener('keyup', filterTasks);
};



//Add Task
function addTask(e){
    e.preventDefault();
    if(taskInput.value === ''){
        alert('Please Fill The Task Field.');
    };

    let li = document.createElement('li');
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    let link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    storeTaskInLs(taskInput.value);
    
    taskInput.value = "";
};


//Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLs(e.target.parentElement.parentElement);
        };
    };
};


//Remove All Tasks
function removeAllTasks(e){
    e.preventDefault();
    // taskList.innerHTML = '';

    //Faster Way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    };

    clearLs();
};


//Filter Tasks
function filterTasks(e){
    let text = filter.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task) => {
        let content = task.textContent.toLocaleLowerCase();
        if(content.indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        };
    });
};


//Store Task In LS
function storeTaskInLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.push(taskItem);

    localStorage.setItem('tasks', JSON.stringify(tasks));
};


//Get Tasks From LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach((task) => {
        let li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));

        let link = document.createElement('a');
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);
    });


};


//Remove Task From LS
function removeTaskFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };

    tasks.forEach((task, index) => {
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
};


//Clear LS
function clearLs(){
    localStorage.clear();
};