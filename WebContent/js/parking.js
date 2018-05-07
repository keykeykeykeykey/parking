window.onload = function(){
	var a = 1;
	$.ajax({
		type : "get",
		url : "/parking/com/parking/servlet/ParkingServlet?status=all",
		datatype : "text",
		success : function(Parkings) {
			var data = eval(Parkings);
			var trHTML = "";
			for(var i =0;i<data.length;i++){
				trHTML += "<tr><td>"+data[i].num+"</td><td>"+data[i].price
				+"</td><td><a onclick='remove("+data[i].id+")'>删除</a>&nbsp&nbsp&nbsp&nbsp"
				+"<a onclick='edit("+data[i].id+")'>编辑</a>"
				+"</td></tr>";
			}
			$('#list').append(trHTML);
		},
		error : function(error) {
			alert("获取数据失败！！！");
		}
	})
}

function remove(id){
	$.ajax({
		type : "post",
		url : "/parking/com/parking/servlet/ParkingServlet?status=remove",
		data:{
			id: id
		},
		datatype : "text",
		success : function(Parking) {
			location.reload();
		},
		error : function(error){
			alert("删除失败！！！");
		}
	})
}

function edit(id){
	$.ajax({
		type : "get",
		url : "/parking/com/parking/servlet/ParkingServlet?status=findParkingById",
		data:{
			id: id
		},
		datatype : "text",
		success : function(Parking) {
			var data = eval(Parking);
			$('#change').css({'display':'block'});
			$('#num').val(data[0].num);
			$('#price').val(data[0].price);
			$('#save').removeAttr("onclick");
			$('#save').attr("onclick","saveEdit("+id+")");
		},
		error : function(error){
			alert("删除失败！！！");
		}
	})
}

function append(){
	$('#change').css({'display':'block'});
	$('#num').val("");
	$('#price').val("");
	$('#save').removeAttr("onclick");
	$('#save').attr("onclick","saveAdd();");
}

function cancel(){
	$('#change').css({'display':'none'});
}

function saveAdd(){
	if($("#num").val()==""||$("#price").val()==""){
		alert("信息不能为空！！！")
	}else{
		$.ajax({
			type : "post",
			url : "/parking/com/parking/servlet/ParkingServlet?status=add",
			data:{
				num: $("#num").val(),
				price: $("#price").val(),
			},
			datatype : "text",
			success : function(Parking) {
				location.reload();
			}
		})
	}
}

function saveEdit(id){
	if($("#num").val()==""||$("#price").val()==""){
		alert("信息不能为空！！！")
	}else{
		$.ajax({
			type : "post",
			url : "/parking/com/parking/servlet/ParkingServlet?status=edit",
			data:{
				id : id,
				num: $("#num").val(),
				price: $("#price").val(),
			},
			datatype : "text",
			success : function(Parking) {
				location.reload();
			}
		})
	}
}