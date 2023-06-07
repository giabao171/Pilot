<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<main class="container">
	<section class="row flex-column discount-in-day">
		<div class="box-filter mb-3 d-flex">
			<div class="dropdown">
				<button class="btn position-relative drop-btn" type="button" id="dropdownMenuButton1"
					data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<div class="rounded-circle bg-danger text-white position-absolute count-filter count-sum d-none"><p>1</p></div>
					<i class="fas fa-filter"></i>Bộ lọc
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<form>
						<div>
							<div class="mb-1 mt-1" >
								<strong>Hãng</strong>
							</div>
							<div class="grid-dropdown-item" id="brandFilterSumOf">
									
							</div>
						</div>
						<div class="d-flex combine">
							<div class="price-phone">
								<div class="mb-1 mt-1">
									<strong>Giá</strong>
								</div>								
								<div class="grid-dropdown-item">
									<a class="dropdown-item btn-dropdown price-op-1" 
										data-priceFrom = "0" 
										data-priceTo = "2000000" 
										href="#"
									>
										Dưới 2 triệu
									</a>
									<a class="dropdown-item btn-dropdown price-op-2" 
										data-priceFrom = "2000000" 
										data-priceTo = "4000000" 
										href="#"
									>
										Từ 2 - 4 triệu
									</a> 
									<a class="dropdown-item btn-dropdown price-op-3" 
										data-priceFrom = "4000000" 
										data-priceTo = "7000000"
										href="#"
									>
										Từ 4 - 7 triệu
									</a> 
										<a class="dropdown-item btn-dropdown price-op-4" 
										data-priceFrom = "7000000" 
										data-priceTo = "13000000"
										href="#"
									>
										Từ 7 - 13 triệu
									</a> 
									<a class="dropdown-item btn-dropdown price-op-5" 
										data-priceFrom = "13000000" 
										data-priceTo = "20000000"
										href="#"
									>
										Từ 13 - 20 triệu
									</a> 
									<a class="dropdown-item btn-dropdown price-op-6" 
										data-priceFrom = "20000000" 
										data-priceTo = "20000000" 
										href="#"
									>
										Trên 20 triệu
									</a>
								</div>
								<div class="mt-3">
									<a href="#" class="text-primary show-slider-range">
										<i class="fa-solid fa-sliders"></i>
										Hoặc chọn mức giá phù hợp với bạn
									</a>
								</div>
								<div class="range-slider">
									<div class="range-price">
										<div class="display ">
											<span class=" text-center btn-dropdown prod-price min" id="min">300000</span> 
											<span class=" text-center btn-dropdown prod-price max" id="max">42000000</span>
										</div>
									</div>
									<div class="range-slide">
										<div class="slide">
											<div class="line" id="line" style="left: 0%; right: 0%;"></div>
											<span class="thumb thumbMin" id="thumbMin" style="left: 0%;"></span> 
											<span class="thumb thumbMax" id="thumbMax" style="left: 100%;"></span>
										</div>
										<input id="rangeMin" class="range-price rangeMin" type="range" max="42000000" min="300000"
											step="100000" value="0"> 
										<input id="rangeMax" class="range-price rangeMax" type="range" max="42000000" min="300000" step="100000"
											value="42000000">
									</div>
								</div>
							</div>
						</div>
						<div class="text-center mt-3">
							<a href="/home" type="button" class="btn btn-primary btn-w170 bg-white text-danger border-danger mr-1">Bỏ chọn</a>
							<button type="button" class="btn btn-primary btn-w170 bg-primary filter-btn">Xem kết quả</button>
						</div>
					</form>
				</div>
			</div>
			<div class="dropdown">
				<button class="btn dropdown-toggle drop-btn position-relative" type="button"
					id="dropdownMenuButton2" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">Hãng
					<div class="rounded-circle bg-danger text-white position-absolute count-filter count-brand d-none"><p>1</p></div>
					</button>
				<div class="dropdown-menu brand-fiter-pos" aria-labelledby="dropdownMenuButton2">
					<form>
						<div class="grid-dropdown-item w-500" id="brandFiter">
						
						</div>
						<div class="text-center mt-3">
							<a href="/home" type="button" class="btn btn-primary btn-w170 bg-white text-danger border-danger mr-1">Bỏ chọn</a>
							<button type="button" class="btn btn-primary btn-w170 bg-primary filter-btn">Xem kết quả</button>
						</div>
					</form>
				</div>
			</div>
			<div class="dropdown">
				<button class="btn dropdown-toggle position-relative drop-btn" type="button"
					id="dropdownMenuButton3" data-toggle="dropdown"
					aria-haspopup="true" aria-expanded="false">Giá
					<div class="rounded-circle bg-danger text-white position-absolute count-filter count-price d-none"><p>1</p></div>
				</button>
				<div class="dropdown-menu price-fiter-pos" aria-labelledby="dropdownMenuButton3">
					<form>
						<div class="grid-dropdown-item">
							<a class="dropdown-item btn-dropdown price-op-1" 
								data-priceFrom = "0" 
								data-priceTo = "2000000" 
								href="#"
							>
								Dưới 2 triệu
							</a>
							<a class="dropdown-item btn-dropdown price-op-2" 
								data-priceFrom = "2000000" 
								data-priceTo = "4000000" 
								href="#"
							>
								Từ 2 - 4 triệu
							</a> 
							<a class="dropdown-item btn-dropdown price-op-3" 
								data-priceFrom = "4000000" 
								data-priceTo = "7000000"
								href="#"
							>
								Từ 4 - 7 triệu
							</a> 
							<a class="dropdown-item btn-dropdown price-op-4" 
								data-priceFrom = "7000000" 
								data-priceTo = "13000000"
								href="#"
							>
								Từ 7 - 13 triệu
							</a> 
							<a class="dropdown-item btn-dropdown price-op-5" 
								data-priceFrom = "13000000" 
								data-priceTo = "20000000"
								href="#"
							>
								Từ 13 - 20 triệu
							</a> 
							<a class="dropdown-item btn-dropdown price-op-6" 
								data-priceFrom = "20000000" 
								data-priceTo = "20000000"
								href="#"
							>
								Trên 20 triệu
							</a>
						</div>
						<div class="mt-3">
							<a href="#" class="text-primary show-slider-range">
								<i class="fa-solid fa-sliders"></i>
								Hoặc chọn mức giá phù hợp với bạn
							</a>
						</div>
						<div class="range-slider">
							<div class="range-price ">
								<div class="display ">
									<span class=" text-center btn-dropdown prod-price min" id="min">300000</span> <span
										class=" text-center btn-dropdown prod-price max" id="max">42000000</span>
								</div>
							</div>
							<div class="range-slide">
								<div class="slide">
									<div class="line" id="line" style="left: 0%; right: 0%;"></div>
									<span class="thumb thumbMin" id="thumbMin" style="left: 0%;"></span> 
									<span class="thumb thumbMax" id="thumbMax" style="left: 100%;"></span>
								</div>
								<input id="rangeMin" class="range-price rangeMin" type="range" max="42000000" min="300000"
									step="100000" value="0"> 
								<input id="rangeMax" class="range-price rangeMax" type="range" max="42000000" min="300000" step="100000"
									value="42000000">
							</div>
						</div>
						<div class="text-center mt-3">
							<a href="/home" type="button" class="btn btn-primary btn-w170 bg-white text-danger border-danger mr-1">Bỏ chọn</a>
							<button type="button" class="btn btn-primary btn-w170 bg-primary filter-btn">Xem kết quả</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="lst-quickfilter q-manu" id="brand-list-option">
		
		</div>
		<div class="count-product mb-1 d-flex">
			<strong>
				<span class="countProduct"></span>
			</strong>
			<div class="sort-by ml-auto rounded border border-secondary bg-white">
				<span><i class="fa-solid fa-arrow-down-wide-short"></i></span>
				<select id="sortBy" class="rounded border-light">
					<option value="1" selected>Mới nhất</option>
					<option value="2">Giá thấp đến cao</option>
					<option value="3">Giá cao đến thấp</option>
				</select>
			</div>
		</div>
		<div class="tab-content">
			<div class="tab-panel active" id="tab-1">
				<ul class="products-list" id="product-list">
											
				</ul>
			</div>
		</div>
		<div class="show-more text-center mt-3">
			<button class="btn btn-outline-primary text-dark pl-3 pr-3 show-more-btn">Xem thêm điện thoại</button>
		</div>
	</section>
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
