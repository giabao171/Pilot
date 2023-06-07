package com.pilot.dao;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.pilot.entity.BrandEntity;
import com.pilot.entity.ProductEntity;

@Repository
public interface ProductDao {
	
	ProductEntity findByProductId(Long productId);

	ProductEntity findByProductName(String productName);

	ProductEntity findByProductNameAndProductIdNot(String productName, Long productId);
	
	List<ProductEntity> getProductListByBrand(Long brandId);
	
	List<ProductEntity> findAll(Specification<ProductEntity> SearchCriteria);
	
	List<ProductEntity> searchByKeyword(String keyword);
	
	Page<ProductEntity> findAll(Specification<ProductEntity> SearchCriteria, Pageable pageable);
	
	Specification<ProductEntity> getSearchCriteria(Map<String, Object> searchConditionsMap);
}
