const express = require("express");
const fileSystem = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(__dirname + "./pizza-datas/pizza/images"));

app.get("/pizza-datas/orders", (req, res) => {
  const data = fileSystem.readFileSync(__dirname + "./pizza-datas/orders");
  const orders = JSON.parse(data);

  res.json(orders);
});

app.post("/pizza-datas/pizza", (req, res) => {
    const data = fileSystem.readFileSync(__dirname + "/pizza-datas/pizza");
    const orders = JSON.parse(data);
   
    const currentOrder = [];
    const lastOrder = files[files.length - 1];
    const r = /\d+/g;
    const lastOrderNumberArr = lastOrder.match(r);
    console.log(lastOrderNumberArr)
   
  
    const lastOrderNumber = Number(lastOrderNumberArr[0]);
    console.log(lastOrderNumber)
  
    const id = req.body.orderDate;
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
  
    currentOrder.push(newOrders);
    const newData = JSON.stringify(currentOrder);
    fileSystem.writeFileSync(
      __dirname + `/api/orders/orders${lastOrderNumber + 1}.json`,
      newData
    );
  
    res.sendStatus(204);
  });