const app = angular.module("app", []);




app.controller("ctrl", function($scope, $http, $location, $window, $interval, $filter) {

	$scope.banner_1900x700 = [];
	$scope.anhphu1_600x370 = [];
	$scope.anhphu2_600x370 = [];
	$scope.anhphu3_600x370 = [];
	$scope.banner1_600x370 = [];
	$scope.banner2_600x370 = [];
	$scope.bannerthongtin1_370x300 = [];
	$scope.bannerthongtin2_370x300 = [];
	$scope.bannerthongtin3_370x300 = [];

	$scope.banner = function() {
		$http.get('/rest/banner').then(function(resp) {
			for (var i = 0; i < resp.data.length; i++) {
				$scope.banner_1900x700 = resp.data[0];
				$scope.anhphu1_600x370 = resp.data[1];
				$scope.anhphu2_600x370 = resp.data[2];
				$scope.anhphu3_600x370 = resp.data[3];
				$scope.banner1_600x370 = resp.data[4];
				$scope.banner2_600x370 = resp.data[5];
				$scope.bannerthongtin1_370x300 = resp.data[6];
				$scope.bannerthongtin2_370x300 = resp.data[7];
				$scope.bannerthongtin3_370x300 = resp.data[8];
			}
		});
	}
	$scope.banner();

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
		$http.get("/rest/products/findByActiveted").then(resp => {
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

						if ($scope.checkweight.length == 0) {
							$scope.data = {
								price: $("#price").text().replace(/,/g, ''),
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
								price: $("#price").text().replace(/,/g, ''),
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
							price: $("#price").text().replace(/,/g, ''),
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
							price: $("#price").text().replace(/,/g, ''),
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


	//Chuong trình giảm giá
	$scope.addcartbestseller = function(item, discount, endate) {
		if (endate == "Đã kết thúc") {
			Swal.fire("Error", "Sản phẩm đã hết thời gian giảm giá!", "error");

		} else {

			$scope.data = {
				price: discount,
				quantity: 1,
				weightvalue: item.weightvalue,
				product: {
					id: item.product.id
				},
				cart: {
					id: $scope.cartid
				}
			}

			console.log($scope.data);
			$http.post("/rest/cart/addcart", $scope.data).then(resp => {
				$scope.data = {};
				Swal.fire("Thành công", "Thêm giỏ hàng thành công", "success");
				$scope.getcartdetails();
				$scope.getTotalItem()
				$scope.toggleSelected(resp.data)
			}).catch(error => {
				console.log(error)
			})

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

					$scope.giamgia();
					$scope.tinhtien();
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
			console.log($scope.voucher);
			if ($scope.coupon != []) {
				// Use Array.prototype.find() instead of a for loop
				var foundVoucher = $scope.voucher.find(v => v.id === $scope.coupon);

				if (foundVoucher) {
					var timeVoucherEnd = new Date(foundVoucher.enddate).toISOString().slice(0, 10);
					var timenow = new Date().toISOString().slice(0, 10);

					if (timeVoucherEnd >= timenow) {
						var giamgia = foundVoucher.discount / 100;
						var tiengiam = parseFloat($scope.totalPrice) * parseFloat(giamgia);
						$scope.total = $scope.totalPrice - tiengiam;
						$scope.viewgiamgia = tiengiam;
						sessionStorage.setItem('coupon', $scope.coupon);

					} else {
						Swal.fire("Lỗi ", "Mã giảm giá hết hạn", "error");
						sessionStorage.setItem('coupon', []);
					}
				} else {
					// This block should only be executed after the loop
					sessionStorage.setItem('coupon', []);
					$scope.viewgiamgia = 0;
					$scope.tinhtien();
					Swal.fire("Lỗi", "Mã giảm giá không tồn tại", "error");
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


	$scope.thanhtoanvnpay = function() {

		//Lấy dữ liệu từ localStore
		$scope.selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

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
				$scope.weightquantt = [];
				$http.post("/rest/order/createvnpay", order).then(resp => {
					for (var i = 0; i < $scope.selectedItems.length; i++) {
						$scope.deleteida($scope.selectedItems[i].id)
					}
					localStorage.clear();
					sessionStorage.clear();
					console.log(resp);

				}).catch(error => {
					Swal.fire("Error", "Đặt hàng thất bại!", "error");
					console.log(error)
				})
			}
		}
		$scope.bill.purchase();
	}


	$scope.message = "";
	$scope.thanhtoan = function() {

		//Lấy dữ liệu từ localStore
		$scope.selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

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
			message: $scope.message,
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
				$scope.weightquantt = [];
				$http.post("/rest/order", order).then(resp => {

					for (var i = 0; i < $scope.selectedItems.length; i++) {
						$scope.deleteida($scope.selectedItems[i].id)
					}

					Swal.fire("Success", "Đặt hàng thành công!", "success");
					var count = 0;
					var totalItems = $scope.selectedItems.length;

					function checkComplete() {

						count++;
						if (count === totalItems) {
							localStorage.clear();
							$window.location.href = "/order/detail/" + resp.data.id;
						}
					}

					for (var i = 0; i < $scope.selectedItems.length; i++) {
						processProduct($scope.selectedItems[i], checkComplete);
					}
					localStorage.clear();
					sessionStorage.clear();
					console.log(resp);
				}).catch(error => {
					Swal.fire("Error", "Đặt hàng thất bại!", "error");
					console.log(error)
				})

				function processProduct(item, callback) {
					$http.get(`/rest/order/weight/${item.weightvalue}`).then(resp => {
						$scope.weightquantt = resp.data;
						$http.get(`/rest/order/productweight/${item.product.id}/${$scope.weightquantt.id}`).then(resp => {
							console.log(resp.data.id);
							$http.put(`/rest/order/putquantity/${resp.data.id}/${item.quantity}`).then(resp => {
								callback(); // Gọi callback khi công việc đã hoàn thành
							}).catch(error => {
								console.log(error);
								callback(); // Gọi callback ngay cả khi có lỗi để tránh trường hợp lặp vô hạn
							});
						}).catch(error => {
							console.log(error);
							callback(); // Gọi callback ngay cả khi có lỗi để tránh trường hợp lặp vô hạn
						});
					}).catch(error => {
						console.log(error);
						callback(); // Gọi callback ngay cả khi có lỗi để tránh trường hợp lặp vô hạn
					});
				}
			}
		}
		$scope.bill.purchase();
	}
	//Kiểm tra thanh toán

	$scope.cbthanhtoan = function() {
		var check = $('input[name="payment"]:checked').val();
		var phone = $("#phone").val();
		var name = document.getElementById("name").value;
		if ($scope.address == null || $scope.ship == null || phone == [] || name == []) {
			if ($scope.address == null) {
				Swal.fire("Lỗi", "Vui lòng chọn địa chỉ", "error");
			} if ($scope.ship == null) {
				Swal.fire("Lỗi", "Vui lòng chọn phương thức vận chuyển", "error");
			} if (phone == []) {
				Swal.fire("Lỗi", "Số điện thoại không được bỏ trống", "error");
			} if (name == []) {
				Swal.fire("Lỗi", "Họ và tên không được bỏ trống", "error");
			}
		} else {

			if (check == 1) {
				$scope.statusorder = false;
				$scope.thanhtoan();
			} else if (check == 0) {
				$scope.statusorder = true;
				$scope.generatePayment();
				$scope.thanhtoanvnpay();
			}
		}
	}
	//Thanh toán vnpay	
	$scope.generatePayment = function() {

		var tongtienthanhtoanElement = document.getElementById("tongtienthanhtoan");

		// Lấy nội dung từ phần tử
		var tongtienthanhtoanText = tongtienthanhtoanElement.innerHTML;

		// Chuyển đổi chuỗi thành kiểu số
		var tongtienthanhtoan = parseFloat(tongtienthanhtoanText.replace(',', ''));

		console.log(tongtienthanhtoan);
		var params = {
			bankCode: "NCB",
			amount: tongtienthanhtoan,
		};
		console.log('Request Params:', params)
		$http.get(`/api/vnpay/createpayment`, { params: params })
			.then(function(response) {
				console.log('Response:', response);
				$scope.payment = response.data;
				window.location.href = $scope.payment;
			})
			.catch(function(error) {
				console.error('Error:', error);
			});
	};



	//Lấy phí ship API
	document.addEventListener('phiDataAvailable', function(event) {
		$scope.$apply(function() {
			var total = document.getElementById("total").innerHTML;
			var totalreplace = parseFloat(total.replace(',', ''));
			console.log(totalreplace);
			// Truy cập dữ liệu từ event.detail
			$scope.ship = event.detail;
			//Tính tổng tiền thanh toán
			$scope.tongtienthanhtoan = totalreplace + $scope.ship;
			console.log($scope.tongtienthanhtoan);

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
			console.log($scope.productdetail);
			$scope.priceww = $scope.productdetail.price
			$scope.check = true;
			$scope.weightvalue = null;
		}).catch(error => {
			console.log("Error", error);
		})




		$http.get(`/rest/products/weight/${id}`).then(resp => {
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
		console.log(id)
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
		console.log(id)
		$http.get(`/rest/favorites/check/${id}`).then(resp => {
			$scope.favorite = resp.data.length;
			if ($scope.favorite == 0) {
				$scope.addfavorite(id);
			} else {
				$scope.removefavorite(id);
				$scope.defaul = 0;
			}
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

	//bestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestseler


	$scope.getbestsl = function() {
		$http.get("/rest/bestseller/").then(resp => {
			$scope.bestseller = resp.data;
		}).catch(error => {
			console.log("Error", error)
		})
	}

	$scope.calculateRemainingTime = function(endDate) {
		const currentTime = new Date();
		const endTime = new Date(endDate);

		if (currentTime > endTime) {
			return 'Đã kết thúc';
		}

		const remainingMilliseconds = endTime - currentTime;
		const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
		const remainingMinutes = Math.floor(remainingSeconds / 60);
		const remainingHours = Math.floor(remainingMinutes / 60);

		if (remainingHours >= 24) {
			const remainingDays = Math.floor(remainingHours / 24);
			return `${remainingDays} ngày`;
		}

		const hours = remainingHours % 24;
		const minutes = remainingMinutes % 60;
		const seconds = remainingSeconds % 60;

		return `${hours} giờ ${minutes} phút ${seconds} giây`;
	};

	$scope.removeExpiredProducts = function() {
		const currentTime = new Date();

		$scope.bestseller = $scope.products.filter(product => {
			const discount = $scope.discounts.find(discount => discount.book.id === book.id);
			return !discount || currentTime < new Date(discount.endDate);
		});
	};

	// Fetch data every minute
	const fetchInterval = $interval($scope.getbestsl, 20000);

	// Call the function to remove expired products immediately
	$scope.removeExpiredProducts();
	//	// Cancel the interval when the controller is destroyed
	$scope.$on('$destroy', function() {
		$interval.cancel(fetchInterval);
	});


	$scope.getbestsl();

	//bestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestselerbestseler


	//Profile
	$scope.account = {};
	$scope.updateAccount = function() {

		console.log($scope.account)
		$http.put(`/rest/accounts/${$scope.account.username}`, $scope.account).then(function(response) {
			// Xử lý phản hồi sau khi cập nhật thành công
			Swal.fire({
				type: 'success',
				title: 'Cập nhật thành công',
				text: 'Thông tin người dùng đã được cập nhật',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})

		}).catch(function(error) {
			// Xử lý lỗi nếu cập nhật không thành công
			Swal.fire({
				type: 'error',
				title: 'Lỗi cập nhật thông tin người dùng',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		});
	};

	$scope.imageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/avt', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.account.image = resp.data.name;
			Swal.fire({
				type: 'success',
				title: 'Thêm ảnh thành công',
				text: '',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Lỗi thêm ảnh',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})
	}

	//Profile


	//Updatepassword
	$scope.updatematkhau = function() {
		let pwold = $scope.account.password;
		let pwoldnl = document.getElementById("pwold").value;
		let pw = document.getElementById("pawword").value;
		let pwcf = document.getElementById("cfpw").value;

		if (pwold == pwoldnl) {
			if (pw == pwcf) {
				$http.put(`/rest/accounts/updatepassword/${$scope.account.username}`, pw).then(function(response) {
					// Xử lý phản hồi sau khi cập nhật thành công
					Swal.fire({
						type: 'success',
						title: 'Cập nhật thành công',
						text: 'Thông tin người dùng đã được cập nhật',
						icon: "success",
						showConfirmButton: false,
						timer: 2000
					})
					document.getElementById("pwold").value = "";
					document.getElementById("pawword").value = "";
					document.getElementById("cfpw").value = "";
				}).catch(function(error) {
					// Xử lý lỗi nếu cập nhật không thành công
					Swal.fire({
						type: 'error',
						title: 'Lỗi cập nhật thông tin người dùng',
						text: error,
						icon: "error",
						showConfirmButton: false,
						timer: 2000
					})
					console.log("Erorr", err);
				});

			} else {
				Swal.fire("Error", "Xác nhận mật khẩu không chính xác!", "error");
			}

		} else {
			Swal.fire("Error", "Mật khẩu cũ không chính xác!", "error");

		}



	};
	//End Updatepassword
	$scope.showAll = false;
	$scope.toggleShowAll = function() {
		$scope.showAll = !$scope.showAll;
	};

	//Hiển thị đơn hàng người dùng
	$scope.orderuserfc = function() {
		var url = `rest/order/getOrderAndOrderdetail/` + $scope.username;
		$http.get(url).then(resp => {
			$scope.orderuser = resp.data;
		});
	}
	$scope.orderuserfc();




	//Hiển thị đơn hàng người dùng theo trang thái số lượng
	$scope.orderuserstatuss = function() {
		var url = `rest/order/status/` + $scope.username;
		$http.get(url).then(resp => {
			$scope.orderuserstatus = resp.data;

		});
	}
	$scope.orderuserstatuss();


	//Hiển thị đơn hàng người dùng theo trang thái
	$scope.status1 = function(idstatus) {
		var url = `/rest/order/${$scope.username}/${idstatus}`;
		$http.get(url).then(resp => {
			$scope.orderuser1 = resp.data;
		});
	}


	$scope.status2 = function(idstatus) {
		var url = `/rest/order/${$scope.username}/${idstatus}`;
		console.log(idstatus);
		$http.get(url).then(resp => {
			$scope.orderuser2 = resp.data;

		});
	}
	$scope.status3 = function(idstatus) {
		var url = `/rest/order/${$scope.username}/${idstatus}`;
		console.log(idstatus);
		$http.get(url).then(resp => {
			$scope.orderuser3 = resp.data;

		});
	}
	$scope.status4 = function(idstatus) {
		var url = `/rest/order/${$scope.username}/${idstatus}`;
		console.log(idstatus);
		$http.get(url).then(resp => {
			$scope.orderuser4 = resp.data;

		});
	}
	$scope.status5 = function(idstatus) {
		var url = `/rest/order/${$scope.username}/${idstatus}`;
		console.log(idstatus);
		$http.get(url).then(resp => {
			$scope.orderuser5 = resp.data;

		});
	}
	// Kết thúc hiển thị đơn hàng người dùng theo trang thái



	$scope.showOrderDetail = function(orderId) {
		var url = `/rest/order/getOrderAndOrderdetailOrderId/${orderId}`;
		$http.get(url).then(resp => {
			$scope.orderdetail = resp.data;
			window.location.href = "/order_detail/" + orderId;
		});
	};






	$scope.closeModal = function() {
		$("#closeBtn").modal("hide");
	};





	$scope.trangthai = function(id) {
		var url = `/rest/order/trangthai/${id}`;
		$http.get(url).then(resp => {
			$scope.orderlist = resp.data;
		});
	}
	$scope.changeStatus = function(orderId, newStatusId) {
		console.log(orderId, newStatusId);

		if (newStatusId === 4) {
			// Sử dụng Swal.fire để hiển thị thông báo
			Swal.fire({
				icon: 'warning',
				title: 'Xác nhận',
				text: 'Bạn chắc chắn hủy đơn hàng không?',
				showCancelButton: true,
				confirmButtonText: 'OK',
				cancelButtonText: 'Hủy'
			}).then((result) => {
				if (result.isConfirmed) {
					// Nếu người dùng chọn "OK," thực hiện thay đổi trạng thái
					performStatusChange(orderId, newStatusId);


				}
			});
		} else {
			// Nếu newStatusId không phải 4, thực hiện ngay thay đổi trạng thái
			performStatusChange(orderId, newStatusId);
		}
	};


	$scope.changeStatusHT = function(orderId, newStatusId) {
		console.log(orderId, newStatusId);

		if (newStatusId === 5) {
			// Sử dụng Swal.fire để hiển thị thông báo
			Swal.fire({
				icon: 'success',
				title: 'Xác nhận',
				text: 'Bạn chắc chắn đã nhận được đơn hàng',
				showCancelButton: true,
				confirmButtonText: 'OK',
				cancelButtonText: 'Hủy'
			}).then((result) => {
				if (result.isConfirmed) {
					// Nếu người dùng chọn "OK," thực hiện thay đổi trạng thái
					performStatusChange(orderId, newStatusId);



				}
			});
		} else {
			// Nếu newStatusId không phải 4, thực hiện ngay thay đổi trạng thái
			performStatusChange(orderId, newStatusId);
		}
	};


	function performStatusChange(orderId, newStatusId) {
		$http.put("/rest/order/" + orderId + "/status?newStatusId=" + newStatusId)
			.then(function(response) {
				$scope.items.push(response.data);
				for (var i = 0; i < $scope.items.length; i++) {
					if ($scope.items[i].id === orderId) {
						$scope.items[i].status.id = newStatusId;
						break;
					}
				}
				$scope.orderuserfc();
			}).catch(function(error) {
				$scope.trangthai(newStatusId);
				$scope.orderuserstatuss();
				$scope.orderuserfc();
				$scope.status1();
				$scope.status2();
				$scope.status3();
				$scope.status4();
				$scope.status5();
				Swal.fire({
					icon: 'success',
					title: 'Thành công',
					text: 'Trạng thái đơn hàng được cập nhật thành công',
					confirmButtonText: 'OK'
				});
			});
	}


	//Hiển thị top sản phẩm bán chạy
	$scope.topproduct = function() {
		var url = `rest/products/findtop4product`;
		$http.get(url).then(resp => {
			$scope.top10product = resp.data;
		});
		$http.get(`rest/products/findtop3product`).then(resp => {
			$scope.top3product = resp.data;
		});
		$http.get(`rest/products/findTop3MostLikedProducts`).then(resp => {
			$scope.findTop3MostLikedProducts = resp.data;
		});
	}
	$scope.topproduct();
	//Kết thúc Hiển thị top sản phẩm bán chạy



	$scope.formData = {
		rating: '',
		comment: ''
	};


	$scope.closeModal = function() {

		$('#modal-container').modal('hide');

	};


	$scope.evaluategetproduct = function(id) {
		$scope.getidproduct = id;

	}
	$scope.evaluate = function() {
		console.log($scope.formData.rating);
		$scope.data = {
			account: {
				username: $scope.username
			},
			product: {
				id: $scope.getidproduct
			},
			comment: $scope.formData.comment,
			star: $scope.formData.rating,
			commentdatenew: new Date().toISOString().slice(0, 10)

		}


		$http.get(`rest/evaluates/checkProductUsername/${$scope.getidproduct}/${$scope.username}`).then(resp => {
			if (resp.data == "") {
				$http.post(`rest/evaluates/`, $scope.data).then(resp => {
					Swal.fire({
						icon: 'success',
						title: 'Thành công',
						text: 'Đánh giá đơn hàng thành công',
						confirmButtonText: 'OK'
					});

				}).catch(error => {
					console.log("Error", error);
				});
			} else {
				Swal.fire({
					icon: 'info',
					title: 'Thất bại',
					text: 'Đơn hàng đã được đánh giá',
					confirmButtonText: 'OK'
				});
			}

		}).catch(error => {
			console.log("Error", error);
		});




	}

	$scope.evalute = function(id) {
		$http.get(`/rest/evaluates/${id}`).then(resp => {
			$scope.evalutes = resp.data;
		}).catch(error => {
			console.log("Error", error);
		});

		$http.get(`/rest/evaluates/average/${id}`).then(resp => {
			$scope.averages = resp.data;
		}).catch(error => {
			console.log("Error", error);
		});


	}







})


