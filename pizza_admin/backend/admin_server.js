const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 8008;
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(express.json());
app.use(fileUpload());


app.use("/images", express.static(__dirname + "/../../data/pizza/images"));
app.use("/admin", express.static(__dirname + "/../frontend"));

app.get("/api/pizzas", (req, res) => {
  const data = fs.readFileSync(__dirname + "/../../data/pizza/pizza.json");
  const pizzas = JSON.parse(data);

  res.json(pizzas);
});

app.get("/api/orders", (req, res) => {
  const data = fs.readFileSync(__dirname + "/../../data/orders/orders.json");
  const orders = JSON.parse(data);

  res.json(orders);
});


app.delete("/api/pizzadelete", (req, res) => {
  const data = fs.readFileSync(__dirname + "/../../data/pizza/pizza.json");
  const images = JSON.parse(data);

  const chosen = req.body.chosen;
  console.log(chosen);
  const pictureUploadPath = __dirname + `/../../data/pizza/images/image${chosen}.jpg`;




  const result = images.filter(image => image.id != chosen);


  const newArr = JSON.stringify(result);
  fs.writeFileSync(__dirname + "/../../data/pizza/pizza.json", newArr);

  if (fs.existsSync(pictureUploadPath)) {
    fs.unlinkSync(pictureUploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
  }

  return res.status(200).send("done");
});

app.post("/api/pizza", (req, res) => {
  const pizza = JSON.parse(fs.readFileSync(__dirname + "/../../data/pizza/pizza.json"));
  let lastPizzaId = pizza;
  if (lastPizzaId.length === 0) {
    lastPizzaId = 0;
  } else {
    lastPizzaId = pizza[pizza.length - 1].id;
  }

  const pictureUploadPath = __dirname + "/images/" + `pizza${lastPizzaId + 1}.png`;

if (req.files) {
  const uploadedPicture = req.files.picture;
  uploadedPicture.mv(pictureUploadPath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
}
  const name = req.body.pizzaName;
  const toppings = req.body.toppings;
  const picture = req.body.picture;
  
  const newPizzas = {
    id: lastPizzaId + 1,
    name: name,
    toppings: toppings,
    picture: picture
  };

  pizza.push(newPizzas);
  const newData = JSON.stringify(pizza);
  fs.writeFileSync(__dirname + "/../../data/pizza/pizza.json", newData);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
