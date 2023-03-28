const e = require('express');
const express = require('express');
const router = express.Router();

const dal = require('../data/mongoDAL');

router.get('/' , (req, res) => {
    console.log('Current cookies');
    console.log(req.cookies);

    let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    if (req.cookies.lastVisit) {
        console.log("Last visited cookie is available");
    }

    res.cookie('lastVisit', date);


    console.log(req.session);

    if(req.session.user === undefined){
        let model = {
            loggedInUser: req.session.user,
            cookie: req.cookies.lastVisit,    
        };
        res.render('home', model);
    }else {
        let model = {
            loggedInUser: req.session.user,
            cookie: req.cookies.lastVisit,
            adminUser: req.session.user.isAdmin
        };
        res.render('home', model);
    }
    

});

module.exports = router;