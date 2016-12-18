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
				var FOLIO  =  $.trim(document.getElementById('alFicha').value);
				if (FOLIO > 0) {
					$.ajax({
						type: 'POST',
						url: 'php/getInfoBasicAlumno.php',
						data: {'folio': FOLIO},
						success: function(respuesta){
							if(respuesta.length > 1 ){
								var jsonResponse  = jQuery.parseJSON(respuesta);
								setInfoBasica(jsonResponse.infobasica);
								$('#alertFicha').show().html(getAlert('Correcto, Folio encontrado', 'success', 1));
								$("#infoBasica").fadeIn("slow");
								$('#sig').show().prop( "disabled", false );


								/*Start with the Step 2 - Revision de Documentos*/
								$('#sig').click(function(event){
										$('#sig').hide();
										$('#infBasic').bind('click', false);
										$('#docsReq').unbind('click', false);

										$('.iniciar_rev').click(function(event){
											$('#avisoDocs').slideUp(2000);
											checkDocsRequeridos(jsonResponse.infobasica);
										});										
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

};

checkDocsRequeridos = function(infobasica){
	console.log('checkDocsRequeridos');
	$('#checkDocs').delay(2000).slideDown(2000);
	$('#btnDocumentos').removeClass('iniciar_rev').addClass('terminar_rev').empty().html('Confirmar Documentos').attr("disabled", true);
	var countChecks = 0;
	var asEstado = 1;
	$(':checkbox').click(function(){
   			countChecks ++;
		if ($('#cb18').prop('checked') && $('#cb19').prop('checked') && $('#cb20').prop('checked') && $('#cb21').prop('checked')){
			console.log('Documentos Completados.');
			console.log(infobasica.asNombre);
			$('#btnDocumentos').attr( "disabled", false);
		}else{
			$('#btnDocumentos').attr("disabled", true);
		}
	});
	console.log(asEstado);
	$('#btnDocumentos').click(function(event){
		asEstado = 2;
		console.log(asEstado);
		confirmDocsRequeridos(infobasica,asEstado);
	});
}

confirmDocsRequeridos = function(infobasica, asEstado){
	console.log('confirmDocsRequeridos');
	var currentFicha = {
			"ficha"  : infobasica.asFicha,
			"estado" : asEstado
	};
	$.ajax({
           type:'POST',
           url: 'php/changeStatus.php',
           data: currentFicha,
           beforeSend: function(){
               alert('Estamos procesando tu informacion. Documentos guardados. Generando Turno....');
           },
           success: function(respuesta){
				/*$.ajax({
				type:'POST',
				url: 'php/showEstado.php',
				data: currentFicha,
				beforeSend: function(){
				console.log('Buscando Estado');
				},
				success: function(respuesta){
				var jsonResponse  = jQuery.parseJSON(respuesta);
				console.log(jsonResponse);
				alert('Correcto.... Tu estado es:');
				alert(jsonResponse.Estado.asEstado);
				}
				});

*/
           }
       });
}

function outIndicaciones(){
	console.log('outIndicaciones');
	$("#indicaciones").fadeOut(1500);
	$("#fichaTrue").show(1000);
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
	/* Hide elements */
	$('#fichaTrue').hide();
	$('#alFicha').hide();
	$('#alertFicha').hide();
	$('#infoBasica').hide();
	$('#checkDocs').hide();
	$('#sig').hide();
	$('#sig').attr("disabled", true);
	$('#atras').hide().attr("disabled", true);
	//$('#docsReq').bind('click', false);
	///$('#miTurno').bind('click', false);
	//$('#infBasic').bind('click', false);

};

clearElements = function(){
	$('#alFicha').val('');
}

