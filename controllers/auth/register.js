const express      = require("express")
    , user         = require("../../models/user")
    , {
        check
        validationResult
        body
    }              = require("express-validator/check")
    , constants    = require("../helpers/constants/constants")
    , mongoose     = require("mongoose")
    , error_msgs   = require("../helpers/errors/error_messages")
    , check_unique = require("../helpers/database_check_unique")
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
        .custom((value, { req }) => {
            check_unique(value, "username", constants.USERNAME_ALREADY_EXISTS);
        })
        .trim( ).escape( ),

    check("email")
        .isEmail()
        .withMessage(error_msgs.VALID_EMAIL_MESSAGE)
        .custom((value, { req }) => {
            check_unique(value, "email", constants.EMAIL_ALREADY_EXISTS);
        })
        .normalizeEmail( )
        .trim( ).escape( ),

    check("password")
        .isLength({
            min: constans.PASSWORD_MIN_LENGTH,
            max: constans.PASSWORD_MAX_LENGTH
        })
        .withMessage(error_msgs.PASSWORD_LENGTH_ERROR_MESSAGE)
        .custom((value, { req }) => {

            if (value !== req.body.password2)
                throw new Error(error_msgs.PASSWORDS_NOT_MATCH_MESSAGE);

            if (!constants.PASSWORD_REGEX_MUST_MATCH.exec(value))
                throw new Error(error_msgs.PASSWORD_MESSAGE_MATCH_REGEX);
        })
        .trim( ).escape( )

]

(req, res) => {
    let errors = validationResult(req).array( );
    if (errors)
        return res.render("login");

    let user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save((err) => {
        if (err)
            throw err;
    });

    req.session.current_user = user;
    req.session.save( );

    res.redirect("/");
});

router.get("/", (req, res) => {

});

module.exports = router;
