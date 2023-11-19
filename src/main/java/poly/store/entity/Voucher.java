package poly.store.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Vouchers")
public class Voucher implements Serializable {
	@Id
	String id;
	String name;
	Integer discount;
	Date startdate;
	Date enddate;

	@OneToMany(mappedBy = "voucher")
	@JsonIgnore
	List<Order> orders;

}
