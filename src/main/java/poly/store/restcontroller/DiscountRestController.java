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

import poly.store.entity.Discount;
import poly.store.entity.Voucher;
import poly.store.services.DiscountService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/discount")
public class DiscountRestController {
	@Autowired
	DiscountService discountservice;
	
	
	
	@GetMapping()
	public List<Discount> findAll(){
		return discountservice.findAll();
	}
	
	@GetMapping("{discountid}")
	public Discount getOne(@PathVariable("discountid") Integer discountid) {
		return discountservice.findById(discountid);
	}

	@PostMapping
	public Discount create(@RequestBody Discount discount) {
		return discountservice.create(discount);
	}

	@PutMapping("{discountid}")
	public Discount update(@PathVariable("discountid") Integer discountid, @RequestBody Discount Discount) {
		return discountservice.update(Discount);
	}

	@DeleteMapping("{discountid}")
	public void delete(@PathVariable("discountid") Integer discountid) {
		discountservice.delete(discountid);
	}
}
