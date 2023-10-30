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
import poly.store.dao.StatusDAO;
import poly.store.entity.Account;
import poly.store.entity.Status;
import poly.store.services.AccountService;
import poly.store.services.StatusService;

@Service
public class StatusServiceImpl implements StatusService {

	@Autowired 
	StatusDAO statudao;

	@Autowired
	PasswordEncoder pe;

	@Override
	public Status getOne(Integer newStatusId) {
		return statudao.getOne(newStatusId);
	}

	

	
}
