package poly.store.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class OrderWithDetailsDTO {
	private Order order;
	private List<Orderdetail> orderdetail;

	public static List<OrderWithDetailsDTO> groupByOrderId(List<OrderWithDetailsDTO> ordersWithDetails) {
		Map<Integer, List<OrderWithDetailsDTO>> groupedOrders = ordersWithDetails.stream()
				.collect(Collectors.groupingBy(order -> order.getOrder().getId()));

		return groupedOrders.values().stream().map(OrderWithDetailsDTO::mergeOrderDetails).collect(Collectors.toList());
	}

	private static OrderWithDetailsDTO mergeOrderDetails(List<OrderWithDetailsDTO> orders) {
		OrderWithDetailsDTO mergedOrder = new OrderWithDetailsDTO();
		if (!orders.isEmpty()) {
			OrderWithDetailsDTO firstOrder = orders.get(0);
			mergedOrder.setOrder(firstOrder.getOrder());

			List<Orderdetail> orderDetails = orders.stream().flatMap(order -> order.getOrderdetail().stream())
					.collect(Collectors.toList());
			mergedOrder.setOrderdetail(orderDetails);
		}
		return mergedOrder;
	}

	public OrderWithDetailsDTO(Order order, Orderdetail orderdetail) {
        this.order = order;
        this.orderdetail = new ArrayList<>();
        this.orderdetail.add(orderdetail);
    }
}
