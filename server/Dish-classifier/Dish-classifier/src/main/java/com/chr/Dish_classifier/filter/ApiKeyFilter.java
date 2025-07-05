package com.chr.Dish_classifier.filter;

import com.chr.Dish_classifier.model.User;
import com.chr.Dish_classifier.repo.UserRepo;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


public class ApiKeyFilter implements Filter {

    private final UserRepo userRepo;

    public ApiKeyFilter(UserRepo repo){
        userRepo=repo;
    }

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request=(HttpServletRequest) servletRequest;
        HttpServletResponse response=(HttpServletResponse) servletResponse;


        String key=request.getHeader("x-api-key");

        if(key==null || userRepo.findByApiKey(key).isEmpty()){

            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("invalid api key");
            return;
        }

        filterChain.doFilter(request,response);
    }
}
