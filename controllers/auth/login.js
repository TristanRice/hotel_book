const express = require("express")
    , User    = require("../../models/user")
    , router  = express.Router( );

router.get("/", (req, res) => {
    return res.render("auth/login");
});

router.post("/", (req, res) => {
    username = req.body.username;
    password = req.body.password;

    User.findOne({username: username, password: password}, (err, User) => {
        if (!User.length)
            return res.render("auth/login");

        req.session.current_user = User;
        req.session.save( );
        res.redirect("/");
    });
});

module.exports = router;
