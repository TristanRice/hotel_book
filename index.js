const express = require("express")
    , path    = require("path")
    , router  = require("./controllers/index")
    , config  = require("./config.json")
    , cookie  = require("cookie-parser")
    , parser  = require("body-parser")
    , session = require("express-session")
    , app 	  = express( );


app.use(parser.urlencoded({
	extended: true
}));

app.use(parser.json());

app.engine('pug', require('pug').__express);
app.set("view engine", "pug");
app.set("views", "./views");
app.locals.pretty = true;

app.use(cookie( ))
app.use(session({
	secret: config.app_secret,
	resave: false,
	saveUninitialized: true
}))

//I need to make sure that the paths work on both windows and linux machines
//path.resolve reaplces / with \ in windowss etc.
let lightpick_path = path.resolve(__dirname+"/node_modules/lightpick");

app.use(express.static("./public"));
app.use(express.static(lightpick_path));

app.use(router);

app.listen(config.port, ( ) => {
	console.log(`listening on port ${config.port}`);
})
