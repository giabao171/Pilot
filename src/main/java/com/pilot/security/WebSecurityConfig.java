package com.pilot.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * This class is used to configure permission to access web application resources
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
@Configuration
@EnableWebSecurity
@Order(value = 101)
public class WebSecurityConfig {

	@Autowired
	private CustomAuthenticationProvider authProvider;
	
	@Autowired
	void registerProvider(AuthenticationManagerBuilder auth) {
	    auth.authenticationProvider(authProvider);      
	}
	
	@Bean
	AuthenticationManager authenticationManager(
	        AuthenticationConfiguration authenticationConfiguration) throws Exception {
	    return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf().disable()
			.authorizeRequests()
					.antMatchers("/","/css/**", "/js/**", "/styles/**", "/scripts/**", "/images/**","/plugins/**","/login").permitAll()
					.antMatchers("/brand","/product").access("hasRole('ROLE_ADMIN')")
					.antMatchers("/home","/home/api/product/search", "/brand-product/**", "/product-detail/**"
							, "/brand/api/getAll", "/product/api/getByBrandId", "/product/api/search", "/product/api/findById"
							, "/brand/api/findById", "/product/api/findByKeyword").permitAll()
					.anyRequest().authenticated()
			.and().formLogin().loginPage("/login")
					.loginProcessingUrl("/loginAction")
					.defaultSuccessUrl("/product")
					.usernameParameter("username")
					.passwordParameter("password")
					.failureUrl("/login?error")
			.and().logout().logoutSuccessUrl("/login")
			.and().exceptionHandling().accessDeniedPage("/login");
		
		return http.build();
	}
	
}