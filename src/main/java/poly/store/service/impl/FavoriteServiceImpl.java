package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import poly.store.dao.FavoriteDAO;
import poly.store.entity.Account;
import poly.store.entity.Favorite;
import poly.store.entity.Product;
import poly.store.services.FavoriteService;

@Service
public class FavoriteServiceImpl implements FavoriteService{

	@Autowired
	FavoriteDAO favoritesDAO;
	
	@Override
	public List<Favorite> findByAccount(Account account) {
		return favoritesDAO.findByAccount(account);
	}
	
	@Override
	public Favorite create(Favorite favorite) {
		return favoritesDAO.save(favorite);
	}
	
	@Override
	public Favorite findByAccountAndProduct(Account acc , Product product) {
		return favoritesDAO.findByAccountAndProduct(acc, product);
	}
	
	@Override
	public void deleteById(Integer id) {
		favoritesDAO.deleteById(id);
	}
}
