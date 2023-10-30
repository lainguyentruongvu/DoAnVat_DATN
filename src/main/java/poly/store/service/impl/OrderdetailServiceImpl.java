package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.entity.Orderdetail;
import poly.store.services.OrderdetailService;

@Service
public class OrderdetailServiceImpl implements OrderdetailService {

	@Autowired
	OrderDAO orderdao;
	@Autowired
	OrderdetailDAO orderdetaildao;

	@Override
	public List<Orderdetail> findByOrderId(Integer orderId) {
		// TODO Auto-generated method stub
		return orderdetaildao.findByOrderId(orderId);
	}

}
