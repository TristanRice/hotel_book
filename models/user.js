const mongoose     = require("mongoose")
    , default_json = require("./helpers/defaults/metadata")
    , uniqueValidator = require("mongoose-unique-validator")
    , Schema       = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    admin: {
        type: Boolean,
        required: false,
        default: false
    },

    metadata: default_json
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", function(next) {
    let current_date = new Date( );
    this.metadata.updated_at = current_date;

    if (!this.metadata.created_at)
        this.created_at = current_date;

    next( );
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
