const express  = require("express")
    , login    = require("./login")
    , register = require("./register")
    , router   = express.Router( );

router.use("/login", login);
router.use("/register", register);

module.exports = router;
