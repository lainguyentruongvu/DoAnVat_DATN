package poly.store.services;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import poly.store.dao.AccountDAO;
import poly.store.dao.AuthorityDAO;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.entity.Role;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	AccountDAO accountdao;
	@Autowired
	AuthorityDAO audao;
	@Autowired
	AccountService accountService;

	@Autowired
	SessionService session;

	@Autowired
	BCryptPasswordEncoder pe;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		try {
			Account user = accountService.findById(username);
			session.set("user", user);
			session.set("username", user.getUsername());

			if (!user.activeted()) {
				throw new RuntimeException("Tài khoản bạn đã bị khoá");
			}

			String password = pe.encode(user.getPassword()); // Mã hóa mật khẩu
			String[] roles = user.getAuthorities().stream().map(er -> er.getRole().getId()).collect(Collectors.toList())
					.toArray(new String[0]);
			Map<String, Object> authentication = new HashMap<>();
			authentication.put("user", user);
			byte[] token = (username + ":" + user.getPassword()).getBytes();
			authentication.put("token", "Basic " + Base64.getEncoder().encodeToString(token));
			session.set("authentication", authentication);
			return User.withUsername(username).password(password).roles(roles).build();
		} catch (NoSuchElementException e) {
			throw new UsernameNotFoundException(username + " not found!");
		}
	}

	/*
	 * public UserDetails loadUserByUsername(String username) throws
	 * UsernameNotFoundException { try { Account user =
	 * accountService.findById(username); session.set("user", user);
	 * session.set("username", user.getUsername()); if (!user.isActive()) { throw
	 * new RuntimeException("Account is not active"); } String password =
	 * pe.encode(user.getPassword()); // Mã hóa mật khấu String[] roles =
	 * user.getAuthorities().stream().map(er ->
	 * er.getRole().getId()).collect(Collectors.toList()) .toArray(new String[0]);
	 * Map<String, Object> authentication = new HashMap<>();
	 * authentication.put("user", user); byte[] token = (username + ":" +
	 * user.getPassword()).getBytes(); authentication.put("token", "Basic " +
	 * Base64.getEncoder().encodeToString(token)); session.set("authentication",
	 * authentication); return
	 * User.withUsername(username).password(password).roles(roles).build(); } catch
	 * (NoSuchElementException e) { throw new UsernameNotFoundException(username +
	 * " not found!"); } }
	 */

	public void loginFromOAuth2(OAuth2AuthenticationToken oauth2) {
		String email = oauth2.getPrincipal().getAttribute("email");
		String password = Long.toHexString(System.currentTimeMillis());
		String firstName = oauth2.getPrincipal().getAttribute("given_name");
		String lastName = oauth2.getPrincipal().getAttribute("family_name");
		String fullname = firstName + " " + lastName;
		String phoneNumber = oauth2.getPrincipal().getAttribute("phone_number");
		UserDetails user = User.withUsername(email).password(pe.encode(password)).roles("CUST").build();
		Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);

		session.set("username", email);
		Account acc = new Account(); // new Date(),
		Authority au = new Authority();
		Role rl = new Role();
		rl.setId("CUST");
		acc.setUsername(email);
		acc.setName(fullname);
		acc.setPhone(phoneNumber);
		acc.setactiveted(true);
		au.setAccount(acc);
		au.setRole(rl);
		accountdao.save(acc);
		audao.save(au);

	}
}
