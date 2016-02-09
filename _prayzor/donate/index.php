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
</style>


</head>
<body ng-controller="MainController" ng-swipe-left="showSidebar = false" class="player-view-small">

<div class="grid ng-scope">
	<div class="span-1-1 c no-pad top-space">
		<img class="user-avatar" ng-src="https://www.prazor.com/images/heart_icon.svg" src="images/heart_icon.svg">		
	</div>
	<div class="span-1-1 c large no-pad no-margin">
		<span class="b color-white large">Donate</span>
	</div>
</div>

<form action="" method="POST" id="donateForm" novalidate autocomplete="on">
	<span class="payment-errors"></span>

	<div class="grid ng-scope">
		<div class="span-1-1 no-pad">
			<div class="user-info">
				<ul class="blocked unstyled vertical-list large">
					<li>
						<input type="text" class="input-field" size="20" placeholder="">
						<label class="color-gold b">Full Name</label>
					</li>
					<li>
						<input type="tel" class="input-field cc-number" data-numeric size="20" placeholder="&middot;&middot;&middot;&middot; &middot;&middot;&middot;&middot; &middot;&middot;&middot;&middot; &middot;&middot;&middot;&middot;" data-stripe="number">
						<label class="color-gold b cc-number">Card Number</label>
					</li>
					<li>
						<input type="text" class="input-field cc-cvc" data-numeric autocomplete="off" size="4" placeholder="&middot;&middot;&middot;&middot;"  data-stripe="ccv">
						<label class="color-gold b cc-cvc">CCV Number</label>
					</li>
					<li>
						<input type="text" class="input-field input-short cc-exp" size="20" placeholder="&middot;&middot; / &middot;&middot;" data-stripe="exp-month">
						<label class="color-gold b">Expiration Date</label>
					</li>	
					<li>
						<button class="btn large-btn btn-first full-width-btn">Submit</button>
					</li>
				</ul>
			</div>	
		</div>
	</div>
</form>
	
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="https://js.stripe.com/v2/"></script>
<script src="https://donate.prazor.com/scripts/jquery.payment.min.js"></script>
<script>
Stripe.setPublishableKey('pk_test_8Msa8NFdvhm6cqcMNXKWhUdP');

jQuery(function($) {
	$('[data-numeric]').payment('restrictNumeric');
	$('.cc-number').payment('formatCardNumber');
	$('.cc-exp').payment('formatCardExpiry');
	$('.cc-cvc').payment('formatCardCVC');

	$.fn.toggleInputError = function(erred) {
		this.parent('.form-group').toggleClass('has-error', erred);
		return this;
	};

	$('form').on("submit", function(e) {
		var $form = $(this),
			cardType = $.payment.cardType($('.cc-number').val());

		$('.cc-number').toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
		$('.cc-exp').toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
		$('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
		$('.cc-brand').text(cardType);
		$('.validation').removeClass('text-danger text-success');
		$('.validation').addClass($('.has-error').length ? 'text-danger' : 'text-success');

		// Disable the submit button to prevent repeated clicks
		$form.find('button').prop('disabled', true);

		Stripe.card.createToken($form, stripeResponseHandler);

		e.preventDefault();
	});



	function stripeResponseHandler(status, response) {
	  var $form = $('#donateForm');

	  if (response.error) {
	    // Show the errors on the form
	    $form.find('.payment-errors').text(response.error.message);
	    $form.find('button').prop('disabled', false);

	  } else {
	    // response contains id and card, which contains additional card details
	    var token = response.id;
	    // Insert the token into the form so it gets submitted to the server
	    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
	    // and submit
	    $form.get(0).submit();
	  }
	};


});
</script>


</body>
</html>