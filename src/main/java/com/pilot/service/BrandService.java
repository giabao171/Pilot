package com.pilot.service;

import java.util.List;
import java.util.Map;

import com.pilot.entity.BrandEntity;
import com.pilot.model.ResponseDataModel;

public interface BrandService {
	ResponseDataModel add(BrandEntity brandEntity);

	ResponseDataModel update(BrandEntity brandEntity);

	ResponseDataModel findByBrandIdForApi(Long brandId);

	ResponseDataModel delete(Long brandId);

	ResponseDataModel getAllBrand();

	BrandEntity findByBrandId(Long brandId);

	BrandEntity findByBrandName(String brandName);

	ResponseDataModel searchWithPager(Map<String, Object> searchDataMap);
}
