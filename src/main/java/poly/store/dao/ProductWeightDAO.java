package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Product;
import poly.store.entity.Productweight;

public interface ProductWeightDAO extends JpaRepository<Productweight, Integer> {
	List<Productweight> findByProduct(Product id);
}
