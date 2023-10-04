package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class adcontroller {
	@RequestMapping("/admin")
	public String index() {
		return "admin/index";
	}
	@RequestMapping("/admin/account")
	public String account() {
		return "admin/account/index";
	}
	@RequestMapping("/admin/authority")
	public String authority() {
		return "admin/authority/index";
	}
}
