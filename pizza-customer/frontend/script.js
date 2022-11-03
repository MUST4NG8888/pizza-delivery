const nameInput = document.getElementById("name");
const streetInput = document.getElementById("street");
const houseNumberInput = document.getElementById("houseNumber");
const cityInput = document.getElementById("city");
const zipCodeInput = document.getElementById("zipCode");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");

let pizzaArray = [];

const appState = {
  pizza: [],
  selectedIndex: null,
};

console;
const createButtons = () => {
  for (let i = 0; i < appState.pizza.length; i++) {
    let pizzaButton = document.createElement("button");
    pizzaButtonDiv.append(pizzaButton);
    pizzaButton.className = `pizzabutton`;
    pizzaButton.id = `circle${i}`;
    let span = document.createElement("span");
    pizzaButton.append(span);
    span.innerText = "PIZZA";

    let gomb = document.getElementById(`circle${i}`);
    gomb.addEventListener(
      "click",
      (irdKi = () => {
        let pizzaName = document.getElementById("pizza_name");
        let pizzaTopping = document.getElementById("pizza_toppings");
        let pizzaImg = document.getElementById("pizzaimg");
        if (gomb.id == `circle${i}`) {
          pizzaImg.style.animation = "";
          pizzaImg.style.animationFillMode = "";
          pizzaName.innerText = appState.pizza[i].name;
          let text = appState.pizza[i].toppings.toString();

          pizzaTopping.innerText = "";
          pizzaTopping.innerHTML = text;
          console.log(text);
          console.log(appState.pizza[i].toppings);

          let source = `http://localhost:9000${appState.pizza[i].picture}`;
          console.log(source);

          pizzaImg.src = source;
          // pizzaImg.style.animation = "loadingPizza 2s ease-in-out";
          // pizzaImg.style.animationFillMode = "forwards";
          setTimeout(
            (animation = () => {
              pizzaImg.style.animation = "loadingPizza 2s ease-in-out";
              pizzaImg.style.animationFillMode = "forwards";
            }),
            100
          );
        }
      })
    );
  }
};

const pizzaLoader = (a) => {
  let pizzaBox = document.createElement("div");
  pizzaBox.className = "pizzabox";
  document.getElementById("root").append(pizzaBox);
  let pizzaLeft = document.createElement("div");
  pizzaLeft.id = "pizza_left";
  let pizzaRight = document.createElement("div");
  pizzaRight.id = "pizza_right";
  pizzaBox.append(pizzaLeft);
  pizzaBox.append(pizzaRight);
  let pizzaButtonDiv = document.createElement("div");
  document.getElementById("pizza_right").append(pizzaButtonDiv);
  pizzaButtonDiv.id = "pizzaButtonDiv";

  let pizzaImg = document.createElement("img");
  pizzaImg.className = "pizza_img";
  console.log(appState);
  pizzaImg.src = `http://localhost:9000${appState.pizza[a].picture}`;
  pizzaImg.id = "pizzaimg";
  pizzaRight.append(pizzaImg);
  pizzaImg.style.animation = "loadingPizza 2s ease-in-out";
  pizzaImg.style.animationFillMode = "forwards";
  appState.selectedIndex = a;
  let pizzaName = document.createElement("h1");
  pizzaName.id = "pizza_name";
  pizzaLeft.append(pizzaName);
  pizzaName.innerText = appState.pizza[a].name;
  let pizzaToppings = document.createElement("h3");
  pizzaToppings.id = "pizza_toppings";
  pizzaLeft.append(pizzaToppings);
  pizzaToppings.innerText = appState.pizza[a].toppings;
  const amountInput = document.createElement("input");
  amountInput.id = "amount_input";
  amountInput.type = "number";
  amountInput.placeholder = "Amount";
  pizzaLeft.append(amountInput);
  const mainButton = document.createElement("button");
  pizzaLeft.append(mainButton);
  mainButton.id = "main_button";
  mainButton.innerText = "Add to Basket";
  document.getElementById("main_button").addEventListener(
    "click",
    (fillBasket = () => {
      if (
        document.getElementById("amount_input").value == 0 ||
        document.getElementById("amount_input").value === undefined
      ) {
        alert("Nem jó értéket adtál meg!");
      } else {
        let collector = document.createElement("div");
        collector.id = "orderBox";
        document.getElementById("orders").append(collector);
        let rendeles =
          document.getElementById("pizza_name").innerText +
          ", darabszám: " +
          document.getElementById("amount_input").value +
          "\n";
        collector.innerHTML += rendeles;

        let pizza = {
          name: document.getElementById("pizza_name").innerText,
          amount: document.getElementById("amount_input").value,
        };

        pizzaArray.push(pizza);
        document.getElementById("amount_input").value = "";
        let choosenPizzaImg = document.createElement("img");
        collector.append(choosenPizzaImg);
        choosenPizzaImg.id = "basketImg";
        switch (document.getElementById("pizza_name").innerText) {
          case "Margherita":
            choosenPizzaImg.src = `http://localhost:9000${appState.pizza[0].picture}`;
            break;
          case "Prosciutto di Parma":
            choosenPizzaImg.src = `http://localhost:9000${appState.pizza[1].picture}`;
            break;
          case "Calabrese":
            choosenPizzaImg.src = `http://localhost:9000${appState.pizza[2].picture}`;
            break;
          case "Tonno e Cipolle":
            choosenPizzaImg.src = `http://localhost:9000${appState.pizza[3].picture}`;
            break;
          case "Amalfitana":
            choosenPizzaImg.src = `http://localhost:9000${appState.pizza[4].picture}`;
            break;
          case "Quattro Formaggi":
            choosenPizzaImg.src = `http://localhost:9000${appState.pizza[5].picture}`;
            break;
          case "Prosciutto e Funghi":
            choosenPizzaImg.src = `http://localhost:9000${appState.pizza[6].picture}`;
            break;
        }
      }
    })
  );
};

const createPizzaDesc = (a) => {
  document.getElementsByClassName(
    "pizza_img"
  ).src = `http://127.0.0.1:3000${appState.pizza[a].picture}`;
  document.getElementsByTagName("h1").innerHTML = appState.pizza[a].name;
  document.getElementsByTagName("h3").innerHTML = appState.pizza[a].toppings;
};

const request = async () => {
  const response = await fetch(`http://localhost:3000/api/pizza`);
  const data = await response.json();
  appState.pizza = data;
};

const start = async () => {
  await request();
  pizzaLoader(0);
  createButtons();
};

const postOrder = async (
  date,
  pizza,
  name,
  street,
  houseNumber,
  city,
  zipcode,
  mobile,
  email
) => {
  const url = "http://localhost:3000/api/orders";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      pizza,
      name,
      street,
      houseNumber,
      city,
      zipcode,
      mobile,
      email,
    }),
  });
  return response.status;
};

const resetForm = () => {
  nameInput.value = "";
  streetInput.value = "";
  houseNumberInput.value = null;
  cityInput.value = "";
  zipCodeInput.value = null;
  mobileInput.value = null;
  emailInput.value = "";
};

const makeOrder = async (
  date,
  pizza,
  name,
  street,
  houseNumber,
  city,
  zipcode,
  mobile,
  email
) => {
  const resStatus = await postOrder(
    date,
    pizza,
    name,
    street,
    houseNumber,
    city,
    zipcode,
    mobile,
    email
  );
  if (resStatus === 204) {
    alert("Thanks for your love of Pizza!");
    resetForm();
  } else {
    alert("Something goes wrong");
  }
};

const getOrderInput = async () => {
  let orderName = nameInput.value;

  let chosenPizza = pizzaArray;

  let orderStreet = streetInput.value;
  let orderHouseNumber = houseNumberInput.value;
  let orderCity = cityInput.value;
  let orderZipCode = zipCodeInput.value;
  let orderMobile = mobileInput.value;
  let orderEmail = emailInput.value;

  let Today = new Date();
  var date =
    Today.getFullYear() +
    "-" +
    (Today.getMonth() + 1) +
    "-" +
    Today.getDate() +
    " " +
    Today.getHours() +
    ":" +
    Today.getMinutes() +
    ":" +
    Today.getSeconds();

  await makeOrder(
    date,
    chosenPizza,
    orderName,
    orderStreet,
    orderHouseNumber,
    orderCity,
    orderZipCode,
    orderMobile,
    orderEmail
  );
};

start();

const ourButton = document.getElementById("orderButton");
ourButton.addEventListener("click", getOrderInput);

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openBasket() {
  document.getElementById("myBasket").style.width = "100%";
}

function closeBasket() {
  document.getElementById("myBasket").style.width = "0%";
}

document.getElementById("hamburger_menu").addEventListener("click", openNav);
document.getElementById("basket").addEventListener("click", openBasket);
document
  .getElementById("closebtnHamburger")
  .addEventListener("click", closeNav);
document
  .getElementById("closebtnBasket")
  .addEventListener("click", closeBasket);
