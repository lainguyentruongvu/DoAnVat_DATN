package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Weight;
import java.util.List;


public interface WeightDAO extends JpaRepository<Weight, Integer> {
	Weight findByWeightvalue(String weightvalue);

	
}
