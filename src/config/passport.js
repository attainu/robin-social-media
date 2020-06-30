
import passportJWT from "passport-jwt";
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//Import User Model
import User from "../models/userSchema.js";

const JWT_KEY = "deepambahre@gmail.com";

export default (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = JWT_KEY;

  passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
    let id = jwt_payload.user._id;
    User
      .findOne({ _id: id })
      .exec()
      .then(user => {
        if (user) {
          return done(null, user);
        } 
        return done(null, false);
      })
      .catch(err => {
        return done(err, false);
      });
  }));
}