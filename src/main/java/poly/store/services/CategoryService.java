package poly.store.services;

import java.util.List;

import poly.store.entity.Category;

public interface CategoryService {

	List<Category> findAll();

	Category findById(Integer id);

}
