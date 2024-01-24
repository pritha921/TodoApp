const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-items");
const addUpdateClick = document.getElementById("AddUpdateClick");
let updateText;


document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
});

todoValue.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addUpdateClick.click();
    }
});

function CreateToDoData() {
    if (todoValue.value === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    const taskText = todoValue.value;
    const todoItems = `<div ondblclick="CompleteTodoItems(this)">${taskText}</div><div> <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/assets/edit.png"/><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/assets/delete.png"/></div>`;

    li.innerHTML = todoItems;
    listItems.appendChild(li);
    todoValue.value = "";


    saveTasksToLocalStorage();
}

function CompleteTodoItems(e) {
    if (e && e.style.textDecoration === "") {
        e.style.textDecoration = "line-through";
    } else {
        CreateToDoData();
    }
}

function UpdateOnSelectionItems() {
    updateText.innerText = todoValue.value;
    alert("Task updated successfully");
    addUpdateClick.setAttribute("onclick", "CompleteTodoItems(updateText)");
    saveTasksToLocalStorage();
    addUpdateClick.setAttribute("src", "/assets/plus.png");
    todoValue.value = "";
}

function UpdateToDoItems(e) {
    if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
        todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
        updateText = e.parentElement.parentElement.querySelector("div");
        addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdateClick.setAttribute("src", "/assets/refresh.jpg");
        
    }
}

function DeleteToDoItems(e) {
    let listItem = e.closest("li");
    let deleteValue = listItem.querySelector("div").innerText;

    if (confirm(`Do you want to delete this ${deleteValue}?`)) {
        listItem.remove();

        
        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(listItems.children).map((li) => li.querySelector("div").innerText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((taskText) => {
            let li = document.createElement("li");
            const todoItems = `<div ondblclick="CompleteTodoItems(this)">${taskText}</div><div> <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/assets/edit.png"/><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/assets/delete.png"/></div>`;
            li.innerHTML = todoItems;
            listItems.appendChild(li);
        });
    }
}



