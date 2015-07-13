/*
* COPYRIGHT 2011 Jobvite, Inc. All rights reserved. This copyright notice is Copyright Management 
* Information under 17 USC 1202 and is included to protect this work and deter copyright infringement.  
* Removal or alteration of this Copyright Management Information without the express written permission 
* of Jobvite, Inc. is prohibited, and any such unauthorized removal or alteration will be a violation of 
* federal law.
*/
/***********************************************************************************************************************
DOCUMENT: includes/javascript.js
DEVELOPED BY: Ryan Stemkoski
COMPANY: Zipline Interactive
EMAIL: ryan@gozipline.com
PHONE: 509-321-2849
DATE: 3/26/2009
UPDATED: 3/25/2010
DESCRIPTION: This is the JavaScript required to create the accordion style menu.  Requires jQuery library
NOTE: Because of a bug in jQuery with IE8 we had to add an IE stylesheet hack to get the system to work in all browsers. I hate hacks but had no choice :(.
************************************************************************************************************************/
/*$(document).ready(function() {
	 
	//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accordionButton').live('click', function() {
		if( $(this).hasClass("on") )
			return;
		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton').removeClass('on');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContent').slideUp('normal');
   
   		//ADD THE ON CLASS TO THE BUTTON
		$(this).addClass('on jv-roundTop jv-roundBottom');
   		
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			
			  
			//OPEN THE SLIDE
			var me = this;
			setTimeout(function(){
				$(me).next().slideDown('slow');	
			},500);
			
		 }		  
	 });
		
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	//$('.accordionContent').hide();

//});

/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */

;(function($) {
	
$.fn.extend({
	autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);
		
		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };
		
		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);
	
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	$.browser.opera && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
	
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {
		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});
	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		
		var v = selected.result;
		previousValue = v;
		
		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				var cursorAt = $(input).selection().start;
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				words[wordAt] = v;
				// TODO this should set the cursor to the right position, but it gets overriden somewhere
				//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
				v = words.join( options.multipleSeparator );
			}
			v += options.multipleSeparator;
		}
		
		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}
	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = $(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}
	
	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){
			
			var extraParams = {
				timestamp: +new Date()
			};
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});
			
			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					q: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};
	
	function parse(data) {
		var parsed = [];
		//var rows = data.split("\n");
		var rows = eval('('+data+')');
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {		
//		myregexp = eval('/(?:^|;)\\s*(\\d+)\\s*:[^;]*?' + term + '[^;]*/gi');
//		match = myregexp.exec(search_string);
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;
	
	function matchSubset(s, sub) {
		if (!options.matchCase) 
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};
	
	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){ 
			length++;
		}
		data[q] = value;
	}
	
	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;
		
		// track all options for minChars = 0
		stMatchSets[""] = [];
		
		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;
			
			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;
				
			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] ) 
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};
			
			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}
	
	// populate any existing data
	setTimeout(populate, 25);
	
	function flush(){
		data = {};
		length = 0;
	}
	
	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/* 
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}				
				return csub;
			} else 
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};
	
	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;
	
	// Create results
	function init() {
		if (!needsInit)
			return;
		element = $("<div/>")
		.hide()
		.addClass(options.resultsClass)
		.css("position", "absolute")
		.appendTo(document.body);
	
		list = $("<ul/>").appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);            
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});
		
		if( options.width > 0 )
			element.css("width", options.width);
			
		needsInit = false;
	} 
	
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
	
	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}
	
	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
			$.data(li, "ac_data", data[i]);
		}
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}
	
	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if($.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

})(jQuery);



/*
 FCBKcomplete 2.6.1
 - Jquery version required: 1.2.x, 1.3.x
 
 Changelog:
 
 - 2.00	new version of fcbkcomplete
 
 - 2.01 fixed bugs & added features
 		fixed filter bug for preadded items
 		focus on the input after selecting tag
 		the element removed pressing backspace when the element is selected
 		input tag in the control has a border in IE7
 		added iterate over each match and apply the plugin separately
 		set focus on the input after selecting tag
 
 - 2.02 fixed fist element selected bug
 		fixed defaultfilter error bug
 
 - 2.5 	removed selected="selected" attribute due ie bug
 		element search algorithm changed
 		better performance fix added
 		fixed many small bugs
 		onselect event added
 		onremove event added
 		
 - 2.6 	ie6/7 support fix added
 		added new public method addItem due request
 		added new options "firstselected" that you can set true/false to select first element on dropdown list
 		autoexpand input element added
 		removeItem bug fixed
 		and many more bug fixed

 - 2.6.1
 		fixed public method to use it $("elem").trigger("addItem",[{"title": "test", "value": "test"}]);
 */

/* Coded by: emposha <admin@emposha.com> */
/* Copyright: Emposha.com <http://www.emposha.com/> - Distributed under MIT - Keep this message! */
/*
 * json_url         - url to fetch json object
 * cache       		- use cache
 * height           - maximum number of element shown before scroll will apear
 * newel            - show typed text like a element
 * firstselected	- automaticly select first element from dropdown
 * filter_case      - case sensitive filter
 * filter_selected  - filter selected items from list
 * complete_text    - text for complete page
 * maxshownitems	- maximum numbers that will be shown at dropdown list (less better performance)
 * onselect			- fire event on item select
 * onremove			- fire event on item remove
 */
 
jQuery(
    function ($) 
    {
	    $.fn.fcbkcomplete = function (opt) 
	    {
    		return this.each(function()
			{
		        function init()
		        {					
					//browser_msie = false;
		           createFCBK();       
	               preSet();
	               addInput(0);
				   //MODIFIED: initialize cache each time.
				   cache = new Array(); 
		        }
	        	
		        function createFCBK()
		        {	    
		           element.hide();
		           element.attr("multiple","multiple");
		           if (element.attr("name").indexOf("[]") == -1)
		           {
		           	   element.attr("name",element.attr("name")+"[]");
		           }
	        	   
		           holder = $(document.createElement("ul"));				   
	               holder.attr("class", "holder");
	               element.after(holder);
	               
	               complete = $(document.createElement("div"));
	               complete.addClass("facebook-auto");
	               //complete.append('<div class="default">'+ options.complete_text +"</div>");
	               
				   if (browser_msie)
	               {
	                    complete.append('<iframe class="ie6fix" scrolling="no" frameborder="0"></iframe>');
	                    browser_msie_frame = complete.children('.ie6fix');						
	               }
				   
	               feed = $(document.createElement("ul"));
	               feed.attr("id", elemid + "_feed");
	               
	               complete.prepend(feed);
	               holder.after(complete);				   
				   //MODIFIED: This is causing problems -> feed.css("width",complete.width());
				   feed.css({"width":"512px", "left":"0px"});
		        }
	        	
		        function preSet()
		        {										
		            element.children("option").each( 
		                function(i,option) 
		                {									                    
							option = $(option);												
		                    if (option.hasClass("selected"))
		                    {																															
		                        addItem (option.text(), option.val(), true);
								option.attr("selected","selected");
		                    } 
							else
							{
								option.removeAttr("selected");	
							}

							cache.push({
								caption: option.text(),
								value: option.val()
							});
							search_string += "" + (cache.length - 1) + ":" + option.text() + ";";                
		                }
		            );
		        }
				
				//public method to add new item
				$(this).bind("addItem", function(event, data )
				{
					addItem(data.title, data.value, null, data.ifTrigger );
				});

				//MODIFIED: public method to remove item
				$(this).bind("removeItem", function(event, item )
				{					
					removeItem( $(item.element), item.ifTrigger );
				});
	        	
				var templateObj = {
					"0":"<img class='jv-iconTemplate icon-fb' src='"+ JV.process.Url["TRANSPARENT_IMG"] +"' />",
					"1":"<img class='jv-iconTemplate icon-li' src='"+ JV.process.Url["TRANSPARENT_IMG"] +"' />",
					"2":"<img class='jv-iconTemplate icon-tw' src='"+ JV.process.Url["TRANSPARENT_IMG"] +"' />",
					"29":"<img class='jv-iconTemplate icon-ol' src='"+ JV.process.Url["TRANSPARENT_IMG"] +"' />",
					"6":"<img class='jv-iconTemplate icon-gm' src='"+ JV.process.Url["TRANSPARENT_IMG"] +"' />",
					"30":"<img class='jv-iconTemplate icon-yahoo' src='"+ JV.process.Url["TRANSPARENT_IMG"] +"' />"	
				}
				
		        function addItem (title, value, preadded, iftrigger)
		        {				
	                var li = document.createElement("li");
	                //var txt = document.createTextNode(title);					
	                var aclose = document.createElement("a");
					// get the platform
					var platform = value.split("_")[1];
					
					// as the limit for addding the contact has been reached so we can not add more contacts to the name container.
					if(!options.callBeforeAdd(platform, value ) && !preadded ){						
						return;
					}
					
					// strip out the Source from the title.					
					var pos = title.lastIndexOf(",");
					if( pos != -1 ){
						title = title.substring( 0, pos );
					}
						
					
					var _name = "<span style='float: left'>"+ title +"</span>"+ templateObj[ platform ];
					
					       
	                
	                $(li).attr({"class": "bit-box bit-box-"+options.nameContainer, "rel": value});
	                //$(li).prepend(txt);
					$(li).prepend(_name);        
	                $(aclose).attr({"class": "closebutton","href": "#"});
	                
	                li.appendChild(aclose);
	                holder.append(li);
	                
	                $(aclose).click(
	                    function(){
	                        $(this).parent("li").fadeOut("fast", 
	                            function(){
									removeItem($(this));	                                
	                            }
	                        );
	                        return false;
	                    }
	                );
	                
	                if (!preadded) 
	                {	
	                    $("#"+elemid + "_annoninput").remove();
						var _item;
	                    addInput(1);                        
	                    if (element.children("option[value=" + value + "]").length)
	                    {   
							_item = element.children("option[value=" + value + "]");            
	                        _item.get(0).setAttribute("selected", "selected");
							if (!_item.hasClass("selected")) 
							{
								_item.addClass("selected");
							}
	                    }
	                    else
	                    {
	                        var _item = $(document.createElement("option"));
	                        _item.attr("value", value).get(0).setAttribute("selected", "selected");
							_item.attr("value", value).addClass("selected");
	                        _item.text(title);              
	                        element.append(_item);
	                    }
						if (options.onselect.length)
						{
							funCall(options.onselect,_item)
						}	
	                }					     
	                holder.children("li.bit-box.deleted").removeClass("deleted");
	                feed.hide();
					browser_msie?browser_msie_frame.hide():'';
					if( iftrigger != false ){
						options.callback_add( value );	
					}
					
	            }
	        	
				function removeItem(item, iftrigger )
				{		
					// Get the unique identifier of the element removed from the input box.
					var id = item.attr("rel");			
					
					if (options.onremove.length)
					{
					    var _item = element.children("option[value=" + item.attr("rel") + "]");
						funCall(options.onremove,_item)
					}
					element.children("option[value=" + item.attr("rel") + "]").removeAttr("selected");
					element.children("option[value=" + item.attr("rel") + "]").removeClass("selected");
                    item.remove();					
					deleting = 0;	
					
					// feed the input into the callback if required.
					if( iftrigger != false ){
						options.callback_remove(id);	
					}
					
					// Also remove the element from the tracking container.				
				}
				
		        function addInput(focusme)
		        {
		            var li = $(document.createElement("li"));
	                var input = $(document.createElement("input"));
	                
	                li.attr({"class": "bit-input","id": elemid + "_annoninput"});        
	                input.attr({"type": "text","class": "maininput","size": "1"});        
	                holder.append(li.append(input));
	                
	                input.focus(
	                    function()
	                    {
	                        complete.fadeIn("fast");
	                    }
	                );
	                
	                input.blur(
	                    function()
	                    {
	                        complete.fadeOut("fast");
	                    }
	                );
	                
	                holder.click(
	                    function()
	                    {
	                        input.focus();
				            if (feed.length && input.val().length) 
				            {
					            feed.show();
				            }
				            else 
				            {				
					            feed.hide();
								browser_msie?browser_msie_frame.hide():'';
					            complete.children(".default").show();
				            }
	                    }
	                );
	                
					input.keypress(
	                    function(event)
	                    {												
	                        if (event.keyCode == 13)
							{
							    return false;
							}
							//auto expand input							
							input.attr("size",input.val().length + 1);
	                    }
	                );
					
					input.keydown(
	                    function(event)
	                    {							
							//prevent to enter some bad chars when input is empty
							if(event.keyCode == 191)
							{								
								event.preventDefault();
								return false;
							}	                       					
	                    }
	                );
					
	                input.keyup(
	                    function(event)
	                    {
							var etext = xssPrevent(input.val());
														
							if (event.keyCode == 8 && etext.length == 0)
							{			
								feed.hide();
								browser_msie?browser_msie_frame.hide():'';				
								if (holder.children("li.bit-box.deleted").length == 0) 
								{
									holder.children("li.bit-box:last").addClass("deleted");
									return false;
								}
								else 
								{
									if (deleting)
								    {
								        return;
								    }
									deleting = 1;
									holder.children("li.bit-box.deleted").fadeOut("fast", function()
									{
										removeItem($(this));
										return false;
									});
								}
							}
							
	                        if (event.keyCode != 40 && event.keyCode != 38 && etext.length != 0) 
	                        {
	                            counter = 0;								
	                            if (options.json_url || options.json ) 
	                            {
	                                if (options.cache && json_cache) 
	                                {
	                                    addMembers(etext);
	                                    bindEvents();
	                                }
	                                else 
	                                {
	                                 	if(options.dataType == "local"){
											addMemberListener( etext, options.json );
										}
										else{
											$.getJSON(options.json_url + "?tag=" + etext, null, 
		                                        addMemberListener( etext, data )
		                                    );	
										}									    
	                                }
	                            }
	                            else 
	                            {
									addMembers(etext);
	                                bindEvents();
	                            }
	                            complete.children(".default").hide();
								feed.show();
	                        }
	                    }
	                );
					if (focusme)
					{
						setTimeout(function(){													
							input.focus();
							complete.children(".default").show();
						},1);
					}						    
		        }
	        	
				function addMemberListener( etext, data ){
					addMembers(etext, data);
                    json_cache = true;
                    bindEvents();
				}
				
				function addMembers(etext, data)
				{
					feed.html('');
					
					if (!options.cache) 
					{
						cache = new Array();
						search_string = "";
					}
					
					addTextItem(etext);
					
					if (data != null && data.length)
					{
						$.each(data, 
	                    	function(i, val)
	                    	{
								
								cache.push (
									{
										caption: val[options.caption],
										value: val[options.identifier]
									}
								);
								search_string += "" + (cache.length - 1) + ":" + val[options.caption] + ";";
							}
						);	
					}
					
					var maximum = options.maxshownitems<cache.length?options.maxshownitems:cache.length;
					var filter = "i";
					if (options.filter_case)
					{
						filter = ""; 
					}
					
					var myregexp, match;
					try {
						myregexp = eval('/(?:^|;)\\s*(\\d+)\\s*:[^;]*?' + etext + '[^;]*/g' + filter);
						match = myregexp.exec(search_string);
					} catch(ex){};
										
					var content = '';
					while (match != null && maximum > 0) 
					{
						var id = match[1];						
						var object = cache[id];	
						if (options.filter_selected && element.children("option[value=" + object.value + "]").hasClass("selected")) 
						{
							//nothing here...
						}
						else 
						{
							content += '<li rel="' + object.value + '">' + itemIllumination(object.caption, etext) + '</li>';
							counter++;
							maximum--;
						}						
						match = myregexp.exec(search_string);
					}
					feed.append(content);
					
					if (options.firstselected)
					{
					    focuson = feed.children("li:visible:first");
					    focuson.addClass("auto-focus");
					}
					
					if (counter > options.height) 
	                {
	                    feed.css({"height": (options.height * 24) + "px","overflow": "auto"});
						if (browser_msie)
	                    {
	                        browser_msie_frame.css({"height": (options.height * 24) + "px", "width": feed.width() + "px"}).show();
	                    }
	                }
	                else 
	                {
	                    feed.css("height", "auto");
						if (browser_msie)
	                    {
	                        browser_msie_frame.css({"height": feed.height() + "px", "width": feed.width() + "px"}).show();
	                    }
	                }				
				}
				
				function itemIllumination(text, etext)
				{
					if (options.filter_case) 
                    {     
						try {
							eval("var text = text.replace(/(.*)(" + etext + ")(.*)/gi,'$1<em>$2</em>$3');");
						} catch(ex){};
                    }
                    else 
                    {    
						try {
							eval("var text = text.replace(/(.*)(" + etext.toLowerCase() + ")(.*)/gi,'$1<em>$2</em>$3');");
						}catch(ex){};
                    }					
					return text;
				}
	        	
		        function bindFeedEvent() 
		        {		
			        feed.children("li").mouseover(
			            function()
			            {
				            feed.children("li").removeClass("auto-focus");
	                        $(this).addClass("auto-focus");
	                        focuson = $(this);
	                    }
	                );
	        		
			        feed.children("li").mouseout(
			            function()
			            {
	                        $(this).removeClass("auto-focus");
	                        focuson = null;
	                    }
	                );
		        }
	        	
		        function removeFeedEvent() 
		        {       	
			        feed.children("li").unbind("mouseover");	
			        feed.children("li").unbind("mouseout");
			        feed.mousemove(
			            function () 
			            {
				            bindFeedEvent();
				            feed.unbind("mousemove");
			            }
			        );	
		        }
	        	
		        function bindEvents()
		        {
		            var maininput = $("#"+elemid + "_annoninput").children(".maininput");	                 	
	       	        bindFeedEvent();      	
	                feed.children("li").unbind("mousedown");        
	                feed.children("li").mousedown( 
	                    function()
	                    {
	                        var option = $(this);
	                        addItem(option.text(),option.attr("rel"));
	                        feed.hide();
							browser_msie?browser_msie_frame.hide():'';
	                        complete.hide();
	                    }
	                );
	                
	                maininput.unbind("keydown");
	                maininput.keydown(
	                    function(event)
	                    {		
							if(event.keyCode == 191)
							{								
								event.preventDefault();
								return false;
							}
												
							if (event.keyCode != 8) 
							{
								holder.children("li.bit-box.deleted").removeClass("deleted");
							}
							
	                        if (event.keyCode == 13 && checkFocusOn()) 
	                        {
	                            var option = focuson;
	                            addItem(option.text(), option.attr("rel"));								
	                            complete.hide();
	                            event.preventDefault();
								focuson = null;
								return false;
	                        }
							
							if (event.keyCode == 13 && !checkFocusOn()) 
	                        {
								if (options.newel) 
								{
									var value = xssPrevent($(this).val());
									addItem(value, value);
									complete.hide();
									event.preventDefault();
									focuson = null;
								}
								return false;							
	                        }
	                        
	                        if (event.keyCode == 40) 
	                        {               
					            removeFeedEvent();
	                            if (focuson == null || focuson.length == 0) 
	                            {
	                                focuson = feed.children("li:visible:first");
						            feed.get(0).scrollTop = 0;
	                            }
	                            else 
	                            {
	                                focuson.removeClass("auto-focus");
	                                focuson = focuson.nextAll("li:visible:first");
						            var prev = parseInt(focuson.prevAll("li:visible").length,10);
						            var next = parseInt(focuson.nextAll("li:visible").length,10);
						            if ((prev > Math.round(options.height /2) || next <= Math.round(options.height /2)) && typeof(focuson.get(0)) != "undefined") 
						            {
							            feed.get(0).scrollTop = parseInt(focuson.get(0).scrollHeight,10) * (prev - Math.round(options.height /2));
						            }
	                            }
					            feed.children("li").removeClass("auto-focus");
	                            focuson.addClass("auto-focus");
	                        }
	                        if (event.keyCode == 38) 
	                        {
					            removeFeedEvent();
	                            if (focuson == null || focuson.length == 0) 
	                            {
	                                focuson = feed.children("li:visible:last");
						            feed.get(0).scrollTop = parseInt(focuson.get(0).scrollHeight,10) * (parseInt(feed.children("li:visible").length,10) - Math.round(options.height /2));
	                            }
	                            else 
	                            {
	                                focuson.removeClass("auto-focus");
	                                focuson = focuson.prevAll("li:visible:first");
						            var prev = parseInt(focuson.prevAll("li:visible").length,10);
						            var next = parseInt(focuson.nextAll("li:visible").length,10);
						            if ((next > Math.round(options.height /2) || prev <= Math.round(options.height /2)) && typeof(focuson.get(0)) != "undefined") 
						            {
							            feed.get(0).scrollTop = parseInt(focuson.get(0).scrollHeight,10) * (prev - Math.round(options.height /2));
						            }
	                            }
					            feed.children("li").removeClass("auto-focus");
	                            focuson.addClass("auto-focus");
	                        }													
	                    }
	                );
		        }
	        	
		        function addTextItem(value)
		        {					
	                if (options.newel) 
	                {
	                    feed.children("li[fckb=1]").remove();
	                    if (value.length == 0)
	                    {
	                    	return;
	                    }
	                    var li = $(document.createElement("li"));
	                    li.attr({"rel": value,"fckb": "1"}).html(value);
	                    feed.prepend(li);
				        counter++;
	                } else 
					{
						return;
					}
	            }
	        	
				function funCall(func,item)
				{	
					var _object = "";			
					for(i=0;i < item.get(0).attributes.length;i++)
					{	
						if (item.get(0).attributes[i].nodeValue != null) 
						{
							_object += "\"_" + item.get(0).attributes[i].nodeName + "\": \"" + item.get(0).attributes[i].nodeValue + "\",";
						}
					}
					_object = "{"+ _object + " notinuse: 0}";
					try {
						eval(func + "(" + _object + ")");
					}catch(ex){};
				}
				
				function checkFocusOn()
		        {
		            if (focuson == null)
		            {
		                return false;
		            }
		            if (focuson.length == 0)
		            {
		                return false;
		            }
		            return true;
		        }
				
				function xssPrevent(string)
                {					
                    string = string.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
                    string = string.replace(/script(.*)/g, "");    
                    string = string.replace(/eval\((.*)\)/g, "");
                    string = string.replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '');
                    return string;
                }
				
		        var options = $.extend({
				        json_url: null,
						json: null,	// json that will get feeded into the library.
						callBeforeAdd: function(){		// This is for calling this function before we actually add that to the namespace 
										return true;
									},
				        cache: false,
				        height: "10",
				        newel: false,
						firstselected: false,
				        filter_case: false,
				        filter_hide: false,
				        complete_text: "Start to type...",
						maxshownitems:  30,
						onselect: "",
						onremove: "",
						dataType: "url",
						caption:"caption", // the text to search on and show in the drop down.
						identifier: "value",   // the unique identifier that will be appended as "rel" attribute in the selection.
						callback_add: function(){},
						callback_remove: function(){},
						nameContainer: "" 
			        }, opt);
	        	
		        //system variables
		        var holder     		= null;
		        var feed       		= null;
		        var complete   		= null;
		        var counter    		= 0;
		        var cache      		= new Array();
				var json_cache		= false;
				var search_string	= "";
		        var focuson    		= null;
	        	var deleting		= 0;
				var browser_msie	= "\v"=="v";
				var browser_msie_frame;
				
		        var element = $(this);
		        var elemid = element.attr("id");
		        init();

		        return this;
			});
	    };
    }
);


/**
 *  MultiFriendSelector
 *  A jQuery-based multi-friend selector control.
 *
 *  By Eston Bond (eston@socialuxe.com)
 *  Copyright (c) 2009 Eston Bond.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 *  @author eston
 *  @requires jquery-1.3.2
 *  @provides multifriendselector
**/

(function($) {
  
  // class globals
  var $this = null;
  var options = null;
  var people = [];
  var selected = [];
  
  // making ID arrays to make searching faster at the expense of first load
  var ids_people = [];
  var ids_selected = [];
  var ids_excluded = [];

  // maintaining references to common elements
  var $form = null;
  var $friendsBox = null;
  var $loadingBox = null;
  var $selectedBox = null;
  var $selectedInput = null;

  // public:  
  $.fn.multifriendselector = function(incomingOptions) {
    options = $.extend({}, $.fn.multifriendselector.defaultOptions, incomingOptions);
    $this = $(this);
    ids_excluded = options.exclude_ids;
    
    if (!options.id) {
      if (options.development_mode) {
        debug('MultiFriendSelector: No ID has been specified.');
      }
      return false;
    }
    
    // inject the layout here
    if (options.development_mode) {
      injectLayout($this);
    } else {
      $this.append($(composeLayout()));
      
      $form = $this.find('form.socialuxe-MFS');
      $friendsBox = $this.find('div.socialuxe-MFS-friends');
      $selectedBox = $this.find('div.socialuxe-MFS-friendsSelected');
      $loadingBox = $this.find('div.socialuxe-MFS-loading');
      $selectedInput = $this.find('input.socialuxe-MFS-selectedID');
      
      // attach events to links for toggling between boxes
      $this.find('a.socialuxe-MFS-friendsLink')
           .bind('click.MFS', handleFriendsLinkClick);

      $this.find('a.socialuxe-MFS-selectedLink')
           .bind('click.MFS', handleSelectedLinkClick);
           
      // inject skip link hrefs
      $this.find('a.socialuxe-MFS-skipLink').attr('href', options.bypass_url);
      
      // attach event for submission
      $form.attr('action', options.action_url);
      $form.bind('submit.MFS', handleFormSubmission);
    }
    $friendsBox = $this.find('div.socialuxe-MFS-friends');
    $selectedBox = $this.find('div.socialuxe-MFS-friendsSelected');
    $loadingBox = $this.find('div.socialuxe-MFS-loading');
    
    // we have an id, go ahead and get the proper data for the view present
    $.fn.multifriendselector.getData(options.id, options.friend_type,
       function() {
          populateFriendsBox();
       }); // end async
  }
  
  $.fn.multifriendselector.defaultOptions = {
    action_url: '/',
    actiontext: 'Select friends to invite',
    actiongraf: 'Select your friends to invite to this service.',
    async_post: true,
    async_post_url: null,
	callBeforeAdd: function( ){
						return true;
					},
    async_post_success_callback: function() { },
    async_post_error_callback: function() { },
    bypass: '',
    bypass_url: '/',
    development_mode: false,
    exclude_ids: [],
    friend_type: 'friends',
    id: null,
    limit: 100,
    mfs_id: '',
	dataType: "url",
	userName: "screen_name",
	userImage:"profile_image_url",
	uniqueID:"id",
	title:"",
	callback_add: function(){},
	callback_remove: function(){}
  }
  
  $.fn.multifriendselector.getData = function(id, type, callback, page) {
    var endpoint = 'http://twitter.com/statuses/' + type + '/' + id + '.json?'
                 + 'callback=?';
    if (!callback) {
      callback = function() { };
    }
	
    if (!page) {
      page = 1;
    }
	
	if( options.dataType != "local"){
		$.getJSON(endpoint, function(data){
			prepareData(data, callback)
		});	
	}
	else{
		if(options.json){
			prepareData( options.json, callback );	
		}		
	}
    
  }
  
  $.fn.multifriendselector.postForm = function(idString, errorCallback) {
    var endpoint;
    if (options.async_post_url)  {
      endpoint = options.async_post_url;
    } else {
      endpoint = options.action_url;
    }
    
    var idString = $selectedInput.val();
    $.post(endpoint, {selected: idString},
           function(data, textStatus) {
             if (textStatus == 'success') {
               options.async_post_success_callback();
             } else {
               options.async_post_error_callback();
             }
           });
  }
  
  
  
  function prepareData(data, callback) {
    // push all received data to the selector
	people = [];
	ids_people = [];		
  	selected = [];
	ids_selected = [];	
    if (data.length > 0) {
		// put the limit to the data length
	var limit = data.length;
	  var i = data.length;	  
      do {
        try {
          if (people.length < limit) {
            people.push(data[i-1]);
            ids_people.push(data[i-1].id);
          }
        } catch (e) { }
      } while (--i);
    }   
	callback();
  }
  
  // private:
  /**
   *  Convenience Functions
   *  Convenience functions for array searches, debugging, &c.
  **/
  function array_find(needle, haystack) {
    if (haystack.length > 0) {
      var i = haystack.length;
      do {
        if (haystack[i-1] == needle) {
          return true;
        }
      } while (--i);
    }
    return false;
  }
  
  function array_remove(needle, haystack) {
    var position = null;
    if (haystack.length > 0) {
      var i = haystack.length;
      if (haystack[0] == needle) {
        position = 0;
      } else {
        do {
          if (haystack[i] == needle) {
            position = i;
          }
        } while (--i);
      }
    }
    if (position !== null) {
      haystack.splice(position, 1);
    }
  }
  
  function debug(mixed) {
    try {
      if (typeof console.log == 'function') {
        console.log(mixed);
      }
    }
    catch (e) { }
  }
  
  function userExists(id) {
    array_find(id, ids_people);
  }
  
  function userIsExcluded(id) {
    array_find(id, ids_excluded);
  }
  
  function userIsSelected(id) {
    array_find(id, ids_selected);
  }
  
  
  
  
  /**
   *  DOM Manipulation
   *  These functions manipulate DOM elements within the MultiFriendSelector.
  **/
  function populateFriendsBox() {
    if (people.length > 0) {
      var i = people.length;
	  var elementsString = "";	  
      do {
	  	elementsString += composeUserBox(people[i-1]);
		
	  	/*  OLD Code unoptimized.
	  	 
        var elementsString = composeUserBox(people[i-1]);
        $friendsBox.append(elementsString);		
        
        // attach onclick element to box
        $(elementsString).bind('click.MFS click', function(e, iftrigger){			
			handleUserClick(e, iftrigger);
		});		
        
        // attach hover interactions to box
        $(elementsString).bind('mouseenter.MFS', handleUserMouseEnter);
        $(elementsString).bind('mouseleave.MFS', handleUserMouseLeave);
        */        
      }
      while (--i);	  
	    $friendsBox.html(elementsString);
		$friendsBox.show();
		$loadingBox.hide();		
	  	$(".socialuxe-MFS-user").bind('click.MFS click', function(e, iftrigger){				
			handleUserClick(e, iftrigger);
		});
		$(".socialuxe-MFS-user").bind('mouseenter.MFS', handleUserMouseEnter);
      	$(".socialuxe-MFS-user").bind('mouseleave.MFS', handleUserMouseLeave); 
					
      
      $this.find('span.socialuxe-MFS-populationCount')
           .html(people.length.toString());
    }else{
		// As the number of contacts in that case are 0;
		$this.find('span.socialuxe-MFS-populationCount')
           .html(0);
	}
  }
  
  function injectLayout($into) {
    $into.load('../dev/multifriendselector.html', {}, function() {
      $form = $this.find('form.socialuxe-MFS');
      $friendsBox = $this.find('div.socialuxe-MFS-friends');
      $selectedBox = $this.find('div.socialuxe-MFS-friendsSelected');
      $loadingBox = $this.find('div.socialuxe-MFS-loading');
      $selectedInput = $this.find('input.socialuxe-MFS-selectedID');
      
      // attach events to links for toggling between boxes
      $this.find('a.socialuxe-MFS-friendsLink')
           .bind('click.MFS', handleFriendsLinkClick);

      $this.find('a.socialuxe-MFS-selectedLink')
           .bind('click.MFS', handleSelectedLinkClick);
           
      // inject skip link hrefs
      $this.find('a.socialuxe-MFS-skipLink').attr('href', options.bypass_url);
      
      // attach event for submission
      $form.attr('action', options.action_url);
      $form.bind('submit.MFS', handleFormSubmission);
    });
  } 
  
  function selectUser($box, ifFireEvent) {
  	 	
    var id = getUserIDFromBox($box);
	if( !id ){
		return;
	}	
	if(!options.callBeforeAdd( id.split("_")[1], id ) && ifFireEvent != false ){
		// user can not add more contacts as the limit has reached.
		return;
	} 
    if (id) {
      // add as selected
      $box.addClass('selected');
    
      // clone user in selected tab
      $boxClone = $box.clone(true);
      $selectedBox.append($boxClone);
    
      // add user to selected IDs array
      if (id) {
        ids_selected.push(id);
      }
      updateSelectedInput();
    
      // update count
      $this.find('span.socialuxe-MFS-selectedCount')
           .html(ids_selected.length.toString());
           
      // Callback when the user is deselcted from the selector
	  if (ifFireEvent != false) {
	  	options["callback_add"](id);
	  }
    }
  }
  
  function deselectUser($box, ifFireEvent) {
    var id = getUserIDFromBox($box);
    if (id) {
      // remove selected class
      $box.removeClass('selected');
    
      // remove from selected tab
      $selectedBox.find('div.socialuxe-MFS-userid-' + id.toString()).remove();
    	
	// remove selection from contacts tab
	$('div.socialuxe-MFS-userid-' + id.toString()).removeClass('selected');	 
		
		
      // remove from selected IDs array
      array_remove(id, ids_selected);
      
      // update count
      $this.find('span.socialuxe-MFS-selectedCount')
           .html(ids_selected.length.toString());
      
      // update input box
      updateSelectedInput();
      
      if (ids_selected.length == 0) {
        $selectedBox.hide();
        $friendsBox.show();
      }
	  // Callback when the user is deselcted from the selector
	  if( ifFireEvent != false){
	  	options["callback_remove"](id);	
	  }
	  
    }
  }
  
  function getUserIDFromBox($box) {
    var classes = $box.attr('class');
    try {
      return classes.match(/socialuxe-MFS-userid-([0-9]+_[0-9]+)/)[1];
    }
    catch (e) {
      return null;
    }
  }  
  
  function updateSelectedInput() {
    var idString = ids_selected.join(',');
    $selectedInput.attr('value', idString);
  }
  
  
  /**
   *  Event Handlers
   *  These functions are event handlers for MultiFriendSelector functions.
  **/
  function handleFriendsLinkClick(e) {
  	
  	$(this).css({"font-weight": "normal"});
	$(".socialuxe-MFS-selectedLink").css({"font-weight": "bold"});
    if ($friendsBox.is(':hidden') && $loadingBox.is(':hidden')) {
      $selectedBox.hide();
      $friendsBox.show();
    }
    return false;
  }
  
  function handleFormSubmission(e) {
    // post this asynchronously?
    if (options.async_post) {
      e.preventDefault();
    }
    $.fn.multifriendselector.postForm($form);
  }
  
  function handleSelectedLinkClick(e) {
  	$(this).css({"font-weight": "normal"});
	$(".socialuxe-MFS-friendsLink").css({"font-weight": "bold"});
   if ($selectedBox.is(':hidden') && $loadingBox.is(':hidden')) {
     $friendsBox.hide();
     $selectedBox.show();
   } 
   return false;
  }
  
  function handleUserClick(e, ifFireEvent) {
    var $currentTarget = $(e.currentTarget);
    if ($currentTarget.hasClass('selected')) {
      deselectUser($currentTarget, ifFireEvent);	  	
    } else {
      selectUser($currentTarget, ifFireEvent);
    }
    return false;
  }
  
  function handleUserMouseEnter(e) {
    var $currentTarget = $(e.currentTarget);
    $currentTarget.addClass('hover');
  }
  
  function handleUserMouseLeave(e) {
    var $currentTarget = $(e.currentTarget);
    $currentTarget.removeClass('hover');
  }
  


  /**
   *  Display Code
   *  These functions are solely for rendering MultiFriendSelector boxes. Do 
   *  not add any further logic to these functions.
  **/
  
   
  function composeUserBox(user) {  
 	var _uImg = user[options["userImage"]];
  	var _uNme = user[options["userName"]];
  	var _uId = user[options["uniqueID"]]; 
	 	
	if( _uNme == "" ){
		_uImg = JV.process.Url["NO_IMAGE"];
	}
  	
    if (typeof _uNme != 'undefined' && 
        typeof _uId != 'undefined') {
      
      // exclude ID if need be
	  // MODIFIED: VA: not needed, expensive operation.
      //if (userIsExcluded(_uId)) { return ''; }
      
      var userMarkup = '<div class="socialuxe-MFS-user'
                     + ' socialuxe-MFS-userid-' + _uId;
      if (userIsSelected(_uId)) {
        userMarkup += ' selected';
      }
      userMarkup += '">';
      if (typeof _uImg != 'undefined') {
        userMarkup += '<img src="' + _uImg
                    + '" class="socialuxe-MFS-userImage" '
                    + 'alt="Image of ' + _uNme + '" />'
      }
	  var titleTemplate = "";
	  if(typeof user[options["title"]] != "undefined"){
		titleTemplate = '<p class="socialuxe-MFS-userText">'
                    	+ '<span class="socialuxe-MFS-userName">'
                    	+ user[options["title"]]
                    	+ '</span>'
                    	+ '</p>'
	  	
	  }
	  // TODO: Hack remove the lname that is a hack.
      userMarkup += '<p class="socialuxe-MFS-userText">'
                    + '<span class="socialuxe-MFS-userName"><b>'
                    + _uNme 
                    + '</b></span>'
                    + '</p>'
					+ titleTemplate + '</div>';
	  // NOTE: modifying to boost performance. return only xml.
	  return userMarkup; 				
      //return $(userMarkup);
    } 
    return '';
  }
  
  function composeLayout() {
    var mkup = '<form class="socialuxe-MFS"; ';
    
    if (options.mfs_id) {
      mkup += ' id="' + options.mfs_id + '" ';
    }
    
    mkup += 'method="post" action="' + options.action_url + '">'
         + '<input type="hidden" class="socialuxe-MFS-selectedID" name="selected" value="" />'
         + '<div class="socialuxe-MFS-head">';
    
     mkup += '</div>'
         /*
         + '<div class="socialuxe-MFS-search">'
         + '<label for="socialuxe-MFS-searchBox">Search friends</label>'
         + '<input type="text" class="socialuxe-MFS-searchBox" name="socialuxe-MFS-searchBox" />'
         + '</div>'
         */
         + '<div class="socialuxe-MFS-friendList">'
         + '<div class="socialuxe-MFS-friendFilterset">'
         + '<ul>'
         + '<li><a href="#" class="socialuxe-MFS-friendsLink"><span class="socialuxe-MFS-friendTypeCaption">Contacts</span>'
         + '(<span class="socialuxe-MFS-populationCount"></span>)</a></li>'
         + '<li><a href="#" class="socialuxe-MFS-selectedLink">Selected (<span class="socialuxe-MFS-selectedCount">0</span>)</a></li>'
         + '</ul>'
         + '</div>'
         + '<div class="socialuxe-MFS-loading">&nbsp;</div>'
         + '<div class="socialuxe-MFS-friends" style="display: none;"></div>'
         + '<div class="socialuxe-MFS-friendsSelected" style="display: none;"></div>'
         + '</div>'
         + '<div class="socialuxe-MFS-actionItems">';
         
    if (options.bypass) {
      mkup += '<a href="' + options.bypass_url + '" class="socialuxe-MFS-skipLink">' + options.bypass + '</a>'
    }
    
    mkup += '</div>'
         + '</form>';
    
    return mkup;
  }
  
})(jQuery);



/*
* jQuery Watermark Plugin (v1.0.0)
*   http://updatepanel.net/2009/04/17/jquery-watermark-plugin/
*
* Copyright (c) 2009 Ting Zwei Kuei
*
* Dual licensed under the MIT and GPL licenses.
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.opensource.org/licenses/gpl-3.0.html
*/
(function($) {
    $.fn.updnWatermark = function(options) {
        options = $.extend({}, $.fn.updnWatermark.defaults, options);
        return this.each(function() {
            var $input = $(this);
			// Checks to see if watermark already applied.
            var $watermark = $input.data("updnWatermark");
            // Only create watermark if title attribute exists
            if (!$watermark && this.title) {
				// Inserts a span and set as positioning context
                var $watermark = $("<span/>")
					.addClass(options.cssClass)
                    .insertBefore(this)
                    .hide()
					.bind("show", function() {
                        $(this).children().fadeIn("fast");
                    })
                    .bind("hide", function() {
                        $(this).children().hide();
                    });
				// Positions watermark label relative to positioning context
				$("<label/>").appendTo($watermark)
                    .text(this.title)
                    .attr("for", this.id);
				// Associate input element with watermark plugin.
                $input.data("updnWatermark", $watermark);
            }
			// Hook up blur/focus handlers to show/hide watermark.
            if ($watermark) {
                $input
                    .focus(function(ev) {
                        $watermark.trigger("hide");
                    })
                    .blur(function(ev) {
                        if (!$(this).val()) {
                            $watermark.trigger("show");
                        }
                    });
                // Sets initial watermark state.
                if (!$input.val()) {
                    $watermark.show();
                }
            }
        });
    };
    $.fn.updnWatermark.defaults = {
        cssClass: "updnWatermark"
    };
    $.updnWatermark = {
        attachAll: function(options) {
			$("input:text[title!=''],input:password[title!=''],textarea[title!='']").updnWatermark(options);
        }
    };
})(jQuery);










/*
 * jQuery delegate plug-in v1.0
 *
 * Copyright (c) 2007 Jörn Zaefferer
 *
 * $Id: jquery.delegate.js 4786 2008-02-19 20:02:34Z joern.zaefferer $
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jQuery-object for event.target 

// provides triggerEvent(type: String, target: Element) to trigger delegated events
;(function($) {
	$.each({
		focus: 'focusin',
		blur: 'focusout'	
	}, function( original, fix ){
		$.event.special[fix] = {
			setup:function() {
				if ( $.browser.msie ) return false;
				this.addEventListener( original, $.event.special[fix].handler, true );
			},
			teardown:function() {
				if ( $.browser.msie ) return false;
				this.removeEventListener( original,
				$.event.special[fix].handler, true );
			},
			handler: function(e) {
				arguments[0] = $.event.fix(e);
				arguments[0].type = fix;
				return $.event.handle.apply(this, arguments);
			}
		};
	});

	$.extend($.fn, {
		delegate: function(type, delegate, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		},
		triggerEvent: function(type, target) {
			return this.triggerHandler(type, [jQuery.event.fix({ type: type, target: target })]);
		}
	})
})(jQuery);




/* Copyright (c) 2007 Paul Bakaus (paul.bakaus@googlemail.com) and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-06-22 04:38:37 +0200 (Fr, 22 Jun 2007) $
 * $Rev: 2141 $
 *
 * Version: 1.0b2
 */

(function($){

// store a copy of the core height and width methods
var height = $.fn.height,
    width  = $.fn.width;

$.fn.extend({
	/**
	 * If used on document, returns the document's height (innerHeight)
	 * If used on window, returns the viewport's (window) height
	 * See core docs on height() to see what happens when used on an element.
	 *
	 * @example $("#testdiv").height()
	 * @result 200
	 *
	 * @example $(document).height()
	 * @result 800
	 *
	 * @example $(window).height()
	 * @result 400
	 *
	 * @name height
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	height: function() {
		if ( this[0] == window )
			return self.innerHeight ||
				$.boxModel && document.documentElement.clientHeight || 
				document.body.clientHeight;
		
		if ( this[0] == document )
			return Math.max( document.body.scrollHeight, document.body.offsetHeight );
		
		return height.apply(this, arguments);
	},
	
	/**
	 * If used on document, returns the document's width (innerWidth)
	 * If used on window, returns the viewport's (window) width
	 * See core docs on height() to see what happens when used on an element.
	 *
	 * @example $("#testdiv").width()
	 * @result 200
	 *
	 * @example $(document).width()
	 * @result 800
	 *
	 * @example $(window).width()
	 * @result 400
	 *
	 * @name width
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	width: function() {
		if ( this[0] == window )
			return self.innerWidth ||
				$.boxModel && document.documentElement.clientWidth ||
				document.body.clientWidth;

		if ( this[0] == document )
			return Math.max( document.body.scrollWidth, document.body.offsetWidth );

		return width.apply(this, arguments);
	},
	
	/**
	 * Returns the inner height value (without border) for the first matched element.
	 * If used on document, returns the document's height (innerHeight)
	 * If used on window, returns the viewport's (window) height
	 *
	 * @example $("#testdiv").innerHeight()
	 * @result 800
	 *
	 * @name innerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	innerHeight: function() {
		return this[0] == window || this[0] == document ?
			this.height() :
			this.is(':visible') ?
				this[0].offsetHeight - num(this, 'borderTopWidth') - num(this, 'borderBottomWidth') :
				this.height() + num(this, 'paddingTop') + num(this, 'paddingBottom');
	},
	
	/**
	 * Returns the inner width value (without border) for the first matched element.
	 * If used on document, returns the document's Width (innerWidth)
	 * If used on window, returns the viewport's (window) width
	 *
	 * @example $("#testdiv").innerWidth()
	 * @result 1000
	 *
	 * @name innerWidth
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	innerWidth: function() {
		return this[0] == window || this[0] == document ?
			this.width() :
			this.is(':visible') ?
				this[0].offsetWidth - num(this, 'borderLeftWidth') - num(this, 'borderRightWidth') :
				this.width() + num(this, 'paddingLeft') + num(this, 'paddingRight');
	},
	
	/**
	 * Returns the outer height value (including border) for the first matched element.
	 * Cannot be used on document or window.
	 *
	 * @example $("#testdiv").outerHeight()
	 * @result 1000
	 *
	 * @name outerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	outerHeight: function() {
		return this[0] == window || this[0] == document ?
			this.height() :
			this.is(':visible') ?
				this[0].offsetHeight :
				this.height() + num(this,'borderTopWidth') + num(this, 'borderBottomWidth') + num(this, 'paddingTop') + num(this, 'paddingBottom');
	},
	
	/**
	 * Returns the outer width value (including border) for the first matched element.
	 * Cannot be used on document or window.
	 *
	 * @example $("#testdiv").outerHeight()
	 * @result 1000
	 *
	 * @name outerHeight
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	outerWidth: function() {
		return this[0] == window || this[0] == document ?
			this.width() :
			this.is(':visible') ?
				this[0].offsetWidth :
				this.width() + num(this, 'borderLeftWidth') + num(this, 'borderRightWidth') + num(this, 'paddingLeft') + num(this, 'paddingRight');
	},
	
	/**
	 * Returns how many pixels the user has scrolled to the right (scrollLeft).
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollLeft()
	 * @result 100
	 *
	 * @name scrollLeft
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	/**
	 * Sets the scrollLeft property and continues the chain.
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollLeft(10).scrollLeft()
	 * @result 10
	 *
	 * @name scrollLeft
	 * @param Number value A positive number representing the desired scrollLeft.
	 * @type jQuery
	 * @cat Plugins/Dimensions
	 */
	scrollLeft: function(val) {
		if ( val != undefined )
			// set the scroll left
			return this.each(function() {
				if (this == window || this == document)
					window.scrollTo( val, $(window).scrollTop() );
				else
					this.scrollLeft = val;
			});
		
		// return the scroll left offest in pixels
		if ( this[0] == window || this[0] == document )
			return self.pageXOffset ||
				$.boxModel && document.documentElement.scrollLeft ||
				document.body.scrollLeft;
				
		return this[0].scrollLeft;
	},
	
	/**
	 * Returns how many pixels the user has scrolled to the bottom (scrollTop).
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollTop()
	 * @result 100
	 *
	 * @name scrollTop
	 * @type Number
	 * @cat Plugins/Dimensions
	 */
	/**
	 * Sets the scrollTop property and continues the chain.
	 * Works on containers with overflow: auto and window/document.
	 *
	 * @example $("#testdiv").scrollTop(10).scrollTop()
	 * @result 10
	 *
	 * @name scrollTop
	 * @param Number value A positive number representing the desired scrollTop.
	 * @type jQuery
	 * @cat Plugins/Dimensions
	 */
	scrollTop: function(val) {
		if ( val != undefined )
			// set the scroll top
			return this.each(function() {
				if (this == window || this == document)
					window.scrollTo( $(window).scrollLeft(), val );
				else
					this.scrollTop = val;
			});
		
		// return the scroll top offset in pixels
		if ( this[0] == window || this[0] == document )
			return self.pageYOffset ||
				$.boxModel && document.documentElement.scrollTop ||
				document.body.scrollTop;

		return this[0].scrollTop;
	},
	
	/** 
	 * Returns the top and left positioned offset in pixels.
	 * The positioned offset is the offset between a positioned
	 * parent and the element itself.
	 *
	 * @example $("#testdiv").position()
	 * @result { top: 100, left: 100 }
	 * 
	 * @name position
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? False by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	position: function(options, returnObject) {
		var elem = this[0], parent = elem.parentNode, op = elem.offsetParent,
		    options = $.extend({ margin: false, border: false, padding: false, scroll: false }, options || {}),
			x = elem.offsetLeft,
			y = elem.offsetTop, 
			sl = elem.scrollLeft, 
			st = elem.scrollTop;
			
		// Mozilla and IE do not add the border
		if ($.browser.mozilla || $.browser.msie) {
			// add borders to offset
			x += num(elem, 'borderLeftWidth');
			y += num(elem, 'borderTopWidth');
		}

		if ($.browser.mozilla) {
			do {
				// Mozilla does not add the border for a parent that has overflow set to anything but visible
				if ($.browser.mozilla && parent != elem && $.css(parent, 'overflow') != 'visible') {
					x += num(parent, 'borderLeftWidth');
					y += num(parent, 'borderTopWidth');
				}

				if (parent == op) break; // break if we are already at the offestParent
			} while ((parent = parent.parentNode) && (parent.tagName.toLowerCase() != 'body' || parent.tagName.toLowerCase() != 'html'));
		}
		
		var returnValue = handleOffsetReturn(elem, options, x, y, sl, st);
		
		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	},
	
	/**
	 * Returns the location of the element in pixels from the top left corner of the viewport.
	 *
	 * For accurate readings make sure to use pixel values for margins, borders and padding.
	 * 
	 * Known issues:
	 *  - Issue: A div positioned relative or static without any content before it and its parent will report an offsetTop of 0 in Safari
	 *    Workaround: Place content before the relative div ... and set height and width to 0 and overflow to hidden
	 *
	 * @example $("#testdiv").offset()
	 * @result { top: 100, left: 100, scrollTop: 10, scrollLeft: 10 }
	 *
	 * @example $("#testdiv").offset({ scroll: false })
	 * @result { top: 90, left: 90 }
	 *
	 * @example var offset = {}
	 * $("#testdiv").offset({ scroll: false }, offset)
	 * @result offset = { top: 90, left: 90 }
	 *
	 * @name offset
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? True by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @option Boolean scroll Should the scroll offsets of the parent elements be included in the calculations? True by default.
	 *                        When true it adds the totla scroll offets of all parents to the total offset and also adds two properties
	 *                        to the returned object, scrollTop and scrollLeft. 
	 * @options Boolean lite Will use offsetLite instead of offset when set to true. False by default.
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	offset: function(options, returnObject) {
		var x = 0, y = 0, sl = 0, st = 0,
		    elem = this[0], parent = this[0], op, parPos, elemPos = $.css(elem, 'position'),
		    mo = $.browser.mozilla, ie = $.browser.msie, sf = $.browser.safari, oa = $.browser.opera,
		    absparent = false, relparent = false, 
		    options = $.extend({ margin: true, border: false, padding: false, scroll: true, lite: false }, options || {});
		
		// Use offsetLite if lite option is true
		if (options.lite) return this.offsetLite(options, returnObject);
		
		if (elem.tagName.toLowerCase() == 'body') {
			// Safari is the only one to get offsetLeft and offsetTop properties of the body "correct"
			// Except they all mess up when the body is positioned absolute or relative
			x = elem.offsetLeft;
			y = elem.offsetTop;
			// Mozilla ignores margin and subtracts border from body element
			if (mo) {
				x += num(elem, 'marginLeft') + (num(elem, 'borderLeftWidth')*2);
				y += num(elem, 'marginTop')  + (num(elem, 'borderTopWidth') *2);
			} else
			// Opera ignores margin
			if (oa) {
				x += num(elem, 'marginLeft');
				y += num(elem, 'marginTop');
			} else
			// IE does not add the border in Standards Mode
			if (ie && jQuery.boxModel) {
				x += num(elem, 'borderLeftWidth');
				y += num(elem, 'borderTopWidth');
			}
		} else {
			do {
				parPos = $.css(parent, 'position');
			
				x += parent.offsetLeft;
				y += parent.offsetTop;

				// Mozilla and IE do not add the border
				if (mo || ie) {
					// add borders to offset
					x += num(parent, 'borderLeftWidth');
					y += num(parent, 'borderTopWidth');

					// Mozilla does not include the border on body if an element isn't positioned absolute and is without an absolute parent
					if (mo && parPos == 'absolute') absparent = true;
					// IE does not include the border on the body if an element is position static and without an absolute or relative parent
					if (ie && parPos == 'relative') relparent = true;
				}

				op = parent.offsetParent;
				if (options.scroll || mo) {
					do {
						if (options.scroll) {
							// get scroll offsets
							sl += parent.scrollLeft;
							st += parent.scrollTop;
						}
				
						// Mozilla does not add the border for a parent that has overflow set to anything but visible
						if (mo && parent != elem && $.css(parent, 'overflow') != 'visible') {
							x += num(parent, 'borderLeftWidth');
							y += num(parent, 'borderTopWidth');
						}
				
						parent = parent.parentNode;
					} while (parent != op);
				}
				parent = op;

				if (parent.tagName.toLowerCase() == 'body' || parent.tagName.toLowerCase() == 'html') {
					// Safari and IE Standards Mode doesn't add the body margin for elments positioned with static or relative
					if ((sf || (ie && $.boxModel)) && elemPos != 'absolute' && elemPos != 'fixed') {
						x += num(parent, 'marginLeft');
						y += num(parent, 'marginTop');
					}
					// Mozilla does not include the border on body if an element isn't positioned absolute and is without an absolute parent
					// IE does not include the border on the body if an element is positioned static and without an absolute or relative parent
					if ( (mo && !absparent && elemPos != 'fixed') || 
					     (ie && elemPos == 'static' && !relparent) ) {
						x += num(parent, 'borderLeftWidth');
						y += num(parent, 'borderTopWidth');
					}
					break; // Exit the loop
				}
			} while (parent);
		}

		var returnValue = handleOffsetReturn(elem, options, x, y, sl, st);

		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	},
	
	/**
	 * Returns the location of the element in pixels from the top left corner of the viewport.
	 * This method is much faster than offset but not as accurate. This method can be invoked
	 * by setting the lite option to true in the offset method.
	 *
	 * @name offsetLite
	 * @param Map options Optional settings to configure the way the offset is calculated.
	 * @option Boolean margin Should the margin of the element be included in the calculations? True by default.
	 * @option Boolean border Should the border of the element be included in the calculations? False by default.
	 * @option Boolean padding Should the padding of the element be included in the calculations? False by default.
	 * @option Boolean scroll Should the scroll offsets of the parent elements be included in the calculations? True by default.
	 *                        When true it adds the totla scroll offets of all parents to the total offset and also adds two properties
	 *                        to the returned object, scrollTop and scrollLeft. 
	 * @param Object returnObject An object to store the return value in, so as not to break the chain. If passed in the
	 *                            chain will not be broken and the result will be assigned to this object.
	 * @type Object
	 * @cat Plugins/Dimensions
	 */
	offsetLite: function(options, returnObject) {
		var x = 0, y = 0, sl = 0, st = 0, parent = this[0], op, 
		    options = $.extend({ margin: true, border: false, padding: false, scroll: true }, options || {});
				
		do {
			x += parent.offsetLeft;
			y += parent.offsetTop;

			op = parent.offsetParent;
			if (options.scroll) {
				// get scroll offsets
				do {
					sl += parent.scrollLeft;
					st += parent.scrollTop;
					parent = parent.parentNode;
				} while(parent != op);
			}
			parent = op;
		} while (parent && parent.tagName.toLowerCase() != 'body' && parent.tagName.toLowerCase() != 'html');

		var returnValue = handleOffsetReturn(this[0], options, x, y, sl, st);

		if (returnObject) { $.extend(returnObject, returnValue); return this; }
		else              { return returnValue; }
	}
});

/**
 * Handles converting a CSS Style into an Integer.
 * @private
 */
var num = function(el, prop) {
	return parseInt($.css(el.jquery?el[0]:el,prop))||0;
};

/**
 * Handles the return value of the offset and offsetLite methods.
 * @private
 */
var handleOffsetReturn = function(elem, options, x, y, sl, st) {
	if ( !options.margin ) {
		x -= num(elem, 'marginLeft');
		y -= num(elem, 'marginTop');
	}

	// Safari and Opera do not add the border for the element
	if ( options.border && ($.browser.safari || $.browser.opera) ) {
		x += num(elem, 'borderLeftWidth');
		y += num(elem, 'borderTopWidth');
	} else if ( !options.border && !($.browser.safari || $.browser.opera) ) {
		x -= num(elem, 'borderLeftWidth');
		y -= num(elem, 'borderTopWidth');
	}

	if ( options.padding ) {
		x += num(elem, 'paddingLeft');
		y += num(elem, 'paddingTop');
	}
	
	// do not include scroll offset on the element
	if ( options.scroll ) {
		sl -= elem.scrollLeft;
		st -= elem.scrollTop;
	}

	return options.scroll ? { top: y - st, left: x - sl, scrollTop:  st, scrollLeft: sl }
	                      : { top: y, left: x };
};

})(jQuery);


/*
 * jQuery Tooltip plugin 1.3
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-tooltip/
 * http://docs.jquery.com/Plugins/Tooltip
 *
 * Copyright (c) 2006 - 2008 Jörn Zaefferer
 *
 * $Id: jquery.tooltip.js 5741 2008-06-21 15:22:16Z joern.zaefferer $
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
 
;(function($) {
	
		// the tooltip element
	var helper = {},
		// the current tooltipped element
		current,
		// the title of the current element, used for restoring
		title,
		// timeout id for delayed tooltips
		tID,
		// IE 5.5 or 6
		IE = $.browser.msie && /MSIE\s(5\.5|6\.)/.test(navigator.userAgent),
		// flag for mouse tracking
		track = false;
	
	$.tooltip = {
		blocked: false,
		defaults: {
			delay: 200,
			fade: false,
			showURL: true,
			extraClass: "",
			top: 15,
			left: 15,
			id: "tooltip"
		},
		block: function() {
			$.tooltip.blocked = !$.tooltip.blocked;
		}
	};
	
	$.fn.extend({
		tooltip: function(settings) {
			settings = $.extend({}, $.tooltip.defaults, settings);
			createHelper(settings);
			return this.each(function() {
					$.data(this, "tooltip", settings);
					this.tOpacity = helper.parent.css("opacity");
					// copy tooltip into its own expando and remove the title
					this.tooltipText = this.title;
					$(this).removeAttr("title");
					// also remove alt attribute to prevent default tooltip in IE
					this.alt = "";
				})
				.mouseover(save)
				.mouseout(hide)
				.click(hide);
		},
		fixPNG: IE ? function() {
			return this.each(function () {
				var image = $(this).css('backgroundImage');
				if (image.match(/^url\(["']?(.*\.png)["']?\)$/i)) {
					image = RegExp.$1;
					$(this).css({
						'backgroundImage': 'none',
						'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
					}).each(function () {
						var position = $(this).css('position');
						if (position != 'absolute' && position != 'relative')
							$(this).css('position', 'relative');
					});
				}
			});
		} : function() { return this; },
		unfixPNG: IE ? function() {
			return this.each(function () {
				$(this).css({'filter': '', backgroundImage: ''});
			});
		} : function() { return this; },
		hideWhenEmpty: function() {
			return this.each(function() {
				$(this)[ $(this).html() ? "show" : "hide" ]();
			});
		},
		url: function() {
			return this.attr('href') || this.attr('src');
		}
	});
	
	function createHelper(settings) {
		// there can be only one tooltip helper
		if( helper.parent )
			return;
		// create the helper, h3 for title, div for url
		helper.parent = $('<div id="' + settings.id + '"><h3></h3><div class="body"></div><div class="url"></div></div>')
			// add to document
			.appendTo(document.body)
			// hide it at first
			.hide();
			
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			helper.parent.bgiframe();
		
		// save references to title and url elements
		helper.title = $('h3', helper.parent);
		helper.body = $('div.body', helper.parent);
		helper.url = $('div.url', helper.parent);
	}
	
	function settings(element) {
		return $.data(element, "tooltip");
	}
	
	// main event handler to start showing tooltips
	function handle(event) {
		// show helper, either with timeout or on instant
		if( settings(this).delay )
			tID = setTimeout(show, settings(this).delay);
		else
			show();
		
		// if selected, update the helper position when the mouse moves
		track = !!settings(this).track;
		$(document.body).bind('mousemove', update);
			
		// update at least once
		update(event);
	}
	
	// save elements title before the tooltip is displayed
	function save() {
		// if this is the current source, or it has no title (occurs with click event), stop
		if ( $.tooltip.blocked || this == current || (!this.tooltipText && ( !settings(this) || !settings(this).bodyHandler)) )
			return;

		// save current
		current = this;
		title = this.tooltipText;
		
		if ( settings(this).bodyHandler ) {
			helper.title.hide();
			var bodyContent = settings(this).bodyHandler.call(this);
			if (bodyContent.nodeType || bodyContent.jquery) {
				helper.body.empty().append(bodyContent)
			} else {
				helper.body.html( bodyContent );
			}
			helper.body.show();
		} else if ( settings(this).showBody ) {
			var parts = title.split(settings(this).showBody);
			helper.title.html(parts.shift()).show();
			helper.body.empty();
			for(var i = 0, part; (part = parts[i]); i++) {
				if(i > 0)
					helper.body.append("<br/>");
				helper.body.append(part);
			}
			helper.body.hideWhenEmpty();
		} else {
			helper.title.html(title).show();
			helper.body.hide();
		}
		
		// if element has href or src, add and show it, otherwise hide it
		if( settings(this).showURL && $(this).url() )
			helper.url.html( $(this).url().replace('http://', '') ).show();
		else 
			helper.url.hide();
		
		// add an optional class for this tip
		helper.parent.addClass(settings(this).extraClass);

		// fix PNG background for IE
		if (settings(this).fixPNG )
			helper.parent.fixPNG();
			
		handle.apply(this, arguments);
	}
	
	// delete timeout and show helper
	function show() {
		tID = null;
		if ((!IE || !$.fn.bgiframe) && settings(current) && settings(current).fade) {
			if (helper.parent.is(":animated"))
				helper.parent.stop().show().fadeTo(settings(current).fade, current.tOpacity);
			else
				helper.parent.is(':visible') ? helper.parent.fadeTo(settings(current).fade, current.tOpacity) : helper.parent.fadeIn(settings(current).fade);
		} else {
			helper.parent.show();
		}
		update();
	}
	
	/**
	 * callback for mousemove
	 * updates the helper position
	 * removes itself when no current element
	 */
	function update(event)	{
		if($.tooltip.blocked)
			return;
		
		if (event && event.target.tagName == "OPTION") {
			return;
		}
		
		// stop updating when tracking is disabled and the tooltip is visible
		if ( !track && helper.parent.is(":visible")) {
			$(document.body).unbind('mousemove', update)
		}
		
		// if no current element is available, remove this listener
		if( current == null ) {
			$(document.body).unbind('mousemove', update);
			return;	
		}
		
		// remove position helper classes
		helper.parent.removeClass("viewport-right").removeClass("viewport-bottom");
		
		var left = helper.parent[0].offsetLeft;
		var top = helper.parent[0].offsetTop;
		if(!settings(current))	
			return;
		if (event) {
			// position the helper 15 pixel to bottom right, starting from mouse position
			left = event.pageX + settings(current).left;
			top = event.pageY + settings(current).top;
			var right='auto';
			if (settings(current).positionLeft) {
				right = $(window).width() - left;
				left = 'auto';
			}
			helper.parent.css({
				left: left,
				right: right,
				top: top
			});
		}
		
		var v = viewport(),
			h = helper.parent[0];
		// check horizontal position
		if (v.x + v.cx < h.offsetLeft + h.offsetWidth) {
			left -= h.offsetWidth + 20 + settings(current).left;
			helper.parent.css({left: left + 'px'}).addClass("viewport-right");
		}
		// check vertical position
		if (v.y + v.cy < h.offsetTop + h.offsetHeight) {
			top -= h.offsetHeight + 20 + settings(current).top;
			helper.parent.css({top: top + 'px'}).addClass("viewport-bottom");
		}
	}
	
	function viewport() {
		return {
			x: $(window).scrollLeft(),
			y: $(window).scrollTop(),
			cx: $(window).width(),
			cy: $(window).height()
		};
	}
	
	// hide helper and restore added classes and the title
	function hide(event) {
		if($.tooltip.blocked)
			return;
		// clear timeout if possible
		if(tID)
			clearTimeout(tID);
		// no more current element
		current = null;
		
		var tsettings = settings(this);
		if( !tsettings )
			return;
		function complete() {
			helper.parent.removeClass( tsettings.extraClass ).hide().css("opacity", "");
		}
		if ((!IE || !$.fn.bgiframe) && tsettings.fade) {
			if (helper.parent.is(':animated'))
				helper.parent.stop().fadeTo(tsettings.fade, 0, complete);
			else
				helper.parent.stop().fadeOut(tsettings.fade, complete);
		} else
			complete();
		
		if( settings(this).fixPNG )
			helper.parent.unfixPNG();
	}
	
})(jQuery);

/*
 * jQuery JSON Plugin
 * version: 2.1 (2009-08-14)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is 
 * copyrighted 2005 by Bob Ippolito.
 */
 
(function($) {
    /** jQuery.toJSON( json-serializble )
        Converts the given argument into a JSON respresentation.

        If an object has a "toJSON" function, that will be used to get the representation.
        Non-integer/string keys are skipped in the object, as are keys that point to a function.

        json-serializble:
            The *thing* to be converted.
     **/
    $.toJSON = function(o)
    {
        if (typeof(JSON) == 'object' && JSON.stringify)
            return JSON.stringify(o);
        
        var type = typeof(o);
    
        if (o === null)
            return "null";
    
        if (type == "undefined")
            return undefined;
        
        if (type == "number" || type == "boolean")
            return o + "";
    
        if (type == "string")
            return $.quoteString(o);
    
        if (type == 'object')
        {
            if (typeof o.toJSON == "function") 
                return $.toJSON( o.toJSON() );
            
            if (o.constructor === Date)
            {
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;

                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;

                var year = o.getUTCFullYear();
                
                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;
                
                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                
                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                
                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;

                return '"' + year + '-' + month + '-' + day + 'T' +
                             hours + ':' + minutes + ':' + seconds + 
                             '.' + milli + 'Z"'; 
            }

            if (o.constructor === Array) 
            {
                var ret = [];
                for (var i = 0; i < o.length; i++)
                    ret.push( $.toJSON(o[i]) || "null" );

                return "[" + ret.join(",") + "]";
            }
        
            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;

                if (type == "number")
                    name = '"' + k + '"';
                else if (type == "string")
                    name = $.quoteString(k);
                else
                    continue;  //skip non-string or number keys
            
                if (typeof o[k] == "function") 
                    continue;  //skip pairs where the value is a function.
            
                var val = $.toJSON(o[k]);
            
                pairs.push(name + ":" + val);
            }

            return "{" + pairs.join(", ") + "}";
        }
    };

    /** jQuery.evalJSON(src)
        Evaluates a given piece of json source.
     **/
    $.evalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        return eval("(" + src + ")");
    };
    
    /** jQuery.secureEvalJSON(src)
        Evals JSON in a way that is *more* secure.
    **/
    $.secureEvalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };

    /** jQuery.quoteString(string)
        Returns a string-repr of a string, escaping quotes intelligently.  
        Mostly a support function for toJSON.
    
        Examples:
            >>> jQuery.quoteString("apple")
            "apple"
        
            >>> jQuery.quoteString('"Where are we going?", she asked.')
            "\"Where are we going?\", she asked."
     **/
    $.quoteString = function(string)
    {
        if (string.match(_escapeable))
        {
            return '"' + string.replace(_escapeable, function (a) 
            {
                var c = _meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    
    var _meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };
})(jQuery);



/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqModal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 03/01/2009 +r14
 */
(function($) {
$.fn.jqm=function(o){
var p={
overlay: 50,
overlayClass: 'jqmOverlay',
closeClass: 'jqmClose',
trigger: '.jqModal',
ajax: F,
ajaxText: '',
target: F,
modal: F,
toTop: F,
onShow: F,
onHide: F,
onLoad: F
};
return this.each(function(){if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
if(p.trigger)$(this).jqmAddTrigger(p.trigger);
});};

$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
$.fn.jqmShow=function(t){return this.each(function(){t=t||window.event;$.jqm.open(this._jqm,t);});};
$.fn.jqmHide=function(t){return this.each(function(){t=t||window.event;$.jqm.close(this._jqm,t)});};

$.jqm = {
hash:{},
open:function(s,t){var h=H[s],c=h.c,cc='.'+c.closeClass,z=(parseInt(h.w.css('z-index'))),z=(z>0)?z:3000,o=$('<div></div>').css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;h.w.css('z-index',z);
 if(c.modal) {if(!A[0])L('bind');A.push(s);}
 else if(c.overlay > 0)h.w.jqmAddClose(o);
 else o=F;

 h.o=(o)?o.addClass(c.overlayClass).prependTo('body'):F;
 if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

 if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
  r.html(c.ajaxText).load(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
 else if(cc)h.w.jqmAddClose($(cc,h.w));

 if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
 (c.onShow)?c.onShow(h):h.w.show();e(h);return F;
},
close:function(s){var h=H[s];if(!h.a)return F;h.a=F;
 if(A[0]){A.pop();if(!A[0])L('unbind');}
 if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
 if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
},
params:{}};
var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,
i=$('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({opacity:0}),
e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
 if(!this[c]){this[c]=[];$(this).click(function(){for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);




/*
* Simple Auto Expanding Text Area (0.1.2-dev)
* by Antti Kaihola (antti.kaihola.fi)
* akaihol+jquery@ambitone.com
*
* Copyright (c) 2009 Antti Kaihola (antti.kaihola.fi)
* Licensed under the MIT and BSD licenses.
*
* NOTE: This script requires jQuery to work. Download jQuery at
* www.jquery.com
*/
 
(function(jQuery) {
 
jQuery.fn.simpleautogrow = function() {
return this.each(function() { new jQuery.simpleautogrow(this); }); };
jQuery.simpleautogrow = function (e) {
var self = this;
var $e = this.textarea = jQuery(e)
.css({overflow: 'hidden', display: 'block'})
.bind('focus', function() {
this.timer = window.setInterval(function() {self.checkExpand(); }, 200); })
.bind('blur', function() { clearInterval(this.timer); });
this.border = $e.outerHeight() - $e.innerHeight();
this.clone = $e.clone().css({position: 'absolute', visibility: 'hidden'}).attr('name', '')
$e.height(e.scrollHeight + this.border)
.after(this.clone);
this.checkExpand(); };
 
jQuery.simpleautogrow.prototype.checkExpand = function() {
var target_height = this.clone[0].scrollHeight + this.border;
if (this.textarea.outerHeight() != target_height)
this.textarea.height(target_height + 'px');
this.clone.attr('value', this.textarea.attr('value')).height(0); };
 
})(jQuery);