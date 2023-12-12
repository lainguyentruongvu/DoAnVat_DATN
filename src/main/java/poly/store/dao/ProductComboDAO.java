package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Combo;
import poly.store.entity.ProductCombo;

public interface ProductComboDAO extends JpaRepository<ProductCombo, Integer> {
	List<ProductCombo> findByCombo(Combo combo);
}
