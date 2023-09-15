package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class adcontroller {
	@RequestMapping("/admin")
	public String index() {
		return "admin/index";
	}
}
