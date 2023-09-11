const app = angular.module("app", []);
app.controller("ctrl", function($scope, $http, $interval) {
	$scope.product = function() {
		$http.get("/rest/products").then(resp => {
			$scope.products = resp.data;
		});
	}
	$scope.product();
})