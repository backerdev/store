const jwt = require("jsonwebtoken");
const User = require("../routes/user/user.model");
const passport = require("passport");

// server/middleware/auth.js

const isChecked = async (req, res, next) => {
  // const { token } = req.cookies;

  // Log cookies for debugging
  // console.log("Cookies: ", req.cookies);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/auth/signin");
};

const isAuthorized = (role) => {
  return function (req, res, next) {
    // Ensure that req.user is available (set by the previous isAuthenticate middleware)
    if (!req.user) {
      return res.redirect("/auth/signin");
    }

    // Check if the user has the required role
    const comma = role?.split(",");
    if (comma.length > 0) {
      for (let i = 0; i < comma.length; i++) {
        if (req.user.accessRights && req.user.accessRights.includes(comma[i])) {
          // User has the required role, proceed to the next middleware or route handler
          return next();
        }
      }
    }
    if (req.user.accessRights && req.user.accessRights.includes(role)) {
      // User has the required role, proceed to the next middleware or route handler
      return next();
    } else {
      // next("Access Denied: You do not have the required role")
      // User does not have the required role, handle unauthorized access
      return res
        .status(403)
        .send("Access Denied: You do not have the required role");
    }
  };
};

module.exports = { isChecked, isAuthorized };
