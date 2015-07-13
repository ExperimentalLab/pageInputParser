/**
 * COPYRIGHT 2014 Jobvite, Inc. All rights reserved. This copyright notice is Copyright Management
 * Information under 17 USC 1202 and is included to protect this work and deter copyright infringement.
 * Removal or alteration of this Copyright Management Information without the express written permission
 * of Jobvite, Inc. is prohibited, and any such unauthorized removal or alteration will be a violation of
 * federal law.
 *
 * Basic Usage:
 *
 * <script>
 *     Jobvite = { careersite: 'yourcareersite' };
 * </script>
 * <script src="http://path/to/redirect.js"></script>
 *
 * Mobile Detection Usage:
 *
 * <script>
 *     Jobvite = { careersite: false };
 * </script>
 * <script src="http://path/to/redirect.js"></script>
 * <script>
 *     var isMobile = Jobvite.detectMobile(navigator.userAgent);
 * </script>
 */

(function (win) {

    var baseUrl, careersiteUrl;

    win.Jobvite = win.Jobvite || {};
    win.Jobvite.detectMobile = detectMobile;
    baseUrl = win.Jobvite.baseUrl || 'http://jobs.jobvite.com';

    if (typeof win.Jobvite.careersite !== 'undefined' && !win.Jobvite.careersite) {
        return;
    }

    if (!win.Jobvite.careersite) {
        return warn('Jobvite: no careersite specified!');
    }
    careersiteUrl = [baseUrl, win.Jobvite.careersite].join('/');

    if (detectMobile(win.navigator.userAgent)) {
        win.location.href = [careersiteUrl, getPath(win.location.search)].join('/');
    }

    function getPath (search) {
        var parts, path, param, jvi, i;
        parts = (search ? search.substr(1).split('&') : []);
        path = '';

        for (i = parts.length - 1; i >= 0; i--) {
            param = parts[i].split('=');
            if (param[0] === 'jvi' || param[0] === 'job') {
                jvi = param[1].split(',');
                if (jvi[1] === 'Job') {
                    path = 'job/'+jvi[0];
                }
            }
        }

        return path;
    }

    function detectMobile (useragent) {
        var mobileUserAgents, i;
        mobileUserAgents = [
            new RegExp('^(?=.*Android)(?=.*Mobile).*'),
            new RegExp('.*iphone.*', 'i')
        ];

        for (i = mobileUserAgents.length - 1; i >= 0; i--) {
            if (useragent.match(mobileUserAgents[i])) {
                return true;
            }
        }
        return false;
    }

    function warn (message) {
        if (typeof console !== "undefined" && console !== null) {
            if (typeof console.warn === "function") {
                console.warn(message);
            }
        }
    }

})(window);