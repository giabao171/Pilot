package com.pilot.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pilot.entity.BrandEntity;
import com.pilot.model.ResponseDataModel;
import com.pilot.service.BrandService;

/**
 * This class is used to declare controller related to Brand management
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
@Controller
@RequestMapping(value = { "/brand" })
public class BrandController {

	@Autowired
	BrandService brandService;

	@GetMapping
	public String initPage(Model model) {
		return "tiles.brand";
	}

	@GetMapping("/api/findById")
	@ResponseBody
	public ResponseDataModel findBrandBy(@RequestParam("id") Long brandId) {
		return brandService.findByBrandIdForApi(brandId);
	}

	@PostMapping("/api/search")
	@ResponseBody
	public ResponseDataModel searchWithPager(@RequestBody Map<String, Object> searchDataMap) {
		return brandService.searchWithPager(searchDataMap);
	}

	@PostMapping("/api/getAll")
	@ResponseBody
	public ResponseDataModel getAllbrand() {
		return brandService.getAllBrand();
	}

	@PostMapping(value = { "/api/add" })
	@ResponseBody
	public ResponseDataModel add(@ModelAttribute BrandEntity brandEntity) {
		return brandService.add(brandEntity);
	}

	@PostMapping(value = { "/api/update" })
	@ResponseBody
	public ResponseDataModel update(@ModelAttribute BrandEntity brandEntity) {
		return brandService.update(brandEntity);
	}

	@DeleteMapping(value = { "/api/delete/{brandId}" })
	@ResponseBody
	public ResponseDataModel delete(@PathVariable("brandId") Long brandId) {
		return brandService.delete(brandId);
	}
}