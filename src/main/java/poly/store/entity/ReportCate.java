package poly.store.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportCate {
    private String name;
    private Long numberOfOrders;
    private Long totalQuantity;
    private Double avgPrice;
}
