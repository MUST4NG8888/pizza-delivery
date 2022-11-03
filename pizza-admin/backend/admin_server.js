const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 8008;

app.use(cors());
app.use(express.json());
app.use(fileUpload());


app.use("/images", express.static("http://localhost:9000/pizza/images"));


app.get("/api/orders", (req, res) => {
  const data = fs.readFileSync(__dirname + "/../../pizzadatas/orders/orders.json");
  const pizzas = JSON.parse(data);

  res.json(pizzas);
});
app.delete("/api/pizzaeditor", (req, res) => {
  const data = fs.readFileSync(__dirname + "/../../pizzadatas/pizza/pizza.json");
  const images = JSON.parse(data);

  const chosen = req.body.chosen;
  console.log(chosen);
  const pictureUploadPath = __dirname + `/../../pizzadatas/pizza/images/image${chosen}.jpg`;




  const result = images.filter(image => image.id != chosen);


  const newArr = JSON.stringify(result);
  fs.writeFileSync(__dirname + "/../../pizzadatas/pizza/pizza.json", newArr);

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

app.post("/api/orders", (req, res) => {
  const pizza = JSON.parse(fs.readFileSync("http://localhost:9000/pizza/pizza.json"));
  let lastPizzaId = pizza;
  if (lastPizzaId.length === 0) {
    lastPizzaId = 0;
  } else {
    lastPizzaId = pizza[pizza.length - 1].id;
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
  fs.writeFileSync("http://localhost:9000/pizza/pizza.json", newData);

  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
