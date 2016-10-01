package com.konasl;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Taqwa It on 10/1/2016.
 */
public class UnauthorizedEndpoint implements AuthenticationEntryPoint {
    @Override
    public final void commence(HttpServletRequest request, HttpServletResponse response,
                               AuthenticationException authException) throws IOException {
        response.sendRedirect("/");
    }
}