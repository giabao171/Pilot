<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<header>
	<nav
		class=" navbar navbar-expand-lg navbar navbar-dark text-dark">
		<div class="container collapse navbar-collapse"
			id="navbarTogglerDemo01">
			<h1 class="text-white mr-5">PILOT PROJECT</h1>
			<ul class="navbar-nav mr-auto mt-2 mt-lg-0 nav-ul">
				<li class="nav-item"><a class="nav-link" href="/product">Product
				</a></li>
				<li class="nav-item"><a class="nav-link" href="/brand">Brand</a>
				</li>
				<li class="nav-item"><a class="nav-link" href="/home">Home</a>
				</li>
			</ul>
			<div class="dropdown user-drop">
				<button class="btn dropdown-toggle text-white" type="button"
					id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
					aria-expanded="false">
					Hi:
					<c:out value="${pageContext.request.remoteUser}" />
				</button>
				<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<a class="dropdown-item" href=<c:url value="/logout" />>Logout</a>
				</div>
			</div>
			<h5 class="user-show text-white">Hi :<c:out value="${pageContext.request.remoteUser}" /></h5>
			<div class="page-res position-relative">
				<button class="rounded border border-white text-white"><i class="fa-solid fa-bars"></i></button>
			</div>
			<div class="page-menu position-absolute">
				<div class="mt-3 user-sec h5 d-flex align-items-center justify-content-between text-white">
					<span class="p-1"><img class="avatar" src="https://static.vncommerce.com/avatar/90C74E26FB-default.jpg">
						<c:out value="${pageContext.request.remoteUser}" />
					</span>					
					<button class="close-page-menu text-white">
						<i class="fa-solid fa-xmark"></i>
					</button>
				</div>
				<div class="page-part">
					<ul class="page-list mt-3">
					<li><a href="/product"><i class="fa-brands fa-product-hunt"></i> Product</a> </li>
					<li><a href="/brand"><i class="fa-brands fa-bandcamp"></i></i> Brand</a> </li>
					<li><a href="/home"><i class="fa-solid fa-cash-register"></i> Home</a></li>
					<li><a href=<c:url value="/logout" />><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
				</ul>
				</div>
			</div>
		</div>
	</nav>
</header>