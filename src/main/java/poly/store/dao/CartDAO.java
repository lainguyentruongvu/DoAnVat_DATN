package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;
import poly.store.entity.Product;

public interface CartDAO  extends JpaRepository<Cart, Integer> {
	Cart findByAccount(Account acc);
//	Cartdetail findByCartAndBook(Cart cart, Product product);
}
