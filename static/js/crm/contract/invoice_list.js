
$(function(){
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	new Geo(document.getElementById("provinceS") ,document.getElementById("cityS")  ,document.getElementById("countyS"),'');
//	-------------------------------------------------------------------------- 获取发票列表 ----------------------------------------------------------------------

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
			url:'/'+app+'/crm/ivc/qry',
			data:{
				 "PAGE_SIZE":"10",
				 "PAGE_NO":pageNo,
				  "sc_signGeo":geoId,
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
	                            <td>'+noData(setDate(str.responseData[i].invcDate))+'</td>\
	                            <td>'+noData(str.responseData[i].custName)+'</td>\
	                            <td >'+noData(igeo.cityname(str.responseData[i].signGeo))+' </td>\
	                            <td>'+noData(str.responseData[i].invcTitle)+'</td>\
	                            <td class="text-right">'+noData(fmoney(str.responseData[i].invcAmount))+'</td>\
	                            <td class="text-right">'+noData(fmoney(str.responseData[i].cntrAmount))+'</td>\
	                            <td>'+noData(ivcType(str.responseData[i].invcType))+'</td>\
	                             <td>'+noData(ivoStatus(str.responseData[i].status))+'</td>\
	                             <td>'+noData(str.responseData[i].bizUser_view)+'</td>\
	                              <td>\
	                              <a title="查看" class="seeContBox" href="#seeContBox" data-toggle="modal"><i class="icon-eye-open"></i></a>\
	                            </td>\
	                             <td>\
	                             <a title="编辑" class="updContBox" href="contract_invoice.html?custID='+str.responseData[i].invcCust+'&cntrID='+str.responseData[i].cntrId+'&ivcID='+str.responseData[i].id+'"><i class="icon-pencil"></i></a>\
	                            </td>\
	                        </tr> ';					 
					
					}		
					}else{
						string+='<tr><td colspan="11" style="text-align:center">无数据</td></tr>'
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
			makeSure("makeSureBox","已经是最后一页了~");
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
				makeSure("makeSureBox","超出范围~");
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
			url:'/'+app+'/crm/ivc/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				 $("#seeContform #invcName").val(str.responseData.invcName);      //发票名称
				 $("#seeContform #invcName").attr("ivcid",str.responseData.id);
				 $("#seeContform #invcName").attr("cntrid",str.responseData.cntrId);
				 $("#seeContform #invcName").attr("custid",str.responseData.custId);
				 $("#seeContform #invcType").val(str.responseData.invcType);  
			     $("#seeContform #invcTitle").val(str.responseData.invcTitle); 
				 $("#seeContform #invcCode").val(str.responseData.invcCode); 
				 $("#seeContform #invcAmount").val(str.responseData.invcAmount);
				 $("#seeContform #invcDrawer").val(str.responseData.invcDrawer);
				 $("#seeContform #invcDate").val(setDate(str.responseData.invcDate));  
				 $("#seeContform #remark").val(str.responseData.remark); 
				 $("#seeContform #invcNo").val(str.responseData.invcNo);
			}
		})

	});
	

	
})