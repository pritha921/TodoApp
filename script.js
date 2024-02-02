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

    const todoItems=
    `<div>
    <input type="checkbox" onchange="completeToDoItems(this)">
    <span>${taskText}</span>
    </div>
    <div>
        <i onclick="updateToDoItems(this)" class="todo-controls fa-regular fa-pen-to-square"></i>
        <i onclick="deleteToDoItems(this)" class="todo-controls fa-solid fa-eraser"></i>
    </div>`;              


    li.innerHTML = todoItems;
    listItems.appendChild(li);
    todoValue.value = "";


    saveTasksToLocalStorage();
}


function completeToDoItems(checkbox) {
    const divElement = checkbox.nextElementSibling;

    if (checkbox.checked) {
        divElement.style.textDecoration = "line-through";
    } else {
        divElement.style.textDecoration = "";
    }

    saveTasksToLocalStorage();
}



function updateOnSelectionItems() {
    updateText.innerText = todoValue.value;
    alert("Task updated successfully");
    addUpdateClick.onclick = createToDoData;
    saveTasksToLocalStorage();
    addUpdateClick.className = "fa-solid fa-circle-plus";
    todoValue.value = "";
}



function updateToDoItems(e) {
    todoValue.value = e.parentElement.parentElement.querySelector("div span").innerText;
    updateText = e.parentElement.parentElement.querySelector("div span");
    addUpdateClick.onclick = updateOnSelectionItems;
    addUpdateClick.className = "fa-solid fa-arrows-rotate";
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
        const completed = li.querySelector("input").checked;
        return { taskText, completed };
    });
    
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(({ taskText, completed }) => {
            let li = document.createElement("li");
            const todoItems = `<div ondblclick="completeToDoItems(this)">
                                <input type="checkbox" onchange="completeToDoItems(this)" ${completed ? 'checked' : ''}>
                                <span>${taskText}</span>
                                </div>
                                <div>
                                    <i onclick="updateToDoItems(this)" class="todo-controls fa-regular fa-pen-to-square"></i>
                                    <i onclick="deleteToDoItems(this)" class="todo-controls fa-solid fa-eraser"></i>
                                </div>`;
            li.innerHTML = todoItems;
            listItems.appendChild(li);
            if (completed) {
                li.querySelector("div span").style.textDecoration = "line-through";
            }
        });
    }
}


