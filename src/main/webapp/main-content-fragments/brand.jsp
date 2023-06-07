<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<div class="box">
	<div class="box box-primary bg-light rounded">
		<div class="box-body">
			<div class="sub-header">
				<div class="float-left sub-title">Brand Management</div>
			</div>

			<div class="search-area row mb-3 d-flex">
				<div class="search-area__search-fields col-6 col-md-8">
					<input type="text" id="keyword" class="search-area__search-fields--text col-12" placeholder="Brand Name, Description">
				</div>
				<div class="search-area__btns col-4 button-full">
					<div class="search-area__btn d-flex">
						<button class="btn btn-primary searchBrandBtn" id="searchBrandBtn"><i class="fas fa-search"></i>&nbsp;Search</button>
					</div>
					<div class="search-area__btn d-flex">
						<button class="btn btn-secondary clearSearchFieldBtn" id="clearSearchFieldBtn"><i class="fas fa-times"></i>&nbsp;Clear</button>
					</div>
					<div class="search-area__btn d-flex">
						<a class="btn btn-success add-btn text-white addBrandInfoModal" id="addBrandInfoModal"><i class="fas fa-plus-square"></i> Add Brand</a>
					</div>
				</div>
				<div class="search-area__btns col-4 button-sys m-0">
					<div class="search-area__btn d-flex">
						<button class="btn btn-primary" id="searchBrandBtn"><i class="fas fa-search"></i></button>
					</div>
					<div class="search-area__btn d-flex">
						<button class="btn btn-secondary clearSearchFieldBtn" id="clearSearchFieldBtn"><i class="fas fa-times"></i></button>
					</div>
					<div class="search-area__btn d-flex">
						<a class="btn btn-success add-btn text-white addBrandInfoModal" id="addBrandInfoModal"><i class="fas fa-plus-square"></i></a>
					</div>
				</div>
			</div>
			<table class="table table-bordered" id="brandInfoTable">
				<thead>
					<tr class="text-center">
						<th class="bg-primary text-white" scope="col">#</th>
						<th class="bg-primary text-white" scope="col">Name</th>
						<th class="bg-primary text-white" scope="col">Logo</th>
						<th class="bg-primary text-white" scope="col">Description</th>
						<th class="bg-primary text-white" scope="col"></th>
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
<div class="modal fade" id="brandInfoModal">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<form id="brandInfoForm" role="form" enctype="multipart/form-data">
				<div class="modal-header">
					<h5 class="modal-title">Add Brand</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group d-none">
						<label>Brand ID</label>
						<input type="text" class="form-control" name="brandId" id="brandId" placeholder="Brand ID" readonly>
					</div>
					<div class="form-group">
						<label for="brandName">Brand Name <span class="required-mask">(*)</span></label>
						<input type="text" class="form-control" id="brandName" name="brandName" placeholder="Brand Name">
					</div>
					<div class="form-group" id="brandLogo" >
						<label for="logo">Logo <span class="required-mask">(*)</span></label>
						<div class="preview-image-upload" id="logoImg">
							<img src="<c:url value='/images/common/image-demo.png'/>" alt="image">
						</div>
						<input type="file" class="form-control upload-image" name="logoFiles" accept="image/*" />
						<input type="hidden" class="old-img" id="logo" name="logo">
					</div>
					<div class="form-group">
						<label for="description">Description</label>
						<textarea name="description" id="description" cols="30" rows="3" class="form-control" placeholder="Description"></textarea>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-primary" id="saveBrandBtn">Save</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- Modal Confirm Deleting Brand -->
<div class="modal fade" id="confirmDeleteModal" >
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Delete Brand</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<p>Do you want to delete <b id="deletedBrandName"></b>?</p>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-primary" id="deleteSubmitBtn">Save</button>
			</div>
		</div>
	</div>
</div>