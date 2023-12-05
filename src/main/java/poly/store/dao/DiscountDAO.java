package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import poly.store.entity.Discount;
import poly.store.entity.Product;

public interface DiscountDAO extends JpaRepository<Discount, Integer> {

	@Query("SELECT p FROM Discount p WHERE p.product.name LIKE %:name%")
	List<Discount> searchProductsByKeyword(@Param("name") String name);

}
