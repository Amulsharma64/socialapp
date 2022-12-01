const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
// const cors = require("cors");
const multer  = require('multer');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const productRoute = require("./routes/product");
const path = require("path");

const port = process.env.PORT || 8000;
require("./db/connection");

const app = express();
dotenv.config();
app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);
app.use("/api/product",productRoute);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully ");
    } catch (error) {
      console.log(error);
      return res.status(401).json(error);
    }
  });

app.get("*", (req, res) => {
    res.render("404error");
});

app.listen(port,()=>{
    console.log("Backend Server is running at port:" + port);
});