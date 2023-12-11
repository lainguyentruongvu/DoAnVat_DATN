package poly.store.restcontroller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
import poly.store.services.AuthorityService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/authorities")
public class AuthorityRestController {

	@Autowired
	AuthorityService authorityService;

	@Autowired
	AuthorityDAO authorityDAO;
	@Autowired
	AccountDAO accDAO;
	@Autowired
	RoleDAO roleDAO;

	@GetMapping
	public List<Authority> findAll(@RequestParam("admin") Optional<Boolean> admin) {
		if (admin.orElse(false)) {
			return authorityService.findAuthoritiesOfAdministrators();
		}
		return authorityService.findAll();
	}

	@PostMapping
	public Authority post(@RequestBody Authority auth) {
		return authorityService.create(auth);
	}

	@PostMapping("/acc")
	public Authority postacc(@RequestBody Authority auth) {
		return authorityDAO.save(auth);
	}

	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		authorityService.delete(id);
	}

	@GetMapping("{username}/{role}")
	public Authority setAuthority(@PathVariable("username") String account, @PathVariable("role") String role) {
		Account acc = accDAO.findById(account).get();
		Role role1 = roleDAO.findById(role).get();
		Authority authority = authorityDAO.findByAccount(acc);
		authority.setRole(role1);
		return authorityDAO.save(authority);
	}

}