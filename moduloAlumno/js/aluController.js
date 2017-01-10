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
	 var valor = $(event.target).val();
			$('#alFicha').delay(1700).fadeIn(2000);
			$('form.formInfoBasica').submit(function(e){
				e.preventDefault();
				$('#btnFicha').prop('disabled', true);
				var FOLIO  =  $.trim(document.getElementById('alFicha').value);
				if (FOLIO > 0) {
					$.ajax({
						type: 'POST',
						url: 'php/getInfoBasicAlumno.php',
						data: {'folio': FOLIO},
						success: function(respuesta){
							if(respuesta.length > 1 ){
								var jsonResponse  = jQuery.parseJSON(respuesta);
								console.log(jsonResponse);
								localStorage.setItem("alumnoData", JSON.stringify(jsonResponse.infobasica));
								setInfoBasica(jsonResponse.infobasica);
								$('#alertFicha').show().html(getAlert('Correcto, Ficha encontrada', 'success', 1));
								$("#infoBasica").fadeIn("slow");
								$('#sig').show().prop( "disabled", false );


								/*Start with the Step 2 - Revision de Documentos*/
								$('#sig').click(function(event){
										$('#sig').hide();
										$('#infBasic').bind('click', false);
										$('#docsReq').unbind('click', false);

										$('.iniciar_rev').click(function(event){
											$('#avisoDocs').slideUp("slow");
											$('.iniciar_rev').hide();
											$('#sig').hide();
											checkDocsRequeridos(jsonResponse.infobasica);
										});										
								});
								//respuesta = '';
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

};

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

function checkList() {
	var returnBoolean = true;
	 $('form.ac-checkbox ol li input').each( function(i, input){
	 	 if( $(input).is(':checked') == false){ returnBoolean = false; return returnBoolean ; }  
	 });
	 return returnBoolean;
}

confirmDocsRequeridos = function(infobasica, asEstado){
	console.log('confirmDocsRequeridos');

	if(checkList()){
		var alumno = jQuery.parseJSON( window.localStorage.getItem('alumnoData') );
		var currentFicha = {
				"ficha"  : alumno.asFicha,
				"asId"  : alumno.asId
		};
		$.ajax({
	           type:'POST',
	           url: 'php/altaAlumno.php',
	           data: currentFicha,
	           beforeSend: function(){
					$('.waitChange').show();
					$('.newStatus').hide();
	           },
	           success: function(respuesta){
	           		var jsonResponse  = jQuery.parseJSON(respuesta);
					$('.waitChange').hide();

					$('#miTurno').unbind('click', false).click();
					$('.miTurnoEs').html(alumno.asNombre+' TU TIEMPO DE ESPERA ES <INS>'+jsonResponse.tiempo+ '</INS>  MINUTOS Y TU TURNO ES:'+jsonResponse.turno);
					$('#turnoNum').html('#'+jsonResponse.turno);

					$('#finalizar').hide();
					$('#docsReq').bind('click', false);
	           }
	       });
	}
}


function outIndicaciones(){
	console.log('outIndicaciones');
	$("#indicaciones").fadeOut(1500);
	$("#fichaTrue").delay(1200).show(1500);
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

