$(function( ) {
    let CURRENT_ID=1;
    $("#add_room_group").click(function( ) {
        ++CURRENT_ID;
        $("#room_configure").append(`
            <div class="row" id="room${CURRENT_ID}">
              <div class="col s3">
                <!--group name-->
                <label for="hotel_room_group_name">Group name</label>
                <input class="validate" placeholder="Group name" id="hotel_room_group_name" type="text" required="true"/>
              </div>
              <div class="col s3">
                <!--group size (for each room)-->
                <label for="hotel_room_size">Group size</label>
                <input class="validate" placeholder="Group size" id="hotel_room_size" type="text" required="true"/>
              </div>
              <div class="col s3">
                <!--group price-->
                <label for="hotel_room_group_price">Group price (per room)</label>
                <input class="validate" placeholder="Group price" id="hotel_room_group_price" type="text" required="true"/>
              </div>
              <div class="col s3">
                <a class="waves-effect waves-light btn removebtn" id="remove_room_group${CURRENT_ID}" style="width: 100%;">Remove</a>
              </div>
            </div>
        `);
        //immediately after I make the row div I add an event listener to the
        //remove button so that when they click it it removes the config
        $(`#remove_room_group${CURRENT_ID}`).click(function( ) {
            console.log($(this).parent( ).parent( ).remove( ));
        });
    });


    function showErrorMessage(message, id) {
        console.log(id);
        $(`#${id}`).html(" "+message);
    }

    let Form_1 = {
        input_IDs: {
            "hotel_name": "(Hotel name must be between 2 and 20 characters)",
            "hotel_phone_number": "(Phone number is not valid)",
            "hotel_country": "(This is not a valid country)",
            "hotel_city": "(City name must be between 1 and 100 characters)",
            "hotel_postcode": "(Postcode must be between 1 and 30 characters)",
            "hotel_full_address": "(Address must be between 1 and 500 characters)",
        },

        tooltip_messages: [
            "Hotel name must be between 2 and 20 characters",
            "Phone number must be valid",
            false,
            false,
            false,
            "Your address will be shown on your profile"
        ],

        makeErrorMessage: function(value, min, max, id) {
            console.log(value.length);
            if (!value.length || value.length < min || value.length > max){
                showErrorMessage(Form_1.input_IDs[id], `${id}_error`);
                console.log(id);
            }
        },

        validate: function( ) {
            let valid = true;
            Object.keys(Form_1.input_IDs).forEach(function(input_id) {
                let value = $(`#${input_id}`).val( );
                switch(input_id) {

                    case "hotel_name":
                        Form_1.makeErrorMessage(value, 2, 20, input_id)
                        break;

                    case "hotel_phone_number":
                        let regex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
                        if (!value.match(regex) || !value.length)
                            showErrorMessage(Form_1.input_IDs[input_id], input_id+"_error");
                        break;

                    case "hotel_country":
                        break;

                    case "hotel_city":
                        Form_1.makeErrorMessage(value, 1, 100, input_id);
                        break;

                    case "hotel_postcode":
                        Form_1.makeErrorMessage(value, 1, 30, input_id);
                        break;

                    case "hotel_full_address":
                        Form_1.makeErrorMessage(value, 1, 500, input_id);
                        break;

                    default:
                        valid = false;
                        break;
                }
            });
            return valid;
        }
    };

    function verifyInput(form="") {
        return Form_1.validate( ) || $(".invalid").length;
    }

    $("#submit_1").click(function( ) {
        if (verifyInput( )) return false;
        $("#add_hotel_1").fadeOut(function( ) {
            $("#add_hotel_2").fadeIn( );
        });
    });

    $("#submit_2").click(function( ) {
        if (verifyInput( )) return false;
        $("#add_hotel_2").fadeOut(function( ){
            $("#add_hotel_3").fadeIn( );
        })
    })
});
