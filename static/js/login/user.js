function restore(){
	$('.redactBtn').removeClass('hide');
	$('.saveBtn,.colseBtn').addClass('hide');
	$('input.edit-box').addClass('disabled').attr('readonly','readonly');
	$('select.edit-box,textarea.edit-box').addClass('disabled').attr('disabled','disabled');
	$('i.text-error').html("");
}


//内容展示与编辑
$(function(){
	var userID='';
	var igeo='';
	var geoNum='';
	
	$.jeDate("#brith",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"1000-00-00",
		zIndex:93000,
	})
	
	function getInfo(){
		$.ajax({
			  type: 'POST',
			  url:'/'+app+'/usr/usr/get',
			  success:function(str){
				console.log(str)
				if(str.responseCode==0)
				userID=str.responseData.id;
				
				$("#name").val(str.responseData.psnName);
				geoNum = str.responseData.psnGeo;
				igeo = new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,geoNum);
				$("#address").val(str.responseData.psnAddress);     //地址
				$("#brith").val(setDate(str.responseData.psnBirth));  //生日
				$("#gendar").val(str.responseData.psnGendar);    //性别
				$("#idcard").val(str.responseData.psnIdcard);    //省份证
				$("#email").val(str.responseData.psnEmail);    //email
				$("#telephone").val(str.responseData.psnPhone);   //电话
				$("#mobile").val(str.responseData.psnMobile);  //手机
				$("#account").val(str.responseData.usrAccount); //用户帐号
				$("#nick").val(str.responseData.usrNameNick);  	  //用户昵称
				$("#activeTime").val(setDate(str.responseData.stActiveTime));//激活时间
				$("#loginTime").val(setDate(str.responseData.stLoginLast));//最后登入时间
				$("#loginNum").val(str.responseData.stLoginNum);//登入次数
				$("#stLoginLastIP").val(str.responseData.stLoginLastIp);
				$("#regIP").val(str.responseData.regIp);
				$("#regDate").val(setDate(str.responseData.regDate));
				$("#usrStatus").val(userStatus(str.responseData.usrStatus));
			  }
		 })
	}
	getInfo();
	
	
	$('.redactBtn').click(function(){
		$(this).addClass('hide').siblings('.btn').removeClass('hide');
		$('.edit-box').removeClass('disabled').removeAttr('readonly').removeAttr('disabled');
	})
	$('.colseBtn').click(function(){
		restore();
		getInfo();
		})
		
	checkForm("form1");
	$(".saveBtn").click(function(){

		//循环判断
		
		if(checkForm2("form1")){
			$.ajax({
			  type: 'POST',
			  url:'/'+app+'/usr/usr/upd',
		      data: {
				  	"id"			: userID,
					"psnName"		: $("#name").val(),
					"psnGeo"        : igeo.geo(),
					"psnAddress"	: $("#address").val(), //地址
					"psnBirth"  	: $("#brith").val(),  //生日
					"psnGendar"	 	: $("#gendar").val(),    //性别
					"psnIdcard"		: $("#idcard").val(),    //省份证
					"psnEmail" 		: $("#email").val(),   //email
					"psnPhone" 		: $("#telephone").val(),   //电话
					"usrNameNick"	: $("#nick").val(),  	  //用户昵称
					
					"stLoginLastIp"	: $("#stLoginLastIP").val(),
					"regIp"			: $("#regIP").val(),
					"regDate"		: $("#regDate").val(),
					"usrStatus"		: $("#usrStatus").val(),
			  },
			  success: function(str){
					console.log(str);
					if(str.responseCode==0){
						restore();
						$('i.text-error').html("");
						}else{
							alert("错误！")
							}
					
			  }
			});
		}
	});	
		
		
		
		
		
		
		
})