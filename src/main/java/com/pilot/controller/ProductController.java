package com.pilot.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pilot.common.util.CommonUtil;
import com.pilot.dao.imlp.ProductDaoImlp;
import com.pilot.entity.BrandEntity;
import com.pilot.entity.ProductEntity;
import com.pilot.model.ResponseDataModel;
import com.pilot.service.BrandService;
import com.pilot.service.ProductService;
import com.pilot.service.impl.ProductServiceImpl;

/**
 * This class is used to declare controller related to Product Management
 * 
 * @author Bao
 * @since 2023-04-02
 */

@Controller
@RequestMapping(value = {"/product"})
public class ProductController {
	
	@Autowired
	private ProductDaoImlp prd;
	
	@Autowired
	private ProductService productService;
	
	@GetMapping
	public String InitPage(HttpServletResponse response) {
		return "tiles.product";
	}
	
	@PostMapping("/api/search")
	@ResponseBody
	public ResponseDataModel searchWithPager(@RequestBody Map<String, Object> searchDataMap ) {
		return productService.searchWithPager(searchDataMap);
	}
	
	@GetMapping("/api/findById")
	@ResponseBody
	public ResponseDataModel findProductBy(@RequestParam("id") Long productId) {		
		return productService.findByProductIdForApi(productId);
	}
	
	@PostMapping(value = {"/api/getByBrandId"})
	@ResponseBody
	public ResponseDataModel getProductsListByBrandId(@RequestBody Map<String, Object> searchDataMap ) {
		return productService.getProductListOfBrand(searchDataMap);
	}
	
	@PostMapping(value = {"/api/add"})
	@ResponseBody
	public ResponseDataModel add(@ModelAttribute ProductEntity productEntity) {
		return productService.add(productEntity);
	}
	
	@PostMapping(value = {"/api/update"})
	@ResponseBody
	public ResponseDataModel update(@ModelAttribute ProductEntity productEntity) {
		return productService.update(productEntity);
	}
	
	@DeleteMapping(value = {"/api/delete/{productId}"})
	@ResponseBody
	public ResponseDataModel delete(@PathVariable("productId") Long productId) {
		return productService.delete(productId);
	}
	
	@GetMapping("/api/findByKeyword")
	@ResponseBody
	public ResponseDataModel findProductByKeyword(@RequestParam("keyword") String keyword) {		
		return productService.searchProductByKeyword(keyword);
	}
}
