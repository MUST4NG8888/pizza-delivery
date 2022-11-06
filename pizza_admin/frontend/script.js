const adminDiv = document.getElementById("admin");
const pizzaDiv = document.getElementById("pizza");
const ordersDiv = document.getElementById("orders");
let newPizzaBtn = document.getElementById("new_pizza")

const modal = document.createElement("div");
modal.id = "modal";
modal.style.zIndex = "1";
modal.style.position = "fixed";
modal.style.left = "0";
modal.style.top = "0";
modal.style.paddingTop = "100px";
const modalContent = document.createElement("div");
modalContent.id = "modal_content";
const modalCloseBtn = document.createElement("button");
modal.append(modalContent);
modalContent.append(modalCloseBtn);
modalCloseBtn.innerText = "CLOSE"
adminDiv.append(modal);

const pizzaForm = document.createElement("form");
const pizzaImg = document.createElement("img");
pizzaImg.id = "pizzaImg";
const pizzaName = document.createElement("input");
pizzaName.id = "name";
const pizzaToppings = document.createElement("input");
pizzaToppings.id = "toppings";
const pizzaPictureUpload = document.createElement("input");
pizzaPictureUpload.setAttribute("type", "file");
pizzaPictureUpload.id = "file";
const available = document.createElement("label");
available.id = "container";
const avButton = document.createElement("input");
avButton.setAttribute("type", "checkbox");
avButton.id = "status";
const avMark = document.createElement("span");
avMark.id = "checkmark";
const submitBtn = document.createElement("button");
submitBtn.innerText = "SUBMIT";

modalContent.append(pizzaForm);
pizzaForm.append(pizzaImg);
pizzaForm.append(pizzaName);
pizzaForm.append(pizzaToppings);
pizzaForm.append(pizzaPictureUpload);
pizzaForm.append(available);
available.append(avButton);
available.append(avMark);
pizzaForm.append(submitBtn);

const appState = {
  data: [],
};

const renderOrders = async (data) => {
  ordersDiv.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let orderBox = document.createElement("div");
    orderBox.id = "orderbox"
    let orderNumber = document.createElement("h1");

    ordersDiv.append(orderBox);
    orderBox.append(orderNumber);
    orderBox.append(orderNumber);
    orderNumber.innerText = `# ${data[i].id}`;

    for (let j = 0; j < data[i].orderedItems.length; j++) {
      let orderedPizza = document.createElement("p");
      let pizzaAmount = document.createElement("p");
      orderedPizza.innerText = data[i].orderedItems[j].name;
      pizzaAmount.innerText = `Darab: ${data[i].orderedItems[j].amount}`;
      orderBox.append(orderedPizza);
      orderBox.append(pizzaAmount);
    }
    let name = document.createElement("p");
    let address = document.createElement("p");
    let mobile = document.createElement("p");
    let email = document.createElement("p");
    name.innerText = data[i].name;
    address.innerText = `${data[i].zipCode} ${data[i].city} ${data[i].street} ${data[i].houseNumber}`;
    mobile.innerText = data[i].mobile;
    email.innerText = data[i].email;
    orderBox.append(name);
    orderBox.append(address);
    orderBox.append(mobile);
    orderBox.append(email);
  }
};


const renderPizza = async (data) => {
  pizzaDiv.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let pizzaBox = document.createElement("div");
    let pizzaImg = document.createElement("img");
    let pizzaTitle = document.createElement("h1");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    pizzaDiv.append(pizzaBox);
    pizzaBox.append(pizzaImg);
    pizzaImg.src = `http://localhost:8008${data[i].picture}`;
    pizzaBox.append(pizzaTitle);
    pizzaTitle.innerText = data[i].name;
    pizzaBox.append(editButton);
    pizzaBox.append(deleteButton);

    editButton.innerText = "EDIT";
    editButton.id = "edit"
    editButton.value = data[i].id;
    editButton.addEventListener("click", function () {
      openEditor(editButton.value);
    }); 

    deleteButton.value = data[i].id;
    deleteButton.id = "delete"
    deleteButton.innerText = "DELETE";
    deleteButton.addEventListener("click", function () {
      deletePizza(deleteButton.value);
    });
  }
};


const getPizzas = async () => {
  const response = await fetch(`http://localhost:8008/api/pizzas`);
  const data = await response.json();
  await renderPizza(data);
  appState.data = data;
};

const getOrders = async () => {
  const response = await fetch(`http://localhost:8008/api/orders`);
  const orders = await response.json();
  await renderOrders(orders);
};

const resetPizzaForm = () => {
  pizzaName.value = "";
  pizzaToppings.value = "";
  pizzaPictureUpload.value = "";
};


const postPizza = async (e) => {
  e.preventDefault();
  const files = new FormData();
  const fileField = document.querySelector('input[type="file"]');

  files.append("name", e.target.name.value);
  files.append("toppings", e.target.toppings.value);
  files.append("status", e.target.status.checked);
  files.append("picture", e.target.file.files[0]);


  const url = "http://localhost:8008/api/pizza";
  const response = await fetch(url, {
    method: "POST",
    header: { "Content-Type": "multipart/form-data" },
    body: files,
  });
  resetPizzaForm();
  getPizzas();
  if (response.status === 204) {
    alert("Uploaded! Congrats! Keep 'em coming!");
  }
};

const editPizza = async (e) => {
  e.preventDefault();
  const files = new FormData();
  const fileField = document.querySelector('input[type="file"]');

  files.append("order", submitBtn.value);
  files.append("name", e.target.name.value);
  files.append("toppings", e.target.toppings.value);
  files.append("status", e.target.status.checked);
  files.append("picture", e.target.file.files[0]);

  console.log(files);

  const url = "http://localhost:8008/api/edit";
  const response = await fetch(url, {
    method: "POST",
    header: { "Content-Type": "multipart/form-data" },
    body: files,
  });
  getPizzas();
  if (response.status === 204) {
    alert("Uploaded! Congrats! Keep 'em coming!");
  }
};

const openEditor =  (value) => {
  modal.className = 'show';
  modalContent.className = 'show';
  pizzaName.value = appState.data[value - 1].name;
  pizzaToppings.value = appState.data[value - 1].toppings;
  pizzaImg.src = appState.data[value - 1].picture;
  submitBtn.value = value - 1;
  
  const foo = (e) => {
    editPizza(e);
    pizzaForm.removeEventListener("submit", foo);
  }
  pizzaForm.addEventListener("submit", foo);

  const close = () => {
    modal.className = '';
    modalContent.className = ''; 
    resetPizzaForm();
    pizzaForm.removeEventListener("submit", foo);
  };

modalCloseBtn.addEventListener("click", close);
};

const deletePizza = async (id) => {
  const url = "http://localhost:8008/api/pizzadelete";
  const chosen = id;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      chosen,
    }),
  });
  getPizzas();
};


getPizzas();
getOrders();




const newModal = () => {
  modal.className = 'show';
  modalContent.className = 'show';
  
  const foo = (e) => {
    postPizza(e);
    pizzaForm.removeEventListener("submit", foo);
  }

  pizzaForm.addEventListener("submit", foo);

  const close = () => {
    modal.className = '';
    modalContent.className = ''; 
    resetPizzaForm();
    pizzaForm.removeEventListener("submit", foo);
  };

modalCloseBtn.addEventListener("click", close);
};


newPizzaBtn.addEventListener('click', newModal)

