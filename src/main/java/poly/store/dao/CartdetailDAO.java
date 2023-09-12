package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;
import poly.store.entity.Product;

public interface CartdetailDAO extends JpaRepository<Cartdetail, Integer> {
	List<Cartdetail> findByCart(Cart cart);

	Cartdetail findByCartAndProduct(Cart cart, Product product);
}
