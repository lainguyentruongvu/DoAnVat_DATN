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




import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Discounts")
public class Discount implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	Integer discount;
	Date startdate;
	Date enddate;
	String weightvalue;
	@ManyToOne
	@JoinColumn(name = "Productid")
	Product product;

}
