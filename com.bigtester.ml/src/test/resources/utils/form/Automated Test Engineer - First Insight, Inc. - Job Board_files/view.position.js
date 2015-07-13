$(document).ready(function() {
    if (typeof DV_RESPONSIVE_LAYOUT !== 'undefined' && DV_RESPONSIVE_LAYOUT) {
        var $forwardFields  = $('#resumator-job-forward-form .form-control'),
            emailRegex      = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        $('#resumator-btn-send-forward').click(function() {
            var resumatorErrors = false;

            $forwardFields.each(function() {
                var $input     = $(this),
                    $formGroup = $input.closest('.form-group'),
                    value      = $input.val().trim(),
                    error      = false;

                switch ($(this).attr('id')) {
                    case 'resumator_forward_message':
                        // this is pretty naive but models the existing server-side validation
                        error = value.indexOf('www') > -1 || value.indexOf('http') > -1;
                        break;
                    case 'resumator_forward_email_recipient':
                    case 'resumator_forward_email_sender':
                        error = !emailRegex.test(value);
                    default:
                        error = error || value == '';
                        break;
                }

                if (error) {
                    $formGroup.addClass('has-error');
                    resumatorErrors = true;
                } else {
                    $formGroup.removeClass('has-error');
                    resumatorErrors = resumatorErrors || false;
                }
            });

            if (resumatorErrors) {
                return false;
            } else {
                return true;
            }
        });
    } else {
        $('#resumator-forward-button').click(function(){
            $("#resumator-job-forward-form").slideDown('fast');
            $("#resumator-job-button-email").addClass("none");
            return false;
        });
        
        $('#resumator-btn-cancel-forward').click(function(){
            $("#resumator-job-forward-form").slideUp("fast");
            $("#resumator-job-button-email").removeClass("none");
            return false;
        });
    }
});