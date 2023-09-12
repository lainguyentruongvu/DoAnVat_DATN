package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.Account;



public interface AccountDAO extends JpaRepository<Account, String>{
	Account findByUsername(String username);
	
	
	
	
	
	@Query("SELECT DISTINCT ar.account FROM Authorities ar WHERE ar.role.id IN('DIRE','STAF')")
	List<Account> getAdministrators();

	@Query("SELECT a FROM Account a WHERE a.username =?1 and a.password=?2")
	Account getAccount(String username, String password);

	// Phuc vu viec gui mail
	@Query("SELECT a FROM Account a WHERE a.email=?1")
	public Account findByEmail(String email);

	@Query("SELECT a FROM Account a WHERE a.token=?1")
	public Account findByToken(String token);
}
