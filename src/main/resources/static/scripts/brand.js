const TEMPLATE_BRAND_INFO_ROW = "<tr>"
	+ "<td class='text-center'><%= brandId %></td>"
	+ "<td><%= brandName %></td>"
	+ "<td class='text-center'><a href='<%= logo %>' data-toggle='lightbox' data-max-width='1000'><img class='img-fluid' src='<%= logo %>'></td>"
	+ "<td><%= description %></td>"
	+ "<td class='action-btns'>"
	+ "<a class='edit-btn btn btn-warning btn-sm text-white' data-id='<%= brandId %>'><i class='fas fa-edit'></i></a> "
	+ "<a class='delete-btn btn btn-danger btn-sm text-white' data-name='<%= brandName %>' data-id='<%= brandId %>'><i class='fas fa-trash-alt'></i></a>"
	+ "</td>"
	+ "</tr>";
var Brand = (function() {
	return function() {
		var _self = this;

		_self.currentPageNumber = 1;
		_self.$brandInfoForm = $("#brandInfoForm");
		_self.$brandInfoModal = $("#brandInfoModal");
		_self.$brandInfoTable = $("#brandInfoTable");
		_self.$brandInfoTableBody = _self.$brandInfoTable.find("tbody");
		_self.$paginator = $("ul.pagination");

		_self.searchBrands = function() { // Search Brand by keyword
			let searchData = {
				keyword: $("#keyword").val(),
				currentPage: Number(_self.currentPageNumber)
			}

			$.ajax({
				url: "/brand/api/search",
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(searchData),
				contentType: 'application/json',
				success: function(responseData) {
					if (responseData.responseCode == 100) {
						_self.drawBrandTableContent(responseData.data);
					}
				}
			});
		};
		_self.drawBrandTableContent = function(data) {

			_self.$brandInfoTableBody.empty();
			_self.$paginator.empty();

			// Render table content
			$.each(data.brandsList, function(key, value) {
				_self.$brandInfoTableBody.append(_self.templateList.brandInfoRowTemplate(value));
			});

			// Render paginator
			let paginationInfo = data.paginationInfo;
			if (paginationInfo.pageNumberList.length > 0) {
				_self.$paginator.append(_self.templateList.paginatorTemplate(paginationInfo));
			}
		};
		_self.add = function() { // Show add brand modal
			$('.addBrandInfoModal').on('click', function() {
				resetFormModal(_self.$brandInfoForm);
				showModalWithCustomizedTitle(_self.$brandInfoModal, "Add Brand");
				$('#logoImg img').attr('src', DEFAULT_IMAGE_PREVIEW);
				$('#brandId').closest(".form-group").addClass("d-none");
				$("#brandLogo .required-mask").removeClass("d-none");
			});
		};
		_self.edit = function() { // Show update brand modal
			_self.$brandInfoTable.on('click', '.edit-btn', function() {
				$("#brandLogo .required-mask").addClass("d-none");

				// Get brand info by brand ID
				$.ajax({
					url: "/brand/api/findById?id=" + $(this).data("id"),
					type: 'GET',
					dataType: 'json',
					contentType: 'application/json',
					success: function(responseData) {
						if (responseData.responseCode == 100) {
							var brandInfo = responseData.data;
							resetFormModal(_self.$brandInfoForm);
							showModalWithCustomizedTitle(_self.$brandInfoModal, "Edit Brand");

							$('#brandId').val(brandInfo.brandId);
							$('#brandName').val(brandInfo.brandName);
							$('#description').val(brandInfo.description);

							var brandLogo = brandInfo.logo;
							if (brandLogo == null || brandLogo == "") {
								brandLogo = DEFAULT_IMAGE_PREVIEW;
							}
							$("#logoImg img").attr("src", brandLogo);
							$("#logo").val(brandLogo);
							$('#brandId').closest(".form-group").removeClass("d-none");
						}
					}
				});
			});
		};
		_self.save = function() { // Submit add and update brand

			$('#saveBrandBtn').on('click', function(event) {

				event.preventDefault();
				var formData = new FormData(_self.$brandInfoForm[0]);
				var brandId = formData.get("brandId");
				var isAddAction = brandId == undefined || brandId == "";
				
				_self.$brandInfoForm.validate({
					ignore: [],
					rules: {
						brandName: {
							required: true,
							maxlength: 100
						},
						logoFiles: {
							required: isAddAction,
						}
					},
					messages: {
						brandName: {
							required: "Please input Brand Name",
							maxlength: "The Brand Name must be less than 100 characters",
						},
						logoFiles: {
							required: "Please upload Brand Logo",
						}
					},
					errorElement: "div",
					errorClass: "error-message-invalid"
				});

				if (_self.$brandInfoForm.valid()) {

					// POST data to server-side by AJAX
					$.ajax({
						url: "/brand/api/" + (isAddAction ? "add" : "update"),
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
								_self.$brandInfoModal.modal('hide');
								if (isAddAction) {
									_self.currentPageNumber = 1;
								}
								_self.searchBrands();
								showNotification(true, responseData.responseMsg);
							} else {
								showMsgOnField(_self.$brandInfoForm.find("#brandName"), responseData.responseMsg);
							}
						}
					});
				}
			});
		};
		_self.remove = function() {

			// Show delete brand confirmation modal
			_self.$brandInfoTable.on('click', '.delete-btn', function() {
				$("#deletedBrandName").text($(this).data("name"));
				$("#deleteSubmitBtn").attr("data-id", $(this).data("id"));
				$('#confirmDeleteModal').modal('show');
			});

			// Submit delete brand
			$("#deleteSubmitBtn").on('click', function() {
				$.ajax({
					url: "/brand/api/delete/" + $(this).attr("data-id"),
					type: 'DELETE',
					dataType: 'json',
					contentType: 'application/json',
					success: function(responseData) {
						$('#confirmDeleteModal').modal('hide');
						showNotification(responseData.responseCode == 100, responseData.responseMsg);
						_self.searchBrands();
					},
					error: function() {
						$('#confirmDeleteModal').modal('hide');
						showNotification(false, "Cannot delete this brand");
					}
				});
			});
		};
		_self.bindEvent = function() {
			_self.add();
			_self.edit();
			_self.remove();
			_self.save();

			// Show brands list when clicking pagination button
			$('.pagination').on('click', '.page-item', function() {
				_self.currentPageNumber = $(this).attr("data-index");
				_self.searchBrands();
			});

			// Search brand with search fields when click search button
			$('.searchBrandBtn').on('click', function() {
				_self.currentPageNumber = 1;
				_self.searchBrands();
			});
			$('#keyword').on('keydown', function(e) {
				if (e.key === 'Enter' || e.keyCode === '13') {
					_self.currentPageNumber = 1;
					_self.searchBrands();
				}
			});

			// Search brand after search fields when click clear search field button
			$('.clearSearchFieldBtn').on('click', function() {
				$("#keyword").val("");
				_self.currentPageNumber = 1;
				_self.searchBrands();
			});
		};
		_self.templateList = {
			brandInfoRowTemplate: _.template(TEMPLATE_BRAND_INFO_ROW),
			paginatorTemplate: _.template(TEMPLATE_PAGINATOR)
		};
		_self.initialize = function() {

			// Show brands list when opening page
			_self.searchBrands();

			_self.bindEvent();
		};
	};
}());
(function(brand) {
	$(document).ready(function() {
		brand.initialize();
	});
})(new Brand());