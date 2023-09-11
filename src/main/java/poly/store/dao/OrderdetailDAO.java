package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Orderdetail;

public interface OrderdetailDAO extends JpaRepository<Orderdetail, Integer> {

}
