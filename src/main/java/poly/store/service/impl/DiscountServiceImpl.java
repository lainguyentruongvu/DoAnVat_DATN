package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.DiscountDAO;
import poly.store.entity.Discount;
import poly.store.services.DiscountService;

@Service
public class DiscountServiceImpl implements DiscountService {
	@Autowired
	DiscountDAO discountdao;

	@Override
	public List<Discount> findAll() {
		return discountdao.findAll();
	}

	@Override
	public Discount findById(Integer discountid) {
		return discountdao.findById(discountid).get();
	}

	@Override
	public Discount create(Discount discount) {
		return discountdao.save(discount);
	}

	@Override
	public Discount update(Discount discount) {
		return discountdao.save(discount);
	}

	@Override
	public void delete(Integer discountid) {
		discountdao.deleteById(discountid);

	}
}
