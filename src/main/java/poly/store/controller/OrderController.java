package poly.store.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import poly.store.dao.AccountDAO;
import poly.store.dao.CartDAO;
import poly.store.dao.CartdetailDAO;
import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.dao.ProductWeightDAO;
import poly.store.dao.WeightDAO;
import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;
import poly.store.entity.Order;
import poly.store.entity.OrderWithDetailsDTO;
import poly.store.entity.Orderdetail;
import poly.store.entity.Product;
import poly.store.entity.Productweight;
import poly.store.entity.Weight;
import poly.store.services.OrderService;
import poly.store.services.OrderdetailService;
import poly.store.services.ProductService;
import poly.store.services.ProductweightService;
import poly.store.services.SessionService;

@Controller
public class OrderController {
	@Autowired
	OrderService orderservice;
	@Autowired
	ProductWeightDAO productweightdao;
	@Autowired
	OrderdetailService orderdetailservice;
	@Autowired
	HttpServletRequest req;
	@Autowired
	SessionService sessionservice;
	@Autowired
	OrderDAO orderdao;
	@Autowired
	OrderdetailDAO orderdetaildao;
	@Autowired
	ProductService productService;
	@Autowired
	CartdetailDAO cartdetaildao;
	@Autowired
	AccountDAO accountDAO;
	@Autowired
	CartDAO cartDAO;
	@Autowired
	WeightDAO weightDAO;

	@RequestMapping("/order/detail/vnpay")
	public String orderdetail(Model model, Integer oderd1) {

		if (req.getParameter("vnp_ResponseCode").equals("00")) {
			Order order = sessionservice.get("order");
			List<Orderdetail> details = sessionservice.get("details");
			oderd1 = order.getId();
			orderdao.save(order);
			orderdetaildao.saveAll(details);

			for (Orderdetail orderdetail : details) {
				Weight weight = weightDAO.findByWeightvalue(orderdetail.getWeight());
				Productweight productweight = productweightdao
						.findByProductAndWeight(orderdetail.getProduct(), weight);

				productweight.setQuantity(productweight.getQuantity()-orderdetail.getQuantity());
				productweightdao.save(productweight);
			}

			return "redirect:/order/detail/" + order.getId();

		} else {

			String message = "Giao dịch thất bại!";
			model.addAttribute("message", message);
		}

		return "/404";
	}

	@RequestMapping("/order/detail/{id}")
	public String orderdetail(@PathVariable("id") Integer id, Model model) {

		model.addAttribute("order", orderservice.findById(id));
		return "cart/order";
	}
	
	@RequestMapping("/order/detail")
	public String orderdetailindex( Model model) {		
		return "product/detail_order";
	}
}
