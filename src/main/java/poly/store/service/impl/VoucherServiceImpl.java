package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.ProductDAO;
import poly.store.dao.VoucherDAO;
import poly.store.entity.Product;
import poly.store.entity.Voucher;
import poly.store.services.ProductService;
import poly.store.services.VoucherService;

@Service
public class VoucherServiceImpl implements VoucherService {
	@Autowired
	VoucherDAO voucherdao;

	@Override
	public List<Voucher> findAll() {
		return voucherdao.findAll();
	}

	@Override
	public Voucher findById(String voucherid) {
		return voucherdao.findById(voucherid).get();
	}

	@Override
	public Voucher create(Voucher voucher) {
		return voucherdao.save(voucher);
	}

	@Override
	public Voucher update(Voucher voucher) {
		return voucherdao.save(voucher);
	}

	@Override
	public void delete(String voucherid) {
		voucherdao.deleteById(voucherid);

	}
}
