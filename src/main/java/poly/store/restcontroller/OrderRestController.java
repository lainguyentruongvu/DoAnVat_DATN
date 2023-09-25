package poly.store.restcontroller;

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

import poly.store.entity.Account;
import poly.store.entity.Order;
import poly.store.services.AccountService;
import poly.store.services.OrderService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/order")
public class OrderRestController {
	@Autowired
	OrderService orderservice;

	@PostMapping
	public Order create(@RequestBody JsonNode orderData) {
		return orderservice.create(orderData);
	}
//	@GetMapping("{id}")
//	public Order orderdetail(@PathVariable("id") Integer id) {
//		return orderservice.findById(id);
//	}

//	@GetMapping("/redirect")
//	public ResponseEntity<Void> redirect() {
//		// Chuyển hướng đến một URL khác
//		return ResponseEntity.status(HttpStatus.FOUND).header(HttpHeaders.LOCATION, "http://localhost:8080/cart/order")
//				.build();
//	}
//
//	@GetMapping("/detail/{id}")
//	public ResponseEntity<Order> returnData(@PathVariable("id") Integer id) {
//		// Trả về dữ liệu
//			
//		return ResponseEntity.ok(orderservice.findById(id));
//	}
}
