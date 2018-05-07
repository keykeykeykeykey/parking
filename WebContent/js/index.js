function submitForm(){
	var a = 1;
	$.ajax({
		type : "post",
		url : "/parking/com/parking/servlet/LoginServlet",
		datatype : "text",
		success : function(Users) {
			var data = eval(Users);
			for(var i = 0;i<data.length;i++){
				if($("#name").val()==data[i].name && $("#password").val()==data[i].password){
					a = 2;
					break;
				}		
			}
			if(a==1){
				alert("用户名或者密码错误");
			}
			else{
				window.location.href = "html/parking.html"
			}
		},
		error : function(error) {
			alert("登陆失败！！！");
		}
	})
}
function judge(){
	var name = $("#name").val();
	var password = $("#password").val();
	if(name==""||password==""||name==null||password==null){
		alert("姓名或者密码不能为空")
	}else{
		submitForm();
	}
	
}