/*
Loading: fa fa-refresh fa-spin input-icon loading
Cross: fa fa-times input-icon reject
tick: fa fa-check input-icon tick
*/
//ToDo: refactor

$(function( ) {
	check_available = (item, value, callback) => {
		$.ajax({
			type: "POST",
			url: "/api/frontend/checkAvailable",
			data: {
				"value": value, "item": item, "model": "user"
			},
			dataType: "json",
			success: (result) => {
				console.log("here");
				callback(result);
			},

			failure: ( ) => {
				console.log("failure");
			}
		});
	}

	$("#username").on("input", ( ) => {
		$("#username_icon").removeClass( );
	})

	$("#username").on("blur", ( ) => {
		//when the user leaves the username input box, this event listener will
		//fire, and it will check if the username is available or not
		$("#username_icon").removeClass( );
		value = $("#username").val( );
		if (!value)

			//if the user hasn't entered anything, then we shouldn't try and see
			//if it is available
			return;

		$("#username_icon").addClass("fa fa-refresh fa-spin input-icon loading");
		check_available("username", value, (result) => {
			$("#username_icon").removeClass( );
			if (result.taken) {
				$("#username_icon").addClass("fa fa-times input-icon reject");
				$("#username_icon").tooltip({
					"trigger":"hover",
					"title": "that username is already taken"
				});
			}
			else {
				$("#username_icon").tooltip("disable");
				$("#username_icon").addClass("fa fa-check input-icon tick");
			}
		});
	});

	$("#email").on("blur", ( ) => {
		$("#email_icon").removeClass( );

		value = $("#email").val( );
		if (!value)
			return;

		//we should also not send the request if the email is not valid
		var re = /\S+@\S+\.\S+/;
		if (!re.test(value))
			return;

		check_available("email", value, (result) => {
			if (result.taken) {
				$("#email_icon").addClass("fa fa-times input-icon reject");
				$("#email_icon").tooltip({
					"trigger": "hover",
					"title": "That email is already taken"
				});
			}
			else {
				$("#email_icon").tooltip("disable");
				$("#email_icon").addClass("fa fa-check input-icon tick");
			}
		});
	});

	$("#emai").on("input", ( ) => {
		$("#email_icon").removeClass( );
	});

	$("#password2").on("input", ( ) => {
		//regex for password requirement
		$("#password2_icon").removeClass( );
		let REGEX = /(?=^.{10,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/gm;
		let password = $("#password2").val( );

		if (!password)
			//if the user clears the password box,
			return;

		if (password && !REGEX.exec(password)) {
			return;
		}
		$("#password2_icon").addClass("fa fa-check input-icon tick");
	});

	$("#password1").add("#password2").on("input", ( ) => {
		$("#password1_icon").removeClass( );
		const password1 = $("#password1").val( );
		const password2 = $("#password2").val( );

		if (!password1 || !password2)
			return;

		if (password1!==password2) {
			$("#password1_icon").addClass("fa fa-times input-icon reject");
			return;
		}
		$("#password1_icon").addClass("fa fa-check input-icon tick");
	});
});
