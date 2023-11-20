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



import poly.store.dao.ProductDAO;
import poly.store.entity.Product;
import poly.store.entity.Voucher;
import poly.store.services.ProductService;
import poly.store.services.VoucherService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/voucher")
public class VoucherRestController {	
	@Autowired
	VoucherService voucherservice;
	
	
	
	@GetMapping()
	public List<Voucher> findAll(){
		return voucherservice.findAll();
	}
	
	@GetMapping("{voucherid}")
	public Voucher getOne(@PathVariable("voucherid") String voucherid) {
		return voucherservice.findById(voucherid);
	}

	@PostMapping
	public Voucher create(@RequestBody Voucher voucher) {
		return voucherservice.create(voucher);
	}

	@PutMapping("{voucherid}")
	public Voucher update(@PathVariable("voucherid") String voucherid, @RequestBody Voucher voucher) {
		return voucherservice.update(voucher);
	}

	@DeleteMapping("{voucherid}")
	public void delete(@PathVariable("voucherid") String voucherid) {
		voucherservice.delete(voucherid);
	}

}
