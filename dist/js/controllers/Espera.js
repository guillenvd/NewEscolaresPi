// Global variable for the app we going to access to a
var dropDowntemplate ='<div class="dropdown">'
                          +'<button class="btn btn-default dropdown-toggle" type="button" id="actionDropdown" data-toggle="dropdown">'
                            +'Action '
                            +'<span class="caret"></span>'
                          +'</button>'
                          +'<ul class="dropdown-menu" aria-labelledby="actionDropdown">'
                            +'<li action=\'1\'><a href="#">Cancelar</a></li>'
                            +'<li action=\'1\'><a href="#">Atender</a></li>'
                          +'</ul>'
                        +'</div>';

var EsperaController = (function() {
    function EsperaController() {
        console.log('Controller Espera');

        _App.phpOperation('lista_espera', function(data){
            var jsonResponse  = jQuery.parseJSON(data);
            console.log(jsonResponse);
            var table = $('#listaEspera').DataTable({
                                    data: jsonResponse,
                                    columns: 
                                        [
                                            { title: "IdAlumno"},
                                            { title: "Nombre del Alumno" },
                                            { title: "# Ficha" },
                                            { title: "Turno" },
                                            { title: "Estado" },
                                            { title: "Carreras" }
                                        ],
                                    columnDefs: 
                                        [ 
                                            {
                                                "title":"Opciones",
                                                "targets": 6,
                                                "defaultContent": dropDowntemplate,
                                                "searchable": false,
                                                "sortable": false
                                             }
                                        ],
                                    fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                                            console.log(aData[4])
                                            switch(aData[4]){
                                                case 'Atendido':
                                                    $(nRow).css('background', '#8eed91')
                                                    break;
                                                case 'No se presentó':
                                                    $(nRow).css('background', '#ea777f')
                                                    break;
                                               
                                            }
                                        },
                                    responsive: true
                                });
            table.column(0).visible(false); //hiden columm idAlumno
            $('#listaEspera tbody').on( 'click', 'li', function () {
                console.log($(this).attr('action'));
                var data = table.row( $(this).parents('tr') ).data();
                console.log( data );
            } );
        });

    };

    /* add the methods to the prototype so that all of the 
     Controller instances can access the private static
    */
    EsperaController.prototype.more =  function(){
       return false;
    };

    return EsperaController;
})();