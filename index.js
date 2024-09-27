let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("new-task");
const clearAllBtn = document.getElementById("delete-all-task-btn");
// const screen = document.getElementById("task-item");

// Save in Array and Local Storage
function saveValue(value){
    
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Clear All Values
function clearAllTasks(){
    taskList = [];
    localStorage.clear();
}

// Clear Input Text
function clearInputField(){
    taskInput.value = "";
}

//Clear all displyed List from the page
function clearScreen(){
    screen.innerHTML = '';
}


// Add New Task
addTaskBtn.addEventListener('click', function(){
    let value = taskInput.value;
    if(value.trim()===''){
        taskInput.placeholder="Please enter the valid task! "
        taskInput.style.border = '2px solid red';
        // alert("Please add someting inside it");
        return;
    }

    taskInput.style.border='';

    taskList.push({taskName: value, complete: false});
    saveValue(taskList);
    
    // console.log(taskList);
    displayAllTasks();
    clearInputField();
});

// Clear All Tasks
clearAllBtn.addEventListener('dblclick', function(){
    clearAllTasks();
    displayAllTasks();
});

// Show Delete Button
function deleteButtonVisibility(length){
    const visibility = document.getElementById("delete-all-tasks");
    if(length===0){
        visibility.style.display='none';
    }else{
        visibility.style.display = "";
    }
}

// Display All Tasks
function displayAllTasks(){
    taskInput.placeholder = "Add Task";
    clearScreen();
    deleteButtonVisibility(taskList.length);
    for(let i=0; i<taskList.length; i++){
        screen.innerHTML += `
            <div style='display: flex;'>

                <button onclick=markCompleted(${i})>
                    <i class="fa-regular fa-star"></i>
                </button>
                
                <li>
                    ${taskList[i].taskName}
                </li>

                <button onclick=editTask(${i})>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button onclick=deleteTask(${i})>
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            
        `;
        console.log(taskList[i])
    }
}

// delete todo Item
const deleteTask = (index) =>{
    taskList.splice(index,1);
    saveValue(taskList);
    displayAllTasks();
}

// edit todo Item
const editTask = (index) =>{

}

// Mark Complete Task
const markCompleted = (index) =>{
    if(taskList[index].complete)
        taskList[index].complete = false;
    else
        taskList[index].complete = true;
    saveValue(taskList);
    displayAllTasks();
}

displayAllTasks();


