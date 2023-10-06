const app = angular.module("app", []);
app.controller("ctrl", function($scope, $http, $location, $window) {
	$scope.products = [];

	//Lấy tên tài khoản
	$scope.username = $("#username").text();

	//Lấy thông tin tài khoản
	$scope.account = function() {
		$http.get(`/rest/accounts/` + $scope.username).then(resp => {
			$scope.account = resp.data;
		});

	}
	$scope.account();



	//Load product
	$scope.product = function() {
		$http.get("/rest/products").then(resp => {
			$scope.products = resp.data;
		});
	}
	$scope.product();




	//Load category
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
			params: {
				keyword: $scope.searchKeyword
			}
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
			$scope.checkbox();
			$scope.tinhtien();

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
	//	$scope.addcart = function(p) {
	//		if ($scope.username == "") {
	//			location.href = "/auth/login/form";
	//		} else {}
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

	var modal = document.getElementById("exampleModal");
	document.addEventListener("keydown", function(event) {
		// Kiểm tra xem phím đã nhấn có phải là phím Esc (mã phím 27) không
		if (event.keyCode === 27) {
			$scope.weightvalue = null;
			console.log($scope.weightvalue)
		}
	});
	document.addEventListener("click", function(event) {
		// Kiểm tra xem người dùng đã nhấp chuột bên ngoài modal chưa
		if (event.target === modal) {
			// Nếu người dùng đã nhấp chuột bên ngoài modal, đóng modal
			$scope.weightvalue = null;
			console.log($scope.weightvalue)
		}
	});
	$scope.thoatmodal = function() {
		$scope.weightvalue = null;
		console.log($scope.weightvalue)
	}

	$scope.quantity = 1;

	$scope.addcart = function(p) {
		if ($scope.username == "") {
			location.href = "/auth/login/form";
		} else {

			$http.get(`/rest/cart/checkproductweight/${p.id}/${p.price}`).then(resp => {
				$scope.checkproweight = resp.data;
				$scope.weightvalue = $scope.checkproweight.weight.weightvalue;

				$http.get(`/rest/cart/checkweightnull/${p.id}/${$scope.cartid}`).then(resp => {
					$scope.checkweightnull = resp.data; //trả về 1 đối tượng cartdetail bởi producid, cartid, weightvalue (đặt biệt)
					if ($scope.checkweightnull.length == 0) {
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
							$scope.toggleSelected(resp.data)
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
						$http.post("/rest/cart/addcartbyid?id=" + $scope.checkweightnull.id, $scope.data).then(resp => {
							$scope.data = {};
							Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
							$scope.getcartdetails();
							$scope.getTotalItem()
							$scope.toggleSelected(resp.data)
						}).catch(error => {
							console.log(error)
						})
					}
				}).catch(error => {
					console.log(error)
				})


			}).catch(error => {
				console.log(error)
			})
		}
	}
	$scope.addcartdetail = function(p) {
		if ($scope.username == "") {
			location.href = "/auth/login/form";
		} else {
			if ($scope.weightvalue == null) {
				$http.get(`/rest/cart/checkproductweight/${p.id}/${p.price}`).then(resp => {
					$scope.checkproweight = resp.data;
					$scope.weightvalue = $scope.checkproweight.weight.weightvalue;

					$http.get(`/rest/cart/checkweight/${p.id}/${$scope.cartid}/${$scope.weightvalue}`).then(resp => {
						$scope.checkweight = resp.data; //trả về 1 đối tượng cartdetail bởi producid, cartid, weightvalue (đặt biệt)
						console.log($scope.checkweight.length)
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
								$scope.toggleSelected(resp.data)
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
								$scope.toggleSelected(resp.data)
							}).catch(error => {
								console.log(error)
							})
						}
					}).catch(error => {
						console.log(error)
					})

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
							$scope.toggleSelected(resp.data)
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
							$scope.toggleSelected(resp.data)
						}).catch(error => {
							console.log(error)
						})
					}
				}).catch(error => {
					console.log(error)
				})
			}
		}
	}


	//Tăng giảm số lượng sản phẩm chi tiết
	$scope.productdetailincrease = function() {
		var quantity = document.getElementById("checkqtt").innerText;

		console.log($scope.quantity)
		if ($scope.quantity >= quantity) {
			Swal.fire("error", "Vượt quá số lượng trong kho", "error");
		} else {
			$scope.quantity = $scope.quantity + 1;
		}
	}
	$scope.productdetaireduce = function() {
		if ($scope.quantity <= 1) {
			Swal.fire("error", "Số lượng không nhỏ hơn một", "error");
		} else {
			$scope.quantity = $scope.quantity - 1;
		}

	}
	//Xóa sản phâm khỏi giỏ hàng phụ
	$scope.deleteida = function(id) {
		$http.delete(`/rest/cart/delete/${id}`).then(resp => {
			$scope.getcartdetails();
		}).catch(error => {
			console.log("Error", error);
		})
	}





	// xóa sản phẩm khỏi giỏ hàng và localStorage
	$scope.deleteid = function(id) {
		$scope.selectedItems = JSON.parse(localStorage.getItem("selectedItems"))
		var index = $scope.selectedItems.findIndex(function(p) {
			return p.id === id;
		});
		var currentUrl = $location.absUrl(); // Lấy URL hoàn chỉnh
		if (currentUrl === "http://localhost:8080/") {
			$http.delete(`/rest/cart/delete/${id}`).then(resp => {
				$scope.getcartdetails();
				if (index !== -1) {
					$scope.selectedItems.splice(index, 1);
					localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));
				}
			}).catch(error => {
				Swal.fire("Error", "Xóa sản phẩm thất bại!", "error");
				console.log("Error", error);
			})
		} else {
			$scope.batdk();
			$scope.checkbox();
			$http.delete(`/rest/cart/delete/${id}`).then(resp => {
				$scope.getcartdetails();
				if (index !== -1) {
					$scope.selectedItems.splice(index, 1);
					localStorage.setItem('selectedItems', JSON.stringify($scope.selectedItems));
				}
			}).catch(error => {
				Swal.fire("Error", "Xóa sản phẩm thất bại!", "error");
				console.log("Error", error);
			})
		}
	}
	//Tăng số lượng sản phẩm
	$scope.updateincrease = function(cd, newquantity) {
		cd.quantity++;
		$http.put(`/rest/cart/updateqty`, cd).then(resp => { }).catch(error => {
			console.log("Error", error);
		})
		$scope.selectedItems = JSON.parse(localStorage.getItem("selectedItems"))
		var index = $scope.selectedItems.findIndex(function(p) {
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
	$scope.updatereduce = function(cd, newquantity) {
		if (cd.quantity <= 1) {
			localStorage.clear();
			$scope.deleteid(cd.id)
		} else {
			cd.quantity--;
			$http.put(`/rest/cart/updateqty`, cd).then(resp => { }).catch(error => {
				console.log("Error", error);
			})

			$scope.selectedItems = JSON.parse(localStorage.getItem("selectedItems"))

			var index = $scope.selectedItems.findIndex(function(p) {
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
			localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));

			$scope.tinhtien();
			$scope.giamgia();

		} else {

			// Nếu sản phẩm chưa tồn tại trong localStorage, thêm nó vào danh sách
			selectedItems.push(item);
			localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));

			$scope.tinhtien();
			$scope.giamgia();
		}

		// Cập nhật localStorage với danh sách sản phẩm đã được chọn
		localStorage.setItem(localStorageKey, JSON.stringify(selectedItems));
	};

	//		 Kiểm tra và tô màu các checkbox dựa trên danh sách đã lưu trong localStorage

	var selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

	$scope.checkbox = function() {
		$http.get(`/rest/cart/cartdetails/` + $scope.username).then(resp => {
			$scope.cartdetails = resp.data;

			selectedItems.forEach(function(selectedItem) {
				var item = $scope.cartdetails.find(function(item) {
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
	$scope.tinhtien = function() {
		var storedProducts = localStorage.getItem('selectedItems');
		$scope.tinhtienproduct = JSON.parse(storedProducts);
		$scope.totalPrice = 0;
		$scope.tinhtienproduct.forEach(function(product) {
			$scope.totalPrice += product.price * product.quantity;
			$scope.total = $scope.totalPrice;
		});

	}







	//	Giảm giá 
	$scope.coupon = "";
	$scope.total = 0;
	$scope.giamgia = function() {
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


	//kiểm tra checkbox
	$scope.batdk = function() {
		var checkboxes = document.getElementsByName("cdid");
		var count = 0;

		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				count++;
			}
		}
		if (count < 1) {
			// Nếu không có checkbox nào được chọn, vô hiệu hóa checkbox và button
			checkboxes = document.getElementById("place-order").disabled = true;
			checkboxes = document.getElementById("voucher").disabled = true;
		} else {
			// Nếu có ít nhất một checkbox được chọn, kích hoạt checkbox và button
			checkboxes = document.getElementById("place-order").disabled = false;
			checkboxes = document.getElementById("voucher").disabled = false;
		}
	}
	window.onload = function() {
		$scope.batdk();
	};

	$scope.kiemtragiamgia = function() {
		$scope.coupon = sessionStorage.getItem('coupon');
		if ($scope.coupon == []) {
			$scope.coupon = 'KHONGGIAM';
		} else {
			$scope.coupon;
		}
	}


	$scope.dathang = function() {
		var encodedTotalPrice = btoa($scope.total);
		var url = '/checkout/' + encodedTotalPrice;
		window.location.href = url;
		sessionStorage.setItem('coupon', $scope.coupon);

	}





	$scope.thanhtoan = function() {
		console.log($scope.statusorder);
		//Lấy dữ liệu từ localStore
		$scope.selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
		console.log($scope.selectedItems)
		//Gọi hàm kiểm tra mã giãm giá		
		$scope.kiemtragiamgia();

		$scope.bill = {
			createdate: new Date(),
			address: $scope.address,
			totalamount: $scope.tongtienthanhtoan,
			ship: $scope.ship,
			account: {
				username: $scope.username
			},
			phone: $("#phone").val(),
			voucher: {
				id: $scope.coupon
			},
			status: {
				id: 1
			},
			statusorder: $scope.statusorder,
			message: $("#message").text(),
			get orderdetail() {
				return $scope.selectedItems.map(item => {
					return {
						product: {
							id: item.product.id
						},
						price: item.price,
						quantity: item.quantity,
						weight: item.weightvalue
					}
				});
			},
			purchase() {
				var order = angular.copy(this);
				$http.post("/rest/order", order).then(resp => {
					for (var i = 0; i < $scope.selectedItems.length; i++) {
						$scope.deleteida($scope.selectedItems[i].id)
					}
					localStorage.clear();
					Swal.fire("Success", "Đặt hàng thành công!", "success");
					location.href = "/order/detail/" + resp.data.id;
					console.log(resp.data.id);
				}).catch(error => {
					Swal.fire("Error", "Đặt hàng thất bại!", "error");
					console.log(error)
				})
			}
		}

		$scope.bill.purchase();



	}
	//Kiểm tra thanh toán

	$scope.cbthanhtoan = function() {
		var check = $('input[name="payment"]:checked').val();

		if ($scope.address == null || $scope.ship == null) {
			if ($scope.address == null) {
				Swal.fire("Error", "Vui lòng chọn địa chỉ", "error");
			} else {
				Swal.fire("Error", "Vui lòng chọn phương thức vận chuyển", "error");
			}

		} else {
			if (check >= 1) {
				$scope.statusorder = "Chưa thanh toán";
				$scope.thanhtoan();
			} else {
				$scope.statusorder = "Đã thanh toán";
				$scope.thanhtoan();
				var encodedTotalPrice = btoa($scope.tongtienthanhtoan);
				var url = '/vnpay/test/' + encodedTotalPrice;
				window.location.href = url;
			}
		}
	}
	//Thanh toán vnpay	
	$scope.generatePayment = function() {

		var tongtienthanhtoanElement = document.getElementById("tongtienthanhtoan");

		// Lấy nội dung từ phần tử
		var tongtienthanhtoanText = tongtienthanhtoanElement.innerHTML;

		// Chuyển đổi chuỗi thành kiểu số
		var tongtienthanhtoan = parseFloat(tongtienthanhtoanText.replace('.', ''));


		var params = {
			bankCode: $scope.bankCode,
			amount: tongtienthanhtoan
		};
		console.log('Request Params:', params)
		$http.get(`/api/vnpay/createpayment`, { params: params })
			.then(function(response) {
				console.log('Response:', response);
				$scope.payment = response.data;
			})
			.catch(function(error) {
				console.error('Error:', error);
			});
	};



	//Lấy phí ship API
	document.addEventListener('phiDataAvailable', function(event) {
		$scope.$apply(function() {
			// Truy cập dữ liệu từ event.detail
			$scope.ship = event.detail;
			//Tính tổng tiền thanh toán
			$scope.tongtienthanhtoan = $scope.total + $scope.ship;
		});
	});


	//Lấy  Address API
	document.addEventListener('resultAvailable', function(event) {
		// Truy cập dữ liệu từ event.detail
		$scope.$apply(function() {
			$scope.address = event.detail;
		});
	});


	//Đăng xuất xóa localStorage
	$scope.logout = function() {
		localStorage.clear();
	}

	//trang chi tiết	
	$scope.productdetails = function(id) {
		sessionStorage.setItem("item", JSON.stringify(id));
		$http.get(`/rest/products/${id}`).then(resp => {
			$scope.productdetail = resp.data;
			$scope.priceww = $scope.productdetail.price
			$scope.check = true;
			$scope.weightvalue = null;
		}).catch(error => {
			console.log("Error", error);
		})
		$http.get(`/rest/products/weight/${id}`).then(resp => {
			console.log($scope.priceww);
			$scope.productweight = resp.data;
			for (var i = 0; i < $scope.productweight.length; i++) {
				if ($scope.productweight[i].price === $scope.priceww) {
					$scope.weightvalue = $scope.productweight[i].weight.weightvalue;
					$scope.quantityview = $scope.productweight[i].quantity;
				}
			}
		}).catch(error => {
			console.log("Error", error);
		})

	}


	$scope.weightquantityandprice = function(idpro, idw) {
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

	$scope.addfavorite = function(id) {
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

	$scope.removefavorite = function(id) {
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

	$scope.checkAddOrRemove = function(id) {
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