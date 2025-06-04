// require express
require("dotenv").config();
require("./config/authStrategy");
require("./config/connection");
const express = require("express");

const app = express();
const PORT = process.env.PORT || "8080";
const path = require("path");
// -----------------------MIDDLEWARE--------------------------
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname + "/public")));

// Require the following module after the dependencies: path

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("passport");
const session = require("express-session")

// ---------------------END MIDDLEWARE------------------------

// Use these packages as a middleware for this project - helmet, morgan (combined or dev), cors
app.use(cors({ credentials: true, origin: true }));
app.use(morgan("dev"));
app.use(helmet({ contentSecurityPolicy: false }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/books/", bookRoutes); // http://localhost:8080/api/books/
app.use("/auth/", authRoutes);

// PATH: /, HANDLER: "This route points to the Home page
app.get("/", (req, res, next) => {
  //   res.send("This route points to the Home page");
  res.status(200).json({
    success: { message: "This route points to the Home page" },
    statusCode: 200,
  });
});

app.use((err, req, res, next) => {
  const authErrStatus = err.status || 400;
  const serverErrStatus = err.status || 500;

  let condition = err.code === 11000;

  console.log(condition);

  if (condition) {
    return res.status(authErrStatus).json({
      error: { message: "Error detected!" },
      statusCode: authErrStatus,
    });
  } else {
    console.log("We passed the error handling middleware, you're good to go.");
  }

  return res.status(serverErrStatus).json({
    error: { message: err.message || "Internal server error, oh no!" },
    statusCode: serverErrStatus,
  });
});

// use app.listen() to start the server and send a console.log to the terminal with a start message that says `The server is listening on port ${PORT}`

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
  console.log(
    `CodeSquad Comics server is listening on port http://localhost:${PORT}.`
  ); // http://localhost:8080
});
