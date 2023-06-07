package com.pilot.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pilot.entity.UserInfoEntity;
import com.pilot.service.UserInfoService;

/**
 * This class is used to declare controller related to Login
 * 
 * @author Bao
 * @since 2023-04-15
 */

@Controller
@RequestMapping()
public class LoginController {

	@Autowired
	UserInfoService userService;

	@GetMapping("/login")
	public String InitPage(@RequestParam(name = "username", required = false) String username,
			@RequestParam(name = "password", required = false) String password,
			@RequestParam(name = "error", required = false) String error, HttpServletRequest request,
			HttpServletResponse response, Model model) {

		String redirection = StringUtils.EMPTY;
		UserInfoEntity userInfo = userService.login(username, password);
		if (userInfo == null) {
			if (error != null) {
				model.addAttribute("error", true);
			}
			redirection = "tiles.login";
		}
		return redirection;
	}
}
