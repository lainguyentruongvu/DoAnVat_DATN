package poly.store.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import poly.store.dao.AccountDAO;
import poly.store.dao.OrderDAO;
import poly.store.dao.OrderdetailDAO;
import poly.store.entity.Account;
import poly.store.entity.Order;
import poly.store.entity.Orderdetail;
import poly.store.services.AccountService;
import poly.store.services.OrderService;
import poly.store.services.SessionService;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderDAO orderdao;
	@Autowired
	OrderdetailDAO orderdetaildao;
	@Autowired
	SessionService sessionservice;
	@Autowired
	MailerServiceImpl mailer;

	public Order create(JsonNode orderData) {

		ObjectMapper mapper = new ObjectMapper();

		Order order = mapper.convertValue(orderData, Order.class);

		orderdao.save(order);

		TypeReference<List<Orderdetail>> type = new TypeReference<List<Orderdetail>>() {
		};
		List<Orderdetail> details = mapper.convertValue(orderData.get("orderdetail"), type).stream()
				.peek(d -> d.setOrder(order)).collect(Collectors.toList());
		orderdetaildao.saveAll(details);

		return order;
	}

	public Order createvnpay(JsonNode orderData) {

		ObjectMapper mapper = new ObjectMapper();

		Order order = mapper.convertValue(orderData, Order.class);

		TypeReference<List<Orderdetail>> type = new TypeReference<List<Orderdetail>>() {
		};
		List<Orderdetail> details = mapper.convertValue(orderData.get("orderdetail"), type).stream()
				.peek(d -> d.setOrder(order)).collect(Collectors.toList());
		sessionservice.set("order", order);
		sessionservice.set("details", details);
		return order;
	}

	@Override
	public Order findById(Integer id) {
		return orderdao.findById(id).get();
	}

	@Override
	public Order getOne(Integer orderId) {
		return orderdao.getOne(orderId);
	}

	@Override
	public void save(Order order) {
		orderdao.save(order);

	}

	@Override
	public List<Order> findByAccount(Account account) {
		return orderdao.findByAccount(account);
	}

}
