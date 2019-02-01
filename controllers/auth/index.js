const express  = require("express")
    , login    = require("./login")
    , register = require("./register")
    , logout   = require("./logout")
    , router   = express.Router( );

router.use("/login", login);
router.use("/register", register);
router.use("/logout", logout)

module.exports = router;
