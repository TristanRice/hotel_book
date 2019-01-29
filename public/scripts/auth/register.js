$(function( ) {
	$("#username").tooltip({"trigger":"hover", "title": "Your username must be between 3 and 20 characters"});
	$("#enail").tooltip({"trigger": "hover", "title": "You must enter a valid email"});
	$("#password1").tooltip({"trigger": "hover", 
			"title":"Your password must contain at least 10 letters, one number, and one lowercase and capital letter"})

	$("#username").on("blur", ( ) => {
		if (!$("#username").val( ))
			return;

		$.ajax({
			type: "POST",
			url: "/api/frontend/checkusername",
			data: JSON.stringify($("#username").val( )),
			dataType: "json",
			success: (result) => {
				result = JSON.parse(result);
				if (result.taken)	
					console.log("taken");
				else
					console.log("Not taken");
			}
		})
	})
});