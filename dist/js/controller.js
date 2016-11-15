// Global variable for the app we going to acces to a
var _app = null;    

var Controller = (function() {
    var _bar; //global varible
    // constructor
    function Controller() {
        _app = this; //inherit the controller methods to app
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
        return window.location.hash;
    };

    /**
     * Description: Load controller files for any page
     * @param {text} controllerName  [Name of the file and the controller]
     * @return { none } this function past the path for controller to other funtion
    */
    Controller.prototype.loadControllerFiles= function(controllerName) {
        this.loadScriptFileSyncronous('../dist/js/controllers/' + controllerName + '.js', 'js', controllerName);
        this.loadScriptFileSyncronous('../dist/css/' + controllerName + '.css', 'css', controllerName);
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
                url: pathFile,
                dataType: "script",
                async: false
            }).done(function(doneData){
                eval( controllerName+ 'Controller()');
            }); 
        } else if (filetype == 'css') {
            $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', pathFile));
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
        _app.phpOperation('getCarrera', function(data){
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
            $('div#page-wrapper.principal-container').load('taps/home.html');
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
            $('div#page-wrapper.principal-container').load('taps/betaalumnos.html')
            
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