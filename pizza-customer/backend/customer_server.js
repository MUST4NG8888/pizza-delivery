const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static("http://localhost:9000/pizza/images"));
app.use(express.static(`${__dirname}/../frontend`));


app.get("/api/pizza", (req, res) => {
  const data = fs.readFileSync("http://localhost:9000/pizza/pizza.json");
  const pizzas = JSON.parse(data);

  res.json(pizzas);
});

app.post("/api/orders", (req, res) => {
  const order = JSON.parse(fs.readFileSync(__dirname + "/../../pizzadatas/orders/orders.json"));
  let lastOrderNumber = order;
  if (lastOrderNumber.length === 0) {
    lastOrderNumber = 0;
  } else {
    lastOrderNumber = order[order.length - 1].id;
  }

  const orderDate = req.body.orderDate;
  const orderedItems = req.body.pizza;
  const name = req.body.name;
  const street = req.body.street;
  const houseNumber = req.body.houseNumber;
  const city = req.body.city;
  const zipCode = req.body.zipCode;
  const mobile = req.body.mobile;
  const email = req.body.email;
  
  const newOrders = {
    id: lastOrderNumber + 1,
    orderDate: orderDate,
    orderedItems: orderedItems,
    name: name,
    street: street,
    houseNumber: houseNumber,
    city: city,
    zipCode: zipCode,
    mobile: mobile,
    email: email,
  };

  order.push(newOrders);
  const newData = JSON.stringify(order);
  fs.writeFileSync(__dirname + `/../../pizzadatas/orders/orders.json`, newData);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
