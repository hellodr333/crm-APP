window.onload=function(){
	
	var oAdminMobile=document.getElementById('adminMobile');
	var oAdminName=document.getElementById('adminName');
	var oAdminPsword=document.getElementById('adminPsword');
	var oAdminMail=document.getElementById('adminMail');
	var oAdminPsword2=document.getElementById('adminPsword2');
	var oAdminOrgName=document.getElementById('adminOrgName');
	var addBlock=document.getElementById('addUser');
	var oSubmit=document.getElementById('submit');
	var aText = document.getElementsByTagName("input");
	
	oAdminMobile.focus();	
	for(var i=0;i<aText.length;i++){
		var re=reDataJson[aText[i].name];
		if(re){
			(function(re){
				aText[i].onblur=function(){
					check(this,re);
				}
			})(re)
		}		
	};
	
//	----------------------------------------------------------------------------------------------------------------------
//	-----------------------------------------再次输入密码是否一致校验------------------------------------------
	oAdminPsword2.onfocus=function(){
		if(oAdminPsword.value==''){
			this.parentNode.parentNode.className='reg-listHas2 ';
		}
	};
//	
//	----------------------------------------------------------------------------------------------------------------------
//	-----------------------------------------密码重复校验------------------------------------------------------------
	oAdminPsword2.onkeyup=function(){
		if(oAdminPsword.value==''){
			oAdminPsword.parentNode.parentNode.className='reg-listHas';	
		}else if((reDataJson.psword).test(oAdminPsword.value)){
			if((oAdminPsword2.value==oAdminPsword.value)){
				this.parentNode.parentNode.className='reg-listOk2 ';
			}else{
				this.parentNode.parentNode.className='reg-listHas2 ';
			}		
		}
	};

	
//	----------------------------------------------------------------------------------------------------------------------
//	-----------------------------------------封装校验方法------------------------------------------------------------
	function check(obj,re){
//				if(obj.value=='' ){
//					obj.parentNode.parentNode.className=' reg-listHas';
//					return false;
//				}else if(re.test(obj.value)){
//					obj.parentNode.parentNode.className='reg-listOk';
//					return true;
//				}else {
//					obj.parentNode.parentNode.className=' reg-listErr';
//					return false;
//				}	
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
	
	
//	----------------------------------------------------------------------------------------------------------------------
//	-----------------------------------------提交信息校验方法------------------------------------------------------
		oSubmit.onclick=function(){
			var ok=true;
			for(var i=0;i<aText.length;i++){
				var re=reDataJson[aText[i].name];
				if(re){
						if(check(aText[i],re)==false){
							ok=false;
						}
				}
			}
			if(!ok){
				addBlock.style.display='block';
				addBlock.getElementsByTagName("h4")[0].innerHTML="请输入完整的信息"
			}else if(ok){
				if(oAdminPsword2.value==oAdminPsword.value){
					var adminData={};
					 adminData={
							'adminMobile':oAdminMobile.value,
							'adminName':oAdminName.value,
							'adminPsword':oAdminPsword.value,
							'adminMail':oAdminMail.value,
							'adminOrgName':oAdminOrgName.value
							};

					 console.log(adminData);						
//					options=>url, data, type, time, success, error	
						ajax({
							'url':'/'+app+'/lgn/reg',
							'data':adminData,
							'type':'post',
							'success':function(str){
								var json=eval('('+str+')')
								console.log(json)
								if(json.responseCode=='0'){
									document.cookie="entName="+ escape(oAdminOrgName.value) +";path=/";
									document.cookie="user="+ escape(oAdminName.value) +";path=/";
									var strLimit = '{';
									for(var i=0; i<json.responseData.length; i++){
										strLimit += '"'
										strLimit += json.responseData[i].ac +'":{'
										for(var j=0; j<json.responseData[i].cs.length; j++){
											strLimit +=	'"'+json.responseData[i].cs[j].ac+'":{'
											for(var x=0; x<json.responseData[i].cs[j].cs.length; x++){
												strLimit += '"'+x+'":"'+ json.responseData[i].cs[j].cs[x].ac+'"';
												if(x!=json.responseData[i].cs[j].cs.length-1){
													strLimit += ','
													}
												}
											strLimit += '}'
											if(j!=json.responseData[i].cs.length-1){
												strLimit += ','
												}
											}
										strLimit += '}'
										if(i!=json.responseData.length-1){
											strLimit += ','
											}
										}
									strLimit += '}'
									document.cookie="userLimit="+ escape(strLimit) +";path=/";
									window.location.href="../crm/index_crm/index_crm.html";
								}else{
									alert('注册失败')
								}
							}					
						})
				}else if(oAdminPsword2.value!=oAdminPsword.value){
					addBlock.style.display='block';
					addBlock.getElementsByTagName("h4")[0].innerHTML="密码不一致"
				}	
			}											
		}
				

		
		
		
		
		
		
		
	
}