package poly.store.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Revenuestatistics {
	@Id
	private Integer calendar;
	private Double  totalRevenue; 
}
