package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;



import poly.store.entity.Orderdetail;
import poly.store.entity.Product;

public interface OrderdetailDAO extends JpaRepository<Orderdetail, Integer> {
	List<Orderdetail> findByOrderId(Integer orderId);

	@Query("SELECT od FROM Orderdetail od JOIN FETCH od.product p WHERE od.order.id = :orderId")
	List<Orderdetail> findByOrderIdWithProducts(Integer orderId);

//	@Query("SELECT od.product " + "FROM OrderDetail od " + "GROUP BY od.product " + "ORDER BY SUM(od.quantity) DESC")
//	List<Product> findTopSellingProducts();
}
