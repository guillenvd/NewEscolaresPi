// Global variable for the app we going to acces to a
var AuthController = (function() {
    // constructor
    function AuthController() {
        console.log('Controller AUTH');
    };
    // add the methods to the prototype so that all of the 
    // Controller instances can access the private static
    AuthController.prototype.doLogin= function() {
        _app.phpOperation('getCarrera', function(data){
            var jsonResponse  = jQuery.parseJSON(data);
            console.log(jsonResponse);
        });; 
    };


    return AuthController;
})();
