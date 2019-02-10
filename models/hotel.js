const mongoose        = require("mongoose")
    , default_json    = require("./helpers/defaults/metadata")
    , uniqueValidator = require("mongoose-unique-validator")
    , User            = require("./user")
    , Schema          = mongoose.Schema;

const HotelSchema = new Schema({

    location: {
        country: {
            type: String,
            required: false,
            unique: false
        },

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

    images: [
        {
            type: String, //path to the image
            required: false,
            unique: false, //I don't want to have duplicate image names
            extension: String
        }
    ],

    /*
    The user can choose to join as either a normal user a hotel owner
    */
    user: [User.schema],

    description: {
        type: String,
        required: false, //they shouldn't have to put a description in if they don't want to
        unique: false
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    rating: {
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
        average_star_rating: {
            type: Number,
            default: 0,
            unique: false
        },

        number_of_raters: {
            type: Number,
            default: 0,
            unique: false
        }
    },

    reviews: [
        {
            title: String,
            content: String,
        }
    ],

    rooms: [
        {
            size: {
                type: Number,
                default: 2
            },

            price: {
                type: Number,
                required: true,
            },

            /*
            Booked and taken are both different.
            */
            booked: {
                is_booked: {
                    type: Boolean,
                    default: false
                },

                booked_from: {
                    type: Date,
                },

                booked_to: {
                    type: Date
                }
            },

            taken: {
                type: Boolean,
                default: false
            }
        }
    ],

    extra_information: {
        //this will just contian things like the phone number or website
        /*
        I won't make these unique in case a hotel owner forgot the details to
        their previous account and wants to make a new one
        */
        phone_number: {
            type: String, // lmao
            required: true,
        },

        address: {
            type: String,
            required: true
        },

        website: {
            type: String,
            required: false,
        }
    },

    metadata: default_json
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
