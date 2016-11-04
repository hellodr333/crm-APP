
window.onload=function(){
	var oLoginMobile=document.getElementById('loginMobile');
	var oSendYZM=document.getElementById('sendYZM');
	var oFillYZM=document.getElementById('fillYZM');
	var oConfirm=document.getElementById('confirm');
	var oCancel=document.getElementById('cancel');
	var oResendPswd=document.getElementById('resendPswd');
	var oYzmRe=document.getElementById('yzmRe');
	var oCheckError=document.getElementById('checkError');
	var timer=null;
	
	
	oLoginMobile.focus();
	oFillYZM.disabled=true;

	oLoginMobile.onkeyup=oLoginMobile.onfocus=function(){
		 if((reDataJson.U_TL_MOBILE).test(oLoginMobile.value)){
			oCheckError.className="ok1";
			oCheckError.innerHTML="";
			oSendYZM.disabled=false;
			return true;
		}else{
			oCheckError.className="on";
			oCheckError.innerHTML="请输入正确手机格式";
			oSendYZM.disabled=true;
		}
	}
	
	
//	发送验证码
	oSendYZM.onclick=function(){
		if(oLoginMobile.value==undefined || oLoginMobile.value==''){
			oSendYZM.disabled=true;
			oCheckError.className="on";
			oCheckError.innerHTML="请输入正确手机格式";
			return false;
		}
		
		ajax({
			'url':'/xprojnet/lgn/fps',
			'data':{
				'loginMobile':oLoginMobile.value
			},
			'type':'post',
			'success':function(str){
				var json=eval('('+str+')');
				console.log(json);
				if(json.responseCode=='0'){
					console.log('验证码发送成功');
				}else{
					alert('验证码发送失败');
				}
			}					
		});
		
		oFillYZM.disabled=false;
		oFillYZM.focus();
		oResendPswd.className='widthHolder';
		this.disabled=true;
		this.innerHTML="还剩余60秒";
		var count=60;
		    timer=setInterval(function(){
			count--;
			oSendYZM.innerHTML="还剩余"+count+"秒";
			if(count==0){
				clearInterval(timer);
				oSendYZM.innerHTML="点击重新发送验证码";
				oFillYZM.disabled=true;
				oSendYZM.disabled=false;
			}
		},1000)
	}

	
//	填写验证码
	oFillYZM.onkeyup=function(){
		if(!reDataJson.YZM.test(this.value)){
			oYzmRe.className='widthHolder';
		}else{
			oYzmRe.className='widthHolder error';
		}
	};
	
//确认
	oConfirm.onclick=function(){
		if(oLoginMobile.value==''){
			oCheckError.className="on";
			oCheckError.innerHTML="请输入正确手机格式";
			oSendYZM.disabled=true;
			return false;
		}else if(oFillYZM.value==''){
			return false;
		}else if ((reDataJson.U_TL_MOBILE).test(oLoginMobile.value) && (reDataJson.YZM).test(oFillYZM.value) ){
//			存用户名
			localStorage.loginMobile=oLoginMobile.value;

			var count=0;
			ajax({
				'url':'/xprojnet/lgn/fpt',
				'data':{
					'loginMobile':oLoginMobile.value,
					'loginYZM':oFillYZM.value
				},
				'type':'post',
				'success':function(str){
					var json=eval('('+str+')');
					console.log(json);
					if(json.responseCode=='0'){
						window.location.href="../login/set_password.html";
					}else{
						alert('验证码输入错误')
					}
//					count++;
//					if(count==2){
//						
//					}
				}					
			});
			
		}
	};
	
//	取消
	oCancel.onclick=function(){
		window.location.href="../login/login.html";
	};
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
}