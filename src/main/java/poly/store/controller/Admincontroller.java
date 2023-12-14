package poly.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import poly.store.dao.AccountDAO;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.services.SessionService;

@Controller
public class Admincontroller {
	@Autowired
	SessionService session;
	@Autowired
	AccountDAO accountDAO;

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

	@RequestMapping("/admin/weightvalue")
	public String weightvalue() {
		return "admin/weightvalue/index";
	}

	@RequestMapping("/admin/statusor")
	public String status() {
		return "admin/status/index";
	}

	@RequestMapping("/admin/banner")
	public String banner() {
		return "admin/banner/index";
	}

	@RequestMapping("/admin/static/evaluate")
	public String staticevaluate() {
		return "admin/static/evaluate";
	}

	@RequestMapping("/admin/static/favorite")
	public String staticfavorite() {
		return "admin/static/favorite";
	}

	@RequestMapping("/admin/static/product")
	public String staticproduct() {
		return "admin/static/product";
	}

	@RequestMapping("/admin/static/category")
	public String staticcategory() {
		return "admin/static/category";
	}

	@RequestMapping("/admin/static/order")
	public String staticorder() {
		return "admin/static/order";
	}

	@RequestMapping("/admin/combo")
	public String combo() {
		return "admin/combo/index";
	}
	@RequestMapping("/admin/qlDanhGia")
	public String quanLyDanhGia() {
		return "admin/quanLyDanhGia/index";
	}
}
