const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/userModel");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({username});

      if (!user) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.Id });

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.email[0].value,
            googleId: profile.id,
          });
        }
        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error);
  }
});
