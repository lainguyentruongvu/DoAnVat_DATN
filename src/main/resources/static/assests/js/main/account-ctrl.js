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
//////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
app.controller("authority-ctrl", function ($scope, $http, $location) {
    var url = "/rest/roles";
    var url1 = "/rest/authorities";
    var url2 = "/rest/accounts?admin=false";
    var url3 = "/rest/authorities?admin=false";
    $scope.roles = [];
    $scope.admins = [];
    $scope.authorities = [];

    var sweetalert = function (text) {
        Swal.fire({
            icon: "success",
            title: text,
            showConfirmButton: false,
            timer: 2000,
        });
    }

    $scope.initialize = function () {
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

    $scope.authority_of = function (acc, role) {
        if ($scope.authorities) {
            return $scope.authorities.find(ur => ur.account.username == acc.username && ur.role.id == role.id);
        }
    }

    $scope.authority_changed = function (acc, role) {
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
    $scope.grant_authority = function (authority) {
        $http.post(`${url1}`, authority).then(resp => {
            $scope.authorities.push(resp.data);
            sweetalert("Cấp quyền sử dụng thành công!");
        }).catch(error => {
            sweetalert("Cấp quyền sử dụng thất bại!");
            console.log("Error: ", error);
        });
    }

    //xoa authority
    $scope.revoke_authority = function (authority) {
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