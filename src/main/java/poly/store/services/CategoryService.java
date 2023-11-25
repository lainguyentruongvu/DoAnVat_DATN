package poly.store.services;

import java.util.List;

import poly.store.entity.Category;
import poly.store.entity.Discount;

public interface CategoryService {

	List<Category> findAll();

	Category findById(Integer id);


	Category create(Category category);

	Category update(Category category);

	void delete(Integer categoryid);
}
