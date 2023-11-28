package poly.store.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductReviewsStatistics {

	private String productName;
    private Double averageRating;
    private Long totalReviews;

}
