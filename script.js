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

    const todoItems = `<div>
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
    const divElement = checkbox.nextElementSibling; // Get the adjacent <div> element

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
    addUpdateClick.setAttribute("onclick", "completeToDoItems(updateText)");
    saveTasksToLocalStorage();
    // addUpdateClick.setAttribute("src", "/assets/plus.png");
    addUpdateClick.className = "fa-solid fa-circle-plus"
    todoValue.value = "";
}

function updateToDoItems(e) {
    if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
        todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
        updateText = e.parentElement.parentElement.querySelector("div");
        addUpdateClick.setAttribute("onclick", "updateOnSelectionItems()");
        // addUpdateClick.setAttribute("src", "/assets/refresh.jpg");
        addUpdateClick.className = "fa-solid fa-arrows-rotate"

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
        const isChecked = li.querySelector("input[type='checkbox']").checked;

        return {
            text: isChecked ? `<s>${taskText}</s>` : taskText,
            checked: isChecked
        };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach((task) => {
            let li = document.createElement("li");
            // const todoItems = `<input type="checkbox" onchange="completeToDoItems(this)" ${task.checked ? 'checked' : ''}>
            //                    <div style="${task.checked ? 'text-decoration: line-through;' : ''}">${task.text}</div>
            //                    <div>
            //                        <i onclick="updateToDoItems(this)" class="todo-controls fa-regular fa-pen-to-square"></i>
            //                        <i onclick="deleteToDoItems(this)" class="todo-controls fa-solid fa-eraser"></i>
            //                    </div>`;

                               const todoItems = 
                               `<div>
                                   <input type="checkbox" onchange="completeToDoItems(this)" ${task.checked ? 'checked' : ''}>
                                   <span style="${task.checked ? 'text-decoration: line-through;' : ''}">${task.text}</span>
                               </div>
                               <div>
                                   <i onclick="updateToDoItems(this)" class="todo-controls fa-regular fa-pen-to-square"></i>
                                   <i onclick="deleteToDoItems(this)" class="todo-controls fa-solid fa-eraser"></i>
                               </div>`;
            li.innerHTML = todoItems;
            listItems.appendChild(li);
        });
    }
}
