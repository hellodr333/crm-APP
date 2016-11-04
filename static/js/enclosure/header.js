function logout(){
	var expires = new Date();
	expires.setTime(expires.getTime() - 1000);
	document.cookie = "entName=;path=/;expires=" + expires.toGMTString() + "";
	document.cookie = "user=;path=/;expires=" + expires.toGMTString() + ""; 
	document.cookie = "userLimit=;path=/;expires=" + expires.toGMTString() + ""; 
	
	$.ajax({
			  type: 'POST',
			  url: "/xprojnet/lgn/out",
		      data: {},
			  success: function(str){
					if(str.responseCode==0){
						}else{
							alert("退出失败！")
							}
					
			  }
			});
}
function getCookie(name){
		var value="";
		var cookie = ";"+document.cookie.replace(/;\s+/g,";")+";"
		var pos = cookie.indexOf(";"+name+"=");
		if(pos>-1){
		var start = cookie.indexOf("=",pos);
		var end = cookie.indexOf(";",start);
		value = unescape(cookie.substring(start+1,end));
		}
		return value;
 }

$(function(){
	var hhtml="";
	hhtml+="<div class='span2 pull-left logo clearfix'>";
	//hhtml+="<img src='../static/images/myluban-logo.png'>";
	hhtml+="<a class='brand'>"+ unescape(getCookie("entName")) +"</a>";
	hhtml+="</div>";
	hhtml+='<ul class="nav nav-pills head" id="navBar">\
			  <li limit="EOA" class="hide"><a href="../../xxx/index/index.html" id="xxx">OA</a></li>\
			  <li limit="CRM" class="active hide"><a href="../../crm/index_crm/index_crm.html" id="crm">CRM</a></li>\
			  <li limit="PRJ" class="hide"><a href="../../xxx/index/index.html" id="xxx">项目</a></li>\
			  <li limit="SET" class="hide"><a href="../../mng/index_set/index_set.html" id="mng">设置</a></li>\
			</ul>';
	hhtml+="<ul class='nav pull-right head'>";
	hhtml+='<li><a>用户 [ '+ unescape(getCookie("user"))  +' ] ,欢迎登入！</a></li>';
	hhtml+='<li><a href="../../login/user.html">设置</a></li>';
	hhtml+='<li><a onclick="logout()" href="../../login/login.html">退出登入</a></li>';
	hhtml+="</ul>";

	$(".navbar").html(hhtml);
	
    var fhtml="";
    
    fhtml+="<div class='copyright w_1366'>鲁班软件版权所有 ©2010-2012</div>";
    
    $(".foot").html(fhtml);
})
$(function(){
	
		$("#navBar li").removeClass("active")
		
		$("#navBar li").each(function(index){
			if(window.location.href.indexOf($(this).find("a").attr("id"))!=-1){
				$(this).addClass("active")
			}
		})
})
var jsonstr = unescape(getCookie("userLimit"));
if(jsonstr){
	var jsonlimit =JSON.parse(jsonstr);
	$(function(){
		for(var key in jsonlimit){
			$('#navBar li[limit="'+ key +'"]').removeClass("hide")
			}
		})
	}
