package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import poly.store.entity.Status;

public interface StatusDAO extends JpaRepository<Status, Integer> {
	@Query("SELECT u FROM Status u WHERE u.name LIKE %:name% ")
	List<Status> findByStatusLike(@Param("name") String name);
}
