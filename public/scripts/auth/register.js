$(function( ) {
	$("#username").on("blur", ( ) => {
		//when the user leaves the username input box, this event listener will
		//fire, and it will check if the username is available or not

		if (!$("#username").val( ))
			//if the user hasn't entered anything, then we shouldn't try and see
			//if it is available
			return;

		$.ajax({
			type: "POST",
			url: "/api/frontend/checkusername",
			data: {
				"username": $("#username").val( )
			},
			dataType: "json",
			success: (result) => {
				console.log(result);
				if (result.taken)
					console.log("taken");
				else
					console.log("Not taken");
			}
		});
	});

});
