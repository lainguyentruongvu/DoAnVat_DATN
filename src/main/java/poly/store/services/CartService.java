package poly.store.services;

import java.util.List;

import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;
import poly.store.entity.Product;

public interface CartService {
	Cart findByAccount(Account account);
	List<Cartdetail> findByCart(Cart cart);
	Cartdetail findByCartAndBook(Cart cart, Product product);
	Cartdetail save(Cartdetail cd);

}
