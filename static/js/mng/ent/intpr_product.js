$(function(){
		var pageNO=1;
		var intpr = '';
		
		//查.
		function qryList(){
			$.ajax({
			url:"/"+app+"/crm/prd/qry",
			data:{
				"PAGE_NO"			:	pageNO,
				"PAGE_SIZE"         :   "5",
				"sc_prodName"		:	$("#prodNameSelect").val(),
				"sc_prodCategory"	:	$("#prodCategorySelect").val()
				},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseCode==0){
					var msg = '';
					for(var i=0; i<str.responseData.length; i++){
						msg +='<tr intpr="'+str.responseData[i].id+'">\
                                <td>'+noData(str.responseData[i].prodName)+'</td>\
                                <td>'+setProdCategory(str.responseData[i].prodCategory)+'</td>\
                                <td>'+noData(str.responseData[i].prodInfo)+'</td>\
                                <td>'+setProdStatus(str.responseData[i].prodStatus)+'</td>\
                                <td>'+setDate(str.responseData[i].lastModifiedDate)+'</td>\
                                <td><a  class="" href="#updPro" data-toggle="modal"><i class="icon-edit"></i></a></td>\
                            </tr>'
						}
					$("#proList").html(msg);
					$("#nowPage").html(pageNO);
					$("#totalPage").html(str.resv1lng==0?"1":str.resv1lng);
					}
			}
		});
		}
		qryList();
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
					alert("已经到达首页");
					}
			})
		$("#nextPage").click(function(){
			if(pageNO<$("#totalPage").html()){
				pageNO++;
				qryList();
				}else{
					alert("已经到达尾页");
					}
			})
		$("#jumpPage").click(function(){
			pageNO=$("#goPage").val();
			qryList();
			})
		//增.
		$("#addProList").click(function(){
			$(".text-error").html('');
			$("#addProForm").find("input,textarea,select").val("");
			})
		checkForm("addProForm")
		$("#addProBtn").click(function(){
			if(checkForm2("addProForm")){
				$.ajax({
					url:"/"+app+"/crm/prd/add",
					data:{
						prodName	:	$("#prodName").val(),
						prodCategory:	$("#prodCategory").val(),
						prodInfo	:	$("#prodInfo").val(),
						prodInfoTech:	$("#prodInfoTech").val(),
						prodInfoSolu:	$("#prodInfoSolu").val(),
						prodStatus	:	$("#prodStatus").val()
						},
					type:'POST',
					success:function(str){
						console.log(str)
						if(str.responseCode==0){
							$("#addPro").hide();
							$(".modal-backdrop").hide();
							var msg = $("#proList").html();
							msg +='<tr intpr="'+str.responseData+'">\
                                <td>'+noData($("#prodName").val())+'</td>\
                                <td>'+setProdCategory($("#prodCategory").val())+'</td>\
                                <td>'+noData($("#prodInfo").val())+'</td>\
                                <td>'+setProdStatus($("#prodStatus").val())+'</td>\
                                <td>'+setDate(new Date())+'</td>\
                                <td><a  class="" href="#updPro" data-toggle="modal"><i class="icon-edit"></i></a></td>\
                            </tr>'
							$("#proList").html(msg);
							}
					}
				});
				}
			})
			//搜
			$("#searchBtn").click(function(){
				qryList();
				})

			$(document).delegate("i.icon-edit","click",function(){
				$(".text-error").html("");
				intpr = $(this).parent().parent().parent().attr("intpr");
				$.ajax({
					url:'/'+app+'/crm/prd/get',
					data:{id:intpr},
					type:'POST',
					success:function(str){
						console.log(str)
						if(str.responseCode==0){
							$("#prodNameUpd").val(str.responseData.prodName);
							$("#prodCategoryUpd").val(str.responseData.prodCategory);
							$("#prodInfoUpd").val(str.responseData.prodInfo);
							$("#prodInfoTechUpd").val(str.responseData.prodInfoTech);
							$("#prodInfoSoluUpd").val(str.responseData.prodInfoSolu);
							$("#prodStatusUpd").val(str.responseData.prodStatus);
						}
					}
				});
			})
			$("#updProBtn").click(function(){
				if(checkForm2("updProForm")){
					$.ajax({
					url:'/'+app+'/crm/prd/upd',
					data:{
						id			:		intpr,
						prodName	:		$("#prodNameUpd").val(),
						prodCategory:		$("#prodCategoryUpd").val(),
						prodInfo	:		$("#prodInfoUpd").val(),
						prodInfoTech:		$("#prodInfoTechUpd").val(),
						prodInfoSolu: 		$("#prodInfoSoluUpd").val(),
						prodStatus	:		$("#prodStatusUpd").val()
							},
					type:'POST',
					success:function(str){
						console.log(str)
						if(str.responseCode==0){
							$("#updPro").hide();
							$(".modal-backdrop").hide();
							$('tr[intpr="'+ intpr +'"] td').eq(0).html(noData($("#prodNameUpd").val()));
							$('tr[intpr="'+ intpr +'"] td').eq(1).html(setProdCategory($("#prodCategoryUpd").val()));
							$('tr[intpr="'+ intpr +'"] td').eq(2).html(noData($("#prodInfoUpd").val()));
							$('tr[intpr="'+ intpr +'"] td').eq(3).html(setProdStatus($("#prodStatusUpd").val()));
							$('tr[intpr="'+ intpr +'"] td').eq(4).html(setDate(new Date()));

						}
					}
					});
				}
			})
	})