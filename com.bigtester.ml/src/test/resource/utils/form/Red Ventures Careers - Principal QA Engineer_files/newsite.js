// Scroll to section
function scrollToSection() {
    
    var section = $(this).data('section');
    
    $('html, body').stop().animate({
    
			scrollTop: $('#' + section).offset().top - 197 // -197 makes up for header + sticky header height
			
		}, 800);
		
    return false;
}


// sticky nav
function stickyNav() {
	
	var element = $('.header');
	var offset = element.outerHeight();
	
	$(window).scroll(function() {
	
		if ( $(window).scrollTop() > offset ) {
			
			element.addClass('sticky');
		}
		else {
		
			element.removeClass('sticky');
		}
	});
}


// back to top button
function backToTop() {
	
	var element = $('.back-to-top');
	var offset = 800;
	
	$(window).scroll(function() {
	
		if ( $(window).scrollTop() > offset ) {
		
			element.addClass('back-to-top-show');
		}
		else {
		
			element.removeClass('back-to-top-show');
		}
	});
}


// Set equal height on children of passed object
function equalHeight(obj){
	var heightArray = obj.children('li').map( function(){
		return $(this).height();
	}).get();
	var maxHeight = Math.max.apply( Math, heightArray);
	obj.children('li').height(maxHeight);
}


// Set or unset equal heights on lists
function equalHeightOnLists(action) {
	var blockList = $('.js-block-list-content');
	blockList.each(function() {
		var self = $(this);
		if (action === 'set') {
			equalHeight(self);
		} else if (action === 'unset') {
			self.find('li').height('auto');
		}
	});
}


// Let's play!
(function ($) {

    // Set variables
    var doc = $(document);
    var win = $(window);
    
    
    // active menu
	$('.header-nav').setActiveMenu();
	

    // Scroll to section
    doc.on('click', '.js-scroll', scrollToSection);
    
	
	// init sticky nav
	stickyNav();
	
	
	// init back to top
	backToTop();
	
	
	// On window load calculate height and set isotope
    var isotopeList = $('.block-list');
	var isotopElem = $('.block-list > li');
	
    win.on('load', function() {
	    isotopeList.isotope({
			itemSelector : isotopElem,
			layoutMode : 'masonry',
			animationOptions : {
				duration : 750,
				easing : 'linear'
			}
		}, equalHeightOnLists('set'));
		
    });
    

	// On window resize recalculate height and set isotope
    win.on('resize', function() {
	    equalHeightOnLists('unset');
		isotopeList.isotope({ 
			filter: isotopElem,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		}, equalHeightOnLists('set'));
	    
    });

})(jQuery);


/*
---------------------------------------------------------------------------------
	OLD CODE - haven't cleaned everything yet - Kris O.
---------------------------------------------------------------------------------
*/

$(function() {
		
	var isMSIE = /*@cc_on!@*/0;

	if (!isMSIE) {
		// non IE browsers...enquiere breaks ie9 js

		// enquire <= 480px
		enquire.register('screen and (max-width: 480px)', {
		
			match: function() {
				
				// prepend menu icon
				$('.header-nav').before('<div class="header-nav-icon js-header-nav-icon"><span>Menu</span></div>');
		
				// move nav outside container
				$('.header-nav').appendTo('.header');
				
				// toggle nav
				$('.js-header-nav-icon').on('click', function() {
				
					$('.header-nav').slideToggle();
					$(this).toggleClass('active');
				});
				
				// hide blocks that have images
				//$('.block-list-content').find('img').parent().remove();
				
				// have to remove this, then re-init because of flexlider DOM issues
				$('.js-flexslider-building').remove();		
				
				// figure out which slider to show
				var slider = $('.js-flexslider-section').data('slider');
					
				// sliders
				$('.js-placeholder').load('/includes/sliders/_' + slider + '_slider_mobile.html', function(data) {
					
					// take html from .js-placholder and append to .building
					$('.js-flexslider-section').append($(this).html());
					
					// remove html from .js-placeholder so we don't have duplicate content
					$(this).html('');
					
					// Set bulding slider
					$('.js-flexslider-' + slider).flexslider({
						slideshow: false,
						animation: 'slide',
						controlNav: false,
						prevText: '&laquo;',
						nextText: '&raquo;',
						start: function(slider) {
						
							slider.slides.each(function(index) {
								
								// i hate starting at 0
								index++;
								
								// add class for slide number
								$(this).addClass('slide-' + index);
							});
						}
					});
					
				}); // end .load(); 
				
			} // end match
			
		}).listen();
		
		enquire.register('screen and (min-width: 481px)', {	
		
			match: function() {
			
				// remove nav icon
				$('.js-header-nav-icon').remove();
				
				// put nav back in .header .container
				$('.header-nav').appendTo('.header .container').show();
				
				// have to remove this, then re-init because of flexlider DOM issues
				$('.js-flexslider').remove();	
				
				// figure out which slider to show
				var slider = $('.js-flexslider-section').data('slider');
							
				// sliders
				$('.js-placeholder').load('/includes/sliders/_' + slider + '_slider.html', function(data) {
					
					// take html from .js-placeholder and append to .building
					$('.js-flexslider-section').append($(this).html());
					
					// remove html from .js-placeholder so we don't have duplicate content
					$(this).html('');
					
					// init slider
					$('.js-flexslider-' + slider).flexslider({
						slideshow: false,
						animation: 'slide',
						controlNav: false,
						itemWidth: 1200,
						prevText: '&laquo;',
						nextText: '&raquo;',
						start: function(slider) {
						
							slider.slides.each(function(index) {
								
								// i hate starting at 0
								index++;
								
								/// add class for slide number
								$(this).addClass('slide-' + index);
							});
						}
					});
					
				}); // end .load();
				
				// load lightbox for videos
				$('.lightbox').lightbox();
				
			} // end match
			
		}).listen(); // end enquire()
		
	}
	
	/*
	 * turn filter menus into drop down menus on mobile
	*/
	
	var peopleFilterContainer = $('.people-filter-container');
	
	// Create the dropdown base
	$('<select class="block-list-filter-dropdown people-dropdown" />').appendTo(peopleFilterContainer);
	
	// Create default option
	$('<option />', {
		'selected': 'selected',
		'value'   : '',
		'text'    : 'Filter by...'
	}).appendTo('.people-dropdown', peopleFilterContainer);
	
	// Populate dropdown with menu items
	$('.people-filter-container a').each(function() {
	
		var el = $(this);
		
		$('<option />', {
			'value'   : el.attr('data-type'),
			'text'    : el.text()
		}).appendTo('.people-dropdown', peopleFilterContainer);
		
	}); // end blockListFilter.each()
	
	
	
	// wait til all assets are loaded
	$(window).load(function() {
		
		// add slide index to each slider
		var slider = $('.slider');
		var sliderElem = $('.slider > li');
		
		slider.each(function() {
						
			// loop through each slide list item and do stuff
			$(this).find(sliderElem).each(function(index) {
				
				// i hate starting at 0
				index++;
				
				// add index count to "rel" tag so we can target later with pager
				$(this).addClass('slide-' + index);
				
			});	// end sliderElem.each();
			
		}); // end slider.each();
		
		
	}); // end $(window).load()
	
	
	
	// off screen content
	var offScreenContainer = $('.off-screen-container');
	var offScreenContentContainer = offScreenContainer.find('.off-screen-content-container');
	var offScreenContent = offScreenContentContainer.find('.off-screen-content');
	var offScreenClose = offScreenContainer.find('.close');

    $( "#show-items" ).delegate( ".js-view-more", "click", function(e) {
			
		var content = $(this).next('.profile').html();
		
		offScreenContent.html(content);
		
		// if we are clicking on profile image, save the image
		if ($(this).find('img').length > 0) {
		
			var img = $(this).html();
			offScreenContentContainer.prepend(img);
		}
		
		offScreenContainer.animate({
			
			right: 0
			
		}, 500, function() {
	
			// show content and close button on once animation is complete
			offScreenContentContainer.fadeIn(500);
			offScreenClose.show();
		
		}); // end offScreenContentContainer.animate 
		
		return false;
		
	}); // end viewMoreBtn.click
	
	// close with esc key
	$(document).keyup(function(e) {
		
		if (e.keyCode === 27) {
		
			offScreenContentContainer.fadeOut(500, function() { 
			
				// clear everything out for next time
				$(this).find('img').remove();
				offScreenContent.html('');
					
			});
			
			// remove close button
			offScreenClose.hide();
			
			offScreenContainer.animate({
				
				right: '100%'
				
			}, 500); // end offScreenContentContainer.animate
			
		}
		
	}); // end document.keyup
	
	// close when clicking offScreenContentContainer
	offScreenContentContainer.on('click', function(e) {
		
		e.preventDefault();
		
		offScreenContentContainer.fadeOut(500, function() { 
		
			// clear everything out for next time
			$(this).find('img').remove();
			offScreenContent.html('');
				
		});
		
		// remove close button
		$(this).hide();
		
		offScreenContainer.animate({
			
			right: '100%'
			
		}, 500); // end offScreenContentContainer.animate
		
	}); // end offScreenClose.click
	
	// close with "x" button
	offScreenClose.on('click', function(e) {
		
		e.preventDefault();
		
		offScreenContentContainer.fadeOut(500, function() { 
		
			// clear everything out for next time
			$(this).find('img').remove();
			offScreenContent.html('');
				
		});
		
		// remove close button
		$(this).hide();
		
		offScreenContainer.animate({
			
			right: '100%'
			
		}, 500); // end offScreenContentContainer.animate
		
	}); // end offScreenClose.click


	// auto open "view-more" hack
	var hash = window.location.hash;
	var matches = hash && hash.match(/^#\/people\/(.*)$/i);
	if (matches && matches[1]) {
		$('#' + matches[1]).trigger('click');
	}
	
}); // end document ready


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
    var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var	_ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d:    d,
                dd:   pad(d),
                ddd:  dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy:   String(y).slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM",
                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};


$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });

    return this;
};
