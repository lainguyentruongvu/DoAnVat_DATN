package poly.store.dao;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.Account;
import poly.store.entity.Evaluate;
import poly.store.entity.Product;

public interface EvaluateDAO extends JpaRepository<Evaluate, Integer> {

	List<Evaluate> findByProduct(Product product);

	@Query("SELECT AVG(e.star) FROM Evaluate e WHERE e.product.id = :productId")
	Double calculateAverageRatingByProductId(Integer productId);

	Evaluate findByProductAndAccount(Product product, Account account);

//	 @Query("SELECT new map(r.product AS product, COUNT(r) AS totalRatings) " +
//	           "FROM Rating r " +
//	           "WHERE r.product.id = :productId " +
//	           "GROUP BY r.product")
//	    List<Map<String, Object>> getRatingSumByProductId(@Param("productId") Long productId);

	@Query("SELECT new map(COUNT(r) AS totalRatings, AVG(r.star) AS averageRating) " + "FROM Evaluate r "
			+ "WHERE r.product.id = :productId " + "GROUP BY r.product")
	List<Map<String, Object>> getAverageRatingByProductId(Integer productId);

}
