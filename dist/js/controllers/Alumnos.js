var AlumnosController = (function() {
    function AlumnosController() {
        console.log('Controller Alumnos');
    };

    /* add the methods to the prototype so that all of the 
     Controller instances can access the private static
    */
    AlumnosController.prototype.getAlumno =  function(){
        if($('#alumnoMatricula').val()){
              $(' #alerts').empty();
            _App.phpOperation('searchAlumno', {Ficha:$('#alumnoMatricula').val()}, function(data){
                var jsonResponse  = jQuery.parseJSON(data);
                _Alumnos.clearTable();
                if(jsonResponse.estado == 1){
                    $(' #alerts').empty().html(_App.getAlert('No se encontro un alumno con dicha matricula', 'danger', 1))
                }else{
                    _Alumnos.setTable(jsonResponse.Alumno);
                }
            });

        }else{
            _Alumnos.clearTable();
            $(' #alerts').empty().html(_App.getAlert('Se necesita una matricula para buscar a un alumno', 'danger', 1));
        }
    };
    AlumnosController.prototype.clearTable =  function(){
        $('#nombreAlumno').empty().html('-');
        $('#carreraAlumno').empty().html('-');
        $('#fechaAlumno').empty().html('-');
        $('#turnoAlumno').empty().html('-');
        $('#estadoAlumno').empty().html('-');
    };
    AlumnosController.prototype.setTable =  function(alumno){
        $('#nombreAlumno').empty().html(alumno.Nombre);
        $('#carreraAlumno').empty().html(alumno.Carrera);
        $('#fechaAlumno').empty().html(alumno.Fecha);
        $('#turnoAlumno').empty().html(alumno.Turno);
        $('#estadoAlumno').empty().html(alumno.Estado);
    };
    return AlumnosController;
})();