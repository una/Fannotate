/*---------  Flex Slider -------*/
  
$(window).load(function() {
              $('#slider1').flexslider({
                animation: "fade",
				controlNav: false, 
                directionNav: true, 				
				prevText: "", 
				nextText: "", 
				slideshowSpeed: 8000,	
 				controlsContainer: '.flex-container',
				start: function(slider) {
                slider.removeClass('loading');
                }  
              });
			     
 
			  $('#slider2').flexslider({  
			  directionNav: false, 				
			  controlNav: false, 
              animation: "slide", 
			  slideshowSpeed: 4000,  });
			
			$('#testi-slider').flexslider({
                animation:"fade",				 
				controlNav: false, 
                directionNav: false, 
                controlsContainer: '.testi-container',				
                slideshowSpeed: 4000,		
                start: function(slider) {
                $('.flexslider-manual-controls li a').click(function(){
                if ($(this).hasClass('next')) {
                slider.flexAnimate(slider.getTarget("next"), true);
                } else {
                 slider.flexAnimate(slider.getTarget("prev"), true);
    }
  });
}  
});
}); 


/*---------  Header Fixed Nav -------*/
			
			
$(document).ready(function() {
    var s = $(".header");
    var pos = s.position();                   
    $(window).scroll(function() {
        var windowpos = $(window).scrollTop();
        
        if (windowpos > pos.top ) {
            s.addClass("stick");
        $(".header").addClass("fixi", "800");			 
        $(".flex-container").addClass("fixi2" , "800");			 
      } else {
        s.removeClass("stick");
		 $(".header").removeClass("fixi", "0");
		 $(".flex-container").removeClass("fixi2");			 
 		 }
    });
});

$(document).ready(function() {
    $('.navig').onePageNav({
	filter: ':not(.external)',
    currentClass: 'current',
	scrollOffset: 60,
    scrollSpeed: 600,
    scrollThreshold: 0.5 ,
   
});
});


/*---------  Team Hover -------*/

$(document).ready(function(){
$("div.b").hover(
function() {
$(this).stop().animate({"opacity": "1","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(opacity=100)"}, "800");
},
function() {
$(this).stop().animate({"opacity": "0","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(opacity=0)"}, "fast");
});

});

/*---------  Gallery Hover -------*/

$(document).ready(function(){
$("img.b2").hover(
function() {
$(this).stop().animate({"opacity": "1","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(opacity=100)"}, "800");
},
function() {
$(this).stop().animate({"opacity": "0","-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(opacity=0)"}, "fast");
});

});

$(document).ready(function(){


var ifra;
$(".video-button").click(function(){
if ( ifra ) {
ifra.appendTo("body");
ifra = null;
}  
$("#overlay_form").fadeIn(1000);
 $("#popi-bg").css({
"opacity": "0.7"
}); 
$("#popi-bg").fadeIn("slow");
positionPopup();
});




$("#close2, #popi-bg").click(function(){
 

$("#overlay_form").fadeOut(500);
 
$("#popi-bg").fadeOut("slow");
if ( ifra ) {
ifra.appendTo("body");
ifra = null;
} else {
ifra = $("#overlay_form").detach();
}

});
 
});

function positionPopup(){
if(!$("#overlay_form").is(':visible')){
return;
}
$("#overlay_form").css({
left: ($(window).width() - $('#overlay_form').width()) / 2.2,
top: (($(window).height() - $('#overlay_form').outerHeight()) / 2) + 
                                                $(window).scrollTop(),
position:'absolute'
});
}
$(window).bind('resize',positionPopup);


 $(document).ready(function(){
 
$('#send').click(function(){
 
$.post("mailer.php", $("#contactform").serialize(),  function(response) {
$('#success').html(response);
//$('#success').hide('slow');
});
return false;
 
});
 
});


$(document).ready(function(){
$("#register").click(function(){
$("#overlay_form2").fadeIn(1000);
$("#popi-bg2").css({
"opacity": "0.7"
}); 
$("#popi-bg2").fadeIn("slow");
positionPopup2();
});
$("#close3").click(function(){
$("#overlay_form2").fadeOut(500);
$("#popi-bg2").fadeOut("slow");

});
 
});
    
function positionPopup2(){
if(!$("#overlay_form2").is(':visible')){
return;
}
$("#overlay_form2").css({
left: ($(window).width() - $('#overlay_form2').width()) / 2,
top: (($(window).height() - $('#overlay_form2').outerHeight()) / 2) + 
                                                $(window).scrollTop(),
position:'absolute'
});
}
$(window).bind('resize',positionPopup2);

$(document).ready(function(){
$("#mobile").click(function(){

	$('#mobi-menu').toggleClass('on').toggleClass('off');
	$(this).toggleClass('opened').toggleClass('closed');

});});


	
