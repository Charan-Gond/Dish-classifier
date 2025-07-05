package com.chr.Dish_classifier;

import com.chr.Dish_classifier.filter.ApiKeyFilter;
import com.chr.Dish_classifier.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class config {

    @Autowired
    private UserRepo repo;

    @Bean
    public SecurityFilterChain con(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req->
                        req.requestMatchers("api/*").permitAll())
                .httpBasic(Customizer.withDefaults());

        return httpSecurity.build();
    }

    @Bean
    public FilterRegistrationBean<ApiKeyFilter> apiKeyFilter(){

        FilterRegistrationBean<ApiKeyFilter> registrationBean=new FilterRegistrationBean<>();

        registrationBean.setFilter(new ApiKeyFilter(repo));
        registrationBean.addUrlPatterns("/api/upload");
        registrationBean.setOrder(1);
        return registrationBean;
    }
}
