
function restore(){
	$('.redactBtn').removeClass('hide');
	$('.saveBtn,.colseBtn').addClass('hide');
	$('input.edit-box').addClass('disabled').attr('readonly','readonly');
	$('select.edit-box,textarea.edit-box').addClass('disabled').attr('disabled','disabled');
	$('i.text-error').html("");
	
}


$(function(){
	
	$('#myTab a:first').tab('show');
	var custID = GetQueryParam("custID");
	console.log(custID)
	
//	 链接id
	
	$('#cst').attr('href','../cust/cust_detail.html?custID='+custID);
	$('#ctm').attr('href','../cust/ctm_detail.html?custID='+custID);
	$('#chance').attr('href','../chance/cust_chance.html?custID='+custID);
	$('#vst').attr('href','../visits/cust_vst.html?custID='+custID);
	
	$('#contract').attr('href','../contract/cust_contract.html?custID='+custID);
	
	
	
	// 编辑保存按钮
	  $('.redactBtn').click(function(){
	      $(this).addClass('hide').siblings('.btn').removeClass('hide');
	      $('.edit-box').removeClass('disabled').removeAttr('readonly').removeAttr('disabled');
	  })
	  $('.colseBtn').click(function(){
	      restore();
	    })


	    
	  //-------------------------------------------------------------------------- 获取客户信息 ---------------------------------------------------------------------
		getCustInfo();
		function getCustInfo(){
					$.ajax({
						url:'/'+app+'/crm/cus/get',
						data:{
							id:custID
						},
						type:'POST',
						success:function(str){
							console.log(str);
							if(str.responseCode==0){
								 $("#name").val(str.responseData.name);      
								  $("#homePage").val(str.responseData.homePage);  
									geoNum = str.responseData.geoId;
									igeo = new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,geoNum);
								$("#address").val(str.responseData.address); 
								 $("#postalCode").val(str.responseData.postalCode); 
								$("#formalName").val(str.responseData.formalName);
								 $("#formatNo").val(str.responseData.formatNo);
								 $("#cmpLicense").val(str.responseData.cmpLicense);  
								 $("#cmpBusiness").val(str.responseData.cmpBusiness); 
								 $("#custType").val(str.responseData.custType);  
								$("#legalMan").val(str.responseData.legalMan); 
								  $("#legalMobile").val(str.responseData.legalMobile);
								 $("#custStatus").val(str.responseData.custStatus);
								 $("#remark").val(str.responseData.remark);
							}
							 
						}
					})
		}
//	    ----------------------------------------------------------------提交编辑信息---------------------------------------
		checkForm('custForm');
		 $("#saveBtn").click(function(){
			 if(checkForm2('custForm')){
				$.ajax({
				  type: 'POST',
				  url:'/'+app+'/crm/cus/upd',
			      data: {
			    	  "id":custID,
			    	  "name" : $("#name").val(),        
						 "homePage" : $("#homePage").val(),  
						 "geoId":  igeo.geo(),         //所在区域
						 "address" : $("#address").val(),  
						 "postalCode" : $("#postalCode").val(),  
						 "formalName" : $("#formalName").val(),  
						 "formatNo" : $("#formatNo").val(),  
						 "cmpLicense" : $("#cmpLicense").val(),  
						 "cmpBusiness" : $("#cmpBusiness").val(),  
						 "custType" : $("#custType").val(),  
						 "legalMan" : $("#legalMan").val(),  
						 "legalMobile" : $("#legalMobile").val(),
						 "custStatus" : $("#custStatus").val(),
						 "remark" : $("#remark").val()
			      },
				  success: function(str){
						console.log(str);
						if(str.responseCode==0){
							makeSure("makeSureBox","客户信息修改成功!");
							restore();
						}else{
							alert("错误！")
							}
						
				  }
				});
			 };
		}); 
		  
		 

	});
	

	

