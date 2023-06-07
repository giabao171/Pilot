const TEMPLATE_PRODUCT_INFO_ROW = "<tr>"
	+ "<td class='text-center'><%= productId %></td>"
	+ "<td class='text-center'><%= productName %></td>"
	+ "<td class='text-center'><%= quantity %></td>"
	+ "<td class='text-center price'><%= price %></td>"
	+ "<td class='text-center'><%= brand.brandName %></td>"
	+ "<td class='text-center'><%= saleDate %></td>"
	+ "<td class='text-center'><a href='<%= image %>' data-toggle='lightbox' data-max-width='1000'><img class='img-fluid' src='<%= image %>'></td>"
	+ "<td class='action-btns'>"
	+ "<a class='edit-btn btn btn-warning btn-sm text-white' data-id='<%= productId %>'><i class='fas fa-edit'></i></a> "
	+ "<a class='delete-btn btn btn-danger btn-sm text-white' data-name='<%= productName %>' data-id='<%= productId %>'><i class='fas fa-trash-alt'></i></a>"
	+ "</td>"
	+ "</tr>";
const TEMPLATE_BRAND_OPTION = "<option value='<%= brandId %>'><%= brandName %></option>";
var Product = (function() {
	return function() {
		var _self = this;

		_self.currentPageNumber = 1;
		_self.$productInfoForm = $("#productInfoForm");
		_self.$productInfoModal = $("#productInfoModal");
		_self.$productInfoTable = $("#productInfoTable");
		_self.$productInfoTableBody = _self.$productInfoTable.find("tbody");
		_self.$brandInfoSelect = $("#brandListSelect")
		_self.$paginator = $("ul.pagination");

		_self.searchProducts = function() { // Search Product by keyword
			let searchData = {
				keyword: $("#keyword").val(),
				currentPage: Number(_self.currentPageNumber),
				/*priceFrom: $("#priceFrom").val(),
				priceTo: $("#priceTo").val(),*/
				brandIdList: [],
				priceList: ($("#priceFrom").val() === $("#priceTo").val() && $("#priceFrom").val() === "0") ? [] :
					[{ priceFrom: $("#priceFrom").val(), priceTo: $("#priceTo").val() }]
			}

			_self.convert = function(dateString) {
				var p = dateString.split(/\D/g);
				return [p[2], p[1], p[0]].join("/");
			}

			//Format monney number to VND
			_self.formatMoneyNumber = function() {
				$(".price").each(function(key, value) {
					$(value).text(Number($(this).text()).toLocaleString('vi', { style: 'currency', currency: 'VND' }))
				})
			}
			
			//Get brand for select tag
			_self.searchBrands();

			$.ajax({
				url: "/product/api/search",
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(searchData),
				contentType: 'application/json',
				success: function(responseData) {
					if (responseData.responseCode == 100) {
						_self.drawProductTableContent(responseData.data);
						_self.formatMoneyNumber()
					}
				}
			});
		};
		
		// Get all brand filter
		_self.searchBrands = function() {

			$.ajax({
				url: "/brand/api/getAll",
				type: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				success: function(responseData) {
					if (responseData.responseCode == 100) {
						_self.drawBransSelectContent(responseData.data)
					}
				}
			});
		};
		
		_self.drawBransSelectContent = function(data) {

			_self.$brandInfoSelect.empty()
			_self.$brandInfoSelect.append("<option value='0'>--Select Brand--</option>")
			
			// Render brand list content
			$.each(data.brandList, function(key, value) {
				//_self.$brandInfoSelect.empty()
				_self.$brandInfoSelect.append(_self.templateList.bradListTemplate(value));
			});
		};

		_self.drawProductTableContent = function(data) {

			_self.$productInfoTableBody.empty();
			_self.$paginator.empty();

			// Render table content
			$.each(data.productsList, function(key, value) {
				_self.$productInfoTableBody.append(_self.templateList.productInfoRowTemplate(value));
			});

			// Render paginator
			let paginationInfo = data.paginationInfo;
			if (paginationInfo.pageNumberList.length > 0) {
				_self.$paginator.append(_self.templateList.paginatorTemplate(paginationInfo));
			}
		};

		_self.add = function() { // Show add product modal
			$('.addProductInfoModal').on('click', function() {
				resetFormModal(_self.$productInfoForm);
				showModalWithCustomizedTitle(_self.$productInfoModal, "Add Product");
				$('#logoImg img').attr('src', DEFAULT_IMAGE_PREVIEW);
				$('#productId').closest(".form-group").addClass("d-none");
				$("#productLogo .required-mask").removeClass("d-none");
			});
		};

		_self.edit = function() { // Show update product modal
			_self.$productInfoTable.on('click', '.edit-btn', function() {
				$('#productId').closest(".form-group").removeClass("d-none");
				$("#productLogo .required-mask").addClass("d-none");
				

				// Get product info by product ID
				$.ajax({
					url: "/product/api/findById?id=" + $(this).data("id"),
					type: 'GET',
					dataType: 'json',
					contentType: 'application/json',
					success: function(responseData) {
						if (responseData.responseCode == 100) {
							var productInfo = responseData.data;
							resetFormModal(_self.$productInfoForm);
							showModalWithCustomizedTitle(_self.$productInfoModal, "Edit Product");

							$("#productId").val(productInfo.productId)
							$("#productName").val(productInfo.productName)
							$("#productQuantity").val(productInfo.quantity)
							$("#productPrice").val(productInfo.price)
							$("#productPrice").val(productInfo.price)
							$("#brandListSelect").val(productInfo.brand.brandId)
							$("#dateSale").val(productInfo.saleDate)
							$("#description").val(productInfo.description)
							var productImage = productInfo.image;
							if (productImage == null || productImage == "") {
								productImage = DEFAULT_IMAGE_PREVIEW;
							}
							$("#logoImg img").attr("src", productImage);
							$("#logo").val(productImage);

						}
					}
				});
			});
		};

		_self.save = function() { // Submit add and update product

			$('#saveProductBtn').on('click', function(event) {

				event.preventDefault();
				var formData = new FormData(_self.$productInfoForm[0]);
				var productId = formData.get("productId");
				var isAddAction = productId == undefined || productId == "";

				$.validator.addMethod("ForSelect", function(value, ele, params) {
					return value != 0;
				}, "*Please select Brand")

				$.validator.addMethod("DatePicker", function(value, ele, params) {
					return value !== "";
				}, "*Please input or select Sale Date")

				_self.$productInfoForm.validate({
					ignore: [],
					rules: {
						productName: {
							required: true,
							maxlength: 100
						},
						quantity: {
							required: true,
							min: 1,
							digits: true,
						},
						price: {
							required: true,
							min: 1,
							digits: true,
						},
						brand: {
							ForSelect: true,
						},
						saleDate: {
							DatePicker: true,
						},
						description: {
							required: true,
						},
						imageFiles: {
							required: isAddAction,
						}
					},
					messages: {
						productName: {
							required: "*Please input Product Name",
							maxlength: "*The Brand Name must be less than 100 characters",
						},
						quantity: {
							required: "*Please input Quantity",
							min: "*price must be greater than or equal to 1",
							digits: "*Quantity is invalid",
						},
						price: {
							required: "*Please input Quantity",
							min: "*price must be greater than or equal to 1",
							digits: "*Quantity is invalid",
						},
						description: {
							required: "*Please input input Description",
						},
						imageFiles: {
							required: "*Please upload Product Image",
						}
					},
					/*errorElement: "div",
					errorClass: "error-message-invalid"*/
				});
				if(!_self.$productInfoForm.valid()){}
					//_self.searchBrands()

				if (_self.$productInfoForm.valid()) {

					// POST data to server-side by AJAX
					$.ajax({
						url: "/product/api/" + (isAddAction ? "add" : "update"),
						type: 'POST',
						enctype: 'multipart/form-data',
						processData: false,
						contentType: false,
						cache: false,
						timeout: 10000,
						data: formData,
						success: function(responseData) {

							// Hide modal and show success message when save successfully
							// Else show error message in modal
							if (responseData.responseCode == 100) {
								_self.$productInfoModal.modal('hide');
								if (isAddAction) {
									_self.currentPageNumber = 1;
								}
								_self.searchProducts();
								showNotification(true, responseData.responseMsg);
							} else {
								showMsgOnField(_self.$productInfoForm.find("#productName"), "*" + responseData.responseMsg);
								//_self.searchBrands()
							}
						}
					});
				}
			});
		};

		_self.delete = function() {
			// Show delete product confirmation modal
			_self.$productInfoTable.on('click', '.delete-btn', function() {
				$("#deletedProductName").text($(this).data("name"));
				$("#deleteSubmitBtn").attr("data-id", $(this).data("id"));
				$('#confirmDeleteModal').modal('show');
			});

			// Submit delete product
			$("#deleteSubmitBtn").on('click', function() {
				$.ajax({
					url: "/product/api/delete/" + $(this).attr("data-id"),
					type: 'DELETE',
					dataType: 'json',
					contentType: 'application/json',
					success: function(responseData) {
						$('#confirmDeleteModal').modal('hide');
						showNotification(responseData.responseCode == 100, responseData.responseMsg);
						_self.searchProducts();
					}
				});
			});
		}

		_self.bindEvent = function() {

			_self.add();
			_self.edit();
			_self.delete();
			_self.save();


			// Show products list when clicking pagination button
			$('.pagination').on('click', '.page-item', function() {
				_self.currentPageNumber = $(this).attr("data-index");
				_self.searchProducts();
				
				_self.$brandInfoSelect.append("<option value='0'>--Select Brand--</option>")
			});

			// Search product with search fields when click search button
			$('.searchProductBtn').on('click', function() {
				_self.currentPageNumber = 1;
				_self.searchProducts();
			});
			$('#keyword').on('keydown', function(e) {
				if (e.key === 'Enter' || e.keyCode === '13') {
					_self.currentPageNumber = 1;
					_self.searchProducts();
				}
			});

			// Search product after search fields when click clear search field button
			$('.clearSearchFieldBtn').on('click', function() {
				$("#keyword").val("");
				$("#priceFrom").val("0"),
					$("#priceTo").val("0")
				_self.currentPageNumber = 1;
				_self.searchProducts();

			});
		};
		_self.templateList = {
			productInfoRowTemplate: _.template(TEMPLATE_PRODUCT_INFO_ROW),
			paginatorTemplate: _.template(TEMPLATE_PAGINATOR),
			bradListTemplate: _.template(TEMPLATE_BRAND_OPTION),
		};
		_self.initialize = function() {

			// Show products list when opening page
			_self.searchProducts();

			_self.bindEvent();
		};
	};
}());
(function(product) {
	$(document).ready(function() {
		product.initialize();
		
	});
})(new Product());

$(function() {
	$('.datepicker').datepicker({
		language: "es",
		autoclose: true,
		inline: true,
		format: "dd-mm-yyyy",
	});
})