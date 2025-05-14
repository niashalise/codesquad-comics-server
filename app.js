// require express
const express = require("express");

// create const variable called app with the value express()
const app = express();

// Create a const variable called PORT with the value of 8080
const PORT = 8080;

// Require the following dependencies: morgan, helmet and cors
// -----------------------MIDDLEWARE--------------------------
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

// Require the following module after the dependencies: path
const path = require("node:path");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes")

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")))

// ---------------------END MIDDLEWARE------------------------

// Use these packages as a middleware for this project - helmet, morgan (combined or dev), cors
app.use(cors());
app.use(morgan("dev"));

app.use("/api/books/", bookRoutes);
app.use("/api/auth/", authRoutes);

// Create six basic GET routes with the following information using the .send() method and the request/response/next parameter

// PATH: /, HANDLER: "This route points to the Home page
app.get("/", (req, res, next) => {
  //   res.send("This route points to the Home page");
  res.status(200).json({
    success: { message: "This route points to the Home page" },
    statusCode: 200,
  });
});




// use app.listen() to start the server and send a console.log to the terminal with a start message that says `The server is listening on port ${PORT}`

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
    console.log(`CodeSquad Comics server is listening on port http://localhost:${PORT}.`) // http://localhost:8080
});