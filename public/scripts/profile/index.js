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
                <label for="hotel_room_group_price">Group price</label>
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

    $("#submit_1").click(function( ) {
        $("#add_hotel_1").fadeOut(function( ) {
            $("#add_hotel_2").fadeIn( );
        });
    });

    $("#submit_2").click(function( ) {
        $("#add_hotel_2").fadeOut(function( ){
            $("#add_hotel_3").fadeIn( );
        })
    })
});
