const express = require('express');
const router = express.Router();

const dal = require('../data/mongoDAL');

router.get("/getQuestion1", async (req, res) => {
    //Call the mongo database and get the data I need
    var users = await dal.getAllUsers();

    console.log("get all users: result");
    console.log(users);

    question1Results = {
        labels: ["Red", "Yellow", "Blue"],
        red: 0,
        yellow: 0,
        blue: 0
    }

    for(var i = 0; i < users.length; i++){
        if(users[i].answer1 == "red"){
            question1Results.red += 1;
        }else if(users[i].answer1 == "yellow"){
            question1Results.yellow += 1; 
        }else{
            question1Results.blue += 1;
        }
    }

    //Think about the data our consumer needs
    //Create an object that structure the chart data so it's easy to (idk what else it said)

    console.log("Question one values: ")
    console.log(question1Results)

    jsonResponse = {
        labels:question1Results.labels,
        data: [question1Results.red, question1Results.yellow, question1Results.blue]
    }

    res.json(jsonResponse);
});

router.get("/getQuestion2", async (req, res) => {
    var users = await dal.getAllUsers();

    console.log("get all users: result");
    console.log(users);

    question2Results = {
        labels: ["Water", "Soda", "Juice"],
        water: 0,
        soda: 0,
        juice: 0
    }

    for(var i = 0; i < users.length; i++){
        if(users[i].answer2 == "water"){
            question2Results.water += 1;
        }else if(users[i].answer2 == "soda"){
            question2Results.soda += 1; 
        }else{
            question2Results.juice += 1;
        }
    }

    console.log("Question two values: ")
    console.log(question2Results)

    jsonResponse = {
        labels:question2Results.labels,
        data: [question2Results.water, question2Results.soda, question2Results.juice]
    }

    res.json(jsonResponse)
});

router.get("/getQuestion3", async (req, res) => {
    var users = await dal.getAllUsers();

    console.log("get all users: result");
    console.log(users);

    question3Results = {
        labels: ["What", "Yes", "Fa"],
        what: 0,
        yes: 0,
        fa: 0
    }

    for(var i = 0; i < users.length; i++){
        if(users[i].answer3 == "what"){
            question3Results.what += 1;
        }else if(users[i].answer3 == "yes"){
            question3Results.yes += 1; 
        }else{
            question3Results.fa += 1;
        }
    }

    console.log("Question three values: ")
    console.log(question3Results)

    jsonResponse = {
        labels:question3Results.labels,
        data: [question3Results.what, question3Results.yes, question3Results.fa]
    }

    res.json(jsonResponse)
});

module.exports = router;