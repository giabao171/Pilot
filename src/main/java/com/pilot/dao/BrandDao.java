
package com.pilot.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.pilot.entity.BrandEntity;

/**
 * This interface is used to declare functions to react with Database for Brand
 * Entities
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
@Repository
public interface BrandDao extends JpaRepository<BrandEntity, Long>, JpaSpecificationExecutor<BrandEntity> {

	BrandEntity findByBrandId(Long brandId);

	BrandEntity findByBrandName(String brandName);

	BrandEntity findByBrandNameAndBrandIdNot(String brandName, Long brandId);

	/**
	 * Get search criteria for query to search products
	 * 
	 * @param searchConditionsMap
	 * @return Specification<BrandEntity>
	 */

	public static Specification<BrandEntity> getSearchCriteria(Map<String, Object> searchConditionsMap) {

		return new Specification<BrandEntity>() {
			private static final long serialVersionUID = 1L;

			@Override
			public Predicate toPredicate(Root<BrandEntity> brandRoot, CriteriaQuery<?> query,
					CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				if (searchConditionsMap != null) {

					String keyword = (String) searchConditionsMap.get("keyword");
					// Keyword Predicate
					if (StringUtils.isNotEmpty(keyword)) {
						predicates.add(
								criteriaBuilder.or(criteriaBuilder.like(brandRoot.get("brandName"), "%" + keyword + "%"),
										criteriaBuilder.like(brandRoot.get("description"), "%" + keyword + "%")));
					}
				}
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			};

		};

	}
}
