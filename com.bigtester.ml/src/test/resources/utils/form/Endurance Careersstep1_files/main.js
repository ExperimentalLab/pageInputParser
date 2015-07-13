jQuery(function() {

		$('a#vetStatusAnchor').bind('click', function() {
			ColdFusion.Window.show('vetStatusWindow');
		});
		
		$('a#vetStatusPREAnchor').bind('click', function() {
			ColdFusion.Window.show('vetStatusPREWindow');
		});

		if (displayTimeWarning) {
			$('body').addClass("showJsTimeout"); // class is added dynamically because of client site wraps which may define their own <body>
		}
		
		var showJsTimeout = $(document.body).hasClass("showJsTimeout");
		
		if (showJsTimeout) {
			TimeOutMinutes = timeoutSeconds/60;
			WarningThreshold = timeoutWarningSeconds/60;
			StartTime = new Date();
			StartMils = Date.parse(StartTime.toLocaleString());
			TimeOutMils = StartMils + (60000 * TimeOutMinutes);
			ThresholdMils = 60000 * WarningThreshold;
			timerLoop = 0;
			redirectUser = false;
			
			function CountDown(){
						
				clearTimeout(timerLoop);
				CurrentTime = new Date();
				CurrentMils = Date.parse(CurrentTime.toLocaleString());
				RemainingMils = TimeOutMils - CurrentMils;
							
				if(redirectUser && RemainingMils <= 0) { // times up redirect user back to login page
					if(isCandidateLoggedIn) { 
						window.location.href = "index.cfm?fuseaction=app.candidatelogout&jobid=0&clicked=true&company_id=" + companyId + "&version=" + ep_version;
					} else {
						window.location.href = "index.cfm?fuseaction=app.welcome&company_id=" + companyId + "&version=" + ep_version;
					}
				}
				
				if (RemainingMils <= ThresholdMils) {
					redirectUser = true;
					timerLoop = setTimeout(CountDown, 10000);
					$("#dialog-confirm").dialog({
						dialogClass: "no-close",
						resizable: false,
						draggable: false,
						height: 175,
						width: 400,
						modal: true,
						close: function(event, ui){
							redirectUser = false;
						},
						buttons: [{
							text: "OK",
							click: function(){
								$.ajax({
									url: "/epostings/index.cfm&company_id=" + companyId + "&version=" + ep_version
								});
								
								StartTime = new Date();
								StartMils = Date.parse(StartTime.toLocaleString());
								TimeOutMils = StartMils + (60000 * TimeOutMinutes);								
								$(this).dialog("close");
							}
						}]
					});
					
				}
				else {
					timerLoop = setTimeout(CountDown, 10000);
				}
			}
			// run CountDown for the first time
			CountDown();
		}

});
