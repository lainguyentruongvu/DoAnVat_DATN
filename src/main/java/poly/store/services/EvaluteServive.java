package poly.store.services;

import java.util.List;


import poly.store.entity.Evaluate;
import poly.store.entity.Product;

public interface EvaluteServive {

	Evaluate create(Evaluate evaluate);

	
	List<Evaluate> findAll();



}
