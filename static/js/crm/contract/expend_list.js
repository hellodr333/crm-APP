
$(function(){
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	new Geo(document.getElementById("provinceS") ,document.getElementById("cityS")  ,document.getElementById("countyS"),'');
//	-------------------------------------------------------------------------- 获取合同列表 ----------------------------------------------------------------------
	var cType='';
	var geoId='';
	var cName='';
	$('#searchBtn').click(function(){
		 geoId=$("#cityS").val()?$("#cityS").val():$("#provinceS").val();
		 cName=$('#schCntrName').val();
		 getList(geoId,cName);
	})
	$("#myCntr").click(function(){
		pageNo=1;
		getList(geoId,cName);
		})
	
	var pageNo=1;
	 getList(geoId,cName);
	function getList(geoId,cName ){
		$.ajax({
			url:'/'+app+'/crm/exp/qry',
			data:{
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo,
				  "sc_geoId":geoId,
				  "sc_cntrName":cName,
				  "DT_SCOPE" :$("#myCntr").is(":checked")?2:1,
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					if(str.responseData)
						$('#contList').html('');
					var string='';
					if(str.responseData.length>0){
						for(var i=0;i<str.responseData.length;i++){		
							string += '  <tr id='+ str.responseData[i].id +'>\
	                            <td>'+noData(setDate(str.responseData[i].costDate))+'</td>\
	                            <td >'+noData(igeo.cityname(str.responseData[i].costGeo))+' </td>\
	                            <td class="text-right" style="width:150px;padding-right:50px">'+noData(fmoney(str.responseData[i].costs))+'</td>\
	                            <td>'+noData(expType(str.responseData[i].costType))+'</td>\
	                            <td>'+noData(repStatus(str.responseData[i].status))+'</td>\
	                            <td>'+noData(str.responseData[i].bizUser_view)+'</td>\
	                              <td>\
	                              <a title="查看" class="seeContBox" href="#seeContBox" data-toggle="modal"><i class="icon-eye-open"></i></a>\
	                            </td>\
	                             <td>\
	                             <a title="编辑" class="updContBox" href="contract_expend.html?custID='+str.responseData[i].custId+'&cntrID='+str.responseData[i].cntrId+'&expID='+str.responseData[i].id+'"><i class="icon-pencil"></i></a>\
	                            </td>\
	                        </tr> ';					 
						
					}		
					}else{
						string+='<tr><td colspan="9" style="text-align:center">无数据</td></tr>'
					}
					$('#contList').html(string);
					
					if(str.resv1lng==0){
						$("#nowPage").html(1)	
					}else{
						$("#nowPage").html(pageNo)	
					}
					$('#totalPage').html(str.resv1lng==0?1:str.resv1lng);
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
			makeSure("makeSureBox","已经是第一页了~");
			return false;
			}else{
				getList();
			}
		})
	
	$("#nextPage").click(function(){
		pageNo++;
		if(pageNo>$("#totalPage").html()){
			pageNo=$("#totalPage").html();
			makeSure("makeSureBox","已经是第一页了~");
			alert('已经是最后一页了~')
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
				makeSure("makeSureBox","已经是第一页了~");
				alert("超出范围！")
				pageNo =$("#nowPage").val();
				}
		});		
	
$(document).delegate("#contList tr",'click',function(){
		
		$("#contList tr").css("background","")
		$(this).css("background","rgb(232, 242, 254)")
	
	})
//-------------------------------------------------------------------------- 查看合同信息 ---------------------------------------------------------------------
	
	
	$(document).delegate('.seeContBox','click',function(){
		
		var id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/'+app+'/crm/exp/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				 $("#seeContform #costs").val(str.responseData.costs);      //合同名称
				 $("#seeContform #costs").attr("expid",str.responseData.id);
				 $("#seeContform #costs").attr("cntrid",str.responseData.cntrId);
				 $("#seeContform #costs").attr("custvisitid",str.responseData.custVisitId);
				 $("#seeContform #costType").val(str.responseData.costType);  
				 $("#seeContform #costDate").val(setDate(str.responseData.costDate));  
				 $("#seeContform #costMsg").val(str.responseData.costMsg); 
				 geoNum = str.responseData.costGeo;
				 igeo = new Geo(document.getElementById("province2") ,document.getElementById("city2") ,document.getElementById("county2") ,geoNum);
			}
		})

	});
	

	
})