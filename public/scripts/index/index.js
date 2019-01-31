$(function( ) {
	$(document).ready(function( ) {
		$(".dropdown-trigger").dropdown( );
	});

	$("#main_nav").hover(function( ) {
		//here we should fade in the text

	});

	//make sure that daterangepicker is activated
	$("#datepicker").daterangepicker( );
	$("#datepicker").val("");
	$("#datepicker").attr("placeholder", "Choose your date");


});
