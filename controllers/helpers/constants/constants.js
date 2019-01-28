module.exports = {
    /*
    Username constants
    */
    USERNAME_MIN_LENGTH: 3,
    USERNAME_MAX_LENGTH: 20,

    /*
    Password constants
    */
    PASSWORD_MIN_LENGTH: 10,
    PASSWORD_MAX_LENGTH: 99,

    //regex that the password must match
    //this regex checks that there is a lowercase and uppercase
    //letter, and that the
    PASSWORD_REGEX_MUST_MATCH:
        /(?=^.{10,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/gm

}
