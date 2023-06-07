const TEMPLATE_BRAND_INFO =
	"<a href='/brand-product/<%=brandName%>'"
	+ "data-href='dien-thoai-apple-iphone' data-index='0'"
	+ "class='box-quicklink__item bd-radius quicklink-logo path-link'> <img"
	+ " src='<%=logo%>' width='30'"
	+ "class='no-text'>"
	+ "</a>";

const TEMPLATE_BRAND_FILTER =
	"<a class='dropdown-item btn-dropdown d-flex align-item-center brand-op-<%=brandId%>' href='#' data-id='<%=brandName%>'><img"
	+ " src='<%=logo%>' alt='<%=brandName%>'></a>"


const TEMPLATE_PRODUCT_INFO =
	"<li class='product-info'>"
	+ "<a class='path-link' href='/product-detail/<%=productName%>'><div class='prod-avatar'>"
	+ "<img src='/<%=image%>'></div>"
	+ "<div class='prod-deal'>"
	+ "<img src='images/dmx/giamsoc_optimized.png'></div>"
	+ "<div class='prod-name'>"
	+ "<strong><%=productName%></strong>"
	+ "</div> <span class='prod-des'><%=description%></span><span class='prod-price'><%=price%></span>"
	+ "</a></li>";

var Home = (function() {
	return function() {
		var _self = this;

		_self.currentPageNumber = 1;
		_self.$brandListOption = $("#brand-list-option");
		_self.$productList = $("#product-list");
		_self.$brandFilter = $("#brandFiter");
		_self.$brandFilterSumOf = $("#brandFilterSumOf");
		_self.$showMore = $(".show-more-btn");

		let keyword = ""

		// List product by filter
		let productList = [];

		//Count sum of product
		let countProduct = 0;

		// List brand by filter
		let brandList = [];

		//List filter by brand and price
		let filterProduct = {
			brandIdList: [],
			priceList: [],
		}

		_self.formatMoneyNumber = function() {
			$(".min").html(min)
			$(".max").html(max)
			$(".prod-price").each(function(key, value) {
				$(value).text(Number($(this).text()).toLocaleString('vi', { style: 'currency', currency: 'VND' }))
			})
		}

		// Get brand for filter
		_self.searchBrands = function() {

			$.ajax({
				url: "/brand/api/getAll",
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				success: function(responseData) {
					if (responseData.responseCode == 100) {
						_self.drawBrandTableContent(responseData.data);
						brandList = responseData.data.brandList
					}
				}
			});
		};

		//Search product by filter
		_self.searchProduct = function() {
			let searchData = {
				//keyword: $("#search-input").val().trim(),
				keyword: keyword,
				currentPage: Number(_self.currentPageNumber),
				sortBy: Number($("#sortBy").val()),
				...filterProduct
			}

			$.ajax({
				url: "/product/api/search",
				type: "POST",
				dataType: "json",
				data: JSON.stringify(searchData),
				contentType: 'application/json',
				success: function(responseData) {
					if (responseData.responseCode == 100) {
						productList = [...productList, ...responseData.data.productsList];
						_self.countProduct(responseData.data);
						_self.drawProductTableContent(productList);
						_self.formatMoneyNumber();
						_self.showMoreBtnContent(responseData.data.paginationInfo);
						_self.convertSpacePathvariable();
						_self.countFilter();
					}
					console.log(responseData.data)
				}
			})
		}

		_self.drawBrandTableContent = function(data) {

			// Render product list content
			$.each(data.brandList, function(key, value) {
				_self.$brandListOption.append(_self.templateList.brandInfoOption(value));
				_self.$brandFilter.append(_self.templateList.brandFiterTemplate(value))
				_self.$brandFilterSumOf.append(_self.templateList.brandFiterTemplate(value))
			});

			$(".range-slider").hide();

			$(".dropdown-item.btn-dropdown").on("click", function(e) {
				e.preventDefault();
				/*keyword = ""
				$("#search-input").val("")*/
				keyword = $("#search-input").val().trim()
				let className = $(this).attr("class");
				let brandId = $(this).data("id");
				let priceFrom = $(this).attr("data-priceFrom");
				let priceTo = $(this).attr("data-priceTo");
				let type = $(this).attr("data-type");
				let priceFilter = { priceFrom: priceFrom, priceTo: priceTo }

				if ($(this).hasClass("checked")) {
					filterProduct.brandIdList = filterProduct.brandIdList.filter(item => item != brandId)
					filterProduct.priceList = filterProduct.priceList.filter(item => JSON.stringify(item) !== JSON.stringify(priceFilter))
				}
				else {
					if (brandId !== undefined)
						filterProduct.brandIdList.push(brandId)
					if (priceFrom !== undefined && priceTo !== undefined) {
						if (min != MIN || max != MAX) {
							filterProduct.priceList = []
							min = MIN;
							max = MAX;
							_self.reloadPriceRange();
						}
						$(".range-slider").hide(500);
						filterProduct.priceList.push(priceFilter)
					}
				}

				if ($(this).hasClass("checked"))
					$(this).removeClass("checked")
				else
					$(this).addClass("checked")

				let listBtn = $(".dropdown-item.btn-dropdown");
				listBtn.each(function(key, item) {
					var priceFilter2 = { priceFrom: $(item).attr("data-priceFrom"), priceTo: $(item).attr("data-priceTo") }
					if (filterProduct.brandIdList.includes($(item).data("id")) ||
						filterProduct.priceList.some((item) => JSON.stringify(item) === JSON.stringify(priceFilter2)))
						$(item).addClass("checked")
					else
						$(item).removeClass("checked")
				})
				_self.countFilter();
			})
		};

		//Count Product
		_self.countProduct = function(data) {
			let count = data.countProduct;
			countProduct = data.countProduct;
			$(".countProduct").html(`${count} Điện thoại`)
		}

		$(".mx-auto").on("click", function(e) {
			console.log(filterProduct)
			console.log($('#rangeMin').val())
		})

		_self.drawProductTableContent = function(data) {

			_self.$productList.empty();

			$.each(data, function(key, value) {
				_self.$productList.append(_self.templateList.productInfoTemplate(value));
			})
		};

		//Render show more product btn
		_self.showMoreBtnContent = function(data) {
			let paginationInfo = data;
			let nextPage = Number(paginationInfo.nextPage);
			if (nextPage === 0) {
				_self.$showMore.hide()
			}
			else {
				_self.$showMore.show()
				_self.$showMore.attr("nextPage", paginationInfo.nextPage);
				_self.$showMore.html(`Xem thêm ${countProduct - productList.length} điện thoại`)
			}
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

		//Count filter
		_self.countFilter = function() {
			let countBrand = filterProduct.brandIdList.length;
			let countprice = filterProduct.priceList.length;
			let countSum = countBrand + countprice;

			if (countBrand != 0)
				$(".count-brand").removeClass("d-none").children("p").html(countBrand);
			else
				$(".count-brand").addClass("d-none");

			if (countprice != 0)
				$(".count-price").removeClass("d-none").children("p").html(countprice);
			else
				$(".count-price").addClass("d-none");

			if (countSum != 0)
				$(".count-sum").removeClass("d-none").children("p").html(countSum);
			else
				$(".count-sum").addClass("d-none");
		}

		//Reload price range
		_self.reloadPriceRange = function() {
			$('.line').css({
				left: '0%',
				right: '0%',
			});
			$('.thumbMin').css('left', '0%');
			$('.thumbMax').css('left', '100%');
			$(".rangeMin").val(MIN);
			$(".rangeMax").val(MAX);
			$(".min").html(Number(MIN).toLocaleString('vi', { style: 'currency', currency: 'VND' }))
			$(".max").html(Number(MAX).toLocaleString('vi', { style: 'currency', currency: 'VND' }))
		}

		//Show/Hide range slider
		_self.showHideRangeSlider = function() {
			$(".range-slider").toggle(500);
		}

		_self.searchByKeyWord = function() {
			filterProduct = {
				brandIdList: [],
				priceList: [],
			}
			productList = []
			_self.searchProduct();
		}

		_self.bindEvent = function() {

			// Show brands list when clicking show more button
			$(".show-more-btn").on('click', function() {
				let nextPage = Number($(this).attr("nextPage"))
				_self.currentPageNumber = nextPage;
				_self.searchProduct();
			});

			// Search brand after search fields when click clear search field button
			$('#clearSearchFieldBtn').on('click', function() {
				$("#keyword").val("nextPage");
				_self.currentPageNumber = 1;
				_self.searchBrands();
			});

			//Search product when click filter button
			$(".filter-btn").on("click", function() {
				_self.currentPageNumber = 1;
				productList = [];
				_self.searchProduct();
				_self.$showMore.show();
				$(".dropdown-menu").removeClass("show");
			})

			//Change price list filter when change range price
			$('.range-price').on("input", function() {
				$(".min").html(Number(min).toLocaleString('vi', { style: 'currency', currency: 'VND' }))
				$(".max").html(Number(max).toLocaleString('vi', { style: 'currency', currency: 'VND' }))
				if (min != MIN || max != MAX) {
					filterProduct.priceList = [{ priceFrom: min, priceTo: max }]
				}
				_self.countFilter();
			})

			//Show/hide range price when click
			$(".show-slider-range").on("click", function(e) {
				e.preventDefault();
				_self.showHideRangeSlider()
				_self.reloadPriceRange()
				filterProduct.priceList = []
				let listBtn = $(".dropdown-item.btn-dropdown");
				listBtn.each(function(key, item) {
					if ($(item).attr("data-priceFrom") !== undefined && $(item).attr("data-priceTo") !== undefined)
						$(item).removeClass("checked")
				})
				_self.countFilter();
			})

			//Scroll when click filter dropdown btn
			$(".drop-btn").on("click", function() {
				$("html, body").animate({ scrollTop: 0 }, 800);
			})

			//Arrange product by sort
			$("#sortBy").on("change", function() {
				_self.currentPageNumber = 1;
				productList = [];
				_self.searchProduct();
			})

			$("#search-input").on("keyup", function(e) {
				if (e.key === 'Enter' || e.keyCode === '13') {
					_self.currentPageNumber = 1;
					keyword = $("#search-input").val().trim()
					_self.searchByKeyWord()
					$(".search-live").hide();
					$(".dropdown-item.btn-dropdown").removeClass("checked")
				}
			})

			$("#search-input-btn").on("click", function() {
				_self.currentPageNumber = 1;
				keyword = $("#search-input").val().trim()
				_self.searchByKeyWord()
				$(".search-live").hide();
				$(".dropdown-item.btn-dropdown").removeClass("checked")
			})
		};

		_self.templateList = {
			brandInfoOption: _.template(TEMPLATE_BRAND_INFO),
			brandFiterTemplate: _.template(TEMPLATE_BRAND_FILTER),
			productInfoTemplate: _.template(TEMPLATE_PRODUCT_INFO),
		};

		_self.initialize = function() {

			// Show brand list when opening page
			_self.searchBrands();

			// Show product list when opening page
			_self.searchProduct();

			_self.bindEvent();

		};
	};
}());
(function(home) {
	$(document).ready(function() {
		home.initialize();
	});
})(new Home());
