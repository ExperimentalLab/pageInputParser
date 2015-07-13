String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g, "");}
String.prototype.toInt=function(){return(isNaN(parseInt(this,10)))?0:parseInt(this, 10);}
String.prototype.padZero=function(){return(this.toInt()<10)?"0"+this:this;}
String.prototype.repeat=function(n){var s="",t=this.toString();while(--n>=0)s+=t;return s;}

function clearDefault(el) {
  if (el.defaultValue==el.value) el.value = ""
}



function Delete(path,objectid, name)
{

  var msg = name + "\nAre you sure you want to delete this item?";
  if (confirm(msg))
  {
      var lnk = path + "&folderid=" + objectid + "&Site_Name=";
      location.replace(lnk);
  }
}

function open_win(url_add, sWidth, sHeight, sMenubar, sStatus, sLocation, sToolbar, sScrollbar, sResizable){

//alert("sWidth is " + sWidth + " and sHeight is " + sHeight );
   if (sWidth =="" || sWidth==undefined) sWidth = "550";
   if (sHeight =="" || sHeight==undefined) sHeight = "750";
   if (sMenubar =="" || sMenubar==undefined) sMenubar = "yes";
   if (sStatus =="" || sStatus==undefined) sStatus = "yes";
   if (sLocation =="" || sLocation==undefined) sLocation = "yes";
   if (sToolbar =="" || sToolbar==undefined) sToolbar = "yes";
   if (sScrollbar =="" || sScrollbar==undefined) sScrollbar = "yes";
   if (sResizable =="" || sResizable==undefined) sResizable = "yes";

   window.open(url_add,'add','width=' + sWidth +',height=' + sHeight +',menubar=' + sMenubar +',status=' + sStatus +',location=' + sLocation +',toolbar=' + sToolbar +',scrollbars=' + sScrollbar + ',resizable=' + sResizable);

} // end open_win

 function clearMe(formfield){
  if (formfield.defaultValue==formfield.value)
   formfield.value = ""
 }

function funcSetupLink(sSiteName, sLinkUrlId, newWindow , sViewMode8) {

  var sSiteNameParseKey = "SITENAME";

   var sHomepagePath = "/main/SiteGen/SITENAME/Content/Home.html";
   var sHomepageUrl = sHomepagePath.replace(sSiteNameParseKey, sSiteName);

    var sExternal = new String(">");
    
    
    
    var sLink = new String("");
    var sLinkA = new String("");

    //alert ("sSiteName=*" + sSiteName + "*")
    //alert ("sLinkUrlId=*" + sLinkUrlId + "*")
    //alert ("sHomepagePath=*" + sHomepagePath + "*")
    //alert ("sHomepageUrl=*" + sHomepageUrl  + "*")

    
    //Retrieve string hidden in a div with the id passed in as a parameter
    var oStandardLinks = document.getElementById(sLinkUrlId );

    if ( oStandardLinks ) 
    {
        sExternal = oStandardLinks.innerHTML;
        
        //alert ("If1-1 sExternal=*" + sExternal + "*")
        //sExternal = trimString(sExternal)
        //alert ("If1-2 sExternal=*" + sExternal + "*")
        
    }

    oStandardLinks = document.getElementById(sLinkUrlId+"_Link" );

    if ( oStandardLinks ) 
    {
        sLink = oStandardLinks.innerHTML;
        //alert ("If2 sLink=*" + sLink +  + "*")

    }

    oStandardLinks = document.getElementById(sLinkUrlId+"_LinkA" );

    if ( oStandardLinks ) 
    {
        sLinkA = oStandardLinks.innerHTML;
        //alert ("If3 sLinkA=*" + sLinkA + "*")

    }
    
    //alert ("sExternal=*" + sExternal + "*")
    //alert ("sLink=*" + sLink + "*")
    //alert ("sLinkA=*" + sLinkA + "*")
    
    //Manipulate StandardLink strings if you want to
    var sUrl = (sLinkA.indexOf("/eprise") == 0) ? sLink : sExternal;
 
    
    //alert ("sUrl 1=" + sUrl)
    //alert ("sHomepageUrl =" + sHomepageUrl)


    sUrl = (sUrl.length > 0) ? sUrl : sHomepageUrl;

    //alert ("About to send - sUrl 2= *" + sUrl + "*")

    if(sUrl.length > 0 && sUrl.indexOf("/") >= 0) 
    {
        //alert ("newwindow: " + newWindow)
        sUrl = sUrl.replace(/&amp;/g,"&")
   if( (sViewMode8 =="") ||  (sViewMode8 == undefined) )  sViewMode = "0";
     //alert("sViewMode8 is " + sViewMode8 );

     if (sViewMode8 != "8") {

        if (newWindow=='yes')
        {
           // alert ("newWindow=='yes'")
           history.back();         
            var openWindow = window.open(sUrl, '_blank'); 
            openWindow.focus();
            //history.back(); 

        }
        //else if (newWindow=='630x575')
        //{
            //alert ("newWindow=='630x575'")
        
    	    //var openWindow = window.open(sUrl,'630x575window','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,width=630,height=575');
           // openWindow.focus();
           // history.back(); 

      //  }
        else
        {
            //alert ("else")
            top.location.replace(sUrl);
        }    
    }
  } //end not viewmode8

}

//THIS IS ALL THE YUI STUFF

function funcPanelMe() {

    //var nX = null;
    //var nY = null;
    var nX = 194;  // set to default value
    var nY = 183;  // set to default value
    var sW = "207px"; // set to default value
    var sH = "360px"; // set to default value
    var sDialogXYWH = YAHOO.util.Cookie.get("DialogXYWH");

        if(typeof(sDialogXYWH) == "string" && sDialogXYWH.length > 0) {
            var aDialogXYWH = sDialogXYWH.split(",");

              nX = aDialogXYWH[0].toInt();
              nY = aDialogXYWH[1].toInt();
              sW = aDialogXYWH[2];
              if(sW.indexOf("px") == -1) { sW += "px"; }
                sH = aDialogXYWH[3];
                    if(sH.indexOf("px") == -1) { sH += "px"; }
            //YAHOO.util.Cookie.remove("DialogXYWH");
        }

    var oDialog = new YAHOO.widget.SimpleDialog("resizablepanel", {
         width: sW
        ,height: sH
        ,fixedcenter: (nX == null || nY == null) ? true : false // this can't be true if you're providing x & y values
        ,visible: false
        ,draggable: true
        ,close: true
        ,constraintoviewport: true
        ,x: nX
        ,y: nY
    });

    //oDialog.render(document.body);
    oDialog.render();
    oDialog.show();

    // Subscribe to the move event after the .show command,
    // otherwise this stuff runs as the dialog is building.
    // According to the API docs, this event fires after the move finishes.
    oDialog.moveEvent.subscribe(function(ev, pXY) {
                    //alert(ev + "\n" + pXY + " = " + typeof(pXY));
                    var nW = this.cfg.getProperty("width").toInt(); // toInt will remove the "px" at the end.
                    var nH = this.cfg.getProperty("height").toInt(); // toInt will remove the "px" at the end.
                    var sValue = pXY + "," + nW + "," + nH;
                    //alert(sValue);
                    YAHOO.util.Cookie.set("DialogXYWH", sValue, {
                            expires: new Date("January 12, 2025")
                        });
            });

    // Setup the resize widget.
    var resize = new YAHOO.util.Resize("resizablepanel", {
        handles: ["br"],
        autoRatio: false,
        minWidth: 200,
        minHeight: 150,
        status: false 
    });

    // When resizing a container widget, the body area doesn't automatically
    // resize. This fixes that.
    resize.on("resize", function(args) {
        this.cfg.setProperty("height", args.height + "px");
    }, oDialog, true);

    // When the user finishes resizing the container
    // then set the cookie to the new values.
    resize.on("endResize", function(args) {
            var nX = this.cfg.getProperty("x");
            var nY = this.cfg.getProperty("y");
            var nW = args.width;
            var nH = args.height;
            var sValue = nX + "," + nY + "," + nW + "," + nH;
            this.cfg.setProperty("width", nW + "px"); // I needed to set this again as a resize then drag didn't store the correct cookie.
            this.cfg.setProperty("height", nH + "px"); // I needed to set this again as a resize then drag didn't store the correct cookie.
            // alert(sValue);
            YAHOO.util.Cookie.set("DialogXYWH", sValue, {
                    expires: new Date("January 12, 2025")
                });
    }, oDialog, true);
    YAHOO.util.Event.on("showbtn", "mouseover", oDialog.show,oDialog,true);
} //end function



// This is the client-side httpget for the job postings

var strURL = "";
var strDivName = "";
var oHttp = null;

//////////////////////////////////////////////////////////////////////
//   funcOnSuccess
//////////////////////////////////////////////////////////////////////
//function  funcMakeRequest(sURL , sDiv)
//{
//   strDivName = sDiv;
//   strURL = sURL;
//   oHttp = funcGetXmlRequestObject();
//   oHttp.open("GET", strURL, true);  // 3rd argument: true = async request
//   oHttp.onreadystatechange = Function("funcHandleHTTPResponse()");
//   oHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
//   oHttp.send(null);
//}
function  funcMakeRequest(sURL , sDiv, sfeedURL)
{
   strDivName = sDiv;
   strURL = sURL;
   oHttp = funcGetXmlRequestObject();
   oHttp.open("POST", strURL, true);  // 3rd argument: true = async request
   oHttp.onreadystatechange = Function("funcHandleHTTPResponse()");
   oHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
   oHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   oHttp.send(sfeedURL);


//alert(sfeedURL)

}


//////////////////////////////////////////////////////////////////////
//   funcWriteToDiv
//////////////////////////////////////////////////////////////////////
function funcWriteToDiv(sMessage) {
     var oDiv = document.getElementById(strDivName);
     if (oDiv != null)
     {
          oDiv.innerHTML = sMessage;
     }
     else
     {
          alert('Could not find ' + strDivName);
     }
}

//////////////////////////////////////////////////////////////////////
//   funcGetXmlRequestObject
//////////////////////////////////////////////////////////////////////
  function funcGetXmlRequestObject() {
      var oReturn = false;

         if(window.XMLHttpRequest) {
            try {
               oReturn = new XMLHttpRequest();
            } catch(e) {
               oReturn = false;
            }
         } else if(window.ActiveXObject) {
            try {
               oReturn = new ActiveXObject("Msxml2.XMLHTTP");
            } catch(e) {
               try {
                  oReturn = new ActiveXObject("Microsoft.XMLHTTP");
               } catch(e) {
                  oReturn = false;
               }
            }
         }

      return oReturn;
   }

//////////////////////////////////////////////////////////////////////
//   funcHandleHTTPResponse
//////////////////////////////////////////////////////////////////////
 function funcHandleHTTPResponse()
 {
      var oRequest = oHttp;

          if(oRequest.readyState == 4) {
            if(oRequest.status == "200") {
               try {
                   if ( oRequest.responseText != null && 
                        oRequest.responseText.length > 0)
                    {
                          funcWriteToDiv(oRequest.responseText);
                    }
               } catch(e) {
                  funcWriteToDiv(e + "<hr>" + oRequest.status + ":<br>" + oRequest.statusText);
               }

               return;
            } else {
               funcWriteToDiv(oRequest.status + ":<br>" + oRequest.statusText);
               return;
            }
         }
   }