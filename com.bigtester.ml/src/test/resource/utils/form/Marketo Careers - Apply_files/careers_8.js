/*
* COPYRIGHT 2011 Jobvite, Inc. All rights reserved. This copyright notice is Copyright Management 
* Information under 17 USC 1202 and is included to protect this work and deter copyright infringement.  
* Removal or alteration of this Copyright Management Information without the express written permission 
* of Jobvite, Inc. is prohibited, and any such unauthorized removal or alteration will be a violation of 
* federal law.
*/
﻿var OverlayDialogDefaultWidth = 470;
var jvrecipientindex = 1;
var jvbaseurl = 'http://www.jobvite.com/'
var jvurlargs = '';
var jvurlargsclean = '';
var OverlayDialogInstance = null;
var OverlayDialogInstanceMove = null;
var OverlayDialogInstances = 1;
var _x = 0;
var _y = 0;
//if (window.Event)
//{
//	try
//	{
//		document.captureEvents(Event.MOUSEMOVE);
//	}
//	catch (e)
//	{
//	}
//}
document.onmousemove = mouseMove;
function mouseMove(e)
{
	var scrollLeft = document.documentElement.scrollLeft;
	if (!scrollLeft && document.body)
		scrollLeft = document.body.scrollLeft;
	var scrollTop = document.documentElement.scrollTop;
	if (!scrollTop && document.body)
		scrollTop = document.body.scrollTop;
	_x = (!window.event) ? e.pageX - scrollLeft : event.clientX;
	_y = (!window.event) ? e.pageY - scrollTop : event.clientY;
	if (OverlayDialogInstanceMove)
		OverlayDialogInstanceMove.mouseMove(e);
}
function track()
{
	var o = document.getElementById('TrackingData');
	if (o)
		o.value = o.value - 0 + 1;
}
function jvsubmit()
{
	var o = document.getElementById('jvform');
	if (o)
		o.submit();
	
}
function OverlayDialogStartMove(e)
{
	var o = (!window.event && e ? e.target : event.srcElement);
	while (o && !o._dialog)
		o = o.parentNode;
	if (o)
	{
		OverlayDialogInstanceMove = o._dialog;
		return OverlayDialogInstanceMove.startMove(e);
	}
}
function OverlayDialogEndMove(e)
{
	if (OverlayDialogInstanceMove)
	{
		var result = OverlayDialogInstanceMove.endMove(e);
		OverlayDialogInstanceMove = null;
		return result;
	}
}
OverlayDialog = function(title, content, center) 
{ 
	this._title = title;
	this._width = OverlayDialogDefaultWidth;
	this._content = (content ? content : '');
	this._buttonTitle = new Array();
	this._buttonFunction = new Array();
	this._firstTextInput = '';
	this._overlayname = '';
	this._object = null;
	this._offsetx = 0;
	this._offsety = 0;
	this._overlayx = 0;
	this._overlayy = 0;
	this._overlaytablex = 0;
	this._overlaytabley = 0;
	this._overlaysaveonresize = 0;
	this._overlayDisabled = null;
	this._overlayDisabled2 = null;
	this._overlayDoDisable = null;
	this._savedDialog = null;
	this._remove = true;
	this._defaultFunction = null;
	this._closeFunction = null;
	this._center = center == true;
	this._display = false;
	this._disableBackground = true;
	this._isMoving = false;
	this._id = 'overlaydialog' + OverlayDialogInstances++;
	this._bdSize=2;
	this._bdCol='#c6c6c6';
	this._tbdCol='#8c8c8c';
	this._tfntCol='#ffffff';
}
OverlayDialog.prototype = 
{
	get_title : function()
	{
		return this._title;
	},
	set_title : function(value)
	{
		this._title = value;
	},
	set_center : function(value)
	{
		this._center = value;
	},
	get_width : function()
	{
		return this._width;
	},
	set_width : function(value)
	{
		this._width = value;
	},
	set_object : function(value)
	{
		this._object = value;
	},
	set_offsetx : function(value)
	{
		this._offsetx = value;
	},
	set_offsety : function(value)
	{
		this._offsety = value;
	},
	set_defaultFunction : function(value)
	{
		this._defaultFunction = value;
	},
	set_closeFunction : function(value)
	{
		this._closeFunction = value;
	},
	set_disableBackground : function(value)
	{
		this._disableBackground = value;
	},
	addRow : function(row)
	{
		this._content += row;
	},
	addRowSpace : function()
	{
		this._content += '<div class="jvrowspace"></div>';
	},
	addRowDots : function()
	{
		this._content += '<hr class="jvhr" />';
	},
	displayAt : function(o, offsetx, offsety)
	{
		this._object = o;
		this._offsetx = offsetx;
		this._offsety = offsety;
		display();
	},
	display : function(o)
	{
		this._object = o;
		var defaultFunction = this._defaultFunction;
		var closeFunction = this._closeFunction;
		if (defaultFunction == null)
			defaultFunction = this._buttonFunction[this._buttonFunction.length - 1];
		if (defaultFunction == null)
			defaultFunction = 'if (OverlayDialogInstance) OverlayDialogInstance.close()';
		if (closeFunction == null)
			closeFunction = 'OverlayDialogInstance.close()';
		var s ='<form onsubmit="' + defaultFunction + '; return false;"><div class="jvdlgborder1" style="float: left"><div class="jvdlgborder2" style="width: ' + this._width + 'px;"><div id="' + this._id + 'Move" style="cursor: move;" class="jvdlgtitle"><table cellspacing="0" cellpadding="0" width="100%"><tr><td class="jvdlgtitle">' + this._title + '</td><td align="right" style="width: 26px; padding-right: 10px;" class="jvdlgtitle"><img style="background-color: Red;" src="' + jvbaseurl + 'images2/dialog-close-gray.gif" onclick="' + closeFunction + '" style="cursor: pointer" title="Close dialog" border="0" width="16" height="16"></td></tr></table></div><div class="jvdlgborder3 jvdlgtext" style="text-align: Left;">' + this._content + '</div></div></div></form>';
		this.displayContent(s);
		var o = document.getElementById(this._id + 'Move');
		if (o)
		{
			o.onmousedown = OverlayDialogStartMove;
			o.onmouseup = OverlayDialogEndMove;
		}
	},
	displayContent : function(s)
	{
		this._savedDialog = OverlayDialogInstance;
		if (this._savedDialog)
			document.getElementById(this._savedDialog._id).style.display = 'none';
		OverlayDialogInstance = this;
		var e = document.createElement('div');
		e._dialog = this;
		e.innerHTML = s;
		e.id = this._id;
		e.className = 'jvpopupcss';
		document.body.appendChild(e);
		this.overlayOpen(this._id, this._object, this._offsetx, this._offsety);
		if (this._firstTextInput.length != 0)
			document.getElementById(this._firstTextInput).focus();
	},
	displayObject : function(id)
	{
		this._id = id;
		this._savedDialog = OverlayDialogInstance;
		if (this._savedDialog)
			document.getElementById(this._savedDialog._id).style.display = 'none';
		OverlayDialogInstance = this;
		this._remove = false;
		this.overlayOpen(id, this._object, this._offsetx, this._offsety);
	},
	calculatePosition : function(o)
	{
		this._overlayx += o.offsetLeft;
		this._overlayy += o.offsetTop;
		if (o.offsetParent)
			this.calculatePosition(o.offsetParent);
	},
	calculateTablePosition : function(o)
	{
		this._overlaytablex += o.offsetLeft;
		this._overlaytabley += o.offsetTop;
		if (o.offsetParent)
			this.calculateTablePosition(o.offsetParent);
	},
	overlayOpen : function(name, o, offsetx, offsety)
	{
		var d = document.getElementById(name);
		this._overlaytablex = 0;
		this._overlaytabley = 0;
		this.disableDropDown();
		if (o)
		{
			if (o.clientWidth)
			{
				this._overlayx = offsetx + o.clientWidth / 2;
				this._overlayy = offsety + o.clientHeight;
			}
		}
		else
		{
			this._overlayx = offsetx + document.body.scrollLeft;
			this._overlayy = offsety + document.body.scrollTop;
		}
		this._overlayname = name;
		if (o)
			this.calculatePosition(o);
		d.style.display = 'inline';
		var w = d.clientWidth;
		var h = d.clientHeight;
		var ww = window.innerWidth;
		if (!ww)
			ww = document.body.clientWidth;
		var hh = window.innerHeight;
		if (!hh)
			hh = document.body.clientHeight;
		var scrollTop = document.documentElement.scrollTop;
		if (!scrollTop)
			scrollTop = document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft;
		if (!scrollLeft)
			scrollLeft = document.body.scrollLeft;
		if (!this._overlayx)
			this._overlayx = _x + scrollLeft;
		if (!this._overlayy)
			this._overlayy = _y + scrollTop - h;
		if (hh > 100)
		{
			this._overlayx -= w / 2;
			if (this._overlayx + w > ww + scrollLeft)
				this._overlayx = ww + scrollLeft - w;
			if (this._overlayx < scrollLeft)
				this._overlayx = scrollLeft;
			if (this._overlayy + h > hh + scrollTop)
				this._overlayy = hh + scrollTop - h;
			if (this._overlayy < scrollTop)
				this._overlayy = scrollTop;
		}
		d.style.left = this._overlayx + 'px';
		d.style.top = this._overlayy + 'px';
		this._display = true;
		track();
	},
	disableDropDown : function()
	{
		if (!this._overlayDoDisable)
		{
			try
			{
				this._overlayDoDisable = 1;
				if (window.clientInformation)
				{
					var s = window.clientInformation.userAgent;
					var p = s.indexOf('MSIE');
					if (p != -1)
					{
						isIE = true;
						s = s.substring(p + 5);
						p = s.indexOf('.');
						if (p != -1 && (s.substring(0, p) - 0) < 7)
							this._overlayDoDisable = 2;
					}
				}
			}
			catch (e)
			{
			}
		}
		if (this._overlayDoDisable == 2)
		{
			this._overlayDisabled = new Array();
			this._overlayDisabled2 = new Array();
			var dropDowns = document.getElementsByTagName('SELECT');
			for (var i = 0; i < dropDowns.length; i++)
			{
				this._overlayDisabled[this._overlayDisabled.length] = dropDowns[i];
				this._overlayDisabled2[this._overlayDisabled2.length] = dropDowns[i].style.visibility;
				dropDowns[i].style.visibility = 'hidden';
			}
		}
	},
	enableDropDown : function()
	{
		if (this._overlayDisabled)
		{
			for (var i = 0; i < this._overlayDisabled.length; i++)
				this._overlayDisabled[i].style.visibility = this._overlayDisabled2[i];
			this._overlayDisabled = null;
			this._overlayDisabled2 = null;
		}
		if (this._overlaytimer)
			window.clearInterval(this._overlaytimer);
		else if (this._overlaysaveonresize)
			document.body.onresize = this._overlaysaveonresize;
	},
	close : function()
	{
		this._display = false;
		var o = document.getElementById(this._id);
		if (o)
		{
			if (this._remove)
				o.parentNode.removeChild(o);
			else
				o.style.display = 'none';
		}
		if (this._savedDialog)
			document.getElementById(this._savedDialog._id).style.display = 'inline';
		this.enableDropDown();
		OverlayDialogInstance = this._savedDialog;
		track();
	},
	startMove : function(e)
	{
		var scrollLeft = document.documentElement.scrollLeft;
		if (!scrollLeft)
			scrollLeft = document.body.scrollLeft;
		var scrollTop = document.documentElement.scrollTop;
		if (!scrollTop)
			scrollTop = document.body.scrollTop;
		this._offsetx = this._overlayx - scrollLeft - _x;
		this._offsety = this._overlayy - scrollTop - _y;
		this._isMoving = true;
		return false;
	},
	endMove : function(e)
	{
		this._isMoving = false;
		return false;
	},
	mouseMove : function()
	{
		if (this._isMoving)
		{
			var scrollLeft = document.documentElement.scrollLeft;
			if (!scrollLeft)
				scrollLeft = document.body.scrollLeft;
			var scrollTop = document.documentElement.scrollTop;
			if (!scrollTop)
				scrollTop = document.body.scrollTop;
			var hh = window.innerHeight;
			if (!hh)
				hh = document.body.clientHeight;
			var o = document.getElementById(this._id).style;
			this._overlayx = scrollLeft + _x + this._offsetx;
			this._overlayy = scrollTop + _y + this._offsety;
			o.left = this._overlayx + 'px';
			o.top = this._overlayy + 'px';
			if (_y > hh - 20)
				window.scrollBy(0, _y - hh + 20);
			else if (_y < 20)
				window.scrollBy(0, _y - 20);
			return false;
		}
		return true;
	}
}
function jvGoToPage(page, arg, jobId, argList)
{
	var l = window.location.href;
	var p = l.indexOf('?');
	if (p != -1)
		l = l.substring(0, p);
	l += jvurlargs + '&page=' + escape(page);
	if (arg && arg.length)
		l += '&arg=' + escape(arg);
	if (jobId && jobId.length)
		l += '&j=' + jobId;
	if (argList)
		l += argList;
	window.location.href = l;
}

function jvGoToPageRetainValue(page, arg, jobId, argList)
{
    
    var randomnumber=Math.floor(Math.random()*111111)
    
    if(randomnumber.length < 5)
    {
        var i = randomnumber.length + 1;
        for(; i <= 5 ; i++)
        {
            randomnumber += "1";
        }
    }
    
	var l = window.location.href;
	var p = l.indexOf('?');
	if (p != -1)
		l = l.substring(0, p);
	
	
	if(jvurlargs.indexOf("&uf=") != -1 && (jvurlargs.length - jvurlargs.indexOf("&uf=") >= 9))
	{
		   jvurlargs = jvurlargs.replace(jvurlargs.substr(jvurlargs.indexOf("&uf="),9),"");
    }
		 
		
	l += jvurlargs + '&page=' + escape(page);
	if (arg && arg.length)
		l += '&arg=' + escape(arg);
	if (jobId && jobId.length)
		l += '&j=' + jobId;
	if (argList)
		l += argList;
		
		
	
		
	
    window.location.href = l + "&uf=" + randomnumber;
	
}
function jvGoToPageClean(page, arg, jobId, argList)
{
	var l = window.location.href;
	var p = l.indexOf('?');
	if (p != -1)
		l = l.substring(0, p);
	l += jvurlargsclean + '&page=' + escape(page);
	if (arg && arg.length)
		l += '&arg=' + escape(arg);
	if (jobId && jobId.length)
		l += '&j=' + jobId;
	if (argList)
		l += argList;
	window.location.href = l;
}
function jvGoToPageKind(kind, arg, jobId)
{
	var l = window.location.href;
	var p = l.indexOf('?');
	if (p != -1)
		l = l.substring(0, p);
	l += jvurlargs + '&k=' + escape(kind);
	if (arg && arg.length)
		l += '&arg=' + escape(arg);
	if (jobId && jobId.length)
		l += '&j=' + jobId;
	window.location.href = l;
}
function jvGoToPageKindRetainValue(kind, arg, jobId)
{
	var l = window.location.href;
	var p = l.indexOf('?');
	if (p != -1)
		l = l.substring(0, p);
	l += jvurlargs + '&k=' + escape(kind);
	if (arg && arg.length)
		l += '&arg=' + escape(arg);
	if (jobId && jobId.length)
		l += '&j=' + jobId;
	window.location.href = l + "&uf=12345";
}
function jvGoToPageKindClean(kind, arg, jobId)
{
	var l = window.location.href;
	var p = l.indexOf('?');
	if (p != -1)
		l = l.substring(0, p);
	l += jvurlargsclean + '&k=' + escape(kind);
	if (arg && arg.length)
		l += '&arg=' + escape(arg);
	if (jobId && jobId.length)
		l += '&j=' + jobId;
	window.location.href = l;
}
function jvalertmessage(name, s)
{
	var o = document.getElementById(name);
	if (o)
		o.innerHTML = s;
	o = document.getElementById('div' + name);
	if (o)
		o.style.display = 'inline';
}
function jvalertclear(name)
{
	var o = document.getElementById(name);
	if (o)
		o.innerHTML = '';
	o = document.getElementById('div' + name);
	if (o)
		o.style.display = 'none';
}
function jvaddrecipient()
{
	jvalertclear('jvalert');
	var t = document.getElementById('jvrecipienttable');
	if (t)
	{
		var row = t.insertRow(t.rows.length);
		row.id = 'jvrecipientrow' + jvrecipientindex;
		var cell = row.insertCell(0);
		cell.className = 'jvrecipient';
		cell.innerHTML = '<input type="text" id="jvrecipientfirstname' + jvrecipientindex + '" name="jvrecipientfirstname' + jvrecipientindex + '" value="" class="jvname" MaxLength="20"/>';
		cell = row.insertCell(1);
		cell.className = 'jvrecipient';
		cell.innerHTML = '<input type="text" id="jvrecipientlastname' + jvrecipientindex + '" name="jvrecipientlastname' + jvrecipientindex + '" value="" class="jvname" MaxLength="20"/>';
		cell = row.insertCell(2);
		cell.className = 'jvrecipient';
		cell.innerHTML = '<input type="text" id="jvrecipientemail' + jvrecipientindex + '" name="jvrecipientemail' + jvrecipientindex + '" value="" class="jvemail" MaxLength="20"/>';
		cell = row.insertCell(3);
		cell.className = 'jvrecipient';
		cell.innerHTML = '<a href="javascript:jvdeleteentry(' + jvrecipientindex + ')"><img alt="Remove recipient" src="' + jvbaseurl + 'images2/img_trash.gif" border="0" width="15" height="15"></a></td></tr></table>';
		document.getElementById('jvrecipientfirstname' + jvrecipientindex).focus();
		jvrecipientindex++;
	}
	if (typeof(jvresize) == 'function')
		jvresize();
}
function jvaddrecipient2(firstname, lastname, email)
{
	var t = document.getElementById('jvrecipienttable');
	if (t)
	{
		var row = t.insertRow(t.rows.length);
		row.id = 'jvrecipientrow' + jvrecipientindex;
		var cell = row.insertCell(0);
		cell.innerHTML = '<input type="text" id="jvrecipientfirstname' + jvrecipientindex + '" name="jvrecipientfirstname' + jvrecipientindex + '" value="' + firstname + '" class="jvname" MaxLength="20"/>';
		cell = row.insertCell(1);
		cell.innerHTML = '<input type="text" id="jvrecipientlastname' + jvrecipientindex + '" name="jvrecipientlastname' + jvrecipientindex + '" value="' + lastname + '" class="jvname" MaxLength="20"/>';
		cell = row.insertCell(2);
		cell.innerHTML = '<input type="text" id="jvrecipientemail' + jvrecipientindex + '" name="jvrecipientemail' + jvrecipientindex + '" value="' + email + '" class="jvemail" MaxLength="20"/>';
		cell = row.insertCell(3);
		cell.innerHTML = '<a href="javascript:jvdeleteentry(' + jvrecipientindex + ')"><img alt="Remove recipient" src="' + jvbaseurl + 'images2/img_trash.gif" border="0" width="15" height="15"></a></td></tr></table>';
		document.getElementById('jvrecipientfirstname' + jvrecipientindex).focus();
		jvrecipientindex++;
	}
}
function jvdeleteentry(i)
{
	jvalertclear('jvalert');
	var t = document.getElementById('jvrecipienttable');
	var r = document.getElementById('jvrecipientrow' + i);
	if (t && r)
	{
		for (var index = 0; index < t.rows.length; index++)
		{
			if (t.rows[index] == r)
			{
				t.deleteRow(index);
				break;
			}
		}
	}
}
function previewEmail(args)
{
	popup('job', 'Email.aspx' + args, 770, 700);
}
function selectFromOutlook(args)
{
	var domain = document.getElementById('YourEmail');
	if (domain)
	{
		domain = domain.value;
		var p = domain.indexOf('@');
		if (p != -1)
			domain = domain.substr(p);
		domain = '&domain=' + domain;
	}
	else
		domain = '';
	popup('import', 'ImportFromOutlook.aspx' + args + domain, 600, 520);
}
var SpellCheckInstance = null;
SpellCheckDialog = function(o) 
{ 
	this._object = o;
	this._args = null;
	this._index = 0;
	this._errorindex = 0;
    this._field = null;
    this._content = null;
    this._errors = null;
    this._suggestions = null;
    this._suggestions2 = {};
    this._ignoreAll = {};
    this._word = '';
	this._from = 0;
	this._to = 0;
	this._changed = 0;
	this._dialog = null;
	this._frame = null;
	this._isHtml = false;
	this._defaultContent = ''
}
SpellCheckDialog.prototype = 
{
	display : function()
	{
		var fields = '';
		var m = document.getElementById("jvmessage");
		var c = document.getElementById("jvcoverletter");
		var r = document.getElementById("jvresume");
		if (m && m.value.length)
			fields += 'jvmessage\n' + jvescape(m.value) + '\n';
		if (c && c.value.length)
			fields += 'jvcoverletter\n' + jvescape(c.value) + '\n';
		if (r && r.value.length)
			fields += 'jvresume\n' + jvescape(r.value) + '\n';
		this.check(fields);
	},
	check : function(fields)
	{
		if (fields.length)
			this.display3(APIExecute('spellcheck', fields));
		else
			this.display3();
	},
	display2 : function(args) 
	{
		SpellCheckInstance.display3(args);
	},
	display3 : function(args)
	{
		if (args)
		{
			args = args.replace(/\r/g, '')
			var a = args.split('\n');
			var result = new Array();
			for (var i = 0; i < a.length - 1;)
			{
				result[result.length] = a[i++];
				result[result.length] = jvunescape(a[i++]);
				var errors = new Array();
				for (;;)
				{
					var s = a[i++];
					if (s.length)
						errors[errors.length] = s - 0;
					else
						break;
				}
				result[result.length] = errors;
				var suggestions = new Array();
				for (;;)
				{
					var s = a[i++];
					if (s.length)
					{
						suggestions[suggestions.length] = s;
						var suggestions2 = new Array();
						for (;;)
						{
							var s = a[i++];
							if (s.length)
								suggestions2[suggestions2.length] = s;
							else
								break;
						}
						suggestions[suggestions.length] = suggestions2;
					}
					else
						break;
				}
				result[result.length] = suggestions;
			}
			this._args = result;
		}
		else
			this._args = null;
		this._index = 0;
		this._errorindex = 0;
		this._field = null;
		this._content = null;
		this._errors = null;
		this._suggestions = null;
		this._suggestions2 = {};
		this._ignoreAll = {};
		this._word = '';
		this._from = 0;
		this._to = 0;
		this._changed = 0;

		this._dialog = new OverlayDialog('Spell Check');
		this._dialog.addRowSpace();

		if (!args || args.length == 0)
		{
			this._dialog.set_width(200);
			this._dialog.addRow('<div style="clear: both; height: 5px;"></div><div>No spelling errors found.</div>' +
					'<div style="clear: both; height: 5px;"></div><div style="text-align: center;">' + addButton('Continue', 'SpellCheckInstance.cancel()') + '</div><div style="clear: both; height: 5px;"></div>');
			this._dialog.display();
			return;
		}
		else
		{
			this._dialog.addRow('<div style="height: 5px;"></div>' +
					'<iframe id="spellcheckcontent" style="WIDTH: ' + (this._dialog._width - 20) + 'px; HEIGHT: 200px;" name="list" src="' + jvbaseurl + 'Info/SpellCheck.htm" frameBorder="yes" scrolling="yes"></iframe>' +
					'<div id="spellcheckcell" style="height: 180px;">' +
					'<div style="padding-bottom: 10px;"><span id="changedNo" class="small">0 words changed</span></div>' +
					'<div style="width: 100px; float: left;">Change&nbsp;to:&nbsp;</div><div style="float: left";><input id="changeTo" type="text" value="" style="width: 180px;"/></div>' +
					'<div style="clear: both; height: 85px; padding-top: 10px;"><div style="float: left; width: 100px;">Suggestions:&nbsp;</div><div style="float: left"><span id="suggestions">None</span></div></div>' +
					'<div style="clear: both; height: 10px;"></div><div style="float: left;">' + addButton('Change', 'SpellCheckInstance.change()') + addButtonSpace() + addButton('Change&nbsp;All', 'SpellCheckInstance.changeAll()') + addButtonSpace() + addButton('Ignore', 'SpellCheckInstance.ignore()') + addButtonSpace() + addButton('Ignore&nbsp;All', 'SpellCheckInstance.ignoreAll()') + '</div><div style="float:right;">' + addButton('Finish', 'SpellCheckInstance.finish()') + '</div>' +
					'</div><div style="clear: both; height: 5px;"></div>');
		}
	
		this._dialog.display();
		this._frame = document.getElementById('spellcheckcontent');
		window.setTimeout('SpellCheckInstance.initialize()', 10);
	},
	initialize : function()
	{
		if (this._frame.contentWindow && typeof(this._frame.contentWindow.setContent) == 'function')
		{
			this._frame.contentWindow.isHtml = this._isHtml;
			this.nextSection();
		}
		else
			window.setTimeout('SpellCheckInstance.initialize()', 10);
	},
    nextSection : function() 
    {
		if (!this._args || !this._args.length)
		{
			this._frame.contentWindow.setContent(this._defaultContent);
			this._frame.contentWindow.display(0, 0);
			track();
			return
		}
		
		if (this._index > 0)
			this._args[this._index - 3] = this._content;
		if (this._index < this._args.length)
		{
			this._field = this._args[this._index++];
			this._content = this._args[this._index++];
			this._errors = this._args[this._index++];
			this._suggestions = this._args[this._index++];
			for (var i = 0; i < this._suggestions.length; )
			{
				var word = this._suggestions[i++];
				var list = this._suggestions[i++];
				this._suggestions2[word] = list;
			}
			this._errorindex = 0;
			this._frame.contentWindow.setContent(this._content);
			this.next();
		}
		else
		{
			this._frame.contentWindow.display(this._from, this._from);
			document.getElementById('spellcheckcell').innerHTML =
				'<div style="height: 5px;"></div><div style="padding-bottom: 135px;">' + (this._changed == 1 ? '1 word' : this._changed + ' words') + ' will be changed.</div>' +
				'<div style="float: left;">' + addButton('Cancel', 'SpellCheckInstance.cancel()') + '</div><div style="float: right;">' + addButton('Finish', 'SpellCheckInstance.finish()') + '</div>';
			track();
		}
    },
    next : function()
    {
		for (;;)
		{
			if (this._errorindex < this._errors.length)
			{
				this._from = this._errors[this._errorindex++];
				this._to = this._errors[this._errorindex++];
				if (this._from == this._to)
					continue;
				this._word = this._content.substring(this._from, this._to);
				if (this._ignoreAll[this._word])
					continue;
				this._frame.contentWindow.display(this._from, this._to);
				this.updateSuggestions();
				document.getElementById('changeTo').focus();
				track();
			}
			else
				this.nextSection();
			break;
		}
    },
    updateSuggestions : function()
    {
		var list = this._suggestions2[this._word];
		var s = 'None';
		if (list && list.length)
		{
			s = '<select size="5" id="selectSuggestions" onchange="SpellCheckInstance.updateSelection()" style="width:180px;">';
			s += '<option selected="selected" value="' + list[0] + '">' + list[0] + '</option>';
			for (var i = 1; i < list.length; i++)
				s += '<option value="' + list[i] + '">' + list[i] + '</option>'
			s += '</select>';
		}
		document.getElementById('suggestions').innerHTML = s;
		this.updateSelection();
    },
    updateSelection : function()
    {
		var s = document.getElementById('selectSuggestions');
		if (s)
			document.getElementById('changeTo').value = s.value;
		else
			document.getElementById('changeTo').value = this._word;
    },
	change : function()
	{
		var newWord = document.getElementById('changeTo').value;
		this._content = this._content.substring(0, this._from) + newWord + this._content.substring(this._to);
		this._frame.contentWindow.setContent(this._content);
		this._changed++;
		this.updateChanged();
		this.adjustOffsets(this._errorindex, newWord.length - this._word.length);
		this.next();
	},
	changeAll : function()
	{
		var newWord = document.getElementById('changeTo').value;
		this._content = this._content.substring(0, this._from) + newWord + this._content.substring(this._to);
		this._changed++;
		this.adjustOffsets(this._errorindex, newWord.length - this._word.length);

		for (var i = this._errorindex; i < this._errors.length; )
		{
			var from = this._errors[i++];
			var to = this._errors[i++];
			if (this._content.substring(from, to) == this._word)
			{
				this._content = this._content.substring(0, from) + newWord + this._content.substring(to);
				this._changed++;
				this._errors[i - 1] = from;
				this.adjustOffsets(i, newWord.length - this._word.length);
			}
		}
		
		this.updateChanged();
		this._frame.contentWindow.setContent(this._content);
		this.next();
	},
	ignore : function()
	{
		this.next();
	},
	ignoreAll : function()
	{
		this._ignoreAll[this._word] = true;
		this.next();
	},
	finish : function()
	{
		for (var i = 0; i < this._args.length; )
		{
			var field = this._args[i++];
			var content = this._args[i++];
			i += 2;
			document.getElementById(field).value = content;
			if (this._isHtml)
				tinyMCE.getInstanceById(field).setContent(content);
		}
		this._dialog.close();
		track();
	},
	cancel : function()
	{
		this._dialog.close();
	},
	updateChanged : function()
	{
		document.getElementById('changedNo').innerHTML = (this._changed == 1 ? '1 word changed' : this._changed + ' words changed');
	},
	adjustOffsets : function(index, adjust)
	{
		for (var i = index; i < this._errors.length; i++)
			this._errors[i] += adjust;
	},
	get_args : function()
	{
		return this._args;
	}
}
function SpellCheckOnError(args)
{
}
SpellCheckInstance = new SpellCheckDialog();
function addButton(name, f)
{
	return '<input type="button" class="jvbutton" value="' + name + '" onclick="' + f + '" />';
}
function addButtonSpace()
{
	return '&nbsp;';
}
var APIUseActiveX = false;
try
{
	if (window.clientInformation)
	{
		var s = window.clientInformation.userAgent;
		var p = s.indexOf('MSIE');
		if (p != -1)
		{
			isIE = true;
			s = s.substring(p + 5);
			p = s.indexOf('.');
			if (p != -1)
				APIUseActiveX = (s.substring(0, p) - 0) < 7;
		}
	}
}
catch (e)
{
}
function APIExecute(command, postdata)
{
	var xmlHttpReq = (APIUseActiveX ? new ActiveXObject('MSXML2.XMLHTTP.3.0') : new XMLHttpRequest());
	xmlHttpReq.open('POST', jvbaseurl + 'CompanyJobs/CompanyJobsAPI.aspx?command=' + command, false);
	
	var isDelete = (command == 'deleteAttachment' || command == 'deletePortfolio' || command == 'deleteBlueButtonPortfolio') && document.getElementById('AttachmentIds');
	var attachmentIds;
	if(isDelete)
	{
	    attachmentIds = document.getElementById('AttachmentIds');
        postdata += '#' + attachmentIds.value;
    }
	xmlHttpReq.send(postdata);
	if(isDelete)
	{
	   attachmentIds.value = xmlHttpReq.responseText;
	}
	return xmlHttpReq.responseText;
}
jvattachmentid = '';
function jvAddAttachment(id, companyId)
{
	jvAddAttachment2(id, companyId);
}

function jvAddAttachment2(id, companyId)
{
	jvattachmentid = id;
	var index;
	var uploadType;
	var pasteResumeHtml='';
	if(jvattachmentid.indexOf('resume') != -1)
	{
	    index = 0;
	    uploadType = '&nbsp;Resume';
	}
	if(jvattachmentid.indexOf('ApplyWithresume') != -1)
	{
	    index = 0;
	    pasteResumeHtml='';
	    uploadType = '&nbsp;Resume';
	    var d = new OverlayDialog('Upload' + uploadType);
	d.addRow('<br><div>Upload your resume as a Text, Word, or PDF File'+ ('<br>Your resume will be attached to the application in its original format.<br><br>')+'<span id="jvattachment"><iframe id="File1" style="width: 100%; height: 35px;" name="list" src="' + jvbaseurl + 'CompanyJobs/UploadOverlay.aspx?c=' + companyId + '&index=' + index + '" frameBorder="no" scrolling="no"></iframe></span></div>');
	d.addRow('<div style="text-align: center;"><img id="progressImage" style="display: none" src="' + jvbaseurl + 'images2/UploadAnimation.gif" width="240" height="18"></div>');
	d.addRow('<div> Or <a href="#" onclick="pasteResume(); return false;">Paste your Resume</a></div><br>');
	d.addRow('<div style="float: right;">' +addButton('Upload Resume', 'jvAddAttachmentSubmit()') + '</div><div style="float: right;">' +  addButton('Cancel', 'OverlayDialogInstance.close()') + '</div><div style="clear: both; height: 5px;"></div>');
	d.display();
	return;
	}
    if(jvattachmentid.indexOf('coverletter') != -1)
    {
        index = 1;
        uploadType = '&nbsp;Cover&nbsp;Letter';
    }
    if(jvattachmentid.indexOf('veteranletter') != -1)
    {
        index = 3;
        uploadType = '&nbsp;Blue&nbsp;Button&nbsp;Data';
    }
    if(jvattachmentid.indexOf('portfolio') != -1)
    {
        index = 2;
        uploadType = '&nbsp;Attachment'
	}    
	var d = new OverlayDialog('Upload' + uploadType);
	if(index == 3)
	{
	    d.addRow('Blue Button data is an option available to make it easy for Veterans to apply');
	    d.addRow(' for jobs using their Blue Button data.');
	    d.addRow('&nbsp;');
	    d.addRow('&nbsp;');
	}
	d.addRow('<div>Select' + ((index != 2 && index != 3) ? ' text, Word or PDF ' : '') + ' file:<br><span id="jvattachment"><iframe id="File1" style="width: 100%; height: 35px;" name="list" src="' + jvbaseurl + 'CompanyJobs/UploadOverlay.aspx?c=' + companyId + '&index=' + index + '" frameBorder="no" scrolling="no"></iframe></span>' + ('<br>The document will be attached to your application in its original format.<br><br>') + '</div>');
	d.addRow('<div style="text-align: center;"><img id="progressImage" style="display: none" src="' + jvbaseurl + 'images2/UploadAnimation.gif" width="240" height="18"></div>');
	d.addRow('<div style="float: left;">' + addButton('Cancel', 'OverlayDialogInstance.close()') + '</div><div style="float: right;">' + addButton('Upload', 'jvAddAttachmentSubmit()') + '</div><div style="clear: both; height: 5px;"></div>');
	d.display();
}
function pasteResume()
{
    OverlayDialogInstance.close();
    if(document.getElementById('ImportResume'))
        document.getElementById('ImportResume').style.display = 'none';
    if(document.getElementById('RemoveResume'))
        document.getElementById('RemoveResume').style.display = 'inline';
    if(document.getElementById('spnRemoveText'))
        document.getElementById('spnRemoveText').innerHTML ="";
    if(document.getElementById('spnRemoveLinkText'))
        document.getElementById('spnRemoveLinkText').innerHTML ="Clear and start over";
    //hide the apply with section
    if(document.getElementById('jvApplyWithSection'))
        document.getElementById('jvApplyWithSection').style.display = 'none';
    //show the resume section
    if(document.getElementById('jvresume'))
    {
        document.getElementById('jvresume').style.display = 'inline';
        document.getElementById('jvresume').value= '';
    }
    //set a flag to identify that the apply with was "resume".
    //show the resume section
    if(document.getElementById('jvApplyWithKind'))
        document.getElementById('jvApplyWithKind').value= '3';
    
     //resize the iframe
	    if (typeof(jvresize3) == 'function' && typeof(donotresize) == 'undefined')
        jvresize3(false);
}
function jvAddAttachmentSubmit()
{
	if (window.navigator.userAgent.indexOf('Safari') == -1 && window.navigator.userAgent.indexOf('Firefox') == -1)
		document.getElementById("jvattachment").style.display = 'none';
	document.getElementById("progressImage").style.display = 'inline';
	var submitted = false;
	if (document.frames)
	{
		for (var i = document.frames.length - 1; !submitted && i >= 0; i--)
		{
			try
			{
				document.frames[i].document.getElementById('Form1').submit();
				submitted = true;
			}
			catch (e)
			{
			}
		}
	}
	if (!submitted)
	{
	    var attachments = document.getElementById("jvattachment").getElementsByTagName('IFRAME');
		for (var index = 0; index < attachments.length; index++)
		{
		    var frame = attachments[index];
			if (frame != null && frame.contentDocument != null)
	            frame.contentDocument.getElementById('Form1').submit();
	    }
	}
}
function strEndsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
}
function uploadComplete(name,args,fileInfo)
{
    var text = '';
    var attachmentIds ;
    var lowername = name.toString().toLowerCase();
    if(!(strEndsWith(lowername,'txt') || strEndsWith(lowername,'doc') || strEndsWith(lowername,'rtf') 
    || strEndsWith(lowername,'docx') || strEndsWith(lowername,'pdf')))
    {
        uploadError('Please upload your resume as a Text, Word, or PDF File');
    }
    else
    {
        if(fileInfo && fileInfo.length > 0)
        {name.toString().e
        attachmentIds = document.getElementById('AttachmentIds');
        if(attachmentIds)
        attachmentIds.value += fileInfo;
        }
        if(jvattachmentid.indexOf('portfolio') != -1)
        {
			    var args = APIExecute('getAttachmentsSummary',null); 
                document.getElementById('portfolioattachmentDiv').innerHTML = args;
        }
        else if(jvattachmentid.indexOf('veteranletter') != -1)
        {
            var args = APIExecute('getBlueButtonAttachmentsSummary',null);
            document.getElementById('bluebuttonportfolioattachmentDiv').innerHTML = args;
        }
        else
        {
            //var args = APIExecute('parseresume', (jvattachmentid.indexOf('resume') != -1 ? '0' : '1'));
        
	        if (args && args.length)
	        {
		        args = args.replace(/\r/g, '')
		        var a = args.split('\n');
		        text = jvunescape(a[0]);
		        var obj=  document.getElementById(jvattachmentid);
		        if(obj)
		            obj.value = text;
		        if (a.length >= 6 && jvattachmentid.indexOf('resume') != -1)
		        {
		            var o = document.getElementById('jvresume');
			        if (o && !o.value.length)
				        o.value = text;
    			    
			        o = document.getElementById('jvfirstname');
			        if (o && !o.value.length)
				        o.value = jvunescape(a[1]);
			        o = document.getElementById('jvlastname');
			        if (o && !o.value.length)
				        o.value = jvunescape(a[2]);
			        o = document.getElementById('jvemail');
			        if (o && !o.value.length)
				        o.value = jvunescape(a[3]);
			        o = document.getElementById('jvphone');
			        if (o && !o.value.length)
				        o.value = jvunescape(a[4]);
			        o = document.getElementById('jvcell');
			        if (o && !o.value.length)
				        o.value = jvunescape(a[5]);
		        }
	        }
	    }
	    if (jvtrim(text).length > 0 || jvattachmentid.indexOf('portfolio') != -1 || jvattachmentid.indexOf('veteranletter') != -1)
	    {
	        if(jvattachmentid == "jvresume")
		    {
		        if(document.getElementById('ImportResume'))
		            document.getElementById('ImportResume').style.display = 'none';
		        if(document.getElementById('RemoveResume'))
		            document.getElementById('RemoveResume').style.display = 'inline';
            }
            else if(jvattachmentid == "jvcoverletter")
		    {
		        if(document.getElementById('ImportCL'))
		            document.getElementById('ImportCL').style.display = 'none';
		        if(document.getElementById('RemoveCL'))
		            document.getElementById('RemoveCL').style.display = 'inline';
            }
            else if(jvattachmentid == "jvApplyWithresume")
            {
                if(document.getElementById('ImportResume'))
		            document.getElementById('ImportResume').style.display = 'none';
		        if(document.getElementById('RemoveResume'))
		            document.getElementById('RemoveResume').style.display = 'inline';
		            if(document.getElementById('spnRemoveText'))
		            document.getElementById('spnRemoveText').innerHTML ="Resume added";
		        if(document.getElementById('spnRemoveLinkText'))
                    document.getElementById('spnRemoveLinkText').innerHTML ="[remove]";
		        //hide the apply with section
		         if(document.getElementById('jvApplyWithSection'))
		            document.getElementById('jvApplyWithSection').style.display = 'none';
		        //show the resume section
		         if(document.getElementById('jvresume'))
		         {
		            document.getElementById('jvresume').style.display = 'inline';
		            document.getElementById('jvresume').focus();
                 }
		        //set a flag to identify that the apply with was "resume".
		        //show the resume section
		         if(document.getElementById('jvApplyWithKind'))
		            document.getElementById('jvApplyWithKind').value= '1';
    		        
            }    
	        window.setTimeout('OverlayDialogInstance.close()', 10);
	    }
	    else
	        window.setTimeout('jvCannotExtractText()', 10);
    	
        if (typeof(jvresize3) == 'function' && typeof(donotresize) == 'undefined')
            jvresize3(false);
   }
}

function uploadError(s)
{
    document.getElementById("progressImage").style.display = 'none';
    document.getElementById("jvattachment").style.display = 'inline';
    alert(s);
}
function jvCannotExtractText()
{
    var msg = 'Cannot extract text from uploaded file.';     
    if (jvattachmentid.indexOf('resume') != -1)
        msg += '<br>We cannot complete the fields below based on your resume. Your resume will be attached to your job application.';
    if (OverlayDialogInstance)
        OverlayDialogInstance.close();
    var d = new OverlayDialog('Problem with Uploaded File');
	d.addRowSpace();
    d.set_width(350);
    d.addRow('<div>'+msg+'</div>');
    d.addRowSpace();
    d.addRow('<div style="text-align: center;">' + addButton('OK', 'OverlayDialogInstance.close()') + '</div>');
    d.display();
}

//method executed when user clicks on the remove link for the resume text: 
//this will hide the resume textbox, show the applywith section and clear the prepopulated fields
function removeDoc(type) {
    if (type == "jvresume") {
        APIExecute('deleteAttachment', '0');
        if(document.getElementById('ImportResume'))
            document.getElementById('ImportResume').style.display = 'inline';
        if(document.getElementById('RemoveResume'))
            document.getElementById('RemoveResume').style.display = 'none';

        //clear all fields 
        document.getElementById('jvresume').value = '';
        document.getElementById('jvfirstname').value = '';
        document.getElementById('jvlastname').value = '';
        document.getElementById('jvemail').value = '';
        document.getElementById('jvphone').value = '';

    }
    //for apply with Resume- new
    if (type == "jvApplyWithresume") 
    {
        var applyKind= 0;
        var ojvApplyKind = document.getElementById('jvApplyWithKind');
        if(ojvApplyKind)
            applyKind= ojvApplyKind.value;
        showApplyWithSection();
         //this is for case when user tries to delete an uploaded file
        if(applyKind == 1)
        {
            APIExecute('deleteAttachment', '0');
            clearApplyPageFields(); 
        }
        //this is when deleting uploaded LI profile
        if(applyKind == 2)
        {
            clearApplyPageFields()
        }
    }
    if (type == "jvcoverletter") {
        APIExecute('deleteAttachment', '1');
        document.getElementById('ImportCL').style.display = 'inline';
        document.getElementById('RemoveCL').style.display = 'none';
        //clear the cover letter field
        document.getElementById('jvcoverletter').value = '';

    }
    if (type == "jvveteranletter") {
        APIExecute('deleteAttachment', '3');

        document.getElementById('ImportBlueButtonPortfolio').style.display = 'inline';
        document.getElementById('RemoveBlueButtonPortfolio').style.display = 'none';

    }
    if (type == "jvportfolio") {
        APIExecute('deleteAttachment', '2');
        document.getElementById('ImportPortfolio').style.display = 'inline';
        document.getElementById('RemovePortfolio').style.display = 'none';
    }
    
     //resize the iframe
	    if (typeof(jvresize3) == 'function' && typeof(donotresize) == 'undefined')
        jvresize3(false);
}

function clearApplyPageFields()
{
     //clear all fields 
    if(document.getElementById('jvfirstname'))
        document.getElementById('jvfirstname').value = '';
    if(document.getElementById('jvlastname'))
        document.getElementById('jvlastname').value = '';
    if(document.getElementById('jvemail'))
        document.getElementById('jvemail').value = '';
    if(document.getElementById('jvphone'))
        document.getElementById('jvphone').value = '';
}

function showApplyWithSection()
{
    if(document.getElementById('ImportResume'))
        document.getElementById('ImportResume').style.display = 'inline';
    if(document.getElementById('RemoveResume'))
        document.getElementById('RemoveResume').style.display = 'none';
    //show the apply with section
     if(document.getElementById('jvApplyWithSection'))
        document.getElementById('jvApplyWithSection').style.display = 'inline';
    //hide the resume section
     if(document.getElementById('jvresume'))
     {
        document.getElementById('jvresume').style.display = 'none';
        document.getElementById('jvresume').value = '';
     }
    //set a flag to identify that the apply with was "resume".
     if(document.getElementById('jvApplyWithKind'))
        document.getElementById('jvApplyWithKind').value= '0';
}

function removePortfolioLink(id1, fileid, key) {
    APIExecute('deletePortfolio', key + ',' + fileid);
    var args = APIExecute('getAttachmentsSummary', null);
    document.getElementById('portfolioattachmentDiv').innerHTML = args;
}
function removeBlueButtonPortfolioLink(id1, fileid, key) {
    APIExecute('deleteBlueButtonPortfolio', key + ',' + fileid);
    var args = APIExecute('getBlueButtonAttachmentsSummary', null);
    document.getElementById('bluebuttonportfolioattachmentDiv').innerHTML = args;
}
function jvescape(s)
{
	var s2 = '';
	for (var i = 0; i < s.length; i++)
	{
		var c = s.charAt(i);
		switch (c)
		{
			case '\\':
				s2 += '\\\\';
				break;
			case '\n':
				s2 += '\\n';
				break;
			case '\r':
				s2 += '\\r';
				break;
			default:
				s2 += c;
				break;
		}
	}
	return s2;
}
function jvunescape(s)
{
	var s2 = '';
	for (var i = 0; i < s.length; i++)
	{
		var c = s.charAt(i);
		if (c == '\\')
		{
			i++;
			c = s.charAt(i);
			switch (c)
			{
				case 'n':
					s2 += '\n';
					break;
				case 'r':
					s2 += '\r';
					break;
				default:
					s2 += c;
					break;
			}
		}
		else
			s2 += c;
	}
	return s2;
}
function fromarray(a)
{
	if (!a)
		return '';
	var s = '';
	if (a.length > 0)
		s += a[0];
	for (var i = 1; i < a.length; ++i)
		s += '\n' + a[i];
	return jvescape(s);
}
var _contactImportCount = 0;
var _contactImportTimer = null;
var _contactImportSource = null;
var _contactImportCancelled = false;
var _contactImportError = null;
var _contactImportSortColumn = 0;
var _contactImportSortDescending = false;
function importContacts(source)
{
	_contactImportSource = source;
	switch (source)
	{
		case 'Outlook':
			importFromOutlook();
			break;
		case 'LinkedIn':
		case 'Yahoo':
		case 'Gmail':
		case 'Hotmail':
			importExternal(source);
			break;
		case 'CSV File':
			importFromFile();
			break;
	}
}
function importExternal()
{
	var d = new OverlayDialog('Import from ' + _contactImportSource);
	d.set_width(550);
	if (_contactImportError)
	{
		d.addRow('<div><b>Error:</b>&nbsp;<b>' + _contactImportError + '</b></div>');
		_contactImportError = null;
	}
	var i = '';
	switch (_contactImportSource)
	{
		case 'LinkedIn':
			i += 'yourname@company.com';
			break;
		case 'Yahoo':
			i += 'yourname@yahoo.com';
			break;
		case 'Gmail':
			i += 'yourname@gmail.com';
			break;
		case 'Hotmail':
			i += 'yourname@hotmail.com';
			break;
		default:
			i = '';
			break;
	}
	d.addRow('<div">Please note that we DO NOT store your user name or password.</div>');
	if (i.length > 0)
		d.addRow('<div>Enter your whole ' + _contactImportSource + ' user name (i.e. ' + i + ').</div>');
	d.addRow('<div style="float: left; width: 100px;">User Name:</div><div style="float: left;"><input id="UserName" type="text" value="" style="width: 171px;"/></div>');
	d.addRow('<div style="clear: both; height: 8px;"></div>');
	d.addRow('<div style="float: left; width: 100px;">Password:</div><div style="float: left;"><input id="Password" type="password" value="" style="width: 171px;"/></div>');
	d.addRow('<div style="float: left;">' + addButton('Cancel', 'OverlayDialogInstance.close()') + '</div><div style="float: right;">' + addButton('Import', 'doImportExternal()') + '</div><div style="clear: both; height: 5px;"></div>');
	d.display(null);
	document.getElementById('UserName').focus();
}
function keywordjobsearch(s)
{
    //alert(document.getElementById(s).value);
    jvgetpage('<jvcompanyfield name="id" />', '9ze9VfwB', '', 'Job Section', '', 'main', 'jvCategory=,jvLocation=,jvSubsidiary=,jvpagesize=10,jvpageindex=1,jvkeywordsearch='+document.getElementById(s).value);
}
function showJobs() 
{
        //alert(escape(document.getElementById('jvLocation').value));
        document.getElementById('joblist').innerHTML = jvgetpage('<jvcompanyfield name="id" />', '9ze9VfwB', '', 'Job Section', '', 'main', 'jvCategory=,jvLocation=,jvSubsidiary=,jvpagesize=10,jvpageindex=1');
}
function jvpaginationclick(mode,lastpagestartindex,companyid) 
{
    showJobs();
}
 
    
function doImportExternal(source)
{
	_contactImportCancelled = false;
	JobviteApp.Service.Contacts.getContacts(_contactImportSource, document.getElementById('UserName').value, document.getElementById('Password').value, onContacts /*(_contactImportSource == 'LinkedIn' ? onLinkedIn : onContacts)*/, onError, null);
	if (OverlayDialogInstance)
		OverlayDialogInstance.close();
	var d = new OverlayDialog('Import from ' + _contactImportSource);
	d.set_width(550);
	d.addRow('<tr><td colspan="2" align="center">Importing, please wait...<br><br><img src="' + jvbaseurl + 'images2/Uploading-anim-horiz.gif"></td></tr>');
	d.addRowSpace();
	addButton('Cancel', 'closeImport()');
	d.display(null);
}
function onLinkedIn(args)
{
	alert(args);
	var d = new OverlayDialog('Import from ' + _contactImportSource);
	d.set_width(550);
	d.addRow('<tr><td colspan="2" align="center"><img src="' + jvbaseurl + 'API/API.aspx?command=LinkedIn"></td></tr>');
	d.addRowSpace();
	d.addRow('<tr><td>Please enter the text you see above.</td><td><input id="LinkedInText" type="text" value="" style="width: 100px;"/></td></tr>');
	d.addRowSpace();
	d.addButton('Cancel', 'closeImport()');
	d.addButton('Import', 'doLinkedInImport()');
	d.display(null);
}
function doLinkedInImport()
{
	_contactImportCancelled = false;
	JobviteApp.Service.Contacts.getLinkedInContacts(document.getElementById('LinkedInText').value, onContacts, onError, null);
	if (OverlayDialogInstance)
		OverlayDialogInstance.close();
	var d = new OverlayDialog('Import from ' + _contactImportSource);
	d.set_width(550);
	d.addRow('<tr><td colspan="2" align="center">Importing, please wait...<br><br><img src="' + jvbaseurl + 'images2/Uploading-anim-horiz.gif"></td></tr>');
	d.addRowSpace();
	d.addButton('Cancel', 'closeImport()');
	d.display(null);
}
function importFromOutlook()
{
	if (window.navigator.userAgent.indexOf('MSIE') == -1 || window.navigator.userAgent.indexOf('Windows') == -1)
	{
		var d = new OverlayDialog('Import from Outlook');
		d.set_width(300);
		d.addRow('<tr><td colspan="2">Import from Outlook i available only in Internet Explorer on Windows</td></tr>');
		d.addRowSpace();
		d.addButton('Close', 'OverlayDialogInstance.close()');
		d.display(null);
		return;
	}
	var addressBook = null;
	try
	{
		addressBook = new ActiveXObject('FJAddressBook.AddressBook');
	}
	catch (e)
	{
	}
	if (!addressBook)
		installActiveX();
	else
	{
		var d = new OverlayDialog('Import from Outlook');
		d.set_width(550);
		if (_contactImportError)
		{
			d.addRow('<tr><td><b>Error:</b>&nbsp;</td><td><b>' + _contactImportError + '</b></td></tr>');
			d.addRowSpace();
			_contactImportError = null;
		}
		d.addRow('<div">Please wait while your contacts are extracted...<br><br><div style="background-color: White; border: solid 1px #666666; height: 30; padding-top: 10px; padding-left: 10px;"><OBJECT id="AddressBook" codeBase="' + jvbaseurl + 'Info/FJAddressBook.cab#version=1,0,0,36" height="20" width="100" classid="CLSID:7CA66CAA-E08E-4262-9782-656E8CB238F3"></div></OBJECT></div>');
		d.addRow('<div style="clear: both; height: 8px;"></div>');
		d.addRow('<div style="float: left;">' + addButton('Cancel', 'OverlayDialogInstance.close()') + '</div><div style="clear: both; height: 5px;"></div>');
		d.display(null);
		window.setTimeout('next()', 100);
	}
}
function installActiveX()
{
	if (_contactImportCount)
		submitValue('refresh', 'OutlookInstall');
	else
	{
		_contactImportCount++;
		var d = new OverlayDialog('Import from Outlook');
		d.set_width(550);
		d.addRow('<tr><td colspan="2">' +
			'Note: Step 1 and 2 are optional depending on your browser security settings.' +
			'<table cellSpacing="0" cellPadding="0" width="100%" border="0">' +
			'<tr>' +
			'<td><img src="' + jvbaseurl + 'images2/spix.gif" width="20" height="5"></td>' +
			'<td>' +
			'<table cellSpacing="0" cellPadding="0" width="100%" border="0">' +
			'<tr>' +
			'<td style="color: Green; font-size:20px; font-weight: bold;">1.&nbsp;</td>' +
			'<td>Click the security warning bar at the top of your web browser</td>' +
			'</tr>' +
			'<tr>' +
			'<td></td>' +
			'<td><img src="' + jvbaseurl + 'images2/ActiveX1.gif" /></td>' +
			'</tr>' +
			'<tr><td colspan="2"><img src="' + jvbaseurl + 'images2/spix.gif" width="5" height="15" /></td></tr>' +
			'<tr>' +
			'<td style="color: Green; font-size:20px; font-weight: bold;">2.&nbsp;</td>' +
			'<td>In the small menu that appears, select and click "Install ActiveX Control"</td>' +
			'</tr>' +
			'<tr>' +
			'<td></td>' +
			'<td><img src="' + jvbaseurl + 'images2/ActiveX2.gif" /></td>' +
			'</tr>' +
			'<tr><td colspan="2"><img src="' + jvbaseurl + 'images2/spix.gif" width="5" height="15" /></td></tr>' +
			'<tr>' +
			'<td style="color: Green; font-size:20px; font-weight: bold;">3.&nbsp;</td>' +
			'<td>Click the "Install" button on the popup that appears</td>' +
			'</tr>' +
			'<tr>' +
			'<td></td>' +
			'<td><img src="' + jvbaseurl + 'images2/ActiveX3.gif" /></td>' +
			'</tr>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</table>' +
			'<OBJECT id="AddressBook" codeBase="' + jvbaseurl + 'Info/FJAddressBook.cab#version=1,0,0,36" height="0" width="0" classid="CLSID:7CA66CAA-E08E-4262-9782-656E8CB238F3" VIEWASTEXT></OBJECT>' +
			'</td></tr>');
		d.addRowSpace();
		addButton('Cancel', 'OverlayDialogInstance.close()');
		d.display(null);
		window.setTimeout('next()', 10);
	}
}
function closeImport()
{
	if (OverlayDialogInstance)
		OverlayDialogInstance.close();
	if (_contactImportTimer)
	{
		window.clearTimeout(_contactImportTimer);
		_contactImportTimer = null;
	}
	_contactImportCancelled = true;
}
function next()
{
	var addressBook = document.getElementById('AddressBook');
	if (addressBook)
	{
		try
		{
			var length = addressBook.extractContacts();
			document.getElementById('AddressBook').style.width = '0px';
			addressBook.hide();
			addressBook.sort(0, -1, '', false);
			for (var i = 0; i < length; i++)
				addressBook.checked(i, true);
			onContacts(APIExecute('uploadcontacts', addressBook.selected));
		}
		catch (e)
		{
			_contactImportTimer = window.setTimeout('next()', 100);
		}
	}
	else
		_contactImportTimer = window.setTimeout('next()', 100);
}
function importFromFile()
{
	var d = new OverlayDialog('Import from File');
	d.set_width(550);
	if (_contactImportError)
	{
			d.addRow('<tr><td><b>Error:</b>&nbsp;</td><td><b>' + _contactImportError + '</b></td></tr>');
		d.addRowSpace();
		_contactImportError = null;
	}
	d.addRow('<tr><td>Select File:&nbsp;</td><td><span id="attachments2"><iframe id="File1" style="width: 100%; height: 30px;" name="list" src="' + jvbaseurl + 'Info/UploadOverlay.aspx?id=1" frameBorder="no" scrolling="no"></iframe></span></td></tr>');
	d.addRow('<tr><td></td><td><img id="progressImage" style="display: none" src="' + jvbaseurl + 'images2/UploadAnimation.gif" width="240" height="18"></td></tr>');
	d.addRowSpace();
	d.addButton('Cancel', 'closeImport()');
	d.addButton('Upload', 'doImportFromFile()');
	d.display();
}
function doImportFromFile()
{
	document.getElementById("progressImage").style.display = 'inline';
	if (document.frames)
	    document.frames[0].document.getElementById('Form1').submit();
	else
	{
	    var attachments = document.getElementById("attachments2").getElementsByTagName('IFRAME');
		for (var index = 0; index < attachments.length; index++)
		{
			var frame = attachments[index];
	        frame.contentDocument.getElementById('Form1').submit();
	    }
	}
}
function uploadCompletex(name)
{
	JobviteApp.Service.Contacts.uploadContactsFromFile(onContacts, onError, null);
}
function onContacts(args)
{
	if (OverlayDialogInstance)
		OverlayDialogInstance.close();
	if (_contactImportCancelled)
		return;
	_contactImportSortColumn = 0;
	_contactImportSortDescending = false;
	var d = new OverlayDialog('Import from ' + _contactImportSource);
	d.set_width(600);
	d.addRowSpace();
	d.addRow('<table cellSpacing="0" cellPadding="0" border="0">' +
		'<tr><td align="right"><td><input id="SearchKeywords" type="text" value="" style="width: 171px;"/>&nbsp;</td><td>' + addButton('Search', 'searchContacts()') + '</td><td>&nbsp;&nbsp;<A href="javascript:clearSearchContacts()">Clear Search</A></tr>' +
		'</table>');
	d.set_defaultFunction('searchContacts()');
	d.addRow('<div style="clear: both; height: 8px;"></div>');
	d.addRow('<table cellSpacing="0" cellPadding="0" border="0"><tr><td colspan="2" class="lightBackground" style="border-left: solid 1px #999999; border-top: solid 1px #999999; border-right: solid 1px #999999;"><table width="100%" cellSpacing="2" cellPadding="0" border="0"><tr><td width="18" style="padding-left: 3px;"><input type="checkbox" onclick="checkAllContacts(this)"></td><td id="sortheader0" class="itemlistheaderon" width="158"><a href="javascript:sortList(ContactsListInst, 0)">First Name <img alt="Sort ascending" src="' + jvbaseurl + 'images2/icon_arrow_down.gif" border="0"></a></td><td id="sortheader1" class="itemlistheader" width="158"><a href="javascript:sortList(ContactsListInst, 1)">Last Name</a></td><td id="sortheader2" class="itemlistheader"><a href="javascript:sortList(ContactsListInst, 2)">Email</a></td></tr></table><div id="ContactsListdiv" style="height: 300px; overflow-y: scroll; width: 580px; overflow-x: hidden; background-color: White; border-top: solid 1px #999999; border-bottom: solid 1px #999999;">' + args + '</div></td></tr><tr><td colspan="2"><a href="javascript:checkContacts(true)">Check all</a> | <a href="javascript:checkContacts(false)">Clear all</a> | <span id="ContactsListSelectCount">0</span> selected</td></tr></table>');
	d.addRow('<div style="clear: both; height: 8px;"></div>');
	d.addRow('<div style="float: left;">' + addButton('Cancel', 'OverlayDialogInstance.close()') + '</div><div style="float: right;">' + addButton('Add&nbsp;Contacts', 'addContacts()') + '</div><div style="clear: both; height: 5px;"></div>');
	d.display(null);
}
function checkContacts(checked)
{
	var elements = document.getElementsByTagName('INPUT');
	var count = 0;
	for (var i = 0; i < elements.length; i++)
	{
		var e = elements[i];
		if (e.type == 'checkbox' && e.name.indexOf('ContactsList') == 0)
		{
			count++;
			e.checked = checked;
		}
	}
	var c = document.getElementById('ContactsListSelectCount');
	if (c)
		c.innerHTML = (checked ? count : 0);
	track();
}
function checkAllContacts(o)
{
	checkContacts(o.checked);
}
function sortList(list, column)
{
	var o = document.getElementById('sortheader' + _contactImportSortColumn);
	if (o)
	{
		o.className = 'itemlistheader';
		o = o.firstChild;
		if (o)
		{
			o = o.firstChild;
			if (o)
			{
				o = o.nextSibling;
				if (o)
					o.parentNode.removeChild(o);
			}
		}
	}
	list.sort(column);
	if (column == _contactImportSortColumn)
		_contactImportSortDescending = !_contactImportSortDescending;
	else
	{
		_contactImportSortColumn = column;
		_contactImportSortDescending = false;
	}
	o = document.getElementById('sortheader' + _contactImportSortColumn);
	if (o)
	{
		o.className = 'itemlistheaderon';
		o = o.firstChild;
		if (o)
		{
			var e = document.createElement('img');
			e.src = (_contactImportSortDescending ? jvbaseurl + 'images2/icon_arrow_up.gif' : '' + jvbaseurl + 'images2/icon_arrow_down.gif');
			e.border = 0;
			o.appendChild(e);
		}
	}
}
function addContacts()
{
	var args = '';
	var recipients = new Array();
	var elements = document.getElementsByTagName('INPUT');
	for (var i = 0; i < elements.length; i++)
	{
		var e = elements[i];
		if (e.type == 'checkbox' && e.name.indexOf('ContactsList') == 0 && e.name != 'ContactsList' + 'CheckAll' && e.checked)
		{
			args += e.name.substring('ContactsList'.length + 1) + '\n';
			var o = e.parentNode;
			while (o && o.tagName != 'TD')
				o = o.parentNode;
			if (o)
			{
				o = o.nextSibling;
				recipients[recipients.length] = jvGetInLabel(o);
				o = o.nextSibling;
				recipients[recipients.length] = jvGetInLabel(o);
				o = o.nextSibling;
				recipients[recipients.length] = jvGetInLabel(o);
			}
		}
	}
	for (var i = 0; i < recipients.length; i += 3)
		jvaddrecipient2(recipients[i], recipients[i + 1], recipients[i + 2]);
	if (OverlayDialogInstance)
		OverlayDialogInstance.close();
}
function jvGetInLabel(o)
{
	if (o)
	{
		var s = o.innerHTML;
		var p = s.indexOf('>');
		if (p != -1)
		{
			p++;
			var p2 = s.indexOf('<', p);
			if (p2 != -1)
				return s.substring(p, p2);
		}
	}
	return '';
}		
function onAddContacts()
{
	submitValue('refresh', 'contacts');
}
function onError(args)
{
	if (OverlayDialogInstance)
		OverlayDialogInstance.close();
	_contactImportError = args.get_message();
	if (!_contactImportCancelled && _contactImportSource && _contactImportSource.length)
		importContacts(_contactImportSource);
}
function searchContacts()
{
	var args = document.getElementById('SearchKeywords').value + '\n';
	var elements = document.getElementsByTagName('INPUT');
	for (var i = 0; i < elements.length; i++)
	{
		var e = elements[i];
		if (e.type == 'checkbox' && e.name.indexOf('ContactsList') == 0 && e.name != 'ContactsList' + 'CheckAll' && e.checked)
			args += e.name.substring('ContactsList'.length + 1) + '\n';
	}
	document.getElementById('ContactsListdiv').innerHTML = APIExecute('searchcontacts', args);
}
function clearSearchContacts()
{
	document.getElementById('SearchKeywords').value = '';
	searchContacts();
}
ContactListClass = function()
{
}
ContactListClass.prototype =
{
	initialize: function()
	{
	},
	setCheck: function(o)
	{
		var c = document.getElementById('ContactsListSelectCount');
		if (c)
			c.innerHTML = c.innerHTML - 0 + (o.checked ? 1 : -1);
	},
	sort: function(index)
	{
		var args = '' + index + '\n';
		var elements = document.getElementsByTagName('INPUT');
		for (var i = 0; i < elements.length; i++)
		{
			var e = elements[i];
			if (e.type == 'checkbox' && e.name.indexOf('ContactsList') == 0 && e.name != 'ContactsList' + 'CheckAll' && e.checked)
				args += e.name.substring('ContactsList'.length + 1) + '\n';
		}
		document.getElementById('ContactsListdiv').innerHTML = APIExecute('sortcontacts', args);
	}
}
var ContactsListInst = new ContactListClass();
function jvviewjob(companyId, id, title, width)
{
	var args = APIExecute('getjobdescription', companyId + '\n' + id);
	var d = new OverlayDialog((title && title.length ? title : 'Job Description'));
	d.set_width((width ? width : 700));
	d.addRow(args);
	d.display();
}
var jvsource = '';
var jvprompttext = '';
function jvonchangesource(o)
{
	jvalertclear('Alert');
	var choices = document.getElementById('jvselectsourcechoices');
	index = o.selectedIndex - 1;
	if (index == -1)
	{
		choices.innerHTML = '';
		choices.style.display = 'none';
		return;
	}
	var info = jvsources[index];
	switch (info[0])
	{
		case 0x1000:
			var s = '';
			var subitems = info[2];
			if (subitems)
			{
				var selectedIndex = -1;
				var otherIndex = -1;
				s = '<table cellSpacing="0" cellPadding="0" width="100%" border="0"><tr><td class="jvcol1"></td><td><select class="jvdropdown" style="width: 250px" name="jvsubitems" id="jvsubitems" onchange="jvchangesubitems(this)">'
				if (!jvsource.length)
					s += '<option value="-1">Select...</option>';
				for (var i = 0; i < subitems.length; i++)
				{
					s += '<option value="' + i  + '">' + subitems[i][1] + '</option>';
					if (subitems[i][0] == 0x2000)
						otherIndex = i;
					else if (jvsource == subitems[i][1])
						selectedIndex = i;
				}
				if (!jvsource.length)
				{
					if (selectedIndex != -1)
						selectedIndex++;
					if (otherIndex != -1)
						otherIndex++;
				}
				s += '</select></td></tr><tr class="rowspace"><td><img src="' + jvbaseurl + '/images2/spix.gif" width="1" height="8"></td></tr></table><div id="jvinputfield" style="display: none"><table cellSpacing="0" cellPadding="0" width="100%" border="0"><tr><td id="jvinputname" class="jvcol1">&nbsp;</td><td><input type="text" style="width: 243px" name="jvname" id="jvname" value="" class="jvwatermarkclass" onfocus="jvonfocusname(this)" onblur="jvonblurname(this)"></td></tr></table></div>';
				choices.innerHTML = s;
				if (selectedIndex != -1)
					document.getElementById('jvsubitems').selectedIndex = selectedIndex;
				else if (jvsource.length && otherIndex != -1)
				{
					document.getElementById('jvsubitems').selectedIndex = otherIndex;
					jvchangesubitems(document.getElementById('jvsubitems'));
					document.getElementById('jvname').value = jvsource;
				}
				else
				{
					document.getElementById('jvsubitems').selectedIndex = 0;
					jvchangesubitems(document.getElementById('jvsubitems'));
				}
			}
			else
				choices.innerHTML = '';
			choices.style.display = 'inline';
			break;
		case 0x2000:
			jvprompttext = info[1];
			choices.innerHTML = '<table cellSpacing="0" cellPadding="0" width="100%" border="0"><tr><td class="jvcol1"></td><td><input type="text" style="width: 243px" name="jvname" id="jvname" value="' + (jvsource.length ? jvsource : jvprompttext) + '" class="' + (jvsource.length ? 'jvtext' : 'jvwatermarkclass') + '" onfocus="jvonfocusname(this)" onblur="jvonblurname(this)"></td></tr></table>';
			choices.style.display = 'inline';
			break;
		default:
			choices.innerHTML = '';
			choices.style.display = 'inline';
			break;
	}
	track();
}
function jvchangesubitems(o)
{
	jvalertclear('Alert');
	var choices = document.getElementById('jvinputfield');
	var i = o.value - 0;
	if (i != -1)
	{
		var info = jvsources[index][2][i];
		choices.style.display = (info[0] == 0x2000 ? 'inline' : 'none');
		if (info[0] == 0x2000)
		{
			jvprompttext = info[2];
			document.getElementById('jvname').value = jvprompttext;
			document.getElementById('jvname').className = 'jvwatermarkclass';
		}
	}
	else
		choices.style.display = 'none';
	track();
}
function jvonfocusname(o)
{
	if (o.className == 'jvwatermarkclass' && o.value == jvprompttext)
	{
		o.className = 'jvtext'; 
		o.value = '';         
	}
}
function jvonblurname(o)
{
	if (!o.value.length)
	{
		o.className = 'jvwatermarkclass'; 
		o.value = jvprompttext;        
	}
}
function jvgetpage(companyId, siteId, jobId, pageName, pageKind, section, parameters)
{
	return APIExecute('getcareerpage', companyId + '\n' + siteId + '\n' + jobId + '\n' + pageName + '\n' + pageKind + '\n' + section + '\n' + parameters + '\n' + jvurlargs.substring(1));
}
function jvtoggleliprofile(url) {
	var o = document.getElementById('jvliprofile');
	if (o != null)
	{
		var liWindow = window.open(url, "TwitterConnect");
		if (!liWindow)
			popupBlockerError();
	}
	                       
}

function jvshowli(show) {
	var o;
	o = document.getElementById('jvliprofile');
	if (o != null)
		o.style.display = (show ? 'inline' : 'none');
	o = document.getElementById('jvliopen');
	if (o != null)
		o.style.display = (show ? 'inline' : 'none');
	o = document.getElementById('jvliclosed');
	if (o != null)
		o.style.display = (!show ? 'inline' : 'none');
	if (typeof(jvresize) == 'function')
		jvresize();
}
function whatIsThisLinkedInProfile() {
    if (OverlayDialogInstance != null)
        OverlayDialogInstance.close();
    var d = new OverlayDialog('LinkedIn Profile');
    d.addRow('<div>It is possible to lookup your LinkedIn profile and submit it with your job application.</div>');
    d.addRowSpace();
    d.addRow('<div align="center">' + addButton('Cancel', 'OverlayDialogInstance.close()') + '</div>');
    d._width = 500;
    d.display();
}
function popupBlockerError() {
	if (OverlayDialogInstance != null)
		OverlayDialogInstance.close();
	var d = new OverlayDialog('Popup blocker detected');
	d.addRow('<div>Please disable the blocker to proceed.</div>');
	d.addRowSpace();
	d.addRow('<div align="center">' + addButton('Cancel', 'OverlayDialogInstance.close()') + '</div>');
	d._width = 500;
	d.display();
}
function jvtrim(s)
{
	var m = s.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return (m == null) ? "" : m[1];
}
function jvOnConnectLinkedIn(params)
{
	if (params)
	{
		jvOnConnectLinkedInNew(params.profile, false);
	}
}

// This is will fill the LIProfile section and fill the resume and other required fields from the LI profile data
//the new linked in button - called for both "attach linkedIn" and applywithLinkedIn
//in case of apply with LinkedIn- the bool value for "fillResumeSection" is true
//for attach LinkedIn Profile, the value is false
function jvOnConnectLinkedInNew(params, fillResumeSection)
{
	if (params)
	{
		var o;
		//fill the fields only when apply with LinkedIn not for attach LinkedIn
		//if(fillResumeSection)
		{
		    o = document.getElementById('jvfirstname');
		    if (o != null && o.value.length == 0)
			    o.value = params.person.firstName;
		    o = document.getElementById('jvlastname');
		    if (o != null && o.value.length == 0)
			    o.value = params.person.lastName;
    		
		    //fill email and phone
		    o = document.getElementById('jvemail');
		    if (o != null && o.value.length == 0)
			    o.value = params.person.emailAddress;
		    o = document.getElementById('jvphone');
		    if (o != null && o.value.length == 0)
		    {
		        if(params.person.phoneNumbers != null)
		        {
		            if(params.person.phoneNumbers.values.length > 0)
		            {
			            o.value = params.person.phoneNumbers.values[0].phoneNumber;
			        }
			    }
		    }
        }
		SetLIProfileDetails(params, 'jvliprofile', 'jvresume', fillResumeSection);
		
		//copy json to hidden field
		var jsonTextProfile = JSON.stringify(params);
		o = document.getElementById('jvLiCallbackProfile');
		if (o != null)
			o.value = jsonTextProfile;
		o = document.getElementById('jvincludelinkedinprofile');
		if (o != null)
			o.value = "1";
	    
	    //resize the iframe
	    if (typeof(jvresize3) == 'function' && typeof(donotresize) == 'undefined')
        jvresize3(false);
	}
}

function jvApplyWithLI(params)
{
	if (params)
	{
	    //add logic to fill the resume text and hide show logic
	}
}

//this is will delete the atttached LI profile and show the LI button
function removeLIProfile()
{
    var oLiProfile= document.getElementById("jvliprofile");
    if(oLiProfile)
    {
        oLiProfile.innerHTML= '';
        oLiProfile.style.display = 'none';
    }
     var oLiProfileRemove= document.getElementById("divRemoveLiProfile");
    if(oLiProfileRemove)
    {
        oLiProfileRemove.style.display = 'none';
    }
    var ojvAttachSocialProfileSection= document.getElementById("jvAttachSocialProfileSection");
    if(ojvAttachSocialProfileSection)
    {
        ojvAttachSocialProfileSection.style.display = 'inline';
    }
    //clear the saved profile json data in hidden field
    o = document.getElementById('jvLiCallbackProfile');
	if (o != null)
		o.value = '';
	o = document.getElementById('jvincludelinkedinprofile');
	if (o != null)
		o.value = "0";
	
	 //resize the iframe
	    if (typeof(jvresize3) == 'function' && typeof(donotresize) == 'undefined')
        jvresize3(false);
}

//method to fill the profile section and resume text box
function SetLIProfileDetails(profile, liProfileSection, resumeSection, fillResumeSection)
{
    var resume = '';
    if(profile.person != null)
    {
     var profileHtml=  '';
     
     profileHtml +=  '<strong>'+profile.person.firstName+' '+profile.person.lastName+'</strong><br/>';
     resume += profile.person.firstName+' '+profile.person.lastName;
     if(profile.person.headline != null && profile.person.headline.length>0)
     {
        profileHtml += '<strong>'+profile.person.headline+'</strong><br/>';
        resume += '\n'+profile.person.headline;
     }
     
     
     profileHtml +='<table cellspacing="0" cellpadding="0" width="100%" height="26" border="0">';
     
     //work history
     if(profile.person.positions != null && profile.person.positions.values !=null)
     {
	var currentHeader= false;
         for(i=0;i<profile.person.positions.values.length; i++)
         {
             if(profile.person.positions.values[i].isCurrent)
             {
		        if(currentHeader == false)
		        {
	                        profileHtml +='<tr><td valign="top"  style="font-weight:bold;">Current</td><td><ul>' ;
	                        resume += '\nCurrent';
			        currentHeader=true;
		        }
		        profileHtml +='<li>'+profile.person.positions.values[i].title;
		         resume += '\n'+profile.person.positions.values[i].title;
             }
         }
         if(i>0)
         profileHtml +='</ul></td></tr>';
         
         //for past
	var pastHeader= false;
         for(i=0;i<profile.person.positions.values.length; i++)
         {
             if(profile.person.positions.values[i].isCurrent == false)
             {
		        if(pastHeader == false)
		        {
	                        profileHtml +='<tr><td valign="top"  style="font-weight:bold;">Past</td><td><ul>';
	                        resume += '\n\nPast';
			        pastHeader= true;
		        }
		        profileHtml +='<li>'+profile.person.positions.values[i].title ;
		        resume += '\n'+profile.person.positions.values[i].title ;
             }
		
         }
         if(i>0)
         profileHtml +='</ul></td></tr>';
     }
     
     //education
     if(profile.person.educations != null && profile.person.educations.values != null)
     {
         profileHtml += '<tr><td valign=\"top\"  style=\"font-weight:bold;\">Education</td><td><ul>';
         resume += '\n\nEducation';
         for(i=0;i<profile.person.educations.values.length; i++)
         {
            profileHtml += '<li>'+ profile.person.educations.values[i].schoolName;
            resume += '\n'+profile.person.educations.values[i].schoolName;
         }
         profileHtml +="</ul></td></tr>";
     }
     
     //Recommendations
     if(profile.person.recommendationsReceived != null && profile.person.recommendationsReceived.values != null)
     {
         profileHtml += '<tr><td valign=\"top\"  style=\"font-weight:bold;\">Recommendations Received</td><td><ul>';
         resume += '\n\nRecommendations Received';
         for(i=0;i<profile.person.recommendationsReceived.values.length; i++)
         {
            profileHtml += '<li>'+ profile.person.recommendationsReceived.values[i].recommender.firstName +profile.person.recommendationsReceived.values[i].recommender.lastName;
            resume += '\n'+profile.person.recommendationsReceived.values[i].recommender.firstName +profile.person.recommendationsReceived.values[i].recommender.lastName;
         }
         profileHtml +="</ul></td></tr>";
     }
     
     //Patents
     if(profile.person.patents != null && profile.person.patents.values != null)
     {
         profileHtml +="<tr><td valign=\"top\"  style=\"font-weight:bold;\">Patents</td><td><ul>";
         resume += '\n\nPatents';
         for(i=0;i<profile.person.patents.values.length; i++)
         {
            profileHtml += '<li>'+ profile.person.patents.values[i].title;
            resume += '\n'+profile.person.patents.values[i].title;
         }
          profileHtml +="</ul></td></tr>";
          
     }
     profileHtml +="</table>";
     
     
      //summary 
      if(profile.person.summary != null && profile.person.summary.length>0)
      {
        profileHtml += '<br/><strong>Summary</strong><br/>'+profile.person.summary;
        resume += '\n\nSummary\n'+profile.person.summary;
      }
      if(profile.person.specialities != null && profile.person.specialities.length>0)
      {
        profileHtml += '<br/><br/><strong>Specialties</strong><br/><br/>'+profile.person.specialities;
        resume += '\n\nSpecialties\n'+profile.person.specialities;
      } 
        
      //work
      if(profile.person.positions != null && profile.person.positions.values != null)
    {
        profileHtml += '<br/><strong>Experience</strong>';
        resume += '\n\nExperience';
        for(i=0;i<profile.person.positions.values.length; i++)
        {
            if(profile.person.positions.values[i].title != null && profile.person.positions.values[i].title != '')
            {
                profileHtml += '<br/><br/><strong>'+ profile.person.positions.values[i].title +'</strong><br/>'
                resume += '\n'+ profile.person.positions.values[i].title+'\n';
            }
            if(profile.person.positions.values[i].company.name != null && profile.person.positions.values[i].company.name != '')
            {
                profileHtml +=  profile.person.positions.values[i].company.name+'<br/>'
                resume += profile.person.positions.values[i].company.name+'\n';
            }
            if(profile.person.positions.values[i].company.type != null || profile.person.positions.values[i].company.industry != null)
            {
                profileHtml += '(';
                resume += '(';
                if(profile.person.positions.values[i].company.type != null && profile.person.positions.values[i].company.type.length >0)
                {
                    profileHtml += profile.person.positions.values[i].company.type ;
                     resume += profile.person.positions.values[i].company.type ;
                }
                if(profile.person.positions.values[i].company.industry != null && profile.person.positions.values[i].company.industry.length >0)
                {
                    profileHtml += ';' + profile.person.positions.values[i].company.industry ;
                     resume += ';' + profile.person.positions.values[i].company.industry ;
                }
                 profileHtml += ')<br/>';
                 resume += ')\n';
            }
            if(profile.person.positions.values[i].startDate != null)
            {
                profileHtml += profile.person.positions.values[i].startDate.month + '/' + profile.person.positions.values[i].startDate.year + ' - ';
                resume += profile.person.positions.values[i].startDate.month + '/' + profile.person.positions.values[i].startDate.year + ' - ';
                if(profile.person.positions.values[i].endDate != null)
                {
                    profileHtml += profile.person.positions.values[i].endDate.month + '/' + profile.person.positions.values[i].endDate.year ;
                    resume += profile.person.positions.values[i].endDate.month + '/' + profile.person.positions.values[i].endDate.year ;
                }
                else
                {
                profileHtml += 'Present';
                resume += 'Present';
                }
            }
            if(profile.person.positions.values[i].summary != null)
           {
                profileHtml += "<br/>"+ profile.person.positions.values[i].summary;
                resume += "\n"+ profile.person.positions.values[i].summary;
           }
           
        }

    }
    
    //education details
    if(profile.person.educations != null && profile.person.educations.values != null)
    {
        profileHtml +='<br/><br/><strong>Education</strong><br/>';
        resume += '\n\nEducation\n';
       for(i=0;i< profile.person.educations.values.length; i++)
       {
            
            profileHtml += '<strong>'+profile.person.educations.values[i].schoolName+'</strong><br/>'
            resume += profile.person.educations.values[i].schoolName + '\n';
            if(profile.person.educations.values[i].degree != null || profile.person.educations.values[i].fieldOfStudy != null)
            {
                if(profile.person.educations.values[i].degree != null && profile.person.educations.values[i].degree.length > 0)
                {
                    profileHtml += profile.person.educations.values[i].degree;
                    resume += profile.person.educations.values[i].degree;
                }
                if(profile.person.educations.values[i].fieldOfStudy != null && profile.person.educations.values[i].fieldOfStudy.length > 0)
                {
                    profileHtml += ',' + profile.person.educations.values[i].fieldOfStudy + '<br/>';
                     resume += ',' + profile.person.educations.values[i].fieldOfStudy + '\n';
                }
                profileHtml += '<br/>';
                resume += '\n';
            }
       }
    }
       //recommendations
       if(profile.person.recommendationsReceived != null && profile.person.recommendationsReceived.values != null)
       {
          profileHtml += "<br/><strong>Recommendations</strong><br/>";
           resume += '\nRecommendations\n';
         for(i=0;i<profile.person.recommendationsReceived.values.length; i++)
         {
           // profileHtml += '<li>'+ profile.person.recommendationsReceived.values[i].recommender.firstName +profile.person.recommendationsReceived.values[i].recommender.lastName;
            
            profileHtml += "Recommendation Type : "+ profile.person.recommendationsReceived.values[i].recommendationType.code +" ,  Recommender : "+profile.person.recommendationsReceived.values[i].recommender.firstName+" "+profile.person.recommendationsReceived.values[i].recommender.lastName+ "</br>";
             resume += 'Recommendation Type : '+ profile.person.recommendationsReceived.values[i].recommendationType.code +' ,  Recommender : '+profile.person.recommendationsReceived.values[i].recommender.firstName+' '+profile.person.recommendationsReceived.values[i].recommender.lastName+ '\n';
            profileHtml += profile.person.recommendationsReceived.values[i].recommendationText;
             resume += profile.person.recommendationsReceived.values[i].recommendationText;
             resume += '\n\n';
            profileHtml +="<br/>";
            profileHtml +="<br/>";
            
         }
     }
     
     //patents
     if(profile.person.patents != null && profile.person.patents.values != null)
     {
         profileHtml += "<br/><strong>Patents</strong><br/>";
         resume += '\nPatents\n';
         for(i=0;i<profile.person.patents.values.length; i++)
         {
            profileHtml += "<strong>"+profile.person.patents.values[i].title+"</strong><br/>";
            resume += profile.person.patents.values[i].title + '\n';
         }
     }
     }
    
    //show liProfile div
    var oLiSection = document.getElementById(liProfileSection);
    if(oLiSection)
    {
        oLiSection.innerHTML = profileHtml;
        oLiSection.style.display = 'inline-block';
    }
    //show "remove linnk
     var oLiProfileRemove= document.getElementById("divRemoveLiProfile");
    if(oLiProfileRemove)
    {
        oLiProfileRemove.style.display = 'inline';
    }
    //hide "linkedIn" button (attach profile)
    var ojvAttachSocialProfileSection= document.getElementById("jvAttachSocialProfileSection");
    if(ojvAttachSocialProfileSection)
    {
        ojvAttachSocialProfileSection.style.display = 'none';
    }
    
        
    if(fillResumeSection)
     {
        var oResumeText = document.getElementById(resumeSection);
        if(oResumeText)
        {
            oResumeText.value = resume;
            if(document.getElementById('RemoveResume'))
		        document.getElementById('RemoveResume').style.display = 'inline';
		    if(document.getElementById('spnRemoveText'))
		        document.getElementById('spnRemoveText').innerHTML ="LinkedIn Profile added";
		    if(document.getElementById('spnRemoveLinkText'))
        document.getElementById('spnRemoveLinkText').innerHTML ="[remove]";
        }
        //hide the apply with section
         if(document.getElementById('jvApplyWithSection'))
            document.getElementById('jvApplyWithSection').style.display = 'none';
        //show the resume section
         if(document.getElementById('jvresume'))
         {
            document.getElementById('jvresume').style.display = 'inline';
            document.getElementById('jvresume').focus();
         }
        //set a flag to identify that the apply with was "resume".
        //show the resume section
         if(document.getElementById('jvApplyWithKind'))
            document.getElementById('jvApplyWithKind').value= '2';
     }
}

function jvOnConnectLinkedInAWLI(params, fillResumeSection) {
    if (params) {
        var o;
        //fill the fields only when apply with LinkedIn not for attach LinkedIn
        //if(fillResumeSection)
        {
            o = document.getElementById('jvfirstname');
            if (o != null && o.value.length == 0)
                o.value = params.firstName;
            o = document.getElementById('jvlastname');
            if (o != null && o.value.length == 0)
                o.value = params.lastName;

            //fill email and phone
            o = document.getElementById('jvemail');
            if (o != null && o.value.length == 0 && params.emailAddress != undefined)
                o.value = params.emailAddress;
            o = document.getElementById('jvphone');
            if (o != null && o.value.length == 0) {
                if (params != null && params.phoneNumbers != null) {
                    if (params.phoneNumbers._total > 0) {
                        o.value = params.phoneNumbers.values[0].phoneNumber;
                    }
                }
            }
        }
        SetLIProfileDetailsAWLI(params, 'jvliprofile', 'jvresume', fillResumeSection);

        //copy json to hidden field
        var jsonTextProfile = JSON.stringify(params);
        o = document.getElementById('jvLiCallbackProfile');
        if (o != null)
            o.value = jsonTextProfile;
        o = document.getElementById('jvincludelinkedinprofile');
        if (o != null)
            o.value = "1";

        //resize the iframe
        if (typeof (jvresize3) == 'function' && typeof (donotresize) == 'undefined')
            jvresize3(false);
    }
}

function SetLIProfileDetailsAWLI(profile, liProfileSection, resumeSection, fillResumeSection) {
    var resume = '';
    if (profile != null) {
        var profileHtml = '';

        profileHtml += '<strong>' + profile.firstName + ' ' + profile.lastName + '</strong><br/>';
        resume += profile.firstName + ' ' + profile.lastName;
        if (profile.headline != null && profile.headline.length > 0) {
            profileHtml += '<strong>' + profile.headline + '</strong><br/>';
            resume += '\n' + profile.headline;
        }


        profileHtml += '<table cellspacing="0" cellpadding="0" width="100%" height="26" border="0">';

        //work history
        if (profile.positions != null && profile.positions.values != null) {
            var currentHeader = false;
            for (i = 0; i < profile.positions.values.length; i++) {
                if (profile.positions.values[i].isCurrent) {
                    if (currentHeader == false) {
                        profileHtml += '<tr><td valign="top"  style="font-weight:bold;">Current</td><td><ul>';
                        resume += '\nCurrent';
                        currentHeader = true;
                    }
                    profileHtml += '<li>' + profile.positions.values[i].title;
                    resume += '\n' + profile.positions.values[i].title;
                }
            }
            if (i > 0)
                profileHtml += '</ul></td></tr>';

            //for past
            var pastHeader = false;
            for (i = 0; i < profile.positions.values.length; i++) {
                if (profile.positions.values[i].isCurrent == false) {
                    if (pastHeader == false) {
                        profileHtml += '<tr><td valign="top"  style="font-weight:bold;">Past</td><td><ul>';
                        resume += '\n\nPast';
                        pastHeader = true;
                    }
                    profileHtml += '<li>' + profile.positions.values[i].title;
                    resume += '\n' + profile.positions.values[i].title;
                }

            }
            if (i > 0)
                profileHtml += '</ul></td></tr>';
        }

        //education
        if (profile.educations != null && profile.educations.values != null) {
            profileHtml += '<tr><td valign=\"top\"  style=\"font-weight:bold;\">Education</td><td><ul>';
            resume += '\n\nEducation';
            for (i = 0; i < profile.educations.values.length; i++) {
                profileHtml += '<li>' + profile.educations.values[i].schoolName;
                resume += '\n' + profile.educations.values[i].schoolName;
            }
            profileHtml += "</ul></td></tr>";
        }

        //Recommendations
        if (profile.recommendationsReceived != null && profile.recommendationsReceived.values != null) {
            profileHtml += '<tr><td valign=\"top\"  style=\"font-weight:bold;\">Recommendations Received</td><td><ul>';
            resume += '\n\nRecommendations Received';
            for (i = 0; i < profile.recommendationsReceived.values.length; i++) {
                profileHtml += '<li>' + profile.recommendationsReceived.values[i].recommender.firstName + profile.recommendationsReceived.values[i].recommender.lastName;
                resume += '\n' + profile.recommendationsReceived.values[i].recommender.firstName + profile.recommendationsReceived.values[i].recommender.lastName;
            }
            profileHtml += "</ul></td></tr>";
        }

        //Patents
        if (profile.patents != null && profile.patents.values != null) {
            profileHtml += "<tr><td valign=\"top\"  style=\"font-weight:bold;\">Patents</td><td><ul>";
            resume += '\n\nPatents';
            for (i = 0; i < profile.patents.values.length; i++) {
                profileHtml += '<li>' + profile.patents.values[i].title;
                resume += '\n' + profile.patents.values[i].title;
            }
            profileHtml += "</ul></td></tr>";

        }
        profileHtml += "</table>";


        //summary 
        if (profile.summary != null && profile.summary.length > 0) {
            profileHtml += '<br/><strong>Summary</strong><br/>' + profile.summary;
            resume += '\n\nSummary\n' + profile.summary;
        }
        if (profile.specialities != null && profile.specialities.length > 0) {
            profileHtml += '<br/><br/><strong>Specialties</strong><br/><br/>' + profile.specialities;
            resume += '\n\nSpecialties\n' + profile.specialities;
        }

        //work
        if (profile.positions != null && profile.positions.values != null) {
            profileHtml += '<br/><strong>Experience</strong>';
            resume += '\n\nExperience';
            for (i = 0; i < profile.positions.values.length; i++) {
                if (profile.positions.values[i].title != null && profile.positions.values[i].title != '') {
                    profileHtml += '<br/><br/><strong>' + profile.positions.values[i].title + '</strong><br/>'
                    resume += '\n' + profile.positions.values[i].title + '\n';
                }
                if (profile.positions.values[i].company.name != null && profile.positions.values[i].company.name != '') {
                    profileHtml += profile.positions.values[i].company.name + '<br/>'
                    resume += profile.positions.values[i].company.name + '\n';
                }
                if (profile.positions.values[i].company.type != null || profile.positions.values[i].company.industry != null) {
                    profileHtml += '(';
                    resume += '(';
                    if (profile.positions.values[i].company.type != null && profile.positions.values[i].company.type.length > 0) {
                        profileHtml += profile.positions.values[i].company.type;
                        resume += profile.positions.values[i].company.type;
                    }
                    if (profile.positions.values[i].company.industry != null && profile.positions.values[i].company.industry.length > 0) {
                        profileHtml += ';' + profile.positions.values[i].company.industry;
                        resume += ';' + profile.positions.values[i].company.industry;
                    }
                    profileHtml += ')<br/>';
                    resume += ')\n';
                }
                if (profile.positions.values[i].startDate != null) {
                    profileHtml += profile.positions.values[i].startDate.month + '/' + profile.positions.values[i].startDate.year + ' - ';
                    resume += profile.positions.values[i].startDate.month + '/' + profile.positions.values[i].startDate.year + ' - ';
                    if (profile.positions.values[i].endDate != null) {
                        profileHtml += profile.positions.values[i].endDate.month + '/' + profile.positions.values[i].endDate.year;
                        resume += profile.positions.values[i].endDate.month + '/' + profile.positions.values[i].endDate.year;
                    }
                    else {
                        profileHtml += 'Present';
                        resume += 'Present';
                    }
                }
                if (profile.positions.values[i].summary != null) {
                    profileHtml += "<br/>" + profile.positions.values[i].summary;
                    resume += "\n" + profile.positions.values[i].summary;
                }

            }

        }

        //education details
        if (profile.educations != null && profile.educations.values != null) {
            profileHtml += '<br/><br/><strong>Education</strong><br/>';
            resume += '\n\nEducation\n';
            for (i = 0; i < profile.educations.values.length; i++) {

                profileHtml += '<strong>' + profile.educations.values[i].schoolName + '</strong><br/>'
                resume += profile.educations.values[i].schoolName + '\n';
                if (profile.educations.values[i].degree != null || profile.educations.values[i].fieldOfStudy != null) {
                    if (profile.educations.values[i].degree != null && profile.educations.values[i].degree.length > 0) {
                        profileHtml += profile.educations.values[i].degree;
                        resume += profile.educations.values[i].degree;
                    }
                    if (profile.educations.values[i].fieldOfStudy != null && profile.educations.values[i].fieldOfStudy.length > 0) {
                        profileHtml += ',' + profile.educations.values[i].fieldOfStudy + '<br/>';
                        resume += ',' + profile.educations.values[i].fieldOfStudy + '\n';
                    }
                    profileHtml += '<br/>';
                    resume += '\n';
                }
            }
        }
        //recommendations
        if (profile.recommendationsReceived != null && profile.recommendationsReceived.values != null) {
            profileHtml += "<br/><strong>Recommendations</strong><br/>";
            resume += '\nRecommendations\n';
            for (i = 0; i < profile.recommendationsReceived.values.length; i++) {
                // profileHtml += '<li>'+ profile.recommendationsReceived.values[i].recommender.firstName +profile.recommendationsReceived.values[i].recommender.lastName;

                profileHtml += "Recommendation Type : " + profile.recommendationsReceived.values[i].recommendationType.code + " ,  Recommender : " + profile.recommendationsReceived.values[i].recommender.firstName + " " + profile.recommendationsReceived.values[i].recommender.lastName + "</br>";
                resume += 'Recommendation Type : ' + profile.recommendationsReceived.values[i].recommendationType.code + ' ,  Recommender : ' + profile.recommendationsReceived.values[i].recommender.firstName + ' ' + profile.recommendationsReceived.values[i].recommender.lastName + '\n';
                profileHtml += profile.recommendationsReceived.values[i].recommendationText;
                resume += profile.recommendationsReceived.values[i].recommendationText;
                resume += '\n\n';
                profileHtml += "<br/>";
                profileHtml += "<br/>";

            }
        }

        //patents
        if (profile.patents != null && profile.patents.values != null) {
            profileHtml += "<br/><strong>Patents</strong><br/>";
            resume += '\nPatents\n';
            for (i = 0; i < profile.patents.values.length; i++) {
                profileHtml += "<strong>" + profile.patents.values[i].title + "</strong><br/>";
                resume += profile.patents.values[i].title + '\n';
            }
        }
    }

    //show liProfile div
    var oLiSection = document.getElementById(liProfileSection);
    if (oLiSection) {
        oLiSection.innerHTML = profileHtml;
        oLiSection.style.display = 'inline-block';
    }
    //show "remove linnk
    var oLiProfileRemove = document.getElementById("divRemoveLiProfile");
    if (oLiProfileRemove) {
        oLiProfileRemove.style.display = 'inline';
    }
    //hide "linkedIn" button (attach profile)
    var ojvAttachSocialProfileSection = document.getElementById("jvAttachSocialProfileSection");
    if (ojvAttachSocialProfileSection) {
        ojvAttachSocialProfileSection.style.display = 'none';
    }


    if (fillResumeSection) {
        var oResumeText = document.getElementById(resumeSection);
        if (oResumeText) {
            oResumeText.value = resume;
            if (document.getElementById('RemoveResume'))
                document.getElementById('RemoveResume').style.display = 'inline';
            if (document.getElementById('spnRemoveText'))
                document.getElementById('spnRemoveText').innerHTML = "LinkedIn Profile added";
            if (document.getElementById('spnRemoveLinkText'))
                document.getElementById('spnRemoveLinkText').innerHTML = "[remove]";
        }
        //hide the apply with section
        if (document.getElementById('jvApplyWithSection'))
            document.getElementById('jvApplyWithSection').style.display = 'none';
        //show the resume section
        if (document.getElementById('jvresume')) {
            document.getElementById('jvresume').style.display = 'inline';
            document.getElementById('jvresume').focus();
        }
        //set a flag to identify that the apply with was "resume".
        //show the resume section
        if (document.getElementById('jvApplyWithKind'))
            document.getElementById('jvApplyWithKind').value = '2';
    }
}

// implement JsonStringify serialization
function JsonStringify (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string"){
                v= v.replace(/"/g,'\\"');
                v = '"'+v+'"';
        }
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") {
                v= v.replace(/"/g,'\\"');
                v = '"'+v+'"';
        }
            else if (t == "object" && v !== null) v = JsonStringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};
function onConnectLinkedIn(args)
{
	o = document.getElementById('jvaction');
	if (o != null) {
		o.value = 'linkedinauth';
		o = document.getElementById('jvform');
		if (o != null)
			o.submit();
	}
}
var CalendarClassItem = null;
CalendarClass = function() 
{ 
	this._year = null;
	this._month = null;
	this._day = null;
	this._currentyear = null;
	this._currentmonth = null;
	this._selectedyear = null;
	this._selectedmonth = null;
	this._selectedday = null;
	this._baseyear = null;
	this._basemonth = null;
	this._baseday = null;
	this._calendarobject = null;
	this._calendarobject2 = null;
	this._callback = null;
	this._calendarmonthlist = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
}
function CalendarClassChange()
{
	if (CalendarClassItem)
		CalendarClassItem.calendarchange();
}
CalendarClass.prototype =
{
	calendaropen: function(o, o2, c) {
		CalendarClassItem = this;
		this._calendarobject = o;
		this._calendarobject2 = o2;
		this._callback = c;
		var dialog = new OverlayDialog();
		dialog.set_object(o);
		dialog.set_offsetx(0);
		dialog.set_offsety(2);
		dialog.displayContent(
			'<table id="calendar" class="calendar" cellpadding="0" cellspacing="0" border="0">' +
			'<tr>' +
			'<td align="center"><table cellpadding="0" cellspacing="0" border="0"><td id="calendar11"></td><td>' + addButtonSpace() + '</td><td id="calendar12" width="100%"></td><td id="calendar_closeCell"></td></tr></table></td>' +
			'</tr>' +
			'<tr>' +
			'<td colspan="2" id="calendar2" valign="top" align="center"></td>' +
			'</tr>' +
			'<tr>' +
			'<td colspan="2" align="center">' +
			'<table cellpadding="0" cellspacing="0" border="0">' +
			'<tr><td style="padding-bottom: 10px;">' +
			addButton('&lt;&lt;', 'CalendarClassItem.calendarprev()') + addButtonSpace() +
			addButton('Today', 'CalendarClassItem.calendartoday()') + addButtonSpace() +
			addButton('&gt;&gt;', 'CalendarClassItem.calendarnext()') +
			'</td></tr>' +
			'</table>' +
			'</td>' +
			'</tr>' +
			'</table>');
		var d = new Date();
		if (o.innerHTML.length && o.innerHTML.indexOf('specified') == -1) {
			try {
				d.setTime(Date.parse(o.innerHTML));
				this.calendarinit(d.getFullYear(), d.getMonth(), d.getDate());
			}
			catch (e) {
				this.calendarinit();
			}
		}
		else
			this.calendarinit();
		this.displayMonth(d.getFullYear(), d.getMonth());
	},
	calendarinit: function(y, m, d) {
		this._selectedyear = y;
		this._selectedmonth = m;
		this._selectedday = d;
		var d = new Date();
		this._year = d.getFullYear();
		this._month = d.getMonth();
		this._day = d.getDate();
		var o = document.getElementById('calendar11');
		var e = document.createElement('select');
		o.appendChild(e);
		e.id = 'calendarmonth';
		e.onchange = CalendarClassChange;
		for (var i = 0; i < this._calendarmonthlist.length; i++) {
			var opt = document.createElement('option');
			e.appendChild(opt);
			opt.innerHTML = this._calendarmonthlist[i];
			opt.value = i;
		}
		o = document.getElementById('calendar12');
		e = document.createElement('select');
		o.appendChild(e);
		e.id = 'calendaryear';
		e.onchange = CalendarClassChange;
		for (var i = 1950; i < this._year + 5; i++) {
			var opt = document.createElement('option');
			e.appendChild(opt);
			opt.innerHTML = i;
			opt.value = i;
		}
		o = document.getElementById('calendar_closeCell');
		anchor = document.createElement('a');
		anchor.onclick = this.calendarclose;
		anchor.href = 'javascript:void(0)';
		img = document.createElement('img');
		img.src = '../images2/dialog-close.gif';
		img.alt = 'Close';
		img.border = 0;
		anchor.appendChild(img);
		o.appendChild(anchor);

//		document.getElementById('popupalltable').onclick = this.calendarclose;
	},
	calendarclose: function() {
		if (OverlayDialogInstance)
			OverlayDialogInstance.close();
	},
	calendarchange: function() {
		this.displayMonth(document.getElementById('calendaryear').value - 0, document.getElementById('calendarmonth').value - 0);
	},
	displayMonth: function(y, m) {
		var d = new Date();
		d.setYear(y);
		d.setMonth(m);
		d.setDate(1);
		this._currentyear = y;
		this._currentmonth = m;
		document.getElementById('calendaryear').value = y;
		document.getElementById('calendarmonth').value = m;
		if (d.getDay() != 0)
			d.setTime(d.getTime() - d.getDay() * 24 * 60 * 60 * 1000);
		var nextMonth = (m < 11 ? m + 1 : 0);
		this._baseyear = d.getFullYear();
		this._basemonth = d.getMonth();
		this._baseday = d.getDate();
		var s = '<table cellpadding="0" cellspacing="0"><tr><td class="calendarheader">S</td><td class="calendarheader">M</td><td class="calendarheader">T</td><td class="calendarheader">W</td><td class="calendarheader">T</td><td class="calendarheader">F</td><td class="calendarheader">S</td></tr><tr><td colspan="7"><hr></td></tr>';
		var offset = 0;
		while (d.getMonth() != nextMonth) {
			s += '<tr>';
			for (var i = 0; i < 7; i++) {
				var classes = 'calendarcell';
				if (d.getMonth() == m)
					classes += ' calendarthismonth';
				if (d.getFullYear() == this._year && d.getMonth() == this._month && d.getDate() == this._day)
					classes += ' calendartoday';
				if (d.getFullYear() == this._selectedyear && d.getMonth() == this._selectedmonth && d.getDate() == this._selectedday)
					classes += ' calendarselected';
				s += '<td onclick=CalendarClassItem.calendarselect(' + offset++ + ') class="' + classes + '">' + d.getDate() + '</td>';
				d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
			}
			s += '</tr>';
		}
		s += '</table>';
		document.getElementById('calendar2').innerHTML = s;
	},
	calendarselect: function(o) {
		var d = new Date();
		d.setYear(this._baseyear);
		d.setMonth(this._basemonth);
		d.setDate(this._baseday);
		d.setTime(d.getTime() + o * 24 * 60 * 60 * 1000);
		var date = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
		if (this._calendarobject)
			this._calendarobject.innerHTML = date;
		if (this._calendarobject2)
			this._calendarobject2.value = date;
		if (this._callback)
			this._callback(date);
		this.calendarclose();
	},
	calendarprev: function() {
		if (this._currentmonth > 0)
			this._currentmonth--;
		else {
			this._currentyear--;
			this._currentmonth = 11;
		}
		this.displayMonth(this._currentyear, this._currentmonth);
	},
	calendarnext: function() {
		if (this._currentmonth < 11)
			this._currentmonth++;
		else {
			this._currentyear++;
			this._currentmonth = 0;
		}
		this.displayMonth(this._currentyear, this._currentmonth);
	},
	calendartoday: function() {
		this.displayMonth(this._year, this._month);
	}
}
var calendar = new CalendarClass();