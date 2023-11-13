package poly.store.services;

import java.util.List;

import poly.store.entity.Orderdetail;

public interface OrderdetailService {
	List<Orderdetail> findByOrderId(Integer orderId);

	

}
