package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.Product;
import poly.store.entity.Productweight;
import poly.store.entity.Weight;

public interface ProductWeightDAO extends JpaRepository<Productweight, Integer> {
	List<Productweight> findByProduct(Product id);

	Productweight findByProductAndWeight(Product product, Weight weight);
	
	
	
	Productweight findByProductAndPrice(Product product, Double price);
	@Query("SELECT p FROM Productweight p WHERE p.product = :idProduct AND p.weight = :idWeight")
	Productweight findProductWeightByIdProductAndIdWeight( Product idProduct, Integer idWeight);
	
	
}
