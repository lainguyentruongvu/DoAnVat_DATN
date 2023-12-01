package poly.store.controller;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import poly.store.dao.ProductWeightDAO;
import poly.store.entity.Product;
import poly.store.entity.Productweight;
import poly.store.services.ProductService;

@Controller
public class IndexController {

	@Autowired
	ProductService productService;

	@Autowired
	ProductWeightDAO productweightdao;

	@RequestMapping("/")
	public String index(Model model) {
		return "product/index";

	}

	@RequestMapping("cart")
	public String cart(Model model) {
		return "cart/cart";

	}


	@RequestMapping("orderuser")
	public String OrderUser(Model model) {
		return "product/orderuser";

	}
	@RequestMapping("/favorites")
	public String favorite() {
		return "favorite/index";
	}

	@RequestMapping("/favorite/error")
	public String error() {
		return "redirect:/";
	}

	@RequestMapping("checkout/{total}")
	public String checkout(Model model, @PathVariable("total") String encodedTotal) {
		Double total = Double.parseDouble(new String(Base64.getDecoder().decode(encodedTotal)));
		model.addAttribute("total", total);
		return "cart/checkout";

	}

	@RequestMapping("contact")
	public String contact(Model model) {
		return "product/contact";

	}

	@RequestMapping("bill")
	public String bill(Model model) {
		return "bill/index";

	}
	@RequestMapping("404")
	public String loi(Model model) {
		return "product/404";

	}

	@RequestMapping("detail/{id}")
	public String detail(Model model, @PathVariable("id") Integer id) {
		String check = "";
		Product product = productService.findById(id);
	
		List<Productweight> productweight = productweightdao.findByProduct(product);
		for (Productweight productweight2 : productweight) {
			
			if (product.getPrice().equals(productweight2.getPrice()) ) {
				check = productweight2.getWeight().getWeightvalue();				
			}
			break;
		}
	
		model.addAttribute("check", check);
		model.addAttribute("item", product);
		model.addAttribute("weights", productweight);

		return "detail/index";
	}


	@GetMapping("vnpay/test/{tongtienthanhtoan}")
	public String getTest(Model model, @PathVariable("tongtienthanhtoan") String encodedTotal) {
		Double total = Double.parseDouble(new String(Base64.getDecoder().decode(encodedTotal)));
		model.addAttribute("tongtienthanhtoan", total);
		return "cart/test";
	}

}
