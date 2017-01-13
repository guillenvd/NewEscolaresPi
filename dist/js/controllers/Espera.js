// Global variable for the app we going to access to a
var dropDowntemplate ='<div class="dropdown">'
                          +'<button class="btn btn-default dropdown-toggle" type="button" id="actionDropdown" data-toggle="dropdown">'
                            +'Cambiar estado '
                            +'<span class="caret"></span>'
                          +'</button>'
                          +'<ul class="dropdown-menu" aria-labelledby="actionDropdown">'
                            +'<li action=\'1\'><a href="#">En espera</a></li>'
                            +'<li action=\'2\'><a href="#">Atendido</a></li>'
                            +'<li action=\'3\'><a href="#">No se presentó</a></li>'
                          +'</ul>'
                        +'</div>';

var EsperaController = (function() {
    function EsperaController() {
        console.log('Controller Espera');

        _App.phpOperation('lista_espera', function(data){
            var jsonResponse  = jQuery.parseJSON(data);
            console.log(jsonResponse);
            console.log(jsonResponse);
            //$("#listaEspera").DataTable().fnDestroy();
            var table = $('#listaEspera').DataTable({"bDestroy": true,
                                    data: jsonResponse,
                                    columns: 
                                        [
                                            { title: "IdAlumno"},
                                            { title: "Nombre del Alumno" },
                                            { title: "# Ficha" },
                                            { title: "Turno" },
                                            { title: "Estado" },
                                            { title: "Carrera" }
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
                var data = table.row( $(this).parents('tr') ).data();
                _Espera.changeAlumnoStatus(data, $(this).attr('action'), table);
            } );
        });

    };

    /* add the methods to the prototype so that all of the 
     Controller instances can access the private static
    */
    EsperaController.prototype.changeAlumnoStatus =  function( alumno, newEstado, table ){
        var data = {
                     'Estado': newEstado, 
                     'Ficha': alumno[2],
                     'Id': alumno[0]
                    };
        console.log(data)
        _App.phpOperation('updateStatus', data, function(resultPhp){ 
            console.log(resultPhp)
            table
            _Espera.constructor()
        });
    };

    return EsperaController;
})();