<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<html>
<head>
	<tiles:insertAttribute name="head" />
	<!-- Local Import title  -->
	<title>
		<tiles:insertAttribute name="title"/>
	</title>
	<!-- Local Import CSS START -->
	<tiles:importAttribute name="stylesheets" ignore="true" />
	<c:forEach var="css" items="${stylesheets}">
		<link rel="stylesheet" type="text/css" href="<c:url value='${css}'/>">
	</c:forEach>
	<!-- Local Import CSS END -->
</head>
<body>
	<tiles:insertAttribute name="header"/>
	<div id="container" class="container">
		<tiles:insertAttribute name="main-content" />
	</div>
	<tiles:insertAttribute name="footer" />
	<!-- Local Import JS START -->
	<tiles:importAttribute name="javascripts" ignore="true" />
	<c:forEach var="js" items="${javascripts}">
		<script src="<c:url value='${js}'/>"></script>
	</c:forEach>
	<!-- Local Import JS END -->
</body>
</html>