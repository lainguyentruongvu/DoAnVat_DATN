const app = angular.module("app", []);
app.controller("ctrl", function ($scope, $http) {


	//Lấy tên tài khoản
	$scope.username = $("#username").text();

	$scope.products = [];

	//Load product
	$scope.product = function () {
		$http.get("/rest/products").then(resp => {
			$scope.products = resp.data;
		});
	}
	$scope.product();




	//Load category
	$scope.category = function () {
		$http.get("/rest/category").then(resp => {
			$scope.category = resp.data;
		});
	}
	$scope.category();



	//Sản phẩm theo loại
	$scope.productcategory = function (id) {
		var url = `/rest/category/product/${id}`;
		$http.get(url).then(resp => {
			$scope.products = resp.data;
			//			$scope.pager.first();
		});
	}



	//Tìm kiếm theo ký tự	
	$scope.searchKeyword = '';
	$scope.submitForm = function () {
		$http.get('/rest/products/search/', {
			params: {
				keyword: $scope.searchKeyword
			}
		}).then(function (response) {
			$scope.products = response.data;
			$scope.pager.first();
			console.log('Search results:', response.data);
		}).catch(error => {
			console.log("Error", error);
		});
	}



	// load cart username
	$scope.getcartid = function () {
		$http.get(`/rest/cart/` + $scope.username).then(resp => {
			$scope.cart = resp.data;
			$scope.cartid = resp.data.id;
		}).catch(error => {
			console.log("Error", error)
		})
	}
	$scope.getcartid();



	// lấy dữ liệu từ giỏ hàng chi tiết
	$scope.getcartdetails = function () {
		$http.get(`/rest/cart/cartdetails/` + $scope.username).then(resp => {
			$scope.cartdetails = resp.data;
			$scope.checkbox();
			$scope.tinhtien();
		}).catch(error => {
			console.log("Error", error)
		})

	}

	$scope.getcartdetails();



	//tổng item
	$scope.getTotalItem = function () {
		var totalQuantity = $scope.cartdetails.length;
		return totalQuantity;
	}


	// thêm sản phẩm vào giỏ hàng
	//	$scope.addcart = function(p) {
	//		if ($scope.username == "") {
	//			location.href = "/auth/login/form";
	//		} else {
	//			$scope.data = {
	//				price: p.price,
	//				quantity: 1,
	//				product: { id: p.id },
	//				cart: { id: $scope.cartid }
	//			}
	//			$http.post("/rest/cart/addcart", $scope.data).then(resp => {
	//				Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
	//				$scope.getcartdetails();
	//				$scope.getTotalItem()
	//			}).catch(error => {
	//				console.log(error)
	//			})
	//		}
	//
	//	}


	$scope.quantity = 1;
	$scope.addcart = function (p) {
		if ($scope.weightvalue == null) {
			$http.get(`/rest/cart/checkproductweight/${p.id}/${p.price}`).then(resp => {
				$scope.checkproweight = resp.data;
				$scope.weightvalue = $scope.checkproweight.weight.weightvalue;
				console.log($scope.weightvalue)
			}).catch(error => {
				console.log(error)
			})

			$http.get(`/rest/cart/checkweightnull/${p.id}/${$scope.cartid}`).then(resp => {
				$scope.checkweight = resp.data; //trả về 1 đối tượng cartdetail bởi producid, cartid, weightvalue (đặt biệt)
				if ($scope.checkweight.length == 0) {
					$scope.data = {
						price: p.price,
						quantity: $scope.quantity,
						weightvalue: $scope.weightvalue,
						product: {
							id: p.id
						},
						cart: {
							id: $scope.cartid
						}
					}
					$http.post("/rest/cart/addcart", $scope.data).then(resp => {
						$scope.data = {};
						Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
						$scope.getcartdetails();
						$scope.getTotalItem()
					}).catch(error => {
						console.log(error)
					})
				} else {
					$scope.data = {
						price: p.price,
						quantity: $scope.quantity,
						weightvalue: $scope.weightvalue,
						product: {
							id: p.id
						},
						cart: {
							id: $scope.cartid
						}
					}
					$http.post("/rest/cart/addcartbyid?id=" + $scope.checkweight.id, $scope.data).then(resp => {
						$scope.data = {};
						Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
						$scope.getcartdetails();
						$scope.getTotalItem()
					}).catch(error => {
						console.log(error)
					})
				}
			}).catch(error => {
				console.log(error)
			})
		} else {
			$http.get(`/rest/cart/checkweight/${p.id}/${$scope.cartid}/${$scope.weightvalue}`).then(resp => {
				$scope.checkweight = resp.data; //trả về 1 đối tượng cartdetail bởi producid, cartid, weightvalue (đặt biệt)
				if ($scope.checkweight.length == 0) {
					$scope.data = {
						price: $("#price").text(),
						quantity: $scope.quantity,
						weightvalue: $scope.weightvalue,
						product: {
							id: p.id
						},
						cart: {
							id: $scope.cartid
						}
					}
					$http.post("/rest/cart/addcart", $scope.data).then(resp => {
						$scope.data = {};
						Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
						$scope.getcartdetails();
						$scope.getTotalItem()
					}).catch(error => {
						console.log(error)
					})
				} else {
					$scope.data = {
						price: $("#price").text(),
						quantity: $scope.quantity,
						weightvalue: $scope.weightvalue,
						product: {
							id: p.id
						},
						cart: {
							id: $scope.cartid
						}
					}
					$http.post("/rest/cart/addcartbyid?id=" + $scope.checkweight.id, $scope.data).then(resp => {
						$scope.data = {};
						Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
						$scope.getcartdetails();
						$scope.getTotalItem()
					}).catch(error => {
						console.log(error)
					})
				}
			}).catch(error => {
				console.log(error)
			})
		}
	}


	//Tăng giảm số lượng sản phẩm chi tiết
	$scope.productdetailincrease = function () {
		$scope.quantity = $scope.quantity + 1;
	}
	$scope.productdetaireduce = function () {
		if ($scope.quantity <= 1) {
			Swal.fire("error", "Số lượng không nhỏ hơn một", "error");
		} else {
			$scope.quantity = $scope.quantity - 1;
		}

	}








	// xóa sản phẩm khỏi giỏ hàng
	$scope.deleteid = function (id) {
		$http.delete(`/rest/cart/delete/${id}`).then(resp => {
			$scope.getcartdetails();
			localStorage.clear();
		}).catch(error => {
			Swal.fire("Error", "Xóa sản phẩm thất bại!", "error");
			console.log("Error", error);
		})
	}


	//Tăng số lượng sản phẩm
	$scope.updateincrease = function (cd, newquantity) {
		cd.quantity++;
		$http.put(`/rest/cart/updateqty`, cd).then(resp => {}).catch(error => {
			console.log("Error", error);
		})
		$scope.selectedItems = JSON.parse(localStorage.getItem("selectedItems"))

		var index = $scope.selectedItems.findIndex(function (p) {
			return p.id === cd.id;
		});
		if (index !== -1) {
			$scope.selectedItems[index].quantity = newquantity + 1;
			localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));

			$scope.giamgia();
			$scope.tinhtien();
		}


	}



	//Giảm số lượng sản phẩm
	$scope.updatereduce = function (cd, newquantity) {
		if (cd.quantity <= 1) {
			localStorage.clear();
			$scope.deleteid(cd.id)
		} else {
			cd.quantity--;
			$http.put(`/rest/cart/updateqty`, cd).then(resp => {}).catch(error => {
				console.log("Error", error);
			})

			$scope.selectedItems = JSON.parse(localStorage.getItem("selectedItems"))

			var index = $scope.selectedItems.findIndex(function (p) {
				return p.id === cd.id;
			});
			if (index !== -1) {
				$scope.selectedItems[index].quantity = newquantity - 1;
				localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));

				$scope.giamgia();
				$scope.tinhtien();
			}
		}


		localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));
		$scope.tinhtien();

	}




	// Kiểm tra và cập nhật localStorage khi checkbox thay đổi
	$scope.toggleSelected = function (item) {

		var localStorageKey = 'selectedItems';
		var selectedItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];

		// Kiểm tra xem sản phẩm có trong danh sách đã lưu trước đó không
		var index = selectedItems.findIndex(function (selectedItem) {
			return selectedItem.id === item.id;
		});

		if (index !== -1) {
			// Nếu sản phẩm đã tồn tại trong localStorage, xóa nó ra khỏi danh sách

			selectedItems.splice(index, 1);
			localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
			$scope.giamgia();
			$scope.tinhtien();

		} else {

			// Nếu sản phẩm chưa tồn tại trong localStorage, thêm nó vào danh sách

			selectedItems.push(item);
			localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
			$scope.giamgia();
			$scope.tinhtien();
		}

		// Cập nhật localStorage với danh sách sản phẩm đã được chọn
		localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
	};

	//		 Kiểm tra và tô màu các checkbox dựa trên danh sách đã lưu trong localStorage



	var selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

	$scope.checkbox = function () {
		$http.get(`/rest/cart/cartdetails/` + $scope.username).then(resp => {
			$scope.cartdetails = resp.data;

			selectedItems.forEach(function (selectedItem) {
				var item = $scope.cartdetails.find(function (item) {
					return item.id === selectedItem.id;
				});
				//
				if (item) {
					item.selected = true;
				}
			});
		}).catch(error => {
			console.log("Error", error)
		})
	}

	//Tính tiền
	$scope.tinhtien = function () {
		var storedProducts = localStorage.getItem('selectedItems');
		$scope.tinhtienproduct = JSON.parse(storedProducts);
		$scope.totalPrice = 0;
		$scope.tinhtienproduct.forEach(function (product) {
			$scope.totalPrice += product.price * product.quantity;
			$scope.total = $scope.totalPrice;



		});

	}

	//Danh sách voucher





	//Giảm giá 
	$scope.coupon = "";
	$scope.total = 0;
	$scope.giamgia = function () {
		$http.get("/rest/voucher").then(resp => {
			$scope.voucher = resp.data;

			for (var i = 0; i <= $scope.voucher.length; i++) {
				if ($scope.voucher[i].id === $scope.coupon) {

					var timeVoucherEnd = new Date($scope.voucher[i].enddate).toISOString().slice(0, 10);
					var timenow = new Date().toISOString().slice(0, 10);

					if (timeVoucherEnd >= timenow) {
						var giamgia = $scope.voucher[i].discount / 100;
						var tiengiam = parseFloat($scope.totalPrice) * parseFloat(giamgia);
						$scope.total = $scope.totalPrice - tiengiam;
						$scope.viewgiamgia = tiengiam;
						break;
					} else {
						Swal.fire("error", "Mã giảm giá hết hạn", "error");
						break;
					}
				} else if ($scope.voucher[i].id !== $scope.coupon) {
					$scope.viewgiamgia = 0;
					$scope.tinhtien();
				}
			}
		});
	}



	$scope.purchase = function () {
		$scope.gia = $scope.total;
		console.log($scope.gia);


		window.location.href = '/checkout';
		//		 sessionStorage.setItem('data',localStorage.getItem('selectedItems'));
		$scope.data = storedProducts;
		console.log(data);

	}

	//Đăng xuất xóa localStorage
	$scope.logout = function () {
		localStorage.clear();
	}

	//trang chi tiết	

	$scope.productdetails = function (id) {
		$http.get(`/rest/products/${id}`).then(resp => {
			$scope.productdetail = resp.data;
			$scope.check = true;
			$scope.weightvalue = null;
		}).catch(error => {
			console.log("Error", error);
		})

		$http.get(`/rest/products/weight/${id}`).then(resp => {
			$scope.productweight = resp.data;
		}).catch(error => {
			console.log("Error", error);
		})
	}


	$scope.weightquantityandprice = function (idpro, idw) {
		$scope.check = false;
		$http.get(`/rest/products/weight/quantityandprice/${idpro}/${idw}`).then(resp => {
			$scope.quantityandprice = resp.data;
			$scope.weightvalue = $scope.quantityandprice.weight.weightvalue
			// $scope.price = $scope.quantityandprice.price
		}).catch(error => {
			console.log("Error", error);
		})
	}





	//Favorites
	$scope.favorites = [];
	$scope.getfavorite = function () {
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

		},
		get count() {
			return Math.ceil(1.0 * $scope.favorites.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}

	$scope.addfavorite = function (id) {
		$scope.data = {
			account: {
				username: $scope.username
			},
			product: {
				id: id
			},
			Likedate: new Date().toISOString().slice(0, 10)
		}

		$http.post("/rest/favorites", $scope.data).then(resp => {
			Swal.fire({
				type: 'like',
				title: 'Yêu thích',
				text: 'Đã yêu thích sản phẩm',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.getfavorite()
			console.log($scope.data)
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Yêu thích',
				text: 'Không thể yêu thích sản phẩm',
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})

	}

	$scope.removefavorite = function (id) {
		$http.delete(`/rest/favorites/${id}`).then(resp => {
			Swal.fire({
				type: 'success',
				title: 'Yêu thích',
				text: 'Đã hủy yêu thích',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.getfavorite();
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Yêu thích',
				text: 'Không thể hủy yêu thích sản phẩm',
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log(error)
		})
	}

	$scope.checkAddOrRemove = function (id) {
		$http.get(`/rest/favorites/check/${id}`).then(resp => {
			$scope.favorite = resp.data.length;
			if ($scope.favorite == 0) {
				$scope.addfavorite(id);
			} else {
				$scope.removefavorite(id);
				$scope.defaul = 0;
			}
		}).catch(error => {
			location.href = "/favorite/error";
			console.log("Error", error)
		})
	}

	$scope.pagerfavorite = {
		page: 0,
		size: 10,
		get favorites() {
			var start = this.page * this.size;
			return $scope.favorites.slice(start, start + this.size);

		},
		get count() {
			return Math.ceil(1.0 * $scope.favorites.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}

	$scope.getfavorite();



	$scope.pagerproduct = {
		page: 0,
		size: 12,
		get products() {
			var start = this.page * this.size;
			return $scope.products.slice(start, start + this.size);

		},
		get count() {
			return Math.ceil(1.0 * $scope.products.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page >= this.count) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}

})