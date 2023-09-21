package poly.store.services;

import com.fasterxml.jackson.databind.JsonNode;

import poly.store.entity.Order;

public interface OrderService {

	Order create(JsonNode orderData);

}
