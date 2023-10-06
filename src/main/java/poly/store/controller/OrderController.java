package poly.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import poly.store.services.OrderService;

@Controller
public class OrderController {
	@Autowired
	OrderService orderservice;

	@RequestMapping("/order/detail/{id}")
	public String orderdetail(@PathVariable("id") Integer id, Model model) {
		model.addAttribute("order", orderservice.findById(id));
		return "cart/order";

	}
}
