const app = angular.module("app", []);
app.controller("account-ctrl", function($scope, $http) {

	$scope.items = [];
	$scope.form = {};
	$scope.roles = {};

	$scope.initialize = function() {
		$http.get('/rest/accounts').then(function(response) {
			$scope.items = response.data;
			console.log($scope.items);
		});
	}


	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$scope.index = -1;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	$scope.reset = function() {
		$scope.form = {};
		$scope.index = 0;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	$scope.imageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/avt', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.form.image = resp.data.name;
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

	$scope.reset_smooth_table = function() {
		$scope.form = {};
		window.scrollTo({
			top: 1000,
			behavior: 'smooth'
		});
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		for (var i = 0; i < $scope.items.length; i++) {
			if (item.email === $scope.items[i].email) {
				Swal.fire({
					type: 'error',
					title: 'Email đã được sử dụng!',
					text: error,
					icon: "error",
					showConfirmButton: false,
					timer: 2000
				})
				console.log("Error", error);
				return;
			} else if (item.phone === $scope.items[i].phone) {
				Swal.fire({
					type: 'error',
					title: 'Số điện thoại đã được sử dụng!',
					text: error,
					icon: "error",
					showConfirmButton: false,
					timer: 2000
				})
				return;
			}
		}
		if (item.password === item.repassword) {
			$http.post(`/rest/accounts`, item).then(resp => {
				$scope.initialize();
				Swal.fire({
					type: 'success',
					title: 'Thêm thành công',

					icon: "success",
					showConfirmButton: false,
					timer: 2000
				})
				$scope.reset_smooth_table();
			}).catch(error => {
				Swal.fire({
					type: 'error',
					title: 'Lỗi thêm người dùng',
					text: error,
					icon: "error",
					showConfirmButton: false,
					timer: 2000
				})
				console.log("Error", error);
			})
		} else {
			Swal.fire({
				type: 'error',
				title: 'Mật khẩu không trùng khớp',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
		}

	}

	// Cập nhật
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/accounts/${item.username}`, item).then(function(response) {
			var index = $scope.items.findIndex(p => p.username == item.username);
			$scope.items[index] = item;
			$scope.initialize();
			Swal.fire({
				type: 'success',
				title: 'Cập nhật thành công',
				text: 'Thông tin người dùng đã được cập nhật',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(function(error) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi cập nhật thông tin người dùng',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}

	// Xóa
	$scope.delete = function(item) {
		// Show a confirmation dialog
		Swal.fire({
			title: 'Xóa người dùng!',
			text: "Bạn chắc chắn muốn xóa người dùng này chứ?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Vâng, Tôi đồng ý!'
		}).then(function(result) {
			if (result.isConfirmed) {
				// If user confirms deletion, send delete request
				$http.delete(`/rest/accounts/${item.username}`).then(function(response) {
					// Remove the item from the items array
					var index = $scope.items.findIndex(p => p.username == item.username);
					$scope.items.splice(index, 1);
					$scope.reset();
					$scope.initialize();
					// Show success message
					Swal.fire(
						'Deleted!',
						'Đã xóa thành công',
						'success'
					);
				}).catch(function(err) {
					// Show error message if deletion fails
					Swal.fire({
						type: 'error',
						title: 'Lỗi xóa người dùng',
						text: 'Người dùng đang ở trạng thái hoạt động!',
						icon: "error",
						showConfirmButton: false,
						timer: 2000
					});
					console.log("Error", err);
				});
			}
		});
	};




	$scope.pager = {
		page: 0,
		size: 4,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
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

	$scope.initialize();
})
//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
app.controller("authority-ctrl", function($scope, $http, $location) {
	var url = "/rest/roles";
	var url1 = "/rest/authorities";
	var url2 = "/rest/accounts?admin=false";
	var url3 = "/rest/authorities?admin=false";
	$scope.roles = [];
	$scope.admins = [];
	$scope.authorities = [];

	var sweetalert = function(text) {
		Swal.fire({
			icon: "success",
			title: text,
			showConfirmButton: false,
			timer: 2000,
		});
	}

	$scope.initialize = function() {
		//load roles
		$http.get(url).then(resp => {
			$scope.roles = resp.data;
		});

		$http.get(url2).then(resp => {
			$scope.admins = resp.data;
		});

		$http.get(url3).then(resp => {
			$scope.authorities = resp.data;
		});
	}

	$scope.authority_of = function(acc, role) {
		if ($scope.authorities) {
			return $scope.authorities.find(ur => ur.account.username == acc.username && ur.role.id == role.id);
		}
	}

	$scope.authority_changed = function(acc, role) {
		var authority = $scope.authority_of(acc, role);
		if (authority) {
			$scope.revoke_authority(authority); //da cap quyen => thu hoi quyen(xoa)
		} else {
			authority = {
				account: acc,
				role: role
			};
			$scope.grant_authority(authority); //chua duoc cap quyen => cap quyen(them moi)
		}
	}

	//them moi authority
	$scope.grant_authority = function(authority) {
		$http.post(`${url1}`, authority).then(resp => {
			$scope.authorities.push(resp.data);
			sweetalert("Cấp quyền sử dụng thành công!");
		}).catch(error => {
			sweetalert("Cấp quyền sử dụng thất bại!");
			console.log("Error: ", error);
		});
	}

	//xoa authority
	$scope.revoke_authority = function(authority) {
		$http.delete(`${url1}/${authority.id}`).then(resp => {
			var index = $scope.authorities.findIndex(a => a.id == authority.id);
			$scope.authorities.splice(index, 1);
			sweetalert("Thu hồi quyền sử dụng thành công!");
		}).catch(error => {
			sweetalert("Thu hồi quyền sử dụng thất bại!");
			console.log("Error: ", error);
		});
	}

	$scope.initialize();
});



/////////////////minh thien////////////////////////
app.controller("product-ctrl", function($scope, $http) {


	$scope.itempros = [];
	$scope.categorys = [];
	$scope.weight = [];
	$scope.createdate = new Date().toISOString().slice(0, 10)

	$scope.initialize = function() {
		$http.get('/rest/products').then(function(resp) {
			$scope.itempros = resp.data;
		});
	}

	$scope.reset_smooth_table = function() {
		$scope.form = {};
		window.scrollTo({
			top: 1000,
			behavior: 'smooth'
		});
	}

	$scope.imageChanged = function(files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/product', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.form.image = resp.data.name;
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

	$scope.createpro = function() {
		$scope.form.createdate = $scope.createdate;
		var item = angular.copy($scope.form);
		$http.post(`/rest/products`, item).then(resp => {
			$scope.initialize();
			var proweight = angular.copy($scope.formprow);
			$scope.productweight = {
				product: {
					id: resp.data.id
				},
				weight: {
					id: proweight.weight.id
				},
				price: $scope.form.price,
				quantity: proweight.quantity
			}
			$http.post(`/rest/products/productweight`, $scope.productweight).then(resp => {
				$scope.reset_smooth_table();
			}).catch(error => {
				console.log("Error", error);
			})
			Swal.fire({
				type: 'success',
				title: 'Thêm thành công',
				text: 'Người dùng được sắp xếp theo tên',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Lỗi thêm người dùng',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})
	}


	$scope.weight = function() {
		$http.get('/rest/products/weight').then(function(resp) {
			$scope.weight = resp.data;
		});

	}

	$scope.categorys = function() {
		$http.get('/rest/category').then(function(resp) {
			$scope.categorys = resp.data;
		});
	}

	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$scope.priceww = $scope.form.price
		console.log($scope.form)
		$http.get(`/rest/products/weight/${item.id}`).then(resp => {
			$scope.productweight = resp.data;
			for (var i = 0; i < $scope.productweight.length; i++) {
				if ($scope.productweight[i].price === $scope.priceww) {
					$scope.formprow = $scope.productweight[i]
				}
			}
		}).catch(error => {
			console.log("Error", error);
		})

		$scope.index = -1;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	$scope.updatepro = function() {
		var item = angular.copy($scope.form);
		console.log(item)
		$http.put(`/rest/products/${item.id}`, item).then(resp => {
			var index = $scope.itempros.findIndex(p => p.id == item.id);
			$scope.itempros[index] = item;
			$scope.initialize();
			Swal.fire("Success", "Cập nhật thành công!", "success");
		}).catch(error => {
			Swal.fire("Error", "Cập nhật thất bại!", "error");
			console.log("Error", error);
		})
	}

	$scope.reset = function() {
		$scope.form = {};
		$scope.formprow = {}
		$scope.index = 0;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	//Xóa sản phẩm
	$scope.deletepro = function(item) {
		if (item.activeted == false) {
			$http.delete(`/rest/products/${item.id}`).then(resp => {
				var index = $scope.itempros.findIndex(p => p.id == item.id);
				$scope.itempros.splice(index, 1);
				$scope.reset();
				Swal.fire("Success", "Xóa sản phẩm thành công!", "success");
			}).catch(error => {
				$http.put(`/rest/products/${item.id}`, item).then(resp => {
					var index = $scope.itempros.findIndex(p => p.id == item.id);
					$scope.itempros[index] = item;
					$scope.initialize();
					Swal.fire("Success", "Đã tắt trạng thái hoạt động sản phẩm!", "success");
				}).catch(error => {
					Swal.fire("Error", "Không thể tắt trạng thái hoạt động sản phẩm!", "error");
					console.log("Error", error);
				})
				console.log("Error", error);
			})
		} else {
			Swal.fire({
				type: 'error',
				title: 'Lỗi xóa sản phẩm',
				text: 'Sản phẩm đang ở trạng thái hoạt động !',
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
		}

	}

	$scope.pager = {
		page: 0,
		size: 4,
		get itempros() {
			var start = this.page * this.size;
			return $scope.itempros.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.itempros.length / this.size);
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
	//WEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHT//WEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHT
	//WEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHT//WEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHTWEIGHT
	$scope.weightadmin = function(id, price) {
		console.log(id, price)
		$scope.showbtn_them = true;
		$scope.showbtn_addweight = true;
		$http.get(`/rest/cart/checkproductweight/${id}/${price}`).then(resp => {
			$scope.productweight = resp.data;
			$scope.priceww = price
		}).catch(error => {
			console.log("Error", error);
		})

		$http.get(`/rest/products/weight/${id}`).then(resp => {
			$scope.productweights = resp.data;
		}).catch(error => {
			console.log("Error", error);
		})

	}


	$scope.weightquantityandprice = function(idpro, idw) {
		$scope.showbtn_del_upd = true;
		$scope.showbtn_addweight = false;
		$scope.showsel = false;
		$http.get(`/rest/products/weight/quantityandprice/${idpro}/${idw}`).then(resp => {
			$scope.quantityandprice = resp.data;
			$scope.weightvalue = $scope.quantityandprice.weight.weightvalue //hông biết có sài k nữa
			$scope.productweight.price = $scope.quantityandprice.price
			$scope.productweight.quantity = $scope.quantityandprice.quantity
			$scope.productweight.id = $scope.quantityandprice.id;
			$scope.productweight.weight.id = $scope.quantityandprice.weight.id
		}).catch(error => {
			console.log("Error", error);
		})
	}


	$scope.resetformw = function() {
		$scope.productweight.price = null;
		$scope.productweight.quantity = null;
		$scope.productweight.id = null;
		$scope.productweight.weight.id = null;
		$scope.showsel = true;
		$scope.showbtn_addweight = true;
		$scope.showbtn_del_upd = false;
	}

	$scope.addweight = function(item) {
		$scope.productweight = angular.copy(item)
		$http.get(`/rest/products/weight/quantityandprice/${$scope.productweight.product.id}/${$scope.productweight.weight.id}`).then(resp => {
			if (resp.data.length == 0) {
				$http.post("/rest/products/productweight", $scope.productweight).then(resp => {
					$scope.weightadmin(item.product.id, item.product.price)
					alert("Thêm trọn lượng thành công")
				}).catch(error => {
					console.log("Error", error);
				})
			} else {
				alert("Có rồi bớt thêm");
			}
		}).catch(error => {

			console.log("Error", error);
		})



	}

	$scope.updateweight = function() {
		var item = angular.copy($scope.productweight);
		console.log(item)
		$http.put(`/rest/products/productweight/${item.id}`, item).then(resp => {
			var index = $scope.itempros.findIndex(p => p.id == item.id);
			$scope.productweight[index] = item;
			Swal.fire("Success", "Cập nhật thành công!", "success");
		}).catch(error => {
			Swal.fire("Error", "Cập nhật thất bại!", "error");
			console.log("Error", error);
		})
	}

	$scope.deleteweight = function(idpro) {
		var idproweight = $scope.productweight.id;
		$http.get(`/rest/products/${idpro}`).then(resp => {
			if ($scope.productweight.price != resp.data.price) { //So sánh giá của weight với giá của product mặc định --> nếu giống thì k cho xó
				$http.delete(`/rest/products/productweight/${idproweight}`).then(resp => {
					$scope.weightadmin(idpro, resp.data.price);
				}).catch(error => {
					Swal.fire("Error", "Xóa thất bại!", "error");
					console.log("Error", error);
				})
			} else {
				alert("Trọng lượng mặc định không được xó")
			}
		}).catch(error => {
			console.log("Error", error);
		})

	}
	$scope.initialize();
	$scope.weight();
	$scope.categorys();
})













//Order Order Order Order Order Order Order Order Order Order Order Order Order 
app.controller("order-ctrl", function($scope, $http) {
	$scope.initialize = function() {

		$http.get("/rest/order/hienthitrangthai").then(resp => {
			$scope.list = resp.data;
		});
		$http.get("/rest/order").then(resp => {
			$scope.orderlist = resp.data;
		});


	}

	$scope.trangthai = function(id) {
		var url = `/rest/order/trangthai/${id}`;
		$http.get(url).then(resp => {
			$scope.items = resp.data;
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
				$scope.initialize();
			}).catch(function(error) {
				$scope.trangthai(newStatusId);
				$scope.initialize();
				Swal.fire({
					icon: 'success',
					title: 'Thành công',
					text: 'Trạng thái đơn hàng được cập nhật thành công',
					confirmButtonText: 'OK'
				});
			});
	}


	$scope.trangthai = function(id) {
		var url = `/rest/order/trangthai/${id}`;
		$http.get(url).then(resp => {
			$scope.orderlist = resp.data;
		});
	}

	$scope.showOrderDetail = function(orderId) {
		$http.get("/rest/order/orderDetails/" + orderId)
			.then(function(response) {
				//						$("#donhangdanggiao").modal("hide");
				//						$("#dagiao").modal("hide");
				//						$("#dahuy").modal("hide");
				$scope.selectedOrderDetails = response.data;
				$('#orderDetailModal').modal('show'); // Hiển thị modal chứa danh sách sản phẩm
			})
			.catch(function(error) {
				console.error("Error fetching order details:", error);
			});
		$('#orderDetailModal').modal('show'); // Hiển thị modal chứa danh sách sản phẩm
	};
	$scope.closeModal = function() {
		$("#orderDetailModal").modal("hide");
	};


	$scope.pager = {
		page: 0,
		size: 10,
		get orderlist() {
			var start = this.page * this.size;
			return $scope.orderlist.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.orderlist.length / this.size);
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











	$scope.initialize();

})
// End  end end  Order Order Order Order Order Order Order Order Order Order Order Order Order 














app.controller("home-ctrl", function($scope, $http) {
	angular.element(document.getElementById('getMonthRevenue')).on('click', function() {
		$scope.getMonthRevenue();
	});
	angular.element(document.getElementById('getYearRevenue')).on('click', function() {
		$scope.getYearRevenue();
	});
	angular.element(document.getElementById('getDateRevenue')).on('click', function() {
		$scope.getDateRevenue();
	});




	$scope.viewstatistics = function() {
		$http.get("/rest/static/tongthunhap").then(resp => {
			$scope.tongthunhap = resp.data;
			console.log($scope.tongthunhap);
		});
		$http.get("/rest/static/demslsp").then(resp => {
			$scope.slsp = resp.data;
		});
		$http.get("/rest/static/ddhanghna").then(resp => {
			$scope.ddhanghna = resp.data;

		});
		$http.get("/rest/static/tongtienhomnay").then(resp => {
			$scope.tongtienhomnay = resp.data;

		});

		$http.get("/rest/static/tongdonhanghomnay").then(resp => {
			$scope.tongdonhanghomnay = resp.data;

		});
		$http.get("/rest/static/tongdonhang").then(resp => {
			$scope.tongdonhang = resp.data;
		});
	}
	$scope.viewstatistics();





	$scope.initialize = function() {

		var lineChart = document.getElementById('lineChart').getContext('2d'),
			barChart = document.getElementById('barChart').getContext('2d'),
			pieChart = document.getElementById('pieChart').getContext('2d');










		//Thống kê theo năm
		$scope.getYearRevenue = function() {
			$http.get("/rest/static/getYearRevenue").then(resp => {
				$scope.revenuestatistics = resp.data;
				$scope.calendar = "năm"
				var totalRevenueData = $scope.revenuestatistics.map(item => item.totalRevenue);
				var calendar = $scope.revenuestatistics.map(item => item.calendar);
				myLineChart.data.datasets[0].data = totalRevenueData;
				myLineChart.data.labels = calendar;
				myLineChart.update();

			});
		}
		$scope.getYearRevenue();

		//Thống kê theo tháng
		$scope.getMonthRevenue = function() {

			$http.get("/rest/static/getMonthRevenue").then(resp => {
				$scope.revenuestatistics = resp.data;
				$scope.calendar = "tháng"
				var totalRevenueData = $scope.revenuestatistics.map(item => item.totalRevenue);
				var calendar = $scope.revenuestatistics.map(item => item.calendar);
				myLineChart.data.datasets[0].data = totalRevenueData;
				myLineChart.data.labels = calendar;
				myLineChart.update();

			});
		}
		//Thống kê theo ngày
		$scope.getDateRevenue = function() {

			$http.get("/rest/static/getDateRevenue").then(resp => {
				$scope.revenuestatistics = resp.data;
				$scope.calendar = "ngày"
				var totalRevenueData = $scope.revenuestatistics.map(item => item.totalRevenue);
				var calendar = $scope.revenuestatistics.map(item => item.calendar);
				myLineChart.data.datasets[0].data = totalRevenueData;
				myLineChart.data.labels = calendar;
				myLineChart.update();

			});
		}

		$scope.countOrdersByMonthfc = function() {
			$http.get("/rest/static/countOrdersByMonth").then(resp => {
				$scope.countOrdersByMonth = resp.data;
				var countOrdersByMonth = $scope.countOrdersByMonth.map(item => item.orderCount);
				var month = $scope.countOrdersByMonth.map(item => item.month);
				myBarChart.data.datasets[0].data = countOrdersByMonth;
				myBarChart.data.labels = month;
				myBarChart.update();

			});
		}
		$scope.countOrdersByMonthfc();

		$scope.sumSoldProductsByCategoryfc = function() {
			$http.get("/rest/static/sumSoldProductsByCategory").then(resp => {
				$scope.sumSoldProductsByCategory = resp.data;
				var sumSoldProductsByCategory = $scope.sumSoldProductsByCategory.map(item => item.categoryName);
				var totalSoldQuantity = $scope.sumSoldProductsByCategory.map(item => item.totalSoldQuantity);
				myPieChart.data.datasets[0].data = totalSoldQuantity;
				myPieChart.data.labels = sumSoldProductsByCategory;
				myPieChart.update();

			});
		}
		$scope.sumSoldProductsByCategoryfc();




		var myLineChart = new Chart(lineChart, {
			type: 'line',
			data: {
				labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
				datasets: [{
					label: "Doanh thu: ",
					borderColor: "#1d7af3",
					pointBorderColor: "#FFF",
					pointBackgroundColor: "#1d7af3",
					pointBorderWidth: 2,
					pointHoverRadius: 4,
					pointHoverBorderWidth: 1,
					pointRadius: 4,
					backgroundColor: 'transparent',
					fill: true,
					borderWidth: 2,
					data: []
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					position: 'bottom',
					labels: {
						padding: 10,
						fontColor: '#1d7af3',
					}
				},
				tooltips: {
					callbacks: {
						label: function(tooltipItem, data) {
							var label = data.datasets[tooltipItem.datasetIndex].label || '';
							var value = formatCurrency(tooltipItem.yLabel);
							return label + ': ' + value;
						}
					},
					bodySpacing: 4,
					mode: "nearest",
					intersect: 0,
					position: "nearest",
					xPadding: 10,
					yPadding: 10,
					caretPadding: 10
				},
				layout: {
					padding: {
						left: 15,
						right: 15,
						top: 15,
						bottom: 15
					}
				}
			}
		});

		function formatCurrency(value) {
			return new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND'
			}).format(value);
		}

		var myBarChart = new Chart(barChart, {
			type: 'bar',
			data: {
				labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
				datasets: [{
					label: "Đơn đặt",
					backgroundColor: 'rgb(23, 125, 255)',
					borderColor: 'rgb(23, 125, 255)',
					data: [],
				}],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				},
			}
		});

		var myPieChart = new Chart(pieChart, {
			type: 'pie',
			data: {
				datasets: [{
					data: [504, 365],
					backgroundColor: ["#1d7af3", "#f3545d", "#00FF00", "#FFFF00", "#99CCFF", "#FF3399", "#9900CC"],
					borderWidth: 0
				}],
				labels: ['Khách mới', 'Khách cũ',]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					position: 'bottom',
					labels: {
						fontColor: 'rgb(154, 154, 154)',
						fontSize: 11,
						usePointStyle: true,
						padding: 20
					}
				},
				tooltips: {
					callbacks: {
						label: function(tooltipItem, data) {
							var dataset = data.datasets[tooltipItem.datasetIndex];
							var total = dataset.data.reduce(function(previousValue, currentValue) {
								return previousValue + currentValue;
							});
							var currentValue = dataset.data[tooltipItem.index];
							var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
							return percentage + "%";
						}
					}
				},
				layout: {
					padding: {
						left: 20,
						right: 20,
						top: 20,
						bottom: 20
					}
				}
			}
		});



	}
	$scope.initialize();

})

////voucher admin
app.controller("voucher-ctrl", function($scope, $http) {

	$scope.items = [];
	$scope.form = {};
	$scope.roles = {};



	$scope.initialize = function() {
		$http.get('/rest/voucher').then(function(response) {
			$scope.items = response.data;
			$scope.items.forEach(item => {
				item.startdate = new Date(item.startdate)
				item.enddate = new Date(item.enddate)
			})
		});
	}




	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$scope.index = -1;
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.reset = function() {
		$scope.form = {
			startdate: new Date(),
			enddate: Date()
		};
		$scope.index = 0;
		$(".nav-tabs a:eq(0)").tab('show')
	}



	$scope.reset_smooth_table = function() {
		$scope.form = {};
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post(`/rest/voucher`, item).then(resp => {
			$scope.initialize();
			resp.data.createDate = new Date(resp.data.createDate);
			$scope.items.push(resp.data);
			$scope.reset();
			Swal.fire({
				type: 'success',
				title: 'Thêm  thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Lỗi thêm mã',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})

	}

	// Cập nhật
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/voucher/${item.id}`, item).then(function(response) {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items[index] = item;
			Swal.fire({
				type: 'success',
				title: 'Cập nhật thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(function(error) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi cập nhật mã',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}




	// Xóa
	$scope.delete = function(item) {
		Swal.fire({
			title: 'Xóa người dùng!',
			text: "Bạn chắc chắn muốn xóa người dùng này chứ ?",
			type: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Vâng, Tôi đồng ý!'
		}).then(function(result) {
			if (result.value) {
				$http.delete(`/rest/voucher/${item.id}`).then(function(response) {
					var index = $scope.items.findIndex(p => p.id == item.id);
					$scope.items.splice(index, 1);
					$scope.reset();
					Swal.fire(
						'Deleted!',
						'Đã xóa thành công',
						'success'
					);
				}).catch(function(err) {
					Swal.fire({
						type: 'error',
						title: 'Lỗi xóa người dùng',
						text: 'Voucher đang ở trạng thái hoạt động !',
						icon: "error",
						showConfirmButton: false,
						timer: 2000
					});
					console.log("Error", err);
				});
			}
		});
	};

	$scope.pager = {
		page: 0,
		size: 4,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
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

	$scope.initialize();
})
/////discount hahahaha
app.controller("discount-ctrl", function($scope, $http) {

	$scope.items = [];
	$scope.form = {};
	$scope.roles = {};



	$scope.initialize = function() {
		$http.get('/rest/discount').then(function(response) {
			$scope.items = response.data;
			$scope.items.forEach(item => {
				item.startdate = new Date(item.startdate)
				item.enddate = new Date(item.enddate)
			})
		});
		$http.get('/rest/products').then(function(response) {
			$scope.product = response.data;

		});
	}




	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$scope.prductww = $scope.form.product.id;
		$scope.index = -1;
		$(".nav-tabs a:eq(0)").tab('show')
		$http.get(`/rest/weightvalue2/getProductweigth/${$scope.prductww}`).then(function(response) {
			$scope.productweight = response.data;
		});

	}

	$scope.reset = function() {
		$scope.form = {
			startdate: new Date(),
			enddate: Date()
		};
		$scope.index = 0;
		$(".nav-tabs a:eq(0)").tab('show')
	}



	$scope.reset_smooth_table = function() {
		$scope.form = {};
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post(`/rest/discount`, item).then(resp => {
			$scope.initialize();
			resp.data.createDate = new Date(resp.data.createDate);
			$scope.items.push(resp.data);
			$scope.reset();
			Swal.fire({
				type: 'success',
				title: 'Thêm thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Lỗi thêm mã',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})

	}

	// Cập nhật
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/discount/${item.id}`, item).then(function(response) {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items[index] = item;
			Swal.fire({
				type: 'success',
				title: 'Cập nhật thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(function(error) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi cập nhật ',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}

	// Xóa
	$scope.delete = function(item) {
		Swal.fire({
			title: 'Xóa sản phẩm giảm giá!',
			text: 'Bạn chắc chắn muốn xóa sản phẩm giảm giá này chứ ?',
			type: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Vâng, Tôi đồng ý!'
		}).then(function(result) {
			if (result.isConfirmed) {
				$http.delete(`/rest/discount/${item.id}`).then(function(response) {
					var index = $scope.items.findIndex(p => p.id == item.id);
					$scope.items.splice(index, 1);
					$scope.reset();
					Swal.fire(
						'Deleted!',
						'Đã xóa thành công',
						'success'
					);
				}).catch(function(err) {
					Swal.fire({
						type: 'error',
						title: 'Lỗi xóa ',
						text: 'Sản phẩm giảm giá đang ở trạng thái hoạt động !',
						icon: 'error',
						showConfirmButton: false,
						timer: 2000
					});
					console.log('Error', err);
				});
			}
		});
	};

	$scope.pager = {
		page: 0,
		size: 4,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
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

	$scope.initialize();

})

app.controller("category-ctrl", function($scope, $http) {

	$scope.items = [];
	$scope.form = {};
	$scope.roles = {};



	$scope.initialize = function() {
		$http.get('/rest/category').then(function(response) {
			$scope.items = response.data;
			console.log($scope.items);
		});
	}




	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$scope.index = -1;
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.reset = function() {
		$scope.form = {

		};
		$scope.index = 0;
		$(".nav-tabs a:eq(0)").tab('show')
	}



	$scope.reset_smooth_table = function() {
		$scope.form = {};
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post(`/rest/category`, item).then(resp => {
			$scope.initialize();
			$scope.items.push(resp.data);
			$scope.reset();
			Swal.fire({
				type: 'success',
				title: 'Thêm thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Lỗi thêm mã',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})

	}

	// Cập nhật
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/category/${item.id}`, item).then(function(response) {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items[index] = item;
			Swal.fire({
				type: 'success',
				title: 'Cập nhật thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(function(error) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi cập ',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}

	// Xóa
	$scope.delete = function(item) {
		// Show a confirmation dialog
		Swal.fire({
			title: 'Xóa loại sản phẩm!',
			text: "Bạn chắc chắn muốn loại sản phẩm này chứ ?",
			type: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Vâng, Tôi đồng ý!'
		}).then(function(result) {
			if (result.isConfirmed) {
				// If user confirms deletion, send delete request
				$http.delete(`/rest/category/${item.id}`).then(function(response) {
					// Remove the item from the items array
					var index = $scope.items.findIndex(p => p.id == item.id);
					$scope.items.splice(index, 1);
					$scope.reset();

					// Show success message
					Swal.fire(
						'Deleted!',
						'Đã xóa thành công',
						'success'
					);
				}).catch(function(err) {
					// Show error message if deletion fails
					Swal.fire({
						type: 'error',
						title: 'Lỗi xóa ',
						text: 'Loại sản phẩm đang ở trạng thái hoạt động !',
						icon: "error",
						showConfirmButton: false,
						timer: 2000
					});
					console.log("Error", err);
				});
			}
		});
	};

	$scope.pager = {
		page: 0,
		size: 4,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
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

	$scope.initialize();
})

app.controller("static-ctrl", function($scope, $http) {

	$scope.static = function() {
		$http.get('/rest/static/getProductReviewsStatistics').then(function(response) {
			$scope.evaluate = response.data;
		});
		$http.get('/rest/static/getFavoriteCountPerProduct').then(function(response) {
			$scope.favorite = response.data;
		});
		$http.get('/rest/static/findTopSellingProducts').then(function(response) {
			$scope.findTopSellingProducts = response.data;
		});
		$http.get('/rest/static/getProductSummary').then(function(response) {
			$scope.getProductSummary = response.data;
		});

	}
	$scope.static();

	$scope.items = [];
	$scope.order = {
		page: 0,
		size: 5,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prew() {
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
	};
	$scope.startDate = new Date().toISOString().split('T')[0];
	$scope.endDate = new Date().toISOString().split('T')[0];




	$scope.loadProducts = function() {

		// Gửi yêu cầu đến API để lấy dữ liệu
		$http.get('/rest/static/getReportData', {
			params: {
				startDate: formatDate($scope.startDate),
				endDate: formatDate($scope.endDate)
			}
		}).then(function(response) {
			console.log(response.data);
			$scope.items = response.data;
			$scope.order.count = Math.ceil($scope.items.length / $scope.order.size);

		}, function(error) {
			console.log(error);
		});
	};

	function formatDate(date) {
		// Hàm này để định dạng ngày thành yyyy-MM-dd để gửi đến server
		var d = new Date(date);
		var month = '' + (d.getMonth() + 1);
		var day = '' + d.getDate();
		var year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [year, month, day].join('-');
	}

	// Load dữ liệu lúc trang web được khởi tạo
	$scope.loadProducts();

})

////banner admin
app.controller("banner-ctrl", function($scope, $http) {

	$scope.banner_1900x700 = [];
	$scope.anhphu1_600x370 = [];
	$scope.anhphu2_600x370 = [];
	$scope.anhphu3_600x370 = [];
	$scope.banner1_600x370 = [];
	$scope.banner2_600x370 = [];
	$scope.bannerthongtin1_370x300 = [];
	$scope.bannerthongtin2_370x300 = [];
	$scope.bannerthongtin3_370x300 = [];

	$scope.initialize = function() {
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

	$scope.initialize();

	$scope.imageChangedbanner1900x700 = function(files) {
		var item = angular.copy($scope.banner_1900x700);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.banner_1900x700.image = resp.data.name;
			$scope.banner_1900x700.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.banner_1900x700).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChangedbanner1900x700 = function() {
		var item = angular.copy($scope.banner_1900x700);
		$scope.banner_1900x700.image = '1900x750.jpg';
		$scope.banner_1900x700.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.banner_1900x700).then(resp => {
			$scope.initialize();
		});
	}

	$scope.imageChanged_anhphu1_600x370 = function(files) {
		var item = angular.copy($scope.anhphu1_600x370);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.anhphu1_600x370.image = resp.data.name;
			$scope.anhphu1_600x370.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.anhphu1_600x370).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_anhphu1_600x370 = function() {
		var item = angular.copy($scope.anhphu1_600x370);
		$scope.anhphu1_600x370.image = '600x370.jpg';
		$scope.anhphu1_600x370.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.anhphu1_600x370).then(resp => {
			$scope.initialize();
		});
	}

	$scope.imageChanged_anhphu2_600x370 = function(files) {
		var item = angular.copy($scope.anhphu2_600x370);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.anhphu2_600x370.image = resp.data.name;
			$scope.anhphu2_600x370.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.anhphu2_600x370).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_anhphu2_600x370 = function() {
		var item = angular.copy($scope.anhphu2_600x370);
		$scope.anhphu2_600x370.image = '600x370.jpg';
		$scope.anhphu2_600x370.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.anhphu2_600x370).then(resp => {
			$scope.initialize();
		});
	}

	$scope.imageChanged_anhphu3_600x370 = function(files) {
		var item = angular.copy($scope.anhphu3_600x370);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.anhphu3_600x370.image = resp.data.name;
			$scope.anhphu3_600x370.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.anhphu3_600x370).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_anhphu3_600x370 = function() {
		var item = angular.copy($scope.anhphu3_600x370);
		$scope.anhphu3_600x370.image = '600x370.jpg';
		$scope.anhphu3_600x370.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.anhphu3_600x370).then(resp => {
			$scope.initialize();
		});
	}

	$scope.imageChanged_banner1_600x370 = function(files) {
		var item = angular.copy($scope.banner1_600x370);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.banner1_600x370.image = resp.data.name;
			$scope.banner1_600x370.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.banner1_600x370).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_banner1_600x370 = function() {
		var item = angular.copy($scope.banner1_600x370);
		$scope.banner1_600x370.image = '600x370.jpg';
		$scope.banner1_600x370.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.banner1_600x370).then(resp => {
			$scope.initialize();
		});
	}

	$scope.imageChanged_banner2_600x370 = function(files) {
		var item = angular.copy($scope.banner2_600x370);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.banner2_600x370.image = resp.data.name;
			$scope.banner2_600x370.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.banner2_600x370).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_banner2_600x370 = function() {
		var item = angular.copy($scope.banner2_600x370);
		$scope.banner2_600x370.image = '600x370.jpg';
		$scope.banner2_600x370.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.banner2_600x370).then(resp => {
			$scope.initialize();
		});
	}

	$scope.imageChanged_bannerthongtin1_370x300 = function(files) {
		var item = angular.copy($scope.bannerthongtin1_370x300);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.bannerthongtin1_370x300.image = resp.data.name;
			$scope.bannerthongtin1_370x300.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.bannerthongtin1_370x300).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_bannerthongtin1_370x300 = function() {
		var item = angular.copy($scope.bannerthongtin1_370x300);
		$scope.bannerthongtin1_370x300.image = '370x300.jpg';
		$scope.bannerthongtin1_370x300.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.bannerthongtin1_370x300).then(resp => {
			$scope.initialize();
		});
	}

	$scope.imageChanged_bannerthongtin2_370x300 = function(files) {
		var item = angular.copy($scope.bannerthongtin2_370x300);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.bannerthongtin2_370x300.image = resp.data.name;
			$scope.bannerthongtin2_370x300.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.bannerthongtin2_370x300).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_bannerthongtin2_370x300 = function() {
		var item = angular.copy($scope.bannerthongtin2_370x300);
		$scope.bannerthongtin2_370x300.image = '370x300.jpg';
		$scope.bannerthongtin2_370x300.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.bannerthongtin2_370x300).then(resp => {
			$scope.initialize();
		});
	}


	$scope.imageChanged_bannerthongtin3_370x300 = function(files) {
		var item = angular.copy($scope.bannerthongtin3_370x300);
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/banner', data, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(resp => {
			$scope.bannerthongtin3_370x300.image = resp.data.name;
			$scope.bannerthongtin3_370x300.createdate = new Date();
			$http.put(`/rest/banner/${item.id}`, $scope.bannerthongtin3_370x300).then(resp => {
				console.log(resp.data);
			});
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
	$scope.deleteimageChanged_bannerthongtin3_370x300 = function() {
		var item = angular.copy($scope.bannerthongtin3_370x300);
		$scope.bannerthongtin3_370x300.image = '370x300.jpg';
		$scope.bannerthongtin3_370x300.createdate = new Date();
		$http.put(`/rest/banner/${item.id}`, $scope.bannerthongtin3_370x300).then(resp => {
			$scope.initialize();
		});
	}

})
//weightvalue
app.controller("weightvalue2-ctrl", function($scope, $http) {

	$scope.items = [];
	$scope.form = {};
	$scope.roles = {};



	$scope.initialize = function() {
		$http.get('/rest/weightvalue2').then(function(response) {
			$scope.items = response.data;
		});
	}




	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$scope.index = -1;
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.reset = function() {
		$scope.form = {};
		$scope.index = 0;
		$(".nav-tabs a:eq(0)").tab('show')
	}



	$scope.reset_smooth_table = function() {
		$scope.form = {};
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post(`/rest/weightvalue2`, item).then(resp => {
			$scope.initialize();

			$scope.items.push(resp.data);
			$scope.reset();
			Swal.fire({
				type: 'success',
				title: 'Thêm thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Lỗi thêm mã',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})

	}

	// Cập nhật
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/weightvalue2/${item.id}`, item).then(function(response) {
			var index = $scope.items.findIndex(p => p.weightid == item.weightid);
			$scope.items[index] = item;
			Swal.fire({
				type: 'success',
				title: 'Cập nhật thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(function(error) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi cập nhật ',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}

	// Xóa
	$scope.delete = function(item) {
		Swal.fire({
			title: 'Xóa người dùng!',
			text: 'Bạn chắc chắn muốn xóa trọng lượng này chứ ?',
			type: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Vâng, Tôi đồng ý!'
		}).then(function(result) {
			if (result.isConfirmed) {
				$http.delete(`/rest/weightvalue2/${item.id}`).then(function(response) {
					var index = $scope.items.findIndex(p => p.weightid == item.weightid);
					$scope.items.splice(index, 1);
					$scope.reset();
					Swal.fire(
						'Deleted!',
						'Đã xóa thành công',
						'success'
					);
				}).catch(function(err) {
					Swal.fire({
						type: 'error',
						title: 'Lỗi xóa',
						text: 'Mã trọng lượng đang ở trạng thái hoạt động !',
						icon: 'error',
						showConfirmButton: false,
						timer: 2000
					});
					console.log('Error', err);
				});
			}
		});
	};

	$scope.pager = {
		page: 0,
		size: 4,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
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

	$scope.initialize();
})

/// StatusOR
app.controller("statusOR-ctrl", function($scope, $http) {

	$scope.items = [];
	$scope.form = {};
	$scope.roles = {};



	$scope.initialize = function() {
		$http.get('/rest/StatusOR').then(function(response) {
			$scope.items = response.data;
			console.log($scope.items);

		});
	}




	$scope.edit = function(item) {
		$scope.form = angular.copy(item);
		$scope.index = -1;
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.reset = function() {
		$scope.form = {};
		$scope.index = 0;
		$(".nav-tabs a:eq(0)").tab('show')
	}



	$scope.reset_smooth_table = function() {
		$scope.form = {};
		$(".nav-tabs a:eq(0)").tab('show')
	}

	$scope.create = function() {
		var item = angular.copy($scope.form);
		$http.post(`/rest/StatusOR`, item).then(resp => {
			$scope.initialize();
			$scope.items.push(resp.data);
			$scope.reset();
			Swal.fire({
				type: 'success',
				title: 'Thêm thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(error => {
			Swal.fire({
				type: 'error',
				title: 'Lỗi thêm ',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Error", error);
		})

	}

	// Cập nhật
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/StatusOR/${item.id}`, item).then(function(response) {
			var index = $scope.items.findIndex(p => p.statusid == item.statusid);
			$scope.items[index] = item;
			$scope.initialize();
			Swal.fire({
				type: 'success',
				title: 'Cập nhật thành công',
				icon: "success",
				showConfirmButton: false,
				timer: 2000
			})
			$scope.reset_smooth_table();
		}).catch(function(error) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi cập nhật ',
				text: error,
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}

	// Xóa
	$scope.delete = function(item) {
		// Show a confirmation dialog
		Swal.fire({
			title: 'Xóa trạng thái!',
			text: "Bạn chắc chắn muốn xóa trạng thái này chứ?",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			cancelButtonText: 'Hủy',
			confirmButtonText: 'Vâng, Tôi đồng ý!'
		}).then(function(result) {
			if (result.isConfirmed) {
				// If user confirms deletion, send delete request
				$http.delete(`/rest/StatusOR/${item.id}`).then(function(response) {
					// Remove the item from the items array
					var index = $scope.items.findIndex(p => p.statusid == item.statusid);
					$scope.items.splice(index, 1);
					$scope.initialize();
					$scope.reset();

					// Show success message
					Swal.fire(
						'Deleted!',
						'Đã xóa thành công',
						'success'
					);
				}).catch(function(err) {
					// Show error message if deletion fails
					Swal.fire({
						type: 'error',
						title: 'Lỗi xóa ',
						text: 'Trạng thái đang hoạt động!',
						icon: "error",
						showConfirmButton: false,
						timer: 2000
					});
					console.log("Error", err);
				});
			}
		});
	};

	$scope.pager = {
		page: 0,
		size: 4,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
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

	$scope.initialize();
})