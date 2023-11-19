package poly.store.services;

import java.util.List;

import poly.store.entity.Discount;

public interface DiscountService {
	
	List<Discount> findAll();

	Discount findById(Integer discountid);

	Discount create(Discount discount);

	Discount update(Discount discount);

	void delete(Integer discountid);
}
