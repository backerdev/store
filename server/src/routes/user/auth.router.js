const express = require("express");
const passport = require("passport");
// const { register, allUsers } = require("./auth.controller");
// const { generateJWTtoken } = require("../../utils/commonFunctions");

const router = express.Router();

// Google OAuth login
// router.post("/register", register);
// router.get("/getusers", allUsers);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    // session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    // console.log(req.user);
    // const token = generateJWTtoken(req.user);

    res.redirect(process.env.SUCCESS_REDIRECT);
    // res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     secure: false,
    //   })
    //   .redirect("http://localhost:5173/dashboard");
  }
);
router.get("/session", (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .json({ user: req.user.name, rights: req.user.accessRights });
  }
  return res.status(309).json({ message: "forbidden" });
});

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    return res.redirect("/auth/signin");
  });
});

module.exports = router;
