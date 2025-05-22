require("dotenv").config();

//External Modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Local Modules
const errorController = require("./controllers/errorController");
const blogRouter = require("./routers/blogRouter");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", blogRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
