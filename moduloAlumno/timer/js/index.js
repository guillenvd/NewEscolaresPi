// Create Countdown
var Countdown = {
  // Backbone-like structure
  $el: $('.countdown'),
  // Params
  countdown_interval: null,
  total_seconds     : 0,
  // Initialize the countdown  
  init: function() {
    // DOM
		this.$ = {
    	minutes: this.$el.find('.bloc-time.min .figure'),
    	seconds: this.$el.find('.bloc-time.sec .figure')
   	};
    // Init countdown values
    this.values = {
        minutes: this.$.minutes.parent().attr('data-init-value'),
        seconds: this.$.seconds.parent().attr('data-init-value'),
    };
    // Initialize total seconds
    this.total_seconds =  (this.values.minutes * 60) + this.values.seconds;

    // Animate countdown to the end 
    this.count();    
  },
  
  count: function() {
    
    var that    = this,
        tocs    = 0,
        $min_1  = this.$.minutes.eq(0),
        $min_2  = this.$.minutes.eq(1),
        $sec_1  = this.$.seconds.eq(0),
        $sec_2  = this.$.seconds.eq(1);
        this.countdown_interval = setInterval(function() {

        if(that.total_seconds > 0) {
            if(tocs==10){
              that.checkInning();
              tocs = 0;
            }else{
              ++tocs;
            }

            --that.values.seconds;              

            if(that.values.minutes >= 0 && that.values.seconds < 0) {

                that.values.seconds = 59;
                --that.values.minutes;
            }

            // Update DOM values
            // Minutes
            that.checkHour(that.values.minutes, $min_1, $min_2);

            // Seconds
            that.checkHour(that.values.seconds, $sec_1, $sec_2);

            --that.total_seconds;
        }
        else {
            clearInterval(that.countdown_interval);
        }

    }, 1000);    
  },
  
  animateFigure: function($el, value) {
    
     var that         = this,
		     $top         = $el.find('.top'),
         $bottom      = $el.find('.bottom'),
         $back_top    = $el.find('.top-back'),
         $back_bottom = $el.find('.bottom-back');

    // Before we begin, change the back value
    $back_top.find('span').html(value);

    // Also change the back bottom value
    $back_bottom.find('span').html(value);

    // Then animate
    TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        onComplete          : function() {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, { rotationX: 0 });
        }
    });

    TweenMax.to($back_top, 0.8, { 
        rotationX           : 0,
        transformPerspective: 300,
	      ease                : Quart.easeOut, 
        clearProps          : 'all' 
    });    
  },
  
  checkHour: function(value, $el_1, $el_2) {
    
    var val_1       = value.toString().charAt(0),
        val_2       = value.toString().charAt(1),
        fig_1_value = $el_1.find('.top').html(),
        fig_2_value = $el_2.find('.top').html();

    if(value >= 10) {

        // Animate only if the figure has changed
        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    }
    else {

        // If we are under 10, replace first figure with 0
        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }    
  },
  checkInning: function(){
    var that = this;
    $.get('/dist/php/turnos.php?Get=3&Turno='+$('#turno').text(), function(result){
      var jsonResponse  = jQuery.parseJSON(result);
      console.log(jsonResponse.estado); 
      if(parseInt(jsonResponse.estado) != 1){
        if($('#nextturno').text() != "-")
          that.nextInning();
        else{
           Countdown.clearClockUi();
        }
      }       
    });
  },
  nextInning: function(){
    var that = this;
    var ficha = window.localStorage.getItem('ficha');
    $.get('/dist/php/turnos.php?Get=2&Turno='+$('#turno').text()+'&Ficha='+ficha,
      function(result){
        var jsonResponse  = jQuery.parseJSON(result);
        console.log(jsonResponse.estado); 
        if(parseInt(jsonResponse.estado) != 1){
          that.getInning();
        }       
      }
    );

  },
  getInning: function(){
    window.localStorage.removeItem('ficha');
    $.get('/dist/php/turnos.php?Get=1', function(result){
      var jsonResponse  = jQuery.parseJSON(result);
      if(jsonResponse.Alumno.tiempo){
           console.log(jsonResponse);
           window.localStorage.setItem('ficha',jsonResponse.Alumno.ficha );
           $('#minutos').attr('data-init-value',jsonResponse.Alumno.tiempo );
           $('#turno').empty().text(jsonResponse.Alumno.turno );
           $('#nextturno').empty().text(jsonResponse.Alumno.nextTurno );
           Countdown.init();
       }else{
            Countdown.clearClockUi();
       }
    });
  },
  clearClockUi: function(){
      window.localStorage.removeItem('ficha');
      $('#minutos').attr('data-init-value',0);
      $('#segundos').attr('data-init-value',0);
      $('#turno').empty().text('-');
      $('#nextturno').empty().text('-');
      $('div.figure.min.min-1').find('span').empty().text('0');
      $('div.figure.min.min-2').find('span').empty().text('0');
      $('div.figure.sec.sec-1').find('span').empty().text('0');
      $('div.figure.sec.sec-2').find('span').empty().text('0');
      Countdown.values.seconds = 0;
      Countdown.values.minutes = 0;
      clearInterval(Countdown.countdown_interval);
      //Countdown.init();
  }
};

$(document).ready(function(){
    Countdown.getInning();
});
