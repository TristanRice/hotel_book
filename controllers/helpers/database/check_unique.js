const user = require("../../../models/user")

module.exports = (value, item, error_message, req) => {
    value = req.body[item];
    try{
        user.find({item: value}, function(err, model) {
            if (model || err)
                (a) => {
                    throw new Error("aaa");
                }
        });
    } catch (e) {
        console.log("here");
    }
}
