/* English initialization for the UILib plugin. */
jQuery(function($) {
	$.extend($.fn.ajaxIndicator, {
		locale : {
			loadingMessage : 'Loading...'
		}
	});
	$.extend($.ui.multiselect, {
		locale : {
			addAll : 'Add all',
			removeAll : 'Remove all',
			itemsCount : '{1} items selected'
		}
	});
	$.extend($.fn.uiLibDataGrid, {
		locale : {
			columnCaption : 'Columns',
			columnTitle : 'Reorder Columns'
		}
	});
	$.webform.regional['en'] = {
		validationMessages : {
			valueMissing : 'Please include a value for this field.',
			typeMismatch : 'Value provided is incorrect for this field.',
			patternMismatch : 'Format of the value provided is incorrect.',
			tooShort : 'Value provided is shorter than the required minimum length.',
			tooLong : 'Value provided exceeds the required maximum length.',
			rangeUnderflow : 'Value provided is less than the expected range.',
			rangeOverflow : 'Value provided is greater than the expected range.',
			stepMismatch : 'Step mismatch error'
		},
		requiredFieldText : 'A value is required for this field',
		formErrorMessages : {
			title : 'Form Validation Issue',
			paragraphs : ['There was one or more issues with data provided that prevented the submission of the form.', 'Additional information about each field\'s issue can be found by hovering over the field with your mouse.', 'Please review and update the fields in red and submit the form again.']
		},
		okButtonText : 'Ok',
		autocomplete : {
			placeholder : 'Type information to search...'
		},
		selectMultiple : {
			selectAll : 'Select All',
			deselectAll : 'Deselect All'
		}
	};
	$.webform.setDefaults($.webform.regional['en']);
});
