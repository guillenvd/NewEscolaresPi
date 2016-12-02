$(document).ready(function() {

            //$("#yesFolio").hide();
            $("#noFolio").hide();

$('form').submit(function(e){
		e.preventDefault();
	var FOLIO  =  document.getElementById('alFolio').value;

	$.ajax({
		type: 'POST',
		url: 'php/getInfoBasicAlumno.php',
		data: {'folio': FOLIO},
		success: function(respuesta){
			console.log(respuesta);
			if(respuesta.length > 0){

				var jsonResponse  = jQuery.parseJSON(respuesta);
				console.log(jsonResponse);
				console.log(jsonResponse[0].Ficha);
				$(".msjFolio").html(jsonResponse[0].Ficha);

			}
			else{
				console.log("Error");
			}
		}
	})
})



});