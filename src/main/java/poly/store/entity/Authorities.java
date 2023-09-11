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
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Authorities", uniqueConstraints = { @UniqueConstraint(columnNames = { "Username", "Roleid" }) })
public class Authorities  implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne
	@JoinColumn(name = "Username")
	private Account account;
	@ManyToOne
	@JoinColumn(name = "Roleid")
	private Role role;
}
