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

}
