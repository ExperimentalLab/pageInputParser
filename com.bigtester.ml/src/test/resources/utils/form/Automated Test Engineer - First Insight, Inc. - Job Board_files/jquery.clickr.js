/*
 * jQuery Clickr Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2010 D. Charlton
 */
(function($){ 
	$.fn.clickr = function(actions) {  

		this.each(function(){
			for(var prop in actions){ 
				acts = actions[prop].split(',');
				var i = 0;
				while( i < acts.length ){
					bindClickAction($(this),prop,acts[i].replace(' ',''));
					i++; 
  				}
			} 
		});

		function bindClickAction(obj,domId,effect){
			switch( effect ){
				case "slideDown": 
					obj.click(function(){ $(domId).slideDown('fast'); return false; });
					break;
				case "slideUp": 
					obj.click(function(){ $(domId).slideUp('fast'); return false; });
					break;
				case "slideToggle": 
					obj.click(function(){ $(domId).slideToggle('fast'); return false; });
					break;
				case "show": 
					obj.click(function(){ $(domId).show(); return false; });
					break;
				case "hide": 
					obj.click(function(){ $(domId).hide(); return false; });
					break;
				case "toggle":  
					obj.click(function(){ $(domId).toggle(); return false; });
					break;
				case "remove":  
					obj.click(function(){ $(domId).remove(); return false; });
					break;
				case "fadeOut": 
					obj.click(function(){ $(domId).fadeOut('fast'); return false; });
					break;
				case "fadeIn":  
					obj.click(function(){ $(domId).fadeIn('fast'); return false; });
					break;
				case "focus":   
					obj.click(function(){ $(domId).focus(); return false; });
					break;
				case "clear":   
					obj.click(function(){ $(domId).attr('value',''); return false; });
					break;
				case "submit":  
					obj.click(function(){ $(domId).submit(); return false; });
					break;
			}
		};
		
		return this;
		
	};

})(jQuery); 