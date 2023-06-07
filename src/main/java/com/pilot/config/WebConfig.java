package com.pilot.config;

import java.util.concurrent.TimeUnit;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * This class is used to configure resource for Web application
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		// Resources controlled
		registry.addResourceHandler("/**")
				.addResourceLocations("classpath:/static/", "file:/opt-pilot/pilot-project/")
				.setCacheControl(CacheControl.maxAge(10, TimeUnit.DAYS).cachePublic());
	}
}