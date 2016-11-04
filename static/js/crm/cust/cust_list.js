
$(function(){
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	var igeoS=new Geo(document.getElementById("provinceS") ,document.getElementById("cityS")  ,document.getElementById("countyS"),'');
	

//	-------------------------------------------------------------------------- 获取客户列表 ----------------------------------------------------------------------
	var pageNo=1;
	var cType='';
	var geoId='';
	var cName='';
	var userID2='';
	
	getList(cType,geoId,cName,userID2);
	
	function getList(cType,geoId,cName,userID2){
		console.log(geoId)
		$.ajax({
			url:'/'+app+'/crm/cus/qry',
			data:{
				"DT_SCOPE" :$("#myCust").is(":checked")?2:1,
				"sc_custType":cType,
				"sc_geoId":geoId,
				"sc_name":cName,
				"sc_bizUser":userID2,
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					if(str.responseData.length==0){
						"无数据"
					}
					$('#custList').html('');
					var string='';
					for(var i=0;i<str.responseData.length;i++){		
						
						string += '  <tr id='+ str.responseData[i].id +'>\
				                            <td>'+noData(str.responseData[i].name)+'</td>\
				                            <td>'+noData(str.responseData[i].bizUser_view)+'</td>\
				                            <td>'+noData(str.responseData[i].ext_mainCtmer)+'</td>\
				                            <td>'+noData(str.responseData[i].ext_mainCtmerMobile)+'</td>\
				                            <td >'+noData(igeo.cityname(str.responseData[i].geoId))+' </td>\
				                            <td>'+noData(custType(str.responseData[i].custType))+'</td>\
				                             <td>'+noData(custStatus(str.responseData[i].custStatus))+'</td>\
				                            <td>'+noData(setDate(str.responseData[i].sttLastVisit))+'</td>\
				                            <td>'
				                            
				                            if(str.responseData[i].cntrCnt!=0){
				                            	string +='<span  style="color:#ADADAD">变更经理</span>'
				    						}else{
				    							string +='<a  class="chgMang" href="#chgMangBox" data-toggle="modal">变更经理</a>'
				    						}     
				                            
						string += ' </td>\
				                              <td>\
				                            	<a  class="viewDetail"  href="#viewDetail"  data-toggle="modal"><i class="icon-eye-open"></i></a>\
				                            </td>\
				                             <td>\
				                            	<a  class=""  href="cust_detail.html?custID='+ str.responseData[i].id +'" ><i class="icon-pencil"></i></a>\
				                            </td>\
				                        </tr> ';			
						
						
						
				}		
					
				
					
					if(str.responseData.length==0){
						string += ' <tr><td colspan="11" ><p class="text-center">无数据</p></td></tr>'
					}
					$('#custList').html(string);
					
					if(str.resv1lng==0){
						$("#nowPage").html(0)	
					}else{
						$("#nowPage").html(pageNo)	
					}
					$('#totalPage').html(str.resv1lng);
				}else{
					console.log("获取失败")
				}
			}					
		});
	
	}
	$("#firstPage").click(function(){
		pageNo=1;
		getList();
		})
	$("#prevPage").click(function(){
		pageNo--;
		if(pageNo<1){
			pageNo=1;
			makeSure("makeSureBox","已经是第一页了");
			
			return false;
			}else{
				getList();
			}
		})
	
	$("#nextPage").click(function(){
		pageNo++;
		if(pageNo>$("#totalPage").html()){
			pageNo=$("#totalPage").html();
			makeSure("makeSureBox","已经是最后一页了");
			return false;
			}else{
				getList();
				}
		})
	$("#lastPage").click(function(){
		pageNo=$("#totalPage").html();
		getList();
		})
	$("#jumpPage").click(function(){
		pageNo=$("#goPage").val();
		if(pageNo>0 && pageNo <= $("#totalPage").html()){
			getList();
			}else{
				alert("超出范围！")
				pageNo =$("#nowPage").val();
				}
		});		
	
	
	
	//---------------------------------------选择客户经理-----------------------------------------------------------
	
	$('#searchMan').click(function(){
		empTree("managerS","manIpt","schManagerList");
		$("#managerS  .close").click(function(){
			$("#managerS").hide("fast");
		})
		
		
	})
	
	
	$('#schMangSave').click(function(){
		$("#searchManBox").hide();
		$(".modal-backdrop").each(function(){
			$(this).hide();
		})
		$('#showIpt').val($('#manIpt').val());
		if($('#manIpt').val()==''){
			userID2='';
		}else{
			userID2=$('#manIpt').attr('userId');
		}
		
		console.log(userID2);
	});
	 
	//---------------------------------------	变更项目经理, 获取数据----------------------------------------------

	var cId='';
	var userID=''
	$(document).delegate(".chgMang",'click',function(){
		empTree("managerC","crmResp","managerList");
			cId=$(this).parent().parent().attr('id');
//			console.log(cId)
			$("#managerC  .close").click(function(){
				$("#managerC").hide("fast");
			})
			
	})
	 
	$('#chgMangSave').click(function(){
		userID=$('#crmResp').attr('userId');
		console.log(cId,userID)
		$.ajax({
			url:'/'+app+'/crm/cus/ccm',
			data:{
				"id":cId,
				"bizUser":userID
			},
			type:"POST",
			success:function(str){
				if(str.responseCode==0){
					console.log($('#crmResp').val())
					$('#'+cId).children().eq(1).html($('#crmResp').val());
					$("#chgMangBox").hide();
					$(".modal-backdrop").each(function(){
						$(this).hide();
					})
				}
			}
		});
	});
		
	
//-------------------------------------------------------------------------- 获取客户信息 ---------------------------------------------------------------------
	
	
	$(document).delegate(' .viewDetail','click',function(){
		var id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/'+app+'/crm/cus/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				 $("#name1").val(noData(str.responseData.name));     
				  $("#homePage1").val(noData(str.responseData.homePage));  
					geoNum = str.responseData.geoId;
					igeo = new Geo(document.getElementById("province1") ,document.getElementById("city1") ,document.getElementById("county1") ,geoNum);
				$("#address1").val(noData(str.responseData.address)); 
				
				 $("#postalCode1").val(noData(str.responseData.postalCode)); 
				$("#formalName1").val(noData(str.responseData.formalName));
				
				 $("#formalNo1").val(noData(str.responseData.formatNo));
				 
				 $("#cmpLiceNse1").val(noData(str.responseData.cmpLicense));  
				 $("#cmpBusness1").val(noData(str.responseData.cmpBusiness)); 
				 $("#custType1").val(noData(custType(str.responseData.custType)));  
				$("#legalMan1").val(noData(str.responseData.legalMan)); 
				  $("#legalMobile1").val(noData(str.responseData.legalMobile));
				 $("#custStatus1").val(noData(custStatus(str.responseData.custStatus)));
				 $("#remark1").val(noData(str.responseData.remark));

			}
		})

	});
	

	
	
//	-------------------------------------------------------------------------- 新增客户 ----------------------------------------------------------------------
	
	$('#addCustBox').click(function(){
		$('#custForm i').html('');
	    checkForm('custForm');
	})
	
		$('#saveCust').click(function(){
			if(checkForm2('custForm')){
					$.ajax({
						url:'/'+app+'/crm/cus/add',
						data:{
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
						type:'POST',
						success:function(str){
							console.log(str);
							if(str.responseCode==0){
								if($('#custList p').html()=="无数据"){
									var string='';
								}else{
									var string=$('#custList').html();
								}
								
								string += '  <tr id='+ str.responseData +'>\
								                        <td>'+noData($("#name").val())+'</td>\
								                        <td>'+noData(unescape(getCookie("user")))+'</td>\
								                        <td>'+noData()+'</td>\
								                        <td>'+noData()+'</td>\
								                        <td >'+noData(igeo.geoname(igeo.geo()))+' </td>\
								                        <td>'+noData(custType($("#custType").val()))+'</td>\
								                         <td>'+noData(custStatus($("#custStatus").val()))+'</td>\
								                        <td>'+noData()+'</td>\
								                        <td>\
								                        <a  class="chgMang" href="#chgMangBox" data-toggle="modal">变更经理</a>\
								                        </td>\
								                          <td>\
								                        	<a  class="viewDetail"  href="#viewDetail"  data-toggle="modal"><i class="icon-eye-open"></i></a>\
								                        </td>\
								                         <td>\
								                        	<a  class=""  href="cust_detail.html?custID='+ str.responseData +'" ><i class="icon-pencil"></i></a>\
								                        </td>\
								                    </tr> ';		
								
								
								$('#custList').html(string);							
								makeSure("makeSureBox","客户已添加成功!");
								
								$("#addCust").hide();
								$(".modal-backdrop").each(function(){
									$(this).hide();
								})
								$('#custForm input,  #custForm select').val('');
								$('#custForm i').html('');

							}
						}
					})
			}
	})
	
	



	
//	-------------------------------------------------------------------------搜索---------------------------------------------------------------------------------
	$('#searchBtn').click(function(){
		 cType=$('#choType').val();
		 geoId=$("#cityS").val()?$("#cityS").val():$("#provinceS").val();
		 cName=$('#schCustName').val();
		 console.log(userID2)
		 getList(cType,geoId,cName,userID2);
		 
	})
	
	$("#myCust").click(function(){
			pageNO=1;
			getList(cType,geoId,cName,userID2);
			
	})
	
	
	
	
})