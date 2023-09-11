package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Cartdetail;



public interface CartdetailDAO  extends JpaRepository<Cartdetail, Integer> {

}
