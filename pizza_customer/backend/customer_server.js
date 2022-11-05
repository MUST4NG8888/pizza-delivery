const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(__dirname + "/../../data/pizza/images"));
app.use("/",express.static(`${__dirname}/../frontend`));
app.use("/admin",express.static(`${__dirname}/../../pizza_admin/frontend`));


app.get("/api/pizza", (req, res) => {
  const data = fs.readFileSync(__dirname + "/../../data/pizza/pizza.json");
  const pizzas = JSON.parse(data);

  res.json(pizzas);
});

app.post("/api/orders", (req, res) => {
  const order = JSON.parse(fs.readFileSync(__dirname + "/../../data/orders/orders.json"));
  let lastOrderNumber = order;
  if (lastOrderNumber.length === 0) {
    lastOrderNumber = 0;
  } else {
    lastOrderNumber = order[order.length - 1].id;
  }

  const Today = new Date();
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
    orderDate:    
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
        Today.getSeconds(),

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
  fs.writeFileSync(__dirname + `/../../data/orders/orders.json`, newData);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
