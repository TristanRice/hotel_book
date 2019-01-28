const constants = require("../constants/constants");

make_length_error_message = (min, max, item) => {
    return `Your ${item} must be between ${min} and ${max} characters long`;
}

module.exports = {
    VALID_EMAIL_MESSAGE:
        "You must enter a valid email",

    USERNAME_LENGTH_ERROR_MESSAGE:
        make_length_error_message(
            constants.USERNAME_MIN_LENGTH,
            constants.USERNAME_MAX_LENGTH,
            "username"
        ),

    PASSWORD_LENGTH_ERROR_MESSAGE:
        make_length_error_message(
            constants.PASSWORD_MIN_LENGTH,
            constants.PASSWORD_MAX_LENGTH,
            "password"
        ),

    PASSWORDS_NOT_MATCH_MESSAGE:
        "The passwords that you entered do not match",

    PASSWORD_MESSAGE_MATCH_REGEX:
        "Your password must contain at least 10 letters, one number, and one lowercase and capital letter",

    USERNAME_ALREADY_EXISTS:
        "That username already exists",

    EMAIL_ALREADY_EXISTS:
        "That email already exists"
}
