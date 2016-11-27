// Global variable for the app we going to access to a
var AuthController = (function() {
    // constructor
    function AuthController() {
        console.log('Controller AUTH');
        if( window.location.pathname != '/' && parseInt(this.checkLogin()) != 1){
            window.location.href = '/'
        }
    };

    // add the methods to the prototype so that all of the 
    // Controller instances can access the private static
    /**
     * [Method to do login, its send the credential to a php file and it return a status 1 for corrects credentials and 0 for bad]
     * @param {}
     * @return {[none]}
     */
    AuthController.prototype.doLogin= function() {
        if($('#containerAuth #user').val() && $('#containerAuth #password').val() ){ 
            var data  = {
                user: $('#containerAuth #user').val(),
                pass: $('#containerAuth #password').val(),
            };
            _App.phpOperation('userLogin', data, function(data){
                var jsonResponse  = jQuery.parseJSON(data);
                console.log(jsonResponse);
                if(parseInt(jsonResponse.estado)){
                    _App.setValue('isAuth',1);
                    window.location.href = '/pages/index.html#home'
                }else{
                    $('#containerAuth #alerts').empty().html(_App.getAlert('Usuario o password invalidos', 'danger', 1))
                }
            }); 
        }else{
            $('#containerAuth #alerts').empty().html(_App.getAlert('Se necesitan ambos campos para iniciar sesión', 'danger'))
        }
    };
     /**
     * [Method to do login, its send the credential to a php file and it return a status 1 for corrects credentials and 0 for bad]
     * @param {}
     * @return {[none]}
     */
    AuthController.prototype.VerifyRole= function() {
        $('div#page-wrapper.principal-container').load('taps/home.html', function(){
            _App.phpOperation('username', function(data){
                var jsonResponse  = jQuery.parseJSON(data);
                _App.setValue('roleUser',jsonResponse.username);
                $('#wrapper #yosoy').html(jsonResponse.username+' <span class="caret"></span>')
            });
        }); 

    };
    AuthController.prototype.checkLogin =  function(){
        return localStorage.getItem('isAuth');
    };

    AuthController.prototype.logOut =  function(){
        localStorage.removeItem('isAuth');
        window.location.href = '/'
    };

    return AuthController;
})();