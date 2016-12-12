$(document).ready(function() {

hideElements();

//Primera Fase  Buscar Folio:
$(".rFolio").click(function(event){
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
							console.log(respuesta.length); 
							if(respuesta.length > 1 ){
								var jsonResponse  = jQuery.parseJSON(respuesta);
								console.log(jsonResponse);	
								setInfoBasica(jsonResponse.infobasica);
								$('#alertFolio').show().html(getAlert('Correcto, Folio encontrado', 'success', 1));
								$("#infoBasica").fadeIn("slow");
								$('#sig').show().prop( "disabled", false );				
							}
							else{
								console.log("Error");
								$('#alertFolio').show().html(getAlert('Folio No Encontrado', 'danger', 1));
								$('#infoBasica').hide();
								$('#sig').hide().prop( "disabled", false );
							}
						}
					}) //ajax end
				} //end if Folio is empty
				else{
					$('#alertFolio').show().html(getAlert('Introducir folio.', 'danger', 1));
					$('#searchFolio').addClass("has-error");
					$('#sig').hide().prop( "disabled", false );
				}
			});
	    } else if (valor == "no") {
	    	$('#folioFalse').show();
			$('#folioTrue').hide();
	    }
};

setInfoBasica = function(infobasica){
	$('#al_folio').html(infobasica.Folio);
	$('#al_nombre').html(infobasica.Nombre);
	$('#al_carrera').html(infobasica.Carrera);
	$('#al_fechasol').html(infobasica.Fecha);
};

hideElements =  function(){
	/* Hide elements */
	$('#folioTrue').hide();
	$('#folioFalse').hide();
	$('#alertFolio').hide();
	$('#infoBasica').hide();
	$('#sig').hide().prop( "disabled", true );
};

clearElements = function(){
	$('#alFolio').val('');
}

