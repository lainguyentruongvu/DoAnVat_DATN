package poly.store.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.store.entity.Voucher;

public interface VoucherDAO extends JpaRepository<Voucher, String> {

}
