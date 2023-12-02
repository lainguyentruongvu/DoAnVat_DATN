package poly.store.restcontroller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.AccountDAO;
import poly.store.dao.ProductDAO;
import poly.store.entity.Account;
import poly.store.entity.Favorite;
import poly.store.entity.Product;
import poly.store.services.FavoriteService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/favorites")
public class FavoriteRestController {

	@Autowired
	AccountDAO accountDAO;

	@Autowired
	FavoriteService favoriteService;

	@Autowired
	HttpServletRequest request;

	@Autowired
	ProductDAO productDAO;

	@GetMapping("{username}")
	public List<Favorite> findByAccount(@PathVariable("username") String un) {
		Account acc = accountDAO.findById(un).get();
		return favoriteService.findByAccount(acc);
	}

	@PostMapping()
	public Favorite create(@RequestBody Favorite favorite) {
		return favoriteService.create(favorite);
	}

	@DeleteMapping("{productid}")
	public void deleteByBookId(@PathVariable("productid") Integer productid) {
		String un = request.getRemoteUser();
		Account acc = accountDAO.findById(un).get();
		Product product = productDAO.findById(productid).get();

		Favorite f = favoriteService.findByAccountAndProduct(acc, product);
		favoriteService.deleteById(f.getId());
	}

	@GetMapping("/check/{productid}")
	public Favorite check(@PathVariable("productid") Integer productid) {
		String un = request.getRemoteUser();
		Account acc = accountDAO.findById(un).get();
		Product product = productDAO.findById(productid).get();
		return favoriteService.findByAccountAndProduct(acc, product);

	}
}
