const passport = require('passport');
const { Strategy } = require('passport-local');
const db = require("../database");
const debug = require('debug')('app:local.strategy');
const UserModel = require("../../modules/UserModel");

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'

        }, (username, password, done) => {
            (async function postgres(){
                try{
                 const user = await UserModel.findOne({ where: { username } });

                 if(user.password===password){
                     done(null, user)

                 }else{
                    done(null, false)

                 }

                } catch(err){console.log(err.stack);}
            }())
    
        }

    ));
}