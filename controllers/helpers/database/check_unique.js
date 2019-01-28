module.exports = (value, item, error_message) => {
    value = req.body[item];
    user.findOne({item: value}, function(err, model) {
        if (model || err)
            throw new Error(constants.USERNAME_ALREADY_EXISTS);
    });
}
