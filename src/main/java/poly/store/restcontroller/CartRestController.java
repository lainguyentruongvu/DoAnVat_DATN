package poly.store.restcontroller;

import java.util.List;

import javax.websocket.server.PathParam;

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

import poly.store.dao.CartDAO;
import poly.store.dao.CartdetailDAO;
import poly.store.dao.ProductDAO;
import poly.store.dao.ProductWeightDAO;
import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;
import poly.store.entity.Product;
import poly.store.entity.Productweight;
import poly.store.services.AccountService;
import poly.store.services.CartService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/cart")
public class CartRestController {

	@Autowired
	CartService cartservice;

	@Autowired
	CartDAO cartDAO;

	@Autowired
	ProductDAO productDAO;
	
	@Autowired
	ProductWeightDAO productWeightDAO;

	@Autowired
	CartdetailDAO cartdetailDAO;

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

	@PostMapping("/addcartbyid")
	public Cartdetail addcartbyid(@RequestBody Cartdetail cd, @RequestParam("id") Integer id) {
		Cartdetail cdetail = cartdetailDAO.findById(id).get();
		cdetail.setQuantity(cdetail.getQuantity() + cd.getQuantity());
		return cartservice.save(cdetail);
	}

	@PostMapping("/addcart")
	public Cartdetail addcart(@RequestBody Cartdetail cd) {
		return cartservice.save(cd);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteId(@PathVariable("id") Integer id) {
		cartservice.deleteById(id);
	}

	@PutMapping("/updateqty")
	public Cartdetail updateqty(@RequestBody Cartdetail cd) {
		return cartservice.save(cd);
	}

	@GetMapping("/checkweight/{id}/{idcart}/{wval}")
	public Cartdetail checkweight(@PathVariable("id") Integer id, @PathVariable("idcart") Integer idcart,
			@PathVariable("wval") String wval) {
		Cart cart = cartDAO.findById(idcart).get();
		Product product = productDAO.findById(id).get();
		Cartdetail cdetail = cartdetailDAO.findByCartAndProductAndWeightvalue(cart, product,wval);
		return cdetail;
	}
	
	@GetMapping("checkweightnull/{id}/{idcart}")
	public Cartdetail checkweightnull(@PathVariable("id") Integer id, @PathVariable("idcart") Integer idcart) {
		Cart cart = cartDAO.findById(idcart).get();
		Product product = productDAO.findById(id).get();
		Cartdetail cdetail = cartdetailDAO.findByCartAndProduct(cart, product);
		return cdetail;
	}
	
	@GetMapping("checkproductweight/{id}/{pricepro}")
	public Productweight checkproductweight(@PathVariable("id") Integer id,@PathVariable("pricepro") Double pricepro) {
		Product product = productDAO.findById(id).get();
		Productweight productweight = productWeightDAO.findByProductAndPrice(product, pricepro);
		return productweight;
	}
}
