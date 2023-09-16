package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.ProductDAO;
import poly.store.dao.ProductWeightDAO;
import poly.store.dao.WeightDAO;
import poly.store.entity.Product;
import poly.store.entity.Productweight;
import poly.store.entity.Weight;
import poly.store.services.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/products")
public class IndexRestController {
	@Autowired
	ProductService productservice;

	@Autowired
	ProductDAO productdao;

	@Autowired
	ProductWeightDAO productweightdao;
	@Autowired
	WeightDAO weightdao;

	@GetMapping()
	public List<Product> findAll() {
		return productservice.findAll();
	}

	@GetMapping("search")
	public List<Product> search(@RequestParam(name = "keyword") String keyword) {
		List<Product> searchbooks = productdao.searchProductsByKeyword(keyword);
		return searchbooks;
	}

	@GetMapping("{id}")
	public Product productdetail(@PathVariable("id") Integer id) {
		return productservice.findById(id);
	}

	@GetMapping("weight/{id}")
	public List<Productweight> productweight(@PathVariable("id") Integer id) {
		Product product = productservice.findById(id);
		List<Productweight> productweight = productweightdao.findByProduct(product);
		return productweight;
	}
	@GetMapping("weight/quantityandprice/{id}")
	public Weight weightandprice(@PathVariable("id") Integer id) {	
		return weightdao.findById(id).get();
	}

}
