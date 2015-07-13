$(document).ready(function() {
	
	$("#li_resume_list_view").qtip({ 
		content: "<strong>Name Only View</strong><br />This is the original view of your resumes as a list of names, ordered by date submitted.",
		style: 'resumator' });
		
	$("#li_resume_wmyu_view").qtip({ 
		content: "<strong>&ldquo;What makes you unique?&rdquo; View</strong><br />View each applicant's answer to the WMYU? question (if provided)., add the \"WMYU?\" optional field to your job listing.",
		style: 'resumator' });
	
	$("#watch, #btn_watch").qtip({ 
		content: "<strong>Watch the activity with this applicant</strong><br />Spend less time tracking applicants by using the Watch feature. Watched applicants can be quickly accessed from the Dashboard.",
		style: 'resumator' });
		
	$("#btn_pipl").qtip({ 
		content: "<strong>Look for this applicant on the Web</strong><br />Pipl.com will perform an instant Web search for this applicant and find social network profiles, personal websites, blogs, court records and numerous other sources of background information.",
		style: 'resumator' });
	
	$("#btn_indeed").qtip({ 
		content: "<strong>Get average salaries near this applicant</strong><br />Indeed.com will instantly show you the average salaries for your job(s) in this applicant&rsquo;s location. Use this service to anticipate desired salary and gauge your offer so it is competitive.",
		style: 'resumator' });
	
	$("#btn_unwatch").qtip({ 
		content: "<strong>Stop watching this applicant</strong><br />Remove this applicant from your Watch List and stop receiving updates.",
		style: 'resumator' });
		
	/*
	$("#btn_bambooHR").qtip({ 
		content: "<strong>Export applicant to BambooHR</strong><br />Our partner BambooHR helps you manage your employee information (benefits, training, etc). Click this link to download a CSV file for this applicant that is ready for importing in your BambooHR account.",
		style: 'resumator' });*/
			
	$("#whats_hub").qtip({ 
		content: "A <strong>client hub</strong> provides your clients with a secure, private location on the Web for collaborating with you. Clients can submit jobs to you, approve job postings, review resumes you share, and submit feedback on those resumes.",
		style: 'resumator' });
	
	$("#wmyu_desc").qtip({ 
		content: "<strong>What Makes You Unique?</strong><br />Our WMYU question asks the applicant to provide a creative answer to what makes them stand out in a crowd. You can use these responses to find interesting applicants more quickly when browsing resumes.",
		style: 'resumator' });
		
	$("#help_workflow").qtip({ 
		content: "<strong>What's a Workflow?</strong><br />A workflow is a specific set of steps (or statuses) that you will use to track applicants. You can use the Standard Workflow for this job, or Admins can create custom workflows in the Settings section.",
		style: 'resumator' });
		
	$("#inbox").qtip({ 
		content: "<strong>Your dashboard inbox</strong><br />Whenever an applicant sends you a message using Jazz, the new message will appear here so you can be sure to send a timely reply.",
		style: 'resumator' });
		
	$("#jobnosis_pct30 a").qtip({ 
		content: "<strong>30 or Below is VERY BAD</strong><br />We cannot send these jobs to free jobs because they will not be accepted. It is likely very few applicants will apply to this job as written.",
		style: 'resumator' });	
	
	$("#jobnosis_pct50 a").qtip({ 
		content: "<strong>50 or Below is BAD</strong><br />Your job listing is probably poorly written, poorly formatted, and will likely not attract many qualified applicants. Job boards will likely mark it as spam.",
		style: 'resumator' });
		
	$("#jobnosis_pct70 a").qtip({ 
		content: "<strong>70 or Above is GOOD</strong><br />Your job listing appears to be well written, properly formatted and will likely be accepted by free job boards. We may have a few suggestions for improvements.",
		style: 'resumator' });	
	
	$("#jobnosis_pct90 a").qtip({ 
		content: "<strong>90 or Above is EXCELLENT</strong><br />Your job listing appears to be flawless. Every job you post should be rewritten to earn a score this high.",
		style: 'resumator' });

	$("#bundle_recruiting").qtip({ 
		content: "<span class='t14'><strong>Recruiting Bundle</strong></br>The core features giving you a powerful recruiting platform. Post jobs, review resumes, and make great new hires!</span>",
		style: 'resumator' });
		
	$("#bundle_performance").qtip({ 
		content: "<span class='t14'><strong>Performance Bundle</strong></br>Track and optimize your recruiting efforts using built-in reports and analytics, or build your own through Google Analytics.<br /><br /><strong>Call 1-888-353-0887 for quote.</strong></span>",
		style: 'resumator' });
		
	$("#bundle_integration").qtip({ 
		content: "<span class='t14'><strong>Integration Bundle</strong></br>Integrate your Jazz account with third party services such as Google Apps, Outlook, OneLogin and paid job boards.<br /><br /><strong>Call 1-888-353-0887 for quote.</strong></span>",
		style: 'resumator' });
		
	$("#bundle_customization").qtip({ 
		content: "<span class='t14'><strong>Customization Bundle</strong></br>Get a level of customization you&rsquo;ve never seen before, including your job application, job workflows, message templates and careers website.<br /><br /><strong>Call 1-888-353-0887 for quote.</strong></span>",
		style: 'resumator' });
		
	$("#bundle_communications").qtip({ 
		content: "<span class='t14'><strong>Communications Bundle</strong></br>Get more powerful team and applicant communication using teams and user permissions, a contact manager and batch emailing tools for applicants.<br /><br /><strong>Call 1-888-353-0887 for quote.</strong></span>",
		style: 'resumator' });

	$(".draft_evaluation_tooltip").qtip({ 
		content: "<strong>Draft evaluation</strong><br />This evaluation has been started but not submitted.",
		style: 'resumator' });
		
	$("#expired_password_tooltip").qtip({ 
		content: "<strong>Password Expiration</strong><br />Set the number of days (1-365) before users' passwords expire. Leave the field blank to disable this feature.<br /><br />When a user's password expires he or she will be forced to set a new password.",
		style: 'resumator' });
	
	$(".cannot_archive_workflow").qtip({
		content:	"<strong>Why can't I delete this?</strong><br />" + 
					"A workflow can only be deleted when it is detached from all jobs, even if the jobs are marked as closed.<br /><br />" +
					"To delete, first detach this workflow from all existing jobs.",
		style:		"resumator"
	});

	$(".cannot_delete_group").qtip({
		content:	"<strong>Why can't I delete this?</strong><br />" + 
					"A Group can only be deleted when it is not part of Hiring Team.<br /><br />" +
					"To delete, first remove this Group from all existing Hiring Teams.",
		style:		"resumator"
	});
});
