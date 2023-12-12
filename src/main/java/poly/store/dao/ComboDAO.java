package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import poly.store.entity.Combo;

public interface ComboDAO extends JpaRepository<Combo, Integer>{

	@Query("SELECT c FROM Combo c WHERE c.name LIKE %:keyword%")
	List<Combo> searchCombosByKeyword(@Param("keyword") String keyword);
}
