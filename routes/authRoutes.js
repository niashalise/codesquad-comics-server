const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  localLogin,
} = require("../controllers/authControllers");

router.post("/register", register);
router.get("/login", login);
router.get("/logout", logout);
router.get("/locallogin", localLogin);
router.get("/unauthenticated", (req, res, next) => {
    console.log("Returning to the homepage...");
    res.redirect("/");
});

module.exports = router;