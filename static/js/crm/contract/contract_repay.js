
$(function(){
	//按钮
	$("#subCont").css("display","none")
	$("#conment").css("display","none")
	$("#comCont").css("display","none")
	$("#backCont").css("display","none")
	
	
	$('#myTab a:eq(6)').tab('show');
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	var custID = GetQueryParam("custID");
	var cntrId = GetQueryParam("cntrID");
	var invoiceid = GetQueryParam("invoiceid");
	var repId = GetQueryParam("repID");
	
	$('#chance').attr('href','../chance/cust_chance.html?custID='+custID);
	$('#vst').attr('href','../visits/cust_vst.html?custID='+custID);
	$('#cst').attr('href','../cust/cust_detail.html?custID='+custID);
	$('#ctm').attr('href','../cust/ctm_detail.html?custID='+custID);
	$('#ctrn').attr('href','../contract/cust_contract.html?custID='+custID);
	$('#inv').attr('href','../contract/contract_invoice.html?custID='+custID+'&cntrID='+cntrId);
	$('#rep').attr('href','../contract/contract_repay.html?custID='+custID+'&cntrID='+cntrId);
	$('#exp').attr('href','../contract/contract_expend.html?custID='+custID+'&cntrID='+cntrId);
//	-------------------------------------------------------------------------- 获取回款列表----------------------------------------------------------------------

	var pageNo=1;
	getnList( );
	function getnList( ){
		$.ajax({
			url:'/'+app+'/crm/rpn/qry',
			data:{
				"sc_custType":'',
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo,
				  "sc_cntrId":cntrId,
				  "sc_invoiceId":invoiceid
			},
			type:'POST',
			success:function(str){
				if(str.resv2str!=20){
					$("#addNewbtn").css("display","none")
				}else{
					$("#addNewbtn").css("display","")
				}
				$("#addNewbtn").attr("resv2str",str.resv2str)
				console.log(str);
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
							string += '  <tr invoiceid='+str.responseData[i].invoiceId+' id='+ str.responseData[i].id +'>\
	                            <td  style="width:150px">'+noData(setDate(str.responseData[i].rpayDate))+'</td>\
	                            <td class="text-right" style="width:180px">'+noData(str.responseData[i].rpayAmount)+'</td>\
	                            <td>'+noData(repType(str.responseData[i].rpayMethod))+'</td>\
	                            <td>'+noData(str.responseData[i].ivcName)+'</td>\
	                             <td>'+noData(repStatus(str.responseData[i].status))+'</td>\
	                              <td>\
	                              <a title="编辑" class="updContBox" href="'+nstatus+'" data-toggle="modal"><i class="icon-pencil"></i></a>\
	                            </td>\
	                        </tr> ';					 
						
					
					}	
					
						
						
						
					}else{
						string+='<tr><td colspan="6" style="text-align:center">无数据</td></tr>'
					}
					$('#contList').html(string);
					$('#'+invoiceid).css('background','rgb(232, 242, 254)')
					if(str.resv1lng==0){
						$("#nowPage").html(0)	
					}else{
						$("#nowPage").html(pageNo)	
					}
					$('#totalPage').html(str.resv1lng);
				}else{
					console.log("获取失败")
				}
				$('#'+repId).css('background','rgb(232, 242, 254)');
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
	
		
	
	
//	-------------------------------------------------------------------------- 新增回款 ----------------------------------------------------------------------
	
	checkForm("addContform");
	$('#saveCont').click(function(){
		if(checkForm2('addContform')) {
			$.ajax({
				url:'/'+app+'/crm/rpn/add',
				data:{
				 "custId":custID,
				 "cntrId":cntrId,
				 "invoiceId":invoiceid,
				 "rpayAmount"     :$("#addContform #rpayAmount").val(),      //合同名称
				 "rpayMethod"     :$("#addContform #rpayMethod").val(), 
			     "rpayDate"       :$("#addContform #rpayDate").val(),
				 "rpayMsg"        :$("#addContform #rpayMsg").val(),
				 "resv2str"      :$("#addNewbtn").attr("resv2str")
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						if($('#contList tr td').html()=="无数据"){
							$('#contList').html("")
						}
						var s=$('#contList').html();
						s += '   <tr invoiceid='+invoiceid+' id='+ str.responseData +'>\
                        <td>'+noData($("#addContform #rpayDate").val())+'</td>\
                        <td class="text-right" style="width:180px">'+noData($("#addContform #rpayAmount").val())+'</td>\
                        <td>'+noData(repType($("#addContform #rpayMethod").val()))+'</td>\
                        <td>'+noData()+'</td>\
                         <td>'+noData("草稿")+'</td>\
                          <td>\
                          <a title="编辑" class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
                        </td>\
                    </tr> ';					 
								$('#contList').html(s);
								
						$("#addContBox, .modal-backdrop").hide();
						$('#addContBox input,  #addContBox select').val('');
						$("#contList tr").css('background','');
						var id=str.responseData ;
						$('#'+id).css('background','rgb(232, 242, 254)');
						$(".text-error").html("")
						makeSure("makeSureBox","回款添加成功!");
					}
				}
			})
		}
	});
	
	

	
//-------------------------------------------------------------------------- 修改获取合同信息 ---------------------------------------------------------------------
	
	
	$(document).delegate('.updContBox','click',function(){
		
		var id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/'+app+'/crm/rpn/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				
				 $("#updContform #rpayAmount").val(str.responseData.rpayAmount);      //合同名称
				 $("#updContform #rpayAmount").attr("repid",str.responseData.id);
				 $("#updContform #rpayAmount").attr("invoiceid",str.responseData.invoiceId);
				 $("#updContform #rpayAmount").attr("cntrid",str.responseData.cntrId);
				 $("#updContform #rpayAmount").attr("custid",str.responseData.custId);
				 $("#updContform #rpayMethod").val(str.responseData.rpayMethod);  
			     $("#updContform #rpayDate").val(setDate(str.responseData.rpayDate)); 
				 $("#updContform #rpayMsg").val(str.responseData.rpayMsg); 
				 $(" #auditComment").val(str.responseData.auditComment);
				 if(str.responseData.status==10){
					    $("#updCont").css("display","")
						$("#subCont").css("display","")
						$("#conment").css("display","none")
						$("#comCont").css("display","none")
						$("#backCont").css("display","none")
						$("#updContform").find("input,select,textarea").removeAttr("disabled");
						$("#auditCommentForm").find("textarea").removeAttr("disabled")
					}else if(str.responseData.status==20){
						$("#updCont").css("display","none")
						$("#subCont").css("display","none")
						$("#conment").css("display","")
						$("#comCont").css("display","")
						$("#backCont").css("display","")
						$("#auditCommentForm").find("textarea").removeAttr("disabled")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
					}else if(str.responseData.status==30){
						$("#updCont").css("display","none")
						$("#subCont").css("display","none")
						$("#conment").css("display","")
						$("#comCont").css("display","none")
						$("#backCont").css("display","none")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
						$("#auditCommentForm").find("textarea").attr("disabled","disabled")
					
					}
			}
		})

	});
	
	
//	-------------------------------------------------------------------------- 修改提交合同信息----------------------------------------------------------------------
	
	checkForm("updContform");
	$('#updCont').click(function(){
		if(checkForm2('updContform')) {
			$.ajax({
				url:'/'+app+'/crm/rpn/upd',
				data:{
					 "rpayAmount"     :$("#updContform #rpayAmount").val(),      //合同名称
					 "rpayMethod"     :$("#updContform #rpayMethod").val(), 
				     "rpayDate"       :$("#updContform #rpayDate").val(),
					 "rpayMsg"        :$("#updContform #rpayMsg").val(),
				     "id"             :$("#updContform #rpayAmount").attr("repid"),
				     "invoiceId"      :$("#updContform #rpayAmount").attr("invoiceid"),
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						var id=str.responseData.id;
			            $('#'+id).html('<td>'+noData(setDate(str.responseData.rpayDate))+'</td>\
	                            <td class="text-right" style="width:180px">'+noData($("#updContform #rpayAmount").val())+'</td>\
	                            <td>'+noData(repType(str.responseData.rpayMethod))+'</td>\
	                            <td>'+noData(str.responseData.ivcName)+'</td>\
	                             <td>'+noData(repStatus(str.responseData.status))+'</td>\
	                              <td>\
	                              <a title="编辑" class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
	                            </td>')
	                            makeSure("makeSureBox","回款修改成功!");
					}
				}
			})
		}
	});
	
	//-------------------------------------------------------------------------- 提交----------------------------------------------------					
	$("#updContBox").delegate("#subCont","click",function(){
		$.ajax({
			url:'/'+app+'/crm/rpn/sub',
			data:{
			 "id"             :$("#updContform #rpayAmount").attr("repid"),
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #rpayAmount").attr("repid");
					$("#"+id).children().eq(4).html("提交")
					$('#updCont').css("display","none")
					$("#subCont").css("display","none")
					$("#conment").css("display","")
					$("#comCont").css("display","")
					$("#backCont").css("display","");
					$("#auditCommentForm").find("textarea").removeAttr("disabled")
					$("#updContform").find("input,select,textarea").attr("disabled","disabled")
				}
			}
		})
	})

	
	
//-------------------------------------------------------------------------- 发回----------------------------------------------------					
	
	$("#updContBox").delegate("#backCont","click",function(){
		$.ajax({
			url:'/'+app+'/crm/rpn/bck',
			data:{
			 "id"             :$("#updContform #rpayAmount").attr("repid"),
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #rpayAmount").attr("repid");
					$("#"+id).children().eq(4).html("发回")
					$("#auditComment").val("")
					$('#updCont').css("display","")
					$("#subCont").css("display","")
					$("#conment").css("display","none")
					$("#comCont").css("display","none")
					$("#backCont").css("display","none")
					$("#updContform").find("input,select,textarea").removeAttr("disabled");
						$("#auditCommentForm").find("textarea").removeAttr("disabled")
				}
			}
		})
	})			
	//-------------------------------------------------------------------------- 审核----------------------------------------------------					
	
	$("#updContBox").delegate("#comCont","click",function(){
		if($("#auditComment").val()!="") {
			$("#auditCommentForm .text-error").html("")
		$.ajax({
			url:'/'+app+'/crm/rpn/cfm',
			data:{
			 "id"             :$("#updContform #rpayAmount").attr("repid"),
			 "auditComment"   :$("#auditComment").val()
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #rpayAmount").attr("repid");
					$("#"+id).children().eq(4).html("审核")
					$("#subCont").css("display","none")
					$('#updCont').css("display","none")
					$("#conment").css("display","")
					$("#comCont").css("display","none")
					$("#backCont").css("display","none")
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
						
	
						
		
	
})