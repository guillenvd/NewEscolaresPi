$(document).ready(function() {

hideElements();
	
	$(".rFolio").click(function(event){
	    var valor = $(event.target).val();
	    if(valor =="yes"){
	    	console.log('Opcion Tengo Folio.');
			$('#folioTrue').show();
			$('#folioFalse').hide();

				$('form.formInfoBasica').submit(function(e){
					e.preventDefault();
					var FOLIO  =  document.getElementById('alFolio').value;
					if (FOLIO > 0) {
						$.ajax({
							type: 'POST',
							url: 'php/getInfoBasicAlumno.php',
							data: {'folio': FOLIO},

							success: function(respuesta){
								console.log(respuesta);
								var jsonResponse  = jQuery.parseJSON(respuesta);
								console.log(jsonResponse);
								if(respuesta.length > 18 ){
									console.log('Json successfully');	

									var jsonResponse  = jQuery.parseJSON(respuesta);
									console.log(jsonResponse.infobasica.Folio);
									$('#alertFolio').show().html(getAlert('Correcto, Folio encontrado', 'success', 1));
									$("#infoBasica").fadeIn("slow");
									/*MOSTRANDO DATOS DEL ALUMNO*/
									setInfoBasica(jsonResponse.infobasica);
									$( "#sig" ).show().prop( "disabled", false );
									 $("#alertFolio").fadeOut(5000);						
								}
								else{
									console.log("Error");
									$('#alertFolio').show().html(getAlert('Folio No Encontrado', 'danger', 1)).fadeOut(5000);
									$('#infoBasica').hide();
									clearElements();
								}
							}
						}) //ajax end
					} //end if Folio is empty
					else{
						$('#alertFolio').show().html(getAlert('Introducir folio.', 'danger', 1)).fadeOut(5000);
						$('#searchFolio').addClass("has-error");
					}
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

hideElements =  function(){
	/* Hide elements */
	$('#folioTrue').hide();
	$('#folioFalse').hide();
	$('#alertFolio').hide();
	$('#infoBasica').hide();
	$( "#sig" ).hide().prop( "disabled", true );
};

clearElements = function(){
	$('#alFolio').val('');
}

setInfoBasica = function(infobasica){
	$('#al_folio').html(infobasica.Folio);
	$('#al_nombre').html(infobasica.Nombre);
	$('#al_carrera').html(infobasica.Carrera);
	$('#al_fechasol').html(infobasica.Fecha);
};