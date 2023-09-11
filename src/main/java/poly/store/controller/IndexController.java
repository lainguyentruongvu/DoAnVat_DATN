package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
	@RequestMapping("/")
	public String index(Model model) {
		return "product/index";

	}
	@RequestMapping("cart")
	public String cart(Model model) {
		return "cart/cart";

	}
	@RequestMapping("checkout")
	public String checkout(Model model) {
		return "cart/checkout";

	}
	@RequestMapping("contact")
	public String contact(Model model) {
		return "product/contact";

	}

}
