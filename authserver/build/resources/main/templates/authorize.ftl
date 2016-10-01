<html>
<head>
<!-- <link rel="stylesheet" href="../css/wro.css"/> -->
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
			href="/css/bootstrap.min.css"
			integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
			crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet"
			href="css/bootstrap-theme.min.css"
			integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
			crossorigin="anonymous">


</head>
<body>
	<div class="container">
		<h2>Please Confirm</h2>

		<p>
			Do you authorize "${authorizationRequest.clientId}" at "${authorizationRequest.redirectUri}" to access your protected resources
			with scope ${authorizationRequest.scope?join(", ")}.
		</p>
		<form id="confirmationForm" name="confirmationForm"
			action="../oauth/authorize" method="post">
			<input name="user_oauth_approval" value="true" type="hidden" />
			<input type="hidden" id="csrf_token" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<button class="btn btn-primary" type="submit">Approve</button>
		</form>
		<form id="denyForm" name="confirmationForm"
			action="../oauth/authorize" method="post">
			<input name="user_oauth_approval" value="false" type="hidden" />
			<input type="hidden" id="csrf_token" name="${_csrf.parameterName}" value="${_csrf.token}"/>
			<button class="btn btn-primary" type="submit">Deny</button>
		</form>
	</div>
	<!-- <script src="../js/wro.js"	type="text/javascript"></script> -->
	<script src="js/jquery.min.js"></script>
					integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
    <script src="js/bootstrap.min.js"
            crossorigin="anonymous"></script>
</body>
</html>
