    var fb_error_img = "http://static.ak.fbcdn.net/rsrc.php/v1/yL/r/HsTZSDw4avx.gif"
        var JV_FB = JV_FB || { };
        JV_FB = {
                appId: FbAppId,
                session: null,
                status: "unknown",
                scope: "",
                jvAuthenticationToken:null,
                  jvSocialId:null,
                _callback: function(){},
                _loginFired: false,
               
                setSession: function(response){
                        if(response.authResponse && response.authResponse.signedRequest){
                                JV_FB.saveFBToken( response.authResponse );
                                this.session = response.authResponse.signedRequest;
                                this.status = response.status;
                                this.jvAuthenticationToken = response.authResponse.accessToken;
                                this.jvSocialId = response.authResponse.userID;
                                if(response.scope){
                                        // scope is not always available with the response object.
                                        this.scope = response.scope;
                                }
                                //Need to give some breathing for the backend API
                                this.doFormSubmit()
                                // wait a max of 1.5 second for the webservice to return. We cant wait for the webservice to degrade user experience.
                                setTimeout(function(){
                                   saveFBTokenCallbackBoolean = true;
                                }, 1500);
                    
                        }
                },
        doFormSubmit: function(){
            var me =  this;
            if( saveFBTokenCallbackBoolean){
                if($("#loginForm").size() && this._loginFired == true) this.fillFormAndSubmit();
            }else{
                setTimeout(function(){
                   me.doFormSubmit();
                }, 250);
            }
        },
                
        saveFBToken: function( authResponse ){
            if(!!authResponse && !!authResponse.accessToken){
                (function(d){
                     var js, id = 'jv-fbTokenSave', ref = d.getElementsByTagName('script')[0];
                     if (d.getElementById(id)) {return;}
                     js = d.createElement('script'); js.id = id; js.async = true;
                     //VA: make sure we are adding source for every page we are adding this library too.
                     var source = $("#loginForm").length? "LOGIN_PAGE": "APPLY_PAGE"
                     js.src = "//rep.jobvite.com/fb/"+authResponse.accessToken+"?source="+source+"&callback=saveFBTokenCallback";
                     ref.parentNode.insertBefore(js, ref);
                }(document));
                return true;
            }   
            return false;
        },
        fillFormAndSubmit: function()
        {
            this.sendAuthTokens(this.jvAuthenticationToken, this.jvSocialId);
            $("#loginForm").submit();
        },
               
                initialize: function(){
                        var me = this;
                        FB.getLoginStatus(function(response) {
                          if (response.authResponse && response.authResponse.signedRequest) {
                                me.setSession( response );                             
                          } else {
                            // no user session available, someone you dont know
                               
                          }
                          me._callback(response);
                          me.dumpCallback();
                        });
                        this.attachEvents();
                },
               
                attachEvents: function(){
                        var me = this;
                        FB.Event.subscribe('auth.statusChange', function(response) {
                                if(response.authResponse && response.authResponse.signedRequest){
                                        me.setSession( response );     
                                }
                        });
                       
                        FB.Event.subscribe('auth.logout', function(response) {
                                // nullify everything/ reset session objects.
                                me.session= null,
                                me.status = "unknown",
                                me.scope = "";
                                // TODO: Do anything to show that the user is not connected now.
                                JV.removeUserInfoFromForms( );
                        });
                },
               
                login: function(){                        
                        this._loginFired = true;
                        var me = this;                        
                        function doFBLogin(){
                            FB.login(function(response) {
                                                if (response.authResponse && response.authResponse.signedRequest) {
                                                        me.setSession( response );
                                                } else {
                                                    // user is not logged in
                                                }
                                                me._callback(response);
                                                me.dumpCallback();
                                            }, {scope:'email,offline_access,user_about_me,user_education_history,user_location,user_online_presence,user_website,user_work_history'});  
                        }
                        if(me.session == null){
                            doFBLogin();
                        }
                        
                        /*
                            FB.getLoginStatus(function(response) {
                                if(response.authResponse && response.authResponse.signedRequest)
                                {
                                    me.setSession(response);
                                }
                                else
                                {
                                    doFBLogin();                                
                                }
                            },true);
                        */
                },
               
                setCallback: function( callback ){                     
                        if( callback ){
                                this._callback = callback      
                        }
                },
       
                dumpCallback: function(){              
                        this._callback =  function(){};
                },
                
                sendAuthTokens: function(auth, id) {
                    $("#jvAuthenticationToken").val(auth);
                    $("#jvSocialId").val(id);
                    $("#platformName").val("Facebook");
                }
        }
       
       
        var JV = JV || { };
        JV = (function(){
               
                jv = {
                                 Url:{
                                        hostname: 'http://74.85.25.13:6165',
                                        getUserInfo: '/user/social/facebook/connect?accessToken=',
                                        saveFBUserInfo: '/user/e/user',
                                        createUserInfo: '/user/e/userPref'     
                                },
                                ajaxCacher: {},
                                needToBeHidden: false,
                                checkUndefinedOrNull: function(object,property){
                                        if(!object){
                                                return;
                                        }
                                        if(typeof object[property] != "undefined" && object[property] != null){
                                                return   object[property];
                                        }
                                        return "";
                                       
                                },
                               
                                makeAjaxRequest: function( data, args ){
                                        // should have arguments and its type should be object.
                                        if(!args || typeof args != "object" || !args.ajaxType ){
                                                return null;
                                        }
                                        args.contentType = args.contentType ? args.contentType : 'application/json';
                                        args.type = args.type? args.type: "POST";
                                        args.url = args.url;
                                        args.dataType = args.dataType? args.dataType: "json";
                                        args.success = args.success? args.success: function(){};
                                        // if there is already an xhr request for the same action has been fired and it hasn't retured yet,
                                        // abort it first and then make a new request.
                                        this.makeAjaxRequestHelper( args );
                                },
                               
                                makeAjaxRequestHelper: function( args ){
                                        args.traditional = true;
                                        if( this.ajaxCacher[ args.ajaxType ] ){
                                                        (this.ajaxCacher[ args.ajaxType ]).abort( );
                                                        this.ajaxCacher[ args.ajaxType ] = null;
                                        }
                                       
                                        // cache the ajax call
                                        this.ajaxCacher[ args.ajaxType ] =  $.ajax( args );
                                }
                }
               
               
               
               
                return {
                        _tempjvUser: null,
                        jvUser: null,
                        fbUser:null,
                        Const:{
                                "EMPTY_PROFILE": "Education and work history in your facebook profile is empty. We might still be able to fill some of the basic information from your profile."
                        },
                        startFacebookLogin: function(){                            
                                var me = this;
                                if(!JV_FB.session){
                                        JV_FB.setCallback(function(response){
                                                if(response.authResponse && response.authResponse.signedRequest){
                                                    me.getUserInfo();
                                                }
                                        });
                                        JV_FB.login( );
                                        return;        
                                }
                                if($("#loginForm").size() ) {
                                    JV_FB.login();
                                    return;
                                } else {
                                me.getUserInfo();
                                }
                                                
                            },

                            logoutFacebook: function(callback) {
                                this.hideModal();
                                var _callback = callback ? callback : function() { };
                                FB.logout(function(response) {
                                    _callback();
                                });
                            },
                                
                            // backend might already have the info about the user.
                            getUserInfo: function(){
                                    var me = this;
                                    me.getFacebookUser( );
                                   
                                    //For Career sites we are not storing in new db.
                                    return;
                                    // check if the backend already has the info. If not get the info from facebook parse it and then save it to the backend.
                                    var args = {};
                                    args.type = "GET";
                                    args.ajaxType = "getJVUser";
                                    args.url = jv.Url.hostname + jv.Url.getUserInfo + JV_FB.session.access_token; 
                                     args.contentType = "application/json",
                                     args.dataType = "json";
                                    args.success = function( response ) {
                                             if (response == null || response.resultCount == 0) {
    //                                              console.log("No user found, query fb for the same.")
                                                    me.getFacebookUser( );
                                             } else {       
                                                    //TODO: What to do if we already have the information from our own backend.
                                                    me.overlayTemplate(response.resultList[0])
                                             }
                                    }
                                   
                                    args.error = function( response ) {
                                             me.getFacebookUser();
                                    }
                                    // args.data = jvObject;
                                    jv.makeAjaxRequest( null, args);       
                            },
 
                        importFBProfile: function() {
                            // set only after the import is called.
                            this.jvUser = this._tempjvUser;
                            var domRef = $(".jv-fbModalContents .jv-quickProfile").clone();
                            
                            this.hideModal();
                            if ((typeof this.jvUser.workHistory != "undefined" && this.jvUser.workHistory.length) || (typeof this.jvUser.education != "undefined" && this.jvUser.education.length)) {
                                $("#jvfbprofile").html(domRef).css("display", "block");
                                
                                $(".jv-modalHistoryContainer").removeClass("jv-modalHistoryContainer").addClass("jv-modalHistoryContainerInPage");
                            }
                            this.fillUserInfoInForms();
                        },
                       
                        // Prefill some of the fields witht he values and then inject the values in the input hidden fields.
                        fillUserInfoInForms: function(){
                                var checkUndefinedOrNull = jv.checkUndefinedOrNull;
                                var _user = this.jvUser;
                                //For Career site pages.
                                $("#jv-fbAttachProfileContainer").css("display", "none");
                                $("#jv-fbAttachProfileRemoveLink").css("display", "block");
                                
                                
                                $("#jvfirstname").val( $.trim(checkUndefinedOrNull(_user, "firstName") + checkUndefinedOrNull(_user, "middleName")));
                                $("#jvlastname").val( $.trim(checkUndefinedOrNull(_user, "lastName")));
                                $("#jvemail").val( $.trim(checkUndefinedOrNull(_user, "email")));
                                //fb user data
                                $("#jvfbdata").val(JSON.stringify(this.fbUser))
                                // jobvite json data
                                $("#jvfbjobvitedata").val(JSON.stringify(_user));
                                $("#FromFirstName").val( $.trim(checkUndefinedOrNull(_user, "firstName") + checkUndefinedOrNull(_user, "middleName")));
                                $("#FromLastName").val( $.trim(checkUndefinedOrNull(_user, "lastName")));
                                $("#FromEmail").val( $.trim(checkUndefinedOrNull(_user, "email")));
                        },
                       
                        removeUserInfoFromForms: function(){
                                $("#jvfbprofile").css("display","none");
                                $("#jvfirstname").val( "");
                                $("#jvlastname").val("");
                                $("#jvemail").val("");
                                $("#jvfbdata").val("")
                                $("#jvfbjobvitedata").val("");
                                $("#FromFirstName").val( "");
                                $("#FromLastName").val("");
                                $("#FromEmail").val("");
                                
                                //For Career site pages.
                                $("#jv-fbAttachProfileContainer").css("display", "block");
                                $("#jv-fbAttachProfileRemoveLink").css("display", "none");
                                
                        },
                       
                        getFacebookUser: function(){
                           var me = this;
                            FB.api('/me',
                              { fields: 'name, id, about, location, first_name, last_name, work, education, email' },
                              function(response) {
                               if(response){
                                    me.fbUser = response;
                                    me.overlayTemplate(me.parseFBInfo( response));
                                    }
                              }
                        );
                        
                        },
                       
                         
                        /**
                        *
                        * @param {Object} jvObject: object mapped to the jobvite schema,
                        * @param {Object} fbUserId: Facebook UserId.
                        */
                        saveFBUser: function(jvObject, fbUserId){
                                var me = this;
                                var args = {};
                                args.ajaxType = "createJVUser";
                                args.url = jv.Url.hostname + jv.Url.saveFBUserInfo;
                                args.data = JSON.stringify(jvObject),
                                 args.contentType = "application/json",
                                 args.dataType = "json",
                                args.success = function( response ){
                                        jv.user= response.resultList[0];
                                        jv.jvUserId = response.resultList[0].id;       
                                        me.createUserPreference(response.resultList[0].id, fbUserId);
                                }
                                // args.data = jvObject;
                                jv.makeAjaxRequest( jvObject, args);
                        },
                       
                        createUserPreference: function(profileId, fbUserId){
                                var up = {
                                        userProfile: {
                                                id: profileId
                                        },
                                        profiles:[{
                                                platform: "FACEBOOK",
                                                socialId: fbUserId
                                        }]
                                       
                                };
                                var args = {};
                                args.ajaxType = "createJVUser";
                                args.url = jv.Url.hostname + jv.Url.createUserInfo;
                                args.data = JSON.stringify(up),
                                 args.contentType = "application/json",
                                 args.dataType = "json",
                                args.success = function( response ){   
                                        //TODO: What to do if we already have the information from our own backend.
                                }
                                // args.data = jvObject;
                                jv.makeAjaxRequest( up, args);
                        },
 
                        // Show the user his facebook resume.
                        overlayTemplate: function(jvObject) {
                            this._tempjvUser = jvObject;
                            var checkUndefinedOrNull = jv.checkUndefinedOrNull;
                            var _whTemplate = '';
                            var _ehTemplate = '';
                            var _wh = jvObject.workHistory || [];
                            var _eh = jvObject.education || [];
                            var _margin = "";
                            for (var i = 0, j = _wh.length; i < j; i++) {
                                _whTemplate += "<tr>";
                                var _type = "";
                                _margin = "border-top: 1px solid #ababab;padding-top: 10px;";
                                //if (i >= (j - 1)) {
                                if (i == 0 ) {
                                    _margin = "padding-top: 0px";
                                }
                                
                                if (i == 0) {
                                    _type = '<tr><td style="font-size: 14px;color: #606060" valign="top">Employers</td></tr>';
                                }
                                var _putParanthesis = $.trim( checkUndefinedOrNull(_wh[i], "FullDate")) !="";
                                
                                var _work_date = _putParanthesis ? ', '+this.sanitize(checkUndefinedOrNull(_wh[i], "FullDate"))+'' : '';
                                _whTemplate += _type + //'<td>Company Logo</td>'+
                                                                                '<td style="' + _margin + '">' +
                                                                                        '<ul style="margin:0px;">' +
                                                                                                '<li class="jv-entry" style="color: #666666;"><b>' + this.sanitize(checkUndefinedOrNull(_wh[i], "companyName")) + '</b>'+ _work_date +'</li>' +
                                                                                                '<li class="jv-entry" >' + this.sanitize(checkUndefinedOrNull(_wh[i], "position")) + '</li>' +
                                                                                                '<li class="jv-entry">' + this.sanitize(checkUndefinedOrNull(_wh[i], "description")) + '</li>' +
                                                                                        '</ul>' +
                                                                                '</td>';
                                 _type="";
                                 if(checkUndefinedOrNull(_wh[i], "projects") != "")
                                 {
                                        for(var k=0; k < _wh[i].projects.length; k++)
                                        {
                                        //var _line = "border-top: 1px solid #cccccc";
                                        var _line = "";
                                        if (k == 0) {
                                            _line = "";
                                            _whTemplate += '<tr><td valign="top" style="padding: 0px;font-size: 11px;color: #606060"><b>Projects:</b></td></tr>';
                                        }
                                         var _putParanthesis = $.trim( checkUndefinedOrNull(_wh[i].projects[k], "FullDate")) !="";
                                          var _work_date = _putParanthesis ? ', '+this.sanitize(checkUndefinedOrNull(_wh[i].projects[k], "FullDate"))+'' : '';
                                            //_whTemplate += '<tr><td class="jv-modalSection" valign=top  width="70px" >&nbsp;</td> <td style="' + _margin + '">' +
                                             _whTemplate += '<tr><td style="padding-top: 0px;' + _line + '">' +
                                                                '<ul style="margin:0px;">' +
                                                                        '<li class="jv-entry" style="color: #666666">' + this.sanitize(checkUndefinedOrNull(_wh[i].projects[k], "name")) + _work_date +'</li>' +
                                                                        '<li class="jv-entry" >' + this.sanitize(checkUndefinedOrNull(_wh[i].projects[k], "description")) + '</li>' +
                                                                '</ul>' +
                                                            '</td></tr>';
                                        }
                                 }
                                _whTemplate += "</tr>";
                            }
                            if (_wh.length) {
                                $(".jv-fbModalContents .jv-quickProfile").append("<table width='100%' class='jv-modalHistoryContainer' cellspacing=5><tbody>" + _whTemplate + "</tbody></table>");
                            }
                            for (var i = 0, j = _eh.length; i < j; i++) {
                                _ehTemplate += "<tr>";
                                var _type = "";
                                _margin = "border-bottom: 1px solid #ddd";
                                if (i >= (j - 1)) {
                                    _margin = "";
                                }
                                if (i == 0) {
                                 _type = '<tr><td style="font-size: 14px;color: #606060; border-top: 1px solid #cccccc" valign="top">Education</td></tr>';
                                }
                                
                               
                                var year = "";
                                if(checkUndefinedOrNull(_eh[i], "dateRange")!= "" && checkUndefinedOrNull(_eh[i]["dateRange"], "endYear") != ""){
                                    year = ", "+_eh[i].dateRange.endYear+" ";
                                }
                                _ehTemplate += _type + //'<td>Institue Logo</td>'+
                                                                                '<td style="' + _margin + '">' +
                                                                                        '<ul style="margin:0px;">' +
                                                                                                '<li class="jv-entry" style="color: #666666">' + this.sanitize(checkUndefinedOrNull(_eh[i], "schoolName")) + year +'</li>' +
                                                                                                '<li class="jv-entry" style="color: #999">' + this.sanitize(checkUndefinedOrNull(_eh[i], "degree")) + '</li>' +
                                                                                                '<li class="jv-entry">' + this.sanitize(checkUndefinedOrNull(_eh[i], "major")) + '</li>' +
                                                                                        '</ul>' +
                                                                                '</td>';
                                _ehTemplate += "</tr>";
                            }
                            if (_eh.length) {
                                $(".jv-fbModalContents .jv-quickProfile").append("<table style='top: -1px' class='jv-modalHistoryContainer' width='100%' cellspacing=5><tbody>" + _ehTemplate + "</tbody></table>");
                            }
                            // Give the option to import
                            if (!_wh.length && !_eh.length) {
                                $(".jv-fbModalContents .jv-quickProfile").append(this.Const["EMPTY_PROFILE"]);
                                $("#jv-modalDialog").append("<div class='jv-modalButtonContainer' style='height: 45px'>\
                                                                                                                <span class='jv-signDiff' onclick='JV.logoutFacebook()'>Logout of facebook</span>\
                                                                                                                <span class='jv-signDiff' onclick='JV.logoutFacebook(JV.startFacebookLogin)'>Sign in as different User</span>\
                                                                                                                <input type='button' class='jv-modalGreenButton' onclick='JV.importFBProfile()' value='Continue'/>\
                                                                                                                <input type='button' class='jv-modalGreyButton' onclick='JV.hideModal()' value='Close'/></br></br>\
                                                                                                        </div>");
                            } else {
                                $("#jv-modalDialog").append("<div class='jv-modalButtonContainer'>\
                                                                                                        <input type='button' class='jv-modalGreyButton' onclick='JV.hideModal()' value='Cancel'/>\
                                                                                                        <input type='button' class='jv-modalGreenButton' onclick='JV.importFBProfile()' value='Import'/>\
                                                                                                </div>");
                            }
                            if(JV.needToBeHidden == true){
                                JV.importFBProfile();
                                JV.needToBeHidden = false;
                            }
                            else{
                                this.showModal();
                            }
                        },
                       
                       
                        showModal: function(){
                            if (typeof $("#jv-modalDialog").jqmShow == 'function') {
                                $("#jv-modalDialog").jqmShow( );
                            }
                        },
 
                        hideModal: function() {
                        //if (typeof $("#jv-modalDialog").jqmHide == 'function') {
                            $("#jv-modalDialog").jqmHide();
                            $(".jv-fbModalContents .jv-quickProfile").html("");
                            $(".jv-fbModalContents .jv-quickProfile").next().remove();
                            $(".jv-modalButtonContainer").remove();
                          // }
                        },
                       
                        sanitize: function( _text ){
                                // This is for multiple majors for the same school.
                                _text.replace(/'/g,"\\'").replace(/$;$/,", ");
                                //_text = $("<span>").text(_text).html( );
                                _text = "<span>"+_text+"</span>";
                                _text = $.trim(_text);
                                return _text;
                        },
                       
                       getFullDateFromString: function(dateTxt){
                       var dateMap = {
                            "01": "January",
                            "02": "February",
                            "03": "March",
                            "04": "April",
                            "05": "May",
                            "06": "June",
                            "07": "July",
                            "08": "August",
                            "09": "September",
                            "10": "October",
                            "11": "November",
                            "12": "December"
                       }
                       if(!dateTxt || $.trim(dateTxt) == ""){
                        return "";
                       }
                            var dateArr = dateTxt.split("-") ;
                            var dateTpl = "";
                            if($.trim(dateArr[1])!="" && dateArr[1] != 0){
                                dateTpl += dateMap[dateArr[1]];
                            }
                            if($.trim(dateArr[0])!="" && dateArr[0] != 0 && $.trim(dateArr[1])!="" && dateArr[1] != 0){
                                dateTpl += " ";
                            }
                            if($.trim(dateArr[0])!="" && dateArr[0] != 0){
                                dateTpl += dateArr[0];
                            }
                            return dateTpl;
                       },
                       
                        parseFBInfo: function(fbObject){
                                var jvObject = { };
                                var checkUndefinedOrNull = jv.checkUndefinedOrNull;
                                jvObject.socialId = checkUndefinedOrNull(fbObject, "id")
                                jvObject.firstName = checkUndefinedOrNull(fbObject, "first_name");     
                                jvObject.lastName = checkUndefinedOrNull(fbObject, "last_name");
                                jvObject.middleName = checkUndefinedOrNull(fbObject, "middle_name");
                                jvObject.summary = checkUndefinedOrNull(fbObject, "about");
                                // TODO: check if the backend has field for this.
                                jvObject.email = checkUndefinedOrNull(fbObject, "email");
                               
                                //Location
                                if( checkUndefinedOrNull(fbObject, "location") != ""){
                                        jvObject.location = {};
                                        jvObject.location.name = checkUndefinedOrNull(fbObject.location, "name");      
                                }
       
                                jvObject.workHistory = [ ];
       
                                //Work History
                                if( checkUndefinedOrNull(fbObject, "work") != ""){
                                        for(var i = 0; i< fbObject.work.length; i++){
                                                jvObject.workHistory[i] = {};
                                                if(checkUndefinedOrNull(fbObject.work[i], "employer" ) != "")
                                                jvObject.workHistory[i].companyName = checkUndefinedOrNull(fbObject.work[i].employer, "name");
                                                if(checkUndefinedOrNull(fbObject.work[i], "position" ) != "")
                                                {
                                                    jvObject.workHistory[i].position = checkUndefinedOrNull( fbObject.work[i].position, "name" );  
                                                }
                                                jvObject.workHistory[i].description = checkUndefinedOrNull( fbObject.work[i], "description" );                                         
                                                jvObject.workHistory[i].dateRange =  {};
                                                jvObject.workHistory[i].FullDate="";
                                                if(checkUndefinedOrNull(fbObject.work[i], "start_date") != ""){
                                                        var endDate = fbObject.work[i]["start_date"].split("-");
                                                        jvObject.workHistory[i].FullDate += this.getFullDateFromString(fbObject.work[i]["start_date"]);
                                                        jvObject.workHistory[i].dateRange.startYear = endDate[0];
                                                        jvObject.workHistory[i].dateRange.startMonth = endDate[1];
                                                }
                                                if(this.getFullDateFromString(fbObject.work[i]["start_date"])!= "" && this.getFullDateFromString(fbObject.work[i]["end_date"])!= ""){
                                                    jvObject.workHistory[i].FullDate += " - ";
                                                }
                                                if(checkUndefinedOrNull(fbObject.work[i], "end_date") != ""){
                                                        var endDate = fbObject.work[i]["end_date"].split("-");
                                                        jvObject.workHistory[i].FullDate += this.getFullDateFromString(fbObject.work[i]["end_date"]);
                                                        jvObject.workHistory[i].dateRange.endYear = endDate[0];
                                                        jvObject.workHistory[i].dateRange.endMonth = endDate[1];
                                                }
//                                                else if(i == 0 && checkUndefinedOrNull(fbObject.work[i], "start_date") != "")
//                                                    jvObject.workHistory[i].FullDate += 'Present';

                                                jvObject.workHistory[i].projects = [ ];  
                                                if( checkUndefinedOrNull(fbObject.work[i], "projects") != ""){  
                                                 for(var j = 0; j< fbObject.work[i].projects.length; j++){
                                                    jvObject.workHistory[i].projects[j] = {};
                                                    jvObject.workHistory[i].projects[j].name =  checkUndefinedOrNull(fbObject.work[i].projects[j], "name");
                                                    jvObject.workHistory[i].projects[j].description =  checkUndefinedOrNull(fbObject.work[i].projects[j], "description");
                                                    jvObject.workHistory[i].projects[j].dateRange =  {};
                                                    jvObject.workHistory[i].projects[j].FullDate = "";
                                                     if(checkUndefinedOrNull(fbObject.work[i].projects[j], "start_date") != ""){
                                                        var endDate = fbObject.work[i].projects[j]["start_date"].split("-");
                                                        jvObject.workHistory[i].projects[j].FullDate += this.getFullDateFromString(fbObject.work[i].projects[j]["start_date"]);
                                                        jvObject.workHistory[i].projects[j].dateRange.startYear = endDate[0];
                                                        jvObject.workHistory[i].projects[j].dateRange.startMonth = endDate[1];
                                                }
                                                if( this.getFullDateFromString(fbObject.work[i].projects[j]["start_date"])!="" && this.getFullDateFromString(fbObject.work[i].projects[j]["end_date"])!= "" ){
                                                    jvObject.workHistory[i].projects[j].FullDate +=" - "
                                                }
                                                if(checkUndefinedOrNull(fbObject.work[i].projects[j], "end_date") != ""){
                                                        var endDate = fbObject.work[i].projects[j]["end_date"].split("-");
                                                       jvObject.workHistory[i].projects[j].FullDate += this.getFullDateFromString(fbObject.work[i].projects[j]["end_date"]);
                                                        jvObject.workHistory[i].projects[j].dateRange.endYear = endDate[0];
                                                        jvObject.workHistory[i].projects[j].dateRange.endMonth = endDate[1];
                                                }
                                                else if(i == 0 && j == 0 && checkUndefinedOrNull(fbObject.work[i].projects[j], "start_date") != "")
                                                jvObject.workHistory[i].projects[j].FullDate += ' - Present';
                                                 } 
                                             } 
                                        }      
                                }
                                if( checkUndefinedOrNull(fbObject, "education") != ""){
                                        jvObject.education = [];
                                        // Education.  
                                        for(var i = 0; i< fbObject.education.length; i++){
                                                jvObject.education[i] = {};
                                                jvObject.education[i].degree = checkUndefinedOrNull(fbObject.education[i].degree, "name");
                                                jvObject.education[i].schoolName = checkUndefinedOrNull(fbObject.education[i].school, "name" );
                                                if(checkUndefinedOrNull(fbObject.education[i],"concentration") != ""){
                                                        //VA: We only have one field value for major, but with facebook we have an array of concentrations. We inject a token "$;$" after each entry in the concentration.
                                                        // so if in the UI it is really needed to support multiple concentrations we can seperate them with the termination of "$;$" token.
                                                        var _tempMajor = ""
                                                        for( var x = 0; x < fbObject.education[i].concentration.length; x++ ){
                                                                if( x != 0){
                                                                        _tempMajor += "$;$"
                                                                }
                                                                _tempMajor += fbObject.education[i].concentration[x].name
                                                        }
                                                        jvObject.education[i].major = _tempMajor;      
                                                }
                                               
                                                if(checkUndefinedOrNull(fbObject.education[i], "year") != ""){
                                                        jvObject.education[i].dateRange =  {};
                                                        // FB only has the end year information.
                                                        jvObject.education[i].dateRange.endYear = fbObject.education[i].year.name;
                                                }
                                        }
                                }
                                return jvObject;
                        }
                }
        })();
        
var saveFBTokenCallbackBoolean = false;       
var saveFBTokenCallback = function(){
  saveFBTokenCallbackBoolean = true;
};