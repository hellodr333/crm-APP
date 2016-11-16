// JavaScript Document

	
function deptTree(entpriseID,treeBoxID,showBoxID){
	var entpriseID = entpriseID;
	var focusID='';
	var scDeptID='';
	
	//获取信息
	$.ajax({
		url:"/"+app+"/org/ent/eoe",
		data:{sc_entId:entpriseID, sc_deptId:"",PAGE_SIZE:"15"},
		type:'POST',
		success:function(str){
			//部门信息
			var depMSG = str.responseData.departs;
			//员工信息
			var empMSG = str.responseData.employees;
			console.log(depMSG)
			var d ='';
			var e ='';
			//企业获取～。12345
			deptStr = '\
			<li depid="'+ entpriseID +'"><div class="list11"><span><i class="icon-folder-open"></i>'+ str.responseData.entName +'</span>\
			</div><ul></ul></li>';
			
			$("#"+treeBoxID+" ul").html(deptStr);
			//部门获取～。12345
			for(var i=0; i<depMSG.length; i++){
				if(depMSG[i].childNums==0){
				d += ' <li depid="'+ depMSG[i].id +'"><div class="list11"><span>'+ depMSG[i].name +'</span>\
						 </div>\
						 <ul></ul></li>';
							 
							 }else{
					d += ' <li depid="'+ depMSG[i].id +'"><div class="list11"><span><i class="icon-plus-sign"></i>'+ depMSG[i].name +'</span>\
						 </div>\
						 <ul></ul></li>';			 
								 
								 }
				}
			$("#"+treeBoxID+" >ul li ul").html(d);
			}
		});
		
	//点击+ - 号获取下级部门
	$("#"+treeBoxID+" ul").delegate("span >i","click",function(event){
		event.stopPropagation();
		
		var clickID =$(this).parent().parent().parent().attr("depid");
		if($(this).hasClass("icon-plus-sign") && ($('li[depid="'+ clickID +'"] >ul').children().length==0)){
			$.ajax({
			url:"/"+app+"/org/dpt/qry",
			data:{sc_entId:entpriseID, sc_parDept:clickID},
			type:'POST',
			success:function(str){
				console.log(str)
				var d ='';
				//部门信息
				depMSG = str.responseData;
				for(var i=0; i<depMSG.length; i++){
					if(depMSG[i].childNums==0){
						d += ' <li depid="'+ depMSG[i].id +'"><div class="list11"><span>'+ depMSG[i].name +'</span>\
								 </div>\
								 <ul></ul></li>';
								 }else{
						 d += ' <li depid="'+ depMSG[i].id +'"><div class="list11"><span><i class="icon-plus-sign"></i>'+ depMSG[i].name +'</span>\
								 </div>\
								 <ul></ul></li>';
									 
									 };
					}
					$('li[depid="'+ clickID +'"] >ul').html(d)
					$('li[depid="'+ clickID +'"] >ul').show('fast');
					$('li[depid="'+ clickID +'"]').attr('title', 'Collapse this branch').find('i:eq(0)').addClass('icon-minus-sign').removeClass('icon-plus-sign');
					}
				})}else if($(this).hasClass("icon-plus-sign")){
					$('li[depid="'+ clickID +'"] >ul').show('fast');
					$('li[depid="'+ clickID +'"]').attr('title', 'Collapse this branch').find('i:eq(0)').addClass('icon-minus-sign').removeClass('icon-plus-sign');
				}else{
					$('li[depid="'+ clickID +'"] >ul').hide('fast');
					$('li[depid="'+ clickID +'"]').attr('title', 'Expand this branch').find('i:eq(0)').addClass('icon-plus-sign').removeClass('icon-minus-sign');
					}
				
				})
				$("#"+treeBoxID+" ul").delegate("li","click",function(event){
					$("#"+treeBoxID).find("div span").css({"background":"","color":"#333"})
					$(this).find(">div >span").css({"background":"#3a81da","color":"#fff"})
					event.stopPropagation();
					if(entpriseID==$(this).attr("depID")){
						$("#"+showBoxID).val("");
						}else{
						$("#"+showBoxID).val($(this).find('>.list11 >span').text()).attr("depID",$(this).attr("depID"));
						}
					})
	}