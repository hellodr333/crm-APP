$(function(){
	var bgID=GetQueryParam("vstID");
	var custID = GetQueryParam("custID");
	
	$.jeDate("#vstStartUpd",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})
	$.jeDate("#vstEndUpd",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})
	$.jeDate("#vstStart",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})
	$.jeDate("#vstEnd",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})

	var pageNO = 1;
	var igeo = new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	
	
	//	 链接id
	$('#cst').attr('href','../cust/cust_detail.html?custID='+custID);
	$('#ctm').attr('href','../cust/ctm_detail.html?custID='+custID);
	$('#chance').attr('href','../chance/cust_chance.html?custID='+custID);
	$('#vst').attr('href','../visits/cust_vst.html?custID='+custID);
	$('#contract').attr('href','../contract/cust_contract.html?custID='+custID);
	$('#invoice').attr('href','../contract/contract_invoice.html?custID='+custID);
	

	
	function bgColor(bgID){
		$('tr').css("background","#fff");
		$('tr[vstID="'+ bgID +'"]').css("background","#e8f2fe");
		}
	//获取
	qryList();
	//查询
	$("#searchBtn").click(function(){
		pageNO=1;
		qryList();
		})
	function qryList(){
		$.ajax({
			url:'/'+app+'/crm/cuv/qry',
			data:{
				"PAGE_NO"			:	pageNO,
				"PAGE_SIZE"         :   "5",
				"sc_vstCust"		:   custID,
				"sc_trcType"		:	"10"
				},
			type:'POST',
			success:function(str){
				if(str.responseCode==0){
					var msg = '';
					if(str.responseData.length!=0){
						for(var i =0; i<str.responseData.length; i++){
							msg += '<tr vstID="'+str.responseData[i].id+'">\
									<td>'+  getNowFormatDate(str.responseData[i].vstStart) +'</td>\
									<td vstCtmer="'+ str.responseData[i].vstCtmer +'">'+  str.responseData[i].vstCtmer_view+'</td>\
									<td>'+  igeo.cityname(str.responseData[i].vstGeo) +'</td>\
									<td>'+  setTrcType(str.responseData[i].trcType)+'</td>\
									<td>'+  setMode(str.responseData[i].vstMode)+'</td>\
									<td>'+  noData(str.responseData[i].vstTarget)+'</td>\
									<td>'+  setStatus(str.responseData[i].vstStatus)+'</td>\
									<td>'+  setResult(str.responseData[i].vstResult)+'</td>\
									 <td>\
										<a  class="" href="#updVst" data-toggle="modal"><i class="icon-pencil"></i></a>\
									</td>\
								</tr> '
							}
					}else{
						msg ="<tr><td colspan='9'><div class='text-center'>无数据!</div></td></tr>"
						}
					$("#vstList").html(msg);
					$("#nowPage").html(pageNO);
					$("#totalPage").html(str.resv1lng==0?1:str.resv1lng);
					bgColor(bgID)
				}else{
					makeSure("makeSureBox","获取失败!");
				}
			}					
		});
	}
	$("#firstPage").click(function(){
		pageNO = 1;
		qryList();
		})
	$("#lastPage").click(function(){
		pageNO = $("#totalPage").html();
		qryList();
		})
	$("#prevPage").click(function(){
		if(pageNO>1){
			pageNO--;
			qryList();
			}else{
				makeSure("makeSureBox","已经到达首页！");
				}
		})
	$("#nextPage").click(function(){
		if(pageNO<$("#totalPage").html()){
			pageNO++;
			qryList();
			}else{
				makeSure("makeSureBox","已经到达尾页！");
				}
		})

	$("#jumpPage").click(function(){
		pageNO=$("#goPage").val();
		if(pageNo>0 && pageNo <= $("#totalPage").html()){
			qryList();
			}else{
				makeSure("makeSureBox","超出范围!");
				pageNo =$("#nowPage").val();
				}
		})
		

	//获取联系人
	
	function ctmer(name){
		$.ajax({
			url:'/'+app+'/crm/cuc/qry',
			data:{"DT_SCOPE"	:"1",
				  "sc_custId"	:custID
					},
			type:'POST',
			success:function(str){
				if(str.responseCode==0){
					var msg = '<option value="">请选择联系人</option>';
					for(var i =0; i<str.responseData.length; i++){
						msg += '<option value="'+ str.responseData[i].id +'">'+ str.responseData[i].ctmName +'</option>';
					}
					$("#"+name).html(msg);
				}else{
					makeSure("makeSureBox","获取失败!");
					}
			}
		});
		}
	
	
	
	$("#addVstCtm").click(function(){
		$(".text-error").html("");
		$("input,select,textarea").val("");
		})
	
	ctmer("vstCtmer");
	ctmer("vstCtmerUpd");
	
	
	checkForm("addVstForm");
	//新建。。
	$("#addVstBtn").click(function(){
		if(checkForm2("addVstForm")){
			$.ajax({
				url:'/'+app+'/crm/cuv/add',
				data:{
					vstCust		:   custID,
					vstCtmer	:	$("#vstCtmer").val(),//客户联系人
					vstGeo		:	$("#county").val(),//所在区域
					vstMode		:	$("#vstMode").val(),//行动方式
					vstAddress	:	$("#vstAddress").val(),//地址
					vstStart	:	$("#vstStart").val(),//联络起始时间
					vstEnd		:	$("#vstEnd").val(),//联络结束时间
					vstTarget	:	$("#vstTarget").val(),//行动目标
					remark		:	$("#remark").val()
					},
				type:'POST',
				success:function(str){
					if(str.responseCode==0){
						makeSure("makeSureBox","新建成功!");
						$("#addVst").hide();
						$(".modal-backdrop").hide();
						var msg='';
						if($("#vstList").children().length=="1" && $("#vstList").children().children().length=="1"){
							msg ='';
							}else{
								msg = $("#vstList").html(); 
								}
						
						msg += '<tr vstID="'+ str.responseData +'">\
									<td>'+  $("#vstStart").val() +'</td>\
									<td>'+  $('option[value="'+ $("#vstCtmer").val() +'"]').html() +'</td>\
									<td>'+  igeo.geoname($("#county").val()) +'</td>\
									<td>客户联络</td>\
									<td>'+  setMode($("#vstMode").val()) +'</td>\
									<td>'+  noData($("#vstTarget").val()) +'</td>\
									<td>计划</td>\
									<td></td>\
									 <td>\
										<a  class="" href="#updVst" data-toggle="modal"><i class="icon-pencil"></i></a>\
									</td>\
								</tr>';
						$("#vstList").html(msg);
						bgID=str.responseData;
						bgColor(bgID)
						}else{
							makeSure("makeSureBox","新建失败!");
							}
				}
			})
		}
	})
	
	//编辑前获取。。。
	var vstID = '';
	$(document).delegate("i.icon-pencil","click",function(){
		$(".text-error").html("");
		vstID = $(this).parent().parent().parent().attr("vstid");
		bgID=vstID;
		bgColor(bgID)
		$.ajax({
			url:'/'+app+'/crm/cuv/get',
			data:{id:vstID},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseCode==0){
						$("#updVstForm,#compVstForm,#chkVstForm").find("input,select,textarea").removeAttr("disabled");
						$("#chkVstBtn,#updVstBtn,#compVstBtn").show();
						$("#chkVstForm").hide();
						$("#vstCtmerUpd").val(str.responseData.vstCtmer);//客户联系人
						geoNum = str.responseData.vstGeo;
						igeo = new Geo(document.getElementById("provinceUpd") ,document.getElementById("cityUpd") ,document.getElementById("countyUpd") ,geoNum);
						
						//$("#countyUpd").val(str.responseData.vstGeo);//所在区域
						$("#vstModeUpd").val(str.responseData.vstMode);//行动方式
						$("#vstAddressUpd").val(str.responseData.vstAddress);//地址
						$("#vstStartUpd").val(getNowFormatDate(str.responseData.vstStart));//联络起始时间
						$("#vstEndUpd").val(getNowFormatDate(str.responseData.vstEnd));//联络结束时间
						$("#vstTargetUpd").val(str.responseData.vstTarget);//行动目标
						$("#remarkUpd").val(str.responseData.remark);
						$("#vstRecord").val(str.responseData.vstRecord);
						$("#vstResult").val(str.responseData.vstResult);
						$("#auditComment").val(str.responseData.auditComment);
						$("#vstPlans").val(str.responseData.vstPlans);
						$("#vstPartners").val(str.responseData.vstPartners);
						$("#vstScore").val(str.responseData.vstScore);
						
						if(str.responseData.vstStatus==30){
							$("#updVstForm,#compVstForm").find("input,select,textarea").attr("disabled","disabled")
							$("#chkVstForm").show();
							$("#compVstBtn,#updVstBtn").hide();
							}else if(str.responseData.vstStatus==40){
								$("#updVstForm,#compVstForm,#chkVstForm").find("input,select,textarea").attr("disabled","disabled")
								$("#chkVstBtn,#updVstBtn,#compVstBtn").hide();
								$("#chkVstForm").show();
								}
				}	
			}
		});
	})
	//编辑后更新。。
	checkForm("updVstForm")
	$("#updVstBtn").click(function(){
		if(checkForm2("updVstForm")){
			$.ajax({
				url:'/'+app+'/crm/cuv/upd',
				data:{
					id:vstID,
					vstCtmer	:	$("#vstCtmerUpd").val(),//客户联系人
					vstGeo		:	$("#countyUpd").val(),//所在区域
					vstMode		:	$("#vstModeUpd").val(),//行动方式
					vstAddress	:	$("#vstAddressUpd").val(),//地址
					vstStart	:	$("#vstStartUpd").val(),//联络起始时间
					vstEnd		:	$("#vstEndUpd").val(),//联络结束时间
					vstTarget	:	$("#vstTargetUpd").val(),//行动目标
					remark		:	$("#remarkUpd").val()
					},
				type:'POST',
				success:function(str){
					if(str.responseCode==0){
						makeSure("makeSureBox","修改成功!");
						$('tr[vstid="'+ vstID +'"] td').eq(0).html($("#vstStartUpd").val());
						$('tr[vstid="'+ vstID +'"] td').eq(1).html($('option[value="'+ $("#vstCtmerUpd").val() +'"]').html());
						$('tr[vstid="'+ vstID +'"] td').eq(2).html(igeo.geoname($("#countyUpd").val()));
						$('tr[vstid="'+ vstID +'"] td').eq(4).html(setMode($("#vstModeUpd").val()));
						$('tr[vstid="'+ vstID +'"] td').eq(5).html($("#vstTargetUpd").val());
					}else{
						makeSure("makeSureBox","修改失败!");
						}
				}
			})
			$(".text-error").html("");
		}
	})
	//完成。。
	checkForm("compVstForm")
	$("#compVstBtn").click(function(){
		if(checkForm2("compVstForm") && checkForm2("updVstForm")){
			$.ajax({
				url:'/'+app+'/crm/cuv/ffl',
				data:{
					id:vstID,
					vstRecord	:	$("#vstRecord").val(),//客户联系人
					vstPlans	:	$("#vstPlans").val(),
					vstPartners	:	$("#vstPartners").val(),
					vstScore	:	$("#vstScore").val()
					},
				type:'POST',
				success:function(str){
					console.log(str)
					if(str.responseCode==0){
						makeSure("makeSureBox","行动已完成!");
						$("#chkVstForm").show();
						$("#updVstBtn,#compVstBtn").hide();
						$("#updVstForm,#compVstForm").find("input,select,textarea").attr("disabled","disabled");
						$('tr[vstid="'+ vstID +'"] td').eq(6).html("完成");
					}
				}
			})
			$(".text-error").html("");
		}
	})
	//审核。。
	checkForm("chkVstForm")
	$("#chkVstBtn").click(function(){
		if(checkForm2("chkVstForm")){
			$.ajax({
				url:'/'+app+'/crm/cuv/adt',
				data:{
					id				:   vstID,
					auditComment	:	$("#auditComment").val(),
					vstResult		:   $("#vstResult").val()
					},
				type:'POST',
				success:function(str){
					console.log(str)
					if(str.responseCode==0){
						makeSure("makeSureBox","审核成功!");
						$("#chkVstBtn").hide();
						$("#chkVstForm").find("input,select,textarea").attr("disabled","disabled");
						$('tr[vstid="'+ vstID +'"] td').eq(7).html(setResult($("#vstResult").val()));
						$('tr[vstid="'+ vstID +'"] td').eq(6).html("已评");
					}
				}
			})
			$(".text-error").html("");
		}
	})
	
	
	
	})