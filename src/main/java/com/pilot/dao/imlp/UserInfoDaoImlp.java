package com.pilot.dao.imlp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pilot.dao.UserInfoDao;
import com.pilot.dao.repository.UserInfoRepository;
import com.pilot.entity.UserInfoEntity;

@Repository
public class UserInfoDaoImlp implements UserInfoDao {

	@Autowired
	UserInfoRepository UserInfoRepo;

	@Override
	public UserInfoEntity findByUsernameAndPassword(String Username, String Password) {
		return UserInfoRepo.findByUsernameAndPassword(Username, Password);
	}
}
