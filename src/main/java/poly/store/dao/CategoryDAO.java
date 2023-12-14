package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import poly.store.entity.Category;

public interface CategoryDAO extends JpaRepository<Category, Integer> {
	@Query("SELECT u FROM Category u WHERE u.name LIKE %:name%")
	List<Category> findByCategoryLike(@Param("name") String name);
	
	
}
