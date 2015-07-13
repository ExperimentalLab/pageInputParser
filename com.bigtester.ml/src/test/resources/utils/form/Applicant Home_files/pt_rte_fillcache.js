PTRTEFillcache = function (URI,UrlID,UrlRepository,EditorField,DisplayOnly)
{
	var EditorString ="";
	var psSiteName="";
	var DatafromXML="";
	var EditorId = EditorField;
	var temp="";
	var newdiv = document.createElement('div');
	var divIdName = 'PTRTE_'+EditorId;
	var dblocation=UrlRepository.split("record://");

	if (DisplayOnly == 1)
		EditorString = document.getElementById(EditorField).innerHTML;
	else
		EditorString = document.getElementById(EditorField).value; 
	
	newdiv.setAttribute('id',divIdName);
	newdiv.setAttribute('style','none');
	newdiv.innerHTML = EditorString;
	var images = newdiv.getElementsByTagName('img' );
	var imgStr="";
	var URLocTemp=URI.split("/");
	var URLoc="";
	var ImageSource = "";
	var imageNew = "";
	var img = "";

	// Loop through all <img> elements.
	if (dblocation[1])
	{
		for ( var ii = 0 ; ii < (URLocTemp.length-1) ; ii++ )
		{
			if (ii != (URLocTemp.length-2) && ii != 3)
			{
			  URLoc=URLoc+URLocTemp[ii]+"/";
			}
			if(ii==3)
			{
			  URLoc=URLoc+"psc"+"/";
			}
			if(ii==4)
		    {
 		      psSiteName = URLocTemp[ii]
 		      psSiteName = psSiteName.substring(0,psSiteName.length-7);
		    }
		}
		for ( var i = 0 ; i < images.length ; i++ )
		{
			var img = images[i];
			var tempname= images[i].id;
			var tempval=tempname.split("###");
			var ImgID=tempval[0];
			var filename=tempval[1];

			if(UrlID == ImgID)
			{
				imgStr=imgStr+"&Params="+filename;
				ImageSource=img.src.split("/");
				imageNew = "/cs/"+psSiteName+"/cache/"+ImageSource[ImageSource.length-1];		
				img.setAttribute("oracletempimagesrc",imageNew);
				img.removeAttribute("src");
			}
			
		}
		// call to upload
		if(imgStr != "")
		{
			var xmlHttpReq = false;
			var self = this;
			var BeforeParse= newdiv.innerHTML;
			var textAreaValue = BeforeParse.replace(new RegExp("oracletempimagesrc", "gi"), "src");
			
			URLoc=URLoc+"s/WEBLIB_PTRTE.ISCRIPT1.FieldFormula.IScript_RTE_IMAGE_ATTACH?URL="+dblocation[1]+imgStr;

			// Mozilla/Safari
			if (window.XMLHttpRequest) { 
				  self.xmlHttpReq = new XMLHttpRequest();
			} 
			// IE
			else if (window.ActiveXObject) {
				  self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			}
			self.xmlHttpReq.open('POST', URLoc, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.onreadystatechange = function() {
				  if (self.xmlHttpReq.readyState == 4) {
							temp = self.xmlHttpReq.responseText;
						}
			}
			self.xmlHttpReq.send(null);
			return textAreaValue;
		}
		else
			return EditorString;
	}
	else
		return EditorString;

}
	
replaceImageSource = function (instanceName)
{

	var EditorString = "";

	if (CKEDITOR.instances[instanceName].checkDirty())
	{
		if (document.getElementById(instanceName).type == 'textarea')
		{
			EditorString = CKEDITOR.instances[instanceName].getData();
		}
		else
		{
		        EditorString = document.getElementById(instanceName).innerHTML;
		}

		updateTextArea(EditorString,CKEDITOR.instances[instanceName]); 
	}
}

updateTextArea = function(textareaValue,instanceName)
{
	var element = instanceName.element;
	if ( element && instanceName.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE )
	{
		if ( element.is( 'textarea' ) )
			element.setValue( textareaValue );
		else
			element.setHtml( textareaValue );
	}
}