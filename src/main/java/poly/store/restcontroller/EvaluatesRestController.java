package poly.store.restcontroller;



import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.EvaluateDAO;
import poly.store.entity.Account;
import poly.store.entity.Evaluate;
import poly.store.entity.Product;
import poly.store.services.EvaluteServive;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/evaluates")
public class EvaluatesRestController {
	@Autowired EvaluteServive evaluteServive;
	@Autowired EvaluateDAO evalutedao;
	
	@PostMapping
	public Evaluate create(@RequestBody Evaluate evaluate) {
		return evaluteServive.create(evaluate);
	}
	@GetMapping("{id}")
	public List<Evaluate> getEvaluteProduct(@PathVariable("id") Product product) {
		return evaluteServive.findByProduct(product);
	}
	@GetMapping("average/{id}")
	public List<Map<String, Object>> getcalculateAverageRatingByProductId(@PathVariable("id") Integer product) {
		return evalutedao.getAverageRatingByProductId(product);
	}
	
	@GetMapping("checkProductUsername/{id}/{username}")
	public Evaluate getcalculateAverageRatingByProductId(@PathVariable("id") Product id ,@PathVariable("username") Account username) {
		return evalutedao.findByProductAndAccount(id,username);
	}
	
	
	
}
