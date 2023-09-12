package poly.store.services;

import java.util.List;

import poly.store.entity.Account;
import poly.store.entity.Favorite;
import poly.store.entity.Product;

public interface FavoriteService {

	List<Favorite> findByAccount(Account account);

	Favorite create(Favorite favorite);

	void deleteById(Integer id);

	Favorite findByAccountAndProduct(Account acc, Product product);

}
