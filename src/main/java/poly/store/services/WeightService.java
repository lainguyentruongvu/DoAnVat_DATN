package poly.store.services;

import java.util.List;

import poly.store.entity.Weight;

public interface WeightService {
	List<Weight> findAll();
	Weight findById(Integer weightid);
	Weight create(Weight weight);
	Weight update(Weight weight);
	void delete(Integer weightid);
}
