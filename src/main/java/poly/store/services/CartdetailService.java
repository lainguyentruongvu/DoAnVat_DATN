package poly.store.services;

import java.util.List;

import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;

public interface CartdetailService {
	Cart findByAccount(Account account);
	List<Cartdetail> findByCart(Cart cart);

}
