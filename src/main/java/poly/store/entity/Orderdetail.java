package poly.store.entity;

import java.io.Serializable;
import java.util.Date;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Orderdetails")
public class Orderdetail implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	Double price;
	Integer quantity;
	Double totalamount;
	@Temporal(TemporalType.DATE)
	Date orderdate = new Date();
	
	@ManyToOne
	@JoinColumn(name = "Ordersid")
	Order order;
	@ManyToOne
	@JoinColumn(name = "Productid")
	Product product;
	
}
