const adminDiv = document.getElementById("admin");
const pizzaDiv = document.getElementById("pizza");
const ordersDiv = document.getElementById("orders");

const modal = document.createElement("div");
modal.style.display = "none";
modal.style.zIndex = "1";
modal.style.position = "fixed";
modal.style.left = "0";
modal.style.top = "0";
modal.style.paddingTop = "100px";
const modalContent = document.createElement("div");
const modalCloseBtn = document.createElement("button");
modal.append(modalContent);
modal.append(modalCloseBtn);
adminDiv.append(modal);

const pizzaForm = document.createElement("form");
const pizzaImg = document.createElement("img");
const pizzaName = document.createElement("input");
const pizzaToppings = document.createElement("input");
const pizzaPictureUpload = document.createElement("input");
pizzaPictureUpload.setAttribute("type", "file");
const available = document.createElement("label");
available.id = "container";
const avButton = document.createElement("input");
avButton.setAttribute("type", "checkbox");
const avMark = document.createElement("span");
avMark.id = "checkmark";
const submitBtn = document.createElement("button");

modalContent.append(pizzaForm);
pizzaForm.append(pizzaImg);
pizzaForm.append(pizzaName);
pizzaForm.append(pizzaToppings);
pizzaForm.append(pizzaPictureUpload);
pizzaForm.append(available);
available.append(avButton);
available.append(avMark);
pizzaForm.append(submitBtn);

const getPizzas = async () => {
  const response = await fetch(`http://localhost:8008/api/pizzas`);
  const data = await response.json();
  await renderPizza(data);
};

const getOrders = async () => {
  const response = await fetch(`http://localhost:8008/api/orders`);
  const orders = await response.json();
  await renderOrders(orders);
};

// const postPizza = async (e) => {
//     e.preventDefault();
//     const files = new FormData();
//     const fileField = document.querySelector('input[type="file"]');

//     files.append("title", e.target.title.value);
//     files.append("photographer", e.target.photographer.value);
//     files.append("date", `${new Date()}`);
//     files.append("picture", e.target.file.files[0]);

//     const url = "http://localhost:8000/images";
//     const response = await fetch(url, {
//       method: "POST",
//       header: { "Content-Type": "multipart/form-data" },
//       body: files,
//     });
//     resetForm();
//     getPizzas();
//     if (response.status === 204) {
//       alert("Uploaded! Congrats! Keep 'em coming!");
//     }
//   };

const editPizza = (editButtonValue) => {
  modal.style.display = "block";
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
  getPizzas()
};

const renderPizza = async (data) => {
  ordersDiv.innerHTML = "";

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
    pizzaBox.append(deleteButton);

    deleteButton.value = data[i].id;
    deleteButton.innerText = "DELETE";
    deleteButton.addEventListener("click", function () {
      deletePizza(deleteButton.value);
    });
    pizzaBox.append(editButton);
    editButton.innerText = "EDIT";
    editButton.value = data[i].id;
    editButton.addEventListener("click", function () {
      editPizza(editButton.value);
    });
  }
};

const renderOrders = async (data) => {
  ordersDiv.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    let orderBox = document.createElement("div");
    let orderNumber = document.createElement("h1");

    ordersDiv.append(orderBox);
    orderBox.append(orderNumber);
    orderBox.append(orderNumber);
    orderNumber.innerText = `Rendelés: ${data[i].id}`;

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

getPizzas();
getOrders();

const resetpizzaForm = () => {
  pizzaName.value = ""
  pizzaToppings.value = ""
  pizzaPictureUpload.value = ""
};

const close = () => {
  modal.style.display = "none";
  resetpizzaForm()
};

modalCloseBtn.addEventListener("click", close);
