const TEMPLATE_PRODUCT_DETAIL = ""

var ProductDetail = (function() {
	return function() {

		var _self = this;

		_self.changeTitle = function(brand) {
			document.title = `Điện thoại ${brand}`
		}
		
		_self.formatMoneyNumber = function() {
			$(".prod-price").each(function(key, value) {
				$(value).text(Number($(this).text()).toLocaleString('vi', { style: 'currency', currency: 'VND' }))
			})
		}

		_self.initialize = function() {
			/*_self.showProdutDetail()*/
			_self.formatMoneyNumber()
		}
	}
}());

(function(productDetail) {
	$(document).ready(function() {
		productDetail.initialize()
	})
})(new ProductDetail)

