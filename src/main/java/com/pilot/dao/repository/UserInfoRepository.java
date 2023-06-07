package com.pilot.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.pilot.entity.UserInfoEntity;

public interface UserInfoRepository
		extends JpaRepository<UserInfoEntity, String>, JpaSpecificationExecutor<UserInfoEntity> {
	UserInfoEntity findByUsernameAndPassword(String Username, String Password);

}
