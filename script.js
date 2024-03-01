let addNewTaskBtn = document.querySelector('.addNewTaskBtn');
addNewTaskBtn.addEventListener('click', addNewTaskBtnFunc);

let container = document.querySelector('#container');

function addNewTaskBtnFunc() {
    let addTaskModal = document.querySelector('#addTaskModal');
    addTaskModal.style.display = 'block';
}

let taskList = document.querySelector('.taskList');

let tasksArray = [];

displayTasks(tasksArray);

// Search Tasks

function searchFunc() {
    let searchInput = document.querySelector('.searchInput')
    let filteredArr = tasksArray.filter((el) => {
        return el.title.includes(searchInput.value)
    })
    displayTasks(filteredArr)
}

// Add Task Functionality
let addTaskButton = document.querySelector('.addTask');
addTaskButton.addEventListener("click", addTaskFunc);

function addTaskFunc() {
    let addTaskTitle = document.querySelector('.addTaskTitle')

    if (addTaskTitle.value !== '') {
        let obj = {
            id: "id" + Math.random().toString(16).slice(2),
            title: addTaskTitle.value
        }
        tasksArray.push(obj);

        taskList.innerHTML = null;
        displayTasks(tasksArray);
        let searchInput = document.querySelector('.searchInput');
        searchInput.style.display = 'block'
        let filterAndSortBtns = document.querySelector('.filterAndSortBtns');
        filterAndSortBtns.style.display = 'block'
        container.style.filter = 'blur(0px)';
    }
}

// Edit Task Functionality
function editTaskFunc(el, index) {
    let editTaskModal = document.querySelector('#editTaskModal');
    editTaskModal.style.display = 'block';
    container.style.filter = 'blur(5px)';

    let editTaskTitle = document.querySelector('.editTaskTitle');
    editTaskTitle.value = el.title;

    let confirmTaskBtn = document.querySelector('.confirmTask');
    confirmTaskBtn.addEventListener('click', function () {
        let objIndex = tasksArray.findIndex((obj => obj.id == el.id));
        tasksArray[objIndex].title = editTaskTitle.value;

        taskList.innerHTML = ''
        displayTasks(tasksArray);
        editTaskModal.style.display = 'none';
        container.style.filter = 'blur(0px)';
    })



}

// Delete Task Functionality
function deleteListTask(index) {
    let deleteConfirmModal = document.querySelector('#deleteConfirmModal')
    deleteConfirmModal.style.display = 'block';
    container.style.filter = 'blur(5px)';

    document.querySelector('.dontDltBtn').addEventListener('click', function () {
        deleteConfirmModal.style.display = 'none';
        container.style.filter = 'blur(0px)';
    });

    document.querySelector('.confirmDltBtn').addEventListener('click', function () {
        let taskList = document.querySelector('.taskList');
        tasksArray.splice(index, 1);
        taskList.innerHTML = '';
        displayTasks(tasksArray);
        deleteConfirmModal.style.display = 'none';
        container.style.filter = 'blur(0px)';

    });

}

// display Task Function
function displayTasks(data) {
    taskList.innerHTML = ''
    data.forEach((el, index) => {
        let addTaskTitle = document.querySelector('.addTaskTitle')

        let task = document.createElement('div');
        task.setAttribute('class', 'task')

        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'checkbox');



        let title = document.createElement('p');
        title.setAttribute('class', 'title')
        title.innerHTML = el.title;

        checkbox.addEventListener('click', function () {
            if (checkbox.checked) {
                title.style.textDecoration = 'line-through'
            } else {
                title.style.textDecoration = 'none'
            }
        })

        let editDeleteBtnsDiv = document.createElement('div');
        editDeleteBtnsDiv.setAttribute('class', 'editDeleteBtnsDiv')

        let editListTaskBtn = document.createElement('button');
        editListTaskBtn.setAttribute('class', 'editListTaskBtn')
        editListTaskBtn.innerText = 'Edit';
        editListTaskBtn.addEventListener('click', function () {
            editTaskFunc(el, index)
        })

        let deleteListTaskBtn = document.createElement('button');
        deleteListTaskBtn.setAttribute('class', 'deleteListTaskBtn')
        deleteListTaskBtn.innerText = 'Delete'
        deleteListTaskBtn.addEventListener('click', function () {
            deleteListTask(index)
        })

        editDeleteBtnsDiv.append(editListTaskBtn, deleteListTaskBtn)

        task.append(checkbox, title, editDeleteBtnsDiv)
        taskList.append(task)

        addTaskTitle.value = ''

        addTaskModal.style.display = 'none'

    })
}

//  Button to open Sort Modal
let sortTaskBtn = document.querySelector('.sortTaskBtn');
sortTaskBtn.addEventListener('click', function () {
    let sortTasksModal = document.querySelector('#sortTasksModal');
    sortTasksModal.style.display = 'block';
    container.style.filter = 'blur()';
})

//  ascending order
let sortTaskByAscBtn = document.querySelector('.sortTaskByAscBtn');
sortTaskByAscBtn.addEventListener('click', sortTaskByAscFunc);

function sortTaskByAscFunc() {
    tasksArray.sort((a, b) => {
        let x = a.title.toLowerCase()
        let y = b.title.toLowerCase()
        if (x > y) {
            return 1;
        } else if (x < y) {
            return -1;
        }
        displayTasks(tasksArray);
        return 0;
    })
    taskList.innerHTML = '';
    displayTasks(tasksArray);
    let sortTasksModal = document.querySelector('#sortTasksModal');
    sortTasksModal.style.display = 'none'
    container.style.filter = 'blur(0px)';
}

//  descending order
let sortTaskBydesBtn = document.querySelector('.sortTaskBydesBtn');
sortTaskBydesBtn.addEventListener('click', sortTaskBydesBtnFunc)

function sortTaskBydesBtnFunc() {
    tasksArray.sort((a, b) => {
        let x = a.title.toLowerCase()
        let y = b.title.toLowerCase()
        if (x < y) {
            return 1;
        } else if (x > y) {
            return -1;
        }
        displayTasks(tasksArray);
        return 0;
    })
    taskList.innerHTML = '';
    displayTasks(tasksArray);
    let sortTasksModal = document.querySelector('#sortTasksModal');
    sortTasksModal.style.display = 'none'
    container.style.filter = 'blur(0px)';

}
// Delete All 
let deleteAllBtn = document.querySelector('.deleteAllBtn');
deleteAllBtn.addEventListener('click', deleteAllTasks);

function deleteAllTasks() {
    let deleteConfirmModal = document.querySelector('#deleteConfirmModal');
    deleteConfirmModal.style.display = 'block';
    container.style.filter = 'blur(5px)';

    document.querySelector('.dontDltBtn').addEventListener('click', function () {
        deleteConfirmModal.style.display = 'none';
        container.style.filter = 'blur(0px)';
    });

    document.querySelector('.confirmDltBtn').addEventListener('click', function () {
        tasksArray = []; 
        taskList.innerHTML = '';
        deleteConfirmModal.style.display = 'none';
        container.style.filter = 'blur(0px)';
    });
}

// Select All Tasks 
let selectAllCheckbox = document.querySelector('.selectAllCheckbox');
selectAllCheckbox.addEventListener('change', selectAllTasks);

function selectAllTasks() {
    let checkboxes = document.querySelectorAll('.checkbox');

    for (let checkbox of checkboxes) {
        checkbox.checked = selectAllCheckbox.checked;
        //  line-through 
        let title = checkbox.nextElementSibling;
        if (checkbox.checked) {
            title.style.textDecoration = 'underline';
        } else {
            title.style.textDecoration = 'none';
        }
    }
}

