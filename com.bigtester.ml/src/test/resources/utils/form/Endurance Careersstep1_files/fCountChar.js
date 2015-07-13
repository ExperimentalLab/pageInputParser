document.oncontextmenu = "return true";
var ns6=document.getElementById&&!document.all


function theclick(e,theformarea) {
var theform=eval(theformarea);
//alert(theform.name);
if (document.all) {
if (event.button == 2) {
theform.oncontextmenu=new Function("return false");
//theform.insertafter(theform.value,window.clipboardData.getData("Text"); 
theform.value=theform.value + window.clipboardData.getData("Text");
return false;
}
}
if (document.layers) {
if (e.which == 3) {
document.oncontextmenu=new Function("return false");
theform.value=window.clipboardData.getData("Text");

return false;
}
}
return true;
}
if (document.layers) {
document.captureEvents(Event.MOUSEDOWN);
}

function restrictinput(maxlength,e,placeholder){
//alert(event.type);
if (window.event && event.srcElement && event.srcElement.value && event.srcElement.value.length >= maxlength)
return false

if(typeof event != "undefined" && (event.type != "" && event.srcElement && event.srcElement.value && event.srcElement.value.length >= maxlength))
{
return false;
}
else if (e.target&&e.target==eval(placeholder)&&e.target.value.length>=maxlength){
var pressedkey=/[a-zA-Z0-9\.\,\/]/ //detect alphanumeric keys
if (pressedkey.test(String.fromCharCode(e.which)))
e.stopPropagation()
}


}

function countlimit(maxlength,e,placeholder){

var theform=eval(placeholder)
var lengthleft=maxlength-theform.value.length
var placeholderobj=document.all? document.all[placeholder] : document.getElementById(placeholder)
if (window.event||e.target&&e.target==eval(placeholder)){
if (lengthleft<0)
theform.value=theform.value.substring(0,maxlength)
placeholderobj.innerHTML=lengthleft
}

if (typeof event!="undefined"&&(event.type=="mousedown"||event.type=="mouseup")){
if (lengthleft<0){
theform.value=theform.value.substring(0,maxlength)
placeholderobj.innerHTML=0
}
else 
placeholderobj.innerHTML=lengthleft;
}
}


function displaylimit(theform,thelimit,str){
var limit_text='<span class="appGeneralText"><b><span id="'+theform.toString()+'">'+thelimit+'</span></b> '+str.toString()+'</span>'
if (document.all||ns6)
document.write(limit_text)
if (document.all){
eval(theform).onkeypress=function(){ return restrictinput(thelimit,event,theform)}
eval(theform).onkeyup=function(){ countlimit(thelimit,event,theform)}
eval(theform).onmousedown=function(){return restrictinput(thelimit,event,theform)}
eval(theform).onmousedown=function(){countlimit(thelimit,event,theform)}
eval(theform).onmousedown=function(){theclick(event,theform)}
//eval(theform).oncontextmenu=function(){return restrictinput(thelimit,event,theform)}
eval(theform).onmouseup=function(){countlimit(thelimit,event,theform)}
//eval(theform).oncontextmenu=function(){countlimit(thelimit,event,theform)}
}
else if (ns6){
document.body.addEventListener('keypress', function(event) { restrictinput(thelimit,event,theform) }, true); 
document.body.addEventListener('keyup', function(event) { countlimit(thelimit,event,theform) }, true);
document.body.addEventListener('mousedown', function(event) { restrictinput(thelimit,event,theform) }, true);
document.body.addEventListener('mousedown', function(event) { countlimit(thelimit,event,theform) }, true);
document.body.addEventListener('mousedown', function(event) { theclick(event,theform) }, true);
document.body.addEventListener('mouseup', function(event) { countlimit(thelimit,event,theform) }, true);

  
}
}

