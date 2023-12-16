package poly.store.restcontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import poly.store.dao.AccountDAO;
import poly.store.dao.AuthorityDAO;
import poly.store.dao.RoleDAO;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.entity.Role;
import poly.store.services.AccountService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/accounts")
public class AccountRestController {

	@Autowired
	AccountService accountService;
	@Autowired
	AccountDAO accountdao;
	
	@Autowired
	AuthorityDAO authorityDAO;
	
	@Autowired
	RoleDAO roleDAO;

	@GetMapping
	public List<Account> getAccounts(@RequestParam("admin") Optional<Boolean> admin) {
		if (admin.orElse(false)) {
			return accountService.getAdministrators();
		}
		return accountService.findAll();
	}

	@GetMapping("{username}")
	public Account getOne(@PathVariable("username") String username) {
		return accountService.findById(username);
	}

	@PostMapping
	public Account create(@RequestBody Account account) {
		Account acc = accountService.create(account);
		Authority au = new Authority();
		au.setAccount(acc);
		Role role = roleDAO.findById("STAF").get();
		au.setRole(role);
		authorityDAO.save(au);
		return acc;
	}

	@PutMapping("{username}")
	public Account update(@PathVariable("username") String username, @RequestBody Account account) {
		return accountService.update(account);
	}

	@DeleteMapping("{username}")
	public void delete(@PathVariable("username") String username) {
		accountService.delete(username);
	}
	
	@PutMapping("updatepassword/{username}")
	public Account put1(@PathVariable("username") String username, @RequestBody String matkhau) {
		Account ac=accountService.findByUsername(username);	
		ac.setPassword(matkhau);
		return accountService.update(ac);
	}
	
	
	@GetMapping("search")
	public List<Account> findByUsernameLike(@RequestParam(name = "name") String name) {
		return accountdao.findByUsernameLike(name);
	}
}
