
window.onload=function(){
		var oSetNewPs=document.getElementById('setNewPs');
		var oNewPassword=document.getElementById('newPassword');
		var oConfirm=document.getElementById('confirm');
		var oCancel=document.getElementById('cancel');
		var aText = document.getElementsByTagName("input");
		
		oSetNewPs.focus();	
		for(var i=0;i<aText.length;i++){
			var re=reDataJson[aText[i].name];
			if(re){
				(function(re){
					aText[i].onblur=function(){
						check(this,re)
					}
				})(re)
			}
		}
		
//		----------------------------------------------------------------------------------------------------------------------
//		-----------------------------------------密码重复校验------------------------------------------------------------
		oNewPassword.onkeyup=function(){
			if(oSetNewPs.value==''){
				oNewPassword.parentNode.parentNode.className=' reg-listHas2';
			}else if(oSetNewPs.value!=''){
				if((oNewPassword.value==oSetNewPs.value) && check(oSetNewPs, reDataJson.setNewPs)){
					oNewPassword.parentNode.parentNode.className='reg-listOk2 ';
				}else{
					oNewPassword.parentNode.parentNode.className='reg-listHas ';
				}		
			}
		};

		
		function check(obj,re){
				if(re.test(obj.value)){
					obj.parentNode.parentNode.className='reg-listOk';
					return true;
				}else if(obj.value==''&& !re.test(obj.value)){
					obj.parentNode.parentNode.className=' reg-listHas';
					return false;
				}else{
					obj.parentNode.parentNode.className=' reg-listErr';
					return false;
				}
	}
	
//		确认按钮
		oConfirm.onclick=function(){
			var check_ps=check(oSetNewPs, reDataJson.setNewPs);
			var check_repeatPs=check(oNewPassword, reDataJson.newPassword);
			if(check_ps &&oNewPassword.value!=oSetNewPs.value){
				oNewPassword.parentNode.parentNode.className=' reg-listHas2 ';
			}
			if(check_ps && check_repeatPs && (oNewPassword.value==oSetNewPs.value)){
				ajax({
					'url':'/xprojnet/lgn/fpr',
					'data':{
						'loginMobile':localStorage['loginMobile'],
						'newPassword':oNewPassword.value
					},
					'type':'post',
					'success':function(str){
						var json=eval('('+str+')');
						console.log(json);
						if(json.responseCode=='0'){
							window.location.href="../index/index.html";
						}else{
							alert('注册失败')
						}
					}					
				
				})
			}
		}
		
		oCancel.onclick=function(){
			oNewPassword.value='';
			oSetNewPs.value='';
			oSetNewPs.focus();	
			oSetNewPs.parentNode.parentNode.className=' ';
			oNewPassword.parentNode.parentNode.className=' ';
		};
		
		
}