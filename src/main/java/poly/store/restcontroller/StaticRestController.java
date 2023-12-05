package poly.store.restcontroller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.EvaluateDAO;
import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.dao.ProductDAO;
import poly.store.entity.CategoryStatistics;
import poly.store.entity.FavoriteStatistics;
import poly.store.entity.Order;
import poly.store.entity.OrderStatistics;
import poly.store.entity.ProductReviewsStatistics;
import poly.store.entity.ProductStatistics;
import poly.store.entity.Report;
import poly.store.entity.ReportCate;
import poly.store.entity.Revenuestatistics;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/static")
public class StaticRestController {
	@Autowired
	OrderDAO orderDao;
	@Autowired
	OrderdetailDAO orderdetailDao;

	@Autowired
	ProductDAO productDao;
	@Autowired
	EvaluateDAO evaluateDao;

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
	//Thống kê doanh thu ngày
	@GetMapping("/getDateRevenue")
	public List<Revenuestatistics> getDateRevenue() {
		return orderDao.getDateRevenue();
	}
	//Thống kê doanh thu tháng
	@GetMapping("/getMonthRevenue")
	public List<Revenuestatistics> getMonthRevenue() {
		return orderDao.getMonthRevenue();
	}
	//Thống kê doanh thu năm
	@GetMapping("/getYearRevenue")
	public List<Revenuestatistics> getYearRevenue() {
		return orderDao.getYearRevenue();
	}
	//Thống kê đơn theo tháng ngày
	@GetMapping("/countOrdersByMonth")
	public List<OrderStatistics> countOrdersByMonth() {
		return orderDao.countOrdersByMonth();
	}

	@GetMapping("/sumSoldProductsByCategory")
	public List<CategoryStatistics> sumSoldProductsByCategory() {
		return orderdetailDao.sumSoldProductsByCategory();
	}

	@GetMapping("/getProductReviewsStatistics")
	public List<ProductReviewsStatistics> getProductReviewsStatistics() {
		return evaluateDao.getProductReviewsStatistics();
	}

	@GetMapping("/getFavoriteCountPerProduct")
	public List<FavoriteStatistics> getFavoriteCountPerProduct() {
		return productDao.getFavoriteCountPerProduct();
	}

	@GetMapping("/findTopSellingProducts")
	public List<ProductStatistics> findTopSellingProducts() {
		return productDao.findTopSellingProducts();
	}

	
	////ff
	@GetMapping("/getProductSummary")
	public List<ReportCate> getProductSummary() {
		return productDao.getProductSummary();
	}

	@GetMapping("/getReportData")

	public List<Report> getReports(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
			@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {

		return orderDao.getReportData(startDate, endDate);
	}

}
