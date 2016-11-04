function empTree(entpriseID,treeBoxID,showBoxID,empListBox,ID){
	var entpriseID = entpriseID;
	var ID = ID;
	var focusID='';
	var scDeptID='';
	var clickID='';
	var pageNo=1;
	var  pagecount=0;
	
	//获取信息
	$.ajax({
		url:"/"+app+"/org/ent/eoe",
		data:{sc_entId:entpriseID, sc_deptId:"",PAGE_SIZE:"15"},
		type:'POST',
		success:function(str){
			pagecount=str.resv1lng;
			//部门信息
			var depMSG = str.responseData.departs;
			//员工信息
			var empMSG = str.responseData.employees;
			console.log(depMSG)
			var d ='';
			var e ='';
			//企业获取～。12345
			deptStr = '\
			<li deptID="'+ entpriseID +'"><div class="list11"><span><i class="icon-folder-open"></i>'+ str.responseData.entName +'</span>\
			</div><ul></ul></li>';
			
			$("#"+treeBoxID+" ul").html(deptStr);
			//部门获取～。12345
			for(var i=0; i<depMSG.length; i++){
				if(depMSG[i].childNums==0){
				d += ' <li deptID="'+ depMSG[i].id +'"><div class="list11"><span>'+ depMSG[i].name +'</span>\
						 </div>\
						 <ul></ul></li>';
							 
							 }else{
					d += ' <li deptID="'+ depMSG[i].id +'"><div class="list11"><span><i class="icon-plus-sign"></i>'+ depMSG[i].name +'</span>\
						 </div>\
						 <ul></ul></li>';			 
								 
								 }
				}
			$("#"+treeBoxID+" >ul li ul").html(d);
			//员工的OK～。
			for(var i=0; i<empMSG.length; i++){
				e +='<tr empid="'+ empMSG[i].id +'">\
						<td>'+ noData(empMSG[i].name) +'</td>\
						<td>\
							<div class="label label-table label-important">'+ empTitle(empMSG[i].empTitle) +'</div>\
						</td>\
						<td deptid="'+ noData(empMSG[i].empDept) +'">'+ noData(empMSG[i].empDept_view) +'</td>\
					</tr>';
				}
			
			$("#empList2").html(e);
			}
		});
		
	//点击+ - 号获取下级部门
	$("#"+treeBoxID+" ul").delegate("span >i","click",function(event){

		event.stopPropagation();
		
		clickID =$(this).parent().parent().parent().attr("deptid");
		
		if($(this).hasClass("icon-plus-sign") && ($('li[deptid="'+ clickID +'"] >ul').children().length==0)){
			$.ajax({
			url:"/"+app+"/org/dpt/qry",
			data:{sc_entId:entpriseID, sc_parDept:clickID},
			type:'POST',
			success:function(str){
				var d ='';
				//部门信息
				depMSG = str.responseData;
				for(var i=0; i<depMSG.length; i++){
					if(depMSG[i].childNums==0){
						d += ' <li deptID="'+ depMSG[i].id +'"><div class="list11"><span>'+ depMSG[i].name +'</span>\
								 </div>\
								 <ul></ul></li>';
								 }else{
						 d += ' <li deptID="'+ depMSG[i].id +'"><div class="list11"><span><i class="icon-plus-sign"></i>'+ depMSG[i].name +'</span>\
								 </div>\
								 <ul></ul></li>';
									 
									 };
					}
					$('li[deptid="'+ clickID +'"] >ul').html(d)
					$('li[deptid="'+ clickID +'"] >ul').show('fast');
					$('li[deptid="'+ clickID +'"]').attr('title', 'Collapse this branch').find('i:eq(0)').addClass('icon-minus-sign').removeClass('icon-plus-sign');
					}
				})}else if($(this).hasClass("icon-plus-sign")){
					$('li[deptid="'+ clickID +'"] >ul').show('fast');
					$('li[deptid="'+ clickID +'"]').attr('title', 'Collapse this branch').find('i:eq(0)').addClass('icon-minus-sign').removeClass('icon-plus-sign');
				}else{
					$('li[deptid="'+ clickID +'"] >ul').hide('fast');
					$('li[deptid="'+ clickID +'"]').attr('title', 'Expand this branch').find('i:eq(0)').addClass('icon-plus-sign').removeClass('icon-minus-sign');
					}
				
				})
				//获取员工类表～。单部门
	
	function getEmpTree(){
		$('li[deptID]').find("div span").css({"background":"","color":"#333"})
		if(clickID==''){
			$('li[deptID="'+ entpriseID +'"]').find(">div >span").css({"background":"#3a81da","color":"#fff"});
			}else{
			$('li[deptID="'+ clickID +'"]').find(">div >span").css({"background":"#3a81da","color":"#fff"});
		}
		$.ajax({
			url:"/"+app+"/org/emp/qry",
			data:{sc_scpEnt:entpriseID, sc_empDept:clickID,PAGE_NO:pageNo,PAGE_SIZE:"15"},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseCode==0){
					pagecount=str.resv1lng;
					//员工信息
					var empMSG = str.responseData;
					var e ='';
					if(empMSG.length>0){
						for(var i=0; i<empMSG.length; i++){
							e +='<tr empid="'+ empMSG[i].id +'">\
									<td>'+ noData(empMSG[i].name) +'</td>\
									<td>\
										<div class="label label-table label-important">'+ empTitle(empMSG[i].empTitle) +'</div>\
									</td>\
									<td deptid="'+ noData(empMSG[i].empDept) +'">'+ noData(empMSG[i].empDept_view) +'</td>\
								</tr>';
							}
						
						}else{
							e ='<tr><td colspan="7" style="text-align:center;">该部门下无成员信息，请点击添加新员工继续操作～</td></tr>';
							}
					$("#empList2").html(e);
					$("#totalPage").html(str.resv1lng==0? "1":str.resv1lng);
					$("#nowPage").html(pageNo);
					}
				
			}
		});
		}
		
		$("#"+treeBoxID+" ul").delegate("li","click",function(event){
			event.stopPropagation();
			pageNo=1;
			clickID = $(this).attr("deptID");
			if(clickID==entpriseID){
				clickID='';
				}
			getEmpTree();
			})
		$("#prevpage").click(function(){
			pageNo = pageNo-1;
			if(pageNo<1){
				pageNo=1;
				alert("已经到达第一页")
				}
			getEmpTree();
			})
		$("#nextpage").click(function(){
			pageNo = pageNo+1;
			if(pageNo>pagecount){
				pageNo=pagecount;
				alert("已经到达最后一页")
				}
			getEmpTree();
			})
		$("#"+empListBox).delegate("tr","click",function(event){
			event.stopPropagation();
			
			if(ID == $(this).attr("empid")){
				return;
					}else{			
				$("#"+showBoxID).val($(this).find('>td').text()).attr("empid",$(this).attr("empid"));
				$(this).parent().children().css({"background":"","color":"#333"})
				$(this).css({"background":"#3a81da","color":"#fff"})
				}
			})	
		
	}
	
	
	
	
	
	
	
	
	