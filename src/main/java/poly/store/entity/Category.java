package poly.store.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;



import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Data;




@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Categorys")
public class Category  implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer id;
	String name;
	@JsonIgnore
	@OneToMany(mappedBy = "category" ,fetch = FetchType.EAGER)
	List<Product> products;

}
