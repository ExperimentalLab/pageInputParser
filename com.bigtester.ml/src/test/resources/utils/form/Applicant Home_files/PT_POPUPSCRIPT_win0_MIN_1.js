




function PT_MOpopup()
{}

PT_MOpopup.prototype = {
init:function()
{
this.focusElem = null; this.bFocus=true; this.bIs_shown = false; this.nOpenDelay = 1; this.nCloseDelay = 0.6; this.tHandle=null; this.nDefWidth = 250; this.nDefHeight = 200; this.nMinHeight = 40; this.nMinHeightMouseHvrPopUp = 100; this.nMinWidth = 60; this.MOcurrWidth = this.nDefWidth; this.MOcurrHeight = this.nDefHeight; this.MOPopContainer="win0MOpopupContainer"; this.MOPopupInner ="win0MOpopupInner"; this.MOPopFrame = "win0MOdivpopupFrame"; this.PSPAGECONTAINER ="win0divPSPAGECONTAINER"; this.FORMNAME="win0";this.x=0; this.y=0; this.hoverId=null; this.hoverpopupId=null; this.bNetscp=0; this.bSafari=0; this.bIE=0; this.bChrome; this.fontW=7; this.fontW2=9; this.fontH=18; this.agt=navigator.userAgent.toLowerCase();if(this.agt.indexOf("chrome")!=-1)
 this.bChrome = 1
else if(this.agt.indexOf("safari")!=-1)
 this.bSafari=1;else if(navigator.appName=="Netscape")
 this.bNetscp=1;else
 this.bIE=1;},


IsInPagelet:function(object) 
{
var bInPagelet = false;if (!object)
 return bInPagelet;var MyParent=object.offsetParent;while(MyParent!=null)
 {
 if (MyParent.className == "PTPAGELET")
 {
 bInPagelet = true; break; }
 
 MyParent=MyParent.offsetParent; }

return bInPagelet;},


GetElementTop:function(object) 
{
if (!object)
 return 0;var nTop=object.offsetTop;var MyParent=object.offsetParent;while(MyParent!=null && MyParent.className != "PTPAGELET")
{
 nTop+=MyParent.offsetTop; MyParent=MyParent.offsetParent;}
return nTop;},



GetElementleft:function(object) 
{
if (!object)
 return 0;var nLeft=object.offsetLeft;var MyParent;MyParent=object.offsetParent;while(MyParent!=null && MyParent.className != "portlet-section-header" && MyParent.className != "PTPAGELET")
{
 nLeft+=MyParent.offsetLeft-MyParent.scrollLeft; MyParent=MyParent.offsetParent;}

nLeft+=document.body.scrollLeft; return nLeft;},



GetElementleftInPagelet:function(object) 
{
if (!object)
 return 0;var nLeft=object.offsetLeft;var MyParent;MyParent=object.offsetParent;while(MyParent!=null && MyParent.className != "portlet-section-header" && MyParent.className != "PTPAGELET")
{
 nLeft+=MyParent.offsetLeft; MyParent=MyParent.offsetParent;}

return nLeft;},

SetIEDivSize:function(hPop) 
{

var viewportWidth = ptCommonObj2.getViewportWidth()*0.9; var nMaxChars = viewportWidth/this.fontW; var nExtraLines=0;var nCharPerLine=hPop.offsetWidth/this.fontW+1; var nLines=hPop.offsetHeight/this.fontH+1; if (nCharPerLine > nMaxChars) { 
 nExtraLines = nCharPerLine/nMaxChars+1;  this.nDefWidth=nMaxChars*this.fontW2;  this.nDefHeight = (nLines + nExtraLines)*this.fontH ;}
else {
 this.nDefWidth= hPop.offsetWidth+this.fontW2; this.nDefHeight = hPop.offsetHeight+this.fontH;}
},


SetDivSizeManually:function(hPop) 
{
var viewportWidth = ptCommonObj2.getViewportWidth()*0.9; var viewportHeight = ptCommonObj2.getViewportHeight()*0.9; var nMaxLines = viewportHeight/this.fontH; var nMaxChars = viewportWidth/this.fontW; if (browserInfoObj2.isIE)
 var sText = hPop.innerText;else
 var sText = hPop.textContent;var sArray=sText.split('\n');var nCharPerLine=0;var nEmptylines=0;for (i=0; i<sArray.length; i++) {
 if (sArray[i].length > nCharPerLine)
 nCharPerLine = sArray[i].length; if (!browserInfoObj2.isIE) {
 if (sArray[i].length == 0)
 nEmptylines++; else
 nEmptylines = 0; }
}

var nLines=sArray.length;  if (!browserInfoObj2.isIE) 
 nLines = nLines - nEmptylines;if (nCharPerLine > nMaxChars) 
 this.nDefWidth = nMaxChars * this.fontW; else 
 this.nDefWidth= nCharPerLine * this.fontW;if (!browserInfoObj2.isIE) 
 var nfontH = this.fontH - 2;else
 var nfontH = this.fontH;if (nLines > nMaxLines)
 this.nDefHeight = nMaxLines * nfontH;else
 this.nDefHeight = nLines * nfontH;},

SetDivSize:function(hPop) 
{
 var viewportWidth = ptCommonObj2.getViewportWidth()*0.9;   if (browserInfoObj2.isIE && (viewportWidth-30) > 60)
 viewportWidth = viewportWidth - 30;   if (hPop.offsetWidth == 0 || hPop.offsetHeight == 0) {
 this.SetDivSizeManually(hPop); return;  }

 
 if (browserInfoObj2.isIE && hPop.offsetWidth > viewportWidth) 
 this.SetIEDivSize(hPop); else {
 this.nDefWidth= hPop.offsetWidth+this.fontW2; this.nDefHeight = hPop.offsetHeight+this.fontH; }
},


StartAccess:function(event, hoverId,popupId, nWidth, nHeight)
{
this.StartPopup(hoverId,popupId, nWidth, nHeight);cancelBubble(event);return false; },


StopAccess:function(event)
{
this.StopPopup();cancelBubble(event);return false; },


StartAccessibilityPopup:function(hoverId,popupId, nWidth, nHeight) 
{
 
 if (hoverId.length == 0) 
 return; var hPop = document.getElementById(popupId);  this.hoverId=hoverId; this.hoverpopupId=popupId; this.tHandle = null; this.ShowAccessibilityPopup();},


ShowAccessibilityPopup:function() 
{
 this.tHandle = null; if (this.hoverpopupId == null || this.hoverpopupId=="" ) return; var hPop = document.getElementById(this.hoverpopupId);  var hp = document.getElementById(this.MOPopContainer);  var popupFrame = document.getElementById(this.MOPopFrame);  hp.style.display = "block"; popupFrame.innerHTML=hPop.innerHTML; popupFrame.style.dislay='block'; if (popupFrame)
 popupFrame.style.cursor = "Pointer";  this.bIs_shown = true; this.bFocus = true; hp.style.top=1+"px";  hp.style.left=1+"px"; hp.style.visibility = "Visible"; hp.style.zIndex="1"; if (document.activeElement != null && document.activeElement.tagName != null && document.activeElement.tagName.indexOf("BODY") <0) {
 this.focusElem = document.activeElement;  if (this.focusElem != null)
 this.focusElem.blur(); }
 else
 this.focusElem=null; bMOPopupDisplay_win0=true; for (var i=0; i<document.forms.length; i++)
 {
 document.forms[i].style.visibility="hidden"; if (!this.bIE)
 document.forms[i].style.display="none"; }

 if (this.bIE)
 popupFrame.childNodes[0].focus();  else
 popupFrame.children[0].focus(); },


StartPopup:function(hoverId,popupId, nWidth, nHeight) 
{
 
 if (bAccessibility_win0) 
 {
 this.StartAccessibilityPopup(hoverId,popupId, nWidth, nHeight); return; }

 
 if ((hoverId.toLowerCase()).indexOf((this.MOPopContainer).toLowerCase()) == 0 && hoverId.length == (this.MOPopContainer).length)
 {
 if (this.tHandle != null)
 clearTimeout(this.tHandle); if (this.bIs_shown == true)
 return; this.ShowPopup(); }
 else 
 {
 this.nDefWidth = 250;  this.nDefHeight = 200;  if (this.tHandle != null)
 clearTimeout(this.tHandle); if (hoverId != null && hoverId != "") 
 {
 var hItem = document.getElementById(hoverId);  if (hItem)
 hItem.style.cursor = "Pointer";  }

 
 var hPop = document.getElementById(popupId);  if (hPop) 
 { 
 if (nHeight >0)

 this.MOcurrHeight = nHeight; else if (this.bIE)
 this.MOcurrHeight = hPop.offsetHeight + 5; else
 this.MOcurrHeight = hPop.offsetHeight;   if (nWidth>0)

 this.MOcurrWidth = nWidth; else if (this.bIE)
 {
 if (hPop.offsetWidth == 0)
 this.MOcurrWidth = 400 + 5; else
 this.MOcurrWidth = hPop.offsetWidth + 5; if (this.MOcurrWidth > 600)
 this.MOcurrWidth = 600; }
 else
 {
 if (hPop.offsetWidth == 0)
 this.MOcurrWidth = 400; else
 this.MOcurrWidth = hPop.offsetWidth; if (this.MOcurrWidth > 600)
 this.MOcurrWidth = 600; }
 }

 this.hoverId=hoverId; this.hoverpopupId=popupId; if (this.MOcurrWidth <=20) 
 this.MOcurrWidth = this.nDefWidth;  if (this.MOcurrHeight <= 20) 
 this.MOcurrHeight = this.nDefHeight;  this.tHandle=setTimeout("MOpopupObj_win0.ShowPopup()",this.nOpenDelay * 1000); }
},

SetFocusFlag:function(bValue) 
{
 if (!bAccessibility_win0) 
 this.bFocus = bValue;},

ShowPopup:function() 
{
 this.tHandle = null; if (this.hoverpopupId == null || this.hoverpopupId=="" ) return; var hp = document.getElementById(this.hoverpopupId);  this.UpdatePopup(hp.innerHTML);  hp = document.getElementById(this.MOPopContainer);  var popupFrame = document.getElementById(this.MOPopFrame);  if (popupFrame)
 popupFrame.style.cursor = "Pointer";  this.bIs_shown = true; this.bFocus = true; hp.style.top=this.y+"px"; hp.style.left=this.x+"px"; hp.style.display = "block"; hp.style.visibility = "visible"; hp.style.zIndex="12000"; if (document.activeElement != null && document.activeElement.tagName != null && document.activeElement.tagName.indexOf("BODY") <0) {

 this.focusElem = document.activeElement;  if (this.focusElem != null)
 this.focusElem.blur(); }
 else
 this.focusElem=null;},



StopPopup:function(bNoDelay) 
{
 if (this.tHandle != null)
 clearTimeout(this.tHandle); if (this.hoverId != null || this.hoverId != "") {
 var hItem = document.getElementById(this.hoverId);  if (hItem)
 hItem.style.cursor = "";  }
 this.tHandle = null; if ((bAccessibility_win0) || (typeof bNoDelay !="undefined")) 
 this.HidePopup(); else
 this.tHandle=setTimeout("MOpopupObj_win0.HidePopup()", 1000 * this.nCloseDelay);},

HidePopup:function() 
{
 var PopContainer = document.getElementById(this.MOPopContainer);  PopContainer.style.visibility = "Hidden"; PopContainer.style.zIndex="1"; this.bIs_shown = false; if (bAccessibility_win0) 
 {
 var nLen = document.forms.length; for (var i=0; i<nLen; i++)
 {
 document.forms[i].style.visibility="visible"
 if (!this.bIE)
 document.forms[i].style.display="block"; } 
 }
 if (this.focusElem != null && this.bFocus) { 
 try {
 this.focusElem.focus();  }
 catch(err){}
 }
},

UpdatePopup:function(sHTML) 
{
 var MOpopContainer = document.getElementById(this.MOPopContainer);  var MOpopupInner = document.getElementById(this.MOPopupInner);  var MOpopFrame = document.getElementById(this.MOPopFrame);  var MOForm = document.forms[this.FORMNAME]; var PsPageContainer = document.getElementById(this.PSPAGECONTAINER);  MOpopFrame.scrollTop=0;  MOpopFrame.scrollLeft=0;  MOpopContainer.style.display = "block"; MOpopupInner.style.display = "block"; hItem=document.getElementById(this.hoverId);    if (!hItem) 
 {
 var RegExp1 = /^win\d+div/
 if (this.hoverId.search(RegExp1) > -1) 
 {
 this.hoverId = (this.hoverId).replace(RegExp1, ""); hItem=document.getElementById(this.hoverId);  }
 }

 var bInPagelet = this.IsInPagelet(hItem);  var viewportHeight = ptCommonObj2.getViewportHeight();  var viewportWidth = ptCommonObj2.getViewportWidth();    if (bInPagelet)
 {
 if (MOForm)
 {
 viewportHeight = MOForm.offsetHeight; viewportWidth = MOForm.offsetWidth; }
 else if (PsPageContainer)
 {
 viewportHeight = PsPageContainer.offsetHeight; viewportWidth = PsPageContainer.offsetWidth; }
 }
 
 
 if (this.bIE && (viewportWidth-30) > 60)
 viewportWidth = viewportWidth - 30;  else if (!this.bIE && (viewportWidth-50) > 60)
 viewportWidth = viewportWidth - 50;  if (this.MOcurrWidth > 0) 
 {
 if (this.MOcurrWidth > viewportWidth)
 this.MOcurrWidth = viewportWidth; }
 else
 this.MOcurrWidth = viewportWidth;  var nLeft1, nLeft;  if (bInPagelet)
 {
 nLeft1 = this.GetElementleftInPagelet(hItem);  nLeft = nLeft1;  }
 else
 {
 nLeft1=this.GetElementleft(hItem);  nLeft=nLeft1 - document.body.scrollLeft;  }
 
 var nSaveLeft = 0; if (nLeft<0) 
 { 
 nSaveLeft = nLeft; nLeft=-nLeft; }
 
 var nRight = nLeft + this.MOcurrWidth;  var nDiff = viewportWidth - nRight;  if (nDiff >0) 
 this.x = nLeft1; else 
 { 
 this.x = nLeft1+nDiff; if (this.x <0) 
 this.MOcurrWidth = this.MOcurrWidth + this.x;  }

 if (this.MOcurrWidth <this.nMinWidth)
 this.MOcurrWidth = this.nMinWidth;  if (this.x <=0) 
 {
 if (nSaveLeft <0)
 this.x = document.body.scrollLeft + 1; else
 this.x = 1; }

 
 var nHtop1=this.GetElementTop(hItem);  var nHtop=nHtop1 - document.body.scrollTop;  if (bInPagelet)
 {
 
 
 if (document.body.scrollTop > nHtop1) 
 nHtop = nHtop1; }
 
 var nAbHeight = nHtop - 41;  var nBelHeight = viewportHeight - (nHtop + hItem.offsetHeight)-20;  if (!this.bIE) 
 { 
 nAbHeight = nAbHeight - 15; nBelHeight = nBelHeight -15; }

 if (this.MOcurrHeight > nAbHeight && this.MOcurrHeight > nBelHeight) 
 {
 if (nAbHeight > nBelHeight) 
 {
 this.MOcurrHeight = nAbHeight; if (this.bIE) 
 this.y = nHtop1 - this.MOcurrHeight-5;  else
 this.y = nHtop1 - this.MOcurrHeight-30;  }
 else 
 {
 this.MOcurrHeight = nBelHeight; this.y = nHtop1 + hItem.offsetHeight+9;  }
 }
 else if (this.MOcurrHeight <= nAbHeight)
 {
 if (this.bIE) 
 this.y = nHtop1 - this.MOcurrHeight-5;  else
 this.y = nHtop1 - this.MOcurrHeight-30;  }
 else if (this.MOcurrHeight <= nBelHeight)
 this.y = nHtop1 + hItem.offsetHeight+9;  if (this.y<0) 
 {
 this.MOcurrHeight = this.MOcurrHeight + this.y;  this.y = 0; }

 if (this.MOcurrHeight < this.nMinHeightMouseHvrPopUp)
 this.MOcurrHeight = this.nMinHeightMouseHvrPopUp;     MOpopFrame.innerHTML=sHTML; MOpopFrame.style.dislay='block'; MOpopContainer.style.width = (this.MOcurrWidth) + "px";  MOpopContainer.style.height = (this.MOcurrHeight) + "px";  MOpopupInner.style.width = (this.MOcurrWidth) + "px";  MOpopupInner.style.height = (this.MOcurrHeight) + "px";  MOpopFrame.style.width = (this.MOcurrWidth) + "px";   MOpopFrame.scrollLeft=500;   if (MOpopFrame.scrollLeft>0 && (this.MOcurrWidth+MOpopFrame.scrollLeft)<viewportWidth) 
 { 
 this.MOcurrWidth=this.MOcurrWidth+MOpopFrame.scrollLeft; MOpopFrame.innerHTML=sHTML; MOpopContainer.style.width = (this.MOcurrWidth) + "px";  MOpopupInner.style.width = (this.MOcurrWidth) + "px";  MOpopFrame.style.width = (this.MOcurrWidth) + "px"; }

 MOpopFrame.scrollLeft=0;  if (!this.bIE && !browserInfoObj2.isSafari)
 MOpopFrame.style.height = "100%"; else
 MOpopFrame.style.height = (this.MOcurrHeight) + "px";}
}



function PT_Helppopup()
{}

PT_Helppopup.prototype = {
init:function()
{
this.focusElem = null; this.bFocus=true; this.bIs_shown = false; this.nOpenDelay = 1; this.nCloseDelay = 0.6; this.tHandle=null; this.nDefWidth = 250; this.nDefHeight = 200; this.minWidth = 341;this.minHeight = 150; this.HelpcurrWidth = this.nDefWidth; this.HelpcurrHeight = this.nDefHeight; this.Helppop="HelppopupContainer"; this.x=0; this.y=0; this.hoverId=null; this.hoverpopupId=null; this.bFirefox=0; this.bSafari=0; this.bIE=0; this.fontW=7; this.fontW2=9; this.fontH=18; this.moveCounter = -1;this.isSwanSS = ((typeof(ptStyleSheet) == "undefined") || (ptStyleSheet.indexOf("SWAN") != -1)) ? true : false;this.startEventPos = new Array();this.startPosWindow = new Array();this.startWindowSize = new Array();this.agt=navigator.userAgent.toLowerCase();if(this.agt.indexOf("safari")!=-1)
 this.bSafari=1;else if(this.agt.indexOf("firefox")!=-1)
 this.bFirefox=1;else
 this.bIE=1;this.haslabel="false";this.isSwanSS = ((typeof(ptStyleSheet) == "undefined") || (ptStyleSheet.indexOf("SWAN") != -1)) ? true : false;this.isTangSS = ((typeof(ptStyleSheet) == "undefined") || (ptStyleSheet.indexOf("TANGERINE") != -1)) ? true : false;},

GetElementTop:function(evt, object) 
{

if(evt.pageY) return evt.pageY;else if (evt.clientY)
 return evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);else return null;},

GetElementleft:function(evt, object) 
{

if(evt.pageX) return evt.pageX;else if (evt.clientX)
 return evt.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);else return null;},

SetDivSize:function(hPop) 
{
 var tempw = this.minWidth; var temph = 0; var maxWidth = ptCommonObj2.getViewportWidth()*0.8; var maxHeight = ptCommonObj2.getViewportHeight()*0.8; var pos=0; while(pos != -1) {
 if (this.bIE) {
 pos = hPop.innerHTML.indexOf("<BR>", pos + 4); if(pos != -1)
 temph += this.fontH; }
 else {
 pos = hPop.innerHTML.indexOf("<br>", pos + 4); if(pos != -1)
 temph += this.fontH*1.01; }
 }
 while((hPop.innerHTML.length * this.fontW * this.fontH > tempw * temph) && (tempw != maxWidth || temph != maxHeight)) 
 {
 if(tempw < maxWidth) tempw = tempw + this.minWidth * 0.1; else tempw = maxWidth; if(temph < maxHeight) temph = temph + this.minHeight * 0.1; else temph = maxHeight;  } 
 if(temph < this.minHeight)
 temph = this.minHeight; if(temph > maxHeight)
 temph = maxHeight; this.nDefWidth = tempw; this.nDefHeight = temph; return; },

StartAccessibilityPopup:function(hoverId,popupId, nWidth, nHeight) 
{
 
 if (hoverId.length == 0) 
 return; var hPop = document.getElementById(popupId);  var hPop = document.getElementById(popupId);  this.hoverId=hoverId; this.hoverpopupId=popupId; this.tHandle = null; this.ShowAccessibilityPopup();},

ShowAccessibilityPopup:function() 
{
 this.tHandle = null; if (this.hoverpopupId == null || this.hoverpopupId=="" ) return; var hPop = document.getElementById(this.hoverpopupId);  var hp = document.getElementById(this.Helppop);  var popupFrame = document.getElementById("HelpdivpopupFrame");  hp.style.display = "block"; popupFrame.innerHTML=hPop.innerHTML; popupFrame.style.dislay='block'; if (popupFrame)
 popupFrame.style.cursor = "Pointer";  this.bIs_shown = true; this.bFocus = true; hp.style.top=1+"px";  hp.style.left=1+"px"; hp.style.visibility = "Visible"; hp.style.zIndex="1"; if (document.activeElement != null && document.activeElement.tagName != null && document.activeElement.tagName.indexOf("BODY") <0) {
 this.focusElem = document.activeElement;  if (this.focusElem != null)
 this.focusElem.blur(); }
 else
 this.focusElem=null; bHelpPopupDisplay_win0=true; for (var i=0; i<document.forms.length; i++)
 {
 document.forms[i].style.visibility="hidden"; if (!this.bIE)
 document.forms[i].style.display="none"; }

 if (this.bIE)
 popupFrame.childNodes[0].focus();  else
 popupFrame.children[0].focus(); },


StartAccess:function(event, hoverId,popupId, nWidth, nHeight,labeltext)
{
this.StartAccessibilityPopup(hoverId,popupId, nWidth, nHeight);cancelBubble(event);return false; },


StopAccess:function(event)
{
this.StopPopup();cancelBubble(event);return false; },

StartPopup:function(evt,hoverId,popupId, nWidth, nHeight, labeltext, helptext) 
{
 if (bAccessibility_win0) 
 {
 this.StartAccessibilityPopup(hoverId,popupId, nWidth, nHeight); return; }
 evt = evt || window.event; this.isSwanSS = ((typeof(ptStyleSheet) == "undefined") || (ptStyleSheet.indexOf("SWAN") != -1)) ? true : false; this.isTangSS = ((typeof(ptStyleSheet) == "undefined") || (ptStyleSheet.indexOf("TANGERINE") != -1)) ? true : false; if ((hoverId.toLowerCase()).indexOf((this.Helppop).toLowerCase()) == 0 && hoverId.length == (this.Helppop).length)
 {
 if (this.tHandle != null)
 clearTimeout(this.tHandle); if (this.bIs_shown == true)
 return; this.ShowPopup(evt); }
 else
 {
 this.nDefWidth = 250;  this.nDefHeight = 200;  if (this.tHandle != null)
 clearTimeout(this.tHandle); if (hoverId != null && hoverId != "") {
 var hItem = document.getElementById(hoverId);  }
 
 if (!hItem) 
 {
 var RegExp1 = /^win\d+div/
 if (hoverId.search(RegExp1) > -1) 
 {
 hoverId = (hoverId).replace(RegExp1, ""); hItem=document.getElementById(hoverId);  }
 }
 var HelppopTitleBarMiddle = document.getElementById("HelppopupTitleBarMiddle"); var HelppopTitle = document.getElementById("HelppopupTitle");  if (HelppopTitle) { 
 ptEvent.add(HelppopTitle,"mousedown",HelppopupObj_win0.InitMovePopup);  ptEvent.add(document,"mouseup",HelppopupObj_win0.StopMovePopup); ptEvent.add(document,"mousemove",HelppopupObj_win0.MovePopup); } 
 if(!bWSRP) 
 HelppopTitle.innerHTML="<span class='PTPOPUP_TITLE'>" + helptext +" - " + labeltext+"</span>"; else
 HelppopTitle.innerHTML="<span style='background-color: #FFFFFF; color:#446590; font-family:Arial; font-size:11pt; font-weight:normal; padding-left:10px'>" + helptext +" - " + labeltext+"</span>"; this.haslabel="true"; }


 var hPop = document.getElementById(popupId);     var HelppopupDiv = document.getElementById("HelppopupDiv");  HelppopupDiv.innerHTML=hPop.innerHTML;    if ((nWidth== 0 || nHeight==0) && popupId != null && popupId != "") {
 if (hPop) { 
 this.SetDivSize(HelppopupDiv); this.HelpcurrHeight=this.nDefHeight; this.HelpcurrWidth=this.nDefWidth; }
 }
 else { 

 if (hPop) { 
 this.HelpcurrHeight = HelppopupDiv.offsetHeight; this.HelpcurrWidth = HelppopupDiv.offsetWidth; }
 }

 HelppopupDiv.innerHTML='t';  this.hoverId=hoverId; this.hoverpopupId=popupId; if (this.HelpcurrWidth <=20) 
 this.HelpcurrWidth = this.nDefWidth;  if (this.HelpcurrHeight <= 20) 
 this.HelpcurrHeight = this.nDefHeight;  HelppopupObj_win0.ShowPopup(evt);},

SetFocusFlag:function(bValue) 
{
 this.bFocus = bValue;},

ShowPopup:function(evt) 
{
 this.tHandle = null; if (this.hoverpopupId == null || this.hoverpopupId=="" ) return; var hp = document.getElementById(this.hoverpopupId);  this.UpdatePopup(evt,hp.innerHTML);  hp = document.getElementById(this.Helppop);  var popupFrame = document.getElementById('HelpdivpopupFrame');  this.bIs_shown = true; this.bFocus = true; hp.style.top=this.y+"px"; hp.style.left=this.x+"px"; hp.style.display = "block"; hp.style.zIndex=300; hp.style.visibility = "Visible"; if (document.activeElement != null && document.activeElement.tagName != null && document.activeElement.tagName.indexOf("BODY") <0) {

 this.focusElem = document.activeElement;  if (this.focusElem != null)
 this.focusElem.blur(); }
 else
 this.focusElem=null; HelppopupObj_win0.SetHeader(); HelppopupObj_win0.SetShadow(); var HelppopContainer = document.getElementById("HelppopupContainer"); var HelppopFrame = document.getElementById("HelpdivpopupFrame"); HelppopFrame.focus(); ptEvent.add(HelppopContainer,"keypress",HelppopupObj_win0.HandleEscapeKey); cancelBubble(evt);},

SetHeader:function() {
var HelppopTitleBar = document.getElementById("HelppopupTitleBar");var HelppopupTitleBarMiddle = document.getElementById("HelppopupTitleBarMiddle");var HelppopupTitle = document.getElementById("HelppopupTitle");if(this.isTangSS && !this.bIE)
 HelppopTitleBar.style.width = (this.nDefWidth-1) + "px";else
 HelppopTitleBar.style.width = this.nDefWidth + "px";if (this.bIE) {
 if(this.isSwanSS || this.isTangSS)
 HelppopupTitleBarMiddle.style.width = (this.nDefWidth - 6) + "px"; else
 HelppopupTitleBarMiddle.style.width = (this.nDefWidth - 4) + "px";}
else
{
 if(this.isSwanSS || this.isTangSS)
 HelppopupTitleBarMiddle.style.width = (this.nDefWidth - 8) + "px"; else 
 HelppopupTitleBarMiddle.style.width = (this.nDefWidth - 6) + "px";}
HelppopupTitle.style.width = (this.nDefWidth - 43) + "px";},

SetShadow:function() {
var HelppopShadow = document.getElementById("HelppopupShadow");var HelppopShadowTop = document.getElementById("HelppopupShadowTop");var HelppopShadowBottom = document.getElementById("HelppopupShadowBottom");var HelppopShadowBottomMiddle = document.getElementById("HelppopupShadowBottomMiddle");if(!this.bIE && !this.isSwanSS && 'ltr' == 'rtl') {
 HelppopShadowBottom.style.width = (this.HelpcurrWidth + 1) + "px"; HelppopShadowBottomMiddle.style.width = (this.HelpcurrWidth - 19) + "px";}
else {
 HelppopShadowBottom.style.width = (this.HelpcurrWidth + 2) + "px"; HelppopShadowBottomMiddle.style.width = (this.HelpcurrWidth - 18) + "px";}
if(!this.bIE)
 HelppopShadowTop.style.height = (this.HelpcurrHeight - 1) + "px"; else
 HelppopShadowTop.style.height = (this.HelpcurrHeight - 1) + "px";},

HandleEscapeKey:function(evt) {
 if(evt.type=="keypress") {
 var kC=keyPressHandler(evt); if (kC!=27) return; }
 var hp = document.getElementById("HelppopupContainer"); if(hp)
 ptEvent.remove(hp,"keypress",HelppopupObj_win0.HandleEscapeKey); cancelBubble(evt); HelppopupObj_win0.StopPopup();},

StopPopup:function() 
{
 var hp = document.getElementById("HelppopupContainer");  var HelppopupInner = document.getElementById("HelppopupInner");  var HelppopFrame = document.getElementById("HelpdivpopupFrame");  if (hp)
 hp.style.visibility = "Hidden"; if (this.hoverId != null || this.hoverId != "") {
 var hItem = document.getElementById(this.hoverId);  if (hItem)
 hItem.style.cursor = "";  }
 if ((typeof bAccessibility_win0 != 'undefined') && (bAccessibility_win0)) 
 {
 for (var i=0; i<document.forms.length; i++)
 {
 document.forms[i].style.visibility="visible"
 if (!this.bIE)
 document.forms[i].style.display="block"; }
 }

 if (this.focusElem != null && this.bFocus) { 
 try {
 this.focusElem.focus(); }
 catch(err){}
 }
 this.bIs_shown = false;},

InitMovePopup:function(e){
 var HelppopContainer = document.getElementById("HelppopupContainer");  if(document.all) e = event; if(document.all) e = event;  var HelppopInner = document.getElementById("HelppopupInner");  var HelpDragframe = document.getElementById('HelpDragFrame');  var XYposition = ptCommonObj2.getPosition(HelppopInner);  HelppopupObj_win0.moveCounter = 1; HelppopupObj_win0.startEventPos = [e.clientX,e.clientY]; HelppopupObj_win0.startPosWindow = [XYposition.x,XYposition.y];  if (HelpDragframe) {
 HelpDragframe.style.width= HelppopInner.offsetWidth + "px"; HelpDragframe.style.height= HelppopInner.offsetHeight + "px";  HelpDragframe.style.top= XYposition.y + 'px'; HelpDragframe.style.left= XYposition.x + 'px'; HelpDragframe.style.display="block";   HelpDragframe.style.zIndex="999"; } 
},

StopMovePopup:function(e) {
 if(HelppopupObj_win0.moveCounter>=1){ 
 var HelppopContainer = document.getElementById("HelppopupContainer");  var XYposition = ptCommonObj2.getPosition(document.getElementById('HelpDragFrame')); HelppopContainer.style.left = XYposition.x + "px";  HelppopContainer.style.top = XYposition.y + "px";  var HelpDragframe = document.getElementById('HelpDragFrame');  if (HelpDragframe) {
  HelpDragframe.style.zIndex=-1;  HelpDragframe.style.display="none";  HelpDragframe.style.width= 0+'px';  HelpDragframe.style.height= 0+'px';  HelpDragframe.style.top= 0 + "px";  HelpDragframe.style.left= 0 + "px"; }
 HelppopupObj_win0.moveCounter=0; }
},

MovePopup:function(e) {
 if(document.all)
 e = event; var HelpDragframe = document.getElementById('HelpDragFrame');  if(HelppopupObj_win0.moveCounter>=1 && HelpDragframe){ 
 var mx = e.clientX; var my = e.clientY;  HelpDragframe.style.left = HelppopupObj_win0.startPosWindow[0] + mx - HelppopupObj_win0.startEventPos[0] + 'px';  var mx = e.clientX; var my = e.clientY; HelpDragframe.style.top = HelppopupObj_win0.startPosWindow[1] + my - HelppopupObj_win0.startEventPos[1] + 'px';  }
},

UpdatePopup:function(evt,sHTML) 
{
 var HelppopContainer = document.getElementById(this.Helppop);  var HelppopupInner = document.getElementById("HelppopupInner");  var HelppopFrame = document.getElementById("HelpdivpopupFrame");  HelppopFrame.scrollTop=0;  HelppopFrame.scrollLeft=0;    hItem=document.getElementById(this.hoverId);  var viewportHeight = ptCommonObj2.getViewportHeight();  var viewportWidth = ptCommonObj2.getViewportWidth();   if (this.bIE && (viewportWidth-30) > 60)
 viewportWidth = viewportWidth - 30;  else if (!this.bIE && (viewportWidth-50) > 60)
 viewportWidth = viewportWidth - 50;  if (this.HelpcurrWidth > 0) {
 if (this.HelpcurrWidth > viewportWidth)
 this.HelpcurrWidth = viewportWidth; }
 else
 this.HelpcurrWidth = viewportWidth;  var nLeft=this.GetElementleft(evt, hItem);  if('ltr' == 'ltr') {
 nLeft = nLeft + 20; }
 else {
 if(this.bIE)
 nLeft = nLeft - 2*this.HelpcurrWidth - 20; else
 nLeft = nLeft - this.HelpcurrWidth - 20; }
 if(nLeft + this.HelpcurrWidth > viewportWidth) {
 this.x = nLeft - this.HelpcurrWidth - 35; if(this.x < 3)
 this.x = 3; }
 else
 this.x = nLeft;  var nTop=this.GetElementTop(evt, hItem); if(nTop + 20 + this.HelpcurrHeight > viewportHeight) {
 this.y = nTop - this.HelpcurrHeight - 35; if(this.y < 3)
 this.y = 3; }
 else
 this.y = nTop + 20; if (this.HelpcurrHeight < this.nMinHeight)
 this.HelpcurrHeight = this.nMinHeight;  HelppopContainer.style.width = this.HelpcurrWidth + "px";  HelppopupInner.style.width = this.HelpcurrWidth + "px";  HelppopupInner.style.height = this.HelpcurrHeight + "px";  HelppopFrame.innerHTML=sHTML; HelppopFrame.style.border = "1px solid #666666"; HelppopFrame.style.borderTop = "1px solid #c9ced5"; HelppopupInner.style.boxShadow = "0 0 5px #000000"; HelppopFrame.style.boxShadow = "0 0 5px #000000";  if (this.bIE) {
 if(detectDoctype() && !bWSRP)
 HelppopFrame.style.width = (this.HelpcurrWidth - 24) + "px"; else
 HelppopFrame.style.width = this.HelpcurrWidth + "px"; }
 else
 HelppopFrame.style.width = (this.HelpcurrWidth) - 25 + "px";   HelppopFrame.scrollLeft=500;  if (HelppopFrame.scrollLeft>0 && (this.HelpcurrWidth+HelppopFrame.scrollLeft)<viewportWidth) {
 this.HelpcurrWidth=this.HelpcurrWidth+HelppopFrame.scrollLeft; HelppopFrame.innerHTML=sHTML; HelppopContainer.style.width = this.HelpcurrWidth;  HelppopupInner.style.width = this.HelpcurrWidth;  HelppopFrame.style.width = (this.HelpcurrWidth) - 10 + "px"; }
 else if(!this.bIE && !this.isSwanSS)
 HelppopupInner.style.width = this.HelpcurrWidth + 1; HelppopFrame.scrollLeft=0; if (!(this.bIE && browserInfoObj2.version < 9) && detectDoctype())
 HelppopFrame.style.height = (this.HelpcurrHeight) - 34 + "px";  else
 HelppopFrame.style.height = (this.HelpcurrHeight) + "px";}
}

var MOpopupObj_win0 = new PT_MOpopup(); MOpopupObj_win0.init();var HelppopupObj_win0 = new PT_Helppopup(); HelppopupObj_win0.init();