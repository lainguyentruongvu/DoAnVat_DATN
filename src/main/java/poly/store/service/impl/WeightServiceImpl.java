package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.WeightDAO;
import poly.store.entity.Weight;
import poly.store.services.WeightService;

@Service
public class WeightServiceImpl implements WeightService{
	@Autowired
	WeightDAO weightdao;

	@Override
	public List<Weight> findAll() {
		return weightdao.findAll();
	}

	@Override
	public Weight findById(Integer weightid) {
		return weightdao.findById(weightid).get();
	}

	@Override
	public Weight create(Weight weight) {
		return weightdao.save(weight);
	}

	@Override
	public Weight update(Weight weight) {
		return weightdao.save(weight);
	}

	@Override
	public void delete(Integer weightid) {
		weightdao.deleteById(weightid);

	}
}
