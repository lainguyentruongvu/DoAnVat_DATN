package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.ProductDAO;
import poly.store.entity.Product;
import poly.store.services.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	ProductDAO productdao;

	@Override
	public List<Product> findAll() {
		return productdao.findAll();
	}

	@Override
	public Product findById(Integer id) {
		return productdao.findById(id).get();
	}

	@Override
	public List<Product> findByCategoryId(String cid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product create(Product product) {
		return productdao.save(product);
	}

	@Override
	public Product update(Product product) {
		return productdao.save(product);
	}

	@Override
	public void delete(Integer id) {
		productdao.deleteById(id);
	}

}
