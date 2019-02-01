$(function( ) {
	$(document).ready(function( ) {
		$(".dropdown-trigger").dropdown( );
	});

	reset_datepicker = ( ) => {
		$("#datepicker").val("");
		$("#datepicker").attr("placeholder", "Choose your date");
	}

	$("#main_nav").hover(function( ) {
		//here we should fade in the text

	});

	//make sure that daterangepicker is activated
	new Lightpick({
		field: document.getElementById("datepicker"),
		singleDate: false,

		onselect: function(date) {
			document.getElementById('result-1').innerHTML = date.format('Do MMMM YYYY');
		}
	});

	$("#submit_button").click(function( ) {
		console.log("aaaa");
	})
});
