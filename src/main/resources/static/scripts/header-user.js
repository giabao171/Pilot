const TEMPLATE_LIVE_SEARCH_ITEM_INFO =
	"<li class='search-live-item'>"
	+ "<a href='/product-detail/<%=productName%>' class='d-flex path-link'>"
	+ "<div class='search-item-img''>"
	+ "<img src='/<%=image%>' alt='<%=productName%>' /></div>"
	+ "<div class='search-item-info d-flex flex-column'>"
	+ "<span class=''><%=productName%></span>"
	+ "<strong class='search-live-price'><%=price%></strong></div></a></li>"

var Header = (function() {
	return function() {

		var _self = this;
		_self.$liveSearchList = $("#search-live-list");

		let liveSearchListCount = 0;

		let liveSearchList = [];

		//$(".search-live").hide();

		_self.debounce = (fn, delay) => {
			let timer;
			return () => {
				if (timer) clearTimeout(timer);
				timer = setTimeout(fn, delay)
			}
		}

		_self.liveSearch = function() {
			$.ajax({
				//url: "/api/findBykeyword?id=" + $("#search-input").val().trim(),
				url: `/product/api/findByKeyword?keyword=${$("#search-input").val().trim()}`,
				type: 'GET',
				dataType: 'json',
				contentType: 'application/json',
				success: function(responseData) {
					if (responseData.responseCode == 100) {
						liveSearchListCount = responseData.data.productsLiveSearch.length;
						liveSearchList = [...responseData.data.productsLiveSearch]
						_self.drawLiveSearchContent(liveSearchList)
						 
						if($("#search-input").val().length >= 3 && liveSearchListCount !== 0) 
							$(".search-live").show() 
						else
							$(".search-live").hide()
						_self.convertSpacePathvariable();
					}
				}
			});
		}

		//Convert path variable
		_self.convertSpacePathvariable = function() {
			$(".path-link").each(function(key, value) {
				$(value).attr("href", _self.convertSpaceToLine($(value).attr("href")))
			})
		}

		//convert Space to line
		_self.convertSpaceToLine = function(value) {
			return value.toString().replaceAll(" ", "-");
		}

		_self.drawLiveSearchContent = function(data) {

			_self.$liveSearchList.empty();

			$.each(data.slice(0, 5), function(key, value) {
				value.price = (value.price).toLocaleString('vi', { style: 'currency', currency: 'VND' })
				_self.$liveSearchList.append(_self.templateList.liveSearchInfoTemplate(value));
			})
		};

		_self.bindEvent = function() {
			
			//debouce 1 second to send request
			$("#search-input").on("input", _self.debounce(function() {
				_self.liveSearch()				
			}, 1000));

			$("#search-input").on("input", function(e) {
				if (e.key === 'Enter' || e.keyCode === '13') {
					$(".search-live").hide()
				}
			})

			$("#search-input").on("focus", function() {
				if ($("#search-input").val().length >= 3 && liveSearchList.length !== 0)
					$(".search-live").show();
			})

			$("#container").on("click", function() {
				if ($("#search-input").val().length >= 3 && liveSearchList.length !== 0)
					$(".search-live").hide();
			})
		
		}

		_self.templateList = {
			liveSearchInfoTemplate: _.template(TEMPLATE_LIVE_SEARCH_ITEM_INFO),
		};

		_self.initialize = function() {
			_self.bindEvent();
		}
	}
}());

(function(header) {
	$(document).ready(function() {
		header.initialize()
	})
})(new Header)

