<#--<!DOCTYPE html>-->
<#--<html >-->
<#--<head>-->
    <#--<meta charset="UTF-8">-->
    <#--<title>Sign-Up/Login Form</title>-->
    <#--<link href='http://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>-->

    <#--<link rel="stylesheet" href="css/normalize.css">-->


    <#--<link rel="stylesheet" href="css/style.css">-->

	<#--<link rel="stylesheet"-->
	<#--href="css/bootstrap.min.css"-->
	<#--integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"-->
	<#--crossorigin="anonymous">-->

	<#--<!-- Optional theme &ndash;&gt;-->
	<#--<link rel="stylesheet"-->
	<#--href="css/bootstrap-theme.min.css"-->
	<#--integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"-->
	<#--crossorigin="anonymous">-->





<#--</head>-->

<#--<body>-->

<#--<div class="form">-->

    <#--<ul class="tab-group">-->
        <#--<li class="tab"><a href="#login">Log In</a></li>-->
        <#--<li class="tab active"><a href="#signup">Sign Up</a></li>-->
    <#--</ul>-->

    <#--<div class="tab-content">-->
        <#--<div id="signup">-->
            <#--<h1>Sign Up for Free</h1>-->

            <#--<form action="/" method="post">-->

                <#--<div class="top-row">-->
                    <#--<div class="field-wrap">-->
                        <#--<label>-->
                            <#--First Name<span class="req">*</span>-->
                        <#--</label>-->
                        <#--<input type="text" required autocomplete="off" />-->
                    <#--</div>-->

                    <#--<div class="field-wrap">-->
                        <#--<label>-->
                            <#--Last Name<span class="req">*</span>-->
                        <#--</label>-->
                        <#--<input type="text"required autocomplete="off"/>-->
                    <#--</div>-->
                <#--</div>-->

                <#--<div class="field-wrap">-->
                    <#--<label>-->
                        <#--Email Address<span class="req">*</span>-->
                    <#--</label>-->
                    <#--<input type="email"required autocomplete="off"/>-->
                <#--</div>-->

                <#--<div class="field-wrap">-->
                    <#--<label>-->
                        <#--Set A Password<span class="req">*</span>-->
                    <#--</label>-->
                    <#--<input type="password"required autocomplete="off"/>-->
                <#--</div>-->

                <#--<button type="submit" class="button button-block"/>Get Started</button>-->

            <#--</form>-->

        <#--</div>-->

        <#--<div id="login">-->
            <#--<h1>Welcome Back!</h1>-->
		<#--<#if RequestParameters['error']??>-->
            <#--<div class="alert alert-danger">-->
                <#--There was a problem logging in. Please try again.-->
            <#--</div>-->
		<#--</#if>-->
            <#--<form action="login" method="post">-->

                <#--<div class="field-wrap">-->
                    <#--<label>-->
                        <#--Email Address<span class="req">*</span>-->
                    <#--</label>-->
                    <#--<input type="text" />-->
                <#--</div>-->

                <#--<div class="field-wrap">-->
                    <#--<label>-->
                        <#--Password<span class="req">*</span>-->
                    <#--</label>-->
                    <#--<input type="password"required autocomplete="off"/>-->
                <#--</div>-->

                <#--<p class="forgot"><a href="#">Forgot Password?</a></p>-->
                <#--<input type="hidden" id="csrf_token" name="${_csrf.parameterName}" value="${_csrf.token}"/>-->
                <#--<button type="submit" class="button button-block"/>Log In</button>-->

            <#--</form>-->

        <#--</div>-->

    <#--</div><!-- tab-content &ndash;&gt;-->

<#--</div> <!-- /form &ndash;&gt;-->
<#--<script src='js/lib/jquery.min.js'></script>-->

<#--<script src="js/index.js"></script>-->

<#--<script src="js/bootstrap.min.js"></script>-->



<#--</body>-->
<#--</html>-->



<html>
<head>
<!-- <link rel="stylesheet" href="css/wro.css"/> -->
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
			href="css/bootstrap.min.css"
			integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
			crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet"
			href="css/bootstrap-theme.min.css"
			integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
			crossorigin="anonymous">


<title>kona Idendtity</title>
</head>
<body>
<#if RequestParameters['error']??>
	<div class="alert alert-danger">
		There was a problem logging in. Please try again.
	</div>
</#if>

	<h1>Kona Identity</h1>
	<div class="container">
		<form role="form" action="login" method="post">
		  <div class="form-group">
		    <label for="username">Username:</label>
		    <input type="text" class="form-control" id="username" name="username"/>
		  </div>
		  <div class="form-group">
		    <label for="password">Password:</label>
		    <input type="password" class="form-control" id="password" name="password"/>
		  </div>
		  <input type="hidden" id="csrf_token" name="${_csrf.parameterName}" value="${_csrf.token}"/>
		  <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
	<!-- <script src="../js/wro.js"	type="text/javascript"></script> -->
	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"
					integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
					crossorigin="anonymous"></script>

	<!-- <script src="js/wro.js" type="text/javascript"></script> -->
</body>
</html>
