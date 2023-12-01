package poly.store.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@SuppressWarnings("serial")
@Data
@Entity
@Table(name = "Accounts")
public class Account implements Serializable {
	@Id
	String username;
	String name;
	String password;
	String email;
	String image;
	String address;
	String phone;
	Boolean activeted;
	String token;
		
	@JsonIgnore
	@OneToMany(mappedBy = "account", fetch = FetchType.EAGER)
	List<Authority> authorities;
		
	@JsonIgnore
	@OneToMany(mappedBy = "account")
	List<Favorite> favorite;
	
	@JsonIgnore
	@OneToMany(mappedBy = "account")
	List<Cart> cart;
	
	public boolean activeted() {
        return activeted;
    }

    public void setactiveted(boolean active) {
    	activeted = active;
    }
	
}
