package poly.store.controller;

import org.springframework.stereotype.Controller;
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
	@RequestMapping("/admin/product")
	public String product() {
		return "admin/product/index";
	}
	@RequestMapping("/admin/weight")
	public String weight() {
		return "admin/weight/index";
	}
}
