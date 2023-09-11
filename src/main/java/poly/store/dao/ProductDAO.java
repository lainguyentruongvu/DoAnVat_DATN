package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Product;

public interface ProductDAO extends JpaRepository<Product, Integer> {

}
