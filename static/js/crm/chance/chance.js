function ajax(url,data,type){
    var bufType = type ? type : "POST";
    var html="";
    $.ajax({
        url: '/' + app + url,
        data:data,
        async:false,
        type: bufType,
        success: function (str) {
            html=str;
        }
    });
    return html;
}




$(function () {
	var  igeo=new Geo(document.getElementById("province") ,document.getElementById("city") ,document.getElementById("county") ,'');
	var  igeo1=new Geo(document.getElementById("province1") ,document.getElementById("city1") ,document.getElementById("county1") ,'');
	
	
	
//	-------------------------------------------------------------------------- 获取机会列表 ----------------------------------------------------------------------

	var userID2='';
	var pageNo=1;

    getList();
    function getList() {
        var str= ajax('/crm/slc/qry', {"DT_SCOPE" :$("#mychnc").is(":checked") ? 2 : 1, "PAGE_SIZE": "10", "PAGE_NO": pageNo});
        setChanceHtml(str);
    }
    function setChanceHtml(str){
        if (str.responseData.length>0) {
        	console.log(str);
            var pageNo=1;
            var string = '';
            for (var i = 0; i < str.responseData.length; i++) {
                string += '  <tr>\
							<td >' + noData(str.responseData[i].chncCust_view) + ' </td>\
							<td>' + noData(str.responseData[i].bizUser_view) + '</td>\
							<td>' + noData(igeo.geoname(str.responseData[i].chncGeo)) + ' </td>\
                            <td>' + noData(str.responseData[i].prodName) + '</td>\
                            <td>' + noData(setChancPhase(str.responseData[i].chncPhase))+ '</td>\
                            <td status="'+str.responseData[i].chncStatus+'">' + noData(setChncStatus(str.responseData[i].chncStatus)) + '</td>\
                            <td>' + noData(setChncResult(str.responseData[i].chncResult)) + '</td>\
                            <td class="text-right">' + noData(str.responseData[i].chncAmount) + '</td>\
                            <td class="text-right">' + noData(str.responseData[i].chncRatio) + '</td>\
                            <td>' + noData(setDate(str.responseData[i].chncStart)) + '</td>\
                            <td>' + noData(setDate(str.responseData[i].chncEnd)) + '</td>\
                            <td>\
                            	<a  class="seeContBox"  href="#seeContBox"  data-toggle="modal" idd="'+str.responseData[i].id+'" status="'+str.responseData[i].chncStatus+'"><i class="icon-eye-open"></i></a>\
                            </td>\
                            <td>\
                        	<a  class=""  href="cust_chance.html?custID='+ str.responseData[i].chncCust +'&chanceId='+str.responseData[i].id +'" ><i class="icon-pencil"></i></a>\
                        </td>\
                        </tr> ';
            }
            if (str.resv1lng == 0) {
                $("#nowPage").html(0)
            } else {
                $("#nowPage").html(pageNo)
                $('#totalPage').html(str.resv1lng);
            }
        }else{
             string += '<tr><td colspan="13" style="text-align:center">无数据</td></tr>'
        }
        $('#empList').html(string);
        
        $(document).delegate("#empList tr",'click',function(){
            $("#empList tr").css("background","");
            $(this).css("background","#e8f2fe")
        })
    }

    $("#firstPage").click(function () {
        pageNo = 1;
        getList();
    });

    $("#previousPage").click(function () {
        pageNo--;
        if (pageNo < 1) {
            pageNo = 1;
            makeSure("makeSureBox","已经是第一页了~");
            return false;
        } else {
            getList();
        }
    });

    $("#nextPage").click(function () {
        pageNo++;
        if (pageNo > $("#totalPage").html()) {
            pageNo = $("#totalPage").html();
            makeSure("makeSureBox","已经是最后一页了~");
            return false;
        } else {
            getList();
        }
    });
    $("#lastPage").click(function () {
        pageNo = $("#totalPage").html();
        getList();
    });
    $("#jumpPage").click(function () {
        pageNo = $("#goPage").val();
        if (pageNo > 0 && pageNo <= $("#totalPage").html()) {
            getList();
        } else {
        	makeSure("makeSureBox","超出范围~");
            pageNo = $("#nowPage").val();
        }
    });
    
    
   /* $(".search_box").find("select").css("width", "94px");
    $("#search_pru").css("width","120px")*/
    
 
	
	//---------------------------------------选择客户经理-----------------------------------------------------------
	
	$('#searchMan').click(function(){
		empTree("managerS","manIpt","schManagerList");
		$("#managerS  .close").click(function(){
			$("#managerS").hide("fast");
		})
	});
	
	
	$('#schMangSave').click(function(){
		$("#searchManBox").hide();
		$(".modal-backdrop").each(function(){
			$(this).hide();
		})
		$('#showIpt').val($('#manIpt').val());
		userID2=$('#manIpt').attr('userId');
		console.log(userID2);
	});
	 
	//---------------------------------------	变更项目经理, 获取数据----------------------------------------------

	var cId='';
	var userID=''
	$(document).delegate(".chgMang",'click',function(){
		empTree("managerC","crmResp","managerList");
			cId=$(this).parent().parent().attr('id');
			console.log(cId)
			$("#managerC  .close").click(function(){
				$("#managerC").hide("fast");
			})
			
	})
	 
	$('#chgMangSave').click(function(){
		userID=$('#crmResp').attr('userId');
		
		$.ajax({
			url:'/'+app+'/crm/cus/ccm',
			data:{
				"id":cId,
				"bizUser":userID
			},
			type:"POST",
			success:function(str){
				if(str.responseCode==0){
					console.log($('#crmResp').val())
					$('#'+cId).children().eq(1).html($('#crmResp').val());
					$("#chgMangBox").hide();
					$(".modal-backdrop").each(function(){
						$(this).hide();
					})
				}
			}
		});
	});

	

//-------------------------------------------------------------------------- 获取联系人选项 ---------------------------------------------------------------------
   $.ajax({
        url: '/' + app + '/crm/cuc/qry',
        type: 'POST',
        data:{
        	"DT_SCOPE":1
        },
        success: function (str) {
            
        	console.log(str);
            if (str.responseCode == 0) {
                var string = '';
                for (var i = 0; i < str.responseData.length; i++) {
                    string += '  <option value="'+str.responseData[i].id+'">'+str.responseData[i].ctmName+'</option> ';
                }
                $('#chncCtmer').append(string);
            }
        }
    });

   
   //获取产品选项卡

   $.ajax({
       url: '/' + app + '/crm/prd/qry',
       type: 'POST',
       success: function (str) {
           var string = '';
           console.log(str)
           if (str.responseCode == 0) {
               for (var i = 0; i < str.responseData.length; i++) {
                   string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].prodName + '</option> ';
               }
               $('#search_pru').append(string);

           }
       }
   });
//-------------------------------------------------------------------------- 获取客户详情信息 ---------------------------------------------------------------------


    $(document).delegate(' .seeContBox', 'click', function () {
    	
    	$(" #confirmCommentBox").show();
    	$(" #auditCommentBox").show();
    	$(" #chncResultBox").show();
        var id = $(this).attr('idd');
        
        var status = $(this).attr("status");
        if(status==10){
        	$(" #confirmCommentBox").hide();
        	$(" #auditCommentBox").hide();
        	$(" #chncResultBox").hide();
        }else if(status==20){
        	$(" #auditCommentBox").hide();
        	$(" #chncResultBox").hide();
        }else if(status==30){
        	$(" #auditCommentBox").hide();
        	$(" #chncResultBox").hide();
        } else{
        	
        }
        
        $.ajax({
            url: '/' + app + '/crm/slc/get',
            data: {
                id: id
            },
            type: 'POST',
            success: function (str) {
            	 console.log(str);
            	
                 $("#chncName").val(noData(str.responseData.chncName));      //项目名称
                 $("#chncCtmer").val(noData(str.responseData.vstCtmer_view));
                 geoNum = noData(str.responseData.chncGeo);
                 igeo1 = new Geo(document.getElementById("province1") ,document.getElementById("city1") ,document.getElementById("county1") ,geoNum);
                 $("#chncProduct").val(noData(str.responseData.prodName));
                 $("#chncSrc").val(noData(setChancSrc(str.responseData.chncSrc)));
                 $("#chncPhase").val(noData(setChancPhase(str.responseData.chncPhase)));
                 $("#chncStart").val(noData(setDate(str.responseData.chncStart)));
                 $("#chncAddress").val(noData(str.responseData.chncAddress));
                 $("#chncEnd").val(noData(setDate(str.responseData.chncEnd)));
                 $("#custType").val(noData(str.responseData.custType));
                 $("#chncRatio").val(noData(str.responseData.chncRatio));
                 $("#chncTamount").val(noData(str.responseData.chncAmount));
                 $("#chncInfo").val(noData(str.responseData.chncInfo));
                 $("#chncInfoTech").val(noData(str.responseData.chncInfoTech));
                 $("#chncInfoCmpt").val(noData(str.responseData.chncInfoCmpt));
                 $("#confirmComment").val(noData(str.responseData.confirmComment));
                 $("#chncInfoBusi").val(noData(str.responseData.chncInfoBusi));
                 $("#auditComment").val(noData(str.responseData.auditComment));
                 $("#chncResult").val(noData(setChncResult(str.responseData.chncResult)));

            }
        })

    });


  //-------------------------------------------------------------------------- 搜索 ---------------------------------------------------------------------
   $("#searchBtn").click(function(){
       var str= ajax('/crm/slc/qry', {
           "PAGE_SIZE"		: "10",
           "PAGE_NO"		: 1,
           "sc_chncPhase"	: $("#search_ph option:selected").val(),
           "sc_chncProduct"	: $("#search_pru option:selected").val(),
           "sc_chncResult"	: $("#search_res option:selected").val(),
           "sc_chncStatus"	: $("#search_sta option:selected").val(),
           "sc_chncGeo"    	: igeo.geo(),
           "sc_bizUser"	  	: $("#bizUser").val()
       });
       setChanceHtml(str);
   });
   

   $("#mychnc").click(function(){
       var str= ajax('/crm/slc/qry', {
           "sc_bizUser" : $("#bizUser").val(),
           "DT_SCOPE"   :$("#mychnc").is(":checked")?2:1
       });
       console.log(($("#mychnc").is(":checked")?2:1))
       setChanceHtml(str);
   });

});