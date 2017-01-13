/*
@Author:
	Proyecto: EscolaresPi
	David Guillen
	Ivan Gastelum
*/

$(document).ready(function() {

hideElements();
getListaDoc();

$(".entendido").click(function(event){
		outIndicaciones();
		getInfoBasicaAlumno();
	});
});// Document ready

function getAlert (message, type = 'info', centerText = 0){
      return  '<div class="alert alert-'+type+' '+ (parseInt(centerText)?'text-center':'')+'">'
                +message
              +'</div>';
};

getInfoBasicaAlumno = function(){
	console.info('getInfoBasicaAlumno');
	$('#alFicha').show();
};

$('form.formInfoBasica').submit(function(e){
				e.preventDefault();
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
								$('#alertFicha').show().html(getAlert('Ficha Encontrada', 'info', 1));
								$("#infoBasica").fadeIn("slow");
								$('#alertFicha').delay(2500).fadeOut("slow");
								$('#sig').show().prop( "disabled", false );
							}
							else{
								console.log("#Ficha Failed");
								$('#alertFicha').show().html(getAlert('# Ficha No Encontrada', 'danger', 1));
								$('#infoBasica').slideUp("slow");
								$('#sig').hide().prop( "disabled", true);
								$('#alertFicha').delay(2500).fadeOut("slow");
							}
						}
					}) //ajax end
				} //end if Ficha is empty
				else{
					$('#alertFicha').show().html(getAlert('Debe Introducir Ficha Valida.', 'danger', 1));
					$('#infoBasica').slideUp("slow");
					$('#searchFicha').addClass("has-error");
					$('#sig').hide().prop( "disabled", false );
					$('#alertFicha').delay(2500).fadeOut("slow");

				}
			});

$('#sig').click(function(event){
	console.log(jsonResponse)
		$('#infBasic').bind('click', false);
		$('#docsReq').unbind('click', true).click();
		$('#sig').hide().prop( "disabled", true);

});

$('.iniciar_rev').click(function(event){
	$('#avisoDocs').slideUp("slow");
	$('.iniciar_rev').hide();
	$('#sig').hide();
	checkDocsRequeridos();
});	

checkDocsRequeridos = function(){
	ALLCHECK = false;
	console.info('checkDocsRequeridos');
	$('#checkDocs').delay(1000).slideDown("slow");
	$('.iniciar_rev').hide();
	$('#btnDocumentos').attr("disabled", true).bind('click', false).show();
	$(':checkbox').click(function(){
	ALLCHECK = $('#cb18').prop('checked') && $('#cb19').prop('checked') && $('#cb20').prop('checked') && $('#cb21').prop('checked');
		if (ALLCHECK){
			$('#btnDocumentos').attr("disabled", false).unbind('click', false);
		}else{
			$('#btnDocumentos').attr("disabled", true).bind('click', false);
		}
	});
}

$('#btnDocumentos').click(function(event){
	if (ALLCHECK){
		console.info(jsonResponse.infobasica.asFicha+': Documentos Completados.');
		confirmDocsRequeridos(jsonResponse.infobasica);
	}
});

confirmDocsRequeridos = function(infobasica){
	console.info('confirmDocsRequeridos');
	asEstado = 2
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
           		aspirantes  = jQuery.parseJSON(respuesta);
				console.log(aspirantes);
				$('.waitChange').hide();
				$('#showStatus').delay(10000).modal('hide');
				$('.nombreTurno').html(aspirantes.asNombre +' tu turno es:');
				$('#miTurno').unbind('click', false).click();
				$('#tuTurno').empty().html(aspirantes.asTurno);
				$('#finalizar').hide();
				$('#docsReq').bind('click', false);
				enviarInfoAlumnos(aspirantes);
           }
       });
}

enviarInfoAlumnos = function (aspirantes) {
	console.info('enviarInfoAlumnos');
	$.ajax({
		type: 'GET',
		url: 'php/generarTurno.php',
		data: aspirantes,
		success: function(respuesta){
			if(respuesta.length > 1 ){
				jsonResponse  = jQuery.parseJSON(respuesta);
				console.log(jsonResponse);
			}
			else{
				console.info("Oops! Error...");
			}
		}
	}) //ajax end
	return jsonResponse;
}

function outIndicaciones(){
	console.info('outIndicaciones');
	$("#indicaciones").fadeOut(600);
	$("#fichaTrue").delay(600).fadeIn('slow');
}

getListaDoc = function () {
	console.info('getListaDoc');
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
				console.info("Error");
			}
		}
	}) //ajax end
	return jsonResponse;
}

setInfoBasica = function(infobasica){
	console.info('setInfoBasica');
	$('#al_ficha').html(infobasica.asFicha);
	$('#al_nombre').html(infobasica.asNombre);
	$('#al_carrera').html(infobasica.asCarrera);
	$('#al_fechasol').html(infobasica.asId);
};

hideElements =  function(){
	console.info('hideElements');
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
	$('#btnDocumentos').hide();
};

clearElements = function(){
	console.info('clearElements');
	$('#alFicha').val('');
	$('#al_ficha').html('');
	$('#al_nombre').html('');
	$('#al_carrera').html('');
	$('#al_fechasol').html('');
}