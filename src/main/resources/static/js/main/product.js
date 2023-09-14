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
				Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
				$scope.getcartdetails();
				$scope.getTotalItem()
			}).catch(error => {
				console.log(error)
			})
		}

	}

<<<<<<< Updated upstream
=======

	// xóa sản phẩm khỏi giỏ hàng
	$scope.deleteid = function(id) {
		$http.delete(`/rest/cart/delete/${id}`).then(resp => {
			$scope.getcartdetails();
			localStorage.clear();
		}).catch(error => {
			Swal.fire("Error", "Xóa sản phẩm thất bại!", "error");
			console.log("Error", error);
		})
	}


	//Tăng số lượng sản phẩm
	$scope.updateincrease = function(cd, newquantity) {
		cd.quantity++;
		$http.put(`/rest/cart/updateqty`, cd).then(resp => {
		}).catch(error => {
			console.log("Error", error);
		})
		$scope.selectedItems = JSON.parse(localStorage.getItem("selectedItems"))

		var index = $scope.selectedItems.findIndex(function(p) {
			return p.id === cd.id;
		});
		if (index !== -1) {
			$scope.selectedItems[index].quantity = newquantity + 1;
		}
		localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));
		$scope.tinhtien();
	}



	//Giảm số lượng sản phẩm
	$scope.updatereduce = function(cd, newquantity) {
		if (cd.quantity <= 1) {
			localStorage.clear();
			$scope.deleteid(cd.id)
		} else {
			cd.quantity--;
			$http.put(`/rest/cart/updateqty`, cd).then(resp => {
			}).catch(error => {
				console.log("Error", error);
			})

			$scope.selectedItems = JSON.parse(localStorage.getItem("selectedItems"))

			var index = $scope.selectedItems.findIndex(function(p) {
				return p.id === cd.id;
			});
			if (index !== -1) {
				$scope.selectedItems[index].quantity = newquantity - 1;
			}
		}


		localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));
		$scope.tinhtien();

	}


	// Kiểm tra và cập nhật localStorage khi checkbox thay đổi
	$scope.toggleSelected = function(item) {

		var localStorageKey = 'selectedItems';
		var selectedItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];

		// Kiểm tra xem sản phẩm có trong danh sách đã lưu trước đó không
		var index = selectedItems.findIndex(function(selectedItem) {
			return selectedItem.id === item.id;
		});

		if (index !== -1) {
			// Nếu sản phẩm đã tồn tại trong localStorage, xóa nó ra khỏi danh sách
			selectedItems.splice(index, 1);
		} else {
			// Nếu sản phẩm chưa tồn tại trong localStorage, thêm nó vào danh sách
			selectedItems.push(item);
		}

		// Cập nhật localStorage với danh sách sản phẩm đã được chọn
		localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));

		$scope.tinhtien();


	};

	//Tính tiền
	$scope.tinhtien = function() {
		var storedProducts = localStorage.getItem('selectedItems');
		$scope.products = JSON.parse(storedProducts);
		$scope.totalPrice = 0;
		$scope.products.forEach(function(product) {
			$scope.totalPrice += product.price * product.quantity;
		});

	}


	//Trang khi load lại xóa localStorage
	window.onbeforeunload = function() {
		// Xóa dữ liệu trong localStorage
		localStorage.clear();
	}







	//Favorites
	$scope.favorites = [];
	$scope.getfavorite = function() {
		$http.get(`/rest/favorites/` + $scope.username).then(resp => {
			$scope.favorites = resp.data;
		}).catch(error => {
			console.log("Error", error)
		})
	}
	$scope.pagerfavorite = {
		page: 0,
		size: 10,
		get favorites() {
			var start = this.page * this.size;
			return $scope.favorites.slice(start, start + this.size);
>>>>>>> Stashed changes










})