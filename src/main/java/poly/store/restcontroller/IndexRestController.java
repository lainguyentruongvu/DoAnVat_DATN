package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



import poly.store.dao.ProductDAO;
import poly.store.entity.Product;
import poly.store.services.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/products")
public class IndexRestController {	
	@Autowired
	ProductService productservice;
	
	@Autowired
	ProductDAO productdao;
	
	@GetMapping()
	public List<Product> findAll(){
		return productservice.findAll();
	}
	@GetMapping("search")
	public List<Product> search(@RequestParam(name = "keyword") String keyword) {
		List<Product> searchbooks = productdao.searchProductsByKeyword(keyword);
		return searchbooks;
	}

}
