package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.EvaluateDAO;
import poly.store.entity.Account;
import poly.store.entity.Evaluate;
import poly.store.entity.Product;
import poly.store.services.EvaluteServive;
@Service
public class EvaluteServiveServiceImpl implements EvaluteServive {
	@Autowired
	EvaluateDAO dao;

	@Override
	public Evaluate create(Evaluate evaluate) {
		return dao.save(evaluate);
	}

	

	@Override
	public List<Evaluate> findAll() {		
		return dao.findAll();
	}



	
}
