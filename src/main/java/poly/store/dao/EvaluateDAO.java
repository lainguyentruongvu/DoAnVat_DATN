package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import poly.store.entity.Evaluate;
import poly.store.entity.Product;

public interface EvaluateDAO extends JpaRepository<Evaluate, Integer> {

	Evaluate findByProduct(Product product);

}
