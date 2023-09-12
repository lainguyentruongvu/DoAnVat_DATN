package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import poly.store.entity.Account;
import poly.store.entity.Favorite;
import poly.store.entity.Product;

public interface FavoriteDAO extends JpaRepository<Favorite, Integer> {

	List<Favorite> findByAccount(Account account);
	
	Favorite findByAccountAndProduct(Account acc, Product product);
}
