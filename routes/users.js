const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const dal = require('../data/mongoDAL');

router.post('/register', async (req, res) => {
    console.log(req.body)
    console.log(res.body)
    var username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let email = req.body.email;
    let age = req.body.age;
    let qa1 = req.body.color;
    let qa2 = req.body.drink;
    let qa3 = req.body.what;

    console.log(username)

    let checkUsername = await dal.getUserByUsername(username);

    if(!(checkUsername === undefined || checkUsername.length == 0)){
        let model = {
            errorMessage: "Username already exists",
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            age: age,
            color: qa1,
            drink: qa2,
            what: qa3
        };
        console.log("Username already exists");
        res.render('register', model);
        return;
    }

    if (password == confirmPassword) {
        let hashedPassword = await bcrypt.hash(password, 10);

        let result = await dal.createUser(username, hashedPassword, email, age, qa1, qa2, qa3);

        console.log(result)

        res.render('login');
        return;
    } else {
        res.render('register');
        return;
    }

});

router.get('/register', (req, res) => {
    let model = {
        loggedInUser: req.session.user
    };

    res.render('register', model);
});

router.get('/logout', (req, res) => {
    req.session.user = null;

    res.redirect('/');
});

router.get('/profile', async (req, res) => {
    console.log("getting profile")
    console.log(req.session)

    var userInfo = await dal.getUserByUsername(req.session.user.username);

    let model = {
        model: userInfo,
        loggedInUser: req.session.user
    };

    res.render('profile', model)
});

router.post('/profile', async (req, res) => {
    let userId = req.session.user.userId;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let email = req.body.email;
    let qa1 = req.body.color;
    let qa2 = req.body.drink;
    let qa3 = req.body.what;

    let checkUsername = await dal.getUserByUsername(username);

    if(!(checkUsername === undefined || checkUsername.length == 0)){
        let model = {
            errorMessage: "Username already exists",
            password: password,
            confirmPassword: confirmPassword,
            email: email,
            color: qa1,
            drink: qa2,
            what: qa3
        };
        console.log("Username already exists");
        res.render('profile', model);
        return;
    }

    if (password == confirmPassword) {
        let hashedPassword = await bcrypt.hash(password, 10);

        let result = await dal.updateUser(userId, username, hashedPassword, email, qa1, qa2, qa3);

        res.render('home');
        return;
    } else {
        res.render('profile');
        return
    }
});

router.get('/admin', (req, res) => {
    let model = {
        loggedInUser: req.session.user,
        adminUser: req.session.user.isAdmin
    };
    
    res.render('admin', model);
});

router.post('/admin', async (req, res) => {
    let username = req.body.username;

    if (dal.getUserByUsername(username) != null || dal.getUserByUsername(username) != undefined) {
        
        if (req.body.selection == 'Admin') {
            let result = await dal.makeUserAdmin(username);
        }
        else if (req.body.selection == 'Delete') {
            let result = await dal.deleteUser(username);
        }
    
        res.render('admin');
        return;
    }
    else {
        let model = {
            errorMessage: "User does not exist",
        };
        console.log("User not found in database");
        res.render('admin', model);
    }

});

router.get('/login', (req, res) => {
    let model = {
        loggedInUser: req.session.user
    };

    res.render('login', model);
});

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    console.log(`There was an attempt login: ${username}`);

    let dbUser = await dal.getUserByUsername(username);

    if (!dbUser) {
        console.log(`Login ${username} failed`)

        let model = {
            errorMessage: "User not found",
            username: username,
            password: password
        };
        console.log("User not found");
        res.render('login', model);
    }

    let passwordMatch = await bcrypt.compare(password, dbUser.password);

    if (passwordMatch) {
        console.log(`Login ${username} success`);

        var user = {
            username: dbUser.username,
            userId: dbUser._id,
            isAdmin: dbUser.isAdmin
        };

        req.session.user = user;

        res.redirect('/');
    } else {
        console.log(`Login ${username} failed`)

        let model = {
            errorMessage: "Invalid login",
            username: username,
            password: password
        };
        console.log("Invalid login");
        res.render('login', model);
    }
});

module.exports = router;