package com.pilot.service;

import java.util.List;
import java.util.Map;

import com.pilot.entity.BrandEntity;
import com.pilot.entity.ProductEntity;
import com.pilot.model.ResponseDataModel;

public interface ProductService {
	ResponseDataModel add(ProductEntity productEntity);

	ResponseDataModel update(ProductEntity productEntity);

	ResponseDataModel findByProductIdForApi(Long productId);

	ResponseDataModel delete(Long productId);

	List<BrandEntity> getAll();

	ProductEntity findByProductId(Long productId);

	ProductEntity findByProductName(String productName);

	ResponseDataModel searchWithPager(Map<String, Object> searchDataMap);
	
	ResponseDataModel searchProductByKeyword(String keyWord);
	
	ResponseDataModel getProductListOfBrand(Map<String, Object> searchDataMap);
}
