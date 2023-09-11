package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Weight;

public interface WeightDAO extends JpaRepository<Weight, Integer> {

}
