package poly.store.dao;

import java.util.List;

import org.hibernate.stat.internal.CategorizedStatistics;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.CategoryStatistics;
import poly.store.entity.Order;
import poly.store.entity.Orderdetail;
import poly.store.entity.Product;

public interface OrderdetailDAO extends JpaRepository<Orderdetail, Integer> {
	List<Orderdetail> findByOrderId(Integer orderId);

	List<Orderdetail> findByOrderId(Order orderId);

	@Query("SELECT od FROM Orderdetail od JOIN FETCH od.product p WHERE od.order.id = :orderId")
	List<Orderdetail> findByOrderIdWithProducts(Integer orderId);

//	@Query("SELECT od.product " + "FROM OrderDetail od " + "GROUP BY od.product " + "ORDER BY SUM(od.quantity) DESC")
//	List<Product> findTopSellingProducts();

	@Query("SELECT o FROM Orderdetail o WHERE order = :orderId")
	List<Orderdetail> getOrderDetails(Integer orderId);

	@Query("SELECT  p.id " + "FROM Orderdetail od " + "JOIN od.product p " + "GROUP BY p.id "
			+ "ORDER BY SUM(od.quantity) DESC")
	List<Object[]> findTop10BestSellingProducts(Pageable pageable);

	@Query("SELECT new CategoryStatistics(c.name, SUM(od.quantity)) FROM Orderdetail od JOIN od.product p JOIN p.category c GROUP BY c.name")
	List<CategoryStatistics> sumSoldProductsByCategory();
	
	

}
