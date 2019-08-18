const express = require("express");

const productsRouter = require("./routes/product");

const app = express();
const port = process.env.PORT || 3000;

app.use("/products", productsRouter);

// console log that the server is running
app.listen(port, () => console.log(`Express Server Started On Port ${port}`));
