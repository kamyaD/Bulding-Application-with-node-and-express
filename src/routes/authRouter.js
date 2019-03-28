const UserModel = require('../modules/UserModel');
const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require("passport");


const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signUp')
    .post((req, res)=>{
        const {username, password,email } = req.body;
        UserModel.create({
            username,
            password ,
            email

        })
        .then(
            req.login(res.dataValues, ()=>{
                res.redirect('/auth/profile');
            })
        ) 

    });
    authRouter.route('/signin')
    .get((req, res)=>{
        res.render('signin', {
            nav,
            title: 'Sign In'
        });
    })
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
    }));

    authRouter.route('/profile')
    .all((req, res, next)=>{
        if(req.user){
            next();
        }else{
            res.redirect('/');
        }
    })
    .get((req,res)=>{
        res.json(req.user)
    })
    return authRouter;
};
module.exports = router;
