/* main.js */

$(function(){
  var slider = $('#pcSlider').bxSlider({
			mode: 'fade',
			auto: true,
            		autoControls: false,
            		autoHover: true,
			controls: false,
			speed: 1000,
			pause: 7000,
    onBeforeSlide: function(currentSlide, totalSlides){
      $('.pcThumbs a').removeClass('pager-active');
      $('.pcThumbs a').eq(currentSlide).addClass('pager-active');
    }
  });

  $('.pcThumbs a').click(function(){
   var thumbIndex = $('.pcThumbs a').index(this);
    slider.goToSlide(thumbIndex);
 
    $('.pcThumbs a').removeClass('pager-active');
    $(this).addClass('pager-active');
    return false;
  });
  
  $('.pcThumbs a:first').addClass('pager-active');

  $(document).ready(function(){
    $('#inSlider').bxSlider({
	auto: false,
	controls: false,
 	autoControls: false
    });
  });

});


