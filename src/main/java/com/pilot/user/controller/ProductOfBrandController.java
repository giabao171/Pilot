package com.pilot.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pilot.common.util.CommonUtil;
import com.pilot.dao.ProductDao;
import com.pilot.entity.BrandEntity;
import com.pilot.model.ResponseDataModel;
import com.pilot.service.BrandService;
import com.pilot.service.ProductService;

@Controller
@RequestMapping(value = { "/brand-product" })
public class ProductOfBrandController {

	@Autowired
	BrandService brandService;
	
	@Autowired
	ProductService productService;
	
	@GetMapping(value= {"/{brandName}"})
	public String initPage(@PathVariable(required = false) String brandName, HttpServletRequest request, Model model) {
		BrandEntity brand = brandService.findByBrandName(brandName.replaceAll("-", " "));
		model.addAttribute("specificPageTitle", brand.getBrandName());
		return "tiles.productOfBrand";
	}
	
}
