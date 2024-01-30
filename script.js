const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-items");
const addUpdateClick = document.getElementById("addUpdateClick");
let updateText;
const removeAllButton = document.getElementById("removeAll");
removeAllButton.addEventListener("click", removeAllItems);


document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
});

todoValue.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addUpdateClick.click();
    }
});

function createToDoData() {
    if (todoValue.value === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");
    const taskText = todoValue.value;
    // const todoItems = `<div ondblclick="completeToDoItems(this)">${taskText}</div><div> <img class="edit todo-controls" onclick="updateToDoItems(this)" src="/assets/edit.png"/><img class="delete todo-controls" onclick="deleteToDoItems(this)" <i class="fa-solid fa-trash"/></div>`;
    const todoItems = `<div ondblclick="completeToDoItems(this)">${taskText}</div>
                   <div>
                       <i onclick="updateToDoItems(this)" class="todo-controls fa-regular fa-pen-to-square"></i>
                       <i onclick="deleteToDoItems(this)" class="todo-controls fa-solid fa-eraser"></i>
                   </div>`;
                   


    li.innerHTML = todoItems;
    listItems.appendChild(li);
    todoValue.value = "";


    saveTasksToLocalStorage();
}

function completeToDoItems(e) {
    if (e && e.style.textDecoration === "") {
        e.style.textDecoration = "line-through";
        saveTasksToLocalStorage();
        
    } else {
        createToDoData();
    }
}



function updateOnSelectionItems() {
    updateText.innerText = todoValue.value;
    alert("Task updated successfully");
    addUpdateClick.setAttribute("onclick", "completeToDoItems(updateText)");
    saveTasksToLocalStorage();
    // addUpdateClick.setAttribute("src", "/assets/plus.png");
    addUpdateClick.className="fa-solid fa-circle-plus"
    todoValue.value = "";
}

function updateToDoItems(e) {
    if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
        todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
        updateText = e.parentElement.parentElement.querySelector("div");
        addUpdateClick.setAttribute("onclick", "updateOnSelectionItems()");
        // addUpdateClick.setAttribute("src", "/assets/refresh.jpg");
        addUpdateClick.className="fa-solid fa-arrows-rotate"
        
    }
}

function deleteToDoItems(e) {
    let listItem = e.closest("li");
    let deleteValue = listItem.querySelector("div").innerText;

    if (confirm(`Do you want to delete this ${deleteValue}?`)) {
        listItem.remove();

        
        saveTasksToLocalStorage();
    }
}

function removeAllItems() {
    if (confirm("Do you want to remove all tasks?")) {
        while (listItems.firstChild) {
            listItems.removeChild(listItems.firstChild);
        }
        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(listItems.children).map((li) => {
        const taskText = li.querySelector("div").innerText;
        return li.querySelector("div").style.textDecoration === "line-through" ? `<s>${taskText}</s>` : taskText;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((taskText) => {
            let li = document.createElement("li");
            // const todoItems = `<div ondblclick="completeToDoItems(this)">${taskText}</div><div> <img class="edit todo-controls" onclick="updateToDoItems(this)" src="/assets/edit.png"/><img class="delete todo-controls" onclick="deleteToDoItems(this)" <i class="fa-solid fa-trash"/></div>`;
            const todoItems = `<div ondblclick="completeToDoItems(this)">${taskText}</div>
            <div>
                <i onclick="updateToDoItems(this)" class="todo-controls fa-regular fa-pen-to-square"></i>
                <i onclick="deleteToDoItems(this)" class="todo-controls fa-solid fa-eraser"></i>
            </div>`;
            li.innerHTML = todoItems;
            listItems.appendChild(li);
        });
    }
}





