function trackPage() {
    try {
        if (enableTracking && enableTracking == true) {//enableTracking var is set during analytics script reg.
            var pageTracker = _gat._getTracker(trackerId);
            var varIndex = 1;
            try {
            pageTracker._setCustomVar(varIndex++, "UserId", getUserId(), 1);
            pageTracker._setCustomVar(varIndex++, "CompanyId", getCompanyId(), 1);
            }//to track pages which does not have a User
            catch (userIdError) {
            }
            try {
                pageTracker._setCustomVar(varIndex++, "SubsidiaryId", getSubsidiaryId(), 1);
            } //to track pages which does not have a subsidiaryId
            catch (subsidiaryIdError) {
            }
            try {
                pageTracker._setCustomVar(varIndex++, "JobId", getJobId(), 3);
                pageTracker._setCustomVar(varIndex++, "CategoryId", getCategoryId(), 3);
            }//to track pages which does not have a jobref
            catch (jodIdError) {
            }
            if (enableAnonymizeIP && enableAnonymizeIP == true) {
                _gat._anonymizeIp();
            }
                
            pageTracker._trackPageview();
        }
    }
    catch (error) {

    }
} 

function jsCWSTrackPage(domainUrl, pageType){
    // configure this url
    if(typeof domainUrl !== 'string') {
        return;
    }
    var viewerUserId = ((typeof getUserId == 'function') ? getUserId() : '').split('|');
    var userId = (viewerUserId.length == 2) ? viewerUserId[1] : '';
    var pageType = (pageType != undefined && pageType != null) ? pageType : 'VIEW';
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    var _urlQueryParams = "viewerId=" + encodeURIComponent(viewerUserId[0])
              + "&userId=" + encodeURIComponent(userId)
              + "&companyId=" + encodeURIComponent((typeof getCompanyId == 'function') ? getCompanyId() : '')
              + "&subsidiaryId=" + encodeURIComponent((typeof getSubsidiaryId == 'function') ? getSubsidiaryId() : '')
              + "&jobId=" + encodeURIComponent((typeof getJobId == 'function') ? getJobId() : '')
              + "&categoryId=" + encodeURIComponent((typeof getCategoryId == 'function') ? getCategoryId() : '');
    var url = domainUrl + "?" + _urlQueryParams;
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
    setTimeout(function(){
      // remove the child after 500 milliseconds.
      document.getElementsByTagName('head')[0].removeChild(script);
    },500);
}