package poly.store.services;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

import poly.store.entity.Account;

public interface AccountService {
	Account findById(String username);

	List<Account> findAll();

	List<Account> getAdministrators();

	Account create(Account account);

	Account update(Account account);

	void delete(String username);

	


	void updateToken(String token, String email) throws Exception;

	Account getByToken(String token);

	void updatePassword(Account entity, String newPassword);

	void changePassword(Account entity, String newPassword);

	Account findByUsername(String username);
}
