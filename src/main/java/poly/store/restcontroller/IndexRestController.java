package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import poly.store.entity.Product;
import poly.store.services.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/products")
public class IndexRestController {	
	@Autowired
	ProductService productservice;
	
	@GetMapping()
	public List<Product> findAll(){
		return productservice.findAll();
	}
}
