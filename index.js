let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("new-task");
const clearAllBtn = document.getElementById("delete-all-task-btn");
const screen = document.getElementById("list-area");
const message = document.getElementById("message");

// Save in Array and Local Storage
function saveValue(value) {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Clear All Values
function clearAllTasks() {
  taskList = [];
  localStorage.clear();
}

// Clear Input Text
function clearInputField() {
  taskInput.value = "";
}

//Clear all displyed List from the page
function clearScreen() {
  screen.innerHTML = "";
}

// Add New Task
addTaskBtn.addEventListener("click", function () {
  let value = taskInput.value;
  if (value.trim() === "") {
    taskInput.placeholder = "Invalid task!!! ";

    
    taskInput.style.border = "2px solid red";
    setTimeout(function(){
        taskInput.style.border = "";
    },2000);
    
    showMessage("Invalid todo task!!!","red");
    // alert("Please add someting inside it");
    return;
  }

  taskInput.style.border = "";

  taskList.push({ taskName: value, complete: false, editTask: false });
  saveValue(taskList);

  // console.log(taskList);
  showMessage("Todo Task Added", "Green");
  displayAllTasks();
  clearInputField();
});

// Clear All Tasks
clearAllBtn.addEventListener("dblclick", function () {
  clearAllTasks();
  displayAllTasks();
});

// Show Delete Button
function deleteButtonVisibility(length) {
  const visibility = document.getElementById("delete-all-tasks");
  if (length === 0) {
    visibility.style.display = "none";
  } else {
    visibility.style.display = "";
  }
}

function editableTask(value, i) {
  return value
    ? `
          <input 
              type="text" 
              class="list-text" 
              id="update-task-${i}" 
              maxlength="25" 
              value="${taskList[i].taskName}"
              style="text-decoration: ${
                taskList[i].complete ? "line-through" : "none"
              };"
          />
          <div class="edit-btn" id="edit-update-task">
              <button onclick="updateTask(${i})">
                  <i class="fa-regular fa-circle-up"></i>
              </button>
          </div>
      `
    : `
          <input 
              type="text" 
              class="list-text" 
              maxlength="25" 
              value="${taskList[i].taskName}"  
              style="text-decoration: ${
                taskList[i].complete ? "line-through" : "none"
              };" 
              disabled
          />
          <div class="edit-btn" id="edit-update-task">
              <button onclick="editTask(${i})">
                  <i class="fa-solid fa-pen-to-square"></i>
              </button>
          </div>
        `;
}

// Display All Tasks
function displayAllTasks() {
  taskInput.placeholder = "Enter Todo Task";
  clearScreen();
  deleteButtonVisibility(taskList.length);
  for (let i = 0; i < taskList.length; i++) {
    screen.innerHTML += `
        <div class="task-item">
        <div id="item-no-${i}" class="item-no">
            <section id="item-section">

              <!-- Star Icon -->
              <div class="completed-icon">
                <button onclick="markCompleted(${i})">
                  ${
                    taskList[i].complete === true
                      ? `<i class="fa-solid fa-star"></i>`
                      : `<i class="fa-regular fa-star"></i>`
                  }
                    
                </button>
              </div>

              <!-- Text -->
              <div class="text-content">
                ${editableTask(taskList[i].editTask, i)}
              </div>

            
            </section>

            <!-- Delete Icon -->
            <div class="delete-text-content">
              <button onclick="deleteTask(${i})">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div></div>`;
  }
}

// delete todo Item
const deleteTask = (index) => {
  taskList.splice(index, 1);
  saveValue(taskList);
  displayAllTasks();
};

// edit todo Item
const editTask = (index) => {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].editTask === true) {
      taskList[i].editTask = false;
    }
  }

  taskList[index].editTask = true;
  displayAllTasks();
};

const updateTask = (index) => {
  let value = document.getElementById(
      `update-task-${index}`).value;
  if (value===''){
    showMessage("Invalid Todo Task!!!", "red");
    return;
  }
    taskList[index].taskName = value;
    
  taskList[index].editTask = false;

  saveValue(taskList);
  showMessage("Todo Task Updated!!!", "green");
  displayAllTasks();
};

function showMessage(displayMessage,color){
    message.innerHTML = `<h4 style='color:${color}; font-size: 20px; text-align: center; margin: 15px auto;'>${displayMessage}</h4>`;
    setTimeout(function(){
      message.innerHTML = '';
    }, 3000);
}

function totalCompleted(){
  let total=0;
  for(let i = 0; i<taskList.length; i++){
    if(taskList[i].complete===true){
      ++total;
    }
  }
  return total;
}

// Mark Complete Task
const markCompleted = (index) => {
  if (taskList[index].complete) {
    taskList[index].complete = false;
  } else {
    taskList[index].complete = true;
    showMessage(totalCompleted().toString().concat(" Tasks Completed!"), "Green")
  }
  saveValue(taskList);
  displayAllTasks();
};

displayAllTasks();
