package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;


import poly.store.entity.Discount;

public interface DiscountDAO extends JpaRepository<Discount, Integer> {

}
