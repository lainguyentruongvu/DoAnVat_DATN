package poly.store.restcontroller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;


import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.dao.ProductWeightDAO;
import poly.store.dao.WeightDAO;
import poly.store.entity.Order;
import poly.store.entity.Orderdetail;
import poly.store.entity.Product;
import poly.store.entity.Productweight;
import poly.store.entity.Status;
import poly.store.entity.Weight;
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
	ProductService productservice;

	@Autowired
	WeightDAO weightdao;

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

	@GetMapping()
	public List<Order> orderliststatus(Model model) {
		return orderDao.getProductsSortedByDate();
	}

	// Hiển thị trạng thái
	@GetMapping("/hienthitrangthai")
	public List<Long> index(Model model) {
		long choXacNhan = orderDao.countOrdersWithStatus(1);
		long dangGiaoHang = orderDao.countOrdersWithStatus(2);
		long huyDonHang = orderDao.countOrdersWithStatus(4);
		long daNhanHang = orderDao.countOrdersWithStatus(3);

		List<Long> list = new ArrayList<>();
		list.add(choXacNhan);
		list.add(dangGiaoHang);
		list.add(daNhanHang);
		list.add(huyDonHang);
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
		productweight.setQuantity(productweight.getQuantity()-quantity);
		productweightdao.save(productweight);
		return ResponseEntity.ok("Số lượng sản phẩm đã được cập nhật.");

	}

	@PutMapping("/{orderId}/status")
	public ResponseEntity<String> changeOrderStatus(@PathVariable Integer orderId, @RequestParam Integer newStatusId) {
		Order order = orderservice.getOne(orderId);
		if (order == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
		}

		Status newStatus = statusservice.getOne(newStatusId);
		if (newStatus == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid new status");
		}

		order.setStatus(newStatus);
		orderservice.save(order);

		return ResponseEntity.ok("Order status updated successfully");
	}
	
	 @GetMapping("orderDetails/{orderId}")
	    public List<Orderdetail> getOrderDetailsByOrderId(@PathVariable Integer orderId) {           
	    	return orderdetailDao.findByOrderIdWithProducts(orderId);
	    }
	 
	

}
