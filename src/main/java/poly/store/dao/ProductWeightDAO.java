package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Productweight;

public interface ProductWeightDAO extends JpaRepository<Productweight, Integer> {

}
