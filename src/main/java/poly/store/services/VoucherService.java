package poly.store.services;

import java.util.List;

import poly.store.entity.Voucher;

public interface VoucherService {

	List<Voucher> findAll();
	Voucher findById(String voucherid);
	Voucher create(Voucher voucher);
	Voucher update(Voucher voucher);
	void delete(String voucherid);
}
