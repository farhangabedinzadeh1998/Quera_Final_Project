

// ------------------------------------------------------------------------------

let todos = [];
let completedTodos = [];

const countTodos = () => {
    const taskCounter = document.getElementById("task-counter");
    const todoCount = todos.filter(todo => !todo.editing).length;
    const completedCount = completedTodos.length;

    if (todoCount === 0) {
        taskCounter.innerHTML = 'تسکی برای انجام دادن وجود ندارد';
    } else {
        taskCounter.innerHTML = `${todoCount} تسک برای انجام وجود دارد`;
    }
    
    const completeCounter = document.getElementById("complete-counter");
    completeCounter.innerHTML = completedCount ? `${completedCount} تسک انجام شده است` : '';
};

const addTodos = () => {
    todos.push({
        title: "",
        description: "",
        priority: "",
        editing: true,
    });

    saveTodos();
    renderTodos();
};

// وقتی روی دکمه کلیک شود :
document.getElementById("add-todos").addEventListener("click", addTodos);




const updateTodo = (index) => {
    let counter = 0
    const title = document.getElementById(`title-${index}`).value;
    const description = document.getElementById(`description-${index}`).value;
    const priority = document.getElementById(`priority-${index}`).value;
    if(title === '' ) {
        alert("نام تسک را انتخاب کن");
    } else if (description === '') {
        alert('توضیحات خود را اضافه کنید');;
    } else {
        todos[index] = {title, description, priority,editing: false};
    }

    countTodos();
    saveTodos();
    renderTodos();
};

const editTodo = (index) => {
    todos[index].editing = true;

    countTodos();
    renderTodos();
    // saveTodos();
};

const deleteTodo = (index) => {
    todos.splice(index, 1);

    countTodos();
    saveTodos();
    renderTodos();
};

const toggleComplete = (index) => {
    const completedTodo = todos.splice(index, 1)[0];
    completedTodos.push(completedTodo);
    
    countTodos();
    renderTodos();
    saveTodos();
};

const restoreTodo = (index) => {
    const restoreTodo = completedTodos.splice(index, 1)[0];
    completedTodos.push(restoreTodo);

    countTodos();
    saveTodos();
    renderTodos();
};

const loadTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const storedCompletedTodos =
        JSON.parse(localStorage.getItem("completedTodos")) || [];
    todos = storedTodos;
    completedTodos = storedCompletedTodos;

    countTodos();
    renderTodos();
}

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
}

const renderTodos = () => {

    const todoContainer = document.getElementById("task-container");
    let todoCounter = document.getElementById("task-counter");
    let completeCounter = document.getElementById("complete-counter");
    const completedContainer = document.getElementById("completed-container");
    const bgPicture = document.getElementById("background-picture");

    // تسکی برای انجام دادن نیست
   
    completedTodos.length !== 0 ? completeCounter.innerHTML = completedTodos.length + 'تسک انجام شده است ' : true;

    
    todos.length === 0 
    ? bgPicture.classList.add("hidden")
    : bgPicture.classList.remove("hidden");

    todoContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    todos.length === 0 
            ? document.getElementById("background-picture").classList.remove("hidden")
            : document.getElementById("background-picture").classList.add("hidden")

    todos.forEach((todo, index) => {
        const div = document.createElement("div");
        if (todo.editing) {
            div.className = "addTask w-full border rounded-xl border-gray-200 bg-white p-4 space-y-4 shadow-md"
            // دکمه اولویت ها اصلاح شود
            div.innerHTML = `
            <div class="flex flex-col space-y-4">
                    <div class="flex flex-col gap-2">
    
                        <input type="text" id="title-${index}" class="p-3 outline-none  font-bold text-lg text-gray-500" placeholder="نام تسک" value="${todo.title}">
                    
                        <textarea id="description-${index}" class="resize-none border outline-none transition duration-200 ease-out focus:drop-shadow-lg border-gray-300 p-3 rounded-lg font-semibold text-lg text-gray-400 truncate" placeholder="توضیحات">${todo.description}</textarea>
    
                    </div>

                    <!-- <div id="dropdown" class="dropdown cursor-pointer space-y-2 shadow-md w-fit border rounded-lg transition ease-out duration-300 hover:shadow hover:scale-105">
                        <div id="select" class="select flex flex-row-reverse space-x-3 font-bold text-base items-center justify-center px-3 py-2 text-gray-400 ">
                            <span id="selected" class="selected pt-0.5">اولویت</span>
                            <img id="caret" class="-rotate-90" src="./src/assets/images/main-items/add-new/tag-right.png" alt="tag">
                        </div>
                    </div> -->
                     
                </div>
    
                <select id="priority-${index}" class="text-center border-gray-200 border bg-white w-1/6  p-4 mb-2 rounded-lg font-bold text-base items-center justify-center text-gray-600">
                <option value="default" disabled selected>
                اولویت ها
                </option>
                <option class="flex justify-center font-semibold text-md py-0.5 px-3 rounded-lg text-red-400 bg-red-200" value="High" ${
                    todo.priority === "High" ? "selected" : ""
                }>بالا</option>
                <option class="flex justify-centerfont-semibold text-md py-0.5 px-3 rounded-lg text-orange-300 bg-yellow-100" value="Moderate" ${
                    todo.priority === "Moderate" ? "selected" : ""
                }>متوسط</option>
                <option class="flex justify-centerfont-semibold text-md py-0.5 px-3 rounded-lg text-green-500 bg-green-100" value="Low" ${
                    todo.priority === "Low" ? "selected" : ""
                }>پایین</option>
                </select>
                <div class="border border-gray-300"></div>
    
                <div class="text-left pt-4 pl-2">
                    <button class=" tranisition duration-300 hover:scale-105 hover:bg-blue-500 submit-btn bg-blue-400 rounded-xl py-1.5  px-4 font-semibold text-sm text-white">اضافه کردن تسک</button>
                </div>
    
            </div>`;

            div.querySelector(".submit-btn") .addEventListener("click", () => updateTodo(index));

            
        } else {
            div.className = "task flex relative bg-white border py-5 rounded-xl shadow-md"
            div.innerHTML = `
            <div class="border-4 rounded-l ml-4 
            ${
                todo.priority === "High"
                ? "border-red-300"
                : todo.priority === "Moderate"
                ? "border-yellow-400"
                : "border-green-400"
            }
            "></div>
            <div class="flex gap-4 items-center">
                <input type="checkbox" class="complete-checkbox border rounded-xl border-gray-300 w-6 h-6 mt-2">
                <div class="flex flex-col gap-1">
                    <span class="font-bold text-xl text-black">${todo.title}</span>
                    <span class="font-semibold text-sm text-gray-500">${todo.description}</span>
                </div>
            </div>
            <!--<img class="doted-menu absolute top-5 cursor-pointer p-3 pl-1 left-5 items-start mr-auto" src="./src/assets/images/main-items/task/Frame 1000005552.png" alt="delete-edit-menu"> -->
            <div id="delete-edit" class="flex absolute top-7 left-10  gap-2 border border-gray-300 rounded-lg bg-white p-1">
                    <img id="edit-btn" class="edit-btn cursor-pointer " src="./src/assets/images/main-items/task/tabler_edit.png" alt="edit">
                    <img id="delete-btn" class="delete-btn cursor-pointer " src="./src/assets/images/main-items/task/tabler_trash-x.png" alt="delete">
            </div>
            ` ;

            div.querySelector(".complete-checkbox").addEventListener("click", () => toggleComplete(index));
        

            // div.querySelector(".doted-menu").addEventListener("click", () => {
            // document.getElementById("delete-edit").classList.toggle("hidden")
            // document.getElementById("delete-edit").classList.toggle("flex")
            // })

        

            div.querySelector(".edit-btn").addEventListener("click", () => editTodo(index));
            div .querySelector(".delete-btn") .addEventListener("click", () => deleteTodo(index));


        };

        todoContainer.insertAdjacentElement("afterbegin", div);
    });
    

    completedTodos.forEach((todo, index) => {
        const div = document.createElement("div");
        div.className = "flex flex-row bg-white border py-5 rounded-xl shadow-md";
        div.innerHTML = `
        <div class="border-4 rounded-l ml-4"></div>
                <div class="flex gap-4 items-center">
                    <input type="checkbox" checked class="restore-checkbox border rounded-xl border-gray-300 w-6 h-6 mt-2">
                    <span class="font-bold text-xl text-black line-through">${todo.title}</span>
                </div>`;

        div.querySelector(".restore-checkbox").addEventListener("click", () => restoreTodo(index));
        
        completedContainer.appendChild(div);
    });
};



window.onload = loadTodos;