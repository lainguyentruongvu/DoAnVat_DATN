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

import poly.store.entity.Weight;
import poly.store.services.WeightService;
@CrossOrigin("*")
@RestController
@RequestMapping("/rest/weightvalue2")
public class WeightvalueRestController {
	
	@Autowired
	WeightService weightservice;
	
	
	
	@GetMapping()
	public List<Weight> findAll(){
		return weightservice.findAll();
	}
	
	@GetMapping("{weightid}")
	public Weight getOne(@PathVariable("weightid") Integer weightid) {
		return weightservice.findById(weightid);
	}

	@PostMapping
	public Weight create(@RequestBody Weight weight) {
		return weightservice.create(weight);
	}

	@PutMapping("{weightid}")
	public Weight update(@PathVariable("weightid") Integer weightid, @RequestBody Weight weight) {
		return weightservice.update(weight);
	}

	@DeleteMapping("{weightid}")
	public void delete(@PathVariable("weightid") Integer weightid) {
		weightservice.delete(weightid);
	}
		
		
	
}
