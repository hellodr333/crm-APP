


$(function(){
	
	var  igeo=new Geo(document.getElementById("provinceS") ,document.getElementById("cityS") ,document.getElementById("countyS") ,'');
	
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
			userID='';
		}else{
			userID=$('#manIpt').attr('userId');
		}

		console.log(userID);
	});
	
//-----------------------------------------------获取联系人列表--start-----------------------------------------

	var ctmGeo='';
	var ctmName='';
	var userID='';
	var pageNo=1;
	getList(ctmGeo,ctmName,userID);
	
	function getList(ctmGeo,ctmName,userID ){
		 console.log(ctmGeo)
		 console.log(ctmName)
		 console.log(userID)
		$.ajax({
			url:'/'+app+'/crm/cuc/qry',
			data:{
				"DT_SCOPE" :$("#myCust").is(":checked")?2:1,
				"sc_ctmGeo":ctmGeo,
				"sc_ctmName":ctmName,
				"sc_bizUser":userID,
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					
					$('#custList').html('');
					var string='';
					for(var i=0;i<str.responseData.length;i++){		
						string += '  <tr id='+ str.responseData[i].id +'   custId='+ str.responseData[i].custId +'>\
						 <td>'+noData(str.responseData[i].custId_view)+'</td>\
                            <td>'+noData(str.responseData[i].ctmName)+'</td>\
                            <td >'+igeo.cityname(str.responseData[i].ctmGeo)+' </td>\
                            <td>'+noData(str.responseData[i].ctmMobile)+'</td>\
                            <td>'+noData(str.responseData[i].ctmTelephone)+'</td>\
                            <td>'+noData(str.responseData[i].ctmEmail)+'</td>\
                             <td>'+noData(custStatus(str.responseData[i].ctmStatus))+'</td>\
                             <td>'+noData(setDate(str.responseData[i].sttLastVisit))+'</td>\
                             <td>'+noData(str.responseData[i].bizUser_view)+'</td>\
                              <td>\
                            	<a  class="viewCtmDetail"  href="#viewCtmDetail"  data-toggle="modal"><i class="icon-eye-open"></i></a>\
                            </td>\
                             <td>\
                            	<a  class=""  href="ctm_detail.html?custID='+ str.responseData[i].custId +'&ctmID='+str.responseData[i].id+'" ><i class="icon-pencil"></i></a>\
                            </td>\
                        </tr> ';					 
					
				
				}		
					if(str.responseData.length==0){
						string += ' <tr><td colspan="12" ><p class="text-center">无数据</p></td></tr>'
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
	
	
	
	//-----------------------------------------------获取联系人列表--end-----------------------------------------	
	
	
	
//-------------------------------------------------------------------------- 查看联系人信息 ---------------------------------------------------------------------
	$(document).delegate(' .viewCtmDetail','click',function(){
		var id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/'+app+'/crm/cuc/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				 $("#ctmName").val(noData(str.responseData.ctmName));      
				 $("#ctmTitle").val(noData(str.responseData.ctmTitle));  
					geoNum = str.responseData.ctmGeo;
					igeo = new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,geoNum);
				$("#ctmAddres").val(noData(str.responseData.ctmAddress)); 
				 $("#ctmMobile").val(noData(str.responseData.ctmMobile)); 
				$("#ctmEmail").val(noData(str.responseData.ctmEmail));
				 $("#ctmStatus").val(ctmStatus(noData(str.responseData.ctmStatus)));
				 $("#ctmAddress").val(noData(str.responseData.ctmAddress));  
				 $("#ctmTelephone").val(noData(str.responseData.ctmTelephone)); 
				 $("#ctmWx").val(noData(str.responseData.ctmWx));  
				$("#ctmQq").val(noData(str.responseData.ctmQq)); 
				 $("#remark").val(noData(str.responseData.remark));	

			}
		})

	});
	

	
//	-------------------------------------------------------------------------搜索---------------------------------------------------------------------------------
	$('#searchBtn').click(function(){
		 ctmGeo=$("#cityS").val()?$("#cityS").val():$("#provinceS").val();
		 ctmName=$('#schCustName').val();
		 getList(ctmGeo,ctmName,userID);
		
	})
	
	$("#myCust").click(function(){
		pageNO=1;
		getList(ctmGeo,ctmName,userID);
		
})


	
	
})