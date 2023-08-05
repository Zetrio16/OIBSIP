const input_tasks = document.querySelector(".input-bar input"),
    options = document.querySelectorAll(".options button"),
    delete_btn = document.querySelector(".btn-del"),
    tasks = document.querySelector(".lists");

options.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("button.active-btn").classList.remove("active-btn");
        btn.classList.add("active-btn");
        showTodo(btn.id);
    });
});

let editId, isEditTask = false;

let task_list = JSON.parse(localStorage.getItem("task_list"));

function showTodo(btn) {
    let li_tag = "";
    if (task_list)
    {
        task_list.forEach((task, task_id) => {
            let completed = task.status == "completed" ? "checked" : "";
            if (btn == task.status || btn == "all") 
            {
                li_tag += `<li class="list">
                            <label for="${task_id}">
                                <input type="checkbox" id="${task_id}" onclick="updateStatus(this)" ${completed}>
                                <p class="${completed}">${task.name}</p>
                            </label>
                            <div class="ellipsis">
                                <p class="uil uil-ellipsis-h" onclick="showMenu(this)"></p>
                                <ul class="tasks">
                                    <li onclick='editTask(${task_id}, "${task.name}")'><p class="uil uil-pen"></p>Edit</li>
                                    <li onclick='deleteTask(${task_id}, "${task.name}")'><p class="uil uil-trash"></p> Delete</li>
                            </ul>
                            </div>
                        </li>`;
            }
        });
    }
    tasks.innerHTML = li_tag || `<p style="font-weight:bold"> No tasks 😊</p>`;
    let checkTask = tasks.querySelectorAll(".list");
    !checkTask.length ? delete_btn.classList.remove("active-btn") : delete_btn.classList.add("active-btn");
    tasks.offsetHeight >= 200 ? tasks.classList.add("overflow") : tasks.classList.remove("overflow");
}

showTodo("all");

function showMenu(selectedTask) 
{
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => 
    {
        if (e.target.tagName != "i" || e.target != selectedTask) 
        {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) 
{
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) 
    {
        taskName.classList.add("checked");
        task_list[selectedTask.id].status = "completed";
    } 
    else 
    {
        taskName.classList.remove("checked");
        task_list[selectedTask.id].status = "pending";
    }
    localStorage.setItem("task_list", JSON.stringify(task_list))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    input_tasks.value = textName;
    input_tasks.focus();
    input_tasks.classList.add("active-btn");
}

function deleteTask(deleteId, btn) {
    isEditTask = false;
    task_list.splice(deleteId, 1);
    localStorage.setItem("task_list", JSON.stringify(task_list));
    showTodo(btn);
}

delete_btn.addEventListener("click", () => {
    isEditTask = false;
    task_list.splice(0, task_list.length);
    localStorage.setItem("task_list", JSON.stringify(task_list));
    showTodo()
});

input_tasks.addEventListener("keyup", e => {
    let userTask = input_tasks.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditTask) {
            task_list = !task_list ? [] : task_list;
            let taskInfo = { name: userTask, status: "pending" };
            task_list.push(taskInfo);
        } else {
            isEditTask = false;
            task_list[editId].name = userTask;
        }
        input_tasks.value = "";
        localStorage.setItem("task_list", JSON.stringify(task_list));
        showTodo(document.querySelector("button.active-btn").id);
    }
});