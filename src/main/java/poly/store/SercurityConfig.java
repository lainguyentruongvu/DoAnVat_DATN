package poly.store;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;


import poly.store.dao.AccountDAO;
import poly.store.dao.CartDAO;
import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.services.AccountService;
import poly.store.services.SessionService;
import poly.store.services.UserService;

@Configuration
@EnableWebSecurity
public class SercurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	AccountService accountService;

	@Autowired
	UserService userService;

	@Autowired
	BCryptPasswordEncoder pe;

	@Autowired
	SessionService session;

	@Autowired
	CartDAO cartdao;

	@Autowired
	AccountDAO accountdao;

	/* Cơ chế mã hóa mật khẩu */
	@Bean
	public BCryptPasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/* Cho phép truy xuất REST API từ domain khác */
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
	}

	/* Quản lý dữ liệu người sử dụng */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService);
	}

	/* Phân quyền sử dụng */
	protected void configure(HttpSecurity http) throws Exception {
		// Tắt thuật tấn công giả mạo
		http.csrf().disable();
		// Quyền yêu cầu truy cập
		http.authorizeRequests().antMatchers("/favorites").authenticated().antMatchers("/favorite/error")
				.authenticated().antMatchers("/order/**", "/auth/change-password").authenticated()
				.antMatchers("/admin/**").hasAnyRole("STAF", "DIRE").antMatchers("/rest/authorities").hasRole("DIRE")
				.anyRequest().permitAll();
		// Đăng nhập
		http.formLogin().loginPage("/auth/login/form").loginProcessingUrl("/auth/login")
				.defaultSuccessUrl("/auth/login/success", false).failureUrl("/auth/login/error");
		http.rememberMe().tokenValiditySeconds(86400); // remember me
		// Điều khiển lỗi truy cập không đúng quyền
		http.exceptionHandling().accessDeniedPage("/auth/unauthoried");
		// Đăng xuất
		http.logout().logoutUrl("/auth/logout").logoutSuccessUrl("/auth/logout/success")
				.addLogoutHandler(new SecurityContextLogoutHandler());
		// OAuth2 - Đăng nhâp từ mang xã hôi
		http.oauth2Login().loginPage("/auth/login/form").defaultSuccessUrl("/oauth2/login/success", true)
				.failureUrl("/auth/login/error").authorizationEndpoint().baseUri("/oauth2/authorization");
	}

}
