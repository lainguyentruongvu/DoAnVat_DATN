package poly.store.dao;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.Account;
import poly.store.entity.Order;
import poly.store.entity.OrderStatistics;
import poly.store.entity.Orderdetail;
import poly.store.entity.Product;
import poly.store.entity.Revenuestatistics;

public interface OrderDAO extends JpaRepository<Order, Integer> {
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

	@Query("SELECT SUM(o.totalamount) FROM Order o")
	Double calculateTotalAmountForAllOrders();

	@Query("SELECT COUNT(*) FROM Order b WHERE CAST(b.createdate AS date) = CAST(GETDATE() AS date)")
	Long countOrdersPlacedToday();

	@Query("SELECT COUNT(*) FROM Order ")
	Long countOrders();

	List<Order> findByAccount(Account account);

	@Query("SELECT o FROM Order o WHERE username = :id ORDER BY createdate DESC")
	List<Order> findOrderByUsername(String id);

	@Query("SELECT NEW Revenuestatistics(YEAR(o.createdate), SUM(o.totalamount)) FROM Order o GROUP BY YEAR(o.createdate)")
	List<Revenuestatistics> getYearRevenue();

	@Query("SELECT NEW Revenuestatistics(MONTH(o.createdate), SUM(o.totalamount)) FROM Order o GROUP BY MONTH(o.createdate)")
	List<Revenuestatistics> getMonthRevenue();

	@Query("SELECT NEW Revenuestatistics(FUNCTION('DAY', o.createdate), SUM(o.totalamount)) FROM Order o GROUP BY FUNCTION('DAY', o.createdate)")
	List<Revenuestatistics> getDateRevenue();
	
	
	  @Query("SELECT NEW OrderStatistics(MONTH(o.createdate), COUNT(o)) " +
	           "FROM Order o " +
	           "GROUP BY MONTH(o.createdate)")
	    List<OrderStatistics> countOrdersByMonth();
}
