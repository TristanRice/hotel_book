const express = require("express")
    , User    = require("../../models/user")
    , bcrypt  = require("bcryptjs")
    , router  = express.Router( );

router.get("/", (req, res) => {
    return res.render("auth/login");
});

router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password2;


    User.findOne({username: username}, (err, User) => {

        if (!User || !bcrypt.compareSync(password, User.password))
            return res.render("auth/login");

        req.session.current_user = User;
        req.session.save( );
        res.redirect("/");
    });
});

module.exports = router;
