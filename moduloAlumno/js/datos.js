    $(".rFolio").click(function(event){
        var valor = $(event.target).val();
        if(valor =="yes"){
            $("#yesFolio").show();
            $("#noFolio").hide();
			$("#infoBasica").hide();
			$("#alertFolio").hide();

			$("#btnFolio").click(function(){
				console.log('click en enviar folio');
				var folio = $("#alFolio").val();
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



						                         <div class="row" id="infoBasica">
													<div class="col-sm-12">
					                                	<h4 class="info-text">Información Básica</h4>
					                            	</div>
				                                	<div class="col-sm-6">
														<div class="input-group">
															<span class="input-group-addon">
																<i class="material-icons">email</i>
															</span>
															<div class="form-group label-floating">
					                                          	<label class="control-label">Your Email</label>
					                                          	<input name="name" type="text" class="form-control">
					                                        </div>
														</div>

														<div class="input-group">
															<span class="input-group-addon">
																<i class="material-icons">lock_outline</i>
															</span>
															<div class="form-group label-floating">
					                                          	<label class="control-label">Your Password</label>
					                                          	<input name="name2" type="password" class="form-control">
					                                        </div>
														</div>
				                                	</div>
				                                	<div class="col-sm-6">
				                                    	<div class="form-group label-floating">
				                                        	<label class="control-label">Country</label>
			                                        		<select class="form-control">
																<option disabled="" selected=""></option>
			                                                	<option value="Afghanistan"> Afghanistan </option>
			                                                	<option value="Albania"> Albania </option>
			                                                	<option value="Algeria"> Algeria </option>
			                                                	<option value="American Samoa"> American Samoa </option>
			                                                	<option value="Andorra"> Andorra </option>
			                                                	<option value="Angola"> Angola </option>
			                                                	<option value="Anguilla"> Anguilla </option>
			                                                	<option value="Antarctica"> Antarctica </option>
			                                                	<option value="...">...</option>
				                                        	</select>
				                                    	</div>
														<div class="form-group label-floating">
				                                        	<label class="control-label">Daily Budget</label>
			                                        		<select class="form-control">
																<option disabled="" selected=""></option>
			                                                	<option value="Afghanistan"> < $100 </option>
			                                                	<option value="Albania"> $100 - $499 </option>
			                                                	<option value="Algeria"> $499 - $999 </option>
			                                                	<option value="American Samoa"> $999+ </option>
				                                        	</select>
				                                    	</div>
				                                	</div>
				                            	</div>







		                            <div class="tab-pane" id="captain">
		                                <h4 class="info-text">What type of room would you want? </h4>
		                                <div class="row">
		                                    <div class="col-sm-10 col-sm-offset-1">
		                                        <div class="col-sm-4">
		                                            <div class="choice" data-toggle="wizard-radio" rel="tooltip" title="This is good if you travel alone.">
		                                                <input type="radio" name="job" value="Design">
		                                                <div class="icon">
		                                                    <i class="material-icons">weekend</i>
		                                                </div>
		                                                <h6>Single</h6>
		                                            </div>
		                                        </div>
		                                        <div class="col-sm-4">
		                                            <div class="choice" data-toggle="wizard-radio" rel="tooltip" title="Select this room if you're traveling with your family.">
		                                                <input type="radio" name="job" value="Code">
		                                                <div class="icon">
		                                                    <i class="material-icons">home</i>
		                                                </div>
		                                                <h6>Family</h6>
		                                            </div>
		                                        </div>
												<div class="col-sm-4">
		                                            <div class="choice" data-toggle="wizard-radio" rel="tooltip" title="Select this option if you are coming with your team.">
		                                                <input type="radio" name="job" value="Code">
		                                                <div class="icon">
		                                                    <i class="material-icons">business</i>
		                                                </div>
		                                                <h6>Business</h6>
		                                            </div>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>
		                            <div class="tab-pane" id="description">
		                                <div class="row">
		                                    <h4 class="info-text"> Drop us a small description.</h4>
		                                    <div class="col-sm-6 col-sm-offset-1">
	                                    		<div class="form-group">
		                                            <label>Room description</label>
		                                            <textarea class="form-control" placeholder="" rows="6"></textarea>
		                                        </div>
		                                    </div>
		                                    <div class="col-sm-4">
		                                    	<div class="form-group">
		                                            <label class="control-label">Example</label>
		                                            <p class="description">"The room really nice name is recognized as being a really awesome room. We use it every sunday when we go fishing and we catch a lot. It has some kind of magic shield around it."</p>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>










	$('form').submit(function(e){
		e.preventDefault();

		var data = $(this).serializeArray();
		data.push = ({
				name: 'tag',
				value:'login'
		});

		console.log(data);

		$.ajax({ 
			url: 'php/getInfoBasicAlumno.php',
			type: 'post',
			dataType: 'json',
			data: data,
			beforeSend: function(){
				$('.fa').css('display','inline');
			}
		})
		.done(function(){
			$(".msjFolio").html('Folio ENCONTRADO');
			console.log('Success');
		})
		.fail(function(){
			$(".msjFolio").html('Folio No Encontrado');
			console.log('Error')
		})
		.always(function(){
			$('.fa').hide();
		});
	})


$('form').submit(function(e){
		e.preventDefault();
	var FOLIO  =  document.getElementById('alFolio').value;

	$.ajax({
		type: 'POST',
		url: 'php/getInfoBasicAlumno.php',
		data: {'folio': FOLIO},
		success: function(respuesta){
			console.log(respuesta);
			if(respuesta == 1){
				console.log("Correcto");
			}
			else{
				console.log("Error");
			}
		}
	})
})