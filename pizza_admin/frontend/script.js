const adminDiv = document.getElementById("admin");
const pizzaDiv = document.getElementById("pizza");
const ordersDiv = document.getElementById("orders");



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

  const renderPizza = async (data) => {
    ordersDiv.innerHTML = "";
  
    console.log(data);
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
      })
      pizzaBox.append(editButton);
      editButton.innerText = "EDIT";
      editButton.value = data[i].id;
      editButton.addEventListener("click", function () {
        editPizza(editButton.value);
    })
  }};

  const renderOrders = async (data) => {
    ordersDiv.innerHTML = "";
  
    for (let i = 0; i < data.length; i++) {
      let orderBox = document.createElement("div");
      let orderNumber = document.createElement("h1");

     
      ordersDiv.append(orderBox);
      orderBox.append(orderNumber);
      orderBox.append(orderNumber)
      orderNumber.innerText = `Rendelés: ${data[i].id}`;
      
      for (let j = 0; j < data[i].orderedItems.length; j++) {
      let orderedPizza = document.createElement("p")
      orderedPizza.innerText = data[i].orderedItems[j].name
      }
    
  }};


    getPizzas()
    getOrders()