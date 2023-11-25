package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
public class Admincontroller {
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
	@RequestMapping("/admin/order")
	public String order() {
		return "admin/order/index";
	}
	@RequestMapping("/admin/weight")
	public String weight() {
		return "admin/weight/index";
	}
	@RequestMapping("/admin/voucher")
	public String voucher() {
		return "admin/voucher/index";
	}
	@RequestMapping("/admin/discount")
	public String discount() {
		return "admin/discount/index";
	}
	@RequestMapping("/admin/category")
	public String category() {
		return "admin/category/index";
	}
}
