package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.CategoryDAO;
import poly.store.dao.ProductDAO;
import poly.store.entity.Category;
import poly.store.entity.Discount;
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
	
	@Override
	public Category create(Category category) {
		return categorydao.save(category);
	}

	@Override
	public Category update(Category category) {
		return categorydao.save(category);
	}

	@Override
	public void delete(Integer categoryid) {
		categorydao.deleteById(categoryid);

	}


}
