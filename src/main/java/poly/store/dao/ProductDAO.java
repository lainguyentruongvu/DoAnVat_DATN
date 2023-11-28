package poly.store.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



import poly.store.entity.Category;
import poly.store.entity.FavoriteStatistics;
import poly.store.entity.Product;
import poly.store.entity.ProductStatistics;
import poly.store.entity.Report;
import poly.store.entity.ReportCate;

public interface ProductDAO extends JpaRepository<Product, Integer> {

	List<Product> findByCategory(Category cate);

	@Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
	List<Product> searchProductsByKeyword(@Param("keyword") String keyword);

	@Query("SELECT COUNT(o) FROM Product o")
	Integer countProduct();

	@Query("SELECT new poly.store.entity.FavoriteStatistics(p, COUNT(f)) " + "FROM Product p "
			+ "LEFT JOIN p.favorites f " + "GROUP BY p.id")
	List<FavoriteStatistics> getFavoriteCountPerProduct();
	
	@Query("SELECT NEW ProductStatistics(p.name, SUM(od.quantity), SUM(od.price * od.quantity)) " +
			"FROM Product p " +
			"JOIN Orderdetail od ON od.product.id = p.id " +
			"GROUP BY p.name " +
			"ORDER BY SUM(od.quantity) DESC")
	List<ProductStatistics> findTopSellingProducts();
	
	@Query("SELECT NEW poly.store.entity.ReportCate(o.product.category.name, COUNT(o), SUM(o.quantity ), SUM(o.price * o.quantity)) FROM Orderdetail o GROUP BY o.product.category.name ORDER BY COUNT(o) DESC")
	List<ReportCate> getProductSummary();

	
}
