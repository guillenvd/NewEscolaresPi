$(document).ready(function() {
/* Hide elements */-
	$('#folioTrue').hide();
	$('#folioFalse').hide();
	$('#alertFolio').hide();

	$(".rFolio").click(function(event){
	    var valor = $(event.target).val();
	    if(valor =="yes"){
	    	console.log('Opcion Tengo Folio.');
			$('#folioTrue').show();
			$('#folioFalse').hide();

				$('form.formInfoBasica').submit(function(e){
					e.preventDefault();
					var FOLIO  =  document.getElementById('alFolio').value;

					$.ajax({
						type: 'POST',
						url: 'php/getInfoBasicAlumno.php',
						data: {'folio': FOLIO},
						success: function(respuesta){
							console.log(respuesta);
							var jsonResponse  = jQuery.parseJSON(respuesta);

							console.log(jsonResponse);

							if(respuesta.length > 3 ){
								console.log('Json successfully');								
								var jsonResponse  = jQuery.parseJSON(respuesta);
								console.log(jsonResponse[0].Ficha);
								$('#alertFolio').show();
								$("#alertFolio").html(getAlert('Correcto, Folio encontrado: '+jsonResponse[0].Ficha, 'success', 1));

								/*MOSTRANDO DATOS DEL ALUMNO*/

								$('#al_folio').html(jsonResponse[0].Ficha);
								$('#al_nombre').html(jsonResponse[0].Nombre);
								$('#al_carrera').html(jsonResponse[0].Carrera);
							}
							else{
								console.log("Error");
								$('#alertFolio').show();
								$("#alertFolio").html(getAlert('Folio No Encontrado', 'danger', 1));
							}
						}
					})
				});
	    } else if (valor == "no") {
	    	$('#folioFalse').show();
			$('#folioTrue').hide();

	    }
	});
}); // Document ready

 function getAlert (message, type = 'info', centerText = 0){
      return  '<div class="alert alert-'+type+' '+ (parseInt(centerText)?'text-center':'')+'">'
                +message
              +'</div>';
};




