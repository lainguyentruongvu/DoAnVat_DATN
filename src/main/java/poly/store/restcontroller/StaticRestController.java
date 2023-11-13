package poly.store.restcontroller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.OrderDAO;
import poly.store.dao.ProductDAO;
import poly.store.entity.Order;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/static")
public class StaticRestController {
	@Autowired
	OrderDAO orderDao;

	@Autowired
	ProductDAO productDao;

	// Đơn đăt hàng hôm nay
	@GetMapping("/ddhanghna")
	public List<Order> ddhanghna() {
		return orderDao.findBillsCreatedToday();
	}

	// Tổng tiền hôm nay
	@GetMapping("/tongtienhomnay")
	public BigDecimal tongtiendonhang() {
		return orderDao.getTotalAmountOfOrdersPlacedToday();
	}

	// Tổng thu nhập
	@GetMapping("/tongthunhap")
	public Double tongthunhap() {
		return orderDao.calculateTotalAmountForAllOrders();
	}

	// Tổng đơn hàng hôm nay
	@GetMapping("/tongdonhanghomnay")
	public Long tongdonhanghomnay() {
		return orderDao.countOrdersPlacedToday();
	}

	// Tổng đơn hàng
	@GetMapping("/tongdonhang")
	public Long tongdonhang() {
		return orderDao.countOrders();
	}

	// Tổng số lượng sản phẩm
	@GetMapping("/demslsp")
	public Integer demslsp() {
		return productDao.countProduct();
	}

	
	
	

}
