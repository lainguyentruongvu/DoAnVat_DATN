package poly.store.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

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
import poly.store.entity.Category;
import poly.store.entity.Item;
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
				Productweight productweight = productweightdao.findByProductAndWeight(orderdetail.getProduct(), weight);
				productweight.setQuantity(productweight.getQuantity() - orderdetail.getQuantity());
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

	@RequestMapping("/order_detail/{id}")
	public String orderdetailindex(Model model, @PathVariable("id") Integer id) {
//		String apiUrl = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime";
//		String shopId = "190510";
//		String token = "bd356f37-951e-11ee-8bfa-8a2dda8ec551";
//		HttpHeaders headers = new HttpHeaders();
//		Order order = orderservice.findById(id);
//		List<Orderdetail> orderDetails = orderdetaildao.findByOrder(order);
//
//		// Tạo danh sách items
//		List<Item> items = new ArrayList<>();
//		Item item = new Item();
//		// Duyệt qua danh sách orderDetails và thêm vào danh sách items
//		for (Orderdetail currentOrderDetail : orderDetails) {
//
//			item.setName(currentOrderDetail.getProduct().getName());
//			item.setQuantity(currentOrderDetail.getQuantity());
//			item.setPrice(currentOrderDetail.getPrice());
//			item.setLength(500);
//			item.setWidth(200);
//			item.setWeight(200);
//			item.setCategory("aaaa");
//			items.add(item);
//
//		}
//
//		headers.setContentType(MediaType.APPLICATION_JSON);
//		headers.set("ShopId", shopId);
//		headers.set("Token", token);

//		var cod_amount = 0;
//		if (order.getStatusorder() == true) {
//			cod_amount = (int) (order.getTotalamount() - order.getShip());
//		} else {
//			cod_amount = 0;
//		}
//		String requestBody = "{" + "\"payment_type_id\": 2," + "\"note\": \"" + order.getMessage() + "\","
//				+ "\"required_note\": \"KHONGCHOXEMHANG\"," + "\"from_ward_code\": \"550108\"," + "\"return_phone\": \""
//				+ order.getPhone() + "\"," + "\"return_address\": \"" + order.getAddress() + "\","
//				+ "\"return_district_id\": " + 1442 + "," + "\"return_ward_code\":\"20109\"," + "\"to_name\": \""
//				+ order.getAccount().getName() + "\"," + "\"to_phone\": \"" + order.getPhone() + "\","
//				+ "\"to_address\": \"" + order.getAddress() + "\"," + "\"to_ward_code\": \""
//				+ order.getTowardcode().toString() + "\"," + "\"to_district_id\": " + order.getTodistrictid() + ","
//				+ "\"cod_amount\": " + cod_amount + "," + "\"weight\": 200," + "\"length\": 3," + "\"width\": 18,"
//				+ "\"height\": 19," + "\"cod_failed_amount\": 2000," + "\"pick_station_id\": 1442,"
//				+ "\"insurance_value\": 10000," + "\"service_id\": 0," + "\"service_type_id\": 2," + "\"coupon\": null,"
//				+ "\"items\": " + items + // Đặt giá trị thích hợp cho items
//				"}";

//		String requestBody = "{" + "\"from_district_id\": " + 1750 + "," + "\"from_ward_code\": \"" + "511110" + "\","
//				+ "\"to_district_id\": " + order.getTodistrictid() + "," + "\"to_ward_code\": \""
//				+ order.getTowardcode().toString() + "\"," + "\"service_id\": " + 53319 + "}";
//		HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

		// Gửi yêu cầu API và nhận phản hồi
//		RestTemplate restTemplate = new RestTemplate();
//		ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
//		String responseBody = response.getBody();
//		System.out.println(request);
		model.addAttribute("order", orderservice.findById(id));
		return "product/detail_order";
	}
}
