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

import poly.store.dao.ComboDAO;
import poly.store.dao.ProductComboDAO;
import poly.store.entity.Combo;
import poly.store.entity.ProductCombo;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/productcombos")
public class ProductComboRestController {
	
	@Autowired
	ProductComboDAO productComboDAO;
	
	@Autowired
	ComboDAO comboDAO;
	
	@GetMapping
	public List<ProductCombo> list(){
		return productComboDAO.findAll();
	}
	
	@GetMapping("{idcombo}")
	public List<ProductCombo> findCombo(@PathVariable("idcombo") Integer idcombo){
		Combo combo = comboDAO.findById(idcombo).get();
		return productComboDAO.findByCombo(combo);
	}
	
	@PostMapping
	public ProductCombo create(@RequestBody ProductCombo productCombo){
		return productComboDAO.save(productCombo);
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable("id") Integer id) {
		productComboDAO.deleteById(id);
	}
}
