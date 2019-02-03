const express = require("express")
    , User    = require("../../models/user")
    , bcrypt  = require("bcryptjs")
    , router  = express.Router( );

router.get("/", (req, res) => {
    let vars = {};

    if (req.query.not_logged_in)
        vars["errors"] = [{msg: "You must be logged in to view that page"}];

    return res.render("auth/login", vars);
});

router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password2;

    let redirect = "/";
    if (req.query.next_page)
        redirect = req.query.next_page;

    User.findOne({username: username}, (err, User) => {

        console.log(User);

        if (!User || !bcrypt.compareSync(password, User.password)) {
            console.log("here");
            return res.render("auth/login", {
                errors: [{msg: "Wrong username and/or password"}]
            });
        }

        req.session.current_user = User;
        req.session.save( );
        res.redirect(redirect);
    });
});

module.exports = router;
