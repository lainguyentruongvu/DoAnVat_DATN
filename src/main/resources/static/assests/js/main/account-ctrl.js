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
		$http.post(`/rest/accounts`, item).then(resp => {
			$scope.initialize();
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

	// Cập nhật
	$scope.update = function() {
		var item = angular.copy($scope.form);
		$http.put(`/rest/accounts/${item.username}`, item).then(function(response) {
			var index = $scope.items.findIndex(p => p.username == item.username);
			$scope.items[index] = item;
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

		$http.delete(`/rest/accounts/${item.username}`).then(function(response) {
			var index = $scope.items.findIndex(p => p.username == item.username);
			$scope.items.splice(index, 1);
			$scope.reset();
			Swal.fire({
				title: 'Xóa người dùng!',
				text: "Bạn chắc chắn muốn xóa người dùng này chứ?",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				cancelButtonText: 'Hủy',
				confirmButtonText: 'Vâng, Tôi đồng ý!'

			}).then((result) => {
				if (result.isConfirmed) {
					Swal.fire(
						'Deleted!',
						'Đã xóa thành công',
						'success'
					);
				} else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
					Swal.fire(
						'Cancelled',
						'Hủy bỏ',
						'error'
					);
				}
			});

		}).catch(function(err) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi xóa người dùng',
				text: 'Người dùng đang ở trạng thái hoạt động !',
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}

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
		}
		else {
			authority = { account: acc, role: role };
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
	$scope.weightadmin = function (id, price) {
		$scope.showbtn_them = true;
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


	$scope.weightquantityandprice = function (idpro, idw) {
		$scope.showbtn_del_upd = true;
		$scope.showbtn_addweight = false;
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


	$scope.resetformw = function () {
		$scope.productweight.price = null;
		$scope.productweight.quantity = null;
		$scope.productweight.id = null;
		$scope.productweight.weight.id = null;
		$scope.showsel = true;
		$scope.showbtn_addweight = true;
		$scope.showbtn_del_upd = false;
	}

	$scope.addweight = function (item) {
		$scope.productweight = angular.copy(item)
		$http.post("/rest/products/productweight", $scope.productweight).then(resp => {	
			alert("Thêm trọn lyuongwj thành công")
			
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.updateweight = function () {
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

	$scope.deleteweight = function(){
		var idproweight = $scope.productweight.id;
		console.log(idproweight)
		$http.delete(`/rest/products/productweight/${idproweight}`).then(resp => {
			
		}).catch(error => {
			Swal.fire("Error", "Cập nhật thất bại!", "error");
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
	$scope.initialize = function() {
		$http.get("/rest/static/demslsp").then(resp => {
			$scope.slsp = resp.data;
		});
		//		$http.get("/rest/products/demslkh").then(resp => {
		//			$scope.slkh = resp.data;
		//		});
		//		$http.get("/rest/products/demsldh").then(resp => {
		//			$scope.sldh = resp.data;
		//		});
		//		$http.get("/rest/products/demslcd").then(resp => {
		//			$scope.slcd = resp.data;
		//		});
		$http.get("/rest/static/ddhanghna").then(resp => {
			$scope.ddhanghna = resp.data;

		});
		$http.get("/rest/static/tongtienhomnay").then(resp => {
			$scope.tongtienhomnay = resp.data;

		});
		$http.get("/rest/static/tongthunhap").then(resp => {
			$scope.tongthunhap = resp.data;

		});
		$http.get("/rest/static/tongdonhanghomnay").then(resp => {
			$scope.tongdonhanghomnay = resp.data;

		});
		$http.get("/rest/static/tongdonhang").then(resp => {
			$scope.tongdonhang = resp.data;
		});



		//
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
				title: 'Thêm mã thành công',
				text: 'Người dùng được sắp xếp theo tên',
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
				title: 'Cập nhật mã thành công',
				text: 'Thông mã đã được cập nhật',
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
		$http.delete(`/rest/voucher/${item.id}`).then(function(response) {
			var index = $scope.items.findIndex(p => p.id == item.id);
			$scope.items.splice(index, 1);
			$scope.reset();
			Swal.fire({
				title: 'Xóa người dùng!',
				text: "Bạn chắc chắn muốn xóa người dùng này chứ ?",
				type: 'warning',
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Vâng, Tôi đồng ý!'
			}).then(function() {
				Swal.fire(
					'Deleted!',
					'Đã xóa thành công',
					'success'
				);
			})
		}).catch(function(err) {
			Swal.fire({
				type: 'error',
				title: 'Lỗi xóa người dùng',
				text: 'Người dùng đang ở trạng thái hoạt động !',
				icon: "error",
				showConfirmButton: false,
				timer: 2000
			})
			console.log("Erorr", err);
		})
	}

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
