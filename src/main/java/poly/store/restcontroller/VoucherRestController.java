package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	

}
