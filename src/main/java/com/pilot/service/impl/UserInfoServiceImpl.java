package com.pilot.service.impl;

import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pilot.common.constant.Constants;
import com.pilot.common.util.FileHelper;
import com.pilot.dao.UserInfoDao;
import com.pilot.entity.ProductEntity;
import com.pilot.entity.UserInfoEntity;
import com.pilot.model.ResponseDataModel;
import com.pilot.service.UserInfoService;

@Service
@Transactional
public class UserInfoServiceImpl implements UserInfoService {

	private final Logger LOGGER = LoggerFactory.getLogger(getClass());

	@Autowired
	UserInfoDao UserInfoDao;

	@Override
	public UserInfoEntity login(String username, String password) {
		return UserInfoDao.findByUsernameAndPassword(username, password);
	}

	@Override
	public ResponseDataModel loginE(String username, String password) {
		int responseCode = Constants.RESULT_CD_FAIL;
		String responseMsg = StringUtils.EMPTY;
		UserInfoEntity userInEntity = login(username, password);
		try {
			if (userInEntity != null) {
				responseMsg = "Login complete";
				responseCode = Constants.RESULT_CD_DUPL;
			}
		} catch (Exception e) {
			responseMsg = "Login fail";
			LOGGER.error("Login fail: {}", e);
		}
		return new ResponseDataModel(responseCode, responseMsg);
	}

}