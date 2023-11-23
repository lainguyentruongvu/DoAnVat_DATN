package poly.store.services;

import poly.store.entity.Account;
import poly.store.entity.Evaluate;
import poly.store.entity.Product;

public interface EvaluteServive {

	Evaluate create(Evaluate evaluate);

	Evaluate findByProduct(Product product);

}
