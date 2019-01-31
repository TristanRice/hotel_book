const mongoose        = require("mongoose")
    , default_json    = require("./helpers/defaults/metadata")
    , uniqueValidator = require("mongoose-unique-validator")
    , User            = require("./user")
    , Schema = mongoose.Schema;

const HotelSchema = new Schema({

    location: {

        city: {
            type: String,
            unique: false,
            required: true
        },

        postCode: {
            type: String,
            unique: false,
            required: true,
        },

        address: {
            type: String,
            required: true,
            unique: false
        }
    },

    image: {
        type: String, //path to the image
        required: false,
        unique: true, //I don't want to have duplicate image names
        extension: String
    },

    /*
    The user can choose to join as either a normal user a hotel owner
    */
    user: [User.schema],

    description: {
        type: String,
        required: false, //they shouldn't have to put a description in if they don't want to
        unique: false
    },

    rating: {
        average_star_rating: {
            type: Integer,
            default: 0;
            unique: false
        },

        /*
        For this to work I will not save each rating and the calculate the average
        after the fact, but I will save the average rating, and the amount of ratings
        that there have been. The, I will first do the number of ratings * the
        avereage rating, then i will add the current user's rating to that number,
        and then divide it by the total number + 1 for the user that just rated it.

        Example:
        where ar = average rating, nr = number of raters, nr = the new rating,
        and cr = the current user's rating

        nr = ((ar*nr)+cr)/nr+1
        */

        number_of_raters: {
            type: Integer,
            default: 0,
            unique: false
        }
    },

    metadata: default_json;
});

HotelSchema.methods.newstarrating = function(current_rating) {
    new_average_rating = ((rating.average_star_rating*rating.number_of_raters)+
                           current_rating)/rating.number_of_raters+1;
    this.rating.average_star_rating = new_average_rating;
    this.rating.number_of_raters++;
}

HotelSchema.pre("save", function(next) {
    let current_date = new Date( );
    this.metadata.updated_at = current_date;

    if (!this.metadata.created_at)
        this.created_at = current_date;

    next( );
})
