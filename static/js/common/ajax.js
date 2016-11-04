// JavaScript Document

//options=>url, data, type, time, success, error
function ajax(options){
	//参数——可选
	options=options||{};
	options.data=options.data||{};
	options.type=options.type||'get';
	options.time=options.time||0;
	
	//
	var arr=[];
	for(var name in options.data){
		arr.push(name+'='+encodeURIComponent(options.data[name]));
	}
	var sData=arr.join('&');
	
	//ajax——创建
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHttp');
	}
	
	//ajax——连接
	//ajax——发送
	if(options.type=='get'){
		oAjax.open('get', options.url+'?'+sData, true);
		oAjax.send();
	}else{
		oAjax.open('post', options.url, true);
		oAjax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		oAjax.send(sData);
	}
	
	//ajax——接收
	oAjax.onreadystatechange=function (){
		if(oAjax.readyState==4){
			if(
				(oAjax.status>=200 && oAjax.status<300) ||
				oAjax.status==304
			){
				options.success && options.success(oAjax.responseText);
			}else{
				options.error && options.error();
			}
		}
	};
	
	//超时
	if(options.time){
		setTimeout(function (){
			oAjax.abort();
		}, options.time);
	}
}









