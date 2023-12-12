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

import poly.store.dao.ComboDAO;
import poly.store.entity.Combo;
import poly.store.entity.Productweight;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/combos")
public class ComboRestController {
	
	@Autowired
	ComboDAO comboDAO;
	
	@GetMapping
	public List<Combo> list(){
		return comboDAO.findAll();
	}
	
	@GetMapping("search")
	public List<Combo> search(@RequestParam(name = "keyword") String keyword) {
		List<Combo> searchcombos = comboDAO.searchCombosByKeyword(keyword);
		return searchcombos;
	}
	
	@GetMapping("{id}")
	public Combo findone(@PathVariable("id") Integer id) {
		return comboDAO.findById(id).get();
	}
	
	@PostMapping
	public Combo create(@RequestBody Combo combo) {
		return comboDAO.save(combo);
	}
	
	@PutMapping("{id}")
	public Combo update(@PathVariable("id") Integer id, @RequestBody Combo combo) {
		return comboDAO.save(combo);
	}
	
	@DeleteMapping("{id}")
	public void delcombo(@PathVariable("id") Integer id) {
		comboDAO.deleteById(id);
	}
}
