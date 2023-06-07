package com.pilot.dao.imlp;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.catalina.mapper.Mapper;
import org.apache.catalina.valves.JsonAccessLogValve;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;

import org.codehaus.jackson.JsonParser;
import com.google.common.reflect.TypeToken;
import com.pilot.dao.ProductDao;
import com.pilot.dao.repository.ProductRepository;
import com.pilot.entity.BrandEntity;
import com.pilot.entity.ProductEntity;
import com.pilot.model.PriceModel;

import com.google.gson.Gson;

@Repository
public class ProductDaoImlp implements ProductDao {

	@Autowired
	private ProductRepository repository;

	@Autowired
	Gson gson;

	@Override
	public ProductEntity findByProductId(Long productId) {
		return repository.findById(productId).get();
	}

	@Override
	public ProductEntity findByProductName(String productName) {
		return repository.findByProductName(productName);
	}

	@Override
	public ProductEntity findByProductNameAndProductIdNot(String productName, Long productId) {
		return repository.findByProductNameAndProductIdNot(productName, productId);
	}

	@Override
	public Specification<ProductEntity> getSearchCriteria(Map<String, Object> searchConditionsMap) {
		return new Specification<ProductEntity>() {
			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<ProductEntity> productRoot, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				Join<ProductEntity, BrandEntity> brandRoot = productRoot.join("brand");

				if (searchConditionsMap != null) {
					String keyword = (String) searchConditionsMap.get("keyword");

//=================Use Gson=======================
//					ArrayList<PriceModel> listPrice = new ArrayList<>();
//					
//					Type typeObject = new TypeToken<ArrayList<PriceModel>>(){}.getType();
//					Type typeObject1 = new TypeToken<int[]>(){}.getType();
//					
//					listPrice = gson.fromJson(searchConditionsMap.get("list").toString(), typeObject);
//					int[] list = gson.fromJson(searchConditionsMap.get("listbr").toString(), typeObject1);
//					
//					for(PriceModel item : listPrice) {
//						System.out.println("00: "+item.getPriceFrom());
//					}
//					
//					for(int item : list) {
//						System.out.println(item);
//					}

					// BrandId filter list Predicate
					List<String> brandIds = (List<String>) searchConditionsMap.get("brandIdList");
					if (!brandIds.isEmpty()) {
						List<Predicate> brandIdPredicateList = new ArrayList<>();
						for (String item : brandIds) {
							brandIdPredicateList.add(criteriaBuilder.equal(brandRoot.get("brandName"), item));
						}
						predicates.add(criteriaBuilder
								.or(brandIdPredicateList.toArray(new Predicate[brandIdPredicateList.size()])));
					}

					ObjectMapper mapper = new ObjectMapper();
					mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);

					// Price filter list Predicate
					List<PriceModel> price = new ArrayList<>();
					try {
						price = mapper.readValue(searchConditionsMap.get("priceList").toString().replace("=", ":"),
								new TypeReference<List<PriceModel>>() {
								});
					} catch (IOException e) {
						e.printStackTrace();
					}

					if (!price.isEmpty()) {
						List<Predicate> productPricePredicateList = new ArrayList<>();
						for (PriceModel item : price) {
							double priceFrom = item.getPriceFrom();
							double priceTo = item.getPriceTo();
							if (priceFrom >= priceTo) {
								productPricePredicateList
										.add(criteriaBuilder.greaterThanOrEqualTo(productRoot.get("price"), priceFrom));
							}
							productPricePredicateList
									.add(criteriaBuilder.between(productRoot.get("price"), priceFrom, priceTo));
						}
						predicates.add(criteriaBuilder.or(
								productPricePredicateList.toArray(new Predicate[productPricePredicateList.size()])));
					}

					// Keyword Predicate
					if (StringUtils.isNotEmpty(keyword)) {
						predicates.add(criteriaBuilder.or(
								criteriaBuilder.like(productRoot.get("productName"), "%" + keyword + "%"),
								criteriaBuilder.like(productRoot.get("description"), "%" + keyword + "%")));
					}
				}				
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			};
		};
	}

	@Override
	public List<ProductEntity> getProductListByBrand(Long brandId) {
		return repository.findByBrand(brandId);
	}

	@Override
	public List<ProductEntity> findAll(Specification<ProductEntity> SearchCriteria) {
		return repository.findAll(SearchCriteria);
	}

	@Override
	public Page<ProductEntity> findAll(Specification<ProductEntity> SearchCriteria, Pageable pageable) {
		return repository.findAll(SearchCriteria, pageable);
	}

	@Override
	public List<ProductEntity> searchByKeyword(String keyword) {
		return repository.findByName("%"+keyword+"%");
	}

}
