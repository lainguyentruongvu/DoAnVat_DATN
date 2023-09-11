package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Favorite;

public interface FavoriteDAO extends JpaRepository<Favorite, Integer> {

}
