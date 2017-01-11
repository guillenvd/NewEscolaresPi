$(document).ready(function() {

hideElements();
getListaDoc();

//Primera Fase  Buscar Folio:
$(".entendido").click(function(event){
		outIndicaciones();
		getInfoBasicaAlumno();
	});

/*
$('.iniciar_rev').click(function(event){
	$('#avisoDocs').slideUp(2000);
	checkDocsRequeridos(getListaDoc());
});		
*/
});// Document ready

function getAlert (message, type = 'info', centerText = 0){
      return  '<div class="alert alert-'+type+' '+ (parseInt(centerText)?'text-center':'')+'">'
                +message
              +'</div>';
};

getInfoBasicaAlumno = function(){
	console.log('getInfoBasicaAlumno');
	// var valor = $(event.target).val();
			$('#alFicha').show();
};

$('form.formInfoBasica').submit(function(e){
				e.preventDefault();
				//$('#btnFicha').prop('disabled', true);
				var FOLIO  =  $.trim(document.getElementById('alFicha').value);
				if (FOLIO > 0) {
					$.ajax({
						type: 'POST',
						url: 'php/getInfoBasicAlumno.php',
						data: {'folio': FOLIO},
						success: function(respuesta){
							if(respuesta.length > 1 ){
								jsonResponse  = jQuery.parseJSON(respuesta);
								setInfoBasica(jsonResponse.infobasica);
								$('#alertFicha').show().html(getAlert('Correcto, Ficha encontrada', 'success', 1));
								$("#infoBasica").fadeIn("slow");
								$('#sig').show().prop( "disabled", false );
								/*Start with the Step 2 - Revision de Documentos*/
								
							}
							else{
								console.log("#Ficha Failed");
								$('#alertFicha').show().html(getAlert('# Ficha no encontrada', 'danger', 1));
								$('#infoBasica').hide();
								$('#sig').hide().prop( "disabled", false );
							}
						}
					}) //ajax end
				} //end if Ficha is empty
				else{
					$('#alertFicha').show().html(getAlert('Introducir Ficha.', 'danger', 1));
					$('#searchFicha').addClass("has-error");
					$('#sig').hide().prop( "disabled", false );
				}
			});

$('#sig').click(function(event){
	console.log(jsonResponse)
		$('#sig').hide();
		$('#infBasic').bind('click', false);
		$('#docsReq').unbind('click', false);					
});

$('.iniciar_rev').click(function(event){
	$('#avisoDocs').slideUp("slow");
	$('.iniciar_rev').hide();
	$('#sig').hide();
	checkDocsRequeridos(jsonResponse.infobasica);
});	

checkDocsRequeridos = function(infobasica){
	console.log('checkDocsRequeridos');
	$('#checkDocs').delay(1000).slideDown("slow");
	$('#btnDocumentos').removeClass('iniciar_rev').addClass('terminar_rev').empty().html('Confirmar Documentos').attr("disabled", true).show();
	var countChecks = 0;
	var asEstado = 1;
	$(':checkbox').click(function(){
   			countChecks ++;
		if ($('#cb18').prop('checked') && $('#cb19').prop('checked') && $('#cb20').prop('checked') && $('#cb21').prop('checked')){
			console.log(infobasica.asNombre+'-Documentos Completados.');
			$('#btnDocumentos').attr( "disabled", false);
		}else{
			$('#btnDocumentos').attr("disabled", true);
		}
	});
	$('#btnDocumentos').click(function(event){
		asEstado = 2;
		confirmDocsRequeridos(infobasica,asEstado);
	});
}

confirmDocsRequeridos = function(infobasica, asEstado){
	console.log('confirmDocsRequeridos');
	var currentFicha = {
			"ficha"  : infobasica.asFicha,
			"carrera": infobasica.asCarrera,
			"id"	 : infobasica.asId,
			"nombre" : infobasica.asNombre,
			"estado" : asEstado
	};
	$.ajax({
           type:'POST',
           url: 'php/changeStatus.php',
           data: currentFicha,
           beforeSend: function(){
				$('.waitChange').show();
				$('.newStatus').hide();
				$('#showStatus').modal('show');
           },
           success: function(respuesta){
           		var jsonResponse  = jQuery.parseJSON(respuesta);
				console.log(jsonResponse);
				$('.waitChange').hide();
				$('.newStatus').show().html('Tu Estado es: '+jsonResponse.Estado.asEstado.toString());
				$('#showStatus').delay(3000).modal('hide');
				$('.nombreTurno').html(jsonResponse.Estado.asNombre +' tu turno es:');
           }
       });
	generarTurno(currentFicha);
}

generarTurno = function(currentFicha){
console.log('generarTurno');
$.ajax({
           type:'POST',
           url: 'php/generarTurno.php',
           data: currentFicha,
           beforeSend: function(){

           },
           success: function(respuesta){
           		var jsonResponse  = jQuery.parseJSON(respuesta);
				console.log(jsonResponse);
				$('#miTurno').unbind('click', false).click();
				$('#tuTurno').empty().html(jsonResponse.turno);
				$('#finalizar').hide();
				$('#docsReq').bind('click', false);
           }
       });
}


function outIndicaciones(){
	console.log('outIndicaciones');
	$("#indicaciones").fadeOut(1500);
	$("#fichaTrue").delay(1500).fadeIn('slow');
}

getListaDoc = function () {
	console.log('getListaDoc');
	var jsonResponse;
					$.ajax({
						type: 'GET',
						url: 'php/getDocRequeridos.php',
						success: function(respuesta){
							if(respuesta.length > 1 ){
								jsonResponse  = jQuery.parseJSON(respuesta);
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
					return jsonResponse;
}

setInfoBasica = function(infobasica){
	console.log('setInfoBasica');
	// as = aspirante
	$('#al_ficha').html(infobasica.asFicha);
	$('#al_nombre').html(infobasica.asNombre);
	$('#al_carrera').html(infobasica.asCarrera);
	$('#al_fechasol').html(infobasica.asId);
};

hideElements =  function(){
	console.log('hideElements');
	/* Hide elements */
	$('#fichaTrue').hide();
	$('#alFicha').hide();
	$('#alertFicha').hide();
	$('#infoBasica').hide();
	$('#checkDocs').hide();
	$('#sig').hide();
	$('#sig').attr("disabled", true);
	$('#atras').hide().attr("disabled", true);
	$('#finalizar').hide();

	$('#docsReq').bind('click', false);
	$('#miTurno').bind('click', false);
	$('#infBasic').bind('click', false);

};

clearElements = function(){
	console.log('clearElements');
	$('#alFicha').val('');
	$('#al_ficha').html('');
	$('#al_nombre').html('');
	$('#al_carrera').html('');
	$('#al_fechasol').html('');
}

