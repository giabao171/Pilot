<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
</head>
<body>
	<div class="login-modal bg-light p-3 mt-5 rounded">
		<h1>Login</h1>
		<c:if test="${not empty error}">
   			 <div class="error p-2 rounded text-center text-danger">Incorrect Password or Username</div>
		</c:if>
		<form id="login-form" action="/loginAction" role="form" method="POST">
		  <div class="form-group">
		    <label for="email">Username:</label>
		    <input type="text" class="form-control" placeholder="Enter email" id="email" name="username">
		  </div>
		  <div class="form-group">
		    <label for="pwd">Password:</label>
		    <input type="password" class="form-control" placeholder="Enter password" id="pwd" name="password">
		  </div>
		  <button type="submit" class="btn btn-primary w-100">Submit</button>
		</form>
	</div>
</body>
</html>