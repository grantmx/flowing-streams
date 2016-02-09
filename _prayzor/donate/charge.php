<?php require_once('init.php'); ?>

<?php

// Set your secret key: remember to change this to your live secret key in production
// See your keys here https://dashboard.stripe.com/account/apikeys
\Stripe\Stripe::setApiKey("sk_test_cNFkczm4Qq2u80pVBW4XM9W4");

// Get the credit card details submitted by the form
$token = $_POST['stripeToken'];

// Create a Customer
$customer = \Stripe\Customer::create(array(
  "source" => $token,
  "description" => "Example customer")
);

// Charge the Customer instead of the card
\Stripe\Charge::create(array(
  "amount" => 1000, // amount in cents, again
  "currency" => "usd",
  "customer" => $customer->id)
);

// YOUR CODE: Save the customer ID and other info in a database for later!

// YOUR CODE: When it's time to charge the customer again, retrieve the customer ID!

?>


<!DOCTYPE html>
<html>
<head>
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="width=device-width">

<link rel="stylesheet" type="text/css" href="https://www.prazor.com/css/framework-mx.css">
<link rel="stylesheet" type="text/css" href="https://www.prazor.com/css/styles.css">
<link rel="stylesheet" type="text/css" href="https://www.prazor.com/css/angular-carousel.css">
<link rel="stylesheet" type="text/css" href="https://www.prazor.com/css/player-volume-control.css">
<link rel="stylesheet" type="text/css" href="https://www.prazor.com/css/subNav.css">

<style type="text/css">
.input-field{
	width: 100%;
	background-color: transparent;
	border-bottom: 2px solid rgba(255,255,255,0.3);
	border-top: none;
	border-left: none;
	border-right: none;
	box-shadow: none;
	padding: 20px;
	color: #fff;
	font-size: 2.4rem;
	line-height: 1
}

.btn.large-btn{
	font-size: 1.8rem;
	font-weight: bold;
	padding: 20px 60px;
	line-height: 1;
	background-color: rgba(255,255,255,0.5);
}

::-webkit-input-placeholder { /* Safari, Chrome and Opera */
  color: #fff;
}

:-moz-placeholder { /* Firefox 18- */
  color: #fff;
}

::-moz-placeholder { /* Firefox 19+ */
  color: #fff;
}

:-ms-input-placeholder { /* IE 10+ */
  color: #fff;
}

::-ms-input-placeholder { /* Edge */
  color: #fff;
}

:placeholder-shown { /* Standard one last! */
  color: #fff;
}

label{
	font-size: 1.4rem;
    padding-left: 20px;
    line-height: 1;
}

.payment-errors{
	font-weight: bold;
	font-size: 1.8rem;
	color: #ccc;
	text-align: center;
}
</style>


</head>
<body ng-controller="MainController" ng-swipe-left="showSidebar = false" class="player-view-small">

<div class="grid ng-scope">
	<div class="span-1-1 c no-pad top-space">
		<a href="http://www.prazor.com/">
			<img src="https://www.prazor.com/images/logo.svg">
		</a>
	</div>
	<div class="span-1-1 c large no-pad no-margin">
		<p class="no-margin">
			<img class="donate-icon" src="https://www.prazor.com/images/heart_icon.svg">
			<span class="color-white xl">Donate</span>
		</p>	
		
	</div>
</div>

<form action="charge.php" method="POST" id="donateForm" novalidate autocomplete="on">
	<div class="grid ng-scope">
		<div class="span-1-1 no-pad">
			<p class="payment-errors"></p>

			<div class="user-info">
				<h1>Thanks!</h1>
			</div>	
		</div>
	</div>
</form>
	
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>

</body>
</html>