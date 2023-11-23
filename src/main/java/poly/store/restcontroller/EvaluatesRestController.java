package poly.store.restcontroller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import poly.store.entity.Evaluate;
import poly.store.entity.Product;
import poly.store.services.EvaluteServive;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/evaluates")
public class EvaluatesRestController {
	@Autowired EvaluteServive evaluteServive;
	
	
	@PostMapping
	public Evaluate create(@RequestBody Evaluate evaluate) {
		return evaluteServive.create(evaluate);
	}
	@GetMapping("{id}")
	public Evaluate getEvaluteProduct(@PathVariable("id") Product product) {
		return evaluteServive.findByProduct(product);
	}
	
}
