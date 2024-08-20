const passport = require("passport");
const User = require("../routes/user/user.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        // Check if user already exists in database
        let user = await User.findOne({
          email: profile.emails[0].value,
        }).select("email accessRights name _id");
        // console.log(user);

        if (!user) {
          return done(null, false, {
            message:
              "Email not registered. Please use a registered email or sign up.",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize user into the sessions
passport.serializeUser((user, done) => {
  process.nextTick(function () {
    return done(null, user._id);
  });
});

// Deserialize user from the sessions
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("email accessRights name _id");
    // console.log("deserialize user: " + user);
    done(null, user); // Attach the user object to req.user
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
