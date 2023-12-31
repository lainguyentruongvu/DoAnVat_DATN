package poly.store.restcontroller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import poly.store.dao.AccountDAO;
import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.dao.ProductWeightDAO;
import poly.store.dao.WeightDAO;
import poly.store.entity.Account;
import poly.store.entity.Order;
import poly.store.entity.OrderWithDetailsDTO;
import poly.store.entity.Orderdetail;
import poly.store.entity.Product;
import poly.store.entity.Productweight;
import poly.store.entity.Status;
import poly.store.entity.Weight;
import poly.store.service.impl.MailerServiceImpl;
import poly.store.services.AccountService;
import poly.store.services.OrderService;
import poly.store.services.OrderdetailService;
import poly.store.services.ProductService;
import poly.store.services.StatusService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/order")
public class OrderRestController {
	@Autowired
	OrderService orderservice;
	@Autowired
	MailerServiceImpl mailer;
	@Autowired
	ProductService productservice;

	@Autowired
	AccountService accountservice;

	@Autowired
	WeightDAO weightdao;
	@Autowired
	AccountDAO accountdao;

	@Autowired
	OrderdetailService orderdetailservice;

	@Autowired
	OrderDAO orderDao;

	@Autowired
	OrderdetailDAO orderdetailDao;

	@Autowired
	StatusService statusservice;

	@Autowired
	ProductWeightDAO productweightdao;

	@PostMapping
	public Order create(@RequestBody JsonNode orderData) {
		return orderservice.create(orderData);
	}

	@PostMapping("/createvnpay")
	public Order createvnpay(@RequestBody JsonNode orderData) {
		return orderservice.createvnpay(orderData);
	}

	@GetMapping()
	public List<Order> orderliststatus(Model model) {
		return orderDao.getProductsSortedByDate();
	}

	@GetMapping("/search")
	public List<Order> findByUsernameLike(@RequestParam(name = "name") String name) {
		return orderDao.findByUsernameLike(name);
	}

	// Hiển thị trạng thái
	@GetMapping("/hienthitrangthai")
	public List<Long> index(Model model) {
		long choXacNhan = orderDao.countOrdersWithStatus(1);
		long dangGiaoHang = orderDao.countOrdersWithStatus(2);
		long daGiao = orderDao.countOrdersWithStatus(3);
		long huyDonHang = orderDao.countOrdersWithStatus(4);
		long daNhanHang = orderDao.countOrdersWithStatus(5);
		List<Long> list = new ArrayList<>();
		list.add(choXacNhan);
		list.add(dangGiaoHang);
		list.add(daGiao);
		list.add(huyDonHang);
		list.add(daNhanHang);
		return list;
	}

	@GetMapping("trangthai/{id}")
	public List<Order> getTrangThaiDH(@PathVariable("id") Integer id) {
		List<Order> listoder = orderDao.stautus(id);
		return listoder;

	}

	@GetMapping("weight/{weightvalue}")
	public Weight GetWeight(@PathVariable("weightvalue") String id) {
		return weightdao.findByWeightvalue(id);

	}

	@GetMapping("productweight/{idproduct}/{idweight}")
	public Productweight GetProductWeight(@PathVariable("idproduct") Integer idproduct,
			@PathVariable("idweight") Integer idweight) {
		Product product = productservice.findById(idproduct);
		Weight weight = weightdao.findById(idweight).get();

		return productweightdao.findByProductAndWeight(product, weight);

	}

	@PutMapping("putquantity/{idproductweight}/{quantity}")
	public ResponseEntity<String> PutProductWeight(@PathVariable("idproductweight") Integer idproductweight,
			@PathVariable("quantity") Integer quantity) {
		Productweight productweight = productweightdao.findById(idproductweight).get();
		productweight.setQuantity(productweight.getQuantity() - quantity);
		productweightdao.save(productweight);
		return ResponseEntity.ok("Số lượng sản phẩm đã được cập nhật.");

	}

	@PutMapping("{orderId}/{newStatusId}")
	public ResponseEntity<String> changeOrderStatus(@PathVariable Integer orderId, @PathVariable Integer newStatusId)
			throws MessagingException {
		Order order = orderservice.getOne(orderId);

		if (order == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
		}

		Status newStatus = statusservice.getOne(newStatusId);
		if (newStatus == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid new status");
		}
		String thongBao = "<html>" + "<head>" + "<style>" + "    body {font-family: Arial, sans-serif;}"
				+ "    p {margin-bottom: 10px;}" + "</style>" + "</head>" + "<body>"
				+ "<p><strong>Thông báo: Trạng thái đơn hàng của bạn đã thay đổi</strong></p>" + "<p>Kính gửi: "+order.getAccount().getName()+"</p>"
				+ "<p>Chúng tôi thông báo rằng trạng thái đơn hàng của quý khách đã được cập nhật. Vui lòng kiểm tra chi tiết bên dưới:</p>"
				+ "<p><strong>Trạng thái đơn hàng:</strong> " + newStatus.getName() + "</p>"
				+ "<p>Xin cảm ơn quý khách đã tin tưởng và sử dụng DAV-6 SHOP.</p>" + "<p>Trân trọng,<br/>DAV 6</p>"
				+ "</body>" + "</html>";
		mailer.send(order.getAccount().getEmail(), "Thông báo đơn hàng", thongBao);
		order.setStatusorder(true);
		order.setStatus(newStatus);
		orderservice.save(order);

		return ResponseEntity.ok("Order status updated successfully");
	}

	@GetMapping("orderDetails/{orderId}")
	public List<Orderdetail> getOrderDetailsByOrderId(@PathVariable Integer orderId) {
		return orderdetailDao.findByOrderIdWithProducts(orderId);
	}

	@GetMapping("{id}")
	public List<Order> getOrderByUsername(@PathVariable("id") String id) {
		List<Order> order = orderDao.findOrderByUsername(id);
		return order;

	}

	@GetMapping("{id}/{status}")
	public List<OrderWithDetailsDTO> getOrderByUsernameStatus(@PathVariable("id") String id,
			@PathVariable("status") Status status) {
		List<OrderWithDetailsDTO> data = orderDao.getOrdersWithDetailsByUserIdStatus(id, status);
		List<OrderWithDetailsDTO> groupedData = OrderWithDetailsDTO.groupByOrderId(data);
		Collections.reverse(groupedData);
		return groupedData;

	}

	@GetMapping("status/{id}")
	public List<Long> getOrderByUsernameStatus(@PathVariable("id") String id) {
		Long status1 = orderDao.countOrdersByStatus(id, 1);
		Long status2 = orderDao.countOrdersByStatus(id, 2);
		Long status3 = orderDao.countOrdersByStatus(id, 3);
		Long status4 = orderDao.countOrdersByStatus(id, 4);
		Long status5 = orderDao.countOrdersByStatus(id, 5);
		List<Long> list = new ArrayList<>();
		list.add(status1);
		list.add(status2);
		list.add(status3);
		list.add(status4);
		list.add(status5);
		return list;

	}

	@GetMapping("getOrderAndOrderdetail/{id}")
	public List<OrderWithDetailsDTO> getOrderAndOrderdetail(@PathVariable("id") String id) {
		List<OrderWithDetailsDTO> data = orderDao.getOrdersWithDetailsByUserId(id);
		List<OrderWithDetailsDTO> groupedData = OrderWithDetailsDTO.groupByOrderId(data);
		Collections.reverse(groupedData);
		return groupedData;
	}

	@GetMapping("getOrderAndOrderdetailOrderId/{id}")
	public List<OrderWithDetailsDTO> getOrderAndOrderdetailOrderId(@PathVariable("id") Integer id) {
		List<OrderWithDetailsDTO> data = orderDao.getOrdersWithDetailsById(id);
		List<OrderWithDetailsDTO> groupedData = OrderWithDetailsDTO.groupByOrderId(data);
		Collections.reverse(groupedData);
		return groupedData;
	}

}
