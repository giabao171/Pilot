let min;
let max;
const MIN = 300000;
const MAX = 42000000;
$(document).ready(function() {
	$(".local-nav .sup-menu").hover(function() {
		$(this).parent().find(".sub-menu").css("display", "flex");
	}, function() {
		$(this).parent().find(".sub-menu").css("display", "none");
	});

	$(".group-tabs .nav-tab-item .nav-link").on( "click", function(e) {
		e.preventDefault();
		var $parent = $(this).parent();
		if(!$parent.hasClass("active")) {
			$parent.siblings().removeClass("active");
			$parent.addClass("active");
			var tabContentId = $(this).attr("href");
			$(tabContentId).siblings().removeClass("active");
			$(tabContentId).addClass("active");
		}
	});

	var $videoPlayer = $(".video-player-modal .video-player-body .video-player");
	$('.btn-play-video').click(function (e) {
		e.preventDefault();
		let youtubeUrl = $(this).data("youtube-url");
		if (youtubeUrl) {
			$videoPlayer.empty();
			$videoPlayer.append("<iframe width='100%' height='100%' src='" + youtubeUrl + "' frameborder='0' allowfullscreen=''></iframe>");
			$(".video-player-modal").removeClass("d-none");
		}
	});

	$(".video-player-modal").on("click", ".close-btn", function () {
		$(".video-player-modal").addClass("d-none");
		$videoPlayer.empty();
	});
	$("body").on("click", ".video-player-modal:not(.video-player-body), .video-player-modal:not(.video-player)", function () {
		$(".video-player-modal").addClass("d-none");
		$videoPlayer.empty();
	});
	
	min = 300000;
	max = 42000000;

	const calcLeftPosition = (value) => (100 / (42000000 - 300000)) * (value - 300000);
	var rangeBalance;

	//Handle when active with price range
	$('.rangeMin').on('input', function(e) {
		let newValue = parseFloat(e.target.value);
		$('.rangeMin').val(newValue)
		let $rangeMax = $(this).next()
		if (newValue === parseFloat($rangeMax.val()))
			rangeBalance = newValue
		if (newValue >= rangeBalance)
			$(this).val(rangeBalance)
		if (newValue > max) return;
		min = newValue;
		$('.thumbMin').css('left', calcLeftPosition(newValue) + '%');
		$('.min').html(newValue);
		$('.line').css({
			left: calcLeftPosition(newValue) + '%',
			right: 100 - calcLeftPosition(max) + '%',
		});

		if (newValue === $rangeMax.val()) {
			$rangeMax.hide()
		}
		else {
			$rangeMax.show()
		}
	});

	$('.rangeMax').on('input', function(e) {
		let newValue = parseFloat(e.target.value);
		$('.rangeMax').val(newValue)
		let $rangeMin = $(this).prev()
		if (newValue === parseFloat($rangeMin.val()))
			rangeBalance = newValue
		if (newValue <= rangeBalance)
			$(this).val(rangeBalance)
		if (newValue < min) return;
		max = newValue;
		$('.thumbMax').css('left', calcLeftPosition(newValue) + '%');
		$('.max').html(newValue);
		$('.line').css({
			left: calcLeftPosition(min) + '%',
			right: 100 - calcLeftPosition(newValue) + '%',
		});

		if (newValue === $rangeMin.val()) {
			$rangeMin.hide()
		}
		else {
			$rangeMin.show()
		}
	});

	$(window).scroll(function() {
		if ($(this).scrollTop()) {
			$('#goto-top').fadeIn();
		} else {
			$('#goto-top').fadeOut();
		}
	});
	$("#goto-top").click(function () {
		$("html, body").animate({scrollTop: 0}, 1000);
	});
});

