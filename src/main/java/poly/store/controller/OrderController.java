package poly.store.controller;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.minidev.json.JSONObject;
import poly.store.dao.AccountDAO;
import poly.store.dao.CartDAO;
import poly.store.dao.CartdetailDAO;
import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.dao.ProductWeightDAO;
import poly.store.dao.WeightDAO;

import poly.store.entity.Order;
import poly.store.entity.Orderdetail;
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
		String apiUrl = "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime";
		String shopId = "190510";
		String token = "bd356f37-951e-11ee-8bfa-8a2dda8ec551";
		HttpHeaders headers = new HttpHeaders();
		Order order = orderservice.findById(id);

		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("ShopId", shopId);
		headers.set("Token", token);

		String requestBody = "{" + "\"from_district_id\": " + 1750 + "," + "\"from_ward_code\": \"" + "511110" + "\","
				+ "\"to_district_id\": " + order.getTodistrictid() + "," + "\"to_ward_code\": \""
				+ order.getTowardcode().toString() + "\"," + "\"service_id\": " + 53319 + "}";
		HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

		// Gửi yêu cầu API và nhận phản hồi
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);
		String responseBody = response.getBody();

		ObjectMapper objectMapper = new ObjectMapper();
		try {
			// Đọc dữ liệu JSON thành một đối tượng Map
			Map<String, Object> jsonMap = objectMapper.readValue(responseBody,
					new TypeReference<Map<String, Object>>() {
					});

			// Lấy đối tượng "data" từ Map
			Map<String, Object> dataMap = (Map<String, Object>) jsonMap.get("data");
			Object leadtimeObject = dataMap.get("leadtime");
			if (leadtimeObject != null) {
				Long leadtime;
				// Kiểm tra kiểu dữ liệu của giá trị và chuyển đổi nếu cần
				if (leadtimeObject instanceof Integer) {
					leadtime = ((Integer) leadtimeObject).longValue();
				} else if (leadtimeObject instanceof Long) {
					leadtime = (Long) leadtimeObject;
				} else {
					// Xử lý trường hợp khác nếu cần
					leadtime = null;
				}
				// Chuyển đổi timestamp sang LocalDateTime
				Instant instant = Instant.ofEpochSecond(leadtime);
				LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.of("Asia/Ho_Chi_Minh"));

				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

				String formattedDateTime = localDateTime.format(formatter);
				// Thêm giá trị leadtime vào model hoặc làm bất kỳ điều gì bạn muốn với nó
				System.out.println(formattedDateTime);
				model.addAttribute("leadtime", formattedDateTime);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		model.addAttribute("order", orderservice.findById(id));
		return "product/detail_order";
	}
}
