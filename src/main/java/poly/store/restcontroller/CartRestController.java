package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;
import poly.store.services.AccountService;
import poly.store.services.CartService;


@CrossOrigin("*")
@RestController
@RequestMapping("/rest/cart")
public class CartRestController {

	@Autowired
	CartService cartservice;	

	@Autowired
	AccountService accountService;

	@GetMapping("{username}")
	public Cart getCartUsername(@PathVariable("username") String username) {
		Account account = accountService.findById(username);
		return cartservice.findByAccount(account);
	}

	@GetMapping("/cartdetails/{username}")
	public List<Cartdetail> getCartdetails(@PathVariable("username") String username) {
		Account account = accountService.findById(username);
		Cart cart = cartservice.findByAccount(account);
		return cartservice.findByCart(cart);
	}
	
	@PostMapping("/addcart")
	public Cartdetail addcart(@RequestBody Cartdetail cd) {
		Cartdetail cdetail = cartservice.findByCartAndBook(cd.getCart(), cd.getProduct());
		if (cdetail == null) {
			return cartservice.save(cd);
		} else {
			cdetail.setQuantity(cdetail.getQuantity()+1);
			return cartservice.save(cdetail);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteId(@PathVariable("id") Integer id) {
		cartservice.deleteById(id);
	}
	
	@PutMapping("/updateqty")
	public Cartdetail updateqty(@RequestBody Cartdetail cd) {
		return cartservice.save(cd);
	}
	
	

}
