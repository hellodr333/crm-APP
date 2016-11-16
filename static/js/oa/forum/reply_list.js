
$(function(){
	$(pageInit);
	function pageInit()
	{
		$('#forumContent').xheditor({upImgUrl:"uploadthumb.php",upImgExt:"jpg,jpeg,gif,png"});
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
	var forumID = GetQueryParam("forumId");

	//	-------------------------------------------------------------------------- 获取回复列表 ----------------------------------------------------------------------
	var pageNo=1;
	getList();
	function getList(){
		$.ajax({
			url:'/xerpweb/oa/dsc/qry',
			data:{
				"sc_topicId":forumID,
				"PAGE_SIZE":"2",
				"PAGE_NO":pageNo,
			},
			type:'POST',
			success:function(str){
				console.log(str);
				if(str.responseCode==0){
				//楼主信息，楼主话题内容	
					var userResult=str.resv2str.split("`");
						$("#forumTitle").html(str.resv3str);
						$("#subComments").html(str.resv4str);
						$("#subData").html(userResult[0]);
					    $("#userComment").html(userResult[1]);
				//回复信息列表	    
					var string='';
					if(str.responseData.length>0){
						for(var i=0;i<str.responseData.length;i++){	
							string += ' <div class="clearfix" style="border-bottom:1px solid #eee;margin-bottom:30px;padding-bottom:20px;">\
								          <div class="span2"  style="background:#ccc;height:120px;text-align:center;position:relative"">\
												<img id="userImg" style="position:absolute;top:10px;right:0;left:0;margin:auto;display:block;width:80px;height:80px;background:red;">\
									            <span id="userComment" style="position:absolute;bottom:5px;right:0;left:0;margin:auto;">'+str.responseData[i].discussName_view+'</span>\
												</div>\
								          <div class="span9">\
								            <div style="margin-bottom:40px;">\
								                 <span class="pull-left" id="subData">'+setDate(str.responseData[i].createdDate)+'</span>\
								                 <span class="pull-right" id="replyUser">'+(i+1)+'楼</span>\
								            </div>\
								            <div class="clearfix"style="padding-bottom:10px">'+noDatan(str.responseData[i].comments)+'</div>\
								          </div>\
								       </div>';	
							}				 
					}	
					$('#subCommentU').html(string);
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
	
	//-----------------------------------------新建回复-----------------------------------------------------------------------------------
	$("#replyForum").click(function(){
		if($("#forumContent").val()!=""){
			$.ajax({
				url:'/xerpweb/oa/dsc/add',
				data:{
				 "topicId"      :forumID,
				 "comments"      :$("#forumContent").val(),
				},
				type:'POST',
				success:function(str){
					console.log(str);
					if(str.responseCode==0){
						makeSure("makeSureBox","回复添加成功!");
						$('#forumContent').val('');
						getList();
					}
				}
			})
		}
	})
	
//--------------------------------------新增回复end----------------------------------------------------------------------------------
	
		
	
})