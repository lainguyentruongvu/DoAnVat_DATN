package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.store.dao.BannerDAO;
import poly.store.entity.Banner;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/banner")
public class BannerRestController {

	@Autowired
	BannerDAO bannerDAO;
	
	@GetMapping
	public List<Banner> list(){
		return bannerDAO.findAll();
	}
	
	@PutMapping("{id}")
	public Banner update(@PathVariable("id") String id, @RequestBody Banner banner) {
		return bannerDAO.save(banner);
	}
}
