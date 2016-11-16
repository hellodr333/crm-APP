$(function(){
	var pageNO = 1;
	var igeo = new Geo(document.getElementById("provinceSelect") ,document.getElementById("citySelect") ,document.getElementById("countySelect") ,'');
	var userID2='';
	//获取
	qryList();
	//查询
	
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
		$('#bizUserSelect').val($('#manIpt').val());
		userID2=$('#manIpt').attr('userId');
	});
	$("#searchBtn").click(function(){
		pageNO=1;
		qryList();
		})
	function qryList(){
		$.ajax({
			url:"/"+app+"/crm/cuv/qry",
			data:{
				"PAGE_NO"			:	pageNO,
				"PAGE_SIZE"         :   "5",
				"DT_SCOPE" 			:  	$("#myPre").is(":checked")?2:1,
				"sc_vstMode"  		:	$("#vstModeSelect").val(),//方式
				"sc_vstResult" 		:	$("#vstResultSelect").val(),//结论
				"sc_vstStatus"   	:	$("#vstStatusSelect").val(),//状态
				"sc_vstGeo" 		:	$("#citySelect").val()?$("#citySelect").val():$("#provinceSelect").val(),//省市
				"sc_bizUser"	    :   userID2//联络人
				},
			type:'POST',
			success:function(str){
				console.log(str);
				
				if(str.responseCode==0){
					var msg = '';
					if(str.responseData.length!=0){
						for(var i =0; i<str.responseData.length; i++){
							msg += '<tr vstID="'+str.responseData[i].id+'">\
									<td>'+  setDate(str.responseData[i].vstStart)+'</td>\
									<td>'+  igeo.cityname(str.responseData[i].vstGeo) +'</td>\
									<td custid="'+ str.responseData[i].vstCust +'">'+  str.responseData[i].vstCust_view+'</td>\
									<td>'+  str.responseData[i].vstCtmer_view+'</td>\
									<td>'+  str.responseData[i].vstTarget.slice(0,15) + (str.responseData[i].vstTarget.length>15?'...':'')+'</td>\
									<td>'+  setTrcType(str.responseData[i].trcType)+'</td>\
									<td>'+  setMode(str.responseData[i].vstMode)+'</td>\
									<td>'+  setStatus(str.responseData[i].vstStatus)+'</td>\
									<td>'+  setResult(str.responseData[i].vstResult)+'</td>\
									<td>'+  str.responseData[i].bizUser_view+' </td>\
									<td>\
										<a  class="" href="#qryVst" data-toggle="modal"><i class="icon-eye-open"></i></a>\
									</td>\
									<td>\
										<i class="icon-pencil"></i>\
									</td>\
								</tr> '
							}
						}else{
							msg ="<tr><td colspan='12'><div class='text-center'>无数据!</div></td></tr>"
							}
						$("#vstList").html(msg);
						$("#nowPage").html(pageNO);
						$("#totalPage").html(str.resv1lng==0?1:str.resv1lng);
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
				makeSure("makeSureBox","已经到达首页!");
				}
		})
	$("#nextPage").click(function(){
		if(pageNO<$("#totalPage").html()){
			pageNO++;
			qryList();
			}else{
				makeSure("makeSureBox","已经到达尾页!");
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
	
	$(document).delegate("i.icon-eye-open","click",function(){
		var vstID = $(this).parent().parent().parent().attr("vstid");
		$("#vstForm .control-group").addClass("hide")
		$.ajax({
			url:"/"+app+"/crm/cuv/get",
			data:{id:vstID},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseCode==0){
					$("#vstCtmer").val(str.responseData.vstCtmer_view),//客户联系人
					geoNum = str.responseData.vstGeo;
					igeo = new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,geoNum);
					
					$("#vstAddress").val(str.responseData.vstAddress),//地址
					$("#vstStart").val(setDate(str.responseData.vstStart)),//联络起始时间
					$("#vstEnd").val(setDate(str.responseData.vstEnd)),//联络结束时间
					$("#vstTarget").val(str.responseData.vstTarget),//行动目标
					$("#remark").val(str.responseData.remark),//备注
					//
					$("#vstRecord").val(str.responseData.vstRecord),//行动详情
					$("#aiditComment").val(str.responseData.aiditComment),//审核意见
					$("#vstResult").val(str.responseData.vstResult)//行动结论
					$("#vstPartners").val(str.responseData.vstPartners)
					$("#vstPlans").val(str.responseData.vstPlans)
					$("#vstScore").val(str.responseData.vstScore)
					if(str.responseData.vstStatus==40){
						for(var i=0; i<13; i++){
							$("#vstForm").children(".control-group").eq(i).removeClass("hide");
							}
						}else if(str.responseData.vstStatus==30){
							for(var i=0; i<11; i++){
								$("#vstForm").children(".control-group").eq(i).removeClass("hide");
								}
							}else if(str.responseData.vstStatus==10){
								for(var i=0; i<8; i++){
									$("#vstForm").children(".control-group").eq(i).removeClass("hide");
									}
								}

				}else{
					makeSure("makeSureBox","获取失败!");
				}
			}					
		});
		})

	$(document).delegate("i.icon-pencil","click",function(){
		var vstID = $(this).parent().parent().attr("vstid");
		var custID = $(this).parent().parent().children().eq(2).attr("custid")
		if($("tr[vstid='"+ vstID +"'] td").eq(5).html()=="机会跟进"){
			location.href = "../chance/cust_chance.html?&custID="+custID; 
			}else{
				location.href = "cust_vst.html?vstID="+vstID+"&custID="+custID; 
				}
		
	})
	$("#myPre").click(function(){
		pageNO=1;
		qryList();
		})
	
	
	
	})