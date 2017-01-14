/*
@Author:
	Proyecto: EscolaresPi
	David Guillen
	Ivan Gastelum
*/

$(document).ready(function() {

hideElements();
getListaDoc();

//Primera Fase  Buscar Folio:
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

/*Ir lor la informacion Basica del Alumno*/

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
					localStorage.setItem("alumnoData", JSON.stringify(jsonResponse.infobasica));
					setInfoBasica(jsonResponse.infobasica);
					$('#alertFicha').show().html(getAlert('Ficha Encontrada', 'info', 1));
					$("#infoBasica").fadeIn("slow");
					$('#alertFicha').delay(2500).fadeOut("slow");
					$('.pull-right').show().prop( "disabled", false );
				}
				else{
					console.log("#Ficha Failed");
					$('#alertFicha').show().html(getAlert('# Ficha No Encontrada', 'danger', 1));
					$('#infoBasica').slideUp("slow");
					$('.pull-right').hide().prop( "disabled", true);
					$('#alertFicha').delay(2500).fadeOut("slow");
				}
			}
		}) //ajax end
	} //end if Ficha is empty
	else{
		$('#alertFicha').show().html(getAlert('Debe Introducir Ficha Valida.', 'danger', 1));
		$('#infoBasica').slideUp("slow");
		$('#searchFicha').addClass("has-error");
		$('.pull-right').hide().prop( "disabled", false );
		$('#alertFicha').delay(2500).fadeOut("slow");

	}
});

$('#sig').click(function(event){
		$('.pull-right').slideUp()
		$('#infBasic').bind('click', false);
		$('#docsReq').unbind('click', true).click();
		

});

$('.iniciar_rev').click(function(event){
	$('#avisoDocs').slideUp("slow");
	$('.iniciar_rev').hide();
	$('.pull-right').hide();
	checkDocsRequeridos();
});	

/*Fin getInfoBasica*/

checkDocsRequeridos = function(){
	$('#checkDocs').delay(700).slideDown("slow");
	$('#btnDocumentos').removeClass('iniciar_rev').addClass('terminar_rev').empty().html('Confirmar Documentos');
	$('#btnDocumentos').bind('click', false).attr("disabled", true).show();
	$(':checkbox').click(function(){
		if ($('#cb18').prop('checked') && $('#cb19').prop('checked') && $('#cb20').prop('checked') && $('#cb21').prop('checked')){
			$('#btnDocumentos').attr( "disabled", false).unbind('click', true);
		}else{
			$('#btnDocumentos').bind('click', false).attr("disabled", true);
		}
	});
}

$('#btnDocumentos').click(function(event){
	confirmDocsRequeridos(jsonResponse.infobasica);
});

function checkList() {
	var returnBoolean = true;
	 $('form.ac-checkbox ol li input').each( function(i, input){
	 	 if( $(input).is(':checked') == false){ returnBoolean = false; return returnBoolean ; }  
	 });
	 return returnBoolean;
}

confirmDocsRequeridos = function(infobasica){
	console.info('confirmDocsRequeridos');
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
					$('.miTurnoEs').html(alumno.asNombre+'<br>Tu tiempo de espera es: <ins style="color: #00bcd4; font-size: 1.5em;">'+jsonResponse.tiempo+ '</INS>  minutos. <br>Número de turno:');
					$('#turnoNum').html('#'+jsonResponse.turno);
					$('#finalizar').hide();
					$('#docsReq').bind('click', false);
					console.info("turnoCompleted");
	           }
	       });
	}
}

function reloadPageFinish(){
	window.localStorage.clear();
	window.location.reload();
}
function outIndicaciones(){
	$("#indicaciones").fadeOut(600);
	$("#fichaTrue").delay(600).fadeIn('slow');
}

getListaDoc = function () {
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
	$('.pull-right').hide();
	$('#atras').hide().attr("disabled", true);
	$('#finalizar').hide();
	$('#docsReq').bind('click', false);
	$('#miTurno').bind('click', false);
	$('#infBasic').bind('click', false);

};

clearElements = function(){
	$('#alFicha').val('');
	$('#al_ficha').html('');
	$('#al_nombre').html('');
	$('#al_carrera').html('');
	$('#al_fechasol').html('');
}