package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Account;
import poly.store.entity.Cart;

public interface CartDAO  extends JpaRepository<Cart, Integer> {
	Cart findByAccount(Account acc);
}
