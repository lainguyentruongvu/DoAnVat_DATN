package poly.store.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Products")
public class Product implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	String name;
	String image;
	Double price;
	Date createdate;
	Boolean activeted;
	String discription;

	@ManyToOne
	@JoinColumn(name = "Categoryid")
	Category category;

	@JsonIgnore
	@OneToMany(mappedBy = "product")
	List<Favorite> favorites;

	@JsonIgnore
	@OneToMany(mappedBy = "product")
	List<Orderdetail> orderdetail;

	@JsonIgnore
	@OneToMany(mappedBy = "product")
	List<Discount> discount;

	@JsonIgnore
	@OneToMany(mappedBy = "product")
	List<Productweight> productweight;

	@JsonIgnore
	@OneToMany(mappedBy = "product")
	List<Evaluate> evaluate;
	@JsonIgnore
	@OneToMany(mappedBy = "product")
	List<Cartdetail> cartdetail;

}
