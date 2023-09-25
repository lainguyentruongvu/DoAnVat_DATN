package poly.store.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import poly.store.entity.Product;
import poly.store.services.ProductService;

@Controller
public class IndexController {
	
	@Autowired
	ProductService productService;
	
	
	@RequestMapping("/")
	public String index(Model model) {
		return "product/index";

	}
	@RequestMapping("cart")
	public String cart(Model model) {
		return "cart/cart";

	}
	@RequestMapping("/favorites")
	public String favorite() {
		return "favorite/index";
	}
	@RequestMapping("/favorite/error")
	public String error() {
		return "redirect:/";
	}
	
	@RequestMapping("checkout")
	public String checkout(Model model) {
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
	@RequestMapping("detail")
	public String detail(Model model) {
		return "detail/index";

	}


}
