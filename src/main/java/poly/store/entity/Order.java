package poly.store.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Orders")
public class Order implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	@Temporal(TemporalType.DATE)
	Date createdate = new Date();
	Double totalamount;
	Double ship;
	String address;
	String phone;
	String message;
	Boolean statusorder;

	@OneToMany(mappedBy = "order" , cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	List<Orderdetail> orderdetail;

	@ManyToOne
	@JoinColumn(name = "Username")
	Account account;

	@ManyToOne
	@JoinColumn(name = "Statusid")
	Status status;

	@ManyToOne()
	@JoinColumn(name = "voucher")
	Voucher voucher;

}
