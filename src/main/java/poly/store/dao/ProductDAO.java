package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import poly.store.entity.Category;
import poly.store.entity.Product;

public interface ProductDAO extends JpaRepository<Product, Integer> {

	List<Product> findByCategory(Category cate);

	@Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
	List<Product> searchProductsByKeyword(@Param("keyword") String keyword);

	@Query("SELECT COUNT(o) FROM Product o")
	Integer countProduct();
}
