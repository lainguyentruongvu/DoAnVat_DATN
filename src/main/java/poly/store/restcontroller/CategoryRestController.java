package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import poly.store.dao.ProductDAO;
import poly.store.entity.Category;
import poly.store.entity.Product;
import poly.store.services.CategoryService;
import poly.store.services.ProductService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/category")
public class CategoryRestController {	
	@Autowired
	CategoryService categoryservice;
	
	@Autowired
	 ProductDAO productdao;
	
	@GetMapping()
	public List<Category> findAll(){
		return categoryservice.findAll();
	}

	@GetMapping("product/{id}")
	public List<Product> getproductcategori(@PathVariable("id") Integer id) {
		Category cate = categoryservice.findById(id);
		return productdao.findByCategory(cate);
	}
	
	
}
