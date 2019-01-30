const express      = require("express")
    , User         = require("../../models/user")
    , {
        check,
        validationResult,
        body
    }              = require("express-validator/check")
    , constants    = require("../helpers/constants/constants")
    , mongoose     = require("mongoose")
    , error_msgs   = require("../helpers/errors/error_messages")
    , check_unique = require("../helpers/database/check_unique")
    , config       = require("../../config.json")
    , router       = express.Router( );

mongoose.connect(config.database_url);

router.post("/", [

    check("username")
        .isLength({
            min: constants.USERNAME_MIN_LENGTH,
            max: constants.USERNAME_MAX_LENGTH
        })
        .withMessage(error_msgs.USERNAME_LENGTH_ERROR_MESSAGE)
        .trim( ).escape( ),

    check("email")
        .isEmail()
        .withMessage(error_msgs.VALID_EMAIL_MESSAGE)
        .normalizeEmail( ),

    check("password")
        .custom((value, { req }) => {

            if (value !== req.body.password2)
                throw new Error(error_msgs.PASSWORDS_NOT_MATCH_MESSAGE);

            if (!constants.PASSWORD_REGEX_MUST_MATCH.exec(value))
                throw new Error(error_msgs.PASSWORD_MESSAGE_MATCH_REGEX);

            return true;
        })
        .trim( ).escape( )

],
(req, res) => {
    let errors = validationResult(req).array( );
    if (errors.length)
        return res.render("auth/register", {
            errors: errors
        });

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.hash_password( );

    user.save((err) => {
        uniqueErrors = [];

        if (err && err.errors.username)
            uniqueErrors.push({msg: "That username is already in use"});

        if (err && err.errors.email)
            uniqueErrors.push({msg: "That email is already in use"});

        if (uniqueErrors.length)
            return res.render("auth/register", {
                errors: uniqueErrors
            });

        req.session.current_user = user;
        req.session.save( );

        res.redirect("/");
    });
});

router.get("/", (req, res) => {
    return res.render("auth/register")
});

module.exports = router;
