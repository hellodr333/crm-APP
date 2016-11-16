
$(function(){
	
	$('#txtdatetimeshow').val(getNowFormatDate3(new Date()))
	$('#evtStartTime').val(getNowFormatDate2(new Date()))
	$('#evtEndTime').val(getNowFormatDate2(new Date()))
	$('#evtStartDate').val(getNowFormatDate2(new Date()))
	$('#repeat_end_parm3').val(getNowFormatDate3(new Date()))
	$('#repeat_start').val(getNowFormatDate3(new Date()))
	
	
	$.jeDate("#repeat_start",{
		format:"YYYY-MM-DD ",
		isTime:false,
		minDate:"2000-00-00",
		zIndex:93000,
	})
	
	
	$.jeDate("#txtdatetimeshow",{
		format:"YYYY-MM-DD ",
		isTime:false,
		minDate:"2000-00-00",
		zIndex:93000,
	})
	

	$.jeDate("#evtStartTime",{
		format:"YYYY-MM-DD hh:mm",
		isTime:true,
		minDate:"2000-00-00 00:00",
		zIndex:93000,
	})
	
	$.jeDate("#evtEndTime",{
		format:"YYYY-MM-DD hh:mm",
		isTime:true,
		minDate:"2000-00-00 00:00",
		zIndex:93000,
	})
	
	$.jeDate("#repeat_end_parm3",{
		format:"YYYY-MM-DD ",
		isTime:false,
		minDate:"2000-00-00",
		zIndex:93000,
	})
	
	
	
	$('#dateBtns .btn').eq(1).css({'background':'#3a81da','color':'#fff'})
	$('#dateBtns .btn').click(function(){
		$('#dateBtns .btn').css({'background':'#fff','color':'#333'});
		$(this).css({'background':'#3a81da','color':'#fff'});
	})
	
	
	$('#repeatBox').hide();
	$('#beRepeat').click(function(){
		if(($('#beRepeat').is(":checked"))){
				$('#repeatBox').show();
		}else{
			$('#repeatBox').hide();
		}
	});
	$('#repeatBox1').hide();
	$('#beRepeat1').click(function(){
		if(($('#beRepeat1').is(":checked"))){
				$('#repeatBox1').show();
		}else{
			$('#repeatBox1').hide();
		}
	})
	
	
	
//	==========================================================显示日程框=========================================
	
	
	var view="week";                     
    var DATA_FEED_URL = '/'+app+ '/oa/cev/qry';
    var op = {
        view: view,
        theme:3,
        showday: new Date(),
        EditCmdhandler:Edit,
        DeleteCmdhandler:Delete,
        ViewCmdhandler:View,    
        onWeekOrMonthToDay:wtd,
        onBeforeRequestData: cal_beforerequest,
        onAfterRequestData: cal_afterrequest,
        onRequestDataError: cal_onerror, 
        autoload:true,
       url:DATA_FEED_URL + "?showMode=week", 
        quickAddUrl:  '/'+app+ '/oa/cev/add', 
       /* quickUpdateUrl: DATA_FEED_URL + "?method=update", */
        quickDeleteUrl: '/'+app+ '/oa/cev/del'   
    };
    
    var $dv = $("#calhead");
    var _MH = document.documentElement.clientHeight;
    var dvH = $dv.height() + 2;
    op.height = _MH - dvH;
    op.eventItems =[];

    var p = $("#gridcontainer").bcalendar(op).BcalGetOp();
    if (p && p.datestrshow) {
        $("#txtdatetimeshow").text(p.datestrshow);
    }
    $("#caltoolbar").noSelect();
   
    function cal_beforerequest(type){
        var t="加载数据...";
        switch(type)
        {
            case 1:
                t="加载数据...";
                break;
            case 2:                      
            case 3:  
            case 4:    
                t="正在处理请求 ...";                                   
                break;
        }
        $("#errorpannel").hide();
        $("#loadingpannel").html(t).show();    
    }
    function cal_afterrequest(type){
        switch(type)
        {
            case 1:
                $("#loadingpannel").hide();
                break;
            case 2:
            case 3:
            case 4:
                $("#loadingpannel").html("加载成功!");
                window.setTimeout(function(){ $("#loadingpannel").hide();},2000);
            break;
        }              
       
    }
    function cal_onerror(type,data){
        $("#errorpannel").show();
    }
    
    $('#editCalendar').hide();
    function Edit(data){
    	console.log(data)
        if(data)
        {
       	//====================获取数据===================
        	$.ajax({
    			url: '/'+app+'/oa/cev/get',
    			data:{
    			 "id":data[0]
    			 //日历
    			},
    			type:'POST',
    			success:function(str){
    				console.log(str);
    				if(str.responseCode==0){
    				
    				}else{
    					console.log('创建失败')
    				}
    			}
    		
    		});
        	
        	$('#editCalendar').css('display','block')
        	$('#backDrop').show();
        	$('#closeEdit').click(function(){
        		$('#editCalendar').css('display','none');
        		$('#backDrop').hide();
        	})
        	
        	$('#editCalendar2').click(function(){
        		//  ==================================提交=========================
        		/*$.ajax(){
        			
        		}*/
        		$('#editCalendar').css('display','none');
        		$('#backDrop').hide();
        	})
        	
        	$('#close1').click(function(){
        		$('#editCalendar').css('display','none');
        		$('#backDrop').hide();
	        })
        
        
            /*OpenModelWindow(url,{ width: 600, height: 400, caption:"修改日程",onclose:function(){
               $("#gridcontainer").reload();
            }});*/
            
            
        }
    }    
    
//    ==========================查看日程===============================
    $('#calendarDetail').css({'display':'none'});
   /* $('#close2').click(function(){
    	$('#calendarDetail').css({'display':'none'});
    	$('#backDrop').hide();
    })*/
    
    function View(data){
    	 if(data){
    		 console.log(data)
         	var start = data[2];
         	var startYear = start.getFullYear();
         	var startMonth = (start.getMonth() + 1) >= 10 ? (start.getMonth() + 1) : ("0" + (start.getMonth() + 1));
         	var startDay =  start.getDate() >= 10 ? start.getDate() : ("0" + start.getDate());
         	var startHours =  start.getHours() >= 10 ? start.getHours() : ("0" + start.getHours());
         	var startMinu =  start.getMinutes() >= 10 ? start.getMinutes() : ("0" + start.getMinutes());
         	var startStr=startYear+'-'+startMonth+'-'+startDay+'  '+startHours+':'+startMinu;
         	
         	var end = data[3];
         	var endYear = end.getFullYear();
         	var endMonth = (end.getMonth() + 1) >= 10 ? (end.getMonth() + 1) : ("0" + (end.getMonth() + 1));
         	var endDay =  end.getDate() >= 10 ? end.getDate() : ("0" + end.getDate());
         	var endHours =  end.getHours() >= 10 ? end.getHours() : ("0" + end.getHours());
         	var endMinu =  end.getMinutes() >= 10 ? end.getMinutes() : ("0" + end.getMinutes());
        	var endStr=endYear+'-'+endMonth+'-'+endDay+'  '+endHours+':'+endMinu;
        	
         	$('#calendarDetail').css({'display':'block'});
         /*	OpenModelWindow(url + "&start=" + startYear + startMonth + startDay + startHours + startMinu 
         		+ "&end=" + endYear + endMonth + endDay + endHours + endMinu, { width: 600, height: 400, caption:"查看日程详细信息"});*/
         	var str='';
         	str+=' <tr>\
	                               <td>日程标题:</td>\
	                                <td>'+data[1]+'</td>\
	                            </tr>  \
	                             <tr>\
	                               <td>开始时间:</td>\
	                                <td>'+startStr+'</td>\
	                            </tr>  \
	                             <tr>\
	                               <td>结束时间:</td>\
	                                <td>'+endStr+'</td>\
	                            </tr>  \
	                             <tr>\
	                               <td>备注</td>\
	                                <td>'+(data[10]=="null"?'-':data[10])+'</td>\
	                            </tr> '
         		
         	$('#calList').html(str)
         	$('#close2').click(function(){
            	$('#calendarDetail').css({'display':'none'});
            })
            
         }
    	 
    	
    /*	$('#backDrop').show();
        $('#close1').click(function(){
        	  $('#viewCalendar').addClass('fade')
        	  $('#backDrop').addClass('hide');
        })
   
     $('#evtSubjectLink').click(function(){
    	 	$('#viewCalendar').addClass('fade')
        	$('#calendarDetail').css({'display':'block'});
        })
        */
    }    
    
 
    
 //================================删除日程===================================
    function Delete(data,callback){   
    	console.log('ccc')
    	var calid = "0";
    	if(data){
    		calid = data[0];
    		var start = data[2];
        	var startYear = ""+start.getFullYear();
        	var startMonth = ""+(start.getMonth() + 1) >= 10 ? (start.getMonth() + 1) : ("0" + (start.getMonth() + 1));
        	var startDay =  ""+start.getDate() >= 10 ? start.getDate() : ("0" + start.getDate());
        	var startHours =  ""+start.getHours() >= 10 ? start.getHours() : ("0" + start.getHours());
        	var startMinu =  ""+start.getMinutes() >= 10 ? start.getMinutes() : ("0" + start.getMinutes());
    		deleteShowDate = startYear + startMonth + startDay + startHours + startMinu;
    		//trace("deleteShowDate=" + deleteShowDate);
    	}
    	if(calid.indexOf("_") > 0){
    		calid = calid.substring(0, calid.indexOf("_"));
    		openRepeatForm(calid, deleteShowDate);		//删除循环任务接口
    	}else {
    	/*	$.alerts.okButton="Ok";  
            $.alerts.cancelButton="Cancel";  */
    		alert("确定要删除该日程吗?")
         /*   hiConfirm("确定要删除该日程吗?", 'Confirm',function(r){ r && callback(0);}); */    
    	}
    	
    }
    
    
    
    function wtd(p){
       if (p && p.datestrshow) {
            $("#txtdatetimeshow").text(p.datestrshow);
        }
        $("#caltoolbar div.fcurrent").each(function() {
            $(this).removeClass("fcurrent");
        })
        $("#showdaybtn").addClass("fcurrent");
    }
    
	//    ============================================按钮点击切换 start ============================================
  //to show day view
    $("#showdaybtn").click(function(e) {
    	view = "day";
        //document.location.href="#day";
        $("#caltoolbar div.fcurrent").each(function() {
            $(this).removeClass("fcurrent");
        })
        $(this).addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("day").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").text(p.datestrshow);
        }
      /*  setSpecialDates(0);*/
    });
    //to show week view
    $("#showweekbtn").click(function(e) {
    	view = "week";
        //document.location.href="#week";
        $("#caltoolbar div.fcurrent").each(function() {
            $(this).removeClass("fcurrent");
        })
        $(this).addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("week").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").text(p.datestrshow);
        }
        /*setSpecialDates(0);*/
    });
    //to show month view
    $("#showmonthbtn").click(function(e) {
    	view = "month";
        //document.location.href="#month";
        $("#caltoolbar div.fcurrent").each(function() {
            $(this).removeClass("fcurrent");
        })
        $(this).addClass("fcurrent");
        var p = $("#gridcontainer").swtichView("month").BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").text(p.datestrshow);
        }
      /*  setSpecialDates(0);*/
    });
	

  
    //======================================创建日程   Add a new event=====================================================
    $('#clear1').click(function(){
    	/*$('#repeatBox input,  #repeatBox testarea').val('')*/
    	$('#repeatBox').hide();
    	return false;
    })
    $('#saveDiary').click(function(){
    	$('#repeatBox').hide();
    	return false;
    })
    
    $("#faddbtn").click(function(e) {
    	
    	$('#saveEditCalendar').click(function(){
    		$.ajax({
    			url: '/'+app+'/oa/cev/add',
    			data:{
    			 "evtSubject" :$("#evtSubject").val(),
    			 "evtStartTime" :$("#evtStartTime").val(),
    			 "evtEndTime"  :$("#evtEndTime").val(),
    			 "beAllDay"  :$("#beAllDay").val(),
    			 "beRepeat"  :$("#beRepeat").val(),
    			 "rptPeriod":$('#REPEAT_TYPE').val(),//重复
    			 "rptNum":$('#REPEAT_NUM').val(),//重复频率
    			 "evtStartDate":$('EVT_START_DATE').val(),  //开始日期
    			 "rptParam":$("#HIDE_REPEAT_PARM").val(),//重复时间
    			 "evtEndDate":$("#HIDE_REPEAT_END_PARM").val(), //结束参数
    			 "evtLocation":$('#evtLocation').val(),
    			 "remark":$('#remark').val()
    			 //日历
    			},
    			type:'POST',
    			success:function(str){
    				console.log(str);
    				if(str.responseCode==0){
    					$("#addCalendar, .modal-backdrop").hide();
    					$('#addCalendar  input,  #addCalendar select, #addCalendar textarea').val('');
    				}else{
    					console.log('创建失败')
    				}
    			}
    		})
    	})
    	
    });
    
    
    
    
//  ================================go to today========================================================   
    $("#showtodaybtn").click(function(e) {
        /*var p = $("#gridcontainer").gotoDate().BcalGetOp();
        if (p && p.datestrshow) {
            $("#txtdatetimeshow").text(p.datestrshow);
        }*/
    	$('#backDrop').removeClass('hide');
    	
   
  });
    
    
//  ================================refresh========================================================   
    $("#showreflashbtn").click(function(e){
        $("#gridcontainer").reload();
       /* setSpecialDates(0);*/
    });
    
    
//  ================================previous date range========================================================   
    $("#sfprevbtn").click(function(e) {
     
    });
    
//  ================================next date range========================================================   
    $("#sfnextbtn").click(function(e) {
     
    
    });
    
    
   //=======================================================================================
    
    
//    =====================================重复日程设置===========================================
    $('#REPEAT_TYPE').change(function(){
    	changerRepeatType();
    })
     $('#repeat_end2').click(function(){
    	 changerSummary();
    })
     $('#repeat_end_parm2').blur(function(){
    	 changerEndNum()
    })
      $('#repeat_end_parm3').blur(function(){
    	 changerEndNum()
    })
    $('#repeat_end').click(function(){
    	 changerSummary();
    })
    $('#repeat_end1').click(function(){
    	 changerSummary();
    })
    $('#REPEAT_NUM').click(function(){
    	 changerSummary();
    })
     $('#chb_repeatDateParm1').click(function(){
    	 changerSummary();
    })
     $('#chb_repeatDateParm2').click(function(){
    	 changerSummary();
    })
    
    
    
    var arrRpt=['chb_weekday1','chb_weekday2','chb_weekday3','chb_weekday4','chb_weekday5','chb_weekday6','chb_weekday7']
    for(var i=0;i<arrRpt.length;i++){
    	$('#'+arrRpt[i]).click(function(){
    		changerSummary();
    	})
    }
  //重复日程设置	start
	function changerSummary(){	//更新摘要内容
		var type = $("#REPEAT_TYPE").val();		//重复类型
		var num = $("#REPEAT_NUM").val();		//重复频率
		var repeatParm = null;					//重复参数
		var repeatEnd = null;					//重复结束参数
		var repeatEnd1 = $("#repeat_end1").attr("checked");
		var repeatEnd2 = $("#repeat_end2").attr("checked");
		var repeatEnd3 = $("#repeat_end3").attr("checked");
		var sumStr = "每";
		if(type == "day"){			//重复每天
			if(num != 1){
				sumStr += "隔  " + num + " ";
			}
			sumStr += "天";
		}else if(type == 2){	//重复工作日
			repeatParm = "WEEK=1,2,3,4,5";
			sumStr += "周  在 工作日";
		}else if(type == 3){	//重复每周1、3、5
			repeatParm = "WEEK=1,3,5";
			sumStr += "周  星期一、星期三和星期五";
		}else if(type == 4){	//重复每周2、4
			repeatParm = "WEEK=2,4";
			sumStr += "周  星期二、星期四";
		}else if(type == "week"){	//重复每周
			if(num != 1){
				sumStr += "隔  " + num + " ";
			}
			sumStr += "周  ";
			repeatParm = "";
			var weekStr = "";
			var allPick = true;
			for(var i = 1; i <= 7; i++){
				var week = $("#chb_weekday" + i).attr("checked");
				if(week){
					if(weekStr != ""){
						weekStr += ("、" + $("#chb_weekday" + i).val());
						repeatParm += "," + i;
					}else {
						weekStr = $("#chb_weekday" + i).val();
						repeatParm += "WEEK=" + i;
					}
				}else {
					allPick = false;
				}
			}
			if(allPick){	//整个星期全选中了
				weekStr = "每天"
			}else {
				if(weekStr.lastIndexOf("、") > 4){
					weekStr = weekStr.substring(0, weekStr.lastIndexOf("、")) + 
						"和" + weekStr.substring(weekStr.lastIndexOf("、") + 1, weekStr.length);
				}
			}	
			sumStr += weekStr;
		}else if(type == "month"){	//重复每月
			if(num != 1){
				sumStr += "  " + num + "  ";
			}
			sumStr += "个月";
			var dateCheck = $("#chb_repeatDateParm1").attr("checked");
			var dateParm1 = $("#chb_repeatDateParm1").val();
			var dateParm2 = $("#chb_repeatDateParm2").val();
			var startDate = $.trim($("#repeat_start").val());	//日程开始日期2011-01-01
			var yyyy = startDate.substring(0, 4);
			var mm = startDate.substring(5, 7) - 1;
			var dd = startDate.substring(8, startDate.length);
			var date = new Date(yyyy, mm, dd);
			if(dateCheck){
				repeatParm = "MONTH=" + date.getDate(); 
				sumStr += "在第  " + date.getDate() + "  天";
			}else {
				var nowDay = date.getDay();		//星期
				var nowDate = date.getDate();	//日期
				var weekNum = Math.ceil((nowDate + 6 - nowDay) / 7); 
				repeatParm = "MONTH=" + weekNum + "," + nowDay; 
				sumStr += "在第  " + weekNum + "  个星期  星期" + nowDay;
			}
		}else if(type == "year"){	//重复每年
			if(num != 1){
				sumStr += "隔  " + num + " ";
			}
			sumStr += "年";
			var startDate = $.trim($("#repeat_start").val());	//日程开始日期2011-01-01
			var mm = startDate.substring(5, 7);
			if(mm.indexOf("0") == 0){ mm = mm.substring(1, mm.length); }
			var dd = startDate.substring(8, startDate.length);
			if(dd.indexOf("0") == 0){ dd = dd.substring(1, dd.length); }
			repeatParm = "YEAR=" + mm + "-" + dd; 
			sumStr += "在  " + mm + "月" + dd + "日";
		}
		if(repeatEnd2){		//判断结束时间
			repeatEnd = "END_NUM=" + $.trim($("#repeat_end_parm2").val());
			sumStr += "，" + $.trim($("#repeat_end_parm2").val()) + "次";
		}else if(repeatEnd3){
			repeatEnd = "END_TIME=" + $.trim($("#repeat_end_parm3").val());
			var parm3 = $.trim($("#repeat_end_parm3").val());
			parm3 = parm3.replace('-','年');
			parm3 = parm3.replace('-','月');
			sumStr += "，直到  " + parm3 + "日";
		}
		$("#tr_summary").text(sumStr);
		$("#HIDE_IS_REPEAT").val("1");				//重复标志
		$("#HIDE_REPEAT_TYPE").val(type);			//重复类型
		$("#HIDE_REPEAT_NUM").val(num);				//重复次数
		$("#HIDE_REPEAT_PARM").val(repeatParm);		//重复参数
		$("#HIDE_REPEAT_END_PARM").val(repeatEnd);	//重复结束参数
	}
    
    
	function changerRepeatType(){	//日程重复类型修改
		$("#tr_repeat_num").hide();
		$("#tr_repeat_date").hide();
		$("#tr_repeat_time").hide();
		var type = $("#REPEAT_TYPE").val();
		if(type == "day"){	//每天
			$("#tr_repeat_num").show();
			$("#REPEAT_NUM").val(1);	//还原到1	
			$("#REPEAT_NUM_STR").text("天");				
		}else if(type == "week"){	//每周
			$("#tr_repeat_num").show();
			$("#tr_repeat_time").show();
			$("#REPEAT_NUM").val(1);
			$("#REPEAT_NUM_STR").text("周");					
		}else if(type == "month"){
			$("#tr_repeat_num").show();
			$("#REPEAT_NUM").val(1);
			$("#REPEAT_NUM_STR").text("个月");	
			$("#tr_repeat_date").show();				
		}else if(type == "year"){
			$("#tr_repeat_num").show();
			$("#REPEAT_NUM").val(1);
			$("#REPEAT_NUM_STR").text("年");				
		}
		changerSummary();	//更新摘要内容
	}
	function changerEndNum(){		//更改结束次数
		var parm = $.trim($("#repeat_end_parm2").val());
		if(isNaN(parm)){
    		$("#repeat_end_parm2").val("0");
       	}
		changerSummary();	//更新摘要内容
	}
	function changerEndDate(){		//更改结束日期
		var parm = $.trim($("#repeat_end_parm3").val());
		if(parm == ""){
			$("#repeat_end1").attr({checked:true});
		}
		changerSummary();	//更新摘要内容
	}
	function clickRepeat(obj){	//重复复选按钮点击
		if(obj.checked){
			$("#HIDE_IS_REPEAT").val(1);
			$("#repeat_tr").show();
		}else {
			$("#HIDE_IS_REPEAT").val(0);
			$("#repeat_tr").hide();
			$("#repeat_span").text("");
		}
	}
	function repeatCancel(){	//取消重复
		var text = $.trim($("#repeat_span").text());
		if(text == ""){
			$("#IsRepeat").attr({checked:false});
		}
		$("#repeat_tr").hide();
	}
	function repeatEnter(){	//确定重复规则
		$("#repeat_tr").hide();
		$("#repeat_span").text($("#tr_summary").text());
	}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	
	
})