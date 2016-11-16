
$(function(){
	//按钮
	$("#subCont").css("display","none")
	$("#conment").css("display","none")
	$("#comCont").css("display","none")
	$("#backCont").css("display","none")
	
	
	 function chanceList(){
		$.ajax({
	        url: '/' + app + '/crm/slc/qry',
	        type: 'POST',
	        data:{
	        	"sc_chncCust":custID,
	        	"DT_SCOPE":1
			},
	        success: function (str) {
	        	console.log(str)
	        	 if (str.responseCode == 0) {
	                 var string = '';
	                 for (var i = 0; i < str.responseData.length; i++) {
	                     string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].chncName + '</option> ';
	                 }
	                 $('#updContform #custVisitId').append(string);
	                 $('#addContform #custVisitId').append(string);
	             }
	        }
	   });
	}
	
	$('#myTab a:eq(7)').tab('show');
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	var custID = GetQueryParam("custID");
	var cntrId = GetQueryParam("cntrID");
    var expId  = GetQueryParam("expID");
    
    
    
	$('#chance').attr('href','../chance/cust_chance.html?custID='+custID);
	$('#vst').attr('href','../visits/cust_vst.html?custID='+custID);
	$('#cst').attr('href','../cust/cust_detail.html?custID='+custID);
	$('#ctm').attr('href','../cust/ctm_detail.html?custID='+custID);
	$('#ctrn').attr('href','../contract/cust_contract.html?custID='+custID);
	$('#inv').attr('href','../contract/contract_invoice.html?custID='+custID+'&cntrID='+cntrId);
	$('#rep').attr('href','../contract/contract_repay.html?custID='+custID+'&cntrID='+cntrId);
	$('#exp').attr('href','../contract/contract_expend.html?custID='+custID+'&cntrID='+cntrId);
	
//	-------------------------------------------------------------------------- 获取费用列表----------------------------------------------------------------------

	var pageNo=1;
	getnList( );
	function getnList( ){
		$.ajax({
			url:'/'+app+'/crm/exp/qry',
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
	                            <td style="width:150px">'+noData(setDate(str.responseData[i].costDate))+'</td>\
	                            <td class="text-right">'+noData(fmoney(str.responseData[i].costs))+'</td>\
	                            <td >'+noData(igeo.cityname(str.responseData[i].costGeo))+' </td>\
	                            <td>'+noData(expType(str.responseData[i].costType))+'</td>\
	                            <td>'+noData(repStatus(str.responseData[i].status))+'</td>\
	                              <td>\
	                              <a title="编辑"  class="updContBox" href="'+nstatus+'" data-toggle="modal"><i class="icon-pencil"></i></a>\
	                            </td>\
	                        </tr> ';					 
						
					
					}		
						
						
					}else{
						string+='<tr><td colspan="8" style="text-align:center">无数据</td></tr>'
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
			
				$('#'+expId).css('background','rgb(232, 242, 254)');
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
	
		
	
	
//	-------------------------------------------------------------------------- 新增 费用----------------------------------------------------------------------
	checkForm("addContform");
	$('#saveCont').click(function(){
		if(checkForm2("addContform")){
			$.ajax({
				url:'/'+app+'/crm/exp/add',
				data:{
				 "cntrId":cntrId,
				 "costs"          :$("#addContform #costs").val(),      //费用
				 "costType"       :$("#addContform #costType").val(), 
				 "costDate"       :$("#addContform #costDate").val(),
				 "costMsg"        :$("#addContform #costMsg").val(),
				 "costGeo"        :igeo.geo(),
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
						s += '   <tr id='+ str.responseData +'>\
                        <td style="width:150px">'+noData($("#addContform #costDate").val())+'</td>\
                        <td  class="text-right">'+noData(fmoney($("#addContform #costs").val()))+'</td>\
                        <td >'+noData(igeo.cityname(igeo.geo()))+' </td>\
                        <td>'+noData(expType($("#addContform #costType").val()))+'</td>\
                        <td>'+noData("草稿")+'</td>\
                          <td>\
                          <a title="编辑"  class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
                        </td>\
                    </tr> ';					 
								$('#contList').html(s);
						$("#addContBox, .modal-backdrop").hide();
						$('#addContBox input,  #addContBox select').val('');
						$("#contList tr").css('background','');
						var id=str.responseData ;
						$('#'+id).css('background','rgb(232, 242, 254)');
						$(".text-error").html("")
						makeSure("makeSureBox","费用添加成功!");
					}
				}
			})
		}
			
	});
	
	

	
//-------------------------------------------------------------------------- 修改获取合同信息 ---------------------------------------------------------------------
	
	
	$(document).delegate('.updContBox','click',function(){
		
		var id=$(this).parent().parent().attr('id');
		
		$.ajax({
			url:'/'+app+'/crm/exp/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				
				 $("#updContform #costs").val(str.responseData.costs);      //合同名称
				 $("#updContform #costs").attr("expid",str.responseData.id);
				 $("#updContform #costs").attr("cntrid",str.responseData.cntrId);
				 $("#updContform #costType").val(str.responseData.costType);  
				 $("#updContform #costDate").val(setDate(str.responseData.costDate));  
				 $("#updContform #costMsg").val(str.responseData.costMsg); 
				 $("#auditComment").val(str.responseData.auditComment);
				 geoNum = str.responseData.costGeo;
				 igeo = new Geo(document.getElementById("province2") ,document.getElementById("city2") ,document.getElementById("county2") ,geoNum);
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
				url:'/'+app+'/crm/exp/upd',
				data:{
				 "id"             :$("#updContform #costs").attr("expid"),
				 "costs"          :$("#updContform #costs").val(),      //合同名称
				 "costType"       :$("#updContform #costType").val(), 
				 "costDate"       :$("#updContform #costDate").val(),  
				 "costMsg"        :$("#updContform #costMsg").val(), 
				 "costGeo"        :igeo.geo(),
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						var id=str.responseData.id;
			            $('#'+id).html('<td style="width:150px">'+noData(setDate(str.responseData.costDate))+'</td>\
		                         <td  class="text-right">'+noData(fmoney($("#updContform #costs").val()))+'</td>\
		                         <td >'+noData(igeo.cityname(str.responseData.costGeo))+' </td>\
		                         <td>'+noData(expType(str.responseData.costType))+'</td>\
		                         <td>'+noData(repStatus(str.responseData.status))+'</td>\
		                         <td>\
                                 <a title="编辑"  class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
		                         </td>')
		                         makeSure("makeSureBox","费用修改成功!");
					}
					
				}
			})
		}
	});
	
	
	//-------------------------------------------------------------------------- 提交----------------------------------------------------					
	$("#updContBox").delegate("#subCont","click",function(){
		$.ajax({
			url:'/'+app+'/crm/exp/sub',
			data:{
			 "id"             :$("#updContform #costs").attr("expid"),
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #costs").attr("expid");
					$("#"+id).children().eq(5).html("提交")
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
			url:'/'+app+'/crm/exp/bck',
			data:{
			 "id"             :$("#updContform #costs").attr("expid"),
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #costs").attr("expid");
					$("#"+id).children().eq(5).html("发回")
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
			url:'/'+app+'/crm/exp/cfm',
			data:{
			 "id"             :$("#updContform #costs").attr("expid"),
			 "auditComment"   :$("#auditComment").val()
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					var id=$("#updContform #costs").attr("expid");
					$("#"+id).children().eq(5).html("审核")
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