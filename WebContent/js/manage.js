var data;
var a = 1;
var stopped;
var f = 1;
window.onload = function(){
	$.ajax({
		type : "get",
		url : "/parking/com/parking/servlet/ParkingServlet?status=not_stop",
		datatype : "text",
		success : function(Parkings) {
			data = eval(Parkings);
			$('#not_stop div:nth-child(1) span:nth-child(2)').html(data.length);
			var trHTML = "";
			if(data.length<10){
				for(var i =0;i<data.length;i++){
					trHTML += "<tr id='info'><td>"+data[i].num+"</td><td>"+data[i].price
					+"</td><td><a onclick='addCar("+data[i].id+")'>添加车辆</a>"
					+"</td></tr>";
				}
				$('#not_stop div:nth-child(2) table').append(trHTML);
				$('#not_stop div:nth-child(3) span:nth-child(2)').removeAttr("onclick");
				$('#not_stop div:nth-child(3) span:nth-child(2)').attr("onclick","last()");
			}else{
				for(var i =0;i<10;i++){
					trHTML += "<tr id='info'><td>"+data[i].num+"</td><td>"+data[i].price
					+"</td><td><a onclick='addCar("+data[i].id+")'>添加车辆</a>"
					+"</td></tr>";
				}
				$('#not_stop div:nth-child(2) table').append(trHTML);
			}
		},
		error : function(error) {
			alert("获取数据失败！！！");
		}
	})
	findStopped();
}

function findStopped(){
	$.ajax({
		type : "get",
		url : "/parking/com/parking/servlet/ParkingServlet?status=stopped",
		datatype : "text",
		success : function(Parkings) {
			stopped = eval(Parkings);
			$('#stopped div:nth-child(1) span:nth-child(2)').html(stopped.length);
			var trHTML = "";
			if(stopped.length<=7){
				for(i=0;i<stopped.length;i++){
					trHTML += "<tr id='info1'><td>"+stopped[i].num+"</td><td>"+stopped[i].price
					+"</td><td>"+stopped[i].car_num
					+"</td><td>"+format(stopped[i].created_at)
					+"</td><td>"+stoptime(stopped[i].created_at)
					+"</td><td><a onclick='leaveCar("+stopped[i].id+")'>出车</a>"
					+"</td></tr>";
				}
				$('#stopped div:nth-child(2) table').append(trHTML);
			}
			else{
				for(i=0;i<7;i++){
					trHTML += "<tr id='info1'><td>"+stopped[i].num+"</td><td>"+stopped[i].price
					+"</td><td>"+stopped[i].car_num
					+"</td><td>"+format(stopped[i].created_at)
					+"</td><td>"+stoptime(stopped[i].created_at)
					+"</td><td><a onclick='leaveCar("+stopped[i].id+")'>出车</a>"
					+"</td></tr>";
				}
				$('#stopped div:nth-child(2) table').append(trHTML);
				$('#stopped div:nth-child(3) span:nth-child(2)').attr("onclick","next2()");
			}
		},
		error : function(error) {
			alert("获取数据失败！！！");
		}
	})
}

function next(){
	$('#not_stop div:nth-child(3) span:nth-child(1)').removeAttr("onclick");
	$('#not_stop div:nth-child(3) span:nth-child(1)').attr("onclick","pre()");
	for(i=0;i<10;i++){
		$("#info").remove();
	}
	var b = parseInt(data.length) - parseInt(a)*10;
	if(b<10){
		c = a *10;
		trHTML = "";
		for(var i = c;i<data.length;i++){
			trHTML += "<tr id='info'><td>"+data[i].num+"</td><td>"+data[i].price
			+"</td><td><a onclick='addCar("+data[i].id+")'>添加车辆</a>"
			+"</td></tr>";
		}
		$('#not_stop div:nth-child(2) table').append(trHTML);
		$('#not_stop div:nth-child(3) span:nth-child(2)').removeAttr("onclick");
		$('#not_stop div:nth-child(3) span:nth-child(2)').attr("onclick","last()");
		a += 1;
	}
	else{
		c = a * 10;
		var trHTML = "";
		for(var i = c;i<c+10;i++){
			trHTML += "<tr id='info'><td>"+data[i].num+"</td><td>"+data[i].price
			+"</td><td><a onclick='addCar("+data[i].id+")'>添加车辆</a>"
			+"</td></tr>";
		}
		$('#not_stop div:nth-child(2) table').append(trHTML);
		a += 1;
	}
}

function last(){
	alert("已经是最后一页了");
}

function pre(){
	$('#not_stop div:nth-child(3) span:nth-child(2)').removeAttr("onclick");
	$('#not_stop div:nth-child(3) span:nth-child(2)').attr("onclick","next()");
	var b = parseInt(data.length) - parseInt(a)*10;
	if(b<0){
		a -=1;
		for(i=0;i<parseInt(data.length) - parseInt(a)*10;i++){
			$("#info").remove();
		}
		c = a*10;
		trHTML = "";
		for(var i = c-10;i<c;i++){
			trHTML += "<tr id='info'><td>"+data[i].num+"</td><td>"+data[i].price
			+"</td><td><a onclick='addCar("+data[i].id+")'>添加车辆</a>"
			+"</td></tr>";
		}
		$('#not_stop div:nth-child(2) table').append(trHTML);
	}
	else{
		a -=1;
		c = a *10;
		for(i=0;i<10;i++){
			$("#info").remove();
		}
		var trHTML = "";
		for(var i = c-10;i<c;i++){
			trHTML += "<tr id='info'><td>"+data[i].num+"</td><td>"+data[i].price
			+"</td><td><a onclick='addCar("+data[i].id+")'>添加车辆</a>"
			+"</td></tr>";
		}
		$('#not_stop div:nth-child(2) table').append(trHTML);
		if(a==1){
			$('#not_stop div:nth-child(3) span:nth-child(1)').removeAttr("onclick");
			$('#not_stop div:nth-child(3) span:nth-child(1)').attr("onclick","first()");
		}
	}
}

function first(){
	alert("已经是第一页了！！！");
}

function addCar(id){
	$('#not_stop div:nth-child(4)').css({'display':'block'});
	$('#car_num').val("");
	$('#save').removeAttr("onclick");
	$('#save').attr("onclick","saveAdd("+id+")");
}

function cancel(){
	$('#not_stop div:nth-child(4)').css({'display':'none'});
}

function saveAdd(id){
	$.ajax({
		type : "post",
		url : "/parking/com/parking/servlet/ParkingServlet?status=addCar",
		data:{
			id: id,
			carNum: $('#car_num').val()
		},
		datatype : "text",
		success : function(Parking) {
			location.reload();
			$('#not_stop div:nth-child(4)').css({'display':'none'});
		},
		error : function(error){
			alert("删除失败！！！");
		}
	})
}

function format(time){
	var date = new Date(time);
	var year = date.getFullYear() // 获取年份
	var month = check(date.getMonth() + 1) //获取月份
	var day = check(date.getDate()) //获取日期
	var hour = check(date.getHours()) // 获取小时
	var minute = check(date.getMinutes()) // 获取分钟
	return year + "/" + month + "/" + day + "  " + hour +":" + minute;
}

function check(time){
	if(time<10){
		return "0"+time;
	}
	return time;
}

function stoptime(time){
	var myData = new Date(); 
	var times = myData.getTime();
	var time1 = times - time;
	var hour = parseInt(time1/3600000)
	var time2 = time1-3600000*hour
	var minute = parseInt(time2/1000/60)
	return hour + "时" + minute + "分";
}

function next2(){
	$('#stopped div:nth-child(3) span:nth-child(1)').removeAttr("onclick");
	$('#stopped div:nth-child(3) span:nth-child(1)').attr("onclick","pre2()");
	for(i=0;i<7;i++){
		$("#info1").remove();
	}
	var b = parseInt(stopped.length) - parseInt(f)*7;
	if(b<7){
		c = f *7;
		trHTML = "";
		for(var i = c;i<stopped.length;i++){
			trHTML += "<tr id='info1'><td>"+stopped[i].num+"</td><td>"+stopped[i].price
			+"</td><td>"+stopped[i].car_num
			+"</td><td>"+format(stopped[i].created_at)
			+"</td><td>"+stoptime(stopped[i].created_at)
			+"</td><td><a onclick='leaveCar("+stopped[i].id+")'>出车</a>"
			+"</td></tr>";
		}
		$('#stopped div:nth-child(2) table').append(trHTML);
		$('#stopped div:nth-child(3) span:nth-child(2)').removeAttr("onclick");
		$('#stopped div:nth-child(3) span:nth-child(2)').attr("onclick","last()");
		f += 1;
	}
	else{
		c = f * 10;
		var trHTML = "";
		for(var i = f;i<f+7;i++){
			trHTML += "<tr id='info1'><td>"+stopped[i].num+"</td><td>"+stopped[i].price
			+"</td><td>"+stopped[i].car_num
			+"</td><td>"+format(stopped[i].created_at)
			+"</td><td>"+stoptime(stopped[i].created_at)
			+"</td><td><a onclick='leaveCar("+stopped[i].id+")'>出车</a>"
			+"</td></tr>";
		}
		$('#stopped div:nth-child(2) table').append(trHTML);
		f += 1;
	}
}

function pre2(){
	$('#stopped div:nth-child(3) span:nth-child(2)').removeAttr("onclick");
	$('#stopped div:nth-child(3) span:nth-child(2)').attr("onclick","next2()");
	var b = parseInt(stopped.length) - parseInt(f)*7;
	if(b<0){
		f -=1;
		for(i=0;i<parseInt(stopped.length) - parseInt(f)*7;i++){
			$("#info1").remove();
		}
		c = f*7;
		trHTML = "";
		for(var i = c-7;i<c;i++){
			trHTML += "<tr id='info1'><td>"+stopped[i].num+"</td><td>"+stopped[i].price
			+"</td><td>"+stopped[i].car_num
			+"</td><td>"+format(stopped[i].created_at)
			+"</td><td>"+stoptime(stopped[i].created_at)
			+"</td><td><a onclick='leaveCar("+stopped[i].id+")'>出车</a>"
			+"</td></tr>";
		}
		$('#stopped div:nth-child(2) table').append(trHTML);
	}
	else{
		f -=1;
		c = f *7;
		for(i=0;i<7;i++){
			$("#info1").remove();
		}
		var trHTML = "";
		for(var i = c-7;i<c;i++){
			trHTML += "<tr id='info1'><td>"+stopped[i].num+"</td><td>"+stopped[i].price
			+"</td><td>"+stopped[i].car_num
			+"</td><td>"+format(stopped[i].created_at)
			+"</td><td>"+stoptime(stopped[i].created_at)
			+"</td><td><a onclick='leaveCar("+stopped[i].id+")'>出车</a>"
			+"</td></tr>";
		}
		$('#stopped div:nth-child(2) table').append(trHTML);
		if(f==1){
			$('#stopped div:nth-child(3) span:nth-child(1)').removeAttr("onclick");
			$('#stopped div:nth-child(3) span:nth-child(1)').attr("onclick","first()");
		}
	}
}

function leaveCar(id){
	$.ajax({
		type : "post",
		url : "/parking/com/parking/servlet/ParkingServlet?status=leaveCar",
		data:{
			id: id,
		},
		datatype : "text",
		success : function(Parking) {
			location.reload();
		},
		error : function(error){
			alert("操作失败！！！");
		}
	})
}