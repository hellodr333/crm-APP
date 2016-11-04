
$(function(){
	
	 
	
	//按钮
	$("#subCont").css("display","none")
	$("#conment").css("display","none")
	$("#comCont").css("display","none")
	$("#backCont").css("display","none")
	$("#stopCont").css("display","none")
	
	
	$('#myTab a:eq(5)').tab('show');
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	var custID = GetQueryParam("custID");
	var cntrId = GetQueryParam("cntrID");
    var ivcId  = GetQueryParam("ivcID");
    
	$('#chance').attr('href','../chance/cust_chance.html?custID='+custID);
	$('#vst').attr('href','../visits/cust_vst.html?custID='+custID);
	$('#cst').attr('href','../cust/cust_detail.html?custID='+custID);
	$('#ctm').attr('href','../cust/ctm_detail.html?custID='+custID);
	$('#ctrn').attr('href','../contract/cust_contract.html?custID='+custID);
	$('#inv').attr('href','../contract/contract_invoice.html?custID='+custID+'&cntrID='+cntrId);
	$('#rep').attr('href','../contract/contract_repay.html?custID='+custID+'&cntrID='+cntrId);
	$('#exp').attr('href','../contract/contract_expend.html?custID='+custID+'&cntrID='+cntrId);
	
//抬头	
	
	invcTitle();
	function invcTitle(){
		$.ajax({
	        url: '/' + app + '/crm/ivc/ctt',
	        type: 'POST',
	        data:{
	        	"custId":custID
			},
	        success: function (str) {
	        	console.log(str)
	           $("#invcTitle").val(str.responseData)
	        }
	   });
	}
	

//	-------------------------------------------------------------------------- 获取发票列表----------------------------------------------------------------------

	var pageNo=1;
	getnList( );
	function getnList( ){
		$.ajax({
			url:'/'+app+'/crm/ivc/qry',
			data:{
				"sc_custType":'',
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo,
				  "sc_cntrId":cntrId
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.resv2str!=20){
					$("#addNewbtn").css("display","none")
				}else{
					$("#addNewbtn").css("display","")
				}
				$("#addNewbtn").attr("resv2str",str.resv2str)
				if(str.responseCode==0){
					var nstatus="#updContBox";
					var string='';
					if(str.responseData.length>0){
						for(var i=0;i<str.responseData.length;i++){	
							if(str.responseData[i].cntrStatus!=20){
								$("#addNewbtn").css("display","none")
								nstatus=""
							}else{
								$("#addNewbtn").css("display","")
								nstatus="#updContBox"
							}
							string += '  <tr id='+ str.responseData[i].id +'>\
	                            <td>'+noData(setDate(str.responseData[i].invcDate))+'</td>\
	                            <td class="text-right">'+noData(str.responseData[i].invcAmount)+'</td>\
	                            <td>'+noData(str.responseData[i].invcTitle)+'</td>\
	                            <td>'+noData(str.responseData[i].cntrName)+'</td>\
	                            <td>'+noData(ivcType(str.responseData[i].invcType))+'</td>\
	                            <td>'+noData(ivoStatus(str.responseData[i].status))+'</td>\
	                             <td class="text-right">'+noData(str.responseData[i].cntrAmount)+'</td>\
	                             <td>'+noData(str.responseData[i].remark)+'</td>\
	                              <td >\
	                              <a title="编辑" class="updContBox updBtn" href="'+nstatus+'" data-toggle="modal"><div  ><i class="icon-pencil" ></i></div></a>\
	                            </td>\
	                            <td>\
	                            <a title="回款" href="contract_repay.html?custID='+custID+'&cntrID='+cntrId+'&invoiceid='+str.responseData[i].id+'">回款</a>\
	                          </td>\
	                        </tr> ';
							
					}	
						
					}else{
						string+='<tr><td colspan="10" style="text-align:center">无数据</td></tr>'
					}
					$('#contList').html(string);
					if(str.resv1lng==0){
						$("#nowPage").html(0)	
					}else{
						$("#nowPage").html(pageNo)	
					}
					$('#totalPage').html(str.resv1lng);
				}else{
					console.log("获取失败")
				}
				
				$('#'+ivcId).css('background','rgb(232, 242, 254)');
			}					
		});
	
	}
	
	$(document).delegate("#contList tr",'click',function(){
		
		$("#contList tr").css("background","")
		$(this).css("background","rgb(232, 242, 254)")
	
	})
	
	$("#firstPage").click(function(){
		pageNo=1;
		getnList( )
		})
	$("#prevPage").click(function(){
		pageNo--;
		if(pageNo<1){
			pageNo=1;
			makeSure("makeSureBox","已经是第一页了~");
			return false;
			}else{
				getnList( )
			}
		})
	
	$("#nextPage").click(function(){
		pageNo++;
		if(pageNo>$("#totalPage").html()){
			pageNo=$("#totalPage").html();
			makeSure("makeSureBox","已经是最后一页了~");
			return false;
			}else{
				getnList( )
				}
		})
	$("#lastPage").click(function(){
		pageNo=$("#totalPage").html();
		getnList( )
		})
	$("#jumpPage").click(function(){
		pageNo=$("#goPage").val();
		if(pageNo>0 && pageNo <= $("#totalPage").html()){
			getnList( )
			}else{
				makeSure("makeSureBox","超出范围~");
				pageNo =$("#nowPage").val();
				}
		});		
	
		
	
	
//	-------------------------------------------------------------------------- 新增发票----------------------------------------------------------------------
	checkForm('addContform');
	$('#saveCont').click(function(){
		
		if(checkForm2('addContform')) {
			
			$.ajax({
				url:'/'+app+'/crm/ivc/add',
				data:{
				 "invcCust":custID,
				 "cntrId":cntrId,
				 "invcName"      :$("#addContform #invcName").val(),      //发票名称
				 "invcType"      :$("#addContform #invcType").val(), 
			     "invcTitle"     :$("#addContform #invcTitle").val(),
				 "invcCode"      :$("#addContform #invcCode").val(),
				 "invcAmount"    :$("#addContform #invcAmount").val(),
				 "invcDrawer"    :$("#addContform #invcDrawer").val(),
				 "invcDate"      :$("#addContform #invcDate").val(),  
				 "remark"        :$("#addContform #remark").val(), 
				 "invcNo"        :$("#addContform #invcNo").val(),  
				 "resv2str"      :$("#addNewbtn").attr("resv2str")
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						console.log(str)
						if($('#contList tr td').html()=="无数据"){
							$('#contList').html("")
						}
						var s=$('#contList').html();
						s += '  <tr id='+ str.responseData +'>\
                        <td>'+noData($("#addContform #invcDate").val())+'</td>\
                        <td class="text-right">'+noData($("#addContform #invcAmount").val())+'</td>\
                        <td>'+noData($("#addContform #invcTitle").val())+'</td>\
                        <td>'+noData()+'</td>\
                        <td>'+noData(ivcType($("#addContform #invcType").val()))+'</td>\
                        <td>'+noData("草稿")+'</td>\
                         <td>'+noData()+'</td>\
                         <td>'+$("#addContform #remark").val()+'</td>\
                          <td >\
                          <a title="编辑" class="updContBox updBtn" href="#updContBox" data-toggle="modal"><div  ><i class="icon-pencil" ></i></div></a>\
                        </td>\
                        <td>\
                        <a title="回款" href="contract_repay.html?custID='+custID+'&cntrID='+cntrId+'&invoiceid='+str.responseData+'">回款</a>\
                      </td>\
                    </tr> ';					 
								$('#contList').html(s);
					
								$("#addContBox, .modal-backdrop").hide();
								$('#addContBox input,  #addContBox select').val('');
								$("#addContform #invcTitle").val($('#contList tr').children().eq(2).html())
								$("#contList tr").css('background','');
								var id=str.responseData ;
								$('#'+id).css('background','rgb(232, 242, 254)');
								$(".text-error").html("")
								makeSure("makeSureBox","发票添加成功!");
					}
				}
			})
		}
	});
	
	

	
//-------------------------------------------------------------------------- 修改获取发票信息 ---------------------------------------------------------------------
	
	
	$(document).delegate('.updContBox','click',function(){
		
		var id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/'+app+'/crm/ivc/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				
				 $("#updContform #invcName").val(str.responseData.invcName);      //发票名称
				 $("#updContform #invcName").attr("ivcid",id);
				 $("#updContform #invcName").attr("cntrid",str.responseData.cntrId);
				 $("#updContform #invcName").attr("custid",str.responseData.custId);
				 $("#updContform #invcType").val(str.responseData.invcType);  
			     $("#updContform #invcTitle").val(str.responseData.invcTitle); 
				 $("#updContform #invcCode").val(str.responseData.invcCode); 
				 $("#updContform #invcAmount").val(str.responseData.invcAmount);
				 $("#updContform #invcDrawer").val(str.responseData.invcDrawer);
				 $("#updContform #invcDate").val(setDate(str.responseData.invcDate));  
				 $("#updContform #remark").val(str.responseData.remark); 
				 $("#updContform #invcNo").val(str.responseData.invcNo);
				 $("#auditComment").val(str.responseData.auditComment);
				 if(str.responseData.status==10){
					    $("#updCont").css("display","")
						$("#subCont").css("display","")
						$("#conment").css("display","none")
						$("#comCont").css("display","none")
						$("#backCont").css("display","")
						$("#stopCont").css("display","none")
						$("#updContform").find("input,select,textarea").removeAttr("disabled");
						$("#auditCommentForm").find("textarea").removeAttr("disabled")
					}else if(str.responseData.status==30){
						$("#updCont").css("display","none")
						$("#subCont").css("display","none")
						$("#conment").css("display","")
						$("#comCont").css("display","")
						$("#backCont").css("display","none")
						$("#stopCont").css("display","")
						$("#auditCommentForm").find("textarea").removeAttr("disabled")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
					}else if(str.responseData.status==20){
						$("#updCont").css("display","none")
						$("#subCont").css("display","none")
						$("#conment").css("display","none")
						$("#comCont").css("display","none")
						$("#backCont").css("display","none")
						$("#stopCont").css("display","none")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
						$("#auditCommentForm").find("textarea").attr("disabled","disabled")
					}
					else if(str.responseData.status==50||str.responseData.status==40){
						$("#updCont").css("display","none")
						$("#subCont").css("display","none")
						$("#conment").css("display","")
						$("#comCont").css("display","none")
						$("#backCont").css("display","none")
						$("#stopCont").css("display","none")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
						$("#auditCommentForm").find("textarea").attr("disabled","disabled")
					}
			}
		})

	});
	
	
//	-------------------------------------------------------------------------- 修改提交发票信息----------------------------------------------------------------------
	checkForm('updContform');
	$('#updCont').click(function(){
		if(checkForm2('updContform')) {
			$.ajax({
				url:'/'+app+'/crm/ivc/upd',
				data:{
				 "id"            :$("#updContform #invcName").attr("ivcid"),
				 "invcName"      :$("#updContform #invcName").val(),      //发票名称
				 "invcType"      :$("#updContform #invcType").val(), 
			     "invcTitle"     :$("#updContform #invcTitle").val(),
				 "invcCode"      :$("#updContform #invcCode").val(),
				 "invcAmount"    :$("#updContform #invcAmount").val(),
				 "invcDrawer"    :$("#updContform #invcDrawer").val(),
				 "invcDate"      :$("#updContform #invcDate").val(),  
				 "remark"        :$("#updContform #remark").val(), 
				 "invcNo"        :$("#updContform #invcNo").val(),  
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						var id=str.responseData.id;
			            $('#'+id).html('<td>'+noData(setDate(str.responseData.invcDate))+'</td>\
	                            <td class="text-right">'+noData($("#updContform #invcAmount").val())+'</td>\
	                            <td>'+noData(str.responseData.invcTitle)+'</td>\
	                            <td>'+noData(str.responseData.cntrName)+'</td>\
	                            <td>'+noData(ivcType(str.responseData.invcType))+'</td>\
	                            <td>'+noData(ivoStatus(str.responseData.status))+'</td>\
	                             <td class="text-right">'+noData(str.responseData.cntrAmount)+'</td>\
	                             <td>'+noData(str.responseData.remark)+'</td>\
	                              <td >\
	                              <a title="编辑" class="updContBox updBtn" href="#updContBox" data-toggle="modal"><div  ><i class="icon-pencil" ></i></div></a>\
	                            </td>\
	                            <td>\
	                            <a title="回款" href="contract_repay.html?custID='+custID+'&cntrID='+cntrId+'&invoiceid='+str.responseData.id+'">回款</a>\
	                          </td>')
	                          makeSure("makeSureBox","发票修改成功!");
					}
				}
			})
		}
	});
	
	//-------------------------------------------------------------------------- 提交----------------------------------------------------					
	$("#updContBox").delegate("#subCont","click",function(){
		
		$.ajax({
			url:'/'+app+'/crm/ivc/sub',
			data:{
			 "id"             :$("#updContform #invcName").attr("ivcid"),
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #invcName").attr("ivcid");
					$("#"+id).children().eq(5).html("提交")
					$("#updCont").css("display","none")
					$("#subCont").css("display","none")
					$("#conment").css("display","")
					$("#comCont").css("display","")
					$("#backCont").css("display","none")
					$("#stopCont").css("display","")
					$("#auditCommentForm").find("textarea").removeAttr("disabled")
					$("#updContform").find("input,select,textarea").attr("disabled","disabled")
				}
			}
		})
	})

	
	
//-------------------------------------------------------------------------- 放弃----------------------------------------------------					
	$("#updContBox").delegate("#backCont","click",function(){
		$.ajax({
			url:'/'+app+'/crm/ivc/ccl',
			data:{
			 "id"             :$("#updContform #invcName").attr("ivcid"),
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #invcName").attr("ivcid");
					$("#"+id).children().eq(5).html("放弃")
					$("#updCont").css("display","none")
					$("#subCont").css("display","none")
					$("#conment").css("display","none")
					$("#comCont").css("display","none")
					$("#backCont").css("display","none")
					$("#finCont").css("display","none")
					$("#stopCont").css("display","none")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
						$("#auditCommentForm").find("textarea").attr("disabled","disabled")
				}
			}
		})
	})			
	//-------------------------------------------------------------------------- 审核----------------------------------------------------					
	$("#updContBox").delegate("#comCont","click",function(){
		if($("#auditComment").val()!="") {
			$("#auditCommentForm .text-error").html("")
		$.ajax({
			url:'/'+app+'/crm/ivc/fns',
			data:{
			 "id"             :$("#updContform #invcName").attr("ivcid"),
			 "auditComment"   :$("#auditComment").val()
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #invcName").attr("ivcid");
					$("#"+id).children().eq(5).html("审核")
					$("#updCont").css("display","none")
					$("#subCont").css("display","none")
					$("#conment").css("display","")
					$("#comCont").css("display","none")
					$("#backCont").css("display","none")
					$("#stopCont").css("display","none")
					$("#updContform").find("input,select,textarea").attr("disabled","disabled")
					$("#auditCommentForm").find("textarea").attr("disabled","disabled")
				}
			}
		})
		}else{
			
			$("#auditCommentForm .text-error").html("必填项！")
			return false;
		}
	})
						
	
						
	//-------------------------------------------------------------------------- 作废----------------------------------------------------					
	$("#updContBox").delegate("#stopCont","click",function(){
		$.ajax({
			url:'/'+app+'/crm/ivc/vld',
			data:{
			 "id"             :$("#updContform #invcName").attr("ivcid"),
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #invcName").attr("ivcid");
					$("#"+id).children().eq(5).html("作废")
					$("#updCont").css("display","none")
					$("#subCont").css("display","none")
					$("#conment").css("display","")
					$("#comCont").css("display","none")
					$("#backCont").css("display","none")
					$("#stopCont").css("display","none")
					$("#updContform").find("input,select,textarea").attr("disabled","disabled")
					$("#auditCommentForm").find("textarea").attr("disabled","disabled")
				}
			}
		})
	})
	
})