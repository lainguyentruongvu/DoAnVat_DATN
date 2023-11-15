package poly.store.dao;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.Account;
import poly.store.entity.Order;
import poly.store.entity.Product;

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

//	@Query("SELECT o FROM Order o WHERE Username = :id ORDER BY createdate DESC")
//	List<Order> getDonHangTheoNguoiDung(String id);

	 @Query("SELECT o FROM Order o "
	            + "JOIN FETCH o.orderdetail od "
	            + "JOIN FETCH od.product p "
	            + "WHERE Username = :id")

//	@Query("SELECT o FROM Order o JOIN FETCH o.orderdetail WHERE Username = :id")
	List<Order> findDonHangWithDetailsByIUsername(String id);

}
