$(function () {
    $('#myTab a:eq(3)').tab('show');
    var igeo = new Geo(document.getElementById("province"), document.getElementById("city"), document.getElementById("county"), '');
    var igeo1 = new Geo(document.getElementById("province1"), document.getElementById("city1"), document.getElementById("county1"), '');
    var igeo2 = new Geo(document.getElementById("province2"), document.getElementById("city2"), document.getElementById("county2"), '');
    var igeo3 = new Geo(document.getElementById("province3"), document.getElementById("city3"), document.getElementById("county3"), '');

	$.jeDate("#vstStart",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})
  $.jeDate("#vstEnd",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})
	$.jeDate("#vstEnd",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})
	$.jeDate("#vstEnd1",{
		format:"YYYY-MM-DD hh:mm:ss",
		isTime:true,
		minDate:"2000-00-00 00:00:00",
		zIndex:93000,
	})
	$.jeDate("#chncEnd",{
		format:"YYYY-MM-DD",
		isTime:true,
		minDate:"2000-00-00",
		zIndex:93000,
	})
  $.jeDate("#chncStart",{
		format:"YYYY-MM-DD",
		isTime:true,
		minDate:"2000-00-00",
		zIndex:93000,
	})
	$.jeDate("#chncEnd1",{
		format:"YYYY-MM-DD",
		isTime:true,
		minDate:"2000-00-00",
		zIndex:93000,
	})
	$.jeDate("#chncStart1",{
		format:"YYYY-MM-DD",
		isTime:true,
		minDate:"2000-00-00",
		zIndex:93000,
	})
	

	
    var custID = GetQueryParam("custID");
    var chanceId = GetQueryParam("chanceId");

    //	 链接id
    $('#cst').attr('href', '../cust/cust_detail.html?custID=' + custID);
    $('#ctm').attr('href', '../cust/ctm_detail.html?custID=' + custID);
    $('#chnc').attr('href', '../chance/cust_chance.html?custID=' + custID + '&chanceId=' + chanceId);
    $('#vst').attr('href', '../visits/cust_vst.html?custID=' + custID);
    $('#ctrn').attr('href', '../contract/cust_contract.html?custID=' + custID);

//	-------------------------------------------------------------------------- 新建机会 ----------------------------------------------------------------------
    
    
    
    checkForm('newChncForm');
    $('#saveChnc').click(function () {
        if (checkForm2('newChncForm')) {
            $.ajax({
                url: '/' + app + '/crm/slc/add',
                data: {
                    "chncName": $("#chncName").val(),
                    "homePage": $("#homePage").val(),
                    "chncGeo": igeo.geo(),        //所在区域
                    "chncAddress": $("#chncAddress").val(),
                    "chncCtmer": $("#chncCtmer").val(),
                    "chncProduct": $("#chncProduct").val(),
                    "chncSrc": $("#chncSrc  option:selected").val(),
                    "chncPhase": $("#chncPhase  option:selected").val(),
                    "chncStart": $("#chncStart").val(),
                    "chncEnd": $("#chncEnd").val(),
                    "chncRatio": $("#chncRatio").val(),
                    "chncInfo": $("#chncInfo").val(),
                    "chncAmount": $("#chncTamount").val(),
                    "chncInfoCmpt": $("#chncInfoCmpt").val(),
                    "chncInfoTech": $("#chncInfoTech").val(),
                    "chncInfoBusi": $("#chncInfoBusi").val(),
                    "chncCust": custID


                },
                type: 'POST',
                success: function (str) {
                    if (str.responseCode == 0) {
                    	if($('#empList tr td').html()=="无数据"){
							$('#empList').html("")
						}
                        var s = $('#empList').html();
                        s += '<tr  id=' + str.responseData + '>\
										<td>' + igeo.cityname(igeo.geo()) + ' </td>\
				                        <td>' + $("#chncName").val() + '</td>\
				                        <td>' + $('option[value="'+ $("#chncProduct").val() +'"]').html() + '</td>\
				                        <td class="text-right">' + $("#chncTamount").val() + '</td>\
				                        <td class="text-right">' + $("#chncRatio").val() + '</td>\
				                        <td>' + setChancPhase($("#chncPhase  option:selected").val()) + '</td>\
				                        <td>录入</td>\
				                        <td>' + $("#chncStart").val() + '</td>\
				                        <td status="10" >\
		                            	<a  class="editContBox" href="#editContBox"  data-toggle="modal" ><i class="icon-pencil"></i></a>\
		                            	</td>\
		                            	<td class="" isShow="0"  style="text-align:center"><i class="icon-eye-open see_follow" style="display:none"></i>\
		                            	</td>\
		                            	<td><a  class="followContBox"  href="#followContBox"  data-toggle="modal" ><i style="display:none" class="icon-plus icon-blue" title="新建跟进"></i></a>\
		                            	</td>\
		                            	<td><a href="../contract/cust_contract.html?custID='+custID+'"><i style="display:none;" class="icon-plus icon-blue" title="新建合同"></i></a>\
		                            	</td>\
		                            	</tr>  ';
                        $('#empList').html(s);
                        var id=str.responseData ;
                        $("#empList tr").css("background","");
                        $('#'+id).css('background','#e8f2fe');
                        $('#auditChncForm').hide();
                        $('#removeChnc').show();
                        $("#seeContBox, .modal-backdrop").hide();
                        $('#seeContBox').find("input,select,textarea").val("");
                        $(".text-error").html("")
                        makeSure("makeSureBox","机会添加成功!");
                    }
                }
            })
        }

    });


    //获取产品选项卡
    function product(name) {
        $.ajax({
            url: '/' + app + '/crm/prd/qry',
            data: {},
            type: 'POST',
            success: function (str) {
                if (str.responseCode == 0) {
                    var msg = '<option value="">-请选择-</option>';
                    for (var i = 0; i < str.responseData.length; i++) {
                        msg += '<option value="' + str.responseData[i].id + '">' + str.responseData[i].prodName + '</option>';
                    }
                    $("#" + name).html(msg)
                }
            }
        });
    }



//	-------------------------------------------------------------------------- 获取机会列表 ----------------------------------------------------------------------
    var pageNo = 1;

    getList();


    function getList() {
        $.ajax({
            url: '/' + app + '/crm/slc/qry',
            async: false,
            data: {
                "PAGE_SIZE": "10",
                "PAGE_NO": pageNo,
                "sc_chncCust": custID
            },
            type: 'POST',
            success: function (str) {
                console.log(str);
                if(str.responseCode==0){
                if (str.responseData.length>0) {
                    var string = '';
                    for (var i = 0; i < str.responseData.length; i++) {

                        var isShowHide = "block";
                        if (str.responseData[i].chncStatus == "10" || str.responseData[i].chncStatus == "40") {
                            isShowHide = "none";
                        }

                        var isShowHidesee = "block";
                        if (str.responseData[i].chncStatus == "10" ) {
                            isShowHidesee = "none";
                        }
                        
                        var isShowHideCtractBtn="none";
                        if(str.responseData[i].chncStatus == "40" && str.responseData[i].chncResult=="30"){
                            isShowHideCtractBtn="block";
                        }
                        string += '  <tr id=' + str.responseData[i].id + '>\
						    <td>' + noData(igeo.cityname(str.responseData[i].chncGeo)) + ' </td>\
                            <td>' + noData(str.responseData[i].chncName) + '</td>\
                            <td>' + noData(str.responseData[i].prodName) + '</td>\
                            <td class="text-right">' + noData(fmoney(str.responseData[i].chncAmount)) + '</td>\
                            <td class="text-right">' + noData(str.responseData[i].chncRatio) + '</td>\
                            <td>' + noData(setChancPhase(str.responseData[i].chncPhase)) + '</td>\
                            <td >' + noData(setChncStatus(str.responseData[i].chncStatus)) + '</td>\
                            <td>' + noData(setDate(str.responseData[i].chncStart)) + ' </td>\
                            <td status="' + str.responseData[i].chncStatus + '">\
                            	<a  class="editContBox"  href="#editContBox"  data-toggle="modal" idd="' + str.responseData[i].id + '"><i class="icon-pencil"></i></a>\
                            </td>\
                            <td idd=' + str.responseData[i].id + '" class=""  style="text-align:center" isShow="0"><i class="icon-eye-open see_follow" style="display:'+isShowHidesee+'"></i>\
                            </td>\
                            <td><a  class="followContBox"  href="#followContBox"  data-toggle="modal" idd=' + str.responseData[i].id + '><i style="display:' + isShowHide + ';" class="	icon-plus icon-blue" title="新建跟进"></i></a>\
                            </td>\
                            <td><a href="../contract/cust_contract.html?custID='+custID+'&chanceId='+str.responseData[i].id+'"><i style="display:' + isShowHideCtractBtn + ';" class="icon-plus icon-blue" title="新建合同"></i></a>\
                            </td>\
                        </tr>';

                    }
                    if (str.resv1lng == 0) {
                        $("#nowPage").html(0)
                    } else {
                        $("#nowPage").html(pageNo);
                        $('#totalPage').html(str.resv1lng);
                    }
                } else {
                	string += '<tr><td colspan="12" style="text-align:center">无数据</td></tr>'
                }
                $('#empList').html(string);
                $('#' + chanceId).css('background', '#e8f2fe');
                $(document).delegate("#empList tr",'click',function(){
                    $("#empList tr").css("background","");
                    $(this).css("background","#e8f2fe")

                })
            }else{
            	alert("获取失败")
            	}
            }
        });
    }

    //显示跟进机会列表
    $(document).delegate(".see_follow",'click',function(e){
        var showStatus = $(this).parent().attr("isShow");
        var id = $(this).parent().parent().attr('id');
        var pageNo = 1;
        if (showStatus == "0") {
            //empty();
            $(".folw_list").remove();
            var html = '<tr class="folw_list"><td colspan="12" style="padding:0px;"><table style="width:100%; background-color: #eee;"><thead>\
                            	<tr style="background:#ddd;"><th>跟进时间</th><th>联系人</th><th>跟进方式</th><th>跟进目标</th><th>跟进状态</th><th>城市</th><th>操作</th></tr><thead><tbody>';
            $.ajax({
                url: '/' + app + '/crm/cuv/qry',
                async: false,
                data: {
                    "sc_trcChance": id,
                    "sc_vstCust": custID
                },
                type: 'POST',
                success: function (str) {
                    console.log(str);
                    
                    if (str.responseData.length>0) {
                        for (var i = 0; i < str.responseData.length; i++) {
                            html += '<tr id="' + str.responseData[i].id + '">\
                                                <td >' + noData(setDate(str.responseData[i].vstStart)) + ' </td>\
                                                <td>' + noData(str.responseData[i].vstCtmer_view) + '</td>\
                                                <td>' + noData(setMode(str.responseData[i].vstMode)) + '</td>\
                                                <td>' + noData(str.responseData[i].vstTarget) + '</td>\
                                                <td class="aaa">' + noData(setStatus(str.responseData[i].vstStatus)) + '</td>\
                                                <td >' + noData(igeo2.cityname(str.responseData[i].vstGeo)) + ' </td>\
                                                <td status="' + str.responseData[i].vstStatus + '"><a  class="flwedContBox"  href="#flwedContBox"  data-toggle="modal" idd="' + str.responseData[i].id + '" class="new_follow"><i class="icon-pencil"></i></a>\
                                                </td></tr>';
                        }
                    } else {
                        html += '<tr><td colspan="12" style="text-align: center">无数据</td></tr>'
                    }
                }

            });
            html += '</body></table></td></tr>';
            $(this).parents("tr").after(html);
        } else {
            $(".folw_list").remove();
        }


        //判断是否显示隐藏
        var isShowStatus = (showStatus == "0") ? "1" : "0";
        $(this).parent().attr("isShow", isShowStatus);
        //初始化
        var trIndex = $(this).parent().parents("tr").index();   
        $(".see_follow").each(function (index) {
            if (index != trIndex) {
                $(this).parent().attr("isShow", "0");
            }
        });
    });

    $("#firstPage").click(function () {
        pageNo = 1;
        getList();
    });
    $("#previousPage").click(function () {
        pageNo--;
        if (pageNo < 1) {
            pageNo = 1;
            makeSure("makeSureBox","已经是第一页了!");
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
        	makeSure("makeSureBox","超出范围！");
            pageNo = $("#nowPage").val();
        }
    });



    $.ajax({
        url: '/' + app + '/crm/cuc/qry',
        type: 'POST',
        data:{
        	"DT_SCOPE":1,
        	"sc_custId":custID
        },
        success: function (str) {
        
            if (str.responseCode == 0) {
                var string = '';
                for (var i = 0; i < str.responseData.length; i++) {
                    string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].ctmName + '</option> ';
                }
                $('#chncCtmer').append(string);
            }
        }
    });

    product("chncProduct");



    //	-------------------------------------------------------------------------- 修改获取机会信息 ----------------------------------------------------------------------


    product("chncProduct1");//获取产品选项卡

    $.ajax({
        url: '/' + app + '/crm/cuc/qry',
        type: 'POST',
        success: function (str) {

            if (str.responseCode == 0) {
                var string = '';
                for (var i = 0; i < str.responseData.length; i++) {
                    string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].ctmName + '</option> ';
                }
                $('#chncCtmer1').append(string);
            }
        }
    });

    $(document).delegate('.editContBox', 'click', function () {
        var status = $(this).parents("td").attr("status");//机会状态判断


        //获取修改机会信息
        var id = $(this).parent().parent().attr('id');

        $.ajax({
            url: '/' + app + '/crm/slc/get',
            data: {
                id: id
            },
            type: 'POST',
            success: function (str) {
                console.log(str);
                $("#chncCtmer1").val(str.responseData.chncCtmer);//备注
                $("#chncProduct1").val(str.responseData.chncProduct);//备注

                $("#chncName1").val(str.responseData.chncName);
                $("#chncName1").attr("idd", str.responseData.id);
                geoNum = str.responseData.chncGeo;
                igeo1 = new Geo(document.getElementById("province1"), document.getElementById("city1"), document.getElementById("county1"), geoNum);

                $("#chncPhase1").val(setChancPhase(str.responseData.chncPhase));
                $("#chncSrc1").val(str.responseData.chncSrc);
                $("#chncStart1").val(setDate(str.responseData.chncStart));
                $("#chncAddress1").val(str.responseData.chncAddress);
                $("#chncEnd1").val(setDate(str.responseData.chncEnd));
                $("#chncInfo1").val(str.responseData.chncInfo);
                $("#chncRatio1").val(str.responseData.chncRatio);
                $("#chncInfoTech1").val(str.responseData.chncInfoTech);
                $("#chncTamount1").val(str.responseData.chncAmount);
                $("#chncInfoCmpt1").val(str.responseData.chncInfoCmpt);
                $("#chncInfoBusi1").val(str.responseData.chncInfoBusi);
                $("#confirmComment1").val(str.responseData.confirmComment);
                $("#auditComment1").val(str.responseData.auditComment);
                $("#chncResult1").val(str.responseData.chncResult);
                $('#confirmComment1').val(str.responseData.confirmComment);
                $("#auditComment1").val(str.responseData.auditComment);
                $("#chncResult1 option:selected").val(str.responseData.chncResult);

            }
        });
        if (status == "10") {
            $('#removeChnc').css("display", "");
            $("#auditChncForm").css("display", "none");
            $("#confirmChncForm").css("display", "");
            $('#confirmChnc').css("display", "");
            $('#abandonChnc').css("display", "");
            $("#editContBox").find("input,select,textarea").attr("disabled", false);
        } else if (status == "20") {
            $("#confirmChncForm").css("display", "");
            $('#abandonChnc').css("display", "none"); 	//放弃按钮关闭
            $('#auditChncForm').css("display", "none");	//审核form关闭
            $('#removeChnc').css("display", "none"); 	//修改按钮关闭
            $('#confirmChnc').css("display", "none");
            $("#editContBox").find("input,select,textarea").attr("disabled", "disabled");
            $("#confirmComment1").attr("disabled", "disabled");
           
        } else if (status == "30") {
            $("#confirmChncForm").css("display", "");
            $('#abandonChnc').css("display", "none"); 	//放弃按钮关闭
            $('#removeChnc').css("display", "none");	//修改按钮关闭
            $('#confirmChnc').css("display", "none");
            $('#auditChncForm').css("display", "");
            $('#auditChnc').css("display", "");
            $("#editContBox").find("input,select,textarea").attr("disabled", "disabled");
            $("#auditChncForm").find("input,select,textarea").attr("disabled", false);
        } else if (status == "40") {
            $("#confirmChncForm").css("display", "");
            $('#auditChncForm').css("display", "");
            $('#abandonChnc').css("display", "none"); 	//放弃按钮关闭
            $('#removeChnc').css("display", "none"); 	//修改按钮关闭
            $('#confirmChnc').css("display", "none");
            $('#auditChnc').css("display", "none");
            $("#editContBox").find("input,select,textarea").attr("disabled", "disabled");

        }

    });

    //机会确认
    checkForm('confirmChncForm');
    $("#confirmChnc").click(function () {
        var id = $("#chncName1").attr("idd");
        if (checkForm2('confirmChncForm')) {
            $.ajax({
                url: '/' + app + '/crm/slc/cfm',
                type: 'POST',
                data: {
                    "id": $("#chncName1").attr("idd"),
                    "confirmComment": $("#confirmComment1").val()
                },
                success: function (str) {
                    console.log(str);
                    if (str.responseCode == 0) {
                        $("#confirmChncForm").css("display", "");
                        $('#abandonChnc').css("display", "none"); 	//放弃按钮关闭
                        $('#auditChncForm').css("display", "none");	//审核form关闭
                        $('#removeChnc').css("display", "none"); 	//修改按钮关闭
                        $('#confirmChnc').css("display", "none");
                        $('#'+ id).children().eq(8).attr("status",20);
                        $('#'+ id).children().eq(5).html("确认");
                        $('#'+ id).children().eq(9).children().css("display","block");
                        $('#'+ id).children().eq(10).children().children().css("display","block");
                        $(".text-error").html("")
                        $("#editContBox").find("input,select,textarea").attr("disabled", "disabled");
                    }
                 
                }

            });

        }
    });
//机会放弃
    checkForm('confirmChncForm');
    $("#abandonChnc").click(function () {
        var id = $("#chncName1").attr("idd");
        if (checkForm2('confirmChncForm')) {
        $.ajax({
            url: '/' + app + '/crm/slc/gup',
            type: 'POST',
            data: {
                "id": $("#chncName1").attr("idd"),
                "confirmComment": $("#confirmComment1").val(),
                "chncResult":20
            },
            success: function (str) {
                if (str.responseCode == 0) {
                    console.log(str);
                    $("#removeChnc").hide();
                    $("#abandonChnc").hide();
                    $("#confirmChnc").hide();
                    $('#'+ id ).children().eq(8).attr("status",40);
                    $('#'+ id ).children().eq(5).html("关闭");
                    
                    $('#'+ id).children().eq(9).children().css("display","block");
                    $("#editContBox").find("input,select,textarea").attr("disabled", "disabled");
                }
            }
        })
        }
    });

    //机会审核
    checkForm('auditChncForm');
    $("#auditChnc").click(function () {
        var id = $("#chncName1").attr("idd");
        if (checkForm2('auditChncForm')) {
            $.ajax({
                url: '/' + app + '/crm/slc/adt',
                type: 'POST',
                async: false,
                data: {
                    "id"			: $("#chncName1").attr("idd"),
                    "auditComment"	: $("#auditComment1").val(),
                    "chncResult"	: $("#chncResult1 option:selected").val()
                },
                success: function (str) {
                    if (str.responseCode == 0) {
                    	
                    		$("#confirmChncForm").css("display", "");
                            $('#auditChncForm').css("display", "");
                            $('#abandonChnc').css("display", "none"); 	//放弃按钮关闭
                            $('#removeChnc').css("display", "none"); 	//修改按钮关闭
                            $('#confirmChnc').css("display", "none");
                            $("#auditChnc").css("display", "none");
                            $("#auditChncForm").find("input,select,textarea").attr("disabled", "disabled");
                            $('#'+ id ).children().eq(8).attr("status","40");
                            $('#'+ id ).children().eq(11).children().children().css("display","block");
                            $('#'+ id ).children().eq(10).children().children().css("display","none");
                            $('#'+ id ).children().eq(11).children().children().css("display","none");
                            $('#'+ id ).children().eq(5).html("关闭");
                            $(".text-error").html("")
                             if($("#chncResult1 option:selected").val()==30){
                            	 $('#'+ id ).children().eq(11).children().children().css("display","block");
                             }
                    }
                    
                }
            })
        }
    });


    //修改机会
    checkForm('removeChncForm');
    $("#removeChnc").click(function () {
        var id = $("#chncName1").attr("idd");
        if (checkForm2('removeChncForm')) {
            $.ajax({
                url: '/' + app + '/crm/slc/upd',
                data: {
                    "id"			: $("#chncName1").attr("idd"),
                    "chncCust"		: custID,
                    "chncName"		: $("#chncName1").val(),
                    "homePage"		: $("#homePage1").val(),
                    "chncGeo"		: igeo1.geo(),         //所在区域
                    "chncAddress"	: $("#chncAddress1").val(),
                    "chncCtmer"		: $("#chncCtmer1").val(),
                    "chncProduct"	: $("#chncProduct1").val(),
                    "chncSrc"		: $("#chncSrc1  option:selected").val(),
                    "chncPhase"		: $("#chncPhase1  option:selected").val(),
                    "chncStart"		: $("#chncStart1").val(),
                    "chncEnd"		: $("#chncEnd1").val(),
                    "chncRatio"		: $("#chncRatio1").val(),
                    "chncInfo"		: $("#chncInfo1").val(),
                    "chncAmount"	: $("#chncTamount1").val(),
                    "chncInfoCmpt"	: $("#chncInfoCmpt1").val(),
                    "chncInfoTech"	: $("#chncInfoTech1").val(),
                    "chncInfoBusi"	: $("#chncInfoBusi1").val()


                },
                type: 'POST',
                success: function (str) {
                    var isShowHide = "block";
                    if (str.responseData == "20") {
                        isShowHide = "none";
                    }

                    if (str.responseCode == 0) {
                    	if($('.folw_list').children("td").html()=="无数据"){
                    		$('.folw_list').children("td").html("")
						}
                        $('#' + id).html('<td>' + igeo1.cityname(igeo1.geo()) + ' </td>\
                                 <td>' + $("#chncName1").val() + '</td>\
                                 <td>' + $('option[value="'+ $("#chncProduct1").val() +'"]').html() + '</td>\
                                 <td class="text-right">' + $("#chncTamount1").val() + '</td>\
                                 <td class="text-right">' + $("#chncRatio1").val()+ '</td>\
                                 <td>' + $('option[value="'+ $("#chncProduct1").val() +'"]').html() + '</td>\
                                 <td >录入</td>\
                                 <td>' +$("#chncStart1").val() + ' </td>\
                                 <td>\
                                 	<a  class="editContBox"  href="#editContBox"  data-toggle="modal"><i class="icon-pencil"></i></i></a>\
                                 </td>\
                                 <td class=""  isShow="0"><i class="icon-eye-open see_follow"></i>\
                                 </td>\
                                 <td><a  class="followContBox"  href="#followContBox"  data-toggle="modal" idd=' + str.responseData.id + '><i style="display:none" class="icon-plus icon-blue" title="新建跟进"></i></a>\
                                 </td>\
                                 <td><a href="../contract/cust_contract.html?custID='+custID+'"><i class="icon-plus icon-blue" title="合同" style="display:none"></i></a>\
                                 </td>');
                        $("#editContBox, .modal-backdrop").hide();
                        $('#editContBox input,  #editContBox select').val('');
                        $(".text-error").html("")
                        $('#'+ id ).children().eq(9).children().css("display","none");
                        makeSure("makeSureBox","机会修改成功!");
                    }
                }
            })
        }
    });



    $.ajax({
        url: '/' + app + '/crm/cuc/qry',
        type: 'POST',
        data:{
        	"DT_SCOPE":1,
        	"sc_custId":custID
        },
        success: function (str) {

            if (str.responseCode == 0) {
                var string = '';
                for (var i = 0; i < str.responseData.length; i++) {
                    string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].ctmName + '</option> ';
                }
                $('#vstCtmer').append(string);
            }
        }
    });

//	-------------------------------------------------------------------------- 新建跟进 ----------------------------------------------------------------------
    var newFollowId="";
    $(document).delegate('.followContBox', 'click', function () {
        newFollowId = $(this).parent().parent().attr('id');
        checkForm('newFlowForm');
    });

    $('#savePro').click(function () {
        if (checkForm2('newFlowForm')) {
            $.ajax({
                url: '/' + app + '/crm/cuv/add',
                data: {
                    "vstCtmer"		: $("#vstCtmer").val(),
                    "vstGeo"		: igeo2.geo(),       //所在区域
                    "vstMode"		: $("#vstMode option:selected").val(),
                    "vstStart"		: $("#vstStart").val(),
                    "vstEnd"		: $("#vstEnd").val(),
                    "vstTarget"		: $("#vstTarget").val(),
                    "remark"		: $("#remark").val(),
                    "vstAddress"	: $("#address").val(),
                    "trcChance"		: newFollowId,
                    "vstCust"		: custID
                },
                type: 'POST',
                success: function (str) {
                    console.log(str);
                    if (str.responseCode == 0) {
                    	if($('.folw_list td table tbody tr td').html()=="无数据"){
							$('.folw_list td table tbody').html("")
						}
                        s = '<tr  id=' + str.responseData + '>\
										<td>' + $("#vstStart").val() + '</td>\
                                        <td>' + $('option[value="'+ $("#vstCtmer").val() +'"]').html() + '</td>\
                                        <td>' + setMode($("#vstMode").val())+ '</td>\
                                        <td>' + $("#vstTarget").val() + '</td>\
				                        <td>计划</td>\
				                        <td>' + igeo2.cityname(igeo2.geo()) + '</td>\
				                        <td ><a  class="flwedContBox"  href="#flwedContBox"  data-toggle="modal"  class="new_follow"><i class="icon-pencil"></i></a>\
                                        </td>\
				                    </tr>  ';
                        $(".folw_list table tbody").prepend(s);
                        $("#followContBox, .modal-backdrop").hide();
                        $('#followContBox input,  #followContBox select').val('');
                        $('#auditCommentPut').hide();
                        $('#vstResultPut').hide();
                        $('#auditFolw').hide();
                        $('#followContBox').find("input,select,textarea").val("");
                        $(".text-error").html("")
                        
                        $("#"+newFollowId).children().eq(5).html("跟进")
                        $("#"+newFollowId).children().eq(8).attr("status","30")
                        $('#auditChncForm').css("display", "block");
                        $("#auditChncForm").find("input,select,textarea").attr("disabled", false);
                        $('#auditChnc').css("display", "block");
                    }
                } 
            })

        }

    });



//	-------------------------------------------------------------------------- 修改获取机会跟进信息 ----------------------------------------------------------------------
  

    $.ajax({
        url: '/' + app + '/crm/cuc/qry',
        type: 'POST',
        data:{
        	"DT_SCOPE":1,
        	"sc_vstCust":custID
        },
        success: function (str) {

            if (str.responseCode == 0) {
                var string = '';
                for (var i = 0; i < str.responseData.length; i++) {
                    string += '  <option value="' + str.responseData[i].id + '">' + str.responseData[i].ctmName + '</option> ';
                }
                $('#vstCtmer1').append(string);
            }
        }
    });

    var FOLLOWid=''
    $(document).delegate('.flwedContBox', 'click', function () {

        $('#auditChncForm').show();
        $('#auditFolwForm').show();
        $('#fulfilFlow').show();
        $("#remPro").show();
        $("#flwedContBox").find("input,select,textarea").attr("disabled", false);
        $('#auditFolwForm').find("input,select,textarea").attr("disabled", false);
        $("#flwedContBox").find("input,select,textarea").attr("disabled", false);


        //判断跟进状态
        var status = $(this).parents("td").attr("status");
        if (status == 10) {
            $('#auditFolwForm').css("display", "none"); //审核form隐藏
            $('#auditChncForm').css("display", ""); //机会审核form显示
            $('#remPro').css("display", "");
            $('#fulfilFlow').css("display", "");
        } else if (status == 30) {
            $('#remPro').hide();		//修改按钮隐藏
            $('#fulfilFlow').hide();	//完成按钮隐藏
            $('#auditFolwForm').show();//审核form显示
            $('#auditFolw').show();
            $("#flwedContBox").find("input,select,textarea").attr("disabled", "disabled");
            $('#auditFolwForm').find("input,select,textarea").attr("disabled", false);
            

        } else if (status == 40) {
            $('#remPro').hide(); //修改按钮隐藏
            $('#fulfilFlow').hide(); //完成按钮隐藏
            $('#auditFolw').hide();//审核按钮隐藏
            $("#flwedContBox").find("input,select,textarea").attr("disabled", "disabled");
            
        }


        FOLLOWid = $(this).parent().parent().attr('id');

        $.ajax({
            url: '/' + app + '/crm/cuv/get',
            data: {
                id: FOLLOWid
            },
            type: 'POST',
            success: function (str) {
            	console.log(str);
            	if(str.resv1str==40){
            		$('#remPro').hide(); //修改按钮隐藏
                    $('#fulfilFlow').hide(); //完成按钮隐藏
                    $('#auditFolw').hide();//审核按钮隐藏
                    $("#flwedContBox").find("input,select,textarea").attr("disabled", "disabled");
            	}
                $("#vstCtmer1").val(str.responseData.vstCtmer);
                $("#vstCtmer1").attr("idd", str.responseData.id);
                igeo3 = new Geo(document.getElementById("province3"), document.getElementById("city3"), document.getElementById("county3"), str.responseData.vstGeo);
                $("#vstMode1").val(str.responseData.vstMode);
                $("#vstStart1").val(setDate(str.responseData.vstStart));
                $("#vstEnd1").val(setDate(str.responseData.vstEnd));
                $("#vstTarget1").val(str.responseData.vstTarget);
                $("#remark1").val(str.responseData.remark);
                $("#address1").val(str.responseData.vstAddress);
                $("#trcPhase").val(str.responseData.trcPhase);
                $("#trcInfoCmpt").val(str.responseData.trcInfoCmpt);
                $("#trcTamount").val(str.responseData.trcAmount);
                $("#trcRatio").val(str.responseData.trcRatio);
                $("#trcInfo").val(str.responseData.trcInfo);
                $("#trcInfoCmpt").val(str.responseData.trcInfoCmpt);
                $("#trcInfoTech").val(str.responseData.trcInfoTech);
                $("#trcInfoBusi").val(str.responseData.trcInfoBusi);
                $("#vstRecord").val(str.responseData.vstRecord);
                $('#auditComment').val(str.responseData.auditComment);
                $('#vstResult').val(str.responseData.vstResult);
                $("#vstPlans").val(str.responseData.vstPlans);
				$("#vstPartners").val(str.responseData.vstPartners);
				$("#vstScore").val(str.responseData.vstScore);
                
            }
        });

    });
        //跟进完成操作
        checkForm('fulfilFlowForm');
        $("#fulfilFlow").click(function () {
            if (checkForm2('fulfilFlowForm')) {

                $.ajax({
                    url: '/' + app + '/crm/cuv/ffl',
                    data: {
                        "trcPhase"		: $("#trcPhase option:selected").val(),
                        "trcInfoCmpt"	: $("#trcInfoCmpt").val(),
                        "trcAmount"		: $("#trcTamount").val(),
                        "trcRatio"		: $("#trcRatio").val(),
                        "trcInfo"		: $("#trcInfo").val(),
                        "trcInfoCmpt"	: $("#trcInfoCmpt").val(),
                        "trcInfoTech"	: $("#trcInfoTech").val(),
                        "trcInfoBusi"	: $("#trcInfoBusi").val(),
                        "vstRecord"		: $("#vstRecord").val(),
                        "id"			:FOLLOWid,
                        "vstCust"		: custID,
                        "vstPlans"	    :$("#vstPlans").val(),
    					"vstPartners"	:$("#vstPartners").val(),
    					"vstScore"	    :$("#vstScore").val()
                    },
                    type: 'POST',
                    success: function (str) {
                        console.log(str)
                        if (str.responseCode == 0) {
                            $('#auditFolwForm').show();
                            $('#auditCommentPut').show();
                            $('#vstResultPut').show();
                            $('#auditFolw').show();
                            $('#fulfilFlow').hide();
                            $('#remPro').hide();
                            $('#' + FOLLOWid).children().eq(6).attr("status", 30);
                            $('#' + FOLLOWid).children().eq(4).html("完成")
                            $(".text-error").html("");
                            $("#flwedContBox").find("input,select,textarea").attr("disabled", "disabled");
                            $("#auditFolwForm").find("input,select,textarea").attr("disabled", false);
                            
                        }

                    }
                });
            }
        });


        //跟进审核
        checkForm('auditFolwForm');
        $("#auditFolw").click(function () {

            if (checkForm2('fulfilFlowForm')) {
                $.ajax({
                    url: '/' + app + '/crm/cuv/adt',
                    type: 'POST',
                    data: {
                        "id"			: FOLLOWid,
                        "vstCust"		: custID,
                        "auditComment"	: $("#auditComment").val(),
                        "vstResult"		: $("#vstResult option:selected").val(),
                    },

                    success: function (str) {
                        console.log(str);
                        if (str.responseCode == 0) {
                            $('#auditFolw').hide();
                            $('#' + FOLLOWid).children().eq(6).attr("status", 40);
                            $('#' + FOLLOWid).children().eq(4).html("已评");
                            $(".text-error").html("");
                            $("#auditFolwForm").find("input,select,textarea").attr("disabled", "disabled");
                        }

                    }

                })
            }
      
    });
//跟进修改
    checkForm('remProForm');
    $("#remPro").click(function () {
        var id = $("#vstCtmer1").attr("idd");
        if (checkForm2('remProForm')) {
            $.ajax({
                url: '/' + app + '/crm/cuv/upd',
                data: {
                    "vstCust"	: custID,
                    "id"		: $("#vstCtmer1").attr("idd"),
                    "vstCtmer"	: $("#vstCtmer1").val(),
                    "homePage"	: $("#homePage1").val(),
                    "vstGeo"	: igeo3.geo(),         //所在区域
                    "vstAddress": $("#address1").val(),
                    "vstMode"	: $("#vstMode1 option:selected").val(),
                    "vstStart"	: $("#vstStart1").val(),
                    "vstEnd"	: $("#vstEnd1").val(),
                    "vstTarget"	: $("#vstTarget1").val(),
                    "remark"	: $("#remark1").val(),
                    "chncEnd"	: $("#chncEnd1").val()
                },
                type: 'POST',
                success: function (str) {
                    console.log(str);
                    if (str.responseCode == 0) {
                    	makeSure("makeSureBox","跟进修改成功!");
                    	$(".text-error").html("");
                    }
                }
            });
        }

    })


});