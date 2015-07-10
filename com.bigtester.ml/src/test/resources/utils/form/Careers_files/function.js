function forgotpw()
		{
		if (document.CandidateresumeLogin.Email.value.length < 1)
					{
						alert("Please enter a valid Email Address/Username to send the password.")
						document.CandidateresumeLogin.Email.focus();
						return false;
					}
		
			if(document.CandidateresumeLogin.Email.value.length > 0)
					{
						i =document.CandidateresumeLogin.Email.value.indexOf("@")
						j =document.CandidateresumeLogin.Email.value.indexOf(".",i)
						k =document.CandidateresumeLogin.Email.value.indexOf(",")
						kk =document.CandidateresumeLogin.Email.value.indexOf("  ")
						jj =document.CandidateresumeLogin.Email.value.lastIndexOf(".")+1
						len =document.CandidateresumeLogin.Email.value.length

						if((i>0) && (j > (i+1)) && (k==-1) && (len -jj >=2) && (len-jj<=3))
						{
							
							//document.Candidateresume.action='index.cfm?fuseaction=jobs.apply&preview=1';
								document.CandidateresumeLogin.action='index.cfm?fuseaction=512006.checkres&cfcend';
document.CandidateresumeLogin.checkextres.value=2;
							document.CandidateresumeLogin.submit();
							return true
						}
						else
						{
							alert( document.CandidateresumeLogin.Email.value + " is not a correct email format.")
							document.CandidateresumeLogin.Email.focus();
							return false
						}
					}
		
		}
		
		
		
		function checkres()
		{
		if (document.CandidateresumeLogin.Email.value.length < 1)
					{
						alert("Please enter a valid Email Address/Username.")
						document.CandidateresumeLogin.Email.focus();
						return false;
					}
		
			if(document.CandidateresumeLogin.Email.value.length > 0)
					{
						i =document.CandidateresumeLogin.Email.value.indexOf("@")
						j =document.CandidateresumeLogin.Email.value.indexOf(".",i)
						k =document.CandidateresumeLogin.Email.value.indexOf(",")
						kk =document.CandidateresumeLogin.Email.value.indexOf("  ")
						jj =document.CandidateresumeLogin.Email.value.lastIndexOf(".")+1
						len =document.CandidateresumeLogin.Email.value.length

						if((i>0) && (j > (i+1)) && (k==-1) && (len -jj >=2) && (len-jj<=3))
						{
							
							//document.Candidateresume.action='index.cfm?fuseaction=jobs.apply&preview=1';
								document.CandidateresumeLogin.action='index.cfm?fuseaction=83022.checkres&cfcend';
							//document.CandidateresumeLogin.checkextres.value=1;
							document.CandidateresumeLogin.submit();
							return true
						}
						else
						{
							alert( document.CandidateresumeLogin.Email.value + " is not a correct email format.")
							document.CandidateresumeLogin.Email.focus();
							return false
						}
					}
		
		}
		
		
	
		function checkresnew()
		{
		if (document.CheckLogin.Email.value.length < 1)
					{
						alert("Please enter a valid Email Address/Username.")
						document.CheckLogin.Email.focus();
						return false;
					}
		
			if(document.CheckLogin.Email.value.length > 0)
					{
						i =document.CheckLogin.Email.value.indexOf("@")
						j =document.CheckLogin.Email.value.indexOf(".",i)
						k =document.CheckLogin.Email.value.indexOf(",")
						kk =document.CheckLogin.Email.value.indexOf("  ")
						jj =document.CheckLogin.Email.value.lastIndexOf(".")+1
						len =document.CheckLogin.Email.value.length

						if((i>0) && (j > (i+1)) && (k==-1) && (len -jj >=2) && (len-jj<=3))
						{
							
							document.CheckLogin.submit();
							return true
						}
						else
						{
							alert( document.CheckLogin.Email.value + " is not a correct email format.")
							document.CheckLogin.Email.focus();
							return false
						}
					}
		
		}
	    
		
		
		
		
		
		
		function checkupdateuser()
		{
		
					pw1 = document.updateuser.passwd.value;
					pw2 = document.updateuser.passwd2.value;
	
	if (pw1 != pw2)
		{
		
		alert ("The Passwords you entered did not match. Please try again.")
		document.updateuser.passwd.value="";
		document.updateuser.passwd2.value="";
		document.updateuser.passwd.focus();		
		return false;
		}
	else 
		
		if(pw1.length >= 6 && pw2.length >= 6)
		{ 		 if (pw1.length >= 15 && pw2.length >= 15)
				{			
				alert("Password must not be longer than 15 characters.");
				return false; 
				}
				else
				{
				document.updateuser.submit();
				}
				
			}
		else				
		{ 
			alert("Password must be atleast 6 characters.");
			document.updateuser.passwd.value="";
			document.updateuser.passwd2.value="";
			document.updateuser.passwd.focus();		
		
			return false; 
		}		
			
		
		}
	
		
			function checklogindata()
		{
		if (document.CandidateresumeLogin.Email.value.length < 1)
					{
						alert("Please enter a valid Email Address.")
						document.CandidateresumeLogin.Email.focus();
						return false;
					}
		if (document.CandidateresumeLogin.password.value.length < 1)
					{
						alert("Please enter a valid Password.")
						document.CandidateresumeLogin.password.focus();
						return false;
					}
			if(document.CandidateresumeLogin.Email.value.length > 0)
					{
						i =document.CandidateresumeLogin.Email.value.indexOf("@")
						j =document.CandidateresumeLogin.Email.value.indexOf(".",i)
						k =document.CandidateresumeLogin.Email.value.indexOf(",")
						kk =document.CandidateresumeLogin.Email.value.indexOf("  ")
						jj =document.CandidateresumeLogin.Email.value.lastIndexOf(".")+1
						len =document.CandidateresumeLogin.Email.value.length

						if((i>0) && (j > (i+1)) && (k==-1) && (len -jj >=2) && (len-jj<=3))
						{
							
							//document.Candidateresume.action='index.cfm?fuseaction=jobs.apply&preview=1';
								
							document.CandidateresumeLogin.submit();
							return true;
						}
						else
						{
							alert( document.CandidateresumeLogin.Email.value + " is not a correct email format.")
							document.CandidateresumeLogin.Email.focus();
							return false;
						}
					}
		
		}
		
		
		

			function checkdate(objName, currdate)
			{
				
				var datefield = objName;
				if (datefield.value.length > 0)
				{
					if (chkdate(objName) == false)
					{
						alert("That date format must be in  mm/dd/yyyy.");
						datefield.value = currdate;
						datefield.focus();
						datefield.select();
						return false;
					}
					else
					{
						return true;
					}
				}
			}

			function chkdate(objName)
			{
				var strDatestyle = "US"; 
				var strDate;
				var strDateArray;
				var strDay;
				var strMonth;
				var strYear;
				var intday;
				var intMonth;
				var intYear;
				var booFound = false;
				var datefield = objName;
				var strSeparatorArray = new Array("-"," ","/",".");
				var intElementNr;
				var err = 0;
				var strMonthArray = new Array(12);
				strMonthArray[0] = "Jan";
				strMonthArray[1] = "Feb";
				strMonthArray[2] = "Mar";
				strMonthArray[3] = "Apr";
				strMonthArray[4] = "May";
				strMonthArray[5] = "Jun";
				strMonthArray[6] = "Jul";
				strMonthArray[7] = "Aug";
				strMonthArray[8] = "Sep";
				strMonthArray[9] = "Oct";
				strMonthArray[10] = "Nov";
				strMonthArray[11] = "Dec";
				strDate = datefield.value;

				reDate = /^[0-9]{1,2}\/{1}[0-9]{1,2}\/{1}[0-9]{4}$/

				if (!(reDate.test(strDate)))
				{
					err = 99;
					return false;
				}

				if (strDate.length < 5)
				{	return false;}

				for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++)
				{
					if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1)
					{
						strDateArray = strDate.split(strSeparatorArray[intElementNr]);
						if (strDateArray.length != 3)
						{
							err = 1;
							return false;
						}
						else
						{
							strMonth = strDateArray[0];
							strDay = strDateArray[1];
							strYear = strDateArray[2];
						}
						booFound = true;
					}
				}
				if (booFound == false)
				{
					if (strDate.length > 5)
					{
						strMonth = strDate.substr(0, 2);
						strDay = strDate.substr(2, 2);
						strYear = strDate.substr(4);
				   	}
				}
				if (strYear.length == 2)
				{
					strYear = '20' + strYear;
				}
				intday = parseInt(strDay, 10);
				if (isNaN(intday))
				{

				}
				intMonth = parseInt(strMonth, 10);
				if (isNaN(intMonth))
				{
					for (i = 0;i<12;i++)
					{
						if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase())
						{alert(strMonth.toUpperCase());
							intMonth = i+1;
							strMonth = strMonthArray[i];
							i = 12;
				  	}
					}
					if (isNaN(intMonth))
					{
						err = 3;
						return false;
					}
				}
				intYear = parseInt(strYear, 10);
				if (isNaN(intYear))
				{
					err = 4;
					return false;
				}
				if (strYear > 2025 || strYear < 1960)
				{
					err = 4;
					return false;
				}
				if (intMonth>12 || intMonth<1)
				{
					err = 5;
					return false;
				}
				if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1))
				{
					err = 6;
					return false;
				}
				if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1))
				{
					err = 7;
					return false;
				}
				if (intMonth == 2)
				{
					if (intday < 1)
					{
						err = 8;
						return false;
					}
					if (LeapYear(intYear) == true)
					{
						if (intday > 29)
						{
							err = 9;
							return false;
						}
					}
					else
					{
						if (intday > 28)
						{
							err = 10;
							return false;
						}
					}
				}
				datefield.value = intMonth + "/" + intday+"/" + strYear;
				return true;
			}

			function LeapYear(intYear)
			{
				if (intYear % 100 == 0)
				{
					if (intYear % 400 == 0)
						{ return true; }
				}
				else
				{
					if ((intYear % 4) == 0)
						{ return true; }
				}
				return false;
			}

				function checkData()
				{
					pw1 = document.Candidateresume.passwd.value;
					pw2 = document.Candidateresume.passwd2.value;
	
	if (pw1 != pw2)
		{
		
		alert ("The Passwords you entered did not match. Please try again.")
		document.Candidateresume.passwd.value="";
		document.Candidateresume.passwd2.value="";
		document.Candidateresume.passwd.focus();		
		return false;
		}
	else 
		
		if(pw1.length >= 6 && pw2.length >= 6)
		{ 		 if (pw1.length >= 15 && pw2.length >= 15)
				{			
				alert("Password must not be longer than 15 characters.");
				return false; 
				}
				
				
			}
		else				
		{ 
			alert("Password must be atleast 6 characters.");
			document.Candidateresume.passwd.value="";
			document.Candidateresume.passwd2.value="";
			document.Candidateresume.passwd.focus();	
			return false; 
		}				
				
					if(document.Candidateresume.CandidateFName.value.length == 0)
					{
						alert("Please enter your First Name.")
						document.Candidateresume.CandidateFName.focus();
						return false;
					}
					if(document.Candidateresume.CandidateLName.value.length == 0)
					{
						alert("Please enter your Last Name.")
						document.Candidateresume.CandidateLName.focus();
						return false;
					}
					if (document.Candidateresume.CanAddress.value.length < 1)
					{
						alert("Please enter your Street Address.")
						document.Candidateresume.CanAddress.focus();
						return false;
					}

					if (document.Candidateresume.City.value.length < 1)
					{
						alert("Please enter your City.")
						document.Candidateresume.City.focus();
						return false;
					}
					if (document.Candidateresume.State.value.length < 2)
					{
						alert("Please enter a State/Province.")
						document.Candidateresume.State.focus();
						return false;
					}	
					if (document.Candidateresume.Zip.value.length < 1)
					{
						alert("Please enter your Zip or Postal Code.")
						document.Candidateresume.Zip.focus();
						return false;
					}

					if (document.Candidateresume.Email.value.length < 1)
					{
						alert("Please enter a valid Email Address.")
						document.Candidateresume.Email.focus();
						return false;
					}

					if (document.Candidateresume.primphone.value.length < 1)
					{
						alert("Please enter a Primary Contact Phone Number.")
						document.Candidateresume.homephone.focus();
						return false;
					}

					if (document.Candidateresume.resumebody.value.length < 1)
					{
						alert("Please enter your Resume Body, Skills, and Experience.")
						document.Candidateresume.resumebody.focus();
						return false;
					}
					
					/*if (document.Candidateresume.UScitizen.value.length < 1)
					{
						alert("Please enter Work Authorization.")
						document.Candidateresume.UScitizen.focus();
						return false;
					}*/
					
					if (document.Candidateresume.Salary.value.length < 1)
					{
						alert("Please enter Minimum Salary Requirement.")
						document.Candidateresume.Salary.focus();
						return false;
					}
					
						if (document.Candidateresume.howsource.value == "NA")
					{
						alert("Please enter How Did You Hear About Us.")
						document.Candidateresume.howsource.focus();
						return false;
					}
					
					
					if ((document.Candidateresume.howsource.value == "Other  (Please specify:)") && (document.Candidateresume.howdoyousp.value.length < 1 ))
					{
						alert("Please enter Specify How Did You Hear About Us.")
						document.Candidateresume.howdoyousp.focus();
						return false;
					}
					
					if ((document.Candidateresume.country.value == "US.") || ( document.Candidateresume.country.value == "CA." ))
					{
						if (document.Candidateresume.Zip.value.length < 5)
							{
							alert("You must enter a valid Zip/ Postal Code.")
							document.Candidateresume.Zip.focus();
							return false;
							}
					}
					
				/*	if (document.Candidateresume.sklkeyword.value.length < 1)
					{
						alert("Please enter your Skills and Experience Keyword.")
						document.Candidateresume.sklkeyword.focus();
						return false;
					}
					*/
					if(document.Candidateresume.Email.value.length > 0)
					{
						i =document.Candidateresume.Email.value.indexOf("@")
						j =document.Candidateresume.Email.value.indexOf(".",i)
						k =document.Candidateresume.Email.value.indexOf(",")
						kk =document.Candidateresume.Email.value.indexOf("  ")
						jj =document.Candidateresume.Email.value.lastIndexOf(".")+1
						len =document.Candidateresume.Email.value.length

						if((i>0) && (j > (i+1)) && (k==-1) && (len -jj >=2) && (len-jj<=3))
						{
							
							//document.Candidateresume.action='index.cfm?fuseaction=jobs.apply&preview=1';
								document.Candidateresume.preview.value=1;
							document.Candidateresume.submit();
							return true;
						}
						else
						{
							alert( document.Candidateresume.Email.value + " is not a correct email format.")
							document.Candidateresume.Email.focus();
							return false;
						}
					}
				}

	function checkData2()
				{
					
				
					if(document.Candidateresume.CanName.value.length == 0)
					{
						alert("Please enter your  Name.")
						document.Candidateresume.CandidateFName.focus();
						return false;
					}
					
					if (document.Candidateresume.CanAddress.value.length < 1)
					{
						alert("Please enter your Street Address.")
						document.Candidateresume.CanAddress.focus();
						return false;
					}

					if (document.Candidateresume.City.value.length < 1)
					{
						alert("Please enter your City.")
						document.Candidateresume.City.focus();
						return false;
					}
					if (document.Candidateresume.State.value.length < 2)
					{
						alert("Please enter a State/Province.")
						document.Candidateresume.State.focus();
						return false;
					}	
					if (document.Candidateresume.Zip.value.length < 1)
					{
						alert("Please enter your Zip or Postal Code.")
						document.Candidateresume.Zip.focus();
						return false;
					}

					

					if (document.Candidateresume.homephone.value.length < 1)
					{
						alert("Please enter a Primary Contact Phone Number.")
						document.Candidateresume.homephone.focus();
						return false;
					}

					if (document.Candidateresume.Resumebody.value.length < 1)
					{
						alert("Please enter your Resume Body, Skills, and Experience.")
						document.Candidateresume.Resumebody.focus();
						return false;
					}
					
					/*if (document.Candidateresume.UScitizen.checked < 1)
					{
						alert("Please enter Work Authorization.")
						document.Candidateresume.UScitizen.focus();
						return false;
					}*/
					
					if (document.Candidateresume.Salary.value.length < 1)
					{
						alert("Please enter Minimum Salary Requirement.")
						document.Candidateresume.Salary.focus();
						return false;
					}
					
					

				/*	if ((document.Candidateresume.country.value == "US.") || ( document.Candidateresume.country.value == "CA." ))
					{
						if (document.Candidateresume.Zip.value.length < 5)
							{
							alert("You must enter a valid Zip/ Postal Code.")
							document.Candidateresume.Zip.focus();
							return false;
							}
					}
					
					if (document.Candidateresume.sklkeyword.value.length < 1)
					{
						alert("Please enter your Skills and Experience Keyword.")
						document.Candidateresume.sklkeyword.focus();
						return false;
					}*/
					
					
					document.Candidateresume.submit();
					
				}


function checkDataResume()
				{
					
				
				

					if (document.Candidateresume.Resumebody.value.length < 1 && document.Candidateresume.Resumebody2.value == "")
					{
						alert("Please enter your Resume Body, Skills, and Experience.")
						document.Candidateresume.Resumebody.focus();
						return false;
					}
					
					/*if (document.Candidateresume.UScitizen.checked < 1)
					{
						alert("Please enter Work Authorization.")
						document.Candidateresume.UScitizen.focus();
						return false;
					}*/
					
					if (document.Candidateresume.Salary.value.length < 1)
					{
						alert("Please enter Minimum Salary Requirement.")
						document.Candidateresume.Salary.focus();
						return false;
					}
					
					

					
					
					/*if (document.Candidateresume.sklkeyword.value.length < 1)
					{
						alert("Please enter your Skills and Experience Keyword.")
						document.Candidateresume.sklkeyword.focus();
						return false;
					}*/
					
					
					document.Candidateresume.submit();
					
				}

function checkDataContact()
				{
					
				
					if(document.Candidateresume.CanFirstName.value.length == 0)
					{
						alert("Please enter your First Name.")
						document.Candidateresume.CanFirstName.focus();
						return false;
					}
					
					if(document.Candidateresume.CanLastName.value.length == 0)
					{
						alert("Please enter your Last Name.")
						document.Candidateresume.CanLastName.focus();
						return false;
					}
					
					if (document.Candidateresume.CanAddress.value.length < 1)
					{
						alert("Please enter your Street Address.")
						document.Candidateresume.CanAddress.focus();
						return false;
					}

					if (document.Candidateresume.City.value.length < 1)
					{
						alert("Please enter your City.")
						document.Candidateresume.City.focus();
						return false;
					}
					if (document.Candidateresume.State.value.length < 2)
					{
						alert("Please enter a State/Province.")
						document.Candidateresume.State.focus();
						return false;
					}	
					if (document.Candidateresume.Zip.value.length < 1)
					{
						alert("Please enter your Zip or Postal Code.")
						document.Candidateresume.Zip.focus();
						return false;
					}

					

					if (document.Candidateresume.homephone.value.length < 1)
					{
						alert("Please enter a Primary Contact Phone Number.")
						document.Candidateresume.homephone.focus();
						return false;
					}

				
					
					
					

					if ((document.Candidateresume.country.value == "US.") || ( document.Candidateresume.country.value == "CA." ))
					{
						if (document.Candidateresume.Zip.value.length < 5)
							{
							alert("You must enter a valid Zip/ Postal Code.")
							document.Candidateresume.Zip.focus();
							return false;
							}
					}
					
					
					
					document.Candidateresume.submit();
					
				}
