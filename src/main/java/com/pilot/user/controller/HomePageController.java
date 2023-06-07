package com.pilot.user.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pilot.entity.BrandEntity;
import com.pilot.model.ResponseDataModel;

@Controller
@RequestMapping(value = { "/home" })
public class HomePageController {

	@GetMapping()
	public String initPage() {
		return "tiles.dmx";
	}

}
