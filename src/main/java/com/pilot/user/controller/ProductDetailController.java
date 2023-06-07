/**
 * 
 */
package com.pilot.user.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pilot.entity.ProductEntity;
import com.pilot.service.ProductService;

/**
 * This class is used to declare controller related to Product Detail
 * 
 * @author Bao since 2023-04-27
 */

@Controller
@RequestMapping(value = { "/product-detail" })
public class ProductDetailController {

	@Autowired
	ProductService productService;
	
	@GetMapping(value = { "/{productName}" })
	String initPage(@PathVariable("productName") String productName, HttpServletRequest request, Model model) {
		ProductEntity product = productService.findByProductName(productName.replaceAll("-", " "));
		if (productName != null && product != null)
			model.addAttribute("product", product);
		model.addAttribute("pathBrand", product.getBrand().getBrandName().replaceAll(" ", "-"));
		model.addAttribute("specificPageTitle", product.getProductName());
		return "tiles.productDetail";
	}
}
