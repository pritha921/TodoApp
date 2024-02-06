const todoValue = document.getElementById("todoText");
const listItems = document.getElementById("list-items");
const addUpdateClick = document.getElementById("addUpdateClick");
const removeAllButton = document.getElementById("removeAll");
removeAllButton.addEventListener("click", removeAllItems);
let updateText;

document.addEventListener("DOMContentLoaded", function () {
    loadTasksFromLocalStorage();
    
    const drake = dragula([listItems]);

    drake.on('drop', function () {
        saveTasksToLocalStorage();
    });
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

    const taskText = todoValue.value;
    const li = createListItem(taskText, false);
    listItems.appendChild(li);
    todoValue.value = "";

    saveTasksToLocalStorage();
}


function completeToDoItems(element) {
    const listItem = findParentListItem(element);


    if (listItem && listItem.classList.contains("editing")) {
        return;
    }

    if (listItem) {
        const checkbox = listItem.querySelector("input");
        const divElement = listItem.querySelector("div");

        checkbox.checked = !checkbox.checked;
        divElement.style.textDecoration = checkbox.checked ? "line-through" : "";

        saveTasksToLocalStorage();
    }
}

function findParentListItem(element) {
    let parent = element.parentElement;
    while (parent && parent.tagName !== "LI") {
        parent = parent.parentElement;
    }
    return parent;
}

function updateToDoItems(e) {
    const listItem = e.closest("li");
    listItem.classList.add("editing");
    todoValue.value = e.parentElement.parentElement.querySelector("div span").innerText;
    updateText = e.parentElement.parentElement.querySelector("div span");
    addUpdateClick.onclick = updateOnSelectionItems;
    addUpdateClick.className = "fa-solid fa-arrows-rotate";
}

function updateOnSelectionItems() {
    updateText.innerText = todoValue.value;
    alert("Task updated successfully");

    const listItem = findParentListItem(updateText);
    listItem.classList.remove("editing");

    addUpdateClick.onclick = createToDoData;
    saveTasksToLocalStorage();
    addUpdateClick.className = "fa-solid fa-circle-plus";
    todoValue.value = "";
}

// --------------------------------------------------------------------------------------
function deleteToDoItems(e) {
    let listItem = e.closest("li");
    let deleteValue = listItem.querySelector("div span").innerText;

    if (confirm(`Do you want to delete this ${deleteValue}?`)) {
        listItem.remove();
        saveTasksToLocalStorage();
    }
}
//---------------------------------------------------------------------------------------

function removeAllItems() {
    if (confirm("Do you want to remove all tasks?")) {
        while (listItems.firstChild) {
            listItems.removeChild(listItems.firstChild);
            addUpdateClick.className = "fa-solid fa-circle-plus";
            todoValue.value = "";
            
        }
        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(listItems.children).map(li => {
        const taskText = li.querySelector("div span").innerText;
        const completed = li.querySelector("input").checked;
        return { taskText, completed };
    });

    const tasksData = { tasks };
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
}
  
function loadTasksFromLocalStorage() {
    const savedTasksData = localStorage.getItem("tasksData");

    if (savedTasksData) {
        const { tasks } = JSON.parse(savedTasksData);

        tasks.forEach(({ taskText, completed }) => {
            const li = createListItem(taskText, completed);
            listItems.appendChild(li);
        });
    }
}

function createListItem(taskText, completed) {
    const li = document.createElement("li");
    const todoItems = `<div>
                        <input type="checkbox" onchange="completeToDoItems(this)" ${completed ? 'checked' : ''}>
                        <span>${taskText}</span>
                        </div>
                        <div>
                            <i onclick="updateToDoItems(this)" class="todo-controls fa-regular fa-pen-to-square"></i>
                            <i onclick="deleteToDoItems(this)" class="todo-controls fa-solid fa-eraser disabled"></i>
                        </div>`;

    li.innerHTML = todoItems;

    const checkbox = li.querySelector("input");
    const divElement = li.querySelector("div");

    if (completed) {
        checkbox.checked = true;
        divElement.style.textDecoration = "line-through";
    }

    li.addEventListener("click", function(event) {
        if (!event.target.matches('.todo-controls')) {
            completeToDoItems(li.querySelector("input"));
        }
    });

    return li;
}



