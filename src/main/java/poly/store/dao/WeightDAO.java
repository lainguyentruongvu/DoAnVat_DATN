package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import poly.store.entity.Account;
import poly.store.entity.Weight;
import java.util.List;


public interface WeightDAO extends JpaRepository<Weight, Integer> {
	Weight findByWeightvalue(String weightvalue);

	@Query("SELECT u FROM Weight u WHERE u.weightvalue LIKE %:name% ")
	List<Weight> findByWeightLike(@Param("name") String name);
}
