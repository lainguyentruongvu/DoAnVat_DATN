package poly.store.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "Productcombos")
public class ProductCombo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@ManyToOne
	@JoinColumn(name = "Comboid")
	Combo combo;
	
	@ManyToOne
	@JoinColumn(name = "Productweightid")
	Productweight productweight;

	
	
}
