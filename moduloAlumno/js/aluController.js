$(document).ready(function() {

    $(".rFolio").click(function(event){
        var valor = $(event.target).val();
        if(valor =="yes"){
            $("#yesFolio").show();
            $("#noFolio").hide();
			$("#infoBasica").hide();
			$("#alertFolio").hide();

			$("#btnFolio").click(function(){
				console.log('click en enviar folio');
				var folio = $("#myFolio").val();
				console.log(folio);

				if(folio == 12345){
					$("#infoBasica").show();
					$("#alertFolio").hide();
            		$(".msjFolio").hide();
				}else{
					$("#alertFolio").show();
            		$(".msjFolio").show();

					$(".msjFolio").html('Folio No Encontrado');
					$("#infoBasica").hide();
				}
			});

        } else if (valor == "no") {
            $("#yesFolio").hide();
            $("#noFolio").show();
            $("#infoBasica").hide();
        }

    });

            $("#yesFolio").hide();
            $("#noFolio").hide();

});

