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

}
