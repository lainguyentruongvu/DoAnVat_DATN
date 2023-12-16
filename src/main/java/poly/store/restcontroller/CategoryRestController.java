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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.CategoryDAO;
import poly.store.dao.ProductDAO;
import poly.store.entity.Account;
import poly.store.entity.Category;
import poly.store.entity.Discount;
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
	CategoryDAO categorydao;
	
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
	
	@GetMapping("{categoryid}")
	public Category getOne(@PathVariable("categoryid") Integer categoryid) {
		return categoryservice.findById(categoryid);
	}
	@GetMapping("search")
	public List<Category> findByCategoryLike(@RequestParam(name = "name") String name) {
		return categorydao.findByCategoryLike(name);
	}
	
	@PostMapping
	public Category create(@RequestBody Category discount) {
		return categoryservice.create(discount);
	}

	@PutMapping()
	public Category update(@RequestBody Category Discount) {
		return categoryservice.update(Discount);
	}

	@DeleteMapping("{statusid}")
	public void delete(@PathVariable("statusid") Integer statusid) {
		categoryservice.delete(statusid);
	}
	
	
}
