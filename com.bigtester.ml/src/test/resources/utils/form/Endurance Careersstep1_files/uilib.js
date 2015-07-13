/* ***** Utility plugins ***** */

/*
 * CFDUMP for JavaScript (jQuery plugin)
 * http://www.netgrow.com.au/files/javascript_dump.cfm 
 */
jQuery.fn.dump=function(showTypes,showAttributes){jQuery.dump($(this),showTypes,showAttributes);return this;};jQuery.dump=function(object,showTypes,showAttributes){var dump='';var st=typeof showTypes=='undefined'?true:showTypes;var sa=typeof showAttributes=='undefined'?true:showAttributes;var winName='dumpWin';var w=760;var h=500;var leftPos=screen.width?(screen.width-w)/2:0;var topPos=screen.height?(screen.height-h)/2:0;var settings='height='+h+',width='+w+',top='+topPos+',left='+leftPos+',scrollbars=yes,menubar=yes,status=yes,resizable=yes';var title='Dump';var script='function tRow(s) {t = s.parentNode.lastChild;tTarget(t, tSource(s)) ;}function tTable(s) {var switchToState = tSource(s) ;var table = s.parentNode.parentNode;for (var i = 1; i < table.childNodes.length; i++) {t = table.childNodes[i] ;if (t.style) {tTarget(t, switchToState);}}}function tSource(s) {if (s.style.fontStyle == "italic" || s.style.fontStyle == null) {s.style.fontStyle = "normal";s.title = "click to collapse";return "open";} else {s.style.fontStyle = "italic";s.title = "click to expand";return "closed" ;}}function tTarget (t, switchToState) {if (switchToState == "open") {t.style.display = "";} else {t.style.display = "none";}}';var _recurse=function(o,type){var i;var j=0;var r='';type=_dumpType(o);switch(type){case'regexp':var t=type;r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td colspan="2"'+_dumpStyles(t,'td-value')+'><table'+_dumpStyles('arguments','table')+'><tr><td'+_dumpStyles('arguments','td-key')+'><i>RegExp: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o+'</td></tr></table>';j++;break;case'date':var t=type;r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td colspan="2"'+_dumpStyles(t,'td-value')+'><table'+_dumpStyles('arguments','table')+'><tr><td'+_dumpStyles('arguments','td-key')+'><i>Date: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o+'</td></tr></table>';j++;break;case'function':var t=type;var a=o.toString().match(/^.*function.*?\((.*?)\)/im);var args=(a==null||typeof a[1]=='undefined'||a[1]=='')?'none':a[1];r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td colspan="2"'+_dumpStyles(t,'td-value')+'><table'+_dumpStyles('arguments','table')+'><tr><td'+_dumpStyles('arguments','td-key')+'><i>Arguments: </i></td><td'+_dumpStyles(type,'td-value')+'>'+args+'</td></tr><tr><td'+_dumpStyles('arguments','td-key')+'><i>Function: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o+'</td></tr></table>';j++;break;case'domelement':var t=type;var attr='';if(sa){for(i in o){if(!/innerHTML|outerHTML/i.test(i)){attr+=i+': '+o[i]+'<br />';}}}
r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>Node Name: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.nodeName.toLowerCase()+'</td></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>Node Type: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.nodeType+'</td></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>Node Value: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.nodeValue+'</td></tr>';if(sa){r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>Attributes: </i></td><td'+_dumpStyles(type,'td-value')+'>'+attr+'</td></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>innerHTML: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.innerHTML+'</td></tr>';if(typeof o.outerHTML!='undefined'){r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>outerHTML: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.outerHTML+'</td></tr>';}}
j++;break;}
if(/object|array/.test(type)){for(i in o){var t=_dumpType(o[i]);if(j<1){r+='<table'+_dumpStyles(type,'table')+'><tr><th colspan="2"'+_dumpStyles(type,'th')+'>'+type+'</th></tr>';j++;}
if(typeof o[i]=='object'&&o[i]!=null){r+='<tr><td'+_dumpStyles(type,'td-key')+'>'+i+(st?' ['+t+']':'')+'</td><td'+_dumpStyles(type,'td-value')+'>'+_recurse(o[i],t)+'</td></tr>';}else if(typeof o[i]=='function'){r+='<tr><td'+_dumpStyles(type,'td-key')+'>'+i+(st?' ['+t+']':'')+'</td><td'+_dumpStyles(type,'td-value')+'>'+_recurse(o[i],t)+'</td></tr>';}else{r+='<tr><td'+_dumpStyles(type,'td-key')+'>'+i+(st?' ['+t+']':'')+'</td><td'+_dumpStyles(type,'td-value')+'>'+o[i]+'</td></tr>';}}}
if(j==0){r+='<table'+_dumpStyles(type,'table')+'><tr><th colspan="2"'+_dumpStyles(type,'th')+'>'+type+' [empty]</th></tr>';}
r+='</table>';return r;};var _dumpStyles=function(type,use){var r='';var table='font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;cell-spacing:2px;';var th='font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;text-align:left;color: white;padding: 5px;vertical-align :top;cursor:hand;cursor:pointer;';var td='font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;vertical-align:top;padding:3px;';var thScript='onClick="tTable(this);" title="click to collapse"';var tdScript='onClick="tRow(this);" title="click to collapse"';switch(type){case'string':case'number':case'boolean':case'undefined':case'object':switch(use){case'table':r=' style="'+table+'background-color:#0000cc;"';break;case'th':r=' style="'+th+'background-color:#4444cc;"'+thScript;break;case'td-key':r=' style="'+td+'background-color:#ccddff;cursor:hand;cursor:pointer;"'+tdScript;break;case'td-value':r=' style="'+td+'background-color:#fff;"';break;}
break;case'array':switch(use){case'table':r=' style="'+table+'background-color:#006600;"';break;case'th':r=' style="'+th+'background-color:#009900;"'+thScript;break;case'td-key':r=' style="'+td+'background-color:#ccffcc;cursor:hand;cursor:pointer;"'+tdScript;break;case'td-value':r=' style="'+td+'background-color:#fff;"';break;}
break;case'function':switch(use){case'table':r=' style="'+table+'background-color:#aa4400;"';break;case'th':r=' style="'+th+'background-color:#cc6600;"'+thScript;break;case'td-key':r=' style="'+td+'background-color:#fff;cursor:hand;cursor:pointer;"'+tdScript;break;case'td-value':r=' style="'+td+'background-color:#fff;"';break;}
break;case'arguments':switch(use){case'table':r=' style="'+table+'background-color:#dddddd;cell-spacing:3;"';break;case'td-key':r=' style="'+th+'background-color:#eeeeee;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;}
break;case'regexp':switch(use){case'table':r=' style="'+table+'background-color:#CC0000;cell-spacing:3;"';break;case'th':r=' style="'+th+'background-color:#FF0000;"'+thScript;break;case'td-key':r=' style="'+th+'background-color:#FF5757;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;case'td-value':r=' style="'+td+'background-color:#fff;"';break;}
break;case'date':switch(use){case'table':r=' style="'+table+'background-color:#663399;cell-spacing:3;"';break;case'th':r=' style="'+th+'background-color:#9966CC;"'+thScript;break;case'td-key':r=' style="'+th+'background-color:#B266FF;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;case'td-value':r=' style="'+td+'background-color:#fff;"';break;}
break;case'domelement':case'document':case'window':switch(use){case'table':r=' style="'+table+'background-color:#FFCC33;cell-spacing:3;"';break;case'th':r=' style="'+th+'background-color:#FFD966;"'+thScript;break;case'td-key':r=' style="'+th+'background-color:#FFF2CC;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;case'td-value':r=' style="'+td+'background-color:#fff;"';break;}
break;}
return r;};var _dumpType=function(obj){var t=typeof(obj);if(t=='function'){var f=obj.toString();if((/^\/.*\/[gi]??[gi]??$/).test(f)){return'regexp';}else if((/^\[object.*\]$/i).test(f)){t='object'}}
if(t!='object'){return t;}
switch(obj){case null:return'null';case window:return'window';case document:return'document';case window.event:return'event';}
if(window.event&&(event.type==obj.type)){return'event';}
var c=obj.constructor;if(c!=null){switch(c){case Array:t='array';break;case Date:return'date';case RegExp:return'regexp';case Object:t='object';break;case ReferenceError:return'error';default:var sc=c.toString();var m=sc.match(/\s*function (.*)\(/);if(m!=null){return'object';}}}
var nt=obj.nodeType;if(nt!=null){switch(nt){case 1:return'domelement';case 3:return'string';}}
if(obj.toString!=null){var ex=obj.toString();var am=ex.match(/^\[object (.*)\]$/i);if(am!=null){var am=am[1];switch(am.toLowerCase()){case'event':return'event';case'nodelist':case'htmlcollection':case'elementarray':return'array';case'htmldocument':return'htmldocument';}}}
return t;};dump+=(/string|number|undefined|boolean/.test(typeof(object))||object==null)?object:_recurse(object,typeof object);winName=window.open('','',settings);if(jQuery.browser.msie||jQuery.browser.browser=='opera'||jQuery.browser.browser=='safari'){winName.document.write('<html><head><title> '+title+' </title><script type="text/javascript">'+script+'</script><head>');winName.document.write('<body>'+dump+'</body></html>');}else{winName.document.body.innerHTML=dump;winName.document.title=title;var ffs=winName.document.createElement('script');ffs.setAttribute('type','text/javascript');ffs.appendChild(document.createTextNode(script));winName.document.getElementsByTagName('head')[0].appendChild(ffs);}
winName.focus();};

/*
 * jQuery CFJS plugin
 * version 1.1.12 (10/19/2009)
 * @requires jQuery (http://jquery.com)
 *
 * Copyright (c) 2008 - 2009 Christopher Jordan
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Modified by Christopher Jordan (chris.s.jordan@gmail.com) from
 * code originally written (except where noted), and
 * published as-is and without license as LeftCorner.js by
 * Randy Anderson (randerson@leftcorner.com)
 * - http://www.leftcorner.com
 */
(function($){jQuery.extend({_commafy:function(str){return str.replace(/(\D?)(\d{4,})/g,function($0,$1,$2){return(/[.\w]/).test($1)?$0:$1+$2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g,'$&,');});},_DimensionCount:function(a){var c=0;for(var i=0;i<a.length;i++){if(a[i].constructor==Array){c++;}}
return c;},Abs:function(n){return Math.abs(n);},ArrayAppend:function(a,v){return a.push(v);},ArrayPrepend:function(a,v){return a.unshift(v);},ArraySort:function(a,st,so){var _so;if(st.toUpperCase()=='TEXTNOCASE'){if(!so||so.toUpperCase()!="DESC"){_so=function(a,b){a=a.toUpperCase();b=b.toUpperCase();if(a<b){return-1;}else if(a>b){return 1;}else{return 0;}};}else{_so=function(a,b){a=a.toUpperCase();b=b.toUpperCase();if(a>b){return-1;}else if(a<b){return 1;}else{return 0;}};}}else if(st.toUpperCase()=='TEXT'){if(!so||so.toUpperCase()!="DESC"){_so=function(a,b){if(a<b){return-1;}else if(a>b){return 1;}else{return 0;}};}else{_so=function(a,b){if(a>b){return-1;}else if(a<b){return 1;}else{return 0;}};}}else if(st.toUpperCase()=='NUMERIC'){if(!so||so.toUpperCase()!="DESC"){_so=function(a,b){return a-b;};}else{_so=function(a,b){return b-a;};}}
return a.sort(_so);},ArrayToList:function(a,d){if(!d){d=",";}
var re=/[,]/gi;return a.toString().replace(re,d);},ArrayLen:function(a){return a.length;},Ceiling:function(n){return Math.ceil(n);},Compare:function(s1,s2){if(s1==s2){return 0;}
if(s1>s2){return 1;}
else{return-1;}},CompareNoCase:function(s1,s2){return this.Compare(s1.toUpperCase(),s2.toUpperCase());},CreateDate:function(y,m,d){var rd=new Date();rd.setFullYear(y);rd.setMonth(m-1);rd.setDate(d);rd.setHours(0);rd.setMinutes(0);rd.setSeconds(0);return rd;},CreateDateTime:function(y,m,d,h,n,s){var rd=new Date();rd.setFullYear(y);rd.setMonth(m-1);rd.setDate(d);rd.setHours(h);rd.setMinutes(n);rd.setSeconds(s);return rd;},CreateTime:function(h,n,s){var rd=new Date();rd.setFullYear(1899);rd.setMonth(11);rd.setDate(30);rd.setHours(h);rd.setMinutes(n);rd.setSeconds(s);return rd;},CreateODBCDate:function(d){var error="invalid date object";var year,month,day;if(isNaN(Date.parse(d))){return error;}
year=d.getFullYear();month=d.getMonth()+1;month=(month<10)?"0"+month:month;day=d.getDate();day=(day<10)?"0"+day:day;return"{d '"+year+"-"+month+"-"+day+"'}";},CreateODBCDateTime:function(d){var error="invalid date object";var year,month,day,hours,minutes,seconds;if(isNaN(Date.parse(d))){return error;}
year=d.getFullYear();month=d.getMonth()+1;month=(month<10)?"0"+month:month;day=d.getDate();day=(day<10)?"0"+day:day;hours=d.getHours();minutes=d.getMinutes();seconds=d.getSeconds();return"{ts '"+year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds+"'}";},CreateODBCTime:function(d){var error="invalid date object";var hours,minutes,seconds;if(isNaN(Date.parse(d))){return error;}
hours=d.getHours();minutes=d.getMinutes();seconds=d.getSeconds();return"{t '"+hours+":"+minutes+":"+seconds+"'}";},DateDiff:function(dp,d1,d2){var dt1=new Date(d1);var dt2=new Date(d2);var iDiffMS=dt2.valueOf()-dt1.valueOf();var dtDiff=new Date(iDiffMS);var nYears=dt2.getUTCFullYear()-dt1.getUTCFullYear();var nMonths=dt2.getUTCMonth()-dt1.getUTCMonth()+(nYears!==0?nYears*12:0);var nQuarters=nMonths/3;var nMilliseconds=iDiffMS;var nSeconds=iDiffMS/1000;var nMinutes=nSeconds/60;var nHours=nMinutes/60;var nDays=nHours/24;var nWeeks=nDays/7;var iDiff=0;switch(dp.toLowerCase()){case"yyyy":return nYears;case"q":return nQuarters;case"m":return nMonths;case"y":return nDays;case"d":return nDays;case"w":return nDays;case"ww":return nWeeks;case"h":return nHours;case"n":return nMinutes;case"s":return nSeconds;case"ms":return nMilliseconds;default:return"invalid interval: '"+dp+"'";}},DateFormat:function(d,mask){if(!(d instanceof Date)){d=new Date(d);}
var zeroize=function(value,length){if(!length){length=2;}
value=String(value);for(var i=0,zeros='';i<(length-value.length);i++){zeros+='0';}
return zeros+value;};return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g,function($0){switch($0){case'd':return d.getDate();case'dd':return zeroize(d.getDate());case'ddd':return['Sun','Mon','Tue','Wed','Thr','Fri','Sat'][d.getDay()];case'dddd':return['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];case'm':return d.getMonth()+1;case'mm':return zeroize(d.getMonth()+1);case'mmm':return['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getMonth()];case'mmmm':return['January','February','March','April','May','June','July','August','September','October','November','December'][d.getMonth()];case'yy':return String(d.getFullYear()).substr(2);case'yyyy':return d.getFullYear();case'h':return d.getHours()%12||12;case'hh':return zeroize(d.getHours()%12||12);case'H':return d.getHours();case'HH':return zeroize(d.getHours());case'M':return d.getMinutes();case'MM':return zeroize(d.getMinutes());case's':return d.getSeconds();case'ss':return zeroize(d.getSeconds());case'l':return zeroize(d.getMilliseconds(),3);case'L':var m=d.getMilliseconds();if(m>99){m=Math.round(m/10);}
return zeroize(m);case'tt':return d.getHours()<12?'am':'pm';case't':return d.getHours()<12?'a':'p';case'TT':return d.getHours()<12?'AM':'PM';case'T':return d.getHours()<12?'A':'P';case'Z':return d.toUTCString().match(/[A-Z]+$/);default:return $0.substr(1,$0.length-2);}});},DatePart:function(dp,d){var d1;switch(dp){case"yyyy":return d.getFullYear();case"q":var m=d.getMonth()+1;switch(m){case 1:case 2:case 3:return 1;case 4:case 5:case 6:return 2;case 7:case 8:case 9:return 3;case 10:case 11:case 12:return 4;}
case"m":m=d.getMonth()+1;m=(m<10)?"0"+m:m;return m;case"y":d1=this.CreateDate(d.getFullYear(),1,1);return Math.ceil(this.DateDiff("d",d1,d));case"d":var day=d.getDate();day=(day<10)?"0"+day:day;return day;case"w":return d.getDay()+1;case"ww":d1=this.CreateDate(d.getFullYear(),1,1);return Math.round(this.DateDiff("d",d1,d)/7);case"h":return d.getHours();case"n":return d.getMinutes();case"s":return d.getSeconds();case"l":return d.getMilliseconds();}},DecimalFormat:function(n){return(this._commafy(n.toFixed(2)));},DollarFormat:function(n){var _n=n.toString().replace(/\$|\,/g,'');_n=_n.toString().replace('(','-');_n=_n.toString().replace(')','');if(isNaN(_n)){_n=0;}
var sign=(_n==(_n=Math.abs(n)));_n=Math.floor(_n*100+0.50000000001);var cents=_n%100;_n=Math.floor(_n/100).toString();if(cents<10){cents="0"+cents;}
_n+="."+cents;_n=this._commafy(_n);return(((sign)?'':'(')+'$'+_n+((sign)?'':')'));},Find:function(sb,s){return s.toString().indexOf(sb)+1;},FindNoCase:function(sb,s){return this.Find(sb.toUpperCase(),s.toUpperCase());},HTMLCodeFormat:function(s){return'<pre>'+this.HTMLEditFormat(s)+'</pre>';},HTMLEditFormat:function(s){var my={};s+='';my.sf='';for(my.i=0;my.i<s.length;my.i++){my.c=s.slice(my.i,my.i+1);switch(my.c){case'"':my.c='&quot;';break;case'&':my.c='&amp;';break;case'>':my.c='&gt;';break;case'<':my.c='&lt;';break;default:break;}
my.sf+=my.c;}
return my.sf;},Insert:function(sb,s,p){s+="";return s.slice(0,p)+sb+s.slice(p,s.length);},IsArray:function(a,dim){if(dim){nod=this._DimensionCount(a);if(nod==dim){return true;}
return false;}
if(a.constructor==Array){return true;}
return false;},IsBoolean:function(v){if(v.constructor==Boolean){return true;}
return false;},IsDate:function(d){var datePat=/^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;var matchArray=d.toString().match(datePat);if(matchArray===null){return false;}
var month=matchArray[1];var day=matchArray[3];var year=matchArray[5];var isleap=(year%4===0&&(year%100!==0||year%400===0));if(month<1||month>12){return false;}
if(day<1||day>31){return false;}
if((month==4||month==6||month==9||month==11)&&day==31){return false;}
if(month==2){if(day>29||(day==29&&!isleap)){return false;}}
return true;},IsDefined:function(o){if(typeof o!="undefined"){return true;}
return false;},IsLeapYear:function(y){if((y/4)!=Math.floor(y/4)){return false;}
if((y/100)!=Math.floor(y/100)){return true;}
if((y/400)!=Math.floor(y/400)){return false;}
return true;},IsNumeric:function(s){if(isNaN(s)){return false;}
return true;},IsSimpleValue:function(v){if(this.IsString(v)){return true;}
if(this.IsNumeric(v)){return true;}
if(this.IsBoolean(v)){return true;}
if(this.IsDate(v)){return true;}
return false;},IsString:function(s){if(s.constructor==String){return true;}
return false;},IsStruct:function(s){if(s.constructor==Object){return true;}
return false;},IsValid:function(t,v,r,m){t=t.toLowerCase();switch(t){case"any":return this.IsSimpleValue(v);case"array":return this.IsArray(v);case"date":return this.IsDate(v);case"boolean":return this.IsBoolean(v);case"email":return this.IsValid("regex",v,/(^[a-z]([a-z_\.]*)@([a-z_\.]*)([.][a-z]{2,4})$)/i);case"eurodate":return this.IsDate(v);case"float":return this.IsNumeric(v);case"guid":return this.IsValid("regex",v,/(^[0-9-a-fA-F]{8}-([0-9-a-fA-F]{4}-){3}[0-9-a-fA-F]{12}$)/);case"integer":return this.IsValid("regex",v,/(^-?\d\d*$)/);case"numeric":return this.IsNumeric(v);case"range":return(((v*1)>=r)&&((v*1)<=m))?true:false;case"regex":return v.toString().match(r)?true:false;case"regular_expression":return this.IsValid("regex",v,r);case"social_security_number":return this.IsValid("ssn",v);case"ssn":return this.IsValid("regex",v,/^([0-6]\d{2}|7[0-6]\d|77[0-2])([ \-]?)(\d{2})\2(\d{4})$/);case"string":return this.IsString(v);case"struct":return this.IsStruct(v);case"telephone":return this.IsValid("regex",v,/^(\([1-9]\d{2}\)\s?|[1-9]\d{2}[\.\-])?\d{3}[\.\-]\d{4}$/);case"time":return this.IsDate(v);case"url":return this.IsValid("regex",v,/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i);case"uuid":return this.IsValid("regex",v,/(^[0-9-a-fA-F]{8}-([0-9-a-fA-F]{4}-){2}[0-9-a-fA-F]{15}$)/);case"variablename":return this.IsValid("regex",v,/(^[a-zA-Z_][0-9a-zA-Z_]*$)/);case"zipcode":return this.IsValid("regex",v,/(^\d{5}$)|(^\d{5}-\d{4}$)/);case"creditcard":if(!this.IsValid("range",v.length,13,16)){return false;}
var sum=0;var i,digit;for(i=(2-(v.length%2));i<=v.length;i+=2){sum+=parseInt(v.charAt(i-1),10);}
for(i=(v.length%2)+1;i<v.length;i+=2){digit=parseInt(v.charAt(i-1),10)*2;sum+=(digit<10)?digit:(digit-9);}
return((sum%10)===0)?true:false;}},LCase:function(s){s+="";return s.toLowerCase();},Left:function(s,c){s+="";return s.slice(0,c);},Len:function(s){s+="";return s.length;},ListAppend:function(l,v,d){l+="";if(!d){d=",";}
var r="";if(this.ListLen(l)){r=l+d+v;}else{r=v;}
return r;},ListChangeDelims:function(l,nd,od){l+="";if(!od){od=",";}
var spc="^,$,|,.,+,*,?,\,/";if(this.ListFind(spc,od)){od="\\"+od;}
var re=new RegExp(od,"gi");return l.replace(re,nd);},ListContains:function(l,sb,d){l+="";if(!d){d=",";}
var spc="^,$,|,.,+,*,?,\,/";if(this.ListFind(spc,sb)){sb="\\"+sb;}
l=l.split(d);var re=new RegExp(sb,"g");for(var i=0;i<l.length;i++){if(re.test(l[i])){return true;}}
return false;},ListContainsNoCase:function(l,sb,d){l+="";if(!d){d=",";}
var spc="^,$,|,.,+,*,?,\,/";if(this.ListFind(spc,sb)){sb="\\"+sb;}
l=l.split(d);var re=new RegExp(sb,"gi");for(var i=0;i<l.length;i++){if(re.test(l[i])){return true;}}
return false;},ListDeleteAt:function(l,p,d){l+="";if(!d){d=",";}
var i,posInList;var posInArray=p-1;var thisD="";var r="";for(i=0;i<l.split(d).length;i++){if(i!=posInArray){posInList=i+1;if(r.length){thisD=d;}
r+=thisD+this.ListGetAt(l,posInList,d);}}
return r;},ListFind:function(l,v,d){l+="";if(!d){d=",";}
var r=0;var listToArray=l.split(d);for(var i=0;i<listToArray.length;i++){if(listToArray[i]==v){r=i+1;break;}}
return r;},ListFindNoCase:function(l,v,d){l+="";if(!d){d=",";}
return this.ListFind(l.toUpperCase(),v.toUpperCase(),d);},ListFirst:function(l,d){l+="";if(!d){d=",";}
return l.split(d)[0];},ListGetAt:function(l,p,d){l+="";if(!d){d=",";}
return l.split(d)[p-1];},ListInsertAt:function(l,p,v,d){var a;l+="";if(!d){d=",";}
l=l.split(d);if(p===0){l.unshift(v);}
else{a=l.splice(p);l.push(v);l=l.concat(a);}
return this.ListChangeDelims(l.toString(),d,",");},ListLast:function(l,d){l+="";if(!d){d=",";}
l=l.split(d);return l[l.length-1];},ListLen:function(l,d){l+="";if(!d){d=",";}
if(l.length){return l.split(d).length;}
return 0;},ListPrepend:function(l,v,d){l+="";if(!d){d=",";}
var r="";if(this.ListLen(l)){r=v+d+l;}else{r=v;}
return r;},ListRest:function(l,d){l+="";if(!d){d=",";}
l=l.split(d);l.splice(0,1);l=(l.length)?this.ArrayToList(l,d):"";return l;},ListSetAt:function(l,p,v,d){l+="";if(!d){d=",";}
l=l.split(d);l[p-1]=v;return this.ListChangeDelims(l.toString(),d,",");},ListSort:function(l,st,so,d){l+="";if(!d){d=",";}
l=l.split(d);l=this.ArraySort(l,st,so);return this.ListChangeDelims(l.toString(),d,",");},ListToArray:function(l,d){l+="";var r,a,i;if(!d){d=",";}
r=[];a=l.split(d);return a;},ListValueCount:function(l,v,d){var c=0;l+="";if(!d){d=",";}
l=l.split(d);for(var i=0;i<l.length;i++){if(l[i]==v){c++;}}
return c;},ListValueCountNoCase:function(l,v,d){var c=0;l+="";if(!d){d=",";}
l=l.split(d);for(var i=0;i<l.length;i++){if(l[i].toUpperCase()==v.toUpperCase()){c++;}}
return c;},LTrim:function(s){s+="";if(s.length){return s.replace(/^\s*/,'');}
return'';},Mid:function(s,start,c){s+="";start-=1;return s.slice(start,start+c);},Pad:function(s,n,pc,pd){if(arguments.length<=3){pd="R";}
if(arguments.length<=2){pc=" ";}
if(arguments.length<=1){n=10;}
if(arguments.length===0){s="";}
var sl=s.length;var pl=n-sl;if(sl>=n){return s;}
if(pd=="R"||pd=="Right"){return s+this.RepeatString(pc,pl);}
return this.RepeatString(pc,pl)+s;},Param:function(n,d){if(!this.IsDefined(n)){if(this.IsString(d)){eval("var "+n+" = '"+d+"';");}
else{eval("var "+n+" = "+d+";");}}},RepeatString:function(s,n){var rs="";for(var i=1;i<=n;i++){rs+=s;}
return rs;},Replace:function(s,sb1,sb2,sc){s+="";if(!sc||sc.toUpperCase()!="ALL"){sc="";}else{sc="g";}
var re=new RegExp(sb1,sc);return s.replace(re,sb2);},ReplaceNoCase:function(s,sb1,sb2,sc){s+="";if(!sc||sc.toUpperCase()!="ALL"){sc="i";}else{sc="gi";}
var re=new RegExp(sb1,sc);return s.replace(re,sb2);},Reverse:function(s){s+="";var i=s.length;var r="";for(i;0<=i;i--){r+=s.charAt(i);}
return r;},Right:function(s,c){s+="";return s.slice(s.length-c,s.length);},Round:function(n,p){if(!isNaN(n.toFixed(p))){return n.toFixed(p);}
return n;},RTrim:function(s){s+="";if(s.length){return s.replace(/\s*$/,'');}
return'';},StructKeyArray:function(s){var k;var a=[];for(k in s){a.push(k);}
return a;},StructKeyExists:function(s,k){return!!s[k];},StructKeyList:function(s,d){var k;var a="";if(!d){d=",";}
for(k in s){a=this.ListAppend(a,k,d);}
return a;},TimeFormat:function(t,m){return this.DateFormat(t,m);},Trim:function(s){s+="";if(s.length){return s.replace(/^\s\s*/,'').replace(/\s\s*$/,'');}
return'';},UCase:function(s){return s.toString().toUpperCase();},URLDecode:function(s){return unescape(s);},URLEncodedFormat:function(s){return encodeURI(s);}});})(jQuery);

/*
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($){jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1;}
var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000));}else{date=options.expires;}
expires='; expires='+date.toUTCString();}
var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('');}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break;}}}
return cookieValue;}};})(jQuery);

/*
 * includeMany 1.2.2
 *
 * Copyright (c) 2009 Arash Karimzadeh (arashkarimzadeh.com)
 * Licensed under the MIT (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Dec 03 2009
 */
(function($){$.chainclude=function(urls,finaly){var onload=function(callback,data){if(typeof urls.length!="undefined"){if(urls.length==0){return $.isFunction(finaly)?finaly(data):null}urls.shift();return $.chainclude.load(urls,onload)}for(var item in urls){urls[item](data);delete urls[item];var count=0;for(var i in urls){count++}return(count==0)?$.isFunction(finaly)?finaly(data):null:$.chainclude.load(urls,onload)}};$.chainclude.load(urls,onload)};$.chainclude.load=function(urls,onload){if(typeof urls=="object"&&typeof urls.length=="undefined"){for(var item in urls){return $.include.load(item,onload,urls[item].callback)}}urls=$.makeArray(urls);$.include.load(urls[0],onload,null)};$.include=function(urls,finaly){var luid=$.include.luid++;var onload=function(callback,data){if($.isFunction(callback)){callback(data)}if(--$.include.counter[luid]==0&&$.isFunction(finaly)){finaly()}};if(typeof urls=="object"&&typeof urls.length=="undefined"){$.include.counter[luid]=0;for(var item in urls){$.include.counter[luid]++}return $.each(urls,function(url,callback){$.include.load(url,onload,callback)})}urls=$.makeArray(urls);$.include.counter[luid]=urls.length;$.each(urls,function(){$.include.load(this,onload,null)})};$.extend($.include,{luid:0,counter:[],load:function(url,onload,callback){url=url.toString();if($.include.exist(url)){return onload(callback)}if(/.css$/.test(url)){$.include.loadCSS(url,onload,callback)}else{if(/.js$/.test(url)){$.include.loadJS(url,onload,callback)}else{$.get(url,function(data){onload(callback,data)})}}},loadCSS:function(url,onload,callback){var css=document.createElement("link");css.setAttribute("type","text/css");css.setAttribute("rel","stylesheet");css.setAttribute("href",""+url);$("head").get(0).appendChild(css);$.browser.msie?$.include.IEonload(css,onload,callback):onload(callback)},loadJS:function(url,onload,callback){var js=document.createElement("script");js.setAttribute("type","text/javascript");js.setAttribute("src",""+url);$.browser.msie?$.include.IEonload(js,onload,callback):js.onload=function(){onload(callback)};$("head").get(0).appendChild(js)},IEonload:function(elm,onload,callback){elm.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyState=="complete"){onload(callback)}}},exist:function(url){var fresh=false;$("head script").each(function(){if(/.css$/.test(url)&&this.href==url){return fresh=true}else{if(/.js$/.test(url)&&this.src==url){return fresh=true}}});return fresh}})})(jQuery);

/*
 * labs_json Script by Giraldo Rosales.
 * Version 1.0
 * Visit www.liquidgear.net for documentation and updates.
 *
 *
 * Copyright (c) 2009 Nitrogen Design, Inc. All rights reserved.
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
 **/
(function($){jQuery.json={encode:function(value,replacer,space){var i;gap='';var indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.encode');}
return this.str('',{'':value});},decode:function(text,reviver){var j;var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');},f:function(n){return n<10?'0'+n:n;},DateToJSON:function(key){return this.getUTCFullYear()+'-'+this.f(this.getUTCMonth()+1)+'-'+this.f(this.getUTCDate())+'T'+this.f(this.getUTCHours())+':'+this.f(this.getUTCMinutes())+':'+this.f(this.getUTCSeconds())+'Z';},StringToJSON:function(key){return this.valueOf();},quote:function(string){var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';},str:function(key,holder){var indent='',gap='',i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'){switch((typeof value)){case'date':this.DateToJSON(key);break;default:this.StringToJSON(key);break;}}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return this.quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=this.str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=this.str(k,value);if(v){partial.push(this.quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=this.str(k,value);if(v){partial.push(this.quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}};})(jQuery);

/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.2
 */
(function($){$.fn.bgiframe=($.browser.msie&&/msie 6\.0/i.test(navigator.userAgent)?function(s){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s);var html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"'+'style="display:block;position:absolute;z-index:-1;'+
(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';'+'left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';'+'width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';'+'height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';'+'"/>';return this.each(function(){if($(this).children('iframe.bgiframe').length===0)
this.insertBefore(document.createElement(html),this.firstChild);});}:function(){return this;});$.fn.bgIframe=$.fn.bgiframe;function prop(n){return n&&n.constructor===Number?n+'px':n;}})(jQuery);

/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, JÃ¯Â¿Â½ÃƒÂ¶rn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 3640 2007-10-11 18:34:38Z pmclanahan $
 *
 */
(function($){$.extend({metadata:{defaults:{type:'class',name:'metadata',cre:/({.*})/,single:'metadata'},setType:function(type,name){this.defaults.type=type;this.defaults.name=name;},get:function(elem,opts){var settings=$.extend({},this.defaults,opts);if(!settings.single.length)settings.single='metadata';var data=$.data(elem,settings.single);if(data)return data;data="{}";var getData=function(data){if(typeof data!="string")return data;if(data.indexOf('{')<0){data=eval("("+data+")");}}
var getObject=function(data){if(typeof data!="string")return data;try{data=eval("("+data+")");}catch(e){}
return data;}
if(settings.type=="html5"){var object={};$(elem.attributes).each(function(){var name=this.nodeName;if(name.match(/^data-/))name=name.replace(/^data-/,'');else return true;object[name]=getObject(this.nodeValue);});}else{if(settings.type=="class"){var m=settings.cre.exec(elem.className);if(m)
data=m[1];}else if(settings.type=="elem"){if(!elem.getElementsByTagName)return;var e=elem.getElementsByTagName(settings.name);if(e.length)
data=$.trim(e[0].innerHTML);}else if(elem.getAttribute!=undefined){var attr=elem.getAttribute(settings.name);if(attr)
data=attr;}
object=getObject(data.indexOf("{")<0?"{"+data+"}":data);}
$.data(elem,settings.single,object);return object;}}});$.fn.metadata=function(opts){return $.metadata.get(this[0],opts);};})(jQuery);

/*
 * jQuery.log - Console logging and debugging for jQuery
 * Written by Damon Miller (damonmiller513 AT gmail DOT com)
 * Date: 2009-12-03
 *
 * @author Damon Miller
 * @version 1.1
 * 
 */
(function($){jQuery.getTickCount=function(){return new Date().getTime();};jQuery.log={level:'warn',debug:function(){if(jQuery.log.level==='debug'){if(window.console){window.console.log(arguments[0]);}}
return this;},info:function(){if(jQuery.log.level!=='warn'){if(window.console){window.console.info(arguments[0]);}}
return this;},warn:function(){if(window.console){window.console.warn(arguments[0]);}
return this;},threshold:[100,250],tick:function(tick,log){var totalTicks=$.getTickCount()-tick;var level='';if(totalTicks>jQuery.log.threshold[1]){level='warn';}
else if(totalTicks>jQuery.log.threshold[0]){level='info';}
if($.trim(level).length){$.log[level](log+' {'+totalTicks+'ms}');}
return this;},start:function(name){var storage=$(document).data('log-'+name)||{};if(!storage[name]){storage[name]={times:[]};}
storage[name].start=$.getTickCount();$(document).data('log-'+name,storage);return this;},end:function(name){var storage=$(document).data('log-'+name)||{};if(!storage[name]||typeof storage[name].start==='undefined'){return;}
storage[name].times.push($.getTickCount()-storage[name].start);storage[name].start=undefined;$(document).data('log-'+name,storage);return this;},clear:function(name){var storage=$(document).data('log-'+name)||{};if(storage[name]){storage[name]={times:[]};}
$(document).data('log-'+name,storage);return this;},avg:function(name,log){var storage=$(document).data('log-'+name)||{};if(!storage[name]||typeof storage[name].start!=='undefined'){return;}
$.log[$.log.level](log+' {avg:'+math.avg(storage[name].times)+'ms}');return this;},min:function(name,log){var storage=$(document).data('log-'+name)||{};if(!storage[name]||typeof storage[name].start!=='undefined'){return;}
$.log[$.log.level](log+' {min:'+math.min(storage[name].times)+'ms}');return this;},max:function(name,log){var storage=$(document).data('log-'+name)||{};if(!storage[name]||typeof storage[name].start!=='undefined'){return;}
$.log[$.log.level](log+' {max:'+math.max(storage[name].times)+'ms}');return this;},sum:function(name,log){var storage=$(document).data('log-'+name)||{};if(!storage[name]||typeof storage[name].start!=='undefined'){return;}
$.log[$.log.level](log+' {sum:'+math.sum(storage[name].times)+'ms}');return this;},stats:function(name,log){var storage=$(document).data('log-'+name)||{};if(!storage[name]||typeof storage[name].start!=='undefined'){return;}
$.log[$.log.level](log+' { ['+storage[name].times.length+'] '
+'min:'+math.min(storage[name].times)+'ms'
+', max:'+math.max(storage[name].times)+'ms'
+', avg:'+math.avg(storage[name].times)+'ms'
+', sum:'+math.sum(storage[name].times)+'ms'
+' }');return this;}};var math={sum:function(a){var total=0,precision=0;$.each(a,function(i,v){var p=v.toString().match(/\.\d+$/gi),len=(p)?p[0].length-1:0;if(len>precision)precision=len;total+=v;});if(precision)total=Number(total.toFixed(precision));return total;},avg:function(a){return math.sum(a)/a.length;},min:function(a){return Math.min.apply(Math,a);},max:function(a){return Math.max.apply(Math,a);}};})(jQuery);

/*
 * jquery.numberformatter - Formatting/Parsing Numbers in jQuery
 * Written by Michael Abernethy (mike@abernethysoft.com)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * Date: 2/6/08
 *
 * @author Michael Abernethy
 * @version 1.1.2
 * 
 */
(function(jQuery) {

     function FormatData(dec, group, neg) {
       this.dec = dec;
       this.group = group;
       this.neg = neg;
     };

     function formatCodes(options) {

         // default values
         var dec = ".";
         var group = ",";
         var neg = "-";

		 var symbols = options.format.replace(/\d?#+\d?/g, '');
		 
		 group = symbols.substr(0, 1);
		 dec = symbols.substr(symbols.length-1, 1);

         /*if (locale == "us" ||
             locale == "ae" ||
             locale == "eg" ||
             locale == "il" ||
             locale == "jp" ||
             locale == "sk" ||
             locale == "th" ||
             locale == "cn" ||
             locale == "hk" ||
             locale == "tw" ||
             locale == "au" ||
             locale == "ca" ||
             locale == "gb" ||
             locale == "in"
            )
         {
              dec = ".";
              group = ",";
         }

         else if (locale == "de" ||
             locale == "vn" ||
             locale == "es" ||
             locale == "dk" ||
             locale == "at" ||
             locale == "gr" ||
             locale == "br"
            )
         {
              dec = ",";
              group = ".";
         }
         else if (locale == "cz" ||
              locale == "fr" ||
             locale == "fi" ||
             locale == "ru" ||
             locale == "se"
            )
         {
              group = " ";
              dec = ",";
         }
         else if (locale == "ch")
          {
              group = "'";
              dec = ".";
          }*/
     
        return new FormatData(dec, group, neg);

    };

 jQuery.formatNumber = function(number, options) {
     var options = jQuery.extend({},jQuery.fn.parse.defaults, options);
     var formatData = formatCodes(options);

     var dec = formatData.dec;
     var group = formatData.group;
     var neg = formatData.neg;
     
     var numString = new String(number);
     numString = numString.replace(".",dec).replace("-",neg);
     return numString;
 };

 jQuery.parse = function(text, options) {

     var options = jQuery.extend({},jQuery.parse.defaults, options);

     var formatData = formatCodes(options);

     var dec = formatData.dec;
     var group = formatData.group;
     var neg = formatData.neg;

     var valid = "1234567890.-";

	 if (!$.trim(text).length) {
	 	return;
	 }

     // now we need to convert it into a number
     while (text.indexOf(group)>-1)
           text = text.replace(group,'');
     text = text.replace(dec,".").replace(neg,"-");
     var validText = "";
     var hasPercent = false;
     if (text.charAt(text.length-1)=="%")
         hasPercent = true;
     for (var i=0; i<text.length; i++)
     {
        if (valid.indexOf(text.charAt(i))>-1)
           validText = validText + text.charAt(i);
     }
     var number = new Number(validText);
     if (hasPercent)
     {
        number = number / 100;
        number = number.toFixed(validText.length-1);
     }

     return number;
 };

 jQuery.format = function(text, options) {

     var options = jQuery.extend({},jQuery.format.defaults, options);

     var formatData = formatCodes(options);

     var dec = formatData.dec;
     var group = formatData.group;
     var neg = formatData.neg;
     
     var validFormat = "0#-,.";

	 text = text != null ? text.toString() : '';
	 if (!$.trim(text).length) {
	 	return;
	 }

     // strip all the invalid characters at the beginning and the end
     // of the format, and we'll stick them back on at the end
     // make a special case for the negative sign "-" though, so 
     // we can have formats like -$23.32
     var prefix = "";
     var negativeInFront = false;
     for (var i=0; i<options.format.length; i++) {
        if (validFormat.indexOf(options.format.charAt(i)) == -1) {
			prefix = prefix + options.format.charAt(i);
		}
		else if (i == 0 && options.format.charAt(i) == '-') {
			negativeInFront = true;
			continue;
		}
		else {
			break;
		}
     }
     var suffix = "";
     for (var i=options.format.length-1; i>=0; i--) {
        if (validFormat.indexOf(options.format.charAt(i)) == -1) {
			suffix = options.format.charAt(i) + suffix;
		}
		else {
			break;
		}
     }

     options.format = options.format.substring(prefix.length);
     options.format = options.format.substring(0, options.format.length - suffix.length);

    // now we need to convert it into a number
    var number = new Number(text.replace(dec, '.').replace(neg, '-'));

    // special case for percentages
    if (suffix == '%') {
		number = number * 100;
	}

    var returnString = '';
    
    var decimalValue = number % 1;
    if (options.format.indexOf(dec) > -1) {
		var decimalPortion = dec;
		var decimalFormat = undefined;
		if (options.numberOfDecimals !== undefined) {
			decimalFormat = new Array(options.numberOfDecimals + 1).join('#');
		}
		if (decimalFormat === undefined) {
			decimalFormat = options.format.substring(options.format.lastIndexOf(dec) + 1);
		}
		var decimalString = new String(decimalValue.toFixed(decimalFormat.length));
		decimalString = decimalString.substring(decimalString.lastIndexOf(".") + 1);
		for (var i = 0; i < decimalFormat.length; i++) {
			if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) != '0') {
				decimalPortion += decimalString.charAt(i);
				continue;
			}
			else if (decimalFormat.charAt(i) == '#' && decimalString.charAt(i) == '0') {
				var notParsed = decimalString.substring(i);
				if (notParsed.match('[1-9]')) {
					decimalPortion += decimalString.charAt(i);
					continue;
				}
				else {
					break;
				}
			}
			else {
				if (decimalFormat.charAt(i) == "0") {
					decimalPortion += decimalString.charAt(i);
				}
			}
		}
		returnString += decimalPortion
	}
	else {
		number = Math.round(number);
	}
    
    var ones = Math.floor(number);
    if (number < 0) {
		ones = Math.ceil(number);
	}
	
    var onePortion = "";
    if (ones == 0) {
       onePortion = '0';
    }
    else {
       // find how many digits are in the group
       var onesFormat = "";
       if (options.format.indexOf(dec) == -1) {
	   	onesFormat = options.format;
	   }
	   else {
	   	onesFormat = options.format.substring(0, options.format.indexOf(dec));
	   }
       var oneText = new String(Math.abs(ones));
       var groupLength = 9999;
       if (onesFormat.lastIndexOf(group) != -1) {
	   	groupLength = onesFormat.length - onesFormat.lastIndexOf(group) - 1;
	   }
       var groupCount = 0;
       for (var i=oneText.length-1; i>-1; i--) {
         onePortion = oneText.charAt(i) + onePortion;

         groupCount++;

         if (groupCount == groupLength && i!=0) {
             onePortion = group + onePortion;
             groupCount = 0;
         }

       }
    }
    returnString = onePortion + returnString;

    // handle special case where negative is in front of the invalid characters
    if (number < 0 && negativeInFront && prefix.length > 0) {
       prefix = neg + prefix;
    }
    else if (number < 0) {
       returnString = neg + returnString;
    }

    if (! options.decimalSeparatorAlwaysShown) {
        if (returnString.lastIndexOf(dec) == returnString.length - 1) {
            returnString = returnString.substring(0, returnString.length - 1);
        }
    }
    returnString = prefix + returnString + suffix;

	return returnString;
 };

	jQuery.parse.defaults = {
		locale: 'us',
		decimalSeparatorAlwaysShown: false
	};
	
	jQuery.format.defaults = {
		format: '#,##0.##',
		locale: 'us',
		decimalSeparatorAlwaysShown: false
	};

})(jQuery);

/*
 * jQuery plugin: fieldSelection - v0.1.0 - last change: 2006-12-16
 * (c) 2006 Alex Brem <alex@0xab.cd> - http://blog.0xab.cd
 */

/*(function() {

	var fieldSelection = {

		getSelection: function() {

			var e = this.jquery ? this[0] : this;

			return (

				// mozilla / dom 3.0
				('selectionStart' in e && function() {
					var l = e.selectionEnd - e.selectionStart;
					return { start: e.selectionStart, end: e.selectionEnd, length: l, text: e.value.substr(e.selectionStart, l) };
				}) ||

				// exploder
				(document.selection && function() {
$.log.warn(e);
					e.focus();

					var r = document.selection.createRange();
					if (r == null) {
						return { start: 0, end: e.value.length, length: 0 }
					}

					var re = e.createTextRange();
					var rc = re.duplicate();
					re.moveToBookmark(r.getBookmark());
					rc.setEndPoint('EndToStart', re);

					return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
				}) ||

				// browser not supported
				function() {
					return { start: 0, end: e.value.length, length: 0 };
				}

			)();

		},

		replaceSelection: function() {

			var e = this.jquery ? this[0] : this;
			var text = arguments[0] || '';

			return (

				// mozilla / dom 3.0
				('selectionStart' in e && function() {
					e.value = e.value.substr(0, e.selectionStart) + text + e.value.substr(e.selectionEnd, e.value.length);
					return this;
				}) ||

				// exploder
				(document.selection && function() {
					e.focus();
					document.selection.createRange().text = text;
					return this;
				}) ||

				// browser not supported
				function() {
					e.value += text;
					return this;
				}

			)();

		}

	};

	jQuery.each(fieldSelection, function(i) { jQuery.fn[i] = this; });

})();*/

/*
 * jQuery selection ranges
 * 
 * Authors: Damon Miller
 */
/*(function($) {

	$.fn.caret = function(pos) {
		if (pos === undefined) {// getter
			return $(this[0]).caretRange();
		}
		return this.each(function() {// setter
			$(this).caretRange(pos, pos);
		});
	};
	
	$.fn.caretRange = function(selectionStart, selectionEnd) {
		if (selectionStart === undefined) {// getter
			return $(this[0]).getSelection();
		}
		return this.each(function() {// setter
			var elm = $(this);
			elm.focus();
			if (this.setSelectionRange) {
				this.setSelectionRange(selectionStart, selectionEnd);
			}
			else if (this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', selectionEnd);
				range.moveStart('character', selectionStart);
				range.select();
			}
		});
	};
	
})(jQuery);*/

/* ***** Visual plugins ***** */

/*
 * jQuery UI Multiselect
 *
 * Authors:
 *  Michael Aufreiter (quasipartikel.at)
 *  Yanick Rochon (yanick.rochon[at]gmail[dot]com)
 * 
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 * 
 * http://www.quasipartikel.at/multiselect/
 *
 * 
 * Depends:
 *	ui.core.js
 *	ui.sortable.js
 *
 * Optional:
 * localization (http://plugins.jquery.com/project/localisation)
 * scrollTo (http://plugins.jquery.com/project/ScrollTo)
 * 
 * Todo:
 *  Make batch actions faster
 *  Implement dynamic insertion through remote calls
 */

(function($) {

$.widget("ui.multiselect", {
  options: {
		sortable: true,
		searchable: true,
		doubleClickable: true,
		animated: 'fast',
		show: 'slideDown',
		hide: 'slideUp',
		dividerLocation: 0.6,
		nodeComparator: function(node1,node2) {
			var text1 = node1.text(),
			    text2 = node2.text();
			return text1 == text2 ? 0 : (text1 < text2 ? -1 : 1);
		}
	},
	_create: function() {
		this.element.hide();
		this.id = this.element.attr("id");
		this.container = $('<div class="ui-multiselect ui-helper-clearfix ui-widget"></div>').insertAfter(this.element);
		this.count = 0; // number of currently selected options
		this.selectedContainer = $('<div class="selected"></div>').appendTo(this.container);
		this.availableContainer = $('<div class="available"></div>').appendTo(this.container);
		this.selectedActions = $('<div class="actions ui-widget-header ui-helper-clearfix"><span class="count">0 '+$.ui.multiselect.locale.itemsCount+'</span><a href="#" class="remove-all">'+$.ui.multiselect.locale.removeAll+'</a></div>').appendTo(this.selectedContainer);
		this.availableActions = $('<div class="actions ui-widget-header ui-helper-clearfix"><input type="text" class="search empty ui-widget-content ui-corner-all"/><a href="#" class="add-all">'+$.ui.multiselect.locale.addAll+'</a></div>').appendTo(this.availableContainer);
		this.selectedList = $('<ul class="selected connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind('selectstart', function(){return false;}).appendTo(this.selectedContainer);
		this.availableList = $('<ul class="available connected-list"><li class="ui-helper-hidden-accessible"></li></ul>').bind('selectstart', function(){return false;}).appendTo(this.availableContainer);

		var that = this;

		// set dimensions
		this.container.width(this.element.width()+1);
		this.selectedContainer.width(Math.floor(this.element.width()*this.options.dividerLocation));
		this.availableContainer.width(Math.floor(this.element.width()*(1-this.options.dividerLocation)));

		// fix list height to match <option> depending on their individual header's heights
		this.selectedList.height(Math.max(this.element.height()-this.selectedActions.height(),1));
		this.availableList.height(Math.max(this.element.height()-this.availableActions.height(),1));

		if ( !this.options.animated ) {
			this.options.show = 'show';
			this.options.hide = 'hide';
		}

		// init lists
		this._populateLists(this.element.find('option'));

		// make selection sortable
		if (this.options.sortable) {
			this.selectedList.sortable({
				placeholder: 'ui-state-highlight',
				axis: 'y',
				update: function(event, ui) {
					// apply the new sort order to the original selectbox
					that.selectedList.find('li').each(function() {
						if ($(this).data('optionLink'))
							$(this).data('optionLink').remove().appendTo(that.element);
					});
				},
				receive: function(event, ui) {
					ui.item.data('optionLink').attr('selected', true);
					// increment count
					that.count += 1;
					that._updateCount();
					// workaround, because there's no way to reference 
					// the new element, see http://dev.jqueryui.com/ticket/4303
					that.selectedList.children('.ui-draggable').each(function() {
						$(this).removeClass('ui-draggable');
						$(this).data('optionLink', ui.item.data('optionLink'));
						$(this).data('idx', ui.item.data('idx'));
						that._applyItemState($(this), true);
					});

					// workaround according to http://dev.jqueryui.com/ticket/4088
					setTimeout(function() { ui.item.remove(); }, 1);
				}
			});
		}

		// set up livesearch
		if (this.options.searchable) {
			this._registerSearchEvents(this.availableContainer.find('input.search'));
		} else {
			$('.search').hide();
		}

		// batch actions
		this.container.find(".remove-all").click(function() {
			that._populateLists(that.element.find('option').removeAttr('selected'));
			return false;
		});

		this.container.find(".add-all").click(function() {
			var options = that.element.find('option').not(":selected");
			if (that.availableList.children('li:hidden').length > 1) {
				that.availableList.children('li').each(function(i) {
					if ($(this).is(":visible")) $(options[i-1]).attr('selected', 'selected'); 
				});
			} else {
				options.attr('selected', 'selected');
			}
			that._populateLists(that.element.find('option'));
			return false;
		});
	},
	destroy: function() {
		this.element.show();
		this.container.remove();

		$.Widget.prototype.destroy.apply(this, arguments);
	},
	_populateLists: function(options) {
		this.selectedList.children('.ui-element').remove();
		this.availableList.children('.ui-element').remove();
		this.count = 0;

		var that = this;
		var items = $(options.map(function(i) {
	      var item = that._getOptionNode(this).appendTo(this.selected ? that.selectedList : that.availableList).show();

			if (this.selected) that.count += 1;
			that._applyItemState(item, this.selected);
			item.data('idx', i);
			return item[0];
    }));

		// update count
		this._updateCount();
		that._filter.apply(this.availableContainer.find('input.search'), [that.availableList]);
  },
	_updateCount: function() {
		// dmiller: modified to support the count existing in string other than beginning (for translations)
		this.selectedContainer.find('span.count').text($.ui.multiselect.locale.itemsCount.replace("{1}", this.count));
	},
	_getOptionNode: function(option) {
		option = $(option);
		var node = $('<li class="ui-state-default ui-element" title="'+option.text()+'"><span class="ui-icon"/>'+option.text()+'<a href="#" class="action"><span class="ui-corner-all ui-icon"/></a></li>').hide();
		node.data('optionLink', option);
		return node;
	},
	// clones an item with associated data
	// didn't find a smarter away around this
	_cloneWithData: function(clonee) {
		var clone = clonee.clone(false,false);
		clone.data('optionLink', clonee.data('optionLink'));
		clone.data('idx', clonee.data('idx'));
		return clone;
	},
	_setSelected: function(item, selected) {
		item.data('optionLink').attr('selected', selected);

		if (selected) {
			var selectedItem = this._cloneWithData(item);
			item[this.options.hide](this.options.animated, function() { $(this).remove(); });
			selectedItem.appendTo(this.selectedList).hide()[this.options.show](this.options.animated);

			this._applyItemState(selectedItem, true);
			return selectedItem;
		} else {

			// look for successor based on initial option index
			var items = this.availableList.find('li'), comparator = this.options.nodeComparator;
			var succ = null, i = item.data('idx'), direction = comparator(item, $(items[i]));

			// TODO: test needed for dynamic list populating
			if ( direction ) {
				while (i>=0 && i<items.length) {
					direction > 0 ? i++ : i--;
					if ( direction != comparator(item, $(items[i])) ) {
						// going up, go back one item down, otherwise leave as is
						succ = items[direction > 0 ? i : i+1];
						break;
					}
				}
			} else {
				succ = items[i];
			}

			var availableItem = this._cloneWithData(item);
			succ ? availableItem.insertBefore($(succ)) : availableItem.appendTo(this.availableList);
			item[this.options.hide](this.options.animated, function() { $(this).remove(); });
			availableItem.hide()[this.options.show](this.options.animated);

			this._applyItemState(availableItem, false);
			return availableItem;
		}
	},
	_applyItemState: function(item, selected) {
		if (selected) {
			if (this.options.sortable)
				item.children('span').addClass('ui-icon-arrowthick-2-n-s').removeClass('ui-helper-hidden').addClass('ui-icon');
			else
				item.children('span').removeClass('ui-icon-arrowthick-2-n-s').addClass('ui-helper-hidden').removeClass('ui-icon');
			item.find('a.action span').addClass('ui-icon-minus').removeClass('ui-icon-plus');
			this._registerRemoveEvents(item.find('a.action'));

		} else {
			item.children('span').removeClass('ui-icon-arrowthick-2-n-s').addClass('ui-helper-hidden').removeClass('ui-icon');
			item.find('a.action span').addClass('ui-icon-plus').removeClass('ui-icon-minus');
			this._registerAddEvents(item.find('a.action'));
		}

		this._registerDoubleClickEvents(item);
		this._registerHoverEvents(item);
	},
	// taken from John Resig's liveUpdate script
	_filter: function(list) {
		var input = $(this);
		var rows = list.children('li'),
			cache = rows.map(function(){

				return $(this).text().toLowerCase();
			});

		var term = $.trim(input.val().toLowerCase()), scores = [];

		if (!term) {
			rows.show();
		} else {
			rows.hide();

			cache.each(function(i) {
				if (this.indexOf(term)>-1) { scores.push(i); }
			});

			$.each(scores, function() {
				$(rows[this]).show();
			});
		}
	},
	_registerDoubleClickEvents: function(elements) {
		if (!this.options.doubleClickable) return;
		elements.dblclick(function() {
			elements.find('a.action').click();
		});
	},
	_registerHoverEvents: function(elements) {
		elements.removeClass('ui-state-hover');
		elements.mouseover(function() {
			$(this).addClass('ui-state-hover');
		});
		elements.mouseout(function() {
			$(this).removeClass('ui-state-hover');
		});
	},
	_registerAddEvents: function(elements) {
		var that = this;
		elements.click(function() {
			var item = that._setSelected($(this).parent(), true);
			that.count += 1;
			that._updateCount();
			return false;
		});

		// make draggable
		if (this.options.sortable) {
  		elements.each(function() {
  			$(this).parent().draggable({
  	      connectToSortable: that.selectedList,
  				helper: function() {
  					var selectedItem = that._cloneWithData($(this)).width($(this).width() - 50);
  					selectedItem.width($(this).width());
  					return selectedItem;
  				},
  				appendTo: that.container,
  				containment: that.container,
  				revert: 'invalid'
  	    });
  		});		  
		}
	},
	_registerRemoveEvents: function(elements) {
		var that = this;
		elements.click(function() {
			that._setSelected($(this).parent(), false);
			that.count -= 1;
			that._updateCount();
			return false;
		});
 	},
	_registerSearchEvents: function(input) {
		var that = this;

		input.focus(function() {
			$(this).addClass('ui-state-active');
		})
		.blur(function() {
			$(this).removeClass('ui-state-active');
		})
		.keypress(function(e) {
			if (e.keyCode == 13)
				return false;
		})
		.keyup(function() {
			that._filter.apply(this, [that.availableList]);
		});
	}
});

$.extend($.ui.multiselect, {
	locale: {
		addAll:'Add all',
		removeAll:'Remove all',
		itemsCount:'{1} items selected'
	}
});


})(jQuery);

/**
 *
 * Color picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 */
(function($){var ColorPicker=function(){var ids={},inAction,charMin=65,visible,tpl='<div class="colorpicker"><div class="colorpicker_color"><div><div></div></div></div><div class="colorpicker_hue"><div></div></div><div class="colorpicker_new_color"></div><div class="colorpicker_current_color"></div><div class="colorpicker_hex"><input type="text" maxlength="6" size="6" /></div><div class="colorpicker_rgb_r colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_g colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_rgb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_h colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_s colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_hsb_b colorpicker_field"><input type="text" maxlength="3" size="3" /><span></span></div><div class="colorpicker_submit"></div></div>',defaults={eventName:'click',onShow:function(){},onBeforeShow:function(){},onHide:function(){},onChange:function(){},onSubmit:function(){},color:'ff0000',livePreview:true,flat:false},fillRGBFields=function(hsb,cal){var rgb=HSBToRGB(hsb);$(cal).data('colorpicker').fields.eq(1).val(rgb.r).end().eq(2).val(rgb.g).end().eq(3).val(rgb.b).end();},fillHSBFields=function(hsb,cal){$(cal).data('colorpicker').fields.eq(4).val(hsb.h).end().eq(5).val(hsb.s).end().eq(6).val(hsb.b).end();},fillHexFields=function(hsb,cal){$(cal).data('colorpicker').fields.eq(0).val(HSBToHex(hsb)).end();},setSelector=function(hsb,cal){$(cal).data('colorpicker').selector.css('backgroundColor','#'+HSBToHex({h:hsb.h,s:100,b:100}));$(cal).data('colorpicker').selectorIndic.css({left:parseInt(150*hsb.s/100,10),top:parseInt(150*(100-hsb.b)/100,10)});},setHue=function(hsb,cal){$(cal).data('colorpicker').hue.css('top',parseInt(150-150*hsb.h/360,10));},setCurrentColor=function(hsb,cal){$(cal).data('colorpicker').currentColor.css('backgroundColor','#'+HSBToHex(hsb));},setNewColor=function(hsb,cal){$(cal).data('colorpicker').newColor.css('backgroundColor','#'+HSBToHex(hsb));},keyDown=function(ev){var pressedKey=ev.charCode||ev.keyCode||-1;if((pressedKey>charMin&&pressedKey<=90)||pressedKey==32){return false;}
var cal=$(this).parent().parent();if(cal.data('colorpicker').livePreview===true){change.apply(this);}},change=function(ev){var cal=$(this).parent().parent(),col;if(this.parentNode.className.indexOf('_hex')>0){cal.data('colorpicker').color=col=HexToHSB(fixHex(this.value));}
else
if(this.parentNode.className.indexOf('_hsb')>0){cal.data('colorpicker').color=col=fixHSB({h:parseInt(cal.data('colorpicker').fields.eq(4).val(),10),s:parseInt(cal.data('colorpicker').fields.eq(5).val(),10),b:parseInt(cal.data('colorpicker').fields.eq(6).val(),10)});}
else{cal.data('colorpicker').color=col=RGBToHSB(fixRGB({r:parseInt(cal.data('colorpicker').fields.eq(1).val(),10),g:parseInt(cal.data('colorpicker').fields.eq(2).val(),10),b:parseInt(cal.data('colorpicker').fields.eq(3).val(),10)}));}
if(ev){fillRGBFields(col,cal.get(0));fillHexFields(col,cal.get(0));fillHSBFields(col,cal.get(0));}
setSelector(col,cal.get(0));setHue(col,cal.get(0));setNewColor(col,cal.get(0));cal.data('colorpicker').onChange.apply(cal,[col,HSBToHex(col),HSBToRGB(col)]);},blur=function(ev){var cal=$(this).parent().parent();cal.data('colorpicker').fields.parent().removeClass('colorpicker_focus');},focus=function(){charMin=this.parentNode.className.indexOf('_hex')>0?70:65;$(this).parent().parent().data('colorpicker').fields.parent().removeClass('colorpicker_focus');$(this).parent().addClass('colorpicker_focus');},downIncrement=function(ev){var field=$(this).parent().find('input').focus();var current={el:$(this).parent().addClass('colorpicker_slider'),max:this.parentNode.className.indexOf('_hsb_h')>0?360:(this.parentNode.className.indexOf('_hsb')>0?100:255),y:ev.pageY,field:field,val:parseInt(field.val(),10),preview:$(this).parent().parent().data('colorpicker').livePreview};$(document).bind('mouseup',current,upIncrement);$(document).bind('mousemove',current,moveIncrement);},moveIncrement=function(ev){ev.data.field.val(Math.max(0,Math.min(ev.data.max,parseInt(ev.data.val+ev.pageY-ev.data.y,10))));if(ev.data.preview){change.apply(ev.data.field.get(0),[true]);}
return false;},upIncrement=function(ev){change.apply(ev.data.field.get(0),[true]);ev.data.el.removeClass('colorpicker_slider').find('input').focus();$(document).unbind('mouseup',upIncrement);$(document).unbind('mousemove',moveIncrement);return false;},downHue=function(ev){var current={cal:$(this).parent(),y:$(this).offset().top};current.preview=current.cal.data('colorpicker').livePreview;$(document).bind('mouseup',current,upHue);$(document).bind('mousemove',current,moveHue);},moveHue=function(ev){change.apply(ev.data.cal.data('colorpicker').fields.eq(4).val(parseInt(360*(150-Math.max(0,Math.min(150,(ev.pageY-ev.data.y))))/150,10)).get(0),[ev.data.preview]);return false;},upHue=function(ev){fillRGBFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));fillHexFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));$(document).unbind('mouseup',upHue);$(document).unbind('mousemove',moveHue);return false;},downSelector=function(ev){var current={cal:$(this).parent(),pos:$(this).offset()};current.preview=current.cal.data('colorpicker').livePreview;$(document).bind('mouseup',current,upSelector);$(document).bind('mousemove',current,moveSelector);},moveSelector=function(ev){change.apply(ev.data.cal.data('colorpicker').fields.eq(6).val(parseInt(100*(150-Math.max(0,Math.min(150,(ev.pageY-ev.data.pos.top))))/150,10)).end().eq(5).val(parseInt(100*(Math.max(0,Math.min(150,(ev.pageX-ev.data.pos.left))))/150,10)).get(0),[ev.data.preview]);return false;},upSelector=function(ev){fillRGBFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));fillHexFields(ev.data.cal.data('colorpicker').color,ev.data.cal.get(0));$(document).unbind('mouseup',upSelector);$(document).unbind('mousemove',moveSelector);return false;},enterSubmit=function(ev){$(this).addClass('colorpicker_focus');},leaveSubmit=function(ev){$(this).removeClass('colorpicker_focus');},clickSubmit=function(ev){var cal=$(this).parent();var col=cal.data('colorpicker').color;cal.data('colorpicker').origColor=col;setCurrentColor(col,cal.get(0));cal.data('colorpicker').onSubmit(col,HSBToHex(col),HSBToRGB(col),cal.data('colorpicker').el);},show=function(ev){var cal=$('#'+$(this).data('colorpickerId'));cal.data('colorpicker').onBeforeShow.apply(this,[cal.get(0)]);var pos=$(this).offset();var viewPort=getViewport();var top=pos.top+this.offsetHeight;var left=pos.left;if(top+176>viewPort.t+viewPort.h){top-=this.offsetHeight+176;}
if(left+356>viewPort.l+viewPort.w){left-=356;}
cal.css({left:left+'px',top:top+'px'});if(cal.data('colorpicker').onShow.apply(this,[cal.get(0)])!==false){cal.show();}
$(document).bind('mousedown',{cal:cal},hide);return false;},hide=function(ev){if(!isChildOf(ev.data.cal.get(0),ev.target,ev.data.cal.get(0))){if(ev.data.cal.data('colorpicker').onHide.apply(this,[ev.data.cal.get(0)])!==false){ev.data.cal.hide();}
$(document).unbind('mousedown',hide);}},isChildOf=function(parentEl,el,container){if(parentEl==el){return true;}
if(parentEl.contains){return parentEl.contains(el);}
if(parentEl.compareDocumentPosition){return!!(parentEl.compareDocumentPosition(el)&16);}
var prEl=el.parentNode;while(prEl&&prEl!=container){if(prEl==parentEl){return true;}
prEl=prEl.parentNode;}
return false;},getViewport=function(){var m=document.compatMode=='CSS1Compat';return{l:window.pageXOffset||(m?document.documentElement.scrollLeft:document.body.scrollLeft),t:window.pageYOffset||(m?document.documentElement.scrollTop:document.body.scrollTop),w:window.innerWidth||(m?document.documentElement.clientWidth:document.body.clientWidth),h:window.innerHeight||(m?document.documentElement.clientHeight:document.body.clientHeight)};},fixHSB=function(hsb){return{h:Math.min(360,Math.max(0,hsb.h)),s:Math.min(100,Math.max(0,hsb.s)),b:Math.min(100,Math.max(0,hsb.b))};},fixRGB=function(rgb){return{r:Math.min(255,Math.max(0,rgb.r)),g:Math.min(255,Math.max(0,rgb.g)),b:Math.min(255,Math.max(0,rgb.b))};},fixHex=function(hex){var len=6-hex.length;if(len>0){var o=[];for(var i=0;i<len;i++){o.push('0');}
o.push(hex);hex=o.join('');}
return hex;},HexToRGB=function(hex){hex=parseInt(((hex.indexOf('#')>-1)?hex.substring(1):hex),16);return{r:hex>>16,g:(hex&0x00FF00)>>8,b:(hex&0x0000FF)};},HexToHSB=function(hex){return RGBToHSB(HexToRGB(hex));},RGBToHSB=function(rgb){var hsb={h:0,s:0,b:0};var min=Math.min(rgb.r,rgb.g,rgb.b);var max=Math.max(rgb.r,rgb.g,rgb.b);var delta=max-min;hsb.b=max;if(max!==0){}
hsb.s=max!==0?255*delta/max:0;if(hsb.s!==0){if(rgb.r===max){hsb.h=(rgb.g-rgb.b)/delta;}
else
if(rgb.g===max){hsb.h=2+(rgb.b-rgb.r)/delta;}
else{hsb.h=4+(rgb.r-rgb.g)/delta;}}
else{hsb.h=-1;}
hsb.h*=60;if(hsb.h<0){hsb.h+=360;}
hsb.s*=100/255;hsb.b*=100/255;return hsb;},HSBToRGB=function(hsb){var rgb={};var h=Math.round(hsb.h);var s=Math.round(hsb.s*255/100);var v=Math.round(hsb.b*255/100);if(s===0){rgb.r=rgb.g=rgb.b=v;}
else{var t1=v;var t2=(255-s)*v/255;var t3=(t1-t2)*(h%60)/60;if(h===360){h=0;}
if(h<60){rgb.r=t1;rgb.b=t2;rgb.g=t2+t3;}
else
if(h<120){rgb.g=t1;rgb.b=t2;rgb.r=t1-t3;}
else
if(h<180){rgb.g=t1;rgb.r=t2;rgb.b=t2+t3;}
else
if(h<240){rgb.b=t1;rgb.r=t2;rgb.g=t1-t3;}
else
if(h<300){rgb.b=t1;rgb.g=t2;rgb.r=t2+t3;}
else
if(h<360){rgb.r=t1;rgb.g=t2;rgb.b=t1-t3;}
else{rgb.r=0;rgb.g=0;rgb.b=0;}}
return{r:Math.round(rgb.r),g:Math.round(rgb.g),b:Math.round(rgb.b)};},RGBToHex=function(rgb){var hex=[rgb.r.toString(16),rgb.g.toString(16),rgb.b.toString(16)];$.each(hex,function(nr,val){if(val.length==1){hex[nr]='0'+val;}});return hex.join('');},HSBToHex=function(hsb){return RGBToHex(HSBToRGB(hsb));},restoreOriginal=function(){var cal=$(this).parent();var col=cal.data('colorpicker').origColor;cal.data('colorpicker').color=col;fillRGBFields(col,cal.get(0));fillHexFields(col,cal.get(0));fillHSBFields(col,cal.get(0));setSelector(col,cal.get(0));setHue(col,cal.get(0));setNewColor(col,cal.get(0));};return{init:function(opt){opt=$.extend({},defaults,opt||{});if(typeof opt.color=='string'){opt.color=HexToHSB(opt.color);}
else
if(opt.color.r!==undefined&&opt.color.g!==undefined&&opt.color.b!==undefined){opt.color=RGBToHSB(opt.color);}
else
if(opt.color.h!==undefined&&opt.color.s!==undefined&&opt.color.b!==undefined){opt.color=fixHSB(opt.color);}
else{return this;}
return this.each(function(){if(!$(this).data('colorpickerId')){var options=$.extend({},opt);options.origColor=opt.color;var id='collorpicker_'+parseInt(Math.random()*1000,10);$(this).data('colorpickerId',id);var cal=$(tpl).attr('id',id);if(options.flat){cal.appendTo(this).show();}
else{cal.appendTo(document.body);}
options.fields=cal.find('input').bind('keyup',keyDown).bind('change',change).bind('blur',blur).bind('focus',focus);cal.find('span').bind('mousedown',downIncrement).end().find('>div.colorpicker_current_color').bind('click',restoreOriginal);options.selector=cal.find('div.colorpicker_color').bind('mousedown',downSelector);options.selectorIndic=options.selector.find('div div');options.el=this;options.hue=cal.find('div.colorpicker_hue div');cal.find('div.colorpicker_hue').bind('mousedown',downHue);options.newColor=cal.find('div.colorpicker_new_color');options.currentColor=cal.find('div.colorpicker_current_color');cal.data('colorpicker',options);cal.find('div.colorpicker_submit').bind('mouseenter',enterSubmit).bind('mouseleave',leaveSubmit).bind('click',clickSubmit);fillRGBFields(options.color,cal.get(0));fillHSBFields(options.color,cal.get(0));fillHexFields(options.color,cal.get(0));setHue(options.color,cal.get(0));setSelector(options.color,cal.get(0));setCurrentColor(options.color,cal.get(0));setNewColor(options.color,cal.get(0));if(options.flat){cal.css({position:'relative',display:'block'});}
else{$(this).bind(options.eventName,show);}}});},showPicker:function(){return this.each(function(){if($(this).data('colorpickerId')){show.apply(this);}});},hidePicker:function(){return this.each(function(){if($(this).data('colorpickerId')){$('#'+$(this).data('colorpickerId')).hide();}});},setColor:function(col){if(typeof col=='string'){col=HexToHSB(col);}
else
if(col.r!==undefined&&col.g!==undefined&&col.b!==undefined){col=RGBToHSB(col);}
else
if(col.h!==undefined&&col.s!==undefined&&col.b!==undefined){col=fixHSB(col);}
else{return this;}
return this.each(function(){if($(this).data('colorpickerId')){var cal=$('#'+$(this).data('colorpickerId'));cal.data('colorpicker').color=col;cal.data('colorpicker').origColor=col;fillRGBFields(col,cal.get(0));fillHSBFields(col,cal.get(0));fillHexFields(col,cal.get(0));setHue(col,cal.get(0));setSelector(col,cal.get(0));setCurrentColor(col,cal.get(0));setNewColor(col,cal.get(0));}});}};}();$.fn.extend({ColorPicker:ColorPicker.init,ColorPickerHide:ColorPicker.hidePicker,ColorPickerShow:ColorPicker.showPicker,ColorPickerSetColor:ColorPicker.setColor});})(jQuery);

(function($) {

	$.widget("ui.ajaxIndicator", {
		options : {
			duration : "fast"
		},
		_create : function() {
			var o = this.options;

			$('<div class="ui-ajax ui-widget ui-corner-bl" style="display: none;" id="ajaxLoaderContainer"><span class="ui-ajax-loader"></span><em>' + $.fn.ajaxIndicator.locale.loadingMessage + '</em></div>')
			.ajaxSend(function() {
				$(this).slideDown(o.duration);
			})
			.ajaxComplete(function() {
				$(this).slideUp(o.duration);
			})
			.appendTo(this.element);
		},
		destroy : function() {
			this.element.find("div.ui-ajax").remove();
		}
	});

	$.extend($.fn.ajaxIndicator, {
		locale : {
			loadingMessage : 'Loading...'
		}
	});

})(jQuery);

/* IE does not like the css() call; moved all this logic to custom tag
(function($) {
	
	$.fn.colorSelector = function(o) {
		return this.each(function(){
			var elm = $(this);
			elm.attr('title', elm.text()).css('backgroundColor', elm.text());.text('');
		});
	};
	
})(jQuery);*/

/* ***** Button plugins ***** */
(function($) {

	var $root = $(document);
	
	$.fn.uiLibButton = function(o){
	
		var defaults = {};
		
		return this.each(function() {
			var elm = $(this);
			
			// parameters
			var options = $.extend({}, defaults, o, elm.metadata({type: 'html5'}));
			
			if (options.menu) {
				this.menu = $(this).next().menu({
					select: function(){
						$(this).hide();
					}
				}).hide()
					.addClass('ui-menu-of-button')
					.css({'position': 'absolute', 'z-index': 999})
					.appendTo(document.body)
				;
				
				elm.bind('click', function() {
					var menu = this.menu;
					if (menu.is(":visible")) {
						menu.hide();
						return false;
					}
					menu.menu('deactivate').show().css({top:0, left:0}).position({
						my: 'left top',
						at: 'left bottom',
						of: this
					});
					$(document).one('click', function() {
						menu.hide();
					});
					return false;
				});
			}
			
			elm.button(options);
		});
		
	};

})(jQuery);

/* ***** Table plugins ***** */

/*
 * @author Damon Miller
 */
(function($) {
	
	var $root = $(document);
	
	$.fn.uiLibTable = function() {
		var defaults = {};
		
		return this.each(function() {
			var elm = $(this);
			elm.find('thead tr').addClass('ui-state-default');
			elm.find('tbody tr').addClass('ui-widget-content');
			elm.find('tbody').each(function() {
				var tbody = $(this);
				// 0 based selector so classes are switched to accomodate
				tbody.find('tr:even').addClass('ui-table-row-odd');
				tbody.find('tr:odd').addClass('ui-table-row-even');
			});
		});
	};
	
})(jQuery);

/* RateIt plugin */
(function($) {
	
	$.fn.uiLibRating = function(o){
		var defaults = {};
		
		return this.each(function(){
			var elm = $(this);
			var selectElm = $("#" + elm.attr("id") + "_select");
			
			elm.rateit().bind("hover", function(evt, val){
				$(this).attr("title", $(selectElm.attr("options")[val]).text());
			}).bind("rated reset", function(evt){
				var ui = $(this);
				var val = ui.rateit("value");

				$.ajax({
					type: "post",
					data: {
						value: ui.rateit("value")
					},
					url: ui.data("rateit-url")
				});
			});
			
		});
	};
	
})(jQuery);

/* ***** DataGrid plugins ***** */
(function($) {

	var $root = $(document);
	
	$.fn.uiLibDataGrid = function(o){
		// handle method calling
		if (typeof o === 'string') {
			var fn = $.fn.uiLibDataGrid[o];
			if (!fn) {
				throw('uiLibDataGrid - No such method: ' + o);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this, args);
		}
		
		var defaults = {};
		
		return this.each(function() {
			var elm = $(this);
			
			// parameters
			var options = $.extend({}, defaults, o, elm.metadata({type: 'html5'}));
			var navigationId = '#' + elm.attr('id') + 'Navigation';
			
			// set options for each column
			$.each(options.colModel, function() {
				this['classes'] = 'ui-ellipsis';	// turns on ellipsis per column
				try {
					this['formatter'] = eval('(' + this['formatter'] + ')');
				} 
				catch (e) {}
			});
			
			elm.data('options', options);
			
			elm.jqGrid(options);
			
			// ColumnChooser is turned on
			if (options.columnchooser) {
				elm
					.jqGrid('navGrid', navigationId, {
						add: false,
						edit: false,
						del: false,
						search: false,
						refresh: false
					})
					.jqGrid('navButtonAdd', navigationId, {
						caption: $.fn.uiLibDataGrid.locale.columnCaption,
						title: $.fn.uiLibDataGrid.locale.columnTitle,
						onClickButton: function(){
							elm.jqGrid('columnChooser', {
								done: function(perm){
									if (perm) {
										// loop through columns to grab which are visible
										var columns = [];
										//$.log.warn(perm);
										$.each(perm, function() {
											var colProps = elm.jqGrid('getGridParam', 'colModel')[this];
											if (!colProps.hidden && colProps.name !== 'cb') {
												columns.push(colProps.name);
											}
										});
										
										// send column config to server to be saved under user settings
										$.get('index.cfm?fuseaction=usersettings.doResultSetConfiguration', {
											resultSetCode: elm.data('options')['resultSetCode'],
											columns: columns.join(',')
										});

										elm.jqGrid('remapColumns', perm, true);
									}
								},
								width: 450
							});
						}
					})
				;
			}
		});
		
	};

	$.extend($.fn.uiLibDataGrid, {
		locale: {
			columnCaption: 'Columns',
			columnTitle: 'Reorder Columns'
		}
	});
		
	$.extend($.fn.uiLibDataGrid, {
		resize: function(){
			return this.each(function(){
				var elm = $(this);
				if (elm.filter(':visible').jqGrid) {
					elm.jqGrid('setGridWidth', elm.parents('div.ui-datagrid-container').width());
				}
			});
		}	
	});
	
	// resize event has too many problems in IE6 so only bind for other browsers
	if (!($.browser.msie && $.browser.version === '6.0')) {
		$(window).bind('resize', function() {
			$('table.ui-datagrid').uiLibDataGrid('resize');
		}).trigger('resize');
	}
	
})(jQuery);

/* ***** Form plugins ***** */

/*
 * @author Damon Miller
 */
(function($){
	
	var $root = $(document);
	
	function param(name, def) {
		var ret = name;
		if (undefined === name) {
			ret = def;
		}
		return ret;
	}
	
	function isPlaceholderSupported() {
		var elm = document.createElement('input');
		var ret = ('placeholder' in elm);
		elm = null;
		return ret;
	}
	
	function toNumber(v) {
		switch (typeof v) {
			case 'string':
				return new Number(v).valueOf();
				break;
			case 'number':
				return v;
				break;
			case 'object':
				if (v instanceof Date) {
					return v.getTime();
				}
				else if (v instanceof Number) {
					return v.valueOf();
				}
				break;
		}
	}
	
	function toPositiveNumber(v) {
		v = toNumber(v);
		switch (typeof v) {
			case 'number':
				if (v < 0) {
					return 0;
				}
				return v;
				break;
		}
	}
	
	function toDate(v) {
		switch (typeof v) {
			case 'string':
				// must be in UTC format: 2010-05-13
				v = v.split('-');
				return new Date(v[0], v[1] - 1, v[2]);
				break;
			case 'number':
				return new Date(v);
				break;
			case 'object':
				if (v instanceof Date) {
					return v;
				}
				break;
		}
	}
	
	function verifyInRange(v, min, max) {
		if ($.IsNumeric(min) && v < min) {
			v = min;
		}
		else if ($.IsNumeric(max) && v > max) {
			v = max;
		}
		return v;
	}
	
	function getLocale(locale) {
		locale = locale || ($(document.documentElement).attr('lang') || 'en').split('-')[0];
		try {
			$.webform.text.requiredFieldText;
		} 
		catch (e) {
			locale = 'en';
		}
		return locale;
	}
	
	function convertHTMLEntity(myString) {
		myString = myString.replace( /\&amp;/g, '&' );
		myString = myString.replace( /\&lt;/g, '<' );
		myString = myString.replace( /\&quot;/g, '"' );
		myString = myString.replace( /\&copy;/g, 'Â©' );
		myString = myString.replace( /\&reg;/g, 'Â®' );
		myString = myString.replace( /\&laquo;/g, 'Â«' );
		myString = myString.replace( /\&raqou;/g, 'Â»' );
		myString = myString.replace( /\&apos;/g, "'" );
		return myString;
	}

	// private variables
	var attrTypes = {
		'accept': 'file'
		, 'alt': 'image'
		, 'autocomplete': 'text,search,url,tel,email,password,datetime,date,month,week,time,datetime-local,number,range,color'
		, 'checked': 'checkbox,radio'
		, 'formaction': 'submit,image'
		, 'formenctype': 'submit,image'
		, 'formmethod': 'submit,image'
		, 'formnovalidate': 'submit,image'
		, 'formtarget': 'submit,image'
		, 'height': 'image'
		, 'list': 'text,search,url,tel,email,datetime,date,month,week,time,datetime-local,number,range,color'
		, 'max': 'datetime,date,month,week,time,datetime-local,number,range,select-multiple'
		, 'maxlength': 'text,search,url,tel,email,password,textarea,richtext'
		, 'min': 'datetime,date,month,week,time,datetime-local,number,range,select-multiple'
		, 'minlength': 'text,search,url,tel,email,password,textarea,richtext'
		, 'multiple': 'email,file,select-multiple'
		, 'pattern': 'text,search,url,tel,email,password,textarea,richtext'
		, 'placeholder': 'text,search,url,tel,email,password,textarea,richtext'
		, 'readonly': 'text,search,url,tel,email,password,datetime,date,month,week,time,datetime-local,number,textarea,richtext'
		, 'required': 'text,search,url,tel,email,password,datetime,date,month,week,time,datetime-local,number,checkbox,radio,file,textarea,richtext,select-one,select-multiple,checkbox-group,radio-group,autocomplete'
		, 'size': 'text,search,url,tel,email,password,select-multiple'
		, 'src': 'image'
		, 'step': 'datetime,date,month,week,time,datetime-local,number,range'
		, 'width': 'image'
		/* DOM properties/methods */
		, 'files': 'file'
		, 'selectedOption': 'text,search,url,tel,email,datetime,date,month,week,time,datetime-local,number,range,color'
		, 'stepDown': 'datetime,date,month,week,time,datetime-local,number,range'
		, 'stepUp': 'datetime,date,month,week,time,datetime-local,number,range'
		, 'valueAsDate': 'datetime,date,month,week,time'
		, 'valueAsNumber': 'datetime,date,month,week,time,datetime-local,number,range'
		/* custom */
		, 'characterCount': 'textarea,richtext'
		, 'label': 'checkbox,radio'
		, 'selectMethods': 'select-one,select-multiple'
		, 'selectGroupMethods': 'select-group'
		, 'valueForAutoComplete': 'autocomplete'
		, 'isInGroup': 'checkbox,radio'
	};
	
	/*
	 * WebForm
	 */
	$.webform = {
		regional: [],
		text: {	/* override these for translations */
			validationMessages: {
				valueMissing: 'Please include a value for this field.',
				typeMismatch: 'Value provided is incorrect for this field.',
				patternMismatch: 'Format of the value provided is incorrect.',
				tooShort: 'Value provided is shorter than the required minimum length.',
				tooLong: 'Value provided exceeds the required maximum length.',
				rangeUnderflow: 'Value provided is less than the expected range.',
				rangeOverflow: 'Value provided is greater than the expected range.',
				stepMismatch: 'Step mismatch error'
			},
			requiredFieldText: 'A value is required for this field',
			formErrorMessages: {
				title: 'Form Validation Issue',
				paragraphs: ['There was one or more issues with data provided that prevented the submission of the form.', 'Additional information about each field\'s issue can be found by hovering over the field with your mouse.', 'Please review and update the fields in red, and submit the form again.']
			},
			okButtonText: 'Ok',
			autocomplete: {
				placeholder: 'Type information to search...'
			},
			selectMultiple: {
				selectAll: 'Select All',
				deselectAll: 'Deselect All'
			}
		},
		regex: {
			email: /^\S+@\S+\.\S+$/,
			url: /^https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?/
		},
		getFields: function(e) {
			var startTickCount = $.getTickCount();
			elm = $(e);
			if (!elm.length) {
				return [];
			}
			var logMsg = '$.webform.getFields()';
			//$.log.debug(logMsg);
			
			// must be a form field with an id attribute, but not of type hidden
			var ret = elm.find(':input[id][class^=ui-form-field], fieldset[id][class^=ui-form-field], button[type=submit]').not('[type=hidden]');
			
			$.log.tick(startTickCount, logMsg);
			return ret;
		},
		setDefaults: function(settings) {
			$.webform.text = settings;
			return this;
		}
	};
	
	$.fn.webform = function(o) {
		// handle method calling
		if (typeof o === 'string') {
			var fn = $.fn.webform[o];
			if (!fn) {
				throw('webform - No such method: ' + o);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this, args);
		}
		
		var defaults = {
			disableSubmit: true
			, noValidate: false
		};
		
		return this.each(function() {
			var startTickCount = $.getTickCount();
			var elm = $(this);
			if (elm.data('webform')) { return; }
			
			// flag as initialized
			elm.data('webform', true);
			
			elm.data('info', '$(#' + (elm.attr('id') || elm.attr('name')) + ')');

			var logMsg = elm.data('info') + '.webform()';
			$.log.debug(logMsg);
			
			// parameters
			var options = $.extend({}, defaults, o, elm.metadata({type: 'html5'}));
			
			// convert parameter name differences
			options['disableSubmit'] = options['disablesubmit'] !== undefined ? options['disablesubmit'] : options['disableSubmit'];
			
			// set parameters to data collection
			for (var key in options) {
				elm.data(key, options[key]);
			}
			
			// get form ID; auto-generate if not defined
			var formId = elm.attr('id') || 'form' + new Date().getTime().toString();
			elm.attr('id', formId);
			
			// bind events to form
			elm.submit(function(evt) {
				var ret = true;
				
				if (options['disableSubmit']) {
					// disable all submit buttons
					var submits = elm.find(':submit');
					submits.each(function(){
						var e = $(this);
						// save current disabled state for restoration
						e.data('disabled-original', e.attr('disabled'));
						e.attr('disabled', true);
					});
				}
				
				// trigger event
				elm.trigger('onBeforeValidation');
				
				// validate form
				if (!elm.data('noValidate') && !elm.webform('checkValidity')) {
					
					if (options['disableSubmit']) {
						// restore submit buttons
						submits.each(function(){
							var e = $(this);
							// restore previous disabled state
							if (e.data('disabled-original')) {
								e.attr('disabled', true);
							}
							else {
								e.removeAttr('disabled');
							}
							e.removeData('disabled-original')
						});
					}
					ret = false;
				}
				
				// trigger event
				elm.trigger('onAfterValidation');
				
				return ret;
			});
			
			$.log.tick(startTickCount, logMsg);
		});
	};
	
	$.extend($.fn.webform, {
		
		/* HTML5 Methods */
		checkValidity: function() {
			var startTickCount = $.getTickCount();
			var elm = $(this[0]);
			if (!elm.data('webform')) { return; }
			var logMsg = elm.data('info') + '.webform(checkValidity)';
			$.log.debug(logMsg);
			
			var valid = true;
			var fieldsInError = [];
			
			// loop over each field in form
			$.webform.getFields(elm).not('button[type=submit]').each(function() {
				var field = $(this);
				
				// if this is select-group, call selectAll() on associated select box
				if (field.webfield('type') === 'select-group') {
					field.data('controls')['associated'].webfield('selectAll');
				}
				
				// trigger event
				//field.trigger('onBeforeValidation');

				var isValid = field.webfield('checkValidity'); // validate the field
				if (!isValid) {
					fieldsInError.push(field);
				}

				// trigger event
				//field.trigger('onAfterValidation');

				// below conditional only sets the form status until a field fails validation
				// once 1 field fails, retains form failure and allows remaining fields to continue validation
				if (valid) {
					valid = isValid;
					// sets the focus to the 1st field that returned invalid
					//if (!isValid) {
					//	field.focus();
					//}
				}
			});
			
			elm.data('fieldsInError', fieldsInError);
			
			if (!valid) {
				var dId = elm.attr('id') + '_dialog';
				var dialogEl = $root.find('div#' + dId);
				
				// create dialog, if does not exist
				if (!dialogEl.length) {
					var dialogText = '<div id="' + dId + '" title="' + $.webform.text.formErrorMessages.title + '"><div class="ui-state-error"><span class="ui-icon ui-icon-alert"></span>';
					var msgs = $.webform.text.formErrorMessages.paragraphs;
					for (var i = 0, len = msgs.length; i < len; i++) {
						dialogText += '<p>' + msgs[i] + '</p>';
					}
					dialogText += '</div></div>';
					dialogEl = $(dialogText).appendTo($root.find('body'));
					
					var buttons = {};
					buttons[$.webform.text.okButtonText] = function() {
						$(this).dialog('close');
					};
					
					// show dialog
					dialogEl.dialog({
						buttons: buttons,
						closeOnEscape: true,
						dialogClass: 'ui-dialog-error',
						modal: true,
						position: 'center',
						resizable: false
					});
				}
				dialogEl.dialog('open');
			}
			
			$.log.debug(logMsg + '#valid=' + valid);
			$.log.tick(startTickCount, logMsg);
			return valid;
		}
		
	});
	
	/*
	 * WebField
	 */
	$.fn.webfield = function(o) {
		// handle method calling
		if (typeof o === 'string') {
			var fn = $.fn.webfield[o];
			if (!fn) {
				throw('webfield - No such method: ' + o);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this, args);
		}
		
		var defaults = {};
		
		return this.each(function() {
			var startTickCount = $.getTickCount();
			var elm = $(this);
			if (elm.data('webfield')) { return; }
			
			// flag as initialized
			elm.data('webfield', true);

			var type = elm.webfield('type');
			
			if (elm.hasClass("ui-form-field-date")) {
				type = "date";
			}
			else if (elm.hasClass("ui-form-field-number")) {
				type = "number";
			}

			elm.data('info', '$(#' + (elm.attr('id') || elm.attr('name')) + '[type=' + type + '])');

			var logMsg = elm.data('info') + '.webfield()';
			//$.log.debug(logMsg);

			// parameters
			var options = $.extend({}, defaults, o, elm.metadata({type: 'html5'}));
			
			// convert parameter name differences
			options['validationMessages'] = param(options['validationMessages'], options['validationmessages']);
			if (!options['validationMessages']) {
				options['validationMessages'] = {};
			}
			
			// set parameters to data collection
			for (var key in options) {
				elm.data(key, options[key]);
			}
			
			// default HTML5 properties
			elm.data('validationMessage', '');
			elm.data('validity', {
				valid: true
				, valueMissing: false
				, typeMismatch: false
				, patternMismatch: false
				, tooShort: false
				, tooLong: false
				, rangeUnderflow: false
				, rangeOverflow: false
				, stepMismatch: false
				, customError: false
			});
			
			// do not allow maxlength to exceed allowed length of DB data type
			if ($.ListFindNoCase('text,search,url,tel,email,password', type)) {	// assume nvarchar(4000)
				var maxlength = elm.webfield('maxlength');
				if (maxlength === undefined || maxlength > 4000) {
					elm.webfield('maxlength', 4000);
				}
			}

			// functionality initialization
			switch (type) {
				
				case 'date':
				
					var d = {
						changeMonth: true
						, changeYear: true
						, dateFormat: 'mm/dd/yy'
						, selectOtherMonths: true
						, showButtonPanel: true
						, showOtherMonths: true
						//, showWeek: true	// BUG: weeks show 53 in some years which throws off week count in following year
					};
					options = $.extend(options, d);
					
					// convert parameter name differences
					if (options['dateformat']) {
						options['dateFormat'] = options['dateformat'];
					}
					options['firstDay'] = param(options['firstDay'], options['firstday']);
					options.yearRange = '1901:c+25';
					if (elm.webfield('min')) {
						options.minDate = $.datepicker.formatDate(options.dateFormat, toDate(elm.webfield('min')));
					}
					if (elm.webfield('max')) {
						options.maxDate = $.datepicker.formatDate(options.dateFormat, toDate(elm.webfield('max')));
					}
					options.onClose = function() {
						elm.webfield('checkValidity');
					};

					elm
						.data('options', options)
						//.attr('size', '11')
						.attr('autocomplete', 'off')
						.bind('blur', function() {
							elm.val($.datepicker.formatDate(elm.datepicker('option', 'dateFormat'), elm.webfield('valueAsDate')));
						})
						.datepicker(options)
					;
					
				break;
				
				case 'number':
				
					// convert parameter name differences
					options['format'] = param(options['format'], options['numberformat']);
					options['numberOfDecimals'] = param(options['numberOfDecimals'], options['numberofdecimals'])
					
					elm
						.data('options', options)
						.bind('keypress',function(evt) {
						
							var patternChars = options['format'].replace(/#/gi,'').replace(/0/gi,'');
							var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
							var regexString = '[^0-9__]';
							var code = '';
							var goodChar = false;
							
							if($.browser.msie)
								code = evt.keyCode;
							else
								code = evt.charCode;
							
							var chr = String.fromCharCode(code);
							var str = patternChars.split(''), len = patternChars.length;
						    for (var i = 0; i < len; ++i){
						        if(str[i].charCodeAt(0) == 160)str[i] = ' ';//fix space, it is not a nbsp
						    }
						    patternChars = str.join('');
							
							regexString = new RegExp(regexString.replace('__',patternChars.replace(specials, "\\$&")),'gi');
							if(code != 0 && !chr.match(regexString)){
								goodChar = true;
							}
							
							if(code == 0){//a special key was pressed, like an arrow, let it through
								goodChar = true;
							}
							
							if(!goodChar && !evt.ctrlKey)
								evt.preventDefault();
							
						})
						.bind('blur', function() {
							var patternChars = options['format'].replace(/#/gi,'').replace(/0/gi,'');
							var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
							var regexString = '[^0-9__]';
							
						    regexString = new RegExp(regexString.replace('__',patternChars.replace(specials, "\\$&")),'gi');
							elm.val(elm.val().replace(regexString,''));
							
							elm.val($.format(elm.webfield('valueAsNumber'), options));
						})
					;
					
				break;
				
				case 'select-multiple':
				
					// add Select All/Deselect All
					$('<div class="ui-form-field-select-multiple-controls"><a class="selectAll" href="#">' + $.webform.text.selectMultiple.selectAll + '</a> <a class="deselectAll" href="#">' + $.webform.text.selectMultiple.deselectAll + '</a></div>').insertBefore(elm);
					
					elm.parent()
						.find('a.selectAll').bind('click', function() {
							elm.not(':disabled').find('option').attr('selected', true);
							return false;
						}).end()
						.find('a.deselectAll').bind('click', function() {
							elm.not(':disabled').find('option:selected').attr('selected', false);
							return false;
						});
				
				break;
				
				case 'select-group':
				
					var controls = {};
					elm.find('>div.ui-form-item').each(function(i) {
						switch (i) {
							case 0:
								controls['associated'] = $(this).addClass('ui-form-field-select-group-associated').find('select');
							break;
							case 1:
								controls['buttons'] = $(this).addClass('ui-form-field-select-group-buttons').find('button');
							break;
							case 2:
								controls['available'] = $(this).addClass('ui-form-field-select-group-available').find('select, input');
							break;
						};
					});
					elm.data('controls', controls);
					
					elm.find('button.ui-button-addOptions').bind('click', function() {
						elm.webfield('addOptions');
					});
					elm.find('button.ui-button-addAllOptions').bind('click', function() {
						elm.webfield('addAllOptions');
					});
					elm.find('button.ui-button-removeOptions').bind('click', function() {
						elm.webfield('removeOptions');
					});
					elm.find('button.ui-button-removeAllOptions').bind('click', function() {
						elm.webfield('removeAllOptions');
					});
					elm.find('button.ui-button-moveUp').bind('click', function() {
						elm.webfield('moveUpOptions');
					});
					elm.find('button.ui-button-moveDown').bind('click', function() {
						elm.webfield('moveDownOptions');
					});
					
				break;
				
				case 'textarea':
				case 'richtext':
					
					options['showCount'] = true;
					
					var maxlength = elm.webfield('maxlength');
					
					if (maxlength === undefined || maxlength > 2147483647) {
						maxlength = 2147483647;	// assume nvarchar(max) - 2^31-1 does not calculate properly
						elm.webfield('maxlength', maxlength);
						// don't show characterCount if we defaulted maxlength
						options['showCount'] = false;
					}
					
					if (options['showCount']) {
						elm.webfield('characterCount');
					}
					
					elm
						.bind('keyup', function(evt) {
							if (elm.val().length > maxlength) {
								elm.val(elm.val().substr(0, maxlength));
							}
							if (options['showCount']) {
								elm.webfield('characterCount');
							}
						})
						.bind('keydown', function(evt) {
							if ((elm.val().length >= maxlength && evt.keyCode >= 49) || (elm.val().length >= maxlength && evt.keyCode === 32)) {
								return false;
							}
						})
					;
					
					if (type === "richtext") {
						elm.css({
							position: "absolute"
						});
					}
					
				break;
				
				case 'autocomplete':
					var d = {
						placeholder: $.webform.text.autocomplete.placeholder
					};
					options = $.extend(options, d);
					
					// convert parameter name differences
					options['minLength'] = param(options['minLength'], options['minlength']);
					
					var source = options.source;
					$.extend(options, {
						source: function(request, response){
							// check if term response is cached
							var cache = elm.data('cache') || {};
							var data = cache[request.term];
							if (data) {
								// callback
								response(data);
							}
							else {
								// request for response
								$.getJSON(source, request, function(data){
									// bold the search term in the results menu
									var termRegEx = new RegExp('(' + $.ui.autocomplete.escapeRegex(request.term) + ')', 'i');
									// jQueryUI 1.8.4 made changes where injecting HTML into the label no longer works
									// comment out until we can work around this
									/*$.each(data, function(i, o){
										o['label'] = o['label'].replace(termRegEx, '<strong>$1</strong>');
									});*/
									
									// cache the response
									cache[request.term] = data;
									elm.data('cache', cache);
									
									// callback
									response(data);
								});
							}
						}
						, select: function(evt, ui){
							// update hidden field with id of selected option
							elm.webfield('valueForAutoComplete', ui.item.id);
						}
					});
					
					elm
						.data('options', options)
						.bind('keyup', function(evt){
							var keyCode = $.ui.keyCode;
							if (!(evt.ctrlKey || evt.metaKey ||
								evt.keyCode === keyCode.ALT ||
								evt.keyCode === keyCode.CAPS_LOCK ||
								evt.keyCode === keyCode.COMMAND ||
								evt.keyCode === keyCode.COMMAND_LEFT ||
								evt.keyCode === keyCode.COMMAND_RIGHT ||
								evt.keyCode === keyCode.CONTROL ||
								evt.keyCode === keyCode.DOWN ||
								evt.keyCode === keyCode.END ||
								evt.keyCode === keyCode.ENTER ||
								evt.keyCode === keyCode.ESCAPE ||
								evt.keyCode === keyCode.HOME ||
								evt.keyCode === keyCode.INSERT ||
								evt.keyCode === keyCode.LEFT ||
								evt.keyCode === keyCode.MENU ||
								evt.keyCode === keyCode.NUMPAD_ENTER ||
								evt.keyCode === keyCode.PAGE_DOWN ||
								evt.keyCode === keyCode.PAGE_UP ||
								evt.keyCode === keyCode.RIGHT ||
								evt.keyCode === keyCode.SHIFT ||
								evt.keyCode === keyCode.TAB ||
								evt.keyCode === keyCode.UP ||
								evt.keyCode === keyCode.WINDOWS)
							) {
								// when user modifies input value, update hidden field to blank
								elm.webfield('valueForAutoComplete', '');
							}
						})
						.attr('placeholder', elm.attr('placeholder') || options.placeholder)
						.autocomplete(options)
					;
					
				break;
				
				case 'color':
					
					$.include('/uilib/plugins/jquery/colorpicker/css/colorpicker.css');
					elm.ColorPicker({
						eventName: 'focus',
						onBeforeShow: function(){
							elm.ColorPickerSetColor(elm.val());
						},
						onSubmit: function(hsb, hex, rgb, el){
							$(el).val('#' + hex);
							$(el).ColorPickerHide();
						}
					});
				
				break;
				
				case 'submit':
				
					elm.bind('click', function() {
						var form = $(elm.attr('form'));
						
						var formaction = elm.webfield('formaction');
						if ($.trim(formaction).length) {
							form.attr('action', formaction);
						}
						var formenctype = elm.webfield('formenctype');
						if ($.trim(formenctype).length) {
							form.attr('enctype', formenctype);
						}
						var formmethod = elm.webfield('formmethod');
						if ($.trim(formmethod).length) {
							form.attr('method', formmethod);
						}
						var formtarget = elm.webfield('formtarget');
						if ($.trim(formtarget).length) {
							form.attr('target', formtarget);
						}
						var formnovalidate = elm.webfield('formnovalidate');
						if (formnovalidate) {
							form.data('noValidate', true);
						}
					});
				
				break;
			}
			
			// placeholder attribute
			elm.webfield('placeholder', elm.webfield('placeholder'));
			
			// required attribute
			elm.webfield('required', elm.webfield('required'));
			
			// bind events to field
			elm.bind('blur', function() {
				if ($.ListFindNoCase('radio,checkbox', type)) {
					// if radio/checkbox is part of group, fire the group containers validation instead
					elm.parents('fieldset').webfield('checkValidity');
				}
				else {
					elm.webfield('checkValidity');
				}
			});
			
			// autofocus attribute (should be last)
			if ('autofocus' === elm.attr('autofocus')) {
				elm.trigger('focus');
			}
			
			$.log.tick(startTickCount, logMsg);
		});
	};
	
	$.extend($.fn.webfield, {
		
		// HTML5 attributes
		formaction: function(formaction) {
			if (formaction === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formaction, elm.webfield('type'))) { return; }
				
				return elm.attr('formaction');
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formaction, elm.webfield('type'))) { return; }
				
				if ($.trim(formaction).length) {
					elm.attr('formaction', formaction);
				}
				else {
					elm.removeAttr('formaction');
				}
			});
		},
		formenctype: function(formenctype) {
			if (formenctype === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formenctype, elm.webfield('type'))) { return; }
				
				return elm.attr('formenctype');
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formenctype, elm.webfield('type'))) { return; }
				
				if ($.trim(formenctype).length) {
					elm.attr('formenctype', formenctype);
				}
				else {
					elm.removeAttr('formenctype');
				}
			});
		},
		formmethod: function(formmethod) {
			if (formmethod === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formmethod, elm.webfield('type'))) { return; }
				
				return elm.attr('formmethod');
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formmethod, elm.webfield('type'))) { return; }
				
				if ($.trim(formmethod).length) {
					elm.attr('formmethod', formmethod);
				}
				else {
					elm.removeAttr('formmethod');
				}
			});
		},
		formtarget: function(formtarget) {
			if (formtarget === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formtarget, elm.webfield('type'))) { return; }
				
				return elm.attr('formtarget');
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formtarget, elm.webfield('type'))) { return; }
				
				if ($.trim(formtarget).length) {
					elm.attr('formtarget', formtarget);
				}
				else {
					elm.removeAttr('formtarget');
				}
			});
		},
		formnovalidate: function(formnovalidate) {
			if (formnovalidate === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formnovalidate, elm.webfield('type'))) { return; }
				return (elm.attr('formnovalidate') ? true : false);
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.formnovalidate, elm.webfield('type'))) { return; }
				
				if (formnovalidate) {
					elm.attr('formnovalidate', 'formnovalidate');
				}
				else {
					elm.removeAttr('formnovalidate');
				}
			});
		},
		max: function(max) {
			if (max === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				var type = elm.webfield('type');
				if (!$.ListFindNoCase(attrTypes.max, type)) { return; }
				var logMsg = elm.data('info') + '.max()-getter';
				//$.log.debug(logMsg);
				
				var ret = type === 'select-multiple' ? elm.attr('data-max') : elm.attr('max');
				if (ret !== undefined && !$.IsNumeric(ret)) {
					switch (type) {
						case 'date':
							ret = toNumber(toDate(ret));
						break;
						case 'number':
						case 'select-multiple':
							ret = toNumber(ret);
						break;
					}
					// save the result so we don't have to parse next time
					//$.log.warn(ret);
					elm.webfield('max', ret);
				}
				return ret;
			}
			max = toNumber(max);
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.max, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.max()-setter';
				//$.log.debug(logMsg);
				
				if ($.IsNumeric(max)){
					elm.attr('select-multiple' ? 'data-max' : 'max', max);
				}
				else {
					elm.removeAttr('select-multiple' ? 'data-max' : 'max');
				}
			});
		}
		, maxlength: function(maxlength) {
			if (maxlength === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.maxlength, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.maxlength()-getter';
				//$.log.debug(logMsg);
				
				var ret = toNumber(elm.get(0).getAttribute('maxlength'));
				if (ret !== undefined && !$.IsNumeric(ret)) {
					// save the result so we don't have to parse next time
					//$.log.warn(ret);
					elm.webfield('maxlength', ret);
				}
				return ret;
			}
			maxlength = toNumber(maxlength);
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.maxlength, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.maxlength()-setter';
				//$.log.debug(logMsg);
				
				if ($.IsNumeric(maxlength)){
					elm.get(0).setAttribute('maxlength', maxlength);
				}
				else {
					elm.get(0).removeAttribute('maxlength');
				}
			});
		}
		, min: function(min) {
			if (min === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				var type = elm.webfield('type');
				if (!$.ListFindNoCase(attrTypes.min, type)) { return; }
				var logMsg = elm.data('info') + '.min()-getter';
				//$.log.debug(logMsg);
			
				var ret = type === 'select-multiple' ? elm.attr('data-min') : elm.attr('min');
				if (typeof ret !== 'undefined' && !$.IsNumeric(ret)) {
					switch (type) {
						case 'date':
							ret = toNumber(toDate(ret));
						break;
						case 'number':
						case 'select-multiple':
							ret = toNumber(ret);
						break;
					}
					// save the result so we don't have to parse next time
					elm.webfield('min', ret);
				}
				return ret;
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.min, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.min()-setter';
				//$.log.debug(logMsg);
				
				if ($.IsNumeric(min)){
					elm.attr('select-multiple' ? 'data-min' : 'min', min);
				}
				else {
					elm.removeAttr('select-multiple' ? 'data-min' : 'min');
				}
			});
		}
		, minlength: function(minlength) {
			if (minlength === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.minlength, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.minlength()-getter';
				//$.log.debug(logMsg);
				
				var ret = toNumber(elm.attr('data-minlength'));
				if (ret !== undefined && !$.IsNumeric(ret)) {
					// save the result so we don't have to parse next time
					//$.log.warn(ret);
					elm.webfield('minlength', ret);
				}
				return ret;
			}
			minlength = toNumber(minlength);
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.minlength, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.minlength()-setter';
				//$.log.debug(logMsg);
				
				if ($.IsNumeric(minlength)){
					elm.get(0).attr('data-minlength', minlength);
				}
				else {
					elm.get(0).removeAttr('data-minlength');
				}
			});
		}
		, pattern: function(pattern) {
			if (pattern === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.pattern, elm.webfield('type'))) { return; }
				
				return elm.attr('pattern');
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.pattern, elm.webfield('type'))) { return; }
				
				if ($.trim(pattern).length) {
					elm.attr('pattern', pattern);
				}
				else {
					elm.removeAttr('pattern');
				}
			});
		}
		, placeholder: function(placeholder) {
			if (placeholder === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.placeholder, elm.webfield('type'))) { return; }
				
				return elm.attr('placeholder');
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.placeholder, elm.webfield('type'))) { return; }
				
				// mimic placeholder if browser does not support it
				if (!isPlaceholderSupported()) {
					var container = elm.parents('div.ui-form-field');
					if ($.trim(placeholder).length) {
					
						var placeholderEl = $('<small class="ui-form-field-attr-placeholder">' + placeholder + '</small>').prependTo(container).bind('click', function(evt){
							elm.trigger('focus');
						});
						
						elm.bind('focus.placeholder blur.placeholder', function(evt){
							elm.webfield('togglePlaceHolder', evt.type);
						}).webfield('togglePlaceHolder', 'blur');
						
					}
					else {
						elm.removeAttr('placeholder').unbind('focus.placeholder blur.placeholder');
						container.find('small.ui-form-field-attr-placeholder').remove();
					}
				}
				elm.attr('placeholder', placeholder);
			});
		}
		, required: function(required) {
			function requiredAttr(elm){
				return $.ListFindNoCase('checkbox-group,radio-group', elm.webfield('type')) ? 'data-required' : 'required';
			}
			if (required === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.required, elm.webfield('type'))) { return; }
				return (elm.attr(requiredAttr(elm)) ? true : false);
			}
			return this.each(function() {
				//console.log(this);
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.required, elm.webfield('type'))) { return; }
				
				var labelElm = $root.find('label[for=' + elm.attr('id') + ']');
				var requiredEl = labelElm.parent().find('strong');
				if (required) {
					elm.attr(requiredAttr(elm), 'required');
					if (!requiredEl.length) {
						$('<strong title="' + $.webform.text.requiredFieldText + '">*</strong>').insertAfter(labelElm);
					}
				}
				else {
					elm.removeAttr(requiredAttr(elm));
					requiredEl.remove();
				}
			});
		}
		, step: function(step) {
			if (step === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.step, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.step()-getter';
				//$.log.debug(logMsg);
				
				var ret = toPositiveNumber(elm.attr('step'));
				if (ret === undefined || ret < 0) {
					ret = 1;	// default to 1
				}
				// save the result so we don't have to parse next time
				//$.log.warn(ret);
				elm.webfield('step', ret);
				return ret;
			}
			step = toPositiveNumber(step);
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.step, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.step()-setter';
				//$.log.debug(logMsg);
				
				if ($.IsNumeric(step)){
					elm.attr('step', step);
				}
				else {
					elm.removeAttr('step');
				}
			});
		}
		, type: function() {
			var elm = $(this[0]);
			if (!elm.data('webfield')) { return; }
			var type = elm.data('webfield-type');
			if (!type) {
				type = elm.attr('data-type');
				if (type === undefined) {
					type = elm.get(0).getAttribute('type') || elm.attr('type') || 'text';
				}
				// cache 'type' to data object for quicker subsequent requests
				elm.data('webfield-type', type);
			}
			return type;
		}
		
		/* HTML5 Methods */
		, checkValidity: function() {
			var startTickCount = $.getTickCount();
			var elm = $(this[0]);
			if (!elm.data('webfield')) { return; }
			var logMsg = elm.data('info') + '.checkValidity()';
			//$.log.debug(logMsg);

			// parameters
			var validity = {
				valid: true
				, valueMissing: false
				, typeMismatch: false
				, patternMismatch: false
				, tooShort: false
				, tooLong: false
				, rangeUnderflow: false
				, rangeOverflow: false
				, stepMismatch: false
				, customError: false
			};

			var type = elm.webfield('type');
			var value = elm.val();
			if ('checkbox-group' === type) {
				value = elm.find('input[type=checkbox]:checked'); // ??? TODO: need to test; w/ multiples, this will be an array ???
			}
			else if ('radio-group' === type) {
				value = elm.find('input[type=radio]:checked').val();
			}
			else if (elm.hasClass('ui-autocomplete-input')) {
				value = $root.find('input[type=hidden]#' + elm.attr('id').replace('_label', '')).val();
			}
			if (value === undefined || value === null) {
				value = '';
			}
			
			// verify field can be validated
			var willValidate = elm.webfield('willValidate');

			// ensure the field can be validated
			if (willValidate) {
				// valueMissing
				if (elm.webfield('required') && $.ListFindNoCase(attrTypes.required, type)) {
					switch (type) {
						case "select-one":
							/* select-one must have selectedIndex greater than 0 in order to validate */
							if (!elm.attr('selectedIndex')) {
								validity.valueMissing = true;
							}
							break;
						default:
							if (!value.length) {
								validity.valueMissing = true;
							}
							break;
					}
				}
				
				// must exist outside value.length condition in case hidden value is blank
				if ('autocomplete' === type) {
					// if textinput has value but hidden field does not, this is invalid
					if ($.trim(elm.val()).length && !value.length) {
						validity.typeMismatch = true;
					}
				}
				
				// only verify remaining validation if there is a value
				if (value.length) {
					
					// typeMismatch
					switch (type) {
						case 'email':
							if (!$.webform.regex.email.test(value)) {
								validity.typeMismatch = true;
							}
						break;
						case 'url':
							if (!$.webform.regex.url.test(value)) {
								validity.typeMismatch = true;
							}
						break;
						/* use pattern attribute for telephone number
						case 'tel':
							if (!$.webform.regex.tel.test(value)) {
								validity.typeMismatch = true;
							}
						break;*/
						case 'date':
							if (elm.webfield('valueAsDate') === null) {
								validity.typeMismatch = true;
							}
						break;
						case 'number':
							if (elm.webfield('valueAsNumber') === null) {
								validity.typeMismatch = true;
							}
						break;
					}
					
					// patternMismatch
					var pattern = elm.webfield('pattern');
					if (pattern && $.ListFindNoCase(attrTypes.pattern, type)) {
						var regex = new RegExp('^(?:' + pattern + ')$');
						if (!regex.test(value)) {
							validity.patternMismatch = true;
						}
					}
					
					// tooShort
					var minlength = elm.webfield('minlength');
					if (minlength && $.ListFindNoCase(attrTypes.minlength, type)) {
						if (value.length < minlength) {
							validity.tooShort = true;
						}
					}
					
					// tooLong
					var maxlength = elm.webfield('maxlength');
					if (maxlength && $.ListFindNoCase(attrTypes.maxlength, type)) {
						if (value.length > maxlength) {
							validity.tooLong = true;
						}
					}
					
					// rangeUnderflow
					var min = elm.webfield('min');
					if (min && $.ListFindNoCase(attrTypes.min, type)) {
						switch(type) {
							case 'date':
								if ($.DateDiff('d', toDate(min), elm.webfield('valueAsDate')) < 0) {
									validity.rangeUnderflow = true;
								}
							break;
							case 'number':
								if (elm.webfield('valueAsNumber') < min) {
									validity.rangeUnderflow = true;
								}
							break;
							case 'select-multiple':
								if (value.length < min) {
									validity.rangeUnderflow = true;
								}
							break;
						}
					}
					
					// rangeOverflow
					var max = elm.webfield('max');
					if (max && $.ListFindNoCase(attrTypes.max, type)) {
						switch(type) {
							case 'date':
								if ($.DateDiff('d', elm.webfield('valueAsDate'), toDate(max)) < 0) {
									validity.rangeOverflow = true;
								}
							break;
							case 'number':
								if (elm.webfield('valueAsNumber') > max) {
									validity.rangeOverflow = true;
								}
							break;
							case 'select-multiple':
								if (value.length > max) {
									validity.rangeOverflow = true;
								}
							break;
						}
					}
					
					// stepMismatch
					var step = elm.webfield('step');
					if (step && $.ListFindNoCase(attrTypes.step, type)) {
						/* TODO: implement step
						switch (type) {
							case 'date':
								
							break;
							case 'number':
								var stepOffset = value % step;
								stepOffset = stepOffset !== min ? step - stepOffset : step;
								$.log.warn(stepOffset);
							break;
						}*/
					}
					
				}
				
			}
			
			// do not process this for fields inside of a group
			if (!elm.webfield('isInGroup')) {
				
				// customError
				var customValidityMessage = elm.data('customValidityMessage');
				if (customValidityMessage && $.trim(customValidityMessage).length) {
					validity.customError = true;
				}
				
				validity.valid = (!validity.valueMissing && !validity.typeMismatch && !validity.patternMismatch && !validity.tooShort && !validity.tooLong && !validity.rangeUnderflow && !validity.rangeOverflow && !validity.stepMismatch && !validity.customError);
				
				if (validity.valid) {
					elm.data('validationMessage', '');
				}
				else {
					var formLang = $(elm.attr('form')).attr('lang');
					var validationMessages = elm.data('validationMessages');
					
					// NOTE: convertHTMLEntity() needed for IE8- to convert HTML entities to character
					if (validity.valueMissing) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.valueMissing || $.webform.text.validationMessages.valueMissing));
					}
					else if (validity.typeMismatch) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.typeMismatch || $.webform.text.validationMessages.typeMismatch));
					}
					else if (validity.patternMismatch) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.patternMismatch || $.webform.text.validationMessages.patternMismatch));
					}
					else if (validity.tooShort) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.tooShort || $.webform.text.validationMessages.tooShort));
					}
					else if (validity.tooLong) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.tooLong || $.webform.text.validationMessages.tooLong));
					}
					else if (validity.rangeUnderflow) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.rangeUnderflow || $.webform.text.validationMessages.rangeUnderflow));
					}
					else if (validity.rangeOverflow) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.rangeOverflow || $.webform.text.validationMessages.rangeOverflow));
					}
					else if (validity.stepMismatch) {
						elm.data('validationMessage', convertHTMLEntity(validationMessages.stepMismatch || $.webform.text.validationMessages.stepMismatch));
					}
					else if (validity.customError) {
						elm.data('validationMessage', convertHTMLEntity(elm.data('customValidityMessage')));
					}
				}
				
				// set error styling to the label/field
				var formItem = elm.parents('div.ui-form-item');
				var alertIcon = formItem.find('span.ui-icon-alert');
				if (validity.valid) {
					elm.removeClass('ui-state-error');
					formItem.removeClass('ui-state-error').removeAttr('title');
					alertIcon.remove();
				}
				else {
					if (!$.ListFindNoCase('checkbox-group,radio-group', type)) {
						elm.addClass('ui-state-error');
					}
					formItem.attr('title', elm.data('validationMessage'));
					formItem.addClass('ui-state-error');
					if (!alertIcon.length) {
						formItem.find('label[for=' + elm.attr('id') + ']').before('<span class="ui-icon ui-icon-alert"></span>');
					}
				}
				
				// save validity to data scope
				elm.data('validity', validity);
			}
		
			$.log.tick(startTickCount, logMsg);
			return validity.valid;
		}
		, setCustomValidity: function(message) {
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				
				elm.data('customValidityMessage', message);
			});
		}
		, stepUp: function(n) {
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				var type = elm.webfield('type');
				if (!$.ListFindNoCase(attrTypes.stepUp, type)) { return; }
				var logMsg = elm.data('info') + '.stepUp()';
				//$.log.debug(logMsg);
				
				var options = elm.data('options');
				var step = elm.webfield('step');
				var min = elm.webfield('min');
				var max = elm.webfield('max');
				switch (type) {
					case 'date':
					break;
					case 'number':
						var v = toNumber($.parse(elm.val(), options));
						/* TODO: implement step
						var stepOffset = v % step;
						step = stepOffset !== min ? step - stepOffset : step; */
						if (!$.IsNumeric(max) || v < max) {
							v += 1; //step;
						}
						elm.val($.format(verifyInRange(v, min, max), options));
					break;
				}
			});
		}
		, stepDown: function(n) {
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				var type = elm.webfield('type');
				if (!$.ListFindNoCase(attrTypes.stepDown, type)) { return; }
				var logMsg = elm.data('info') + '.stepDown()';
				//$.log.debug(logMsg);
				
				var options = elm.data('options');
				var step = elm.webfield('step');
				var min = elm.webfield('min');
				var max = elm.webfield('max');
				switch (type) {
					case 'date':
					break;
					case 'number':
						var v = toNumber($.parse(elm.val(), options));
						/* TODO: implement step
						var stepOffset = v % step;
						step = stepOffset !== min ? step - stepOffset : step; */
						if (!$.IsNumeric(min) || v > min) {
							v -= 1;//step;
						}
						elm.val($.format(verifyInRange(v, min, max), options));
					break;
				}
			});
		}
		
		/* HTML5 Properties implemented as Methods */
		, validationMessage: function() {
			var elm = $(this[0]);
			if (!elm.data('webfield')) { return; }
			return elm.data('validationMessage');
		}
		, valueAsDate: function() {
			var elm = $(this[0]);
			if (!elm.data('webfield')) { return; }
			
			var type = elm.webfield('type');
			if (elm.hasClass("ui-form-field-date")) {
				type = "date";
			}
			if (!$.ListFindNoCase(attrTypes.valueAsDate, type)) { return; }
			
			try {
				return $.datepicker.parseDate(elm.datepicker('option', 'dateFormat'), elm.val());
			}
			catch(e) {
				// if not valid date, return null
				return null;
			}
		}
		, valueAsNumber: function() {
			var elm = $(this[0]);
			if (!elm.data('webfield')) { return; }
			
			var type = elm.webfield('type');
			if (elm.hasClass("ui-form-field-date")) {
				type = "date";
			}
			else if (elm.hasClass("ui-form-field-number")) {
				type = "number";
			}
			if (!$.ListFindNoCase(attrTypes.valueAsNumber, type)) { return; }
			
			try {
				if ('number' === type) {
					return $.parse(elm.val(), elm.data('options'));
				}
				else if ('date' === type) {
					return elm.webfield('valueAsDate').getTime();
				}
			}
			catch (e) {
				// if not valid number, return null
				return null;
			}
		}
		, willValidate: function() {
			var elm = $(this[0]);
			if (!elm.data('webfield')) { return; }
			var type = elm.webfield('type');
			
			var ret = true;

			// hidden, readonly, and disabled fields cannot be validated
			if ('hidden' === type || 'readonly' === elm.attr('readonly') || elm.filter(':hidden').length || elm.filter(':disabled').length) {
				ret = false;
			}
			
			// above code always returns false for RTE fields
			// special case for RTE: look for TinyMCE element to see if its visible
			if ($.isFunction(elm.tinymce) && elm.filter(':tinymce').length && elm.next().filter(':visible').length) {
				ret = true;
			}

			// fields part of group should not be validated as the group itself gets validated
			if ($.ListFindNoCase(attrTypes.isInGroup, type)) {
				ret = !elm.webfield('isInGroup');
			}
			
			return ret;
		}
		
		// custom methods
		, characterCount: function() {
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.characterCount, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.characterCount()';
				//$.log.debug(logMsg);
				
				var id = elm.attr('id');
				var countId = id + '_characterCount';
				var countEl = $root.find('span#' + countId);
				var maxlength = elm.webfield('maxlength');
				if (!countEl.length) {
					$('<div class="ui-form-field-extra-characterCount"><span id="' + countId + '"></span> / <span id="' + id + '_maxlength">' + $.format(maxlength, $.format.defaults) + '</span></div>').insertBefore(elm);
					countEl = $root.find('span#' + countId);
				}
				var len = elm.val().length;
				countEl.text($.format(len, $.format.defaults));
				if (len > maxlength) {
					countEl.addClass('ui-state-error');
				}
				else {
					countEl.removeClass('ui-state-error');
				}
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		, label: function(label) {
			if (label === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.label, elm.webfield('type'))) { return; }
				
				return $.trim(elm.parents('label').find('span').text());
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.label, elm.webfield('type'))) { return; }
				
				elm.parents('label').find('span').text(label);
			});
		}
		, togglePlaceHolder: function(action) {
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.placeholder, elm.webfield('type'))) { return; }
				
				var placeholderEl = elm.parents('div.ui-form-field').find('small.ui-form-field-attr-placeholder');
				
				if ('focus' === action) {
					placeholderEl.hide();
				}
				else if ('blur' === action) {
					if (!elm.val().length) {
						placeholderEl.show();
					}
					else {
						placeholderEl.hide();
					}
				}
			});
		}
		, valueForAutoComplete: function(value){
			if (value === undefined) {
				var elm = $(this[0]);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.valueForAutoComplete, elm.webfield('type'))) { return; }
				
				return $root.find('input#' + elm.attr('id').replace('_label', '')).val();
			}
			return this.each(function() {
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.valueForAutoComplete, elm.webfield('type'))) { return; }
				
				$root.find('input#' + elm.attr('id').replace('_label', '')).val(value);
			});
		}
		
		/* select methods */
		
		, moveUp: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.moveUp()';
				$.log.debug(logMsg);
				
				$.each(elm.find('option:selected'), function() {
					var option = $(this);
					option.prev().before(option);
				});
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		, moveDown: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.moveDown()';
				$.log.debug(logMsg);
				
				$.each(elm.find('option:selected').get().reverse(), function() {
					var option = $(this);
					option.next().after(option);
				});
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		, selectAll: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.selectAll()';
				$.log.debug(logMsg);
				
				elm.find('option').attr('selected', true);
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		, unselectAll: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.selectAll()';
				$.log.debug(logMsg);
				
				elm.find('option').removeAttr('selected');
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		
		/* select-group controls */
		
		, addOptions: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectGroupMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.addOptions()';
				$.log.debug(logMsg);
				
				var controls = elm.data('controls');
				
				if (controls['available'].webfield('type').indexOf('select') > -1) {
					controls['available'].find('option:selected').each(function(){
						controls['associated'].append(this);
					});
				}
				else {
					var value = $.trim(controls['available'].val());
					if (value.length) {
						controls['associated'].append('<option value="' + value + '">' + value + '</option>');
						controls['available'].val('');
					}
				}
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		, addAllOptions: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectGroupMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.addAllOptions()';
				$.log.debug(logMsg);
				
				elm.data('controls')['available'].webfield('selectAll')
				elm.webfield('addOptions');
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		, removeOptions: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectGroupMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.removeOptions()';
				$.log.debug(logMsg);
				
				var controls = elm.data('controls');
				
				controls['associated'].find('option:selected').each(function() {
					if (controls['available'].webfield('type').indexOf('select') > -1) {
						controls['available'].append(this);
					}
					else {
						$(this).remove();
					}
				});
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		, removeAllOptions: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectGroupMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.removeAllOptions()';
				$.log.debug(logMsg);
				
				elm.data('controls')['associated'].webfield('selectAll')
				elm.webfield('removeOptions');
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		
		, moveUpOptions: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectGroupMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.moveUpOptions()';
				$.log.debug(logMsg);
				
				elm.data('controls')['associated'].webfield('moveUp');
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		
		, moveDownOptions: function(){
			return this.each(function() {
				var startTickCount = $.getTickCount();
				var elm = $(this);
				if (!elm.data('webfield')) { return; }
				if (!$.ListFindNoCase(attrTypes.selectGroupMethods, elm.webfield('type'))) { return; }
				var logMsg = elm.data('info') + '.moveDownOptions()';
				$.log.debug(logMsg);
				
				elm.data('controls')['associated'].webfield('moveDown');
				
				$.log.tick(startTickCount, logMsg);
			});
		}
		
		, isInGroup: function() {
			var elm = $(this[0]);
			if (!elm.data('webfield')) { return; }
			var type = elm.webfield('type');
			if (!$.ListFindNoCase(attrTypes.isInGroup, type)) { return; }
			
			// radios contained within radio-group
			if ($.ListFindNoCase('radio', type) && elm.parents('fieldset.ui-form-field-radio-group').length) {
				return true;
			}
			// checkboxes contained within checkbox-group
			else if ($.ListFindNoCase('checkbox', type) && elm.parents('fieldset.ui-form-field-checkbox-group').length) {
				return true;
			}
			return false;
		}

	});
	
})(jQuery); 


// document is ready to be manipulated
jQuery(function() {

	// only enable this when debugging
	//$.log.level = 'debug';
	
	var $root = $(document);
	
	var countryLocales = ["en-GB","fr-CA","nl-BE","pt-BR","zh-CN"];
	var unsupportedLocales = ["zh"];
	var localeCode = $(document.documentElement).attr('lang') || $('form.ui-form').attr('lang') || "en";
	var lang = localeCode;
	if ($.inArray(localeCode, countryLocales) === -1) {
		lang = localeCode.substr(0,2);
	}
	if ($.inArray(lang, unsupportedLocales) > -1) {
		lang = localeCode;
	}
	
	var c = [
		/* http://jqueryui.com/demos/button/ */
		{
			'class': 'button',
			selector: 'button.ui-btn, a.ui-btn'
		},
		/* MenuButton plugin - developed in-house */
		{
			'class': 'uiLibButton',
			selector: 'button.ui-menubtn, a.ui-menubtn'
		},
		/* undocumented feature of jQueryUI */
		{// NOTE: this must exist AFTER the MenuButton plugin to avoid dup instantiation
			'class': 'menu',
			selector: 'ul.ui-menu:not(.ui-menu-of-button)'
		},
		/* http://jqueryui.com/demos/tabs/ */
		{
			'class': 'tabs',
			selector: 'div.ui-tabs',
			defaults: {
				ajaxOptions: {
					cache: false
				},
				cookie: {
					path: '/'
				},
				load: function(evt, ui){
					// initializes UILib components on AJAX content
					$.UILib(ui.panel);
				}
			}
		},
		/* http://jqueryui.com/demos/accordion/ */
		{
			'class': 'accordion',
			selector: 'div.ui-accordion',
			mappings: {
				autoHeight: 'autoheight'
			}
		},
		/* Table plugin - developed in-house */
		{
			'class': 'uiLibTable',
			selector: 'table.ui-table'
		},
		/*{
			'class': 'colorSelector',
			selector: 'div.ui-colorselector'
		},*/
		/* WebForm plugins - developed in-house */
		{
			'class': 'webform',
			selector: 'form.ui-form'
		},
		/* WebField plugins - developed in-house */
		{
			'class': 'webfield',
			selector: $.webform.getFields
		},
		/* http://rateit.codeplex.com/ */
		{
			'class': 'uiLibRating',
			requires: [
				'/uilib/plugins/rateit/rateit.css',
				'/uilib/plugins/rateit/jquery.rateit.min.js'
			],
			selector: 'div.ui-rating'
		},
		/* */
		{
			'class': 'uiLibDataGrid',
			requires: [
				'/uilib/plugins/jquery/ui.multiselect.css',
				'/uilib/plugins/jquery/jqgrid/3.7.1/ui.jqgrid.css',
				'/uilib/plugins/jquery/jqgrid/3.7.1/i18n/grid.locale-en.js',
				'/uilib/plugins/jquery/jqgrid/3.7.1/jquery.jqGrid.min.js'
				// uncompressed files - must be in this order
				// if needed, comment out the above .min file and uncomment these
				/*
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.base.js', // jqGrid base
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.common.js', // jqGrid common for editing
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.formedit.js', // jqGrid Form editing
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.inlinedit.js', // jqGrid inline editing
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.celledit.js', // jqGrid cell editing
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.subgrid.js', //jqGrid subgrid
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.treegrid.js', //jqGrid treegrid
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.custom.js', //jqGrid custom 
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.postext.js', //jqGrid postext
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.tbltogrid.js', //jqGrid table to grid 
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.setcolumns.js', //jqGrid setcolumns
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/grid.import.js', //jqGrid import
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/jquery.fmatter.js', //jqGrid formater
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/JsonXml.js', //xmljson utils
					'/uilib/plugins/jquery/jqgrid/3.7.1/src/jquery.searchFilter.js' // search Plugin
				*/
			],
			selector: 'table.ui-datagrid',
			defaults: {
				autoencode: true,
				autowidth: true,
				beforeRequest: function(){
					$(this).trigger('beforeRequest');
				},
				gridview: true,
				jsonReader: {repeatitems:false},
				loadui: 'block',
				shrinkToFit: false,
				viewrecords: true
			},
			assetsLoad: function() {
				// Custom jqGrid Column Formatters
				// NOTE: formatters must always return a string
				
				// @override - showlink formatter
				$.fn.fmatter.showlink = function(cellval, opts, rowdata) {
					var op = {baseLinkUrl: opts.baseLinkUrl,showAction:opts.showAction, addParam: opts.addParam || "", target: opts.target, idName: opts.idName, idColumn: opts.idColumn },
					target = "", idUrl;
					if(!isUndefined(opts.colModel.formatoptions)) {
						op = $.extend({},op,opts.colModel.formatoptions);
					}
					if(op.target) {target = 'target=' + op.target;}
					idValue = opts.rowId;
					if (op.idColumn) {idValue = rowdata[op.idColumn];}
					idUrl = op.baseLinkUrl+op.showAction + '?'+ op.idName+'='+idValue+op.addParam;
			        if(isString(cellval)) {	//add this one even if its blank string
						return "<a "+target+" href=\"" + idUrl + "\">" + cellval + "</a>";
			        }else {
						return $.fn.fmatter.defaultFormat(cellval,opts);
				    }
			    };
				
				// bit formatter - convert JSON true/false to Yes/No
				$.fn.fmatter.bit = function(cellval, opts, rowdata){
					if (cellval === true || cellval === 'true' || cellval === 1) {
						return 'Yes';
					}
					else if (cellval === false || cellval === 'false' || cellval === 0) {
						return 'No';
					}
					return '';
				};
			},
			mappings: {
				colModel: 'colmodel',
				jsonReader: 'jsonreader',
				resultSetCode: 'resultsetcode',
				rowList: 'rowlist',
				rowNum: 'rownum'
			}
		}/*,
		 http://wiki.moxiecode.com/index.php/TinyMCE:JQuery_Plugin_reference 
		{
			'class': 'tinymce',
			requires: [
						'//tinymce.cachefly.net/4.1/tinymce.min.js',
						'//tinymce.cachefly.net/4.1/jquery.tinymce.min.js'
					],
			selector: 'textarea.ui-form-field-richtext'
		}*/
	];

	
	$.UILib = function(obj) {
		var $root = $(obj || document);
		var logMsg = '$.UILib()';
		//$.log.debug(logMsg);

		$(document.body).ajaxIndicator();

		$.each(c, function(i, cp) {
			var startTickCount = $.getTickCount();
			var com = cp['class'], elms = [], assetsLoad = cp['assetsLoad'], load = cp['load'];
			if ($.isFunction(cp.selector)) {
				elms = cp.selector($root);
			}
			else {
				elms = $root.find(cp.selector);
			}
			
			if (elms.length) {
				var onAssetsLoad = function() {
					var startTickCount = $.getTickCount();
					var logMsg = '$.' + com + '() component loaded [' + elms.length + ']';
					$.log.debug(logMsg);
					
					if ($.isFunction(assetsLoad)) {
						assetsLoad();
					}
					
					elms.each(function(j, el) {
						var e = $(el), id = e.attr('id'), o = $.extend({}, cp.defaults, o, e.metadata({type: 'html5'}));
						for (var k in cp.mappings) {
							var value = o[cp.mappings[k]];
							if (typeof value !== 'undefined') {
								o[k] = value;
								delete (o[cp.mappings[k]]);
							}
						}
						if (id && $.trim(id)) {
							o.id = id + com;
						}
						var component = e[com](o);
						if ($.isFunction(load)) {
							load.apply(this, [component, o]);
						}
					});
					
					$.log.tick(startTickCount, logMsg);
				};
				if (cp.requires) {
					$.include(cp.requires, onAssetsLoad);
				}
				else {
					onAssetsLoad();
				}
			}
			
			$.log.tick(startTickCount, logMsg);
		});
	};
	
	$.include("/uilib/assets/scripts/uilib-" + lang + ".js", $.UILib);

});