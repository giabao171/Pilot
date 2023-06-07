package com.pilot.dao;

import org.springframework.stereotype.Repository;

import com.pilot.entity.UserInfoEntity;

@Repository
public interface UserInfoDao {
	UserInfoEntity findByUsernameAndPassword(String Username, String Password);	
}
