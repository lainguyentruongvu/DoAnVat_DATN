package poly.store.service.impl;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import poly.store.dao.CartDAO;
import poly.store.dao.CartdetailDAO;
import poly.store.entity.Account;
import poly.store.entity.Cart;
import poly.store.entity.Cartdetail;
import poly.store.services.CartService;

@Service
public class CartServiceImpl implements CartService {
	@Autowired
	CartDAO cartdao;
	
	@Autowired
	CartdetailDAO cartdetaildao;

	@Override
	public Cart findByAccount(Account account) {	
		return cartdao.findByAccount(account);
	}
	
	@Override
	public List<Cartdetail> findByCart(Cart cart) {
		return cartdetaildao.findByCart(cart);
	}
	
	
	

}
