package poly.store.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import poly.store.entity.Role;

public interface RoleDAO extends JpaRepository<Role, String> {



}
