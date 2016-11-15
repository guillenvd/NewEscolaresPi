var AuthController = (function() {
    var _bar;
    // constructor
    function AuthController() {
        console.log('Controller AUTH');
    };
    // add the methods to the prototype so that all of the 
    // Controller instances can access the private static
    AuthController.prototype.validate= function(user, password) {
        
    };


    return AuthController;
})();