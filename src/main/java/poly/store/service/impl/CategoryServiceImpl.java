package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.CategoryDAO;
import poly.store.dao.ProductDAO;
import poly.store.entity.Category;
import poly.store.entity.Product;
import poly.store.services.CategoryService;
import poly.store.services.ProductService;
@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	CategoryDAO categorydao;

	@Override
	public List<Category> findAll() {
	
		return categorydao.findAll();
	}

	@Override
	public Category findById(Integer id) {
		
		return categorydao.findById(id).get();
	}
	
	


}
