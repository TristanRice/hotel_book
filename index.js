const express = require("express")
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

app.use(cookie( ))
app.use(session({
	secret: config.app_secret,
	resave: false,
	saveUninitialized: true
}))

app.use(express.static("./public"));

app.use(router);

app.listen(config.port, ( ) => {
	console.log(`listening on port ${config.port}`);
})
