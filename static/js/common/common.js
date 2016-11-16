
//-----------------------------------------------定义全局变量-------------------------------------------------------------------
var app="xerpweb/i";
//权限

function checkForm2(Form){
var Form = document.getElementById(Form);
var aText = [];
var bOk=true;
if(Form==null){
	return;
}
var aText1 = Form.getElementsByTagName('input');
var aText2 = Form.getElementsByTagName('textarea');
var aText3 = Form.getElementsByTagName('select');
for(var x=0; x<aText1.length; x++){
	aText.push(aText1[x]);
	}
for(var y=0; y<aText2.length; y++){
	aText.push(aText2[y]);
	}
for(var z=0; z<aText3.length; z++){
	aText.push(aText3[z]);
	}
for(var i = 0; i < aText.length; i++){
		var re = reDataJson[aText[i].getAttribute("check")];
		if(re){//需要做校验
			if(checkText(re,aText[i]) == true){
				bOk;
			}else{
				bOk = false;
				}
		}
	}
	return bOk;

}


function checkForm(Form){
	//失焦校验
	var Form = document.getElementById(Form);
	var aText = [];
	if(Form==null){
		return;
	}
	var aText1 = Form.getElementsByTagName('input');
	var aText2 = Form.getElementsByTagName('textarea');
	var aText3 = Form.getElementsByTagName('select');
	for(var x=0; x<aText1.length; x++){
		aText.push(aText1[x]);
		}
	for(var y=0; y<aText2.length; y++){
		aText.push(aText2[y]);
		}
	for(var z=0; z<aText3.length; z++){
		aText.push(aText3[z]);
		}
	for(var i = 0; i < aText.length; i++){
		var re = reDataJson[aText[i].getAttribute("check")];
		if(re){
			(function(re){
				aText[i].onblur = function(){
					checkText(re,this);
				};
			})(re);
		}
	}
	}
function checkText(re,oText){
	if(oText.getAttribute("requir") && oText.value==''){
		oText.nextSibling.innerHTML="必填项！";
		return false;
		}else{
			if(re.test(oText.value) == true){
				oText.nextSibling.innerHTML='';
				return true;
				}else{
					oText.nextSibling.innerHTML="您输入的格式、长度有误!";
					return false;
					}
			}		
	}

//数字格式化
function fmoney(s, n) {  
    n = n > 0 && n <= 20 ? n : 2;  
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
    t = "";  
    for (i = 0; i < l.length; i++) {  
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
    }  
    return t.split("").reverse().join("") + "." + r;  
}  

//显示NULL为“-”
function  noData(str){return str== null || str== undefined || str=='' ? '-' : str ;}
//显示NULL为“ ”
function  noDatan(str){return str== null || str== undefined || str=='' ? '' : str ;}
//时间格式
function setDate(time){
	var d = new Date(time);
	if(time){
		var t = d.toLocaleDateString(time);
		var s ='';
		//yyyy-mm-dd
		t = t.split('/');
		for(var i=0; i<t.length; i++){
			if(t[i]<10){t[i] = "0"+t[i]}
			s += t[i] + "-";
			}
		return s=s.substring(0,s.length-1);
	}else{
		return "";
		}
	
}
//yyyy-mm-dd 00:00:00
function getNowFormatDate(time) {
    var date = new Date(time);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	//....00
	var h = date.getHours();
	if (h >= 0 && date.getHours() <= 9) {
        h = "0" + h;
    }
	var m = date.getMinutes();
	if (m >= 0 && m <= 9) {
        m = "0" + m;
    }
	var s = date.getSeconds();
	if (s >= 0 && s <= 9) {
        s = "0" + s;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + h + seperator2 + m
            + seperator2 + s;
    return currentdate;
    
}

//yyyy-mm-dd 00:00
function getNowFormatDate2(time) {
    var date = new Date(time);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
  //....00
	var h = date.getHours();
	if (h >= 0 && date.getHours() <= 9) {
        h = "0" + h;
    }
	var m = date.getMinutes();
	if (m >= 0 && m <= 9) {
        m = "0" + m;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate+ " " + h + seperator2 + m;
    return currentdate;
    
}

//yyyy-mm-dd 
function getNowFormatDate3(time) {
    var date = new Date(time);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    
  //....00
	var h = date.getHours();
	if (h >= 0 && date.getHours() <= 9) {
        h = "0" + h;
    }
	var m = date.getMinutes();
	if (m >= 0 && m <= 9) {
        m = "0" + m;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
    
}



//获取地址栏参数
function GetQueryParam(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	 var r = window.location.search.substr(1).match(reg);
	 if(r!=null)return  decodeURIComponent(r[2]); return null;
	}



function empTitle(n){
					if(n == "01"){
								 return "董事";
								}else if(n == "10"){
									 return "高管";
									}else if(n == "20"){
										 return "经理";
										}else if(n == "30"){
											 return "主管";
											}else if(n == "40"){
												 return "资深";
												}else if(n == "50"){
													 return "员工";
													}else if(n == "60"){
														 return "临工";
														}else{
															return "-" ;}

			}


function  setTskType(n){
	if(n == "1"){
		 return "任务包";
		}else if(n == "2"){
			 return "任务";
			}else if(n == "9"){
				 return "路由";
				}else if(''){
					return '-';
				}
}


function  setPrjType(str){
			switch(str){
					case '1':
						return '新建项目';
						break;
					case '2':
						return '扩建项目';
						break;
					case '3':
						return '改建项目';
						break;
					case '4':
						return '迁建项目';
						break;
					case '5':
						return '恢复项目';
						break;
					default:
						return '-';
		}
}




function getDays(strDateStart,strDateEnd){
	   var strSeparator = "-"; //日期分隔符
	   var oDate1;
	   var oDate2;
	   var iDays;
	   oDate1= strDateStart.split(strSeparator);
	   oDate2= strDateEnd.split(strSeparator);
	   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
	   var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
	   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24) //把相差的毫秒数转换为天数 
	   return iDays ;
}

function logRvw(str){
			switch(str){
				case '1':
					return '很好';
					break;
				case '2':
					return '好';
					break;
				case '3':
					return '一般';
					break;
				case '4':
					return '差';
					break;
				case '5':
					return '很差';
					break;
				default:
					return '';
			}
}

function chkpass(str){
			switch(str){
				case '1':
					return '是';
					break;
				case '2':
					return '否';
					break;
				default:
					return '';
			}
}

function chkstatus(str){
			switch(str){
				case '01':
					return '草稿';
					break;
				case '10':
					return '发布';
					break;
				default:
					return '';
			}
}

function contType(str){
			switch(str){
				case '01':
					return '销售合同';
					break;
				case '10':
					return '采购合同';
					break;
				default:
					return '';
			}
}
function ivcType(str){
			switch(str){
				case '10':
					return '增值税';
					break;
				case '20':
					return '普通国税';
					break;
				case '30':
					return '普通地税';
					break;
				default:
					return '';
			}
}
function expType(str){
			switch(str){
				case '10':
					return '管理费用';
					break;
				case '20':
					return '销售费用';
					break;
				default:
					return '';
			}
}
function repType(str){
			switch(str){
				case '10':
					return '转账';
					break;
				case '20':
					return '网银';
					break;
				case '30':
					return '电汇';
					break;
				case '40':
					return '支票';
					break;
				case '50':
					return '现金';
					break;
				case '60':
					return '其他';
					break;
				default:
					return '-';
			}
}
function tskStatus(str){
			switch(str){
				case '01':
					return '草稿';
					break;
				case '10':
					return '发布';
					break;
				case '30':
					return '暂停';
					break;
				case '40':
					return '完成';
					break;
				case '90':
					return '取消';
					break;
				default:
					return '';
			}
}
function ivoStatus(str){
			switch(str){
				case '10':
					return '草稿';
					break;
				case '30':
					return '开票';
					break;
				case '20':
					return '放弃';
					break;
				case '50':
					return '审核';
					break;
				case '40':
					return '作废';
					break;
				default:
					return '-';
			}
}
function cntrStatus(str){
			switch(str){
				case '10':
					return '草稿';
					break;
				case '13':
					return '提交';
					break;
				case '20':
					return '生效';
					break;
				case '30':
					return '完成';
					break;
				case '40':
					return '终止';
					break;
				default:
					return '';
			}
}
function payStatus(str){
			switch(str){
				case '10':
					return '计划回款';
					break;
				case '20':
					return '部分回款';
					break;
				case '30':
					return '全额回款';
					break;
				default:
					return '-';
			}
}
function repStatus(str){
			switch(str){
				case '10':
					return '草稿';
					break;
				case '20':
					return '提交';
					break;
				case '30':
					return '审核';
					break;
				default:
					return '-';
			}
}
//----------------------------------------------------------crm------------------------------------------------------------

function setCity(str){
	return str.substring(0,4);
}



//增长率  百分比值
function Percentage(number1, number2) { 
	if(number2==0 ){
		return '-';
	}else{
	    return (Math.round( ((number1-number2)/number2) * 10000) / 100.00 );// 小数点后两位百分比
	}
}
// 百分比值
function hurndrePer(number1, number2) { 
	if(number2==0 || number1==0){
		return '-';
	}else{
	    return (Math.round( (number1/number2) * 10000) / 100.00 );// 小数点后两位百分比
	}
}

function custType(str){
			switch(str){
				case '10':
					return '业方';
					break;
				case '20':
					return '施工';
					break;
				case '30':
					return '监理';
					break;
				case '40':
					return '设计';
					break;
				case '50':
					return '咨询';
					break;
				case '60':
					return '政府';
					break;
				case '90':
					return '其他';
					break;
				default:
					return '';
			}
}


function custStatus(str){
			switch(str){
				case '10':
					return '正常';
					break;
				case '20':
					return '冻结';
					break;
				case '30':
					return '销户';
					break;
				default:
					return '';
			}
}

function userStatus(str){
			switch(str){
				case '10':
					return '注册';
					break;
				case '20':
					return '分配';
					break;
				case '90':
					return '注销';
					break;
				default:
					return '';
			}
}


function  setChancPhase(str){
			switch(str){
					case '10':
						return '机会确认';
						break;
					case '20':
						return '技术选型';
						break;
					case '30':
						return '商务谈判';
						break;
					case '40':
						return '签订合同';
						break;
					
					default:
						return '';
		}
}

function  setChancSrc(str){
			switch(str){
					case '10':
						return '展会';
						break;
					case '20':
						return '联络';
						break;
					case '30':
						return '广告';
						break;
					case '90':
						return '其他';
						break;
					
					default:
						return '';
		}
}

//行动结论
function  setResult(str){
			switch(str){
					case '10':
						return '待定';
						break;
					case '20':
						return '成功';
						break;
					case '30':
						return '失败';
						break;
					default:
						return '';
		}
}
//行动状态
function  setStatus(str){
			switch(str){
					case '10':
						return '计划';
						break;
					case '20':
						return '执行';
						break;
					case '30':
						return '完成';
						break;
					case '40':
						return '已评';
						break;
					default:
						return '';
		}
}
//行动方式
function  setMode(str){
			switch(str){
					case '10':
						return '电话';
						break;
					case '20':
						return '邮件';
						break;
					case '30':
						return '拜访';
						break;
					case '50':
						return '短信';
						break;
					case '51':
						return '微信';
						break;
					case '52':
						return 'QQ';
						break;
					default:
						return '';
		}
}
//行动类

function  setTrcType(str){
			switch(str){
					case '10':
						return '客户联络';
						break;
					case '20':
						return '机会跟进';
						break;
					default:
						return '';
		}
}

function  ctmStatus(str){
			switch(str){
					case '10':
						return '有效';
						break;
					case '20':
						return '无效';
						break;
					default:
						return '-';
		}
}


//机会状态
function  setChncStatus(str){
			switch(str){
					case '10':
						return '录入';
						break;
					case '20':
						return '确认';
						break;
					case '30':
						return '跟进';
						break;
					case '40':
						return '关闭';
						break;
					default:
						return '';
		}
}

//机会结论
function  setChncResult(str){
			switch(str){
					case '10':
						return '待定';
						break;
					case '20':
						return '放弃';
						break;
					case '30':
						return '成功';
						break;
					case '40':
						return '失败';
						break;
					default:
						return '';
		}
}
//产品状态
function  setProdStatus(str){
			switch(str){
					case '10':
						return '有效';
						break;
					case '20':
						return '失效';
						break;
					default:
						return '';
		}
}
//产品分类
function  setProdCategory(str){
			switch(str){
					case '10':
						return '软件';
						break;
					case '20':
						return '实施';
						break;
					case '30':
						return '租赁';
						break;
					case '40':
						return '咨询';
						break;
					case '90':
						return '其他';
						break;
					default:
						return '';
		}
}



