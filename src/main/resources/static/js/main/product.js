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




	//Load product
	$scope.category = function() {
		$http.get("/rest/category").then(resp => {
			$scope.category = resp.data;
		});
	}
	$scope.category();



	//Sản phẩm theo loại
	$scope.productcategory = function(id) {
		var url = `/rest/category/product/${id}`;
		$http.get(url).then(resp => {
			$scope.products = resp.data;
			//			$scope.pager.first();
		});
	}



	//Tìm kiếm theo ký tự	
	$scope.searchKeyword = '';
	$scope.submitForm = function() {
		$http.get('/rest/products/search/', {
			params: { keyword: $scope.searchKeyword }
		}).then(function(response) {
			$scope.products = response.data;
			$scope.pager.first();
			console.log('Search results:', response.data);
		}).catch(error => {
			console.log("Error", error);
		});
	}



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



	// lấy dữ liệu từ giỏ hàng chi tiết
	$scope.getcartdetails = function() {
		$http.get(`/rest/cart/cartdetails/` + $scope.username).then(resp => {
			$scope.cartdetails = resp.data;
		}).catch(error => {
			console.log("Error", error)
		})
	}
	$scope.getcartdetails();


	//tổng item
	$scope.getTotalItem = function() {
		var totalQuantity = $scope.cartdetails.length;
		return totalQuantity;
	}


	// thêm sản phẩm vào giỏ hàng
	$scope.addcart = function(p) {
		if ($scope.username == "") {
			location.href = "/auth/login/form";
		} else {
			$scope.data = {
				price: p.price,
				quantity: 1,
				product: { id: p.id },
				cart: { id: $scope.cartid }
			}
			$http.post("/rest/cart/addcart", $scope.data).then(resp => {
				console.log("Success", resp);
				Swal.fire("Success", "Add to cart successfully!", "success");
				$scope.getcartdetails();
				$scope.getTotalItem()
			}).catch(error => {
				console.log(error)
			})
		}
	}











})