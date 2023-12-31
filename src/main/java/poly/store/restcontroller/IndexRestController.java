package poly.store.restcontroller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.dao.ProductDAO;
import poly.store.dao.ProductWeightDAO;
import poly.store.dao.WeightDAO;
import poly.store.entity.Order;
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
	OrderdetailDAO orderdetaildao;

	@Autowired
	ProductWeightDAO productweightdao;

	@Autowired
	WeightDAO weightdao;

	@GetMapping("findByActiveted")
	public List<Product> findByActiveted() {
		return productdao.findByActiveted(true);
	}

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

	@GetMapping("weight")
	public List<Weight> weightAll() {
		List<Weight> weight = weightdao.findAll();
		return weight;
	}

	@GetMapping("weight/{id}")
	public List<Productweight> productweight(@PathVariable("id") Integer id) {
		Product product = productservice.findById(id);
		List<Productweight> productweight = productweightdao.findByProduct(product);
		return productweight;
	}

	@GetMapping("weight/quantityandprice/{idpro}/{idw}")
	public Productweight weightandprice(@PathVariable("idpro") Integer idpro, @PathVariable("idw") Integer idw) {
		Product product = productservice.findById(idpro);
		Weight weight = weightdao.findById(idw).get();
		return productweightdao.findByProductAndWeight(product, weight);
	}

	// POST
	@PostMapping
	public Product create(@RequestBody Product product) {
		return productservice.create(product);
	}

	@PostMapping("productweight")
	public Productweight createproweight(@RequestBody Productweight productweight) {
		return productweightdao.save(productweight);
	}

	// PUT
	@PutMapping("{id}")
	public Product update(@PathVariable("id") Integer id, @RequestBody Product product) {
		return productservice.update(product);
	}

	@PutMapping("/productweight/{id}")
	public Productweight updateproweight(@PathVariable("id") Integer id, @RequestBody Productweight productweight) {
		return productweightdao.save(productweight);
	}

	// DELETE
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		productservice.delete(id);
	}

	// DELETE
	@DeleteMapping("/productweight/{id}")
	public void deleteproweight(@PathVariable("id") Integer id) {
		productweightdao.deleteById(id);
	}

	@GetMapping("/findtop4product")
	public List<Product> Top4Product() {
		Pageable pageable = PageRequest.of(0, 4);
		List<Object[]> orderproduct = orderdetaildao.findTop10BestSellingProducts(pageable);
		List<Product> productIds = new ArrayList<>();
		for (Object[] orderProduct : orderproduct) {
			Integer productId = (Integer) orderProduct[0];
			Product listproduct = productservice.findById(productId);
			productIds.add(listproduct);
		}
		return productIds;
	}

	@GetMapping("/findtop3product")
	public List<Product> Top3Product() {
		Pageable pageable = PageRequest.of(0, 3);
		List<Object[]> orderproduct = orderdetaildao.findTop10BestSellingProducts(pageable);
		List<Product> productIds = new ArrayList<>();
		for (Object[] orderProduct : orderproduct) {
			Integer productId = (Integer) orderProduct[0];
			Product listproduct = productservice.findById(productId);
			productIds.add(listproduct);
		}
		return productIds;
	}
	
	@GetMapping("/findTop3MostLikedProducts")
	public List<Product> findTop3MostLikedProducts() {
		Pageable pageable = PageRequest.of(0, 3);
		List<Object[]> product = productdao.findTop3MostLikedProducts(pageable);
		List<Product> productIds = new ArrayList<>();
		for (Object[] orderProduct : product) {
			Integer productId = (Integer) orderProduct[0];
			Product listproduct = productservice.findById(productId);
			productIds.add(listproduct);
		}
		return productIds;
	}

}
