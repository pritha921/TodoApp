// alert("Hello world");
const todoValue= document.getElementById("todoText");
listItems= document.getElementById("list-items");
addUpdateClick=document.getElementById("AddUpdateClick");
let  updateText;

todoValue.addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        addUpdateClick.click()
    }
})

function CreateToDOData(){
    if(todoValue.value===""){
        alert("Please enter a task");
        todoValue.focus();
    }

    let li=document.createElement("li");
    const todoItems= `<div ondblclick="CompleteTodoItems(this)">${todoValue.value}</div><div> <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="/assets/edit.png"/><img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="/assets/delete.png"/></div>`;

    li.innerHTML=todoItems;
    listItems.appendChild(li);
    todoValue.value="";
}

function CompleteTodoItems(e){
    console.log(e.parentElement);
    if(e.parentElement.querySelector("div").style.textDecoration ===""){
        e.parentElement.querySelector("div").style.textDecoration= "line-through";
    }
}


function UpdateOnSelectionItems(){
    updateText.innerText = todoValue.value;
    addUpdateClick.setAttribute("onclick", "CompleteTodoItems()");
    addUpdateClick.setAttribute("src","/assets/plus.png");
    todoValue.value=""; 
}


function UpdateToDoItems(e){
    if(e.parentElement.parentElement.querySelector("div").style.textDecoration ===""){
        todoValue.value= e.parentElement.parentElement.querySelector("div").innerText;
        addUpdateClick.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdateClick.setAttribute("src","/assets/refresh.jpg");

    }
}

function DeleteToDoItems(e){
    let deleteValue= e.parentElement.parentElement.querySelector("div").innerText;
    if(confirm(`"DO you want to delete this ${deleteValue}?`)){
        e.parentElement.parentElement.parentElement.querySelector("li").remove();
    }
}