package poly.store.dao;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.Account;
import poly.store.entity.Evaluate;
import poly.store.entity.Product;
import poly.store.entity.ProductReviewsStatistics;

public interface EvaluateDAO extends JpaRepository<Evaluate, Integer> {

	List<Evaluate> findByProduct(Product product);


	@Query("SELECT AVG(e.star) FROM Evaluate e WHERE e.product.id = :productId")
	Double calculateAverageRatingByProductId(Integer productId);

	Evaluate findByProductAndAccount(Product product, Account account);


	@Query("SELECT new map(COUNT(r) AS totalRatings, AVG(r.star) AS averageRating) " + "FROM Evaluate r "
			+ "WHERE r.product.id = :productId " + "GROUP BY r.product")
	List<Map<String, Object>> getAverageRatingByProductId(Integer productId);

	@Query("SELECT NEW poly.store.entity.ProductReviewsStatistics(p.name AS productName, AVG(e.star) AS averageRating, COUNT(e) AS totalReviews) " + "FROM Product p "
			+ "JOIN Evaluate e ON p.id = e.product.id " + "GROUP BY p.name")
	List<ProductReviewsStatistics> getProductReviewsStatistics();


	List<Evaluate> findByProductAndStatus(Product product, boolean status);

}
