const express = require("express");
const router = express.Router();
const { signout, signin, signup, isSignedIn } = require("../controllers/auth");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name", "name must be atleast 3 character").isLength({ min: 3 }),
    check("email", "must be an email").isEmail(),
    check("password", "password must be atleast 5 length").isLength({ min: 5 }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "something wrong with email").isEmail(),
    check("password", "password must be atleast 4 length").isLength({ min: 4 }),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute",isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
