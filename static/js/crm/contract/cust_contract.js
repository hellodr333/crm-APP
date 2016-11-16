
$(function(){
	
	//按钮
	$("#subCont").css("display","none")
	$("#conment").css("display","none")
	$("#comCont").css("display","none")
	$("#backCont").css("display","none")
	$("#finCont").css("display","none")
	$("#stopCont").css("display","none")
	
	$('#myTab a:eq(4)').tab('show');
	$('#inv').css("display","none")
	$('#rep').css("display","none")
	$('#exp').css("display","none")
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	var custID = GetQueryParam("custID");
	var cntrId = GetQueryParam("cntrID");
	var chanceID=GetQueryParam("chanceId");
	
	
	$('#cst').attr('href','../cust/cust_detail.html?custID='+custID);
	$('#ctm').attr('href','../cust/ctm_detail.html?custID='+custID);
	$('#ctrn').attr('href','../contract/cust_contract.html?custID='+custID);
	$('#chance').attr('href','../chance/cust_chance.html?custID='+custID);
	$('#vst').attr('href','../visits/cust_vst.html?custID='+custID);
	
	$("#addnCntr").click(function(){
		$("#detailList").html("");
		$("#paymentList").html("");
		
	})
	
	
//	-------------------------------------------------------------------------- 获取合同列表----------------------------------------------------------------------

	var pageNo=1;
	getnList( );
	function getnList( ){
		$.ajax({
			url:'/'+app+'/crm/cnt/qry',
			data:{
				"sc_custType":'',
				 "PAGE_SIZE":"10",
				  "PAGE_NO":pageNo,
				  "sc_cntrCust":custID,
				  "sc_cntrChance":chanceID
				  
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
					$("#addnCntr").css({"display":"block"})
					if(chanceID!=null && str.responseData.length!=0) {
						$("#addnCntr").css({"display":"none"})
					}else{
						$("#addnCntr").css({"display":""})
					}
					var string='';
					if(str.responseData.length>0){
						for(var i=0;i<str.responseData.length;i++){		
							string += '  <tr id='+ str.responseData[i].id +'>\
	                            <td>'+noData(setDate(str.responseData[i].signDate))+'</td>\
	                            <td >'+noData(igeo.cityname(str.responseData[i].signGeo))+' </td>\
	                            <td>'+noData(str.responseData[i].cntrName)+'</td>\
	                            <td class="text-right">'+noData(fmoney(str.responseData[i].tamount))+'</td>\
	                            <td>'+noData(str.responseData[i].signer)+'</td>\
	                            <td>'+noData(str.responseData[i].signerCust)+'</td>\
	                            <td>'+noData(contType(str.responseData[i].cntrType))+'</td>\
	                             <td>'+noData(cntrStatus(str.responseData[i].status))+'</td>\
	                             <td>'+noData(str.responseData[i].cntrNo)+'</td>\
	                              <td>\
	                              <a title="编辑" class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
	                            </td>\
	                        </tr> ';					 
					}	
						
					
					}else{
						string+='<tr><td colspan="10" style="text-align:center">无数据</td></tr>'
					}
					if(str.resv1lng==0){
						$("#nowPage").html(1)	
					}else{
						$("#nowPage").html(pageNo)	
					}
					$('#totalPage').html(str.resv1lng==0?1:str.resv1lng);
					$('#contList').html(string);
				}else{
					console.log("获取失败")
				}
				
				$('#'+cntrId).css('background','rgb(232, 242, 254)');
				
			}					
		});
	
	}
	
	$(document).delegate("#contList tr",'click',function(){
		$('#inv').css("display","none")
		$('#rep').css("display","none")
		$('#exp').css("display","none")
	
	$("#contList tr").css("background","")
    $(this).css("background","rgb(232, 242, 254)")
		 if($(this).children().eq(7).html()=="生效" || $(this).children().eq(7).html()=="完成" || $(this).children().eq(7).html()=="终止"){
				$('#inv').css("display","")
				$('#rep').css("display","")
				$('#exp').css("display","")
			    $('#inv').attr('href','../contract/contract_invoice.html?custID='+custID+'&cntrID='+$(this).attr("id"));
			    $('#rep').attr('href','../contract/contract_repay.html?custID='+custID+'&cntrID='+$(this).attr("id"));
			    $('#exp').attr('href','../contract/contract_expend.html?custID='+custID+'&cntrID='+$(this).attr("id"));
			    
			}
				
		})
	
	$("#firstPage").click(function(){
		pageNo=1;
		getnList( );
		})
	$("#prevPage").click(function(){
		pageNo--;
		if(pageNo<1){
			pageNo=1;
			makeSure("makeSureBox","已经是第一页了~");
			return false;
			}else{
				getnList( );
			}
		})
	
	$("#nextPage").click(function(){
		pageNo++;
		if(pageNo>$("#totalPage").html()){
			pageNo=$("#totalPage").html();
			makeSure("makeSureBox","已经是最后一页了~");
			return false;
			}else{
				getnList( );
				}
		})
	$("#lastPage").click(function(){
		pageNo=$("#totalPage").html();
		getnList( );
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
	
		
//	-------------------------------------------------------------------------- 新增明细 ----------------------------------------------------------------------
	var anum=0;
	$("#addContBox .adddetail").click(function(){
		anum++;
		var dethtml="";
		dethtml+='<tr class="detaillist" id="c'+anum+'">\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="date" class="itemThru" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><select style="width:180px" type="text" class="prodId"  requir="true" check="U_2NAME_P"><option value="">- 请选择 -</option></select><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="text" class="prodPrice"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="text" class="prodQty"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="text" class="prodAmount count" readonly="readonly"  check="U_2NAME_P"><i class="text-error"></i></td>\
			<td><input type="button" value="删除" class="deldetail"></td>\
       </tr>'
			$("#addContBox #detailList").append(dethtml)
			
			$("#detailList .deldetail").on("click",function(){
			   $(this).parent().parent().remove();
            })
            for(var i=0; i<$(".detaillist").length; i++){
				 
				 checkForm($(".detaillist").eq(i).attr("id"))
			 }
          addtail();
		  
		//产品	
		
			 $.ajax({
			        url: '/' + app + '/crm/prd/qry',
			        type: 'POST',
			        success: function (str) {
			        	var string = '';
			           console.log(str)
			            if (str.responseCode == 0) {
			                for (var i = 0; i < str.responseData.length; i++) {
			                    string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].prodName + '</option> ';
			                }
			                for(var j=0;j<$('.prodId').length;j++){
			                	if($(".prodId")[j].options.length==1){
			                		$(".prodId").eq(j).append(string);
				                }
			                }
			                
			            }
			        }
			    });
		
	});
	 
	function addtail(){
		$("input[class=prodPrice]").each(function(index){
        	$("input[class=prodPrice]").eq(index).keyup(function(){
             	 var t=$(this).val();
             	 if($("input[class=prodQty]").eq(index).val()==''){
             		 $("input[class=prodQty]").eq(index).val('1')
             	 }
             	 if($(this).val()==''){
             		 $(this).val('0')
             	 }
             	var price=parseFloat(t)
             	var count=parseInt($('.prodQty').eq(index).val())
             	var total=parseFloat(price*count)
             	$('.prodAmount').eq(index).val(total);
       	 })
        });
         $("input[class=prodQty]").each(function(index){
        $("input[class=prodQty]").eq(index).keyup(function(){
       	 var t=$(this).val();
       	 if($(this).val()==''){
       		 $(this).val('0')
       	 }
       	 if($("input[class=prodPrice]").eq(index).val()==''){
       		 $("input[class=prodPrice]").eq(index).val('0')
       	 }
       	 
       	var price=parseFloat($('.prodPrice').eq(index).val())
       	var count=parseInt(t)
       	var total=parseFloat(price*count)
       	$('.prodAmount').eq(index).val(total)
         })
        });
	}
	function iaddtail(){
		$("input[class=iprodPrice]").each(function(index){
        	$("input[class=iprodPrice]").eq(index).keyup(function(){
             	 var t=$(this).val();
             	 if($("input[class=iprodQty]").eq(index).val()==''){
             		 $("input[class=iprodQty]").eq(index).val('1')
             	 }
             	 if($(this).val()==''){
             		 $(this).val('0')
             	 }
             	var price=parseFloat(t)
             	var count=parseInt($('.iprodQty').eq(index).val())
             	var total=parseFloat(price*count)
             	$('.iprodAmount').eq(index).val(total);
       	 })
        });
         $("input[class=iprodQty]").each(function(index){
        $("input[class=iprodQty]").eq(index).keyup(function(){
       	 var t=$(this).val();
       	 if($(this).val()==''){
       		 $(this).val('0')
       	 }
       	 if($("input[class=iprodPrice]").eq(index).val()==''){
       		 $("input[class=iprodPrice]").eq(index).val('0')
       	 }
       	 
       	var price=parseFloat($('.iprodPrice').eq(index).val())
       	var count=parseInt(t)
       	var total=parseFloat(price*count)
       	$('.iprodAmount').eq(index).val(total)
         })
        });
	}
	
    	//$("#detailList .deldetail").on("click",function(){
			//$(this).parent().parent().remove();
       //})
//	-------------------------------------------------------------------------- 新增付款条款 ----------------------------------------------------------------------
	
	var bnum=0;
	$("#addContBox .addpayment").click(function(){
		bnum++;
		var payhtml="";
		payhtml+='<tr class="paymentlist" id="d'+bnum+'">\
			<td style="padding-left:0px;padding-right:0px"><input type="date"  class="rpayDate" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input type="text"  class="rpayAmount rcount"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input type="text" readonly="readonly" class="status"  value="计划回款" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input type="text"  class="remark" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td><input type="button" value="删除" class="delpayment"></td>\
       </tr>'
			$("#addContBox #paymentList").append(payhtml)
			 $("#paymentList .delpayment").on("click",function(){
			     $(this).parent().parent().remove();
		      })
		      
		      for(var i=0; i<$(".paymentlist").length; i++){
					 
					 checkForm($(".paymentlist").eq(i).attr("id"))
				 }
		
	});
	    //$("#paymentList .delpayment").on("click",function(){
		//	$(this).parent().parent().remove();
		//})
	
//	-------------------------------------------------------------------------- 新增合同 ----------------------------------------------------------------------
	var piarr=new Array();
	var diarr=new Array();
	var idata=new Object();
	var mtotal=0;
	checkForm("addContform");
	$('#saveCont').click(function(){
		if(checkForm2("addContform")){
			
		
		if($("#addContBox .detaillist").length==0 || $("#addContBox .paymentlist").length==0){
			makeSure("makeSureBox","请至少添加一条明细和付款条款")
			return false;
		}
		for(var a=0;a<$("#addContform .prodAmount").length;a++){
			mtotal+=parseFloat($("#addContform .prodAmount").eq(a).val())
		}
		piarr=[];
    	diarr=[];
	for(var j=0;j<$("#addContBox .detaillist").length;j++){
			var obj = new Object();
		    obj.itemThru= $("#addContBox .itemThru").eq(j).val();
			obj.prodId= $("#addContBox .prodId").eq(j).val();   
			obj.prodPrice= $("#addContBox .prodPrice").eq(j).val();       	
			obj.prodQty = $("#addContBox .prodQty").eq(j).val();
			obj.prodAmount= $("#addContBox .prodAmount").eq(j).val();
			diarr.push(obj);
	}
	for(var z=0;z<$("#addContBox .paymentlist").length;z++){
		var obj = new Object();
	    obj.rpayDate= $("#addContBox .rpayDate").eq(z).val();
		obj.rpayAmount= $("#addContBox .rpayAmount").eq(z).val();   
		obj.status= $("#addContBox .status").eq(z).val();       	
		obj.remark = $("#addContBox .remark").eq(z).val();
		piarr.push(obj);
   }
	idata.detail=JSON.stringify(diarr);
	idata.payment=JSON.stringify(piarr);
	console.log(idata.detail)
	console.log(idata.payment)
	
			$.ajax({
				url:'/'+app+'/crm/cnt/add',
				data:{
				 "cntrCust"        :custID,//客户id
				 "cntrChance"      :chanceID,
				 "cntrName"       :$("#addContform #cntrName").val(),      //合同名称
				 "cntrNo"         :$("#addContform #cntrNo").val(), 
			     "cntrType"       :$("#addContform #cntrType").val(),
				 "bankAccount"    :$("#addContform #bankAccount").val(),
				 "openBank"       :$("#addContform #openBank").val(),
				 "bankAccountCust":$("#addContform #bankAccountCust").val(),  
				 "openBankCust"   :$("#addContform #openBankCust").val(), 
				 "signDate"       :$("#addContform #signDate").val(),  
				 "signerCust"     :$("#addContform #signerCust").val(), 
				 "cntrFrom"       :$("#addContform #cntrFrom").val(),
				 "cntrThru"       :$("#addContform #cntrThru").val(),
				 "signGeo"        :igeo.geo(),
				 "signAddress"    :$("#addContform #signAddress").val(),
				 "signer"         :$("#addContform #signer").val(),
				 "detail"         :idata.detail,
				 "payment"        :idata.payment
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						$("#addContBox, .modal-backdrop").hide();
						$('#addContBox input,  #addContBox select').val('');
						$("#addContBox #paymentList").html("");
						$("#addContBox #detailList").html("");
						if($('#contList tr td').html()=="无数据"){
							$('#contList').html("")
						}
						var s=$('#contList').html();
						s += ' <tr id='+ str.responseData.id +'>\
                        <td>'+noData(setDate(str.responseData.signDate))+'</td>\
                        <td >'+noData(igeo.cityname(str.responseData.signGeo))+' </td>\
                        <td>'+noData(str.responseData.cntrName)+'</td>\
                        <td  class="text-right">'+noData(str.responseData.tamount)+'</td>\
                        <td>'+noData(str.responseData.signer)+'</td>\
                        <td>'+noData(str.responseData.signerCust)+'</td>\
                        <td>'+noData(contType(str.responseData.cntrType))+'</td>\
                         <td>'+noData(cntrStatus(str.responseData.status))+'</td>\
                         <td>'+noData(str.responseData.cntrNo)+'</td>\
                          <td>\
                          <a title="编辑" class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
                        </td>\
                    </tr>';			
						
							$('#contList').html(s);
						
								
								
								$("#addContBox, .modal-backdrop").hide();
								$('#addContBox input,  #addContBox select').val('');
								
								var id=str.responseData.id ;
								$("#contList tr").css('background','');
								$('#'+id).css('background','rgb(232, 242, 254)');
								
								$(".text-error").html("")
								makeSure("makeSureBox","合同添加成功!");
					}
				}
			})
		}
	});
	
	

	
//-------------------------------------------------------------------------- 修改获取合同信息 ---------------------------------------------------------------------
	
	
	$(document).delegate('.updContBox','click',function(){
		$("#makeSubBox").css({"display":"none"})
		var id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/'+app+'/crm/cnt/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				console.log(str);
				
				 $("#updContform #cntrName").val(str.responseData.contractPo.cntrName);      //合同名称
				 $("#updContform #cntrName").attr("cntrid",str.responseData.contractPo.id);
				 $("#updContform #cntrNo").val(str.responseData.contractPo.cntrNo);  
			     $("#updContform #cntrType").val(str.responseData.contractPo.cntrType); 
				 $("#updContform #tamount").val(str.responseData.contractPo.tamount); 
				 $("#updContform #bankAccount").val(str.responseData.contractPo.bankAccount);
				 $("#updContform #openBank").val(str.responseData.contractPo.openBank);
				 $("#updContform #bankAccountCust").val(str.responseData.contractPo.bankAccountCust);  
				 $("#updContform #openBankCust").val(str.responseData.contractPo.openBankCust); 
				 $("#updContform #signDate").val(setDate(str.responseData.contractPo.signDate));  
				 $("#updContform #signerCust").val(str.responseData.contractPo.signerCust); 
				 $("#updContform #cntrFrom").val(setDate(str.responseData.contractPo.cntrFrom));
				 $("#updContform #cntrThru").val(setDate(str.responseData.contractPo.cntrThru));
				 geoNum = str.responseData.contractPo.signGeo;
				 igeo = new Geo(document.getElementById("province2") ,document.getElementById("city2") ,document.getElementById("county2") ,geoNum);
				 $("#updContform #signAddress").val(str.responseData.contractPo.signAddress);
				 $("#updContform #signer").val(str.responseData.contractPo.signer);
				 $("#auditComment").val(str.responseData.contractPo.auditComment)
				 
				 $.ajax({
				        url: '/' + app + '/crm/prd/qry',
				        type: 'POST',
				        success: function (str) {
				        	var string = '';
				           console.log(str)
				            if (str.responseCode == 0) {
				                for (var i = 0; i < str.responseData.length; i++) {
				                    string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].prodName + '</option> ';
				                }
				                $(".prodId").append(string);
				            }
				        }
				    });
				 
				 var dethtml="";
				 for(var i=0;i<str.responseData.items.length;i++){
						dethtml+='<tr class="detaillist" id="'+str.responseData.items[i].id+'">\
							<td style="padding-left:0px;padding-right:0px"><input value="'+setDate(str.responseData.items[i].itemThru)+'" style="width:180px" type="date" class="itemThru span1" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><select value="'+str.responseData.items[i].prodId+'" style="width:180px" type="text" class="prodId span1"  requir="true" check="U_2NAME_P"><option value="'+str.responseData.items[i].prodId+'">'+str.responseData.items[i].prodName+'</option></select><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input value="'+str.responseData.items[i].prodPrice+'" style="width:180px" type="text" class="prodPrice"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input value="'+str.responseData.items[i].prodQty+'" style="width:180px" type="text" class="prodQty"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input value="'+str.responseData.items[i].prodAmount+'" style="width:180px" type="text" class="prodAmount count span1" readonly="readonly"  check="U_2NAME_P"><i class="text-error"></i></td>\
							<td><input type="button" value="删除" class="ideldetail"></td>\
							<td><input type="button" value="修改" class="iupddetail"></td>\
							</tr>'
				 }
				 $("#updContBox #detailList").html(dethtml);
				 	
				 for(var i=0; i<$(".detaillist").length; i++){
					 
					 checkForm($(".detaillist").eq(i).attr("id"))
				 }
				 
				 addtail();
				 var payhtml="";
				 for(var i=0;i<str.responseData.repamentPlans.length;i++){
						payhtml+='<tr class="paymentlist" id="'+str.responseData.repamentPlans[i].id+'">\
							<td style="padding-left:0px;padding-right:0px"><input value="'+setDate(str.responseData.repamentPlans[i].rpayDate)+'" type="date"  class="rpayDate" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input value="'+str.responseData.repamentPlans[i].rpayAmount+'"  type="text"  class="rpayAmount rcount"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input value="'+payStatus(str.responseData.repamentPlans[i].status)+'" type="text" readonly="readonly" class="status" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td style="padding-left:0px;padding-right:0px"><input value="'+noDatan(str.responseData.repamentPlans[i].remark)+'" type="text"  class="remark" check="U_2NAME_P"><i class="text-error"></i></td>\
							<td><input type="button" value="删除" class="idelpayment"></td>\
							<td><input type="button" value="修改" class="iupdpayment"></td>\
							</tr>'
				 }
				 $("#updContBox #paymentList").html(payhtml)
				 
                 for(var i=0; i<$(".paymentlist").length; i++){
					 
					 checkForm($(".paymentlist").eq(i).attr("id"))
				 }
				 if(str.responseData.contractPo.status==10){
						$("#subCont").css("display","")
						$("#conment").css("display","none")
						$("#comCont").css("display","none")
						$("#backCont").css("display","none")
						$("#finCont").css("display","none")
						$("#stopCont").css("display","none")
						$(".cz").css("display","")
						$(".xg").css("display","")
						$("#updContform #updCont").css("display","")
						$("#updContform .adddetail").css("display","")
						$("#updContform .addpayment").css("display","")
						$("#updContform .ideldetail").css("display","")
						$("#updContform .iupddetail").css("display","")
						$("#updContform .idelpayment").css("display","")
						$("#updContform .iupdpayment").css("display","")
						$("#updContform").find("input,select,textarea").removeAttr("disabled");
						$("#auditCommentForm").find("textarea").removeAttr("disabled")
					}else if(str.responseData.contractPo.status==13){
						$("#subCont").css("display","none")
						$("#conment").css("display","")
						$("#comCont").css("display","")
						$("#backCont").css("display","")
						$("#finCont").css("display","none")
						$("#stopCont").css("display","none")
						$("#updContform #updCont").css("display","none")
						$("#updContform .adddetail").css("display","none")
						$("#updContform .addpayment").css("display","none")
						$("#updContform .ideldetail").css("display","none")
						$("#updContform .iupddetail").css("display","none")
						$("#updContform .idelpayment").css("display","none")
						$("#updContform .iupdpayment").css("display","none")
						$(".cz").css("display","none")
						$(".xg").css("display","none")
						$("#auditCommentForm").find("textarea").removeAttr("disabled")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
					}else if(str.responseData.contractPo.status==20){
						$("#subCont").css("display","none")
						$("#conment").css("display","")
						$("#comCont").css("display","none")
						$("#backCont").css("display","none")
						$("#finCont").css("display","")
						$("#stopCont").css("display","")
						$("#updContform #updCont").css("display","none")
						$("#updContform .adddetail").css("display","none")
						$("#updContform .addpayment").css("display","none")
						$("#updContform .ideldetail").css("display","none")
						$("#updContform .iupddetail").css("display","none")
						$("#updContform .idelpayment").css("display","none")
						$("#updContform .iupdpayment").css("display","none")
						$(".cz").css("display","none")
						$(".xg").css("display","none")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
						$("#auditCommentForm").find("textarea").attr("disabled","disabled")
					}else if(str.responseData.contractPo.status==30||str.responseData.contractPo.status==40){
						$("#subCont").css("display","none")
						$("#conment").css("display","")
						$("#comCont").css("display","none")
						$("#backCont").css("display","none")
						$("#finCont").css("display","none")
						$("#stopCont").css("display","none")
						$("#updContform #updCont").css("display","none")
						$("#updContform .adddetail").css("display","none")
						$("#updContform .addpayment").css("display","none")
						$("#updContform .ideldetail").css("display","none")
						$("#updContform .iupddetail").css("display","none")
						$("#updContform .idelpayment").css("display","none")
						$("#updContform .iupdpayment").css("display","none")
						$(".cz").css("display","none")
						$(".xg").css("display","none")
						$("#updContform").find("input,select,textarea").attr("disabled","disabled")
						$("#auditCommentForm").find("textarea").attr("disabled","disabled")
					}
					
			}
		})

	});

//-------------------------------------------------------------------------- 修改中新增明细信息----------------------------------------------------------------------					
	
	var num=0;
	$("#updContBox .adddetail").click(function(){
		num++;
		var idethtml="";
		idethtml+='<tr class="detaillist" id="'+num+'">\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="date" class="iitemThru span1" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><select style="width:180px" type="text" class="iprodId span1"  requir="true" check="U_2NAME_P"><option value="">- 请选择 -</option></select><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="text" class="iprodPrice"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="text" class="iprodQty"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input style="width:180px" type="text" class="iprodAmount count span1" readonly="readonly" requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td><input type="button" value="删除" class="ideldetail"></td>\
			<td><input type="button" value="提交" class="niadddetail"></td>\
       </tr>'
			$("#updContBox #detailList").append(idethtml)
			  for(var i=0; i<$(".detaillist").length; i++){
				 
					 checkForm($(".detaillist").eq(i).attr("id"))
				 }
            iaddtail();
		 $.ajax({
		        url: '/' + app + '/crm/prd/qry',
		        type: 'POST',
		        success: function (str) {
		        	var string = '';
		           console.log(str)
		            if (str.responseCode == 0) {
		                for (var i = 0; i < str.responseData.length; i++) {
		                    string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].prodName + '</option> ';
		                }
		                for(var j=0;j<$('.iprodId').length;j++){
		                	if($(".iprodId")[j].options.length==1){
		                		$(".iprodId").eq(j).append(string);
			                }
		                }
		                
		            }
		        }
		    });
	});	
	
	$(document).delegate(".niadddetail",'click',function(){
		if(checkForm2($(this).parent().parent().attr("id"))){
		var that=$(this)
		var parent=$(this).parent().parent();
		console.log(parent.children().eq(0).children().val())
			$.ajax({
				url:'/'+app+'/crm/cni/add',
				data:{
				 "cntrId"         :$("#updContform #cntrName").attr("cntrid"),
				 "itemThru"       :parent.children().eq(0).children().val(),      //合同名称
				 "prodId"         :parent.children().eq(1).children().val(), 
			     "prodPrice"      :parent.children().eq(2).children().val(),
				 "prodQty"        :parent.children().eq(3).children().val(),
				 "prodAmount"     :parent.children().eq(4).children().val(),
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						$("#updContBox #tamount").val(str.resv1dbl)
						parent.attr("id",str.responseData.id);
						that.val("修改");
						that.attr("class","iupddetail");
						$("#desucc").html("提交成功").fadeIn("slow").fadeOut("slow")
					}
				}
			})
           }
	   })
	
	
//	-------------------------------------------------------------------------- 修改中新增付款条款 ----------------------------------------------------------------------
	
	var pnum=0;
	$("#updContBox .addpayment").click(function(){
		pnum++;
		var ipayhtml="";
		ipayhtml+='<tr class="paymentlist" id="a'+pnum+'">\
			<td style="padding-left:0px;padding-right:0px"><input type="date"  class="irpayDate" check="U_6DATE" requir="true"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input type="text"  class="irpayAmount rcount"  requir="true" check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input type="text" readonly="ireadonly" class="status" value="计划回款"  check="U_2NAME_P"><i class="text-error"></i></td>\
			<td style="padding-left:0px;padding-right:0px"><input type="text"  class="iremark"  check="U_2NAME_P"><i class="text-error"></i></td>\
			<td><input type="button" value="删除" class="idelpayment"></td>\
			<td><input type="button" value="提交" class="niaddpayment"></td>\
       </tr>'
			$("#updContBox #paymentList").append(ipayhtml)
			for(var i=0; i<$(".paymentlist").length; i++){
				 checkForm($(".paymentlist").eq(i).attr("id"))
			 }  
	});
	
	 $(document).delegate(".niaddpayment",'click',function(){
		 if(checkForm2($(this).parent().parent().attr("id"))){
		        var that=$(this)
				var parent=$(this).parent().parent();
				$.ajax({
					url:'/'+app+'/crm/cnr/add',
					data:{
					 "cntrId"         :$("#updContform #cntrName").attr("cntrid"),
					 "rpayDate"       :parent.children().eq(0).children().val(),      //合同名称
					 "rpayAmount"     :parent.children().eq(1).children().val(), 
				     "status"         :parent.children().eq(2).children().val(),
					 "remark"         :parent.children().eq(3).children().val(),
					},
					type:'POST',
					success:function(str){
						console.log(str);
						if(str.responseCode==0){
							parent.attr("id",str.responseData);
							$("#paysucc").html("提交成功").fadeIn("slow").fadeOut("slow")
							that.val("修改");
							that.attr("class","iupdpayment");
						}
					}
				})
             }
		});
	 
	 
	//	-------------------------------------------------------------------------- 修改提交合同信息----------------------------------------------------------------------
	checkForm("updContformdiv")
							$('#updContform #updCont').click(function(){
								if(checkForm2("updContformdiv")){
									$.ajax({
										url:'/'+app+'/crm/cnt/upd',
										data:{
										 "id"             :$("#updContform #cntrName").attr("cntrid"),
										 "cntrName"       :$("#updContform #cntrName").val(),      //合同名称
										 "cntrNo"         :$("#updContform #cntrNo").val(), 
									     "cntrType"       :$("#updContform #cntrType").val(),
										 "bankAccount"    :$("#updContform #bankAccount").val(),
										 "openBank"       :$("#updContform #openBank").val(),
										 "bankAccountCust":$("#updContform #bankAccountCust").val(),  
										 "openBankCust"   :$("#updContform #openBankCust").val(), 
										 "signDate"       :$("#updContform #signDate").val(),  
										 "signerCust"     :$("#updContform #signerCust").val(), 
										 "cntrFrom"       :$("#updContform #cntrFrom").val(),
										 "cntrThru"       :$("#updContform #cntrThru").val(),
										 "signGeo"        :igeo.geo(),
										 "signAddress"    :$("#updContform #signAddress").val(),
										 "signer"         :$("#updContform #signer").val()
										},
										type:'POST',
										success:function(str){
											console.log(str);
											if(str.responseCode==0){
												
												$("#cotrsucc").fadeIn("slow").fadeOut("slow")
												
												var id=str.responseData.id;
									            $('#'+id).html('<td>'+noData(setDate(str.responseData.signDate))+'</td>\
					                            <td >'+noData(igeo.cityname(str.responseData.signGeo))+' </td>\
					                            <td>'+noData(str.responseData.cntrName)+'</td>\
					                            <td>'+noData(str.responseData.tamount)+'</td>\
					                            <td>'+noData(str.responseData.signer)+'</td>\
					                            <td>'+noData(str.responseData.signerCust)+'</td>\
					                            <td>'+noData(contType(str.responseData.cntrType))+'</td>\
					                             <td>'+noData(cntrStatus(str.responseData.status))+'</td>\
					                             <td>'+noData(str.responseData.cntrNo)+'</td>\
					                              <td>\
					                              <a title="编辑" class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
					                            </td>')
												
											}
										}
									})
						         }
							});
	
	
//	-------------------------------------------------------------------------- 修改明细信息----------------------------------------------------------------------
			
	$("#updContBox").delegate(".iupddetail",'click',function(){
		                    var ctotal=0;
							if(checkForm2($(this).parent().parent().attr("id"))){
								
							 var parent=$(this).parent().parent();
							 
								$.ajax({
									url:'/'+app+'/crm/cni/upd',
									data:{
									 "id"             :parent.attr("id"),
									 "itemThru"       :parent.children().eq(0).children().val(),      //合同名称
									 "prodId"         :parent.children().eq(1).children().val(), 
								     "prodPrice"      :parent.children().eq(2).children().val(),
									 "prodQty"        :parent.children().eq(3).children().val(),
									 "prodAmount"     :parent.children().eq(4).children().val(),
									},
									type:'POST',
									success:function(str){
										console.log(str);
										if(str.responseCode==0){
											$("#desucc").html("修改成功").fadeIn("slow").fadeOut("slow")
								            $("#updContBox #tamount").val(str.resv1dbl)
										}
									}
								})
								}
						})
	
	 
//	-------------------------------------------------------------------------- 修改付款条款信息----------------------------------------------------------------------
				
						$("#updContBox").delegate(".iupdpayment",'click',function(){
							 
							if(checkForm2($(this).parent().parent().attr("id"))){
						       var parent=$(this).parent().parent();
								$.ajax({
									url:'/'+app+'/crm/cnr/upd',
									data:{
									 "id"             :parent.attr("id"),
									 "rpayDate"       :parent.children().eq(0).children().val(),      //合同名称
									 "rpayAmount"     :parent.children().eq(1).children().val(), 
								     "status"         :parent.children().eq(2).children().val(),
									 "remark"         :parent.children().eq(3).children().val(),
									},
									type:'POST',
									success:function(str){
										console.log(str);
										if(str.responseCode==0){
											$("#paysucc").html("修改成功").fadeIn("slow").fadeOut("slow")
											
										}
									}
								})
					         }
						})


	 
//	-------------------------------------------------------------------------- 删除明细信息----------------------------------------------------------------------
				   $("#updContBox").delegate(".ideldetail",'click',function(){
					   
				   	var parent=$(this).parent().parent();
				   	var that=$(this);
				   	if(parent.attr("id")==undefined){
				   		that.parent().parent().remove()
				   		return false
				   	}
							$.ajax({
								url:'/'+app+'/crm/cni/del',
								data:{
								 "id"             :parent.attr("id"),
								},
								type:'POST',
								success:function(str){
									if(str.responseCode==0){
										$("#updContBox #tamount").val(str.resv1dbl) 
										that.parent().parent().remove()
									}
								}
							})
							that.parent().parent().remove()
					})
					
//-------------------------------------------------------------------------- 删除付款条款信息----------------------------------------------------------------------
                  $("#updContBox").delegate(".idelpayment",'click',function(){
                	   	var parent=$(this).parent().parent();
                	   	var that=$(this);
                	   	if(parent.attr("id")==undefined){
                	   		that.parent().parent().remove()
    				   		return false
    				   	}
							$.ajax({
								url:'/'+app+'/crm/cnr/del',
								data:{
								 "id"             :parent.attr("id"),
								},
								type:'POST',
								success:function(str){
									if(str.responseCode==0){
										that.parent().parent().remove()
									}
								}
							})
					})
					
					
//-------------------------------------------------------------------------- 提交----------------------------------------------------
   	
		
	
$("#updContBox").delegate("#subCont","click",function(){
	$("#makeSubBox").css({"display":"block"})
	 var ctotal=0;
	 var rtotal=0;
	for(var a=0;a<$(".count").length;a++){
		ctotal+=parseFloat($(".count").eq(a).val())
	}
	for(var a=0;a<$(".rcount").length;a++){
		rtotal+=parseFloat($(".rcount").eq(a).val())
	}
	
		if(ctotal==rtotal){
			makeSub("makeSubBox","提交后合同不可修改，确认提交吗？");
			
		}else{
			makeSub("makeSubBox","应回款额与签约金额不相等，确认提交吗？"); 
		}
		
		$(document).delegate("#makeSure",'click',function(){
			$(this).parent().hide();
			 $.ajax({
					url:'/'+app+'/crm/cnt/sub',
					data:{
					 "id"             :$("#updContform #cntrName").attr("cntrid"),
					},
					type:'POST',
					success:function(str){
						console.log(str);
						if(str.responseCode==0){
							var id=$("#updContform #cntrName").attr("cntrid")
						    $("#"+id).children().eq(7).html("提交")
							$("#subCont").css("display","none")
							$("#conment").css("display","")
							$("#comCont").css("display","")
							$("#backCont").css("display","")
							$("#finCont").css("display","none")
							$("#stopCont").css("display","none")
							$("#updContform #updCont").css("display","none")
							$("#updContform .adddetail").css("display","none")
							$("#updContform .addpayment").css("display","none")
							$("#updContform .ideldetail").css("display","none")
							$("#updContform .iupddetail").css("display","none")
							$("#updContform .idelpayment").css("display","none")
							$("#updContform .iupdpayment").css("display","none")
							$(".cz").css("display","none")
							$(".xg").css("display","none")
							$("#updContform").find("input,select,textarea").attr("disabled","disabled")
							
						}
					}
				})
		})
		$(document).delegate("#makeNo",'click',function(){
			$(this).parent().hide();
			 return false; 
		})
		
		
			
			
		
		 
		
	
	
})
					
//-------------------------------------------------------------------------- 审核----------------------------------------------------					

$("#updContBox").delegate("#comCont","click",function(){
	if($("#auditComment").val()!="") {
		$("#auditCommentForm .text-error").html("")
	$.ajax({
		url:'/'+app+'/crm/cnt/cfm',
		data:{
		 "id"             :$("#updContform #cntrName").attr("cntrid"),
		 "auditComment"   :$("#auditComment").val()
		},
		type:'POST',
		success:function(str){
			var id=$("#updContform #cntrName").attr("cntrid")
		    $("#"+id).children().eq(7).html(cntrStatus(str.responseData))
			console.log(str);
			if(str.responseCode==0){
				if(str.responseData=="20"){
					$('#inv').css("display","")
					$('#rep').css("display","")
					$('#exp').css("display","")
				    $('#inv').attr('href','../contract/contract_invoice.html?custID='+custID+'&cntrID='+id);
				    $('#rep').attr('href','../contract/contract_repay.html?custID='+custID+'&cntrID='+id);
				    $('#exp').attr('href','../contract/contract_expend.html?custID='+custID+'&cntrID='+id);
				}
				$("#subCont").css("display","none")
				$("#conment").css("display","")
				$("#comCont").css("display","none")
				$("#backCont").css("display","none")
				$("#finCont").css("display","")
				$("#stopCont").css("display","")
				$("#updContform #updCont").css("display","none")
				$("#updContform .adddetail").css("display","none")
				$("#updContform .addpayment").css("display","none")
				$("#updContform .ideldetail").css("display","none")
				$("#updContform .iupddetail").css("display","none")
				$("#updContform .idelpayment").css("display","none")
				$("#updContform .iupdpayment").css("display","none")
				$(".cz").css("display","none")
				$(".xg").css("display","none")
				$("#updContform").find("input,select,textarea").attr("disabled","disabled")
				$("#auditCommentForm").find("textarea").attr("disabled","disabled")
				$("#updContBox, .modal-backdrop").hide();
			}
		}
	})
	}else{
		
		$("#auditCommentForm .text-error").html("必填项！")
		return false;
	}
})
					
//-------------------------------------------------------------------------- 发回----------------------------------------------------					
$("#updContBox").delegate("#backCont","click",function(){
	$.ajax({
		url:'/'+app+'/crm/cnt/bck',
		data:{
		 "id"             :$("#updContform #cntrName").attr("cntrid"),
		},
		type:'POST',
		success:function(str){
			console.log(str);
			if(str.responseCode==0){
				var id=$("#updContform #cntrName").attr("cntrid")
			    $("#"+id).children().eq(7).html("草稿")
			    $('#inv').css("display","none")
					$('#rep').css("display","none")
					$('#exp').css("display","none")
				$("#auditComment").val("")
				$("#subCont").css("display","")
				$("#conment").css("display","none")
				$("#comCont").css("display","none")
				$("#backCont").css("display","none")
				$("#finCont").css("display","none")
				$("#stopCont").css("display","none")
				$(".cz").css("display","")
				$(".xg").css("display","")
				$("#updContform #updCont").css("display","")
				$("#updContform .adddetail").css("display","")
				$("#updContform .addpayment").css("display","")
				$("#updContform .ideldetail").css("display","")
				$("#updContform .iupddetail").css("display","")
				$("#updContform .idelpayment").css("display","")
				$("#updContform .iupdpayment").css("display","")
				$("#updContform").find("input,select,textarea").removeAttr("disabled");
				$("#auditCommentForm").find("textarea").removeAttr("disabled")
			}
		}
	})
})
					
//-------------------------------------------------------------------------- 完成----------------------------------------------------					
$("#updContBox").delegate("#finCont","click",function(){
	$.ajax({
		url:'/'+app+'/crm/cnt/fsh',
		data:{
		 "id"             :$("#updContform #cntrName").attr("cntrid"),
		},
		type:'POST',
		success:function(str){
			console.log(str);
			if(str.responseCode==0){
				var id=$("#updContform #cntrName").attr("cntrid")
			    $("#"+id).children().eq(7).html("完成")
			        $('#inv').css("display","")
					$('#rep').css("display","")
					$('#exp').css("display","")
				    $('#inv').attr('href','../contract/contract_invoice.html?custID='+custID+'&cntrID='+id);
				    $('#rep').attr('href','../contract/contract_repay.html?custID='+custID+'&cntrID='+id);
				    $('#exp').attr('href','../contract/contract_expend.html?custID='+custID+'&cntrID='+id);
				$("#subCont").css("display","none")
				$("#conment").css("display","")
				$("#comCont").css("display","none")
				$("#backCont").css("display","none")
				$("#finCont").css("display","none")
				$("#stopCont").css("display","none")
				$("#updContform #updCont").css("display","none")
				$("#updContform .adddetail").css("display","none")
				$("#updContform .addpayment").css("display","none")
				$("#updContform .ideldetail").css("display","none")
				$("#updContform .iupddetail").css("display","none")
				$("#updContform .idelpayment").css("display","none")
				$("#updContform .iupdpayment").css("display","none")
				$(".cz").css("display","none")
				$(".xg").css("display","none")
			}
		}
	})
})
					
//-------------------------------------------------------------------------- 终止----------------------------------------------------					
$("#updContBox").delegate("#stopCont","click",function(){
	$.ajax({
		url:'/'+app+'/crm/cnt/stp',
		data:{
		 "id"             :$("#updContform #cntrName").attr("cntrid"),
		},
		type:'POST',
		success:function(str){
			console.log(str);
			if(str.responseCode==0){
				var id=$("#updContform #cntrName").attr("cntrid")
			    $("#"+id).children().eq(7).html("终止")
			    $('#inv').css("display","")
					$('#rep').css("display","")
					$('#exp').css("display","")
				    $('#inv').attr('href','../contract/contract_invoice.html?custID='+custID+'&cntrID='+id);
				    $('#rep').attr('href','../contract/contract_repay.html?custID='+custID+'&cntrID='+id);
				    $('#exp').attr('href','../contract/contract_expend.html?custID='+custID+'&cntrID='+id);
				$("#subCont").css("display","none")
				$("#conment").css("display","")
				$("#comCont").css("display","none")
				$("#backCont").css("display","none")
				$("#finCont").css("display","none")
				$("#stopCont").css("display","none")
				$("#updContform #updCont").css("display","none")
				$("#updContform .adddetail").css("display","none")
				$("#updContform .addpayment").css("display","none")
				$("#updContform .ideldetail").css("display","none")
				$("#updContform .iupddetail").css("display","none")
				$("#updContform .idelpayment").css("display","none")
				$("#updContform .iupdpayment").css("display","none")
				$("#updContform").find("input,select,textarea").attr("disabled","disabled")
				$("#auditCommentForm").find("textarea").attr("disabled","disabled")
			}
		}
	})
})
})