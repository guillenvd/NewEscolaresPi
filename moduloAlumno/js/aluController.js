$(document).ready(function() {

hideElements();
getListaDoc();
//Primera Fase  Buscar Folio:
$(".entendido").click(function(event){
		outIndicaciones();
		getInfoBasicaAlumno();
	});

$('.iniciar_rev').click(function(event){
		sendDocumentosRequeridos();
	});

});// Document ready




function getAlert (message, type = 'info', centerText = 0){
      return  '<div class="alert alert-'+type+' '+ (parseInt(centerText)?'text-center':'')+'">'
                +message
              +'</div>';
};

getInfoBasicaAlumno = function(){
	 var valor = $(event.target).val();
	    	console.log('Opcion Tengo Folio.');
			$('#fichaTrue').fadeIn(2000);
			$('form.formInfoBasica').submit(function(e){
				e.preventDefault();
				var FOLIO  =  $.trim(document.getElementById('alFicha').value);
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

								$('#sig').click(function(event){
										$('#sig').hide();
										$('#infBasic').bind('click', false);
										$('#docsReq').unbind('click', false);
									});
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
	$('#sig').hide().attr("disabled", true);


};

getListaDoc = function () {
					$.ajax({
						type: 'GET',
						url: 'php/getDocRequeridos.php',
						success: function(respuesta){
							console.log(respuesta.length); 
							if(respuesta.length > 1 ){
								var jsonResponse  = jQuery.parseJSON(respuesta);
								console.log(jsonResponse);	
					$('#documentos #doc0').html(jsonResponse.Documento[0].Documento);
                    $('#documentos #doc1').html(jsonResponse.Documento[1].Documento);
                    $('#documentos #doc2').html(jsonResponse.Documento[2].Documento);
                    $('#documentos #doc3').html(jsonResponse.Documento[3].Documento);			
							}
							else{
								console.log("Error");
							}
						}
					}) //ajax end
}


sendDocumentosRequeridos = function(){
	$('#docs').show("slow");
	$('.iniciar_rev').attr("disabled", true);
	var docsChecks = 0;
	var value;
	$('#terminar_rev').click(function(event){
		$("input:checkbox:checked").each(function(){
			value = $(this).is( '1' ) ? 1 : 1;
			docsChecks = docsChecks + value;
			console.log(docsChecks);
		});
		if (docsChecks == 4){
			console.log(infobasica.asNombre);
			console.log('Documentos Completados.');
		}

		docsChecks = 0;
		value = 0;
	});
}

function outIndicaciones(){
	$("#indicaciones").fadeOut(1500);
}

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
	$('#docs').hide();
	$('#sig').hide().attr("disabled", true);
	//$('#docsReq').bind('click', false);
	///$('#miTurno').bind('click', false);
	//$('#infBasic').bind('click', false);

};

clearElements = function(){
	$('#alFicha').val('');
}

