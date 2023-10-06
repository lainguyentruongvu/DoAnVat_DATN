const app = angular.module("app", []);
app.controller("account-ctrl", function ($scope, $http) {

	$scope.items = [];
	$scope.form = {};
	$scope.roles = {};

	$scope.initialize = function () {
		$http.get('/rest/accounts').then(function (response) {
			$scope.items = response.data;
			console.log($scope.items);
		});
	}


	$scope.edit = function (item) {
		$scope.form = angular.copy(item);
		$scope.index = -1;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	$scope.reset = function () {
		$scope.form = {};
		$scope.index = 0;
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	$scope.imageChanged = function (files) {
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

	$scope.reset_smooth_table = function () {
		$scope.form = {};
		window.scrollTo({
			top: 1000,
			behavior: 'smooth'
		});
	}

	$scope.create = function () {
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
	$scope.update = function () {
		var item = angular.copy($scope.form);
		$http.put(`/rest/accounts/${item.username}`, item).then(function (response) {
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
		}).catch(function (error) {
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
	$scope.delete = function (item) {

		$http.delete(`/rest/accounts/${item.username}`).then(function (response) {
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

		}).catch(function (err) {
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



//ADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCTADMINPRODUCT
app.controller("product-ctrl", function ($scope, $http) {


	$scope.itempros = [];
	$scope.categorys = [];
	$scope.weight = [];
	$scope.createdate = new Date().toISOString().slice(0, 10)

	$scope.initialize = function () {
		$http.get('/rest/products').then(function (resp) {
			$scope.itempros = resp.data;
		});
	}

	$scope.reset_smooth_table = function () {
		$scope.form = {};
		window.scrollTo({
			top: 1000,
			behavior: 'smooth'
		});
	}

	$scope.imageChanged = function (files) {
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

	$scope.createpro = function () {
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


	$scope.weight = function () {
		$http.get('/rest/products/weight').then(function (resp) {
			$scope.weight = resp.data;
		});

	}

	$scope.categorys = function () {
		$http.get('/rest/category').then(function (resp) {
			$scope.categorys = resp.data;
		});
	}

	$scope.edit = function (item) {
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

	$scope.updatepro = function () {
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

	$scope.reset = function () {
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
		if(item.activeted == false){
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
		}else{
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

	$scope.initialize();
	$scope.weight();
	$scope.categorys();
})