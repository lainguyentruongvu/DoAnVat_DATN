package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Status;

public interface StatusDAO extends JpaRepository<Status, Integer> {

}
