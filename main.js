const addTaskBtn = document.querySelector(".add-task");
const wrapperTask = document.querySelector(".wrapper-add-task");
const cancelBtn = document.querySelector("#cancel-btn");
const saveBtn = document.querySelector("#save-btn");
const ContainerTask = document.querySelector(".tasks");
const msgBox = document.querySelector(".msgBox");
const searchInput = document.querySelector("#search");
const msgSearch = document.querySelector("#msgSearch");
const colors = document.querySelectorAll(".colors span");

function selectColor() {
    colors.forEach((color) => {
        color.addEventListener("click", () => {
            if (!color.classList.contains("active")) {
                changeColor(color);
                removeActive();
                color.classList.add("active");
            };
        });
    });
}

selectColor();

searchInput.addEventListener("keyup", searchTask)

addTaskBtn.addEventListener("click", () => {
    wrapperTask.style.display = 'flex';
    const text = wrapperTask.querySelector(".title");
    text.textContent = 'Add New Task';
});

cancelBtn.addEventListener("click", () => {
    wrapperTask.style.display = 'none';
    const input = cancelBtn.parentElement.parentElement.querySelector("input");
    input.style.borderColor = '#cccccc34';
});

saveBtn.addEventListener("click", () => {
    const parentElement = saveBtn.parentElement.parentElement;
    const inputTask = parentElement.querySelector("#taskInput");

    addTask(inputTask);
    selectColor();
});

function addTask(input) {
    if (input.value === '') {
        input.style.border = '1px solid red';
    } else {
        const valueInput = input.value;
        ContainerTask.innerHTML +=
        `<div class="task">
         <div>
           <i class="bi bi-circle"></i>
           <span class="task-name">${valueInput}</span>
         </div>
         <div>
           <i class="bi bi-pencil-square"></i>
           <i class="bi bi-trash3-fill"></i>
          </div>
        </div>`;

        input.value = '';
        msgBox.style.display = 'none';
        wrapperTask.style.display = 'none';

        document.querySelectorAll(".task").forEach(task => {
            const checkIcon = task.querySelector(".bi-circle");
            const taskName = task.querySelector(".task-name");
            const editIcon = task.querySelector(".bi-pencil-square");
            const removeIcon = task.querySelector(".bi-trash3-fill");
  
            checkTask(checkIcon,taskName);
            removeTask(removeIcon,task);
            editTask(editIcon,input,taskName,task);
            changeColor(task)

        });
    };
};

function checkTask(checkIcon,task_name) {
    checkIcon.addEventListener("click", () => {
        if (checkIcon.classList.contains("bi-circle")) {
            checkIcon.classList.replace("bi-circle", "bi-check-circle-fill");
            checkIcon.style.color = '#40c540';
            task_name.style.textDecoration = 'line-through';
        } else {
            checkIcon.classList.replace("bi-check-circle-fill", "bi-circle");
            checkIcon.style.color = '#40c540';
            task_name.style.textDecoration = 'none';
        }
    });
};

function removeTask(removeIcon,task) {
    removeIcon.addEventListener("click", () => {
        task.remove();
    });
};

function editTask(editIcon,input,taskName,task) {
    editIcon.addEventListener("click", () => {
        wrapperTask.style.display = 'flex';
        const text = wrapperTask.querySelector(".title");
        text.textContent = 'Edit Your Task'
        task.remove();
        input.value = taskName.textContent;
        taskName.textContent = input.value;
        removeTask();
        checkTask();
    });
};

function searchTask(e) {
    const inputText = e.target.value.toLowerCase();

    document.querySelectorAll(".task").forEach((tasks) => {
        const text = tasks.textContent;

        if (text.toLowerCase().indexOf(inputText) != -1) {
            tasks.style.display = 'flex';
            msgSearch.style.display = 'none';
        } else {
            tasks.style.display = 'none';
            msgSearch.style.display = 'flex';
        };
    });

    const inputText2 = e.target.value.toUpperCase();

    document.querySelectorAll(".task").forEach((tasks) => {
        const text = tasks.textContent;

        if (text.toUpperCase().indexOf(inputText2) != -1) {
            tasks.style.display = 'flex';
            msgSearch.style.display = 'none';
        } else {
            tasks.style.display = 'none';
            msgSearch.style.display = 'flex';
        };
    });
};

function removeActive() {
    colors.forEach(color => {
        color.classList.remove("active");
    });
};

function changeColor(color) {
    let dataColor = color.getAttribute("data-color");

    document.querySelectorAll(".task").forEach(task => {
        task.style.borderColor = dataColor;
    })
}