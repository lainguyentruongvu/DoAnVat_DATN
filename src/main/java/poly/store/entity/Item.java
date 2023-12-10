package poly.store.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
	String name;
	int quantity;
	double price;
	int length;
	int width;
	int weight;
	String category;


}
