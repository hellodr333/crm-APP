
$(function(){
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	
	$('#myTab a:eq(1)').tab('show');
	console.log('ccc')
	var custID = GetQueryParam("custID");
	var ctmID = GetQueryParam("ctmID");
	console.log(custID,ctmID)
	
	//	 链接id
	
	$('#cst').attr('href','../cust/cust_detail.html?custID='+custID);
	$('#ctm').attr('href','../cust/ctm_detail.html?custID='+custID);
	$('#chance').attr('href','../chance/cust_chance.html?custID='+custID);
	$('#vst').attr('href','../visits/cust_vst.html?custID='+custID);
	
	$('#contract').attr('href','../contract/cust_contract.html?custID='+custID);

//	-------------------------------------------------------------------------- 获取联系人列表 ----------------------------------------------------------------------
	var pageNo=1;
	getList( );
	function getList( ){
		$.ajax({
			url:'/'+app+'/crm/cuc/qry',
			data:{
				"sc_custId":custID,
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var string='';
					for(var i=0;i<str.responseData.length;i++){		
						string += '<tr  id='+ str.responseData[i].id +'>\
                                <td>'+noData(str.responseData[i].ctmName)+'</td>\
                                <td>'+noData(igeo.cityname(str.responseData[i].ctmGeo))+' </td>\
                                <td>'+noData(str.responseData[i].ctmTitle)+'</td>\
                                <td>'+noData(str.responseData[i].ctmMobile)+'</td>\
                                <td>'+noData(str.responseData[i].ctmEmail)+'</td>\
                                <td>\
                                	<a  class="editCtm"  href="#editCtm"  data-toggle="modal"  id="editCtmBox"><i class="icon-pencil"></i></a>\
                                </td>\
                            </tr>  ';					 		
				}	
					
					if(str.responseData.length==0){
						string += ' <tr><td colspan="6" ><p class="text-center">无数据</p></td></tr>'
					}
					$('#custList').html(string);
					
					$('#'+ctmID).css('background','#e6faf5');
					
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
			makeSure("makeSureBox","已经是第一页了!");
			return false;
			}else{
				getList();
			}
		})
	
	$("#nextPage").click(function(){
		pageNo++;
		if(pageNo>$("#totalPage").html()){
			pageNo=$("#totalPage").html();
			makeSure("makeSureBox","已经是最后一页了!");
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
				makeSure("makeSureBox","超出范围了!");
				pageNo =$("#nowPage").val();
				}
		});		
	
//	-------------------------------------------------------------------------- 新增联系人 ----------------------------------------------------------------------
	$('#newCtm').click(function(){
		$('#addCtmBox i').html('');
		checkForm('addCtmForm');
		
		$.ajax({
			url:'/'+app+'/crm/cus/get',
			data:{
				id:custID
			},
			type:'POST',
			success:function(str){
					console.log(str);
					geoNum = str.responseData.geoId;
					 new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,geoNum);
			}
		})
		
	})
	
	$('#addCtm').click(function(){
		if(checkForm2('addCtmForm')){
			$.ajax({
				url:'/'+app+'/crm/cuc/add',
				data:{
					"custId":custID,
					 "ctmName" : $("#ctmName").val(),      //联系人名称
					 "ctmTitle" : $("#ctmTitle").val(),  
					 "ctmGeo":  $('#county').val(),        //所在区域
					 "ctmMobile" : $("#ctmMobile").val(),   
					 "ctmEmail" : $("#ctmEmail").val(),  
					 "ctmStatus" : $("#ctmStatus").val(),  
					 "ctmAddress" : $("#ctmAddress").val(),  
					 "ctmTelephone" : $("#ctmTelephone").val(),  
					 "ctmWx" : $("#ctmWx").val(),  
					 "ctmQq" : $("#ctmQq").val(),
					 "remark" : $("#remark").val(),
				},
				type:'POST',
				success:function(str){

					if(str.responseCode==0){
						if($('#custList p').html()=="无数据"){
							var s='';
						}else{
							var  s=$('#custList').html();
						}
							
							s += '<tr  id='+ str.responseData +'>\
						                        <td>'+noData($("#ctmName").val())+'</td>\
						                        <td>'+noData(igeo.cityname($('#county').val()))+' </td>\
						                        <td>'+noData($("#ctmTitle").val())+'</td>\
						                        <td>'+noData($("#ctmMobile").val())+'</td>\
						                        <td>'+noData($("#ctmEmail").val())+'</td>\
						                        <td>\
						                        	<a  class="editCtm"  href="#editCtm"  data-toggle="modal"  id="editCtmBox"><i class="icon-pencil"></i></a>\
						                        </td>\
						                    </tr>  ';					 
						$('#custList').html(s);
						makeSure("makeSureBox","联系人已添加成功!");
						$("#addCtmBox").hide();
						$(".modal-backdrop").each(function(){
							$(this).hide();
						})
						
						$('#addCtmBox  input,  #addCtmBox select').val('');
						$('#addCtmBox i').html('');
					}
				}
			})
		};
	});
	
//-------------------------------------------------------------------------- 获取联系人信息 ---------------------------------------------------------------------
	
	var id='';
	$(document).delegate(' .editCtm','click',function(){
		 id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/'+app+'/crm/cuc/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					 $("#ctmName1").val(str.responseData.ctmName);    
					  $("#ctmTitle1").val(str.responseData.ctmTitle);  
						geoNum = str.responseData.ctmGeo;
						igeo = new Geo(document.getElementById("province1") ,document.getElementById("city1") ,document.getElementById("county1") ,geoNum);
					$("#address1").val(str.responseData.address); 
					 $("#ctmMobile1").val(str.responseData.ctmMobile); 
					$("#ctmEmail1").val(str.responseData.ctmEmail);
					 $("#ctmStatus1").val(str.responseData.ctmStatus);
					 $("#ctmAddress1").val(str.responseData.ctmAddress);  
					 $("#ctmTelephone1").val(str.responseData.ctmTelephone); 
					 $("#ctmWx1").val(str.responseData.ctmWx);  
					$("#ctmQq1").val(str.responseData.ctmQq); 
					 $("#remark1").val(str.responseData.remark);	
				}
			}
		})
		checkForm('updCtmForm');
	});
	
	
	
//-------------------------------------------------------------------------- 编辑联系人信息 ---------------------------------------------------------------------
	
	
	$('#saveCtm').click(function(){
		if(checkForm2('updCtmForm')){
		console.log(id)
		$.ajax({
		url:'/'+app+'/crm/cuc/upd',
		data:{
			"id":id,
			 "ctmName" : $("#ctmName1").val(),  
			 "ctmTitle":$("#ctmTitle1").val(), 
			 "ctmMobile":$("#ctmMobile1").val(), 
			 "ctmEmail":$("#ctmEmail1").val(), 
			 "ctmGeo":  igeo.geo(),         
			 "ctmStatus":$("#ctmStatus1").val(), 
			 "ctmAddres" : $("#ctmAddres1").val(),  
			 "ctmTelephone":$("#ctmTelephone1").val(), 
			"ctmWx":$("#ctmWx1").val(), 
			"ctmQq":$("#ctmQq1").val(), 
			 "remark" : $("#remark1").val()
		},
		type:'POST',
		success:function(str){
			console.log(str);
			if(str.responseCode==0){
				$('#'+id).html('<td>'+$("#ctmName1").val()+'</td>\
					                        <td>'+$("#ctmTitle1").val()+'</td>\
					                        <td>'+$("#ctmMobile1").val()+'</td>\
					                        <td>'+igeo.cityname(igeo.geo())+' </td>\
					                        <td>'+noData($("#ctmEmail1").val())+'</td>\
					                        <td>\
					                        	<a  class="editCtm"  href="#editCtm"  data-toggle="modal"  id="editCtmBox"><i class="icon-pencil"></i></a>\
					                        </td>')
						                        
                 makeSure("makeSureBox","联系人信息修改成功!");
				$("#editCtm, .modal-backdrop").hide();
				$('#editCtm  input,  #editCtm select').val('');		
			}
			
		}
			})
		};
	});
		


	
	

})