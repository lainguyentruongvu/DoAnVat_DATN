const linkt = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
const linkh = "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
const linkx = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";

$(document).ready(function() {
	window.onload = function() {
		tinh();
	};
	function tinh() {
		$.ajax({
			type: "GET",
			url: linkt,
			headers: { token: "4c987fa9-3cdb-11ee-b394-8ac29577e80e" },
			success: function(data) {
				renderData(data.data, "province")
				console.log(data);
			},
			error: function(error) {
				alert("Đã xảy ra lỗi: " + error.responseText);
			}
		})
	}
});

function huyen(provinceid) {
	$.ajax({
		type: "GET",
		url: linkh,
		headers: { token: "4c987fa9-3cdb-11ee-b394-8ac29577e80e" },
		data: { province_id: provinceid },
		success: function(data) {
			renderDataH(data.data, "district")
			console.log(data);
		},
		error: function(error) {
			alert("Đã xảy ra lỗi: " + error.responseText);
		}
	})
}

function phuong(districtid) {
	$.ajax({
		type: "GET",
		url: linkx,
		headers: { token: "4c987fa9-3cdb-11ee-b394-8ac29577e80e" },
		data: { district_id: districtid },
		success: function(data) {
			renderDataP(data.data, "ward")
			console.log(data);
		},
		error: function(error) {
			alert("Đã xảy ra lỗi: " + error.responseText);
		}
	})
}

function service(districtid) {
	$.ajax({
		type: "GET",
		url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
		headers: { token: "4c987fa9-3cdb-11ee-b394-8ac29577e80e" },
		data: {
			shop_id: 4463615,
			from_district: 1572,
			to_district: districtid,

		},

		success: function(data) {
			renderDataS(data.data)
			console.log(data);
			console.log(districtid);
		},

		error: function(error) {
			console.log(error);
			//			alert("Đã xảy ra lỗi: " + error.responseText);
		}
	})
}

function phivc(serviceid, districtid, wardcode) {
	$.ajax({
		type: "GET",
		url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
		headers: {
			token: "4c987fa9-3cdb-11ee-b394-8ac29577e80e",
			shop_id: "4463615"
		},
		data: {
			service_id: serviceid,
			insurance_value: 200000,
			coupon: null,
			from_district_id: 1572,
			to_district_id: districtid,
			to_ward_code: wardcode,
			height: 15,
			length: 15,
			weight: 500,
			width: 15
		},
		success: function(data) {
			var event = new CustomEvent('phiDataAvailable', { detail: data.data.total });
			document.dispatchEvent(event);
			//renderDataP(data.data, "ward")
			console.log(data.data.total);

		},
		error: function(error) {
			//			alert("Đã xảy ra lỗi: " + error.responseText);
		}
	})
}

// Hàm renderData để tạo tùy chọn cho select
var renderData = (array, select) => {
	let row = '<option value="">Chọn Tỉnh/Thành Phố</option>';
	array.forEach(element => {
		row += `<option value="${element.ProvinceID}">${element.ProvinceName}</option>`;
	});
	document.querySelector("#" + select).innerHTML = row;
}

var renderDataH = (array, select) => {
	let row = '<option disabled value="">Chọn</option>';
	array.forEach(element => {
		row += `<option value="${element.DistrictID}">${element.DistrictName}</option>`;
	});
	document.querySelector("#" + select).innerHTML = row;
}

var renderDataP = (array, select) => {
	let row = '<option disabled value="">Chọn</option>';
	array.forEach(element => {
		row += `<option value="${element.WardCode}">${element.WardName}</option>`;
	});
	document.querySelector("#" + select).innerHTML = row;
}

var renderDataS = (array) => {
	let row = '<option  value="">Chọn</option>';
	array.forEach(element => {
		row += `<option value="${element.service_id}">${element.short_name}</option>`;
	});
	document.querySelector("#service").innerHTML = row;
}

// Xử lý sự kiện thay đổi tỉnh
$("#province").change(() => {
	var e = document.getElementById("province");
	var value = e.value;
	huyen(value)
	console.log(value)
	printResult();
});

// Xử lý sự kiện thay đổi huyện
$("#district").change(() => {
	var e = document.getElementById("district");
	var value = e.value;
	console.log(value)
	phuong(value)
	service(value)
	printResult();
});

// Xử lý sự kiện thay đổi phường
$("#ward").change(() => {
	// lay id huyen tu select
	var district = document.getElementById("district");
	var dtid = district.value;

	// lay service id tu select
	var serviceid = document.getElementById("service");
	var sid = serviceid.value;


	// lay wardcode tu select
	var ward = document.getElementById("ward");
	var wardcode = ward.value;
	//console.log(wardcode)
	//phivc(sid, dtid, wardcode)
	printResult();
});

// su kien thay doi dich vu

$("#service").change(() => {
	// lay id huyen tu select
	var district = document.getElementById("district");
	var dtid = district.value;

	// lay service id tu select
	var serviceid = document.getElementById("service");
	var sid = serviceid.value;


	// lay wardcode tu select
	var ward = document.getElementById("ward");
	var wardcode = ward.value;

	console.log(wardcode)
	phivc(sid, dtid, wardcode)
	//printResult();
});

// Hàm hiển thị kết quả khi tất cả các lựa chọn đã được chọn
var printResult = () => {
	if ($("#district").val() != "" && $("#province").val() != "" &&
		$("#ward").val() != "") {
		let result = $("#ward option:selected").text() +
			", " + $("#district option:selected").text() + ", " +
			$("#province option:selected").text();
		$("#result").val(result);

		var event = new CustomEvent('resultAvailable', { detail: result });
		document.dispatchEvent(event);
		console.log(result);

	}


}
