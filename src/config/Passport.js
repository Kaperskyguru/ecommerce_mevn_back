const passportJWT = require('passport-jwt');
const Client = require("./../Models/Client.js");


const ExtractJWT = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

let JWTOptions = {};

JWTOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
JWTOptions.secretOrKey = process.env.SECRET;


const Strategy = new JwtStrategy(JWTOptions, async (jwt_payloads, next) => {

    let client = await Client.findById(jwt_payloads.id);

    if (client) {
        next(null, client)
    } else {
        next(null, false)
    }

});
module.exports = Strategy;