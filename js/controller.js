var Controller = (function() {
    var _bar;
    // constructor
    function Controller() {
        console.log('init Controller');
        $('#page-wrapper').css('min-height', $(window).height()- $('.navbar-default').height()-$('.footer-inner').height()-2);
    };
    // add the methods to the prototype so that all of the 
    // Controller instances can access the private static
    Controller.prototype.getHash = function() {
        return window.location.hash;
    };
    Controller.prototype.CheckSesion = function(bar) {
        _bar = bar;
    };
    Controller.prototype.loadPage = function(){
        switch (window.location.hash) {
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