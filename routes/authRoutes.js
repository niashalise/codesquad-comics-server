const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  register,
  login,
  logout,
  localLogin,
} = require("../controllers/authControllers");

router.post("/register", register);
router.get("/login", login);
router.post("/logout", logout);
router.post("/locallogin", localLogin);
router.get("/unauthenticated", (req, res, next) => {
  console.log("Returning to the homepage...");
  res.redirect("/");
});
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);

module.exports = router;
