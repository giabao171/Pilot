package com.pilot.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.pilot.entity.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {

	ProductEntity findByProductId(Long productId);

	ProductEntity findByProductName(String productName);

	@Transactional
	@Query(value = "SELECT * FROM PRODUCT P WHERE P.BRAND_ID = :brandId", nativeQuery = true)
	List<ProductEntity> findByBrand(@Param("brandId") Long brandId);
	
	@Transactional
	@Query(value = "SELECT * FROM PRODUCT P LEFT JOIN BRAND B on P.BRAND_ID = B.BRAND_ID "
			+ "WHERE P.product_name LIKE :keyword OR B.BRAND_NAME LIKE :keyword", nativeQuery = true)
	List<ProductEntity> findByName(@Param("keyword") String keyword);

	ProductEntity findByProductNameAndProductIdNot(String productName, Long productId);
}
