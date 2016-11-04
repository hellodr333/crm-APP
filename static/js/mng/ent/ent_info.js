function restore(){
	$('.redactBtn').removeClass('hide');
	$('.saveBtn,.colseBtn').addClass('hide');
	$('input.edit-box').addClass('disabled').attr('readonly','readonly');
	$('select.edit-box,textarea.edit-box').addClass('disabled').attr('disabled','disabled');
	$('i.text-error').html("");
}


//内容展示与编辑
$(function(){
	//获取当前企业ID
	var entID='';
	function getInfo(){
		$.ajax({
			  type: 'POST',
			  url: "/"+app+"/org/ent/get",
			  success:function(str){
				console.log(str)
				if(str.responseCode==0)
				entID = str.responseData.id;
				var json =str.responseData;
				$("#name").val(json.name),        //企业名称
				geoNum = json.geo;
				igeo = new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,geoNum);
				$("#address").val(json.address),     //地址
				$("#postalCode").val(json.postalCode),  //邮编
				$("#homePage").val(json.homePage),    //网址
				$("#legalMan").val(json.legalMan),    //法人
				$("#telephone").val(json.telephone),   //电话
				$("#cmpLicense").val(json.cmpLicense),  //营业执照号码
				$("#cmpBusiness").val(json.cmpBusiness), //经营范围
				$("#formalName").val(json.formalName),  //公司全名
				$("#formalNo").val(json.formalNo),  	  //涉税号
				$("#entStatus").val(json.entStatus),   //企业状态
				$("#remark").val(json.remark),    //备注
				$("#createdDate").val(setDate(json.createdDate)),//创建时间
				$("#createdBy").val(json.createdBy_view),//创建人
				$("#lastModifiedDate").val(setDate(json.lastModifiedDate)),//最后修改时间
				$("#lastModifiedBy").val(json.lastModifiedBy_view)//最后修改人
			  }
		 })
	}
	getInfo();
	//企业信息页面 ～
	
	
	$('.redactBtn').click(function(){
		$(this).addClass('hide').siblings('.btn').removeClass('hide');
		$('.edit-box').removeClass('disabled').removeAttr('readonly').removeAttr('disabled');
	})
	$('.colseBtn').click(function(){
		restore();
		getInfo();
		})



		
		checkForm("form1")
		
		$(".saveBtn").click(function(){

		//循环判断
		
		if(checkForm2("form1")){
			$.ajax({
			  type: 'POST',
			  url: "/"+app+"/org/ent/upd",
		      data: {"id"		   : entID,
					 "name"        : $("#name").val(),       //企业名称
					 "geo"         : igeo.geo(),          	 //所在区域
					 "address"     : $("#address").val(),     //地址
					 "postalCode"  : $("#postalCode").val(),  //邮编
					 "homePage"    : $("#homePage").val(),    //网址
					 "legalMan"    : $("#legalMan").val(),    //法人
					 "telephone"   : $("#telephone").val(),   //电话
					 "cmpLicense"  : $("#cmpLicense").val(),  //营业执照号码
					 "cmpBusiness" : $("#cmpBusiness").val(), //经营范围
					 "formalName"  : $("#formalName").val(),  //公司全名
					 "formalNo"    : $("#formalNo").val(),  	  //涉税号
					 "entStatus"   : $("#entStatus").val(),   //企业状态
					 "remark"      : $("#remark").val()     //备注
			  
			  },
			  success: function(str){
					if(str.responseCode==0){
						restore();
						$('i.text-error').html("");
						}else{
							makeSure("makeSureBox","错误!");
							}
					
			  }
			});
		}
	});
})