package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.ProductWeightDAO;
import poly.store.entity.Product;
import poly.store.entity.Productweight;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/productweights")
public class ProductWeightRestController {
	
	@Autowired
	ProductWeightDAO productWeightDAO;
	
	@GetMapping
	public List<Productweight> findAll(){
		return productWeightDAO.findAll();
	}
	
	@GetMapping("search")
	public List<Productweight> search(@RequestParam(name = "keyword") String keyword) {
		List<Productweight> searchProductweight = productWeightDAO.searchProductWeightsByKeyword(keyword);
		return searchProductweight;
	}
	
	
}
