


function subscribe(){
    const buttonElement = document.querySelector('.js-subscribe-button');
    if (buttonElement.innerText==='Subscribe'){
        buttonElement.innerHTML='Subscribed'
        buttonElement.className="js-subscribe-button btn btn-danger btn-sm rounded-0"
    }
    else{
        buttonElement.innerHTML='Subscribe'
        buttonElement.className="js-subscribe-button btn btn-outline-danger btn-sm rounded-0"
    }
}

function calculateTotal(){
    const inputElement = document.querySelector("#jsCostInput")
    let cost = Number(inputElement.value)
    calculateError = document.querySelector("#calculateError")
    if (cost<0){calculateError.innerHTML="Error: Cost cannot be less that $0";}
    else if(cost<40){calculateError.innerHTML=" "; cost+=10;}

    total = document.querySelector(".js-total-cost")
    .innerHTML=`$${cost}`;
}

function handleCostKeyDown(event){
    event.key==="Enter"?calculateTotal():console.log("");
}

function checkButtonz(event){
    buttons = document.querySelectorAll(".checkButtons");
    for (let btn = 0; btn < buttons.length; btn++){
        buttons[btn].className = "checkButtons btn btn-outline-dark btn-sm";
    }
    event.srcElement.className = "checkButtons btn btn-dark btn-sm";
}


// todolist



renderTodoList();

function renderTodoList(){
    listContainer = document.querySelector("#todoList")
    listContainer.replaceChildren();
    const todoList = eval(localStorage.getItem("todoList")) 

    todoList.forEach(function(todoObject, index){
        // const todoObject = todoList[i];
        const { name, dueDate } = todoObject
        num = index+1

        const todoNum = document.createElement("td");
        todoNum.innerHTML=num
        const todoItem = document.createElement("td");
        todoItem.innerHTML=name
        const todoDueDate = document.createElement("td");
        todoDueDate.innerHTML=dueDate
        const todoButton = document.createElement("td");
        const button = `<button class="btn btn-danger btn-sm rounded-0 align-self-end" onclick="deleteToDo(index=${index});">Delete</button>`
        todoButton.innerHTML=button

        const tr = document.createElement("tr");
        tr.className="text-dark"
        tr.appendChild(todoNum)
        tr.appendChild(todoItem)
        tr.appendChild(todoDueDate)
        tr.appendChild(todoButton)

        listContainer.appendChild(tr);
    });
}

function addToDo(){
    const todoInput = document.querySelector("#toDoListInput");
    const todoDateInput = document.querySelector("#toDoListDateInput");
    const item = {name:todoInput.value, dueDate:todoDateInput.value}
    const todoList = eval(localStorage.getItem("todoList")) 
    todoList.push(item);
    localStorage.setItem("todoList", JSON.stringify(todoList))

    todoInput.value = ""
    todoDateInput.value = ""
    renderTodoList();
}

function deleteToDo(index){
    const todoList = eval(localStorage.getItem("todoList")) 
    todoList.splice(index, 1); 
    localStorage.setItem("todoList", JSON.stringify(todoList))
    renderTodoList()
}

function handleTodoKeyDown(event){
    event.key==="Enter"?addToDo():console.log("");
}



// addToCartButton

function addToCartButton(){
    slideIn();
    setTimeout(function(){
        const elemente = document.getElementById("myAlert")
        elemente.style.animation = "slideUpOut 1s ease-in-out forwards"
    }, 2000);
}

function slideIn(){
    const elemente = document.createElement("div")
    elemente.id = "myAlert"
    elemente.className = "bg-success text-white text-center py-2 px-5"
    elemente.innerHTML="Item Added"
    const body = document.getElementsByTagName("body")[0]
    body.appendChild(elemente)
}




let messages = 2;

const titleInterval = setInterval(function(){
    changeTitle()
}, 1500)

const changeTitle = () => {
    if (messages==0){
        document.title = "App"
    }else if (document.title.endsWith("messages")){
        document.title = "App"
    }else{
        document.title = `(${messages}) New messages`
    }
}