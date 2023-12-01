package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import poly.store.dao.StatusDAO;
import poly.store.entity.Status;
import poly.store.services.StatusService;

@Service
public class StatusServiceImpl implements StatusService {

	@Autowired 
	StatusDAO statudao;

	@Autowired
	PasswordEncoder pe;

	@Override
	public Status getOne(Integer newStatusId) {
		return statudao.getOne(newStatusId);
	}

	@Override
	public List<Status> findAll() {
	
		return statudao.findAll();
	}

//	@Override
//	public Status findById(Integer statusid) {
//		return statudao.findById(statusid).get();
//	}

	@Override
	public Status create(Status status) {
		return statudao.save(status);
	}

	@Override
	public Status update(Status status) {
		return statudao.save(status);
	}

	@Override
	public void delete(Integer statusid) {
		statudao.deleteById(statusid);

	}

	

	
}
