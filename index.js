let taskList = JSON.parse(localStorage.getItem("taskList")) || [];
const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("new-task");
const clearAllBtn = document.getElementById("delete-all-task-btn");
const screen = document.getElementById("list-area");
const showMessage = document.getElementById("message");

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
    taskInput.placeholder = "Invalid task! ";
    taskInput.style.border = "2px solid red";

    // alert("Please add someting inside it");
    return;
  }

  taskInput.style.border = "";

  taskList.push({ taskName: value, complete: false, editTask: false });
  saveValue(taskList);

  // console.log(taskList);
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

// sort Complted to Last
// function sort() {
//   for(let i= 0; i<taskList.length; i++){
//     if(taskList[i].complete===true){
//       let temp = taskList[i];
//       taskList.splice(i,1);
//       taskList.push(temp);
//       break;
//     }
//   }
//   saveValue(taskList);
// }

// Display All Tasks
function displayAllTasks() {
  taskInput.placeholder = "Add Task";
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
  
  taskList[index].taskName = document.getElementById(
    `update-task-${index}`
  ).value;
  taskList[index].editTask = false;

  saveValue(taskList);
  displayAllTasks();
};

// Mark Complete Task
const markCompleted = (index) => {
  if (taskList[index].complete) {
    taskList[index].complete = false;
  } else {
    taskList[index].complete = true;
  }
  saveValue(taskList);
  displayAllTasks();
};

displayAllTasks();
