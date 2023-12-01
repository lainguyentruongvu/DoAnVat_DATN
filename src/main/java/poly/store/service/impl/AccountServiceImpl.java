package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import poly.store.dao.AccountDAO;
import poly.store.entity.Account;
import poly.store.services.AccountService;

@Service
public class AccountServiceImpl implements AccountService {

	@Autowired
	AccountDAO adao;

	@Autowired
	PasswordEncoder pe;

	@Override
	public Account findById(String username) {
		//Cập nhật lỗi sửa ở đây
//		return adao.findById(username);
		return adao.findByUsername(username);
	}

	@Override
	public List<Account> findAll() {
		return adao.findAll();
	}

	@Override
	public List<Account> getAdministrators() {
		return adao.getAdministrators();
	}

	@Override
	public Account create(Account account) {
		return adao.save(account);
	}

	@Override
	public Account update(Account account) {
		return adao.save(account);
	}

	@Override
	public void delete(String username) {
		adao.deleteById(username);
	}



	@Override
	public void updateToken(String token, String email) throws Exception {
		Account entity = adao.findByEmail(email);
		if (entity != null) {
			entity.setToken(token);
			adao.save(entity);
		} else {
			throw new Exception("Cannot find any account with email: " + email);
		}
	}

	@Override
	public Account getByToken(String token) {
		return adao.findByToken(token);
	}

	@Override
	public void updatePassword(Account entity, String newPassword) {
		entity.setPassword(newPassword);
		entity.setToken("token");
		adao.save(entity);
	}

	@Override
	public void changePassword(Account entity, String newPassword) {
		entity.setPassword(newPassword);
		adao.save(entity);
	}

	@Override
	public Account findByUsername(String username) {	
		return adao.findByUsername(username);
	}
}
