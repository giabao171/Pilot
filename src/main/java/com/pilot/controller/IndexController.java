package com.pilot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This class is used to declare controller for Index page
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
@Controller
@RequestMapping(value = { "/index", "/" })
public class IndexController {

//	@GetMapping
//	public String initPage() {
//		return "tiles.dmx";
//	}
}