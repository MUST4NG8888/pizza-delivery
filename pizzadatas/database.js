const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 9000;



app.use("/images", express.static(__dirname));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});