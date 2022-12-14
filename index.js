const express = require('express');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;
// creating express app instance
const app = express()

const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
const bodyParser = require('body-parser')
const MongoStore = require("connect-mongo");
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser());


app.use(expressLayouts);
// extract style and scripts from sub-pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('./assets'));
// configure the express-session library to read and write to cookies.
// adding middle ware for the sessions
app.use(session({
    name: 'employee-review',
    //TODO change the secret before deployment in production
    secret: 'blahblahblah',
    saveUninitialized: false, // when user is not logged in then should i save extra data.
    resave: false,  // when user is login if session data is not changed it will prevent to saving again and again
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb+srv://rishabh997:krishna@cluster0.elso0f3.mongodb.net/employeeSystem?retryWrites=true&w=majority',
            autoRemove: 'disabled'
        }
    ), function(err) {
        console.log(err || 'connect to the mongo connect');
    }
}));
// initializing the passport.js
app.use(passport.initialize());
app.use(passport.session());
// this middle ware add user to response of which can be used to creating the UI.
app.use(passport.setAuthenticatedUser)
app.use("/", require("./routers"));
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
console.log(session())
// server is starts listening
app.listen(port, (error) => {
    if (error) console.log("server connection ERROR", error);
    else console.log("visit application by", '\x1b[36m"CTL+Click"\x1b[0m');
    // Second argument is inserted in place of %s
    console.log('\x1b[33m%s\x1b[0m', `http://localhost:${port}`);  //yellow
});
