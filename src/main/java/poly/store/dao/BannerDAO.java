package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Banner;

public interface BannerDAO extends JpaRepository<Banner,String>{
	

}
