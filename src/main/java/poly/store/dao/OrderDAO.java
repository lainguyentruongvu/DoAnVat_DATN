package poly.store.dao;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import poly.store.entity.Account;
import poly.store.entity.Order;
import poly.store.entity.OrderStatistics;
import poly.store.entity.OrderWithDetailsDTO;

import poly.store.entity.Report;
import poly.store.entity.Revenuestatistics;
import poly.store.entity.Status;

public interface OrderDAO extends JpaRepository<Order, Integer> {

	@Query("SELECT u FROM Order u WHERE u.account.name LIKE %:name% OR u.id LIKE %:name% OR  u.address LIKE %:name%")
	List<Order> findByUsernameLike(@Param("name") String name);

	@Query("SELECT o FROM Order o WHERE o.status.id = ?1")
	List<Order> stautus(Integer id);

	@Query("SELECT COUNT(o) FROM Order o WHERE o.status.id = ?1")
	long countOrdersWithStatus(Integer id);

//	@Query("SELECT o FROM Order o WHERE o.status.id = ?1 ORDER BY o.createdate DESC")
//	List<Order> getOrdersWithStatusSortedByDate(Integer id);

	@Query("SELECT c FROM Order c WHERE c.createdate < GETDATE() ORDER BY c.createdate DESC")
	List<Order> getProductsSortedByDate();

	@Query("SELECT b FROM Order b WHERE CAST(b.createdate AS date) = CAST(GETDATE() AS date)")
	List<Order> findBillsCreatedToday();

	@Query("SELECT SUM(b.totalamount) FROM Order b WHERE CAST(b.createdate AS date) = CAST(GETDATE() AS date)")
	BigDecimal getTotalAmountOfOrdersPlacedToday();

	@Query("SELECT SUM(o.totalamount) FROM Order o WHERE o.statusorder = true")
	Double calculateTotalAmountForAllOrders();

	@Query("SELECT COUNT(*) FROM Order b WHERE CAST(b.createdate AS date) = CAST(GETDATE() AS date)")
	Long countOrdersPlacedToday();

	@Query("SELECT COUNT(*) FROM Order ")
	Long countOrders();

	List<Order> findByAccount(Account account);

	@Query("SELECT o FROM Order o WHERE username = :id ORDER BY createdate DESC")
	List<Order> findOrderByUsername(String id);

	@Query("SELECT o FROM Order o WHERE username = :id AND status = :status ORDER BY createdate DESC")
	List<Order> findOrderByUsernameStatus(String id, Status status);

	@Query("SELECT NEW Revenuestatistics(YEAR(o.createdate), SUM(o.totalamount)) FROM Order o WHERE o.statusorder = true GROUP BY YEAR(o.createdate)")
	List<Revenuestatistics> getYearRevenue();

	@Query("SELECT NEW Revenuestatistics(MONTH(o.createdate), SUM(o.totalamount)) FROM Order o WHERE o.statusorder = true GROUP BY MONTH(o.createdate)")
	List<Revenuestatistics> getMonthRevenue();

	@Query("SELECT NEW Revenuestatistics(DAY(o.createdate), SUM(o.totalamount)) FROM Order o WHERE o.statusorder = true AND MONTH(o.createdate) = MONTH(GETDATE()) AND YEAR(o.createdate) = YEAR(GETDATE()) GROUP BY DAY(o.createdate)")
	List<Revenuestatistics> getDateRevenue();

	@Query("SELECT NEW OrderStatistics(MONTH(o.createdate), COUNT(o)) " + "FROM Order o "
			+ "GROUP BY MONTH(o.createdate) ")
	List<OrderStatistics> countOrdersByMonth();

	@Query("SELECT  COUNT(o) FROM Order o WHERE username = :username AND o.status.id = :status")
	Long countOrdersByStatus(String username, Integer status);

	@Query("SELECT NEW poly.store.entity.OrderWithDetailsDTO(o, od) FROM Order o INNER JOIN Orderdetail od ON o.id = od.order.id WHERE username = :userId ORDER BY o.createdate DESC")
	List<OrderWithDetailsDTO> getOrdersWithDetailsByUserId(String userId);

	@Query("SELECT NEW poly.store.entity.OrderWithDetailsDTO(o, od) FROM Order o INNER JOIN Orderdetail od ON o.id = od.order.id WHERE o.id = :orderid")
	List<OrderWithDetailsDTO> getOrdersWithDetailsById(Integer orderid);

	@Query("SELECT NEW poly.store.entity.OrderWithDetailsDTO(o, od) FROM Order o INNER JOIN Orderdetail od ON o.id = od.order.id WHERE username = :userId AND o.status = :orderStatus ")
	List<OrderWithDetailsDTO> getOrdersWithDetailsByUserIdStatus(String userId, Status orderStatus);

	/////
	@Query("SELECT NEW poly.store.entity.Report(b.createdate, a.name, COUNT(*), SUM(b.totalamount)) " + "FROM Order b "
			+ "JOIN Account a ON b.account.username = a.username " + "WHERE b.createdate >= ?1 AND b.createdate <= ?2 "
			+ "GROUP BY b.createdate, a.name " + "ORDER BY SUM(b.totalamount) DESC")
	List<Report> getReportData(Date startDate, Date endDate);

}
