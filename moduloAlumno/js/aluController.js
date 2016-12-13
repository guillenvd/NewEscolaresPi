$(document).ready(function() {

hideElements();

//Primera Fase  Buscar Folio:
$(".rFicha").click(function(event){
	   getInfoBasicaAlumno();
	});

});// Document ready

function getAlert (message, type = 'info', centerText = 0){
      return  '<div class="alert alert-'+type+' '+ (parseInt(centerText)?'text-center':'')+'">'
                +message
              +'</div>';
};

getInfoBasicaAlumno = function(){
	 var valor = $(event.target).val();
	    if(valor =="yes"){
	    	console.log('Opcion Tengo Folio.');
			$('#fichaTrue').show();
			$('form.formInfoBasica').submit(function(e){
				e.preventDefault();
				var FOLIO  =  document.getElementById('alFicha').value;
				if (FOLIO > 0) {
					$.ajax({
						type: 'POST',
						url: 'php/getInfoBasicAlumno.php',
						data: {'folio': FOLIO},
						success: function(respuesta){
							console.log(respuesta.length); 
							if(respuesta.length > 1 ){
								var jsonResponse  = jQuery.parseJSON(respuesta);
								console.log(jsonResponse);	
								setInfoBasica(jsonResponse.infobasica);
								$('#alertFicha').show().html(getAlert('Correcto, Folio encontrado', 'success', 1));
								$("#infoBasica").fadeIn("slow");
								$('#sig').show().prop( "disabled", false );				
							}
							else{
								console.log("Error");
								$('#alertFicha').show().html(getAlert('Folio No Encontrado', 'danger', 1));
								$('#infoBasica').hide();
								$('#sig').hide().prop( "disabled", false );
							}
						}
					}) //ajax end
				} //end if Folio is empty
				else{
					$('#alertFicha').show().html(getAlert('Introducir folio.', 'danger', 1));
					$('#searchFicha').addClass("has-error");
					$('#sig').hide().prop( "disabled", false );
				}
			});
	    }
};

setInfoBasica = function(infobasica){
	// as = aspirante
	$('#al_ficha').html(infobasica.asFicha);
	$('#al_nombre').html(infobasica.asNombre);
	$('#al_carrera').html(infobasica.asCarrera);
	$('#al_fechasol').html(infobasica.asId);
};

hideElements =  function(){
	/* Hide elements */
	$('#fichaTrue').hide();
	$('#alertFicha').hide();
	$('#infoBasica').hide();
	$('#sig').hide().prop( "disabled", true );
};

clearElements = function(){
	$('#alFicha').val('');
}

