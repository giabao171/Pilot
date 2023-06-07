/*
var Brand = (function() {
	return function() {
		var _self = this;

		_self.$lofinform = $("#login-form");

		_self.save = function() { // Submit add and update brand

			_self.$lofinform.submit(function(event) {

				event.preventDefault();
				var formData = new FormData(_self.$lofinform[0]);
				

				_self.$lofinform.validate({
					ignore: [],
					rules: {
						username: {
							required: true,
						},
						password: {
							required: true,
						}
					},
					messages: {
						username: {
							required: "Please input username",
						},
						password: {
							required: "Please input password",
						}
					},
					errorElement: "div",
					errorClass: "error-message-invalid"
				});

				if (_self.$lofinform.valid()) {

					// POST data to server-side by AJAX
					$.ajax({
						url: "/loginAction",
						dataType: 'json',
						data: JSON.stringify(formData),
						contentType: 'application/json',
						success: function(responseData) {
							
								console.log(responseData.responseMsg)
						
						}
					});
				}
			});
		};
		
		_self.bindEvent = function() {
			
			_self.save();

		}
		_self.initialize = function() {


			_self.bindEvent();
		};
	};
}());
(function(brand) {
	$(document).ready(function() {
		brand.initialize();
	});
})(new Brand());*/