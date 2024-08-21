const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const passport = require("./src/configs/passport");
const mongoose = require("mongoose");
const session = require("express-session");
const rateLimit = require("express-rate-limit");

const StoreRouter = require("./src/routes/store/store.router");
const AuthRouter = require("./src/routes/user/auth.router");

require("dotenv").config();

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: "strict" },
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// // MongoDB connection
mongoose.connect(process.env.MONGO_URI);

// Static files
app.use(express.static(path.join(__dirname, "dist")));

// API routes

app.use("/v1", StoreRouter);
app.use("/auth", AuthRouter);

// Serve frontend for all other routes
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
});

const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;

// // app.js

// const express = require("express");
// const helmet = require("helmet");
// const cors = require("cors");
// const path = require("node:path");
// const passport = require("./src/configs/passport");
// const mongoose = require("mongoose");
// const session = require("express-session");
// // const cookieParser = require("cookie-parser");
// const rateLimit = require("express-rate-limit");

// const StoreRouter = require("./src/routes/store/store.router");
// const AuthRouter = require("./src/routes/user/auth.router");

// const jwt = require("jsonwebtoken");
// const { isChecked } = require("./src/middleware/auth");
// require("dotenv").config();

// const app = express();
// // app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: true, sameSite: "strict" },
//   })
// );
// app.use(passport.authenticate("session"));
// // Passport initialization
// app.use(passport.initialize());
// app.use(passport.session());
// // Middleware setup
// app.use(helmet());
// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
// app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI);

// // Session setup

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);
// app.use(express.static(path.join(__dirname, "dist")));

// app.use("/v1", StoreRouter);
// app.use("/auth", AuthRouter);

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

// app.use((err, req, res, next) => {
//   res.status(500).send(err.stack);
// });
// const port = process.env.PORT;
// app.listen(port);

// module.exports = app;
