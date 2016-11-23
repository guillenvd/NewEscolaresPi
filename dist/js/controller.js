// Global variable for the app we going to acces to a

var Controller = (function() {
    var _bar; //global varible
    // constructor
    function Controller() {
        _App = this; //inherit the controller methods to app
        console.log('init Controller');
        $('#page-wrapper').css('min-height', $(window).height()- $('.navbar-default').height()-$('.footer-inner').height()-2);
    };

    /*  Add the methods to the prototype so that all of the 
        Controller instances can access the private static
    */
    /**
     * Description: Get the hash fo the url : domain.local/index.html#thisMehodBackThis
     * @return { String } -> #has
    */
    Controller.prototype.getHash = function() {   
        $('div#page-wrapper.principal-container').load('taps/home.html', function(){
                _App.phpOperation('username', function(data){
                    var jsonResponse  = jQuery.parseJSON(data);
                    console.log(jsonResponse.username);
                    $('#wrapper #yosoy').html(jsonResponse.username)
                });
            });
        return window.location.hash;



    };
    /**
     * Description: This method going to back a template of a message of boostrap
     *              the message can have html code, and the type can be
     *               - succcess has backcolor green
     *               - info has backcolor blue
     *               - warning has backcolor yellow
     *               - danger has backcolor red
     * @param {text} message  [content of the alert]
     * @param {text} type  [kind of alert]
     * @return { text } template fot eh alert
    */
    Controller.prototype.getAlert= function(message, type = 'info', centerText = 0){
      return  '<div class="alert alert-'+type+' '+ (parseInt(centerText)?'text-center':'')+'">'
                +message
              +'</div>';
    };
    /**
     * Description: Load controller files for any page
     * @param {text} controllerName  [Name of the file and the controller]
     * @return { none } this function past the path for controller to other funtion
    */
    Controller.prototype.loadControllerFiles= function(controllerName) {
        this.loadScriptFileSyncronous('/dist/js/controllers/' + controllerName + '.js', 'js', controllerName);
        this.loadScriptFileSyncronous('/dist/css/' + controllerName + '.css', 'css', controllerName);
    };

    /**
     * Description: Load any file to the document we going to have two files ControllerAction.js and ControllerCSS.css
     * @param {text} pathFile [The full or local path of the file]
     * @param {text} filetype [The kind of file css/js]
     * @param {text} controllerName [The individual name of controller/files]
     * @return { loadFile } this function load the files
    */
    Controller.prototype.loadScriptFileSyncronous = function(pathFile, filetype, controllerName) {
        if(filetype == 'js') {
            $.ajax({
                url: 'http://'+window.location.host+pathFile,
                dataType: "script",
                async: false
            }).done(function(doneData){
                eval( '_'+controllerName+' = new '+controllerName+ 'Controller;');
                console.log('IMPORTANT!: new controller was load in the global scope, name:'+ '_'+controllerName);
            }); 
        } else if (filetype == 'css') {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href',  'http://'+window.location.host+pathFile));
        }
    };

    /*  
        Description: This method going to consult a php file, we need to pass the name of the file[action] -> action.php
                     we need to pass too the data[array] of the action and is requiere too the callBackFunction
     * @param {text} action [name of the file php "Action"]
     * @param {text} data [Dates of the action if it's required]
     * @param {text} callBackFunction [An anonymous function of js, what's going to happen after all]
     * @return { execute php function }

     * example of this method:
        _App.phpOperation('getCarrera', function(data){
            var jsonResponse  = jQuery.parseJSON(data);
            console.log(jsonResponse);
        });
    */
    Controller.prototype.phpOperation = function(action,data, callBackFunction){
            $.get("../dist/php/"+action+".php",data,callBackFunction);
    };


    /**
     * Description: Load page in taps for the #hasName
     * @return { none } Load page in container of the index 
    */
    Controller.prototype.loadPage = function(){
        switch (this.getHash()) {
          case '#home':
            $('div#page-wrapper.principal-container').load('taps/home.html', function(){
                _App.phpOperation('totalAlumnos', function(data){
                    var jsonResponse  = jQuery.parseJSON(data);
                    console.log(jsonResponse.totalAlumnos);
                    $('#containerHome #totalAlumno').val('#'+jsonResponse.totalAlumnos)
                });
            });

        break;
        case '#espera':
            $('div#page-wrapper.principal-container').load('taps/listaEspera.html', function(){
                $('#dataTables-example').DataTable({
                        responsive: true
                 });
            });
        break;
        case '#altaEspera':
            $('div#page-wrapper.principal-container').load('taps/esperaForm.html')
            
        break;  
        case '#estadistica':
            $('div#page-wrapper.principal-container').load('taps/estadistica.html')
            
        break; 
        case '#betaalumnos':
            $('div#page-wrapper.principal-container').load('taps/betaalumnos.html', function(){
                _App.phpOperation('docu', function(data){
                    var jsonResponse  = jQuery.parseJSON(data);
                    console.log(jsonResponse);

                    $('#documentos #doc0').html(jsonResponse.Documento[0].Documento);
                    $('#documentos #doc1').html(jsonResponse.Documento[1].Documento);
                    $('#documentos #doc2').html(jsonResponse.Documento[2].Documento);
                    $('#documentos #doc3').html(jsonResponse.Documento[3].Documento);

                  console.log(jsonResponse.Documento.length)
                    for(var i = 0; i < jsonResponse.Documento.length; i++ )
                        console.log('El ' + jsonResponse.Documento[i].Id + ' es para: ' + jsonResponse.Documento[i].Documento);
                });
            }); 
        break;    
        case '#alumnos':
            $('div#page-wrapper.principal-container').load('taps/alumnos.html')
            
        break;   
        case '#guia':
            $('div#page-wrapper.principal-container').load('taps/guia.html')
            
        break;           default:
            $('div#page-wrapper.principal-container').load('taps/home.html');
        break;
        }
    };
    return Controller;
})();

var _App = new Controller;    