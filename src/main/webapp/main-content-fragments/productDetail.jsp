<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<main class="container bg-white product-detail-content">
	<div class="path">
		<a href="/home" class="text-primary">Trang chủ</a>
		<i class="fa fa-chevron-right text-primary"></i>
		<a href="/brand-product/${pathBrand}" id="pathBrand">Điện thoại ${product.brand.brandName}<span id="brandNamePath"></span></a>
	</div>
	
	<div class="product-detail d-flex justify-content-center border-top border-primary pt-3 mt-3">
		<div class="product-img p-3 text-center">
			<img id="productImg" src="/${product.image }"/>
		</div>
		<div class="product-show ml-3 rounded">
			<h2 id="productName">${product.productName}</h2>
			<h2 id="productPrice" class="prod-price text-danger">${product.price}</h2>
			<div class="product-description">
				<strong>Mô tả:</strong>
				<p class="productDesc">${product.description}</p>
			</div>
			<button type="button" class="btn btn-danger btn-lg bg-danger w-100">Mua</button>
		</div>
	</div>
	
	
</main>
<div id="goto-top">↑</div>
<footer class="footer">
	<div class="container">
		<div class="row">
			<ul class="col">
				<li><strong>Thông tin điện máy xanh</strong></li>
				<li><a rel="nofollow" href="/he-thong-sieu-thi-dien-may"
					title="Hệ thống siêu thị">Hệ thống 1054 siêu thị <small>(8:00
							- 22:00)</small></a></li>
				<li><a rel="nofollow" href="/gioi-thieu"
					title="Giới thiệu công ty">Giới thiệu công ty</a></li>
				<li><a href="https://vieclam.thegioididong.com"
					title="Tìm việc làm">Tìm việc làm</a></li>
				<li><a rel="nofollow" href="/lien-he" title="Liên hệ, góp ý">Liên
						hệ, góp ý</a></li>
			</ul>
			<ul class="col">
				<li><strong>Hỗ trợ khách hàng</strong></li>
				<li><a rel="nofollow" href="/tra-gop"
					title="Tìm hiểu về mua trả góp">Tìm hiểu về mua trả góp</a></li>
				<li><a rel="nofollow"
					href="/kinh-nghiem-hay/chinh-sach-giao-hang-lap-dat-1261528"
					title="Giao hàng, lắp đặt">Giao hàng, lắp đặt</a></li>
				<li><a rel="nofollow" href="/bao-hanh-doi-tra"
					title="Bảo hành, đổi trả">Bảo hành, đổi trả</a></li>
				<li><a rel="nofollow" href="/ve-sinh-may-lanh"
					title="Dịch vụ vệ sinh máy lạnh, máy giặt, quạt">DV vệ sinh máy
						lạnh, máy giặt, quạt</a></li>
			</ul>
			<ul class="col">
				<li><strong>Tổng đài hỗ trợ (Gọi miễn phí)</strong>
					<p>
						Mua hàng <a href="tel:18001061">1800.1061</a> (7:30 - 22:00)
					</p>
					<p>
						Kỹ thuật <a href="tel:18001764">1800.1764</a> (7:30 - 22:00)
					</p>
					<p>
						Bảo hành<a href="tel:18001065">1800.1065</a> (8:00 - 21:00)
					</p>
					<p>
						Khiếu nại <a href="tel:18001063">1800.1063</a> (8:00 - 21:30)
					</p> <a target="_blank" rel="nofollow" class="bct"
					href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=20790">
						<i class="icondmx-bct"></i>
				</a> <a class="logo-chg" href="/dieu-khoan-su-dung#giai-quyet-khieu-nai">
						<i class="icondmx-chg"></i>
				</a>
					<div id="DMCA-badge">
						<a
							href="https://www.dmca.com/Protection/Status.aspx?ID=69bc7638-1181-4a0f-ab78-247bea1eab81&amp;refurl=https://www.dienmayxanh.com/"
							title="DMCA.com Protection Status" class="dmca-badge"> <img
							class="lazy"
							data-src="https://cdn.tgdd.vn/dmx2016/Content/images/dmca_protected_sml_120n.png"
							alt="DMCA.com Protection Status"
							src="https://cdn.tgdd.vn/dmx2016/Content/images/dmca_protected_sml_120n.png"
							style="display: inline; opacity: 1;" />
						</a>
					</div></li>
			</ul>
			<ul class="col">
				<li><a target="_blank"
					href="https://facebook.com/dienmayxanhcom" class="linkfb"> <i
						class="icon-dmx  icondmx-share1"></i> 1559.6k fan
				</a> <a target="_blank" href="https://www.youtube.com/user/dienmaycom"
					class="linkyt"> <i class="icon-dmx icondmx-share3"></i> 485k
						đăng ký
				</a> <br />
					<p>Website cùng tập đoàn:</p> <a class="mwg-logo" target="_blank"
					href="https://www.maiamtgdd.vn/"> <i
						class="icon-dmx icondmx-logomaiam"></i>
				</a> <a class="mwg-logo" target="_blank"
					href="https://www.thegioididong.com/"> <i
						class="icon-dmx  icondmx-logotgdd"></i>
				</a> <a class="mwg-logo" target="_blank"
					href="https://www.bachhoaxanh.com/"> <i
						class="icon-dmx  icondmx-logobhx"></i>
				</a></li>
			</ul>
		</div>
	</div>
</footer>
