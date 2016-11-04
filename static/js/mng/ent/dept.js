$(function(){
	var checkVal=''
	var pageNo=1;
	var userid='';
	var clickID='';
	var focusID='';
	var entID='';
	var emplength='';
	
	
	
	$.jeDate("#updEmpFrom",{
		format:"YYYY-MM-DD",
		isTime:false,
		minDate:"2000-00-00",
		zIndex:93000,
	})
	$.jeDate("#updEmpThru",{
		format:"YYYY-MM-DD",
		isTime:false,
		minDate:"2000-00-00",
		zIndex:93000,
	})

	
	$("button").click(function(){
		$(".text-error").html("");
		})
	function setID(){
		$("#treeBox span").click(function(){
			focusID = $(this).parent().parent().attr("id");
			if(entID == focusID){
				focusID='';
				}
			})
		
	}
	setID();
	//获取信息
	$.ajax({
		url:"/"+ app +"/org/ent/eoe",
		data:{sc_entId:entID, sc_deptId:"",PAGE_SIZE:"15"},
		type:'POST',
		success:function(str){
			if(str.responseCode ==0){
			entID = str.responseData.entId;
			//部门信息
			var depMSG = str.responseData.departs;
			//员工信息
			var empMSG = str.responseData.employees;
			var d ='';
			var e ='';
			//企业获取～。12345
			deptStr = '\
			<li id="'+ entID +'"><div class="list11"><span><i class="icon-folder-open"></i>'+ str.responseData.entName +'</span>\
			<a title="添加" href="#addDepartBox" data-toggle="modal" class="edit_ico"><i class="icon-plus"></i></a></div><ul></ul></li>';
			
			$("#treeBox ul").html(deptStr);
			//部门获取～。12345
			for(var i=0; i<depMSG.length; i++){
				if(depMSG[i].childNums==0){
				d += ' <li id="'+ depMSG[i].id +'"><div class="list11"><span>'+ depMSG[i].name +'</span>\
						 <a title="编辑" href="#updDepartBox" data-toggle="modal" class="edit_ico updDepartMsg"><i class="icon-pencil"></i></a>\
						 <a title="删除"  href="#delDeptBox" data-toggle="modal" class="edit_ico"><i class="icon-remove"></i></a>\
						 <a title="添加" href="#addDepartBox" data-toggle="modal" class="edit_ico"><i class="icon-plus"></i></a></div>\
						 <ul></ul></li>';
							 
							 }else{
					d += ' <li id="'+ depMSG[i].id +'"><div class="list11"><span><i class="icon-plus-sign"></i>'+ depMSG[i].name +'</span>\
						 <a title="编辑" href="#updDepartBox" data-toggle="modal" class="edit_ico updDepartMsg"><i class="icon-pencil"></i></a>\
						 <a title="删除"  href="#delDeptBox" data-toggle="modal" class="edit_ico"><i class="icon-remove"></i></a>\
						 <a title="添加" href="#addDepartBox" data-toggle="modal" class="edit_ico"><i class="icon-plus"></i></a></div>\
						 <ul></ul></li>';			 
								 
								 }
				}
			$("#treeBox >ul li ul").html(d);
		
			//员工的OK～。
			
			for(var i=0; i<empMSG.length; i++){
				if(empMSG[i].userId){
				e +='<tr id="'+ empMSG[i].id +'"userid="'+ noDatan(empMSG[i].userId)+'">\
						<td>'+ (i+1) +'</td>\
						<td>'+ noData(empMSG[i].name) +'</td>\
						<td>'+ noData(empMSG[i].mobile) +'</td>\
						<td>\
							<div class="label label-table label-important">'+
							 empTitle(empMSG[i].empTitle)
							+'</div>\
						</td>\
						<td deptid="'+ noData(empMSG[i].empDept) +'">'+ noData(empMSG[i].empDept_view) +'</td>\
						<td>'+ noData(setDate(empMSG[i].lastModifiedDate)) +'</td>\
						<td>\
							<a title="编辑" class="updEmpMsg" href="#updEmpBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
							<a title="删除"  href="#delEmpBox" data-toggle="modal"><i class="icon-remove"></i></a>\
							<a title="设置权限" class="grsEmpMsg" href="#grsEmpBox" data-toggle="modal"><i class="icon-cog"></i></a>\
						</td>\
					</tr>';
					}else{
						e +='<tr id="'+ empMSG[i].id +'"userid="'+ noDatan(empMSG[i].userId)+'">\
						<td>'+ (i+1) +'</td>\
						<td>'+ noData(empMSG[i].name) +'</td>\
						<td>'+ noData(empMSG[i].mobile) +'</td>\
						<td>\
							<div class="label label-table label-important">'+
							 empTitle(empMSG[i].empTitle)
							+'</div>\
						</td>\
						<td deptid="'+ noData(empMSG[i].empDept) +'">'+ noData(empMSG[i].empDept_view) +'</td>\
						<td>'+ noData(setDate(empMSG[i].lastModifiedDate)) +'</td>\
						<td>\
							<a title="编辑" class="updEmpMsg" href="#updEmpBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
							<a title="删除"  href="#delEmpBox" data-toggle="modal"><i class="icon-remove"></i></a>\
						</td>\
					</tr>';
						}
				}
			
			$("#empList").html(e);
			//页数123...
			$("#nowPage").html(pageNo);
			$("#totalPage").html(str.resv1lng);
			setID();
			emplength = $("#empList").children().length;
			$('#treeBox >ul >li').find(">div >span").css({"background":"#3a81da","color":"#fff"});
			$('#treeBox >ul >li').find(">div >span").nextAll(".edit_ico").show(50);
				}
			}
		});
		
	//点击+ - 号获取下级部门
	$("#treeBox ul").delegate("span >i","click",function(event){
		event.stopPropagation();
		if($(this).hasClass("icon-plus-sign") && ($('#' + focusID + ' ul').children().length==0)){
			$.ajax({
			url:"/"+app+"/org/dpt/cld",
			data:{sc_parDept:focusID},
			type:'POST',
			success:function(str){
				if(str.responseCode ==0)
					var d ='';
					var e ='';
					//部门信息
					depMSG = str.responseData;
					for(var i=0; i<depMSG.length; i++){
						if(depMSG[i].childNums==0){
							d += ' <li id="'+ depMSG[i].id +'"><div class="list11"><span>'+ depMSG[i].name +'</span>\
									 <a title="编辑" href="#updDepartBox" data-toggle="modal" class="edit_ico updDepartMsg"><i class="icon-pencil"></i></a>\
									 <a title="删除"  href="#delDeptBox" data-toggle="modal" class="edit_ico"><i class="icon-remove"></i></a>\
									 <a title="添加" href="#addDepartBox" data-toggle="modal" class="edit_ico"><i class="icon-plus"></i></a></div>\
									 <ul></ul></li>';
									 }else{
							 d += ' <li id="'+ depMSG[i].id +'"><div class="list11"><span><i class="icon-plus-sign"></i>'+ depMSG[i].name +'</span>\
									 <a title="编辑" href="#updDepartBox" data-toggle="modal" class="edit_ico updDepartMsg"><i class="icon-pencil"></i></a>\
									 <a title="删除"  href="#delDeptBox" data-toggle="modal" class="edit_ico"><i class="icon-remove"></i></a>\
									 <a title="添加" href="#addDepartBox" data-toggle="modal" class="edit_ico"><i class="icon-plus"></i></a></div>\
									 <ul></ul></li>';
										 
										 };
						}
					$('#' + focusID + ' ul').html(d)
						setID();
						$('#' + focusID + ' >ul').show('fast');
						$('#' + focusID).attr('title', 'Collapse this branch').find('i:eq(0)').addClass('icon-minus-sign').removeClass('icon-plus-sign');
						}
					})
					}else if($(this).hasClass("icon-plus-sign")){
						$('#' + focusID + ' >ul').show('fast');
						$('#' + focusID).attr('title', 'Collapse this branch').find('i:eq(0)').addClass('icon-minus-sign').removeClass('icon-plus-sign');
					}else{
						
						$('#' + focusID + ' >ul').hide('fast');
						$('#' + focusID).attr('title', 'Expand this branch').find('i:eq(0)').addClass('icon-plus-sign').removeClass('icon-minus-sign');
							}
					
				})
		

	//获取员工类表～。单部门
	
	function getEmp(){
		$("#treeBox div span").css({"background":"","color":"#333"});
		$("#treeBox div span").nextAll(".edit_ico").hide();
		if(focusID==''){
			$("#"+entID+" >div >span").css({"background":"#3a81da","color":"#fff"});
			$("#"+entID+" >div >span").nextAll(".edit_ico").show(50);
			}else{
			$("#"+focusID+" >div >span").css({"background":"#3a81da","color":"#fff"});
			$("#"+focusID+" >div >span").nextAll(".edit_ico").show(50);
		}
		$.ajax({
			url:"/"+app+"/org/emp/dem",
			data:{sc_empDept:focusID,PAGE_NO:pageNo,PAGE_SIZE:"15"},
			type:'POST',
			success:function(str){
				if(str.responseCode==0){
					//员工信息
					var empMSG = str.responseData;
					var e ='';
					if(empMSG.length>0){
						for(var i=0; i<empMSG.length; i++){
							if(empMSG[i].userId){
							e +='<tr id="'+ empMSG[i].id +'"userid="'+ noDatan(empMSG[i].userId)+'">\
									<td>'+ (i+1) +'</td>\
									<td>'+ noData(empMSG[i].name) +'</td>\
									<td>'+ noData(empMSG[i].mobile) +'</td>\
									<td>\
										<div class="label label-table label-important">'+ empTitle(empMSG[i].empTitle) +'</div>\
									</td>\
									<td deptid="'+ noData(empMSG[i].empDept) +'">'+ noData(empMSG[i].empDept_view) +'</td>\
									<td>'+ noData(setDate(empMSG[i].lastModifiedDate)) +'</td>\
									<td>\
										<a title="编辑" class="updEmpMsg" href="#updEmpBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
										<a title="删除"  href="#delEmpBox" data-toggle="modal"><i class="icon-remove"></i></a>\
										<a title="设置权限" class="grsEmpMsg" href="#grsEmpBox" data-toggle="modal"><i class="icon-cog"></i></a>\
									</td>\
								</tr>';
							}else{
								e +='<tr id="'+ empMSG[i].id +'"userid="'+ noDatan(empMSG[i].userId)+'">\
									<td>'+ (i+1) +'</td>\
									<td>'+ noData(empMSG[i].name) +'</td>\
									<td>'+ noData(empMSG[i].mobile) +'</td>\
									<td>\
										<div class="label label-table label-important">'+ empTitle(empMSG[i].empTitle) +'</div>\
									</td>\
									<td deptid="'+ noData(empMSG[i].empDept) +'">'+ noData(empMSG[i].empDept_view) +'</td>\
									<td>'+ noData(setDate(empMSG[i].lastModifiedDate)) +'</td>\
									<td>\
										<a title="编辑" class="updEmpMsg" href="#updEmpBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
										<a title="删除"  href="#delEmpBox" data-toggle="modal"><i class="icon-remove"></i></a>\
									</td>\
								</tr>';
								}
							}
						
						}else{
							e ='<tr><td colspan="7" style="text-align:center;">该部门下无成员信息，请点击添加新员工继续操作～</td></tr>';
							}
					$("#empList").html(e);
					$("#totalPage").html(str.resv1lng==0? "1":str.resv1lng);
					$("#nowPage").html(pageNo);
					setID();
					}
				
			}
		});
		}
	
	$("#firstPage").click(function(){
		pageNo=1;
		getEmp();
		})
	$("#previousPage").click(function(){
		if(pageNo<=1){
			pageNo=1;
			makeSure("makeSureBox","已到达首页!");
			}else{
				pageNo--;
				$("#nowPage").html(pageNo);
				getEmp();
				}
		})
	
	$("#nextPage").click(function(){
		if(pageNo<$("#totalPage").html()){
			pageNo++;
			$("#nowPage").html(pageNo);
			getEmp();
			}else{
				pageNo=$("#totalPage").html();
				makeSure("makeSureBox","已到达尾页!");
				}
		})
	$("#lastPage").click(function(){
		pageNo=$("#totalPage").html();
		$("#nowPage").html(pageNo);
		getEmp();
		})
	$("#jumpPage").click(function(){
		pageNo=$("#goPage").val();
		if(pageNo>0 && pageNo <= $("#totalPage").html()){
			getEmp();
			}else{
				makeSure("makeSureBox","超出范围!");
				pageNo =$("#nowPage").val();
				}
		})
	
	$(document).delegate("#treeBox ul span","click",function(event){
		event.stopPropagation();
		pageNo=1;
		getEmp();
	});	
		
		
		
	//部门添加 ～
	
	

	checkForm("addDepartBox")
	
	
	$("#addDepart").click(function(){
		if(checkForm2("addDepartBox"))
		$.ajax({
		url:"/"+app+"/org/dpt/add",
		data:{parDept:focusID,name:$("#departName").val()},
		type:'POST',
		success:function(str){
			if(str.responseCode == 0){
				$("#addDepartBox,.modal-backdrop").hide();
				$(".text-error").html('');
				if(focusID==''){
						$('#treeBox ul li ul').html($('#treeBox ul li ul').html() +'<li id="'+ str.responseData +'">\
									<div class="list11"><span>'+ $("#departName").val() +'</span>\
									<a title="编辑" href="#updDepartBox" data-toggle="modal" class="edit_ico updDepartMsg"><i class="icon-pencil"></i></a>\
									<a title="删除"  href="#delDeptBox" data-toggle="modal" class="edit_ico depDEL"><i class="icon-remove"></i></a>\
									<a title="添加" href="#addDepartBox" data-toggle="modal" class="edit_ico"><i class="icon-plus"></i></a></div>\
								<ul></ul></li>')
					}else if($('#'+focusID +' >ul').children().length!=0 || ($('#'+ focusID+' .list11 span').find('>i').hasClass('icon-minus-sign'))){

						$('#'+ focusID +' ul').html($('#'+ focusID +' ul').html() +'<li id="'+ str.responseData +'">\
									<div class="list11"><span>'+ $("#departName").val() +'</span>\
									<a title="编辑" href="#updDepartBox" data-toggle="modal" class="edit_ico updDepartMsg"><i class="icon-pencil"></i></a>\
									<a title="删除"  href="#delDeptBox" data-toggle="modal" class="edit_ico depDEL"><i class="icon-remove"></i></a>\
									<a title="添加" href="#addDepartBox" data-toggle="modal" class="edit_ico"><i class="icon-plus"></i></a></div>\
								<ul></ul></li>')
					}else if(focusID!='' && !($('#'+ focusID+' .list11 span').find('>i').hasClass('icon-plus-sign'))){
					$('#'+ focusID+' .list11 span').html('<i class="icon-plus-sign"></i>'+ $('#'+ focusID+' .list11 span').html());
					}
				}
				setID();
			}
		})
	})
	//部门删除
	$("#delDept").click(function(){
			$.ajax({
			url:"/"+app+"/org/dpt/del",
			data:{id:focusID},
			type:'POST',
			success:function(str){
				$("#delDeptBox,.modal-backdrop").hide();
				if(str.responseCode == 0){
					$('#'+focusID).remove();
					}else{
						makeSure("makeSureBox","删除部门失败!");
						}
				}
			})
		})
	deptTree(entID,"deptC","updEmpDept");
	//设置权限
	$("#SUPER").click(function(){
		if($(this).is(":checked")){
			for(var i=1; i<$("#grsEmpForm input").length;i++){
				$("#grsEmpForm input").eq(i).attr("disabled","true");
				$("#grsEmpForm input").eq(i).removeAttr("checked");
				}
			}else{
					$("#grsEmpForm input").removeAttr("disabled");
					$("#grsEmpForm input[value='']").prop("checked","true");
					}
		})
	$("#empList").delegate(".grsEmpMsg","click",function(){
		var arrMsg= [];
		var strMsg= '';
		$("#grsEmpForm #SUPER").removeAttr("checked");
		if(!$("#grsEmpForm input").val()){
			$(this).removeAttr("checked")
			}
		
		empId = $(this).parent().parent().attr("id");
		$.ajax({
		url:"/"+app+"/sys/url/grs",
		data:{empId:empId},
		type:'POST',
		success:function(str){
			console.log(str)
			if(str.responseCode==0){
				strMsg =str.resv1str?str.resv1str:"";
				arrMsg = strMsg.split(":");
				if(arrMsg[0]=="SUPER" && arrMsg.length==1){
						for(var i=1; i<$("#grsEmpForm input").length;i++){
							$("#grsEmpForm input").eq(0).prop("checked","true")
							$("#grsEmpForm input").eq(i).attr("disabled","true");
							$("#grsEmpForm input").eq(i).removeAttr("checked");
							}
					}else{
						$("#grsEmpForm input").removeAttr("disabled");
						for(var i = 0; i<arrMsg.length; i++){
							$("#grsEmpForm input[id='"+arrMsg[i]+"']").prop("checked","true");
							}
						}
				
					}
				}
			})
		})

	//修改权限
	$("#grsEmp").click(function(){
		checkVal='';
		for(var i=0;i<$("#grsEmpForm input").length;i++){
			if($("#grsEmpForm input").eq(i).is(':checked')){
				checkVal+=$("#grsEmpForm input").eq(i).val()+':';
				}
			}
		$.ajax({
		url:"/"+app+"/sys/url/srl",
		data:{"empId":empId,"roleIds":checkVal},
		type:'POST',
		success:function(str){
			if(str.responseCode==0){
				$("#grsEmpBox,.modal-backdrop").hide();
					}
				}
			})
		})
		
		
	var bl=true;
	//获取员工信息
	$("#empList").delegate(".updEmpMsg","click",function(){
		clickID = $(this).parent().parent().attr("id");
		if(bl==true){
			empTree(entID,"empC","updEmpSuperior","empList2",clickID);
			bl=false;
			}
		$("#choseDept").click(function(){
			$("#deptC").show("fast");
			})
		$("#choseEmp").click(function(){
			$("#empC").show("fast");
			})
		$("span .close").click(function(){
			$(this).parent().hide("fast");
			})
			
		
		$.ajax({
		url:"/"+app+"/org/emp/get",
		data:{id:clickID},
		type:'POST',
		success:function(str){
			if(str.responseCode ==0){
			if(str.responseData.userOpen == "Y"){
				$("#opnEmp").attr("disabled",true);
				}else{
					$("#opnEmp").removeAttr("disabled");
					}
			
			var depName = focusID==''?'':$("#"+focusID +" td").eq(4).html();
			$("#updEmpName").val(str.responseData.name);//名字
			$("#updEmpMobile").val(str.responseData.mobile);//手机号
			$("#updEmpEmail").val(str.responseData.email);//邮箱
			$("#updEmpTitle").val(str.responseData.empTitle);//员工职级别
			$("#updEmpDept").val(depName);//所属部门
			$("#updEmpDept").attr("deptid",str.responseData.empDept)
			$("#updEmpPos").val(str.responseData.empPos);//员工岗位
			$("#updEmpSuperior").val(str.responseData.superior_view);//汇报对象
			$("#updEmpNo").val(str.responseData.empNo);//员工编号
			$("#updEmpStatus").val(str.responseData.empStatus);//员工状态
		    $("#updEmpFrom").val(setDate(str.responseData.empFrom));//合同起始日期yyyy-mm-dd
		    $("#updEmpThru").val(setDate(str.responseData.empThru));//合同截止日期
		    $("#updEmpRemark").val(str.responseData.remark);//备注
			setID();
				}
			}
		});
	});
	
	
	//获取部门信息
	$("#treeBox").delegate(".updDepartMsg","click",function(){
		$.ajax({
		url:"/"+app+"/org/dpt/get",
		data:{id:focusID},
		type:'POST',
		success:function(str){
			if(str.responseCode ==0){
				if(str.responseData){
					$("#updDepartName").val(str.responseData.name);
				}else{
					makeSure("makeSureBox","当前项无法修改!");
					$("#delDeptBox,.modal-backdrop").hide();
					}
				}
			}
		});
	});
	//修改部门信息
	

	checkForm("updDeptFrom")
	
	$("#updDepart").click(function(){
		
		if(checkForm2("updDeptFrom"))
		$.ajax({
			url:"/"+app+"/org/dpt/upd",
			data:{id:focusID,name:$("#updDepartName").val()},
			type:'POST',
			success:function(str){
				if(str.responseCode ==0){
				$("#delDeptBox,.modal-backdrop").hide();
				$(".text-error").html('');
				if(str.responseCode == 0){
					$("#updDepartBox,.modal-backdrop").hide();
					$(".text-error").html('');
					if($('#' + focusID +' >.list11 >span >i').hasClass($('#' + focusID +' >.list11 >span i').attr("class"))){
						$('#' + focusID +' >.list11 >span:has(i)').html('<i class="'+ $('#' + focusID +' >.list11 >span i').attr("class") +'"></i>' + $("#updDepartName").val());					}else{
							$('#' + focusID +' >.list11 span').html($("#updDepartName").val());
						}
					}else{
						makeSure("makeSureBox","修改部门失败!");
						}
					}
				}
			})
		})
				
	
	
	
	
	
	//添加员工
	

	checkForm("addEmpFrom")

	$("#addEmp").click(function(){
		emplength = $("#empList").children().length;
		if(checkForm2("addEmpFrom"))
		$.ajax({
		url:"/"+app+"/org/emp/add",
		data:{scpEnt:entID,empDept:clickID,name:$("#empName").val(),mobile:$("#empMobile").val(),email:$("#empMail").val()},
		type:'POST',
		success:function(str){
			var ladtDate=new Date().getTime();
			if(str.responseCode == 0){
				$("#addEmpBox,.modal-backdrop").hide();
				$(".text-error").html('');
				if($("#empList tr").length%15 !=0){
					if($("#empList >tr td").length <2){
						$("#empList").html("");
						$("#empList").html($("#empList").html() + '<tr id="'+str.responseData +'">\
								<td>'+ 1 +'</td>\
								<td>'+ noData($("#empName").val()) +'</td>\
								<td>'+ noData($("#empMobile").val()) +'</td>\
								<td>\
									<div class="label label-table label-important">'+ empTitle($("#updEmpTitle").val()) +'</div>\
								</td>\
								<td>'+ noData($("#"+focusID).find(">div >span").text()) +'</td>\
								<td>'+ setDate(ladtDate) +'</td>\
								<td>\
									<a title="编辑" class="updEmpMsg" href="#updEmpBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
									<a title="删除"  href="#delEmpBox" data-toggle="modal"><i class="icon-remove"></i></a>\
								</td>\
							</tr>')
							makeSure("makeSureBox","添加成功!");
						}else{
							$("#empList").html($("#empList").html() + '<tr id="'+str.responseData +'">\
								<td>'+  (emplength+1) +'</td>\
								<td>'+ noData($("#empName").val()) +'</td>\
								<td>'+ noData($("#empMobile").val()) +'</td>\
								<td>\
									<div class="label label-table label-important">'+ empTitle($("#updEmpTitle").val()) +'</div>\
								</td>\
								<td>'+ noData($("#"+focusID).find(">div >span").text()) +'</td>\
								<td>'+ setDate(ladtDate) +'</td>\
								<td>\
									<a title="编辑" class="updEmpMsg" href="#updEmpBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
									<a title="删除"  href="#delEmpBox" data-toggle="modal"><i class="icon-remove"></i></a>\
								</td>\
							</tr>')
							 makeSure("makeSureBox","添加成功!");
						}
					}else if($("#empList tr").length%15==0){
						if($("#totalPage").html()=='1'){
						    $("#totalPage").html(parseInt($("#totalPage").html())+1);
						}
						makeSure("makeSureBox","添加成功!");
							}
				}else{
					alert("添加失败！")
					}
			}
		})
	})
	$(document).delegate(".icon-remove","click",function(){
		clickID = $(this).parent().parent().parent().attr("id");
		})
	//删除员工
	$("#delEmp").click(function(){
		$.ajax({
		url:"/"+app+"/org/emp/del",
		data:{id:clickID},
		type:'POST',
		success:function(str){
			if(str.responseCode ==0){
				
				if($("#empList tr").length==1 && $("#totalPage").html()>'1'){
					getEmp();
					}else{
					$("#delEmpBox,.modal-backdrop").hide();
					$('#'+clickID).remove();
					}
				}else{
					makeSure("makeSureBox","删除员工失败!");
					}
			}
		})
	})
	
	//编辑完善员工信息
	//用户
	$("#opnEmp").click(function(){
		var $this = $(this);
		$.ajax({
			url:"/"+app+"/org/emp/opn",
			data:{id:clickID},
			type:'POST',
			success:function(str){
				if(str.responseCode=="1"){
					makeSure("makeSureBox","请确认手机号、邮箱输入正确")
					}else if(str.responseCode=="0"){
						$this.attr("disabled","disabled");
						$("#"+ID+" td:last").html($("#"+ID+" td:last").html() +'<a title="设置权限" class="grsEmpMsg" href="#grsEmpBox" data-toggle="modal"><i class="icon-cog"></i></a>');
						makeSure("makeSureBox","用户成功，初始密码：000000");
						$("#"+focusID).attr("userid",noDatan(str.responseData));
						}
				}
			});

	})
	

	checkForm("updEmpForm")

	$("#updEmp").click(function(){
		if(checkForm2("updEmpForm"))
		$.ajax({
		url:"/"+app+"/org/emp/upd",
		data:{id:clickID,
			name:$("#updEmpName").val(),//名字
			mobile:$("#updEmpMobile").val(),//手机号
			email:$("#updEmpEmail").val(),//邮箱
			empTitle:$("#updEmpTitle").val(),//员工职级
			empDept:$("#updEmpDept").attr("depid"),//所属部门
			empPos:$("#updEmpPos").val(),//员工岗位
			superior:$("#updEmpSuperior").attr("empid"),//回报对象
			empNo:$("#updEmpNo").val(),//员工编号
			empStatus:$("#updEmpStatus").val(),//员工状态
		    empFrom:$("#updEmpFrom").val(),//合同起始日期yyyy-mm-dd
		    empThru:$("#updEmpThru").val(),//合同截止日期
		    remark:$("#updEmpRemark").val()//备注
			},
		type:'POST',
		success:function(str){
			if(str.responseCode ==0){
				$("#updEmpBox,.modal-backdrop").hide();
				$(".text-error").html('');
				$('#'+clickID).html('<td>'+ $('#'+clickID+' td').eq(0).html() +'</td>\
						<td>'+ noData($("#updEmpName").val()) +'</td>\
						<td>'+ noData($("#updEmpMobile").val()) +'</td>\
						<td>\
							<div class="label label-table label-important">'+ empTitle($("#updEmpTitle").val()) +'</div>\
						</td>\
						<td>'+ noData($("#updEmpDept").val()) +'</td>\
						<td>'+ noData(setDate(new Date())) +'</td>\
						<td>\
							<a title="编辑" class="updEmpMsg" href="#updEmpBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
							<a title="删除"  href="#delEmpBox" data-toggle="modal"><i class="icon-remove"></i></a>\
						</td>');
						
				}else{
					makeSure("makeSureBox","编辑失败！")
					}
			}
		})
	})
})