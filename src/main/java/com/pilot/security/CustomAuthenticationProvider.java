package com.pilot.security;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.pilot.common.util.CommonUtil;
import com.pilot.entity.UserInfoEntity;
import com.pilot.service.UserInfoService;

/**
 * This class is used to customize AuthenticationProvider to handle login with user information from DB
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	UserInfoService userInfoService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		String passwordMD5 = CommonUtil.ecryptMD5(password);
		UsernamePasswordAuthenticationToken usernamePassAuthToken = null;

		 UserInfoEntity loginUserInfo = userInfoService.login(username, passwordMD5);
		if (loginUserInfo != null) {
			List<GrantedAuthority> grantedAuths = new ArrayList<>();
			if(loginUserInfo.getUserRole().equals("ADMIN")) {				
				grantedAuths.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
			}
			else{
				grantedAuths.add(new SimpleGrantedAuthority("ROLE_USER"));
			}
			usernamePassAuthToken = new UsernamePasswordAuthenticationToken(username, StringUtils.EMPTY, grantedAuths);
		}
		return usernamePassAuthToken;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}