
$(function(){
	
	
	$(pageInit);
	function pageInit()
	{
		$('#forumContent').xheditor({upImgUrl:"uploadthumb.php",upImgExt:"jpg,jpeg,gif,png"});
		$('#forumContent1').xheditor({upImgUrl:"uploadthumb.php",upImgExt:"jpg,jpeg,gif,png"});
		}
	function insertUpload(arrMsg)
	{console.log(arrMsg)
		var i,msg;
		for(i=0;i<arrMsg.length;i++)
		{
			msg=arrMsg[i];
			$("#uploadList").append('<option value="'+msg.id+'">'+msg.localname+'</option>');
		}
	}
	
	var titleId='';
	var cName='';
	$('#searchBtn').click(function(){
		 titleId=$("#forumBox").val();
		 cName=$('#forumName').val();
		 getList(titleId,cName);
	})
	
	
	//	-------------------------------------------------------------------------- 获取话题列表 ----------------------------------------------------------------------
	var pageNo=1;
	getList(titleId,cName);
	function getList(titleId,cName){
		
		$.ajax({
			url:'/xerpweb/oa/tpc/qry',
			data:{
				"PAGE_SIZE":"10",
				"PAGE_NO":pageNo,
				"titleId":titleId,
				"cName":cName
			},
			type:'POST',
			success:function(str){
				console.log(str)
				if(str.responseData)
					$('#contList').html('');
				if(str.responseCode==0){
					var string='';
					if(str.responseData.length>0){
						
						for(var i=0;i<str.responseData.length;i++){		
							
							string += '  <tr id='+ str.responseData[i].id +' status='+str.responseData[i].status+' beTop='+str.responseData[i].beTop+'>\
							     <td style="width:220px;">\
							       <a  style="display:block;width:200px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;" href="reply_list.html?forumId='+str.responseData[i].id+'">'+noData(str.responseData[i].title)+'</a>\
							     </td>\
							     <td>'+noData(str.responseData[i].bizUser_view)+'</td>\
	                             <td>'+noData(str.responseData[i].sttNumsRead)+'</td>\
	                             <td>'+noData(str.responseData[i].sttNumsReply)+'</td>\
	                             <td>'+noData(setDate(str.responseData[i].createdDate))+'</td>\
	                             <td>'+noData(setDate(str.responseData[i].lastModifiedDate))+'</td>\
	                             <td>\
	                               <a title="编辑" class="updContBox" href="#updContBox" data-toggle="modal"><i class="icon-pencil"></i></a>\
	                             </td>\
	                             <td><i style="cursor:pointer" class="icon-arrow-up"><img src=""></i></td>\
	                          </tr> ';					 
						
					
					}	
						
					}else{
						string+='<tr><td colspan="10" style="text-align:center">无数据</td></tr>'
					}
					$('#contList').html(string);
					for(var i=0;i<$("#contList tr").length;i++){
						if($("#contList tr").eq(i).attr("status")=="01"){
							$("#contList tr").eq(i).children().eq(0).children().attr("href","javascript:;")
							$("#contList tr").eq(i).children().eq(0).children().css("color","#000")
							$("#contList tr").eq(i).children().eq(0).children().css("text-decoration","none")
							$("#contList tr").eq(i).children().eq(6).children().css("display","block")
						}else{
							$("#contList tr").eq(i).children().eq(0).children().css("text-decoration","underline")
							$("#contList tr").eq(i).children().eq(0).children().css("color","#08c")
							$("#contList tr").eq(i).children().eq(6).children().css("display","none")
							$("#contList tr").eq(i).children().eq(0).children().attr("href","reply_list.html?forumId="+$("#contList tr").eq(i).attr("id"))
						}
						if($("#contList tr").eq(i).attr("beTop")=="Y"){
							$("#contList tr").eq(i).children().eq(7).children().attr("class","iconup1")
							$("#contList tr").eq(i).children().eq(7).children().children().attr("src","../../static/images/upload.gif")
						}else{
							$("#contList tr").eq(i).children().eq(7).children().attr("class","icon-arrow-up")
							$("#contList tr").eq(i).children().eq(7).children().children().attr("src","")
						}
					}
					
					if(str.resv1lng==0){
						$("#nowPage").html(1)	
					}else{
						$("#nowPage").html(pageNo)	
					}
					$('#totalPage').html(str.resv1lng==0?1:str.resv1lng);
				}else{
					console.log("获取失败")
				}
			}					
		});
	
	}
	$("#firstPage").click(function(){
		pageNo=1;
		getList();
		})
	$("#prevPage").click(function(){
		pageNo--;
		if(pageNo<1){
			pageNo=1;
			makeSure("makeSureBox","已经是第一页了~");
			return false;
			}else{
				getList();
			}
		})
	
	$("#nextPage").click(function(){
		pageNo++;
		if(pageNo>$("#totalPage").html()){
			pageNo=$("#totalPage").html();
			makeSure("makeSureBox","已经是最后一页了~");
			return false;
			}else{
				getList();
				}
		})
	$("#lastPage").click(function(){
		pageNo=$("#totalPage").html();
		getList();
		})
	$("#jumpPage").click(function(){
		pageNo=$("#goPage").val();
		if(pageNo>0 && pageNo <= $("#totalPage").html()){
			getList();
			}else{
				makeSure("makeSureBox","超出范围~");
				pageNo =$("#nowPage").val();
				}
		});		
	
	
$(document).delegate("#contList tr",'click',function(){
		$("#contList tr").css("background","")
		$(this).css("background","rgb(232, 242, 254)")
})
	
	//-----------------------------------------新建话题-----------------------------------------------------------------------------------
	
	$("#saveForum").click(function(){
		if($("#forumTitle").val()!=""  &&  $("#forumContent").val()!==""){
		$.ajax({
			url:'/xerpweb/oa/tpc/add',
			data:{
			 "title"        :$("#forumTitle").val(),
			 "content"      :$("#forumContent").val(),
			},
			type:'POST',
			success:function(str){
				if(str.responseCode==0){
					makeSure("makeSureBox","话题添加成功!");
					$("#addContBox, .modal-backdrop").hide();
					$('#addContBox input,  #addContBox select, #addContBox textarea').val('');
					getList()
				}
			}
		})
		}else{
			alert("请输入标题或内容")
			return false;
		}
		
	})
	
//--------------------------------------新增话题end----------------------------------------------------------------------------------
	
	
//-------------------------------------------------------------------------- 修改获取话题信息 ---------------------------------------------------------------------
	
	
	$(document).delegate('.updContBox','click',function(){
		var id=$(this).parent().parent().attr('id');
		$.ajax({
			url:'/xerpweb/oa/tpc/get',
			data:{
				id:id
			},
			type:'POST',
			success:function(str){
				 $("#forumTitle1").val(str.responseData.title);  
				 $("#forumContent1").val(str.responseData.content); 
				 $("#forumTitle1").attr("titleId",str.responseData.id)
				if(str.responseData.status=="10"){
					$("#updForum").hide()
					$("#subForum").hide()
				}else{
					$("#updForum").show()
					$("#subForum").show()
				}
			}
		})

	});
	
	
//-------------------------------------------------------------------------- 修改提交话题信息 ---------------------------------------------------------------------


$('#updForum').click(function(){
	$.ajax({
		url:'/xerpweb/oa/tpc/upd',
		data:{
			 "id"           :$("#forumTitle1").attr("titleId"),
			 "title"        :$("#forumTitle1").val(),
			 "content"      :$("#forumContent1").val(),
		},
		type:'POST',
		success:function(str){
			makeSure("makeSureBox","话题修改成功!");
			$("#updContBox, .modal-backdrop").hide();
			$('#updContBox input,  #addContBox select, #addContBox textarea').val('');
			 getList()	
		}
	})
  })

  
  
//--------------------------------------------------------------------------发布话题信息 ---------------------------------------------------------------------


  $('#subForum').click(function(){
  	$.ajax({
  		url:'/xerpweb/oa/tpc/smt',
  		data:{
  			 "id"           :$("#forumTitle1").attr("titleId"),
  		},
  		type:'POST',
  		success:function(str){
  			makeSure("makeSureBox","话题发布成功!");
  			$("#updContBox, .modal-backdrop").hide();
  			$('#updContBox input,  #addContBox select, #addContBox textarea').val('');
  			getList()	
  			$("#"+$("#forumTitle1").attr("titleId")).attr("status","10")
  		}
  	})
  	
  	
    })
//--------------------------------------------------------------------------置顶话题信息 ---------------------------------------------------------------------

$(document).delegate('.icon-arrow-up','click',function(){
	  var id=$(this).parent().parent().attr('id');
	  var beTop=$(this).parent().parent().attr('beTop');
	  console.log(id);
  	$.ajax({
  		url:'/xerpweb/oa/tpc/top',
  		data:{
  			 "sc_id"           :id,
  			 "beTop"           :beTop
  		},
  		type:'POST',
  		success:function(str){
  			console.log(str);
  			makeSure("makeSureBox","话题置顶成功!");
  			getList()	
  			
  		}
  	})
  	
  	
    })
	//--------------------------------------------------------------------------置顶话题信息 ---------------------------------------------------------------------

$(document).delegate('.iconup1','click',function(){
	  var id=$(this).parent().parent().attr('id');
	  var beTop=$(this).parent().parent().attr('beTop');
	  console.log(id);
  	$.ajax({
  		url:'/xerpweb/oa/tpc/top',
  		data:{
  			 "sc_id"           :id,
  			 "beTop"           :beTop
  		},
  		type:'POST',
  		success:function(str){
  			console.log(str);
  			makeSure("makeSureBox","话题取消置顶!");
  			getList()	
  			
  		}
  	})
  	
  	
    })
})