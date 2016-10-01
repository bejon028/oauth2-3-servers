package demo;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

/**
 * Created by Bijon on 9/27/2016.
 */
@EnableZuulProxy
@EnableOAuth2Sso
@Configuration
public class CustomSpringSecurity extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http
                .httpBasic().and()
                .logout().and()
                .authorizeRequests()
                .antMatchers(
                        "/index.html",
                        "/home.html",
                        "/",
                        "/login",
                        "/app/components/**",
                        "/app/templates/home.html",
                        "/assets/**",
                        "/css/**",
                        "/js/**",
                        "/libs/**",
                        "/styles/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().and()
                .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
        // @formatter:on
    }
}
