const app = angular.module("app", []);
app.controller("ctrl", function($scope, $http, $interval) {
	//Lấy tên tài khoản
	$scope.username = $("#username").text();

	//Load product
	$scope.product = function() {
		$http.get("/rest/products").then(resp => {
			$scope.products = resp.data;
		});
	}
	$scope.product();
	//End Load product


	// load cart username
	$scope.getcartid = function() {
		$http.get(`/rest/cart/` + $scope.username).then(resp => {
			$scope.cart = resp.data;
			$scope.cartid = resp.data.id;
		}).catch(error => {
			console.log("Error", error)
		})
	}
	$scope.getcartid();
	//end load cart username


	// lấy dữ liệu từ giỏ hàng chi tiết
	$scope.getcartdetails = function() {
		$http.get(`/rest/cart/cartdetails/` + $scope.username).then(resp => {
			$scope.cartdetails = resp.data;
		}).catch(error => {
			console.log("Error", error)
		})
	}
	$scope.getcartdetails();
	//kết thúc lấy dữ liệu từ giỏ hàng chi tiết












})