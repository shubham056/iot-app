(function($) {
	
	"use strict";
	
     $("#review-carousel").owlCarousel({
         items: 1,
         loop: true,
         autoplay: true,
         nav: false,
         dots: true,
         autoplayTimeout: 5000,
         autoplayHoverPause: true,
         mouseDrag: true,
      });
		/* Closes the Responsive Menu on Menu Item Click*/
		$('.navbar-collapse ul li a').on('click', function() {
			$('.navbar-toggle:visible').click();
		});
		/*END MENU JS*/ 
    /* ----------------------------------------------------------- */
	/*  Fixed header
	/* ----------------------------------------------------------- */
    
    $(window).on('scroll', function(){
		if ( $(window).scrollTop() > 70 ) {
			$('.site-navigation,.trans-nav').addClass('header-white');
		} else {
			$('.site-navigation,.trans-nav').removeClass('header-white');
		}
	});
    
    
    
$   ('a.page-scroll').on('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 60 
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});

	 // Closes the Responsive Menu Menu Item Click
    $('.navbar-collapse ul li a').on('click', function() {
        $('.navbar-toggler:visible').click();
    });
	
    
      jQuery(document).on('ready', function(){   
          
	/* ----------------------------------------------------------- */
	/*  Mobile Menu
	/* ----------------------------------------------------------- */

	jQuery(".nav.navbar-nav li a").on("click", function() { 
		jQuery(this).parent("li").find(".dropdown-menu").slideToggle();
		jQuery(this).find("i").toggleClass("fa-angle-down fa-angle-up");
	});
	});

		
/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});
    
    
    
    $('#main-slide').carousel({
			pause: true,
			interval: 100000,
		});

    

    //    Animation
    AOS.init({
        duration: 1500,
    });
   
	
  $(".banner-slider").owlCarousel({
         items: 1,
         loop: true,
         autoplay: false,
         nav: false,
         dots: true,
         autoplayTimeout: 5000
      });
              
    
    new WOW().init();
		
})(window.jQuery);