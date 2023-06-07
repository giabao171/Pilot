const DEFAULT_IMAGE_PREVIEW = "/images/common/image-demo.png";
const TEMPLATE_PAGINATOR =
	"<li class='page-item <% if (firstPage == 0) { %> disabled <% } %>' data-index='<%= firstPage %>' title='First'>"
	+ "<a class='page-link' href='#'>First</a></li>"
	+ "<li class='page-item <% if (previousPage == 0) { %> disabled <% } %>' data-index='<%= previousPage %>' "
	+ "title='Previous'><a class='page-link' href='#'><<</a></li>"
	+ "<% _.each(pageNumberList, function(item) { %>"
	+ "<li class='page-item <% if (item == currentPage) { %> active <% } %>' data-index='<%= item %>'>"
	+ "<a class='page-link' href='#'><%= item %></a></li>"
	+ "<% }); %>"
	+ "<li class='page-item <% if (nextPage == 0) { %> disabled <% } %>' data-index='<%= nextPage %>' title='Next'>"
	+ "<a class='page-link' href='#'>>></a></li>"
	+ "<li class='page-item <% if (lastPage == 0) { %> disabled <% } %>' data-index='<%= lastPage %>' title='Last'>"
	+ "<a class='page-link' href='#'>Last</a></li>"

$(document).ready(function() {

	// Add "active" class for link in Header
	var pathName = window.location.pathname;
	$("header .nav-link").each(function() {
		let _self = $(this);
		if (pathName.includes(_self.attr("href"))) {
			_self.addClass("active");
			_self.css("font-weight", "700")
			_self.siblings().removeClass("active")
		}
	});
	
	$(".page-list li a").each(function() {
		let _self = $(this);
		if (pathName.includes(_self.attr("href"))) {
			_self.css({"background-color": "rgb(0, 123, 255)", "color": "#fff"});
		}
	});

	// Upload image preview
	$('input.upload-image').on('change', function() {
		var url = window.URL || window.webkitURL;
		var file = this.files[0];
		var fileUrl;
		var $parent = $(this).parent();
		if (file) {
			fileUrl = url.createObjectURL(file);
			$parent.find(".error-message-invalid").removeClass("error-message-invalid");
		} else {
			var oldImagePath = $parent.find(".old-img").val();
			if (oldImagePath) {
				fileUrl = oldImagePath;
			} else {
				fileUrl = "/images/image-demo.png";
			}
		}
		$parent.parent().find('.preview-image-upload img').attr('src', fileUrl);
	});
	
	

	// Open image in full size
	$(document).on('click', '[data-toggle="lightbox"]', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox({
			alwaysShowClose: true
		});
	});

	//Show/hide page navbar option btn
	$(".page-res").on("click", function() {
		$(".page-menu").toggle(500)
	})
	
	$(".close-page-menu").on("click", function() {
		$(".page-menu").hide(500)
	})
});

/**
 * Add title for selected modal after that show modal
 * @param $selectedModal
 * @param title
 */
function showModalWithCustomizedTitle($selectedModal, title) {
	$selectedModal.find(".modal-title").text(title);
	$selectedModal.modal('show');
}

/**
 * Reset form of modal before open modal
 * @param $formElement
 */
function resetFormModal($formElement) {

	$formElement[0].reset();
	$formElement.find("input[type*='file']").val("");
	$formElement.validate().destroy();
	$formElement.find(".error-message-invalid").remove();
	$formElement.find("img").attr('src', '');
}

/**
 * Show notification common 
 * 
 * @param isSuccess	show notify is success
 * @param message display on notify
 */
function showNotification(isSuccess, message) {

	if (isSuccess) {
		$.notify({
			icon: 'glyphicon glyphicon-ok',
			message: message
		}, {
			type: 'info',
			delay: 3000
		});
	} else {
		$.notify({
			icon: 'glyphicon glyphicon-warning-sign',
			message: message
		}, {
			type: 'danger',
			delay: 6000
		});
	}
}

/**
 * Show message on popup 
 * 
 * @param $element
 *				element show error message
 * @param isSuccessMsg
 *				true if message is a inform message
 *				false if message is error message
 * @param message
 */
function showMsgOnForm($element, message, isSuccessMsg) {

	var className = isSuccessMsg ? "alert-info" : "error-message-invalid";
	$element.find(".form-msg").remove();
	$element.prepend("<div class='" + className + " form-msg'>" + message + "</div>");
}

/**
 * Show message below input field
 * 
 * @param $element
 *				element show error message
 * @param isSuccessMsg
 *				true if message is a inform message
 *				false if message is error message
 * @param message
 */
function showMsgOnField($element, message, isSuccessMsg) {

	var className = isSuccessMsg ? "alert-info" : "error-message-invalid";
	$element.find(".form-msg").remove();
	$element.parent().append("<div class='" + className + " form-msg'>" + message + "</div>");
}