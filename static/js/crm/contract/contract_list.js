
$(function(){
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	new Geo(document.getElementById("provinceS") ,document.getElementById("cityS")  ,document.getElementById("countyS"),'');

	
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
	//	-------------------------------------------------------------------------- 获取合同列表 ----------------------------------------------------------------------
	var pageNo=1;
	getList(geoId,cName);
	function getList(geoId,cName){
		console.log($("#myCntr").is(":checked"))
		$.ajax({
			url:'/'+app+'/crm/cnt/qry',
			data:{
				"sc_custType":'',
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo,
				  "sc_signGeo":geoId,
				  "sc_cntrName":cName,
				  "DT_SCOPE" :$("#myCntr").is(":checked")?2:1,
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseData)
					$('#contList').html('');
				if(str.responseCode==0){
					var string='';
					if(str.responseData.length>0){
						for(var i=0;i<str.responseData.length;i++){		
							
							string += '  <tr id='+ str.responseData[i].id +' cntrCust='+str.responseData[i].cntrCust+'>\
							    <td>'+noData(str.responseData[i].custName)+'</td>\
							    <td >'+noData(igeo.cityname(str.responseData[i].signGeo))+'</td>\
							    <td class="text-right">'+noData(fmoney(str.responseData[i].tamount))+'</td>\
	                            <td>'+noData(str.responseData[i].cntrName)+'</td>\
	                            <td>'+noData(str.responseData[i].cntrNo)+'</td>\
	                            <td>'+noData(setDate(str.responseData[i].signDate))+'</td>\
	                            <td>'+noData(cntrStatus(str.responseData[i].status))+'</td>\
	                            <td class="text-right">'+noData(fmoney(str.responseData[i].sttRepayAmount))+'</td>\
	                             <td>'+noData(str.responseData[i].bizUser_view)+'</td>\
	                              <td>\
	                              <a title="查看" class="seeContBox" href="#seeContBox" data-toggle="modal"><i class="icon-eye-open"></i></a>\
	                            </td>\
	                             <td>\
	                             <a title="编辑" class="updContBox" href="cust_contract.html?custID='+str.responseData[i].cntrCust+'&cntrID='+str.responseData[i].id+'"><i class="icon-pencil"></i></a>\
	                            </td>\
	                        </tr> ';					 
						
					
					}		
					}else{
						string+='<tr><td colspan="10" style="text-align:center">无数据</td></tr>'
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
			url:'/'+app+'/crm/cnt/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				 $("#cntrName").val(str.responseData.contractPo.cntrName);      //合同名称
				 $("#cntrNo").val(str.responseData.contractPo.cntrNo);  
			     $("#cntrType").val(contType(str.responseData.contractPo.cntrType)); 
				 $("#tamount").val(str.responseData.contractPo.tamount); 
				 $("#bankAccount").val(str.responseData.contractPo.bankAccount);
				 $("#openBank").val(str.responseData.contractPo.openBank);
				 $("#bankAccountCust").val(str.responseData.contractPo.bankAccountCust);  
				 $("#openBankCust").val(str.responseData.contractPo.openBankCust); 
				 $("#signDate").val(setDate(str.responseData.contractPo.signDate));  
				 $("#signerCust").val(str.responseData.contractPo.signerCust); 
				 $("#cntrFrom").val(setDate(str.responseData.contractPo.cntrFrom));
				 $("#cntrThru").val(setDate(str.responseData.contractPo.cntrThru));
				 geoNum = str.responseData.contractPo.signGeo;
				 igeo = new Geo(document.getElementById("province2") ,document.getElementById("city2") ,document.getElementById("county2") ,geoNum);
				 $("#signAddress").val(str.responseData.contractPo.signAddress);
				 $("#signer").val(str.responseData.contractPo.signer);
				 var dethtml="";
				 for(var i=0;i<str.responseData.items.length;i++){
						dethtml+='<tr class="detaillist">\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(setDate(str.responseData.items[i].itemThru))+'" style="width:180px" type="date" class="itemThru" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(str.responseData.items[i].prodName)+'" style="width:180px" type="text" class="prodName"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(str.responseData.items[i].prodPrice)+'" style="width:180px" type="text" class="prodPrice"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(str.responseData.items[i].prodQty)+'" style="width:180px" type="text" class="prodQty"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(str.responseData.items[i].prodAmount)+'" style="width:180px" type="text" class="prodAmount" readonly="readonly" requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
				       </tr>'
				 }
				 $("#seeContBox #detailList").html(dethtml)
				 var payhtml="";
				 for(var i=0;i<str.responseData.repamentPlans.length;i++){
					
						payhtml+='<tr class="paymentlist">\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(setDate(str.responseData.repamentPlans[i].rpayDate))+'" type="date"  class="rpayDate" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(str.responseData.repamentPlans[i].rpayAmount)+'"  type="text"  class="rpayAmount"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(payStatus(str.responseData.repamentPlans[i].status))+'" type="text" readonly="readonly" class="status"   check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input class="disabled" disabled value="'+noData(str.responseData.repamentPlans[i].remark)+'" type="text"  class="remark"check="U_2NAME_P"><i class="text-error"></i></td>\
				       </tr>'
				 }
				 $("#seeContBox #paymentList").html(payhtml)
			}
		})

	});
	

	
})