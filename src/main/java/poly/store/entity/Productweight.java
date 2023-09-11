package poly.store.entity;



import java.io.Serializable;

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
@Table(name = "Productweights")
public class Productweight  implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	
	@ManyToOne
	@JoinColumn(name = "Productid")
	Product product;

	@ManyToOne
	@JoinColumn(name = "Weightid")
	Weight weight;
}
