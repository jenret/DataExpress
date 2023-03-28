const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

const session = require('express-session');
const sessionConfig = {
    secret: 'depression',
    cookie: {}
};
app.use(session(sessionConfig));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

const indexRouter = require('./routes/index');
app.use('', indexRouter);

const usersRouter = require("./routes/users");
app.use('', usersRouter);

const apiRouter = require("./routes/api");
app.use('/api', apiRouter);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
