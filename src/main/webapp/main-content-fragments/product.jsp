<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<div class="box">
	<div class="box box-primary bg-light rounded">
		<div class="box-body">
			<div class="sub-header">
				<div class="float-left sub-title">Product Management</div>
			</div>
			<div class="search-area row mb-3">
				<div class="search-area__search-fields col-6 col-md-2">
					<select id="priceFrom" class="form-control" name="priceFrom">
						<option value="0">Price From</option>
						<option value="1000000">1.000.000 đ</option>
						<option value="2000000">2.000.000 đ</option>
						<option value="5000000">5.000.000 đ</option>
						<option value="15000000">15.000.000 đ</option>
						<option value="20000000">25.000.000 đ</option>
						<option value="20000000">30.000.000 đ</option>
					</select>
				</div>
				<div class="search-area__search-fields col-6 col-md-2">
					<select id="priceTo" class="form-control" name="priceTo">
						<option value="0">Price To</option>
						<option value="3000000">3.000.000 đ</option>
						<option value="7000000">7.000.000 đ</option>
						<option value="10000000">10.000.000 đ</option>
						<option value="30000000">20.000.000 đ</option>
						<option value="50000000">50.000.000 đ</option>
					</select>
				</div>
				<div class="search-area__search-fields col-6 col-md-4">
					<input type="text" id="keyword"
						class="search-area__search-fields--text col-12"
						placeholder="Product Name, Brand Name">
				</div>
				<div class="search-area__btns col-4 button-full">
					<div class="search-area__btn d-flex">
						<button class="btn btn-primary searchProductBtn" id="searchProductBtn">
							<i class="fas fa-search"></i>&nbsp;Search
						</button>
					</div>
					<div class="search-area__btn d-flex">
						<button class="btn btn-secondary clearSearchFieldBtn" id="clearSearchFieldBtn">
							<i class="fas fa-times"></i>&nbsp;Clear
						</button>
					</div>
					<div class="search-area__btn d-flex">
						<a class="btn btn-success addProductInfoModal add-btn text-white"
							id="addProductInfoModal"><i class="fas fa-plus-square"></i>
							Add Product</a>
					</div>
				</div>
				<div class="search-area__btns col-4 button-sys">
					<div class="search-area__btn d-flex">
						<button class="btn btn-primary searchProductBtn" id="searchProductBtn">
							<i class="fas fa-search"></i>
						</button>
					</div>
					<div class="search-area__btn d-flex">
						<button class="btn btn-secondary clearSearchFieldBtn" id="clearSearchFieldBtn">
							<i class="fas fa-times"></i>
						</button>
					</div>
					<div class="search-area__btn d-flex">
						<a class="btn btn-success add-btn text-white"
							id="addProductInfoModal"><i class="fas fa-plus-square addProductInfoModal"></i></a>
					</div>
				</div>
			</div>			
				<table class="table table-bordered" id="productInfoTable">
					<thead>
						<tr class="text-center">
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Quantity</th>
							<th scope="col">Price</th>
							<th scope="col">Brand Name</th>
							<th scope="col">Opening For Sale</th>
							<th scope="col">Image</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>	
					</tbody>
				</table>
		
			<div class="d-flex justify-content-center">
				<ul class="pagination">
				</ul>
			</div>
		</div>
	</div>
</div>
<!-- Modal Add and Edit Brand -->
<div class="modal bd-example-modal-lg fade" id="productInfoModal">
	<div class="modal-dialog modal-lg" role="document">
		<div class="modal-content ">
			<form id="productInfoForm" role="form" enctype="multipart/form-data">
				<div class="modal-header">
					<h5 class="modal-title">Add Product</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body pb-0">
					<div class="row">
						<div class="form-group col-6">
							<label>Product ID</label> <input type="text" class="form-control"
								name="productId" id="productId" placeholder="Product ID"
								readonly>
						</div>
						<div class="form-group col-6">
							<label for="productName">Product Name <span
								class="required-mask">(*)</span></label> <input type="text"
								class="form-control" id="productName" name="productName"
								placeholder="Product Name">
						</div>
					</div>
					<div class="row">
						<div class="form-group col-6">
							<label for="productQuantity">Quantity <span
								class="required-mask">(*)</span></label> <input type="number"
								class="form-control" id="productQuantity" name="quantity"
								placeholder="Product Quantity">
						</div>
						<div class="form-group col-6">
							<label for="productPrice">Price <span
								class="required-mask">(*)</span></label> <input type="number" min="0"
								class="form-control" id="productPrice" name="price"
								placeholder="Product Price">
							<!-- <input type="text" class="form-control" id="productPriceText" placeholder="Product Price"> -->
						</div>
					</div>
					<div class="row">
						<div class="form-group col-6">
							<label for="brandName">Brand Name <span
								class="required-mask">(*)</span></label> <select class="form-control"
								name="brand" id="brandListSelect">
								<option value="0">--Select Brand--</option>
							</select>
						</div>
						<div class="form-group mb-4 col-sm-6">
							<label for="openingForSale">Opening For Sale <span
								class="required-mask">(*)</span></label>
							<div class="datepicker date input-group d-flex flex-row">
								<div class="d-flex w-100">
									<input type="text" placeholder="Opening For Sale"
										class=" form-control date-start cursor-pointer"
										name="saleDate" id="dateSale">
									<div class="input-group-append">
										<span class="input-group-text"> <i
											class="fa fa-calendar cursor-pointer"></i>
										</span>
									</div>
								</div>
								<label id="dateSale-error" class="error" for="dateSale"></label>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="description">Description</label>
						<textarea name="description" id="description" cols="30" rows="3"
							class="form-control" placeholder="Description"></textarea>
					</div>
					<div class="form-group" id="brandLogo">
						<label for="logo">Logo <span class="required-mask">(*)</span></label>
						<div class="row">
							<div class="preview-image-upload col-6" id="logoImg">
								<img src="<c:url value='/images/common/image-demo.png'/>"
									alt="image">
							</div>
							<div class="ml-3 flex flex-column row">
								<input id="imageFiles" type="file"
									class="form-control upload-image" name="imageFiles"
									accept="image/*" /> <label id="imageFiles-error" class="error"
									for="imageFiles" style=""></label> <input type="hidden"
									class="old-img" id="logo" name="image">
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-primary" id="saveProductBtn">Save</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Modal Confirm Deleting Brand -->
<div class="modal fade" id="confirmDeleteModal">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Delete Brand</h5>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<p>
					Do you want to delete <b id="deletedProductName"></b>?
				</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-primary" id="deleteSubmitBtn">Save</button>
			</div>
		</div>
	</div>
</div>