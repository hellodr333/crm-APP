$(function(){
	var pageNO = 1;
	//获取
	qryList();
	//查询
	
	$("#searchBtn").click(function(){
		pageNO=1;
		qryList();
		})
	function qryList(){
		$.ajax({
			 type: "get",
             url:'http://192.168.18.68/xfile/FIL/mta/qry',
             dataType:"jsonp",
             jsonp:"callback",
			 data:{},
             success:function(data){
                 console.log(data);
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
		
		$("#file_uploader").uploadify({
			"swf" : "../../static/images/uploadify.swf",
			"uploader" : "http://192.168.18.68/xfile/FIL/mta/upload?user=uid_01&fileTypeCode=01",
			"method" : "post",
			"buttonText" : "file select",
			"fileObjName" : "file",
			"preventCaching" : true,
			"multi" : true,
			"debug" : false,
	        "fileSizeLimit" : "1GB",
			"fileTypeDesc" : "ALL Files",
			"fileTypeExts" : "*.*",
			"progressData" : "speed",//"percentage"
			"queueID" : "file-queue",
			"removeCompleted" : false,
			"successTimeout" : 3600,
			"width" : 350,
			"height" : 70,
			"overrideEvents" : [ "onDialogClose", "onUploadError", "onSelectError" ],
			"onUploadSuccess" : function(file, data, response) {
				alert(data);
			},
			"onSelectError" : function(file, errorCode, errorMsg) {
				 var msgText = file.name + "upload failure\n";
			        switch (errorCode) {
			            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
			                //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
			                msgText += "max files: " + this.settings.queueSizeLimit + "";
			                break;
			            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			                msgText += "max file size( " + this.settings.fileSizeLimit + " )";
			                break;
			            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			                msgText += "file size is 0";
			                break;
			            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			                msgText += "file type not valid,only : " + this.settings.fileTypeExts;
			                break;
			            default:
			                msgText += "error:：" + errorCode + "\n" + errorMsg;
			        }
			        alert(msgText);
			},
			"onUploadError":function(file, errorCode, errorMsg, errorString){
				// 手工取消不弹出提示
		        if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
		                || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
		            return;
		        }
		        var msgText = file.name + "failure\n";
		        switch (errorCode) {
		            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
		                msgText += "HTTP error\n" + errorMsg;
		                break;
		            case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
		                msgText += "file missing,reupload please";
		                break;
		            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
		                msgText += "IO error";
		                break;
		            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
		                msgText += "security error\n" + errorMsg;
		                break;
		            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
		                msgText += "max files: " + this.settings.uploadLimit + "个";
		                break;
		            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
		                msgText += errorMsg;
		                break;
		            case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
		                msgText += "file not found";
		                break;
		            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
		                msgText += "param error";
		                break;
		            default:
		                msgText += "file:" + file.name + "\nerror:" + errorCode + "\n"
		                        + errorMsg + "\n" + errorString;
		        }
		        alert(msgText);
		    }
		});
})
	