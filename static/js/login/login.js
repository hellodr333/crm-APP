
window.onload=function(){

			var    oLoginMobile=document.getElementById('loginMobile');
			var    oLoginPs=document.getElementById('loginPs');
			var    oLoginBtn=document.getElementById('loginBtn');
			var    oTipLi=document.getElementById('tipLi').children[0];
			var    oLoginEntbox=document.getElementById('loginEntbox');
			var name = '';
			oLoginMobile.focus();			
			check(oLoginMobile,reDataJson.U_TL_MOBILE);
			check(oLoginPs,reDataJson.psword);
				
//			--------------------------------------------------------------------------------------------------------------------
//			-----------------------------------------封装校验函数------------------------------------------	--------------				
			function check(obj,re){
				obj.onblur=function(){
					if(re.test(obj.value)){
					oTipLi.className='';			
					return true;
					}else{
						oTipLi.className='on';
						oTipLi.innerHTML='手机号或密码输入不正确';
						return false;
					}	
				};
				if(re.test(obj.value)){
					return true;
				}else{
					return false;
				}
			}			
			
//			---------------------------------------------------------------------------------------------------------------------
//			-----------------------------------------登陆按钮点击校验----------------------------------------------------				
			oLoginBtn.onclick=function(){				
				var ok_phone=check(loginMobile,reDataJson.U_TL_MOBILE);
				var ok_ps=check(loginPs,reDataJson.psword);
				 if(! ok_phone){
					oTipLi.className='on';
					alert('手机号格式输入不正确');
					return false;
				}else if( ! ok_ps){
					oTipLi.className='on';
					alert('请输入6位数字的密码');
					return false;
				}else if(! ok_phone &&  ! ok_ps){
					return false;
				}else if(ok_phone && ok_ps){
					
					var json={'loginMobile':oLoginMobile.value,'loginPs':oLoginPs.value};
					ajax({
						'url':'/'+app+'/lgn/lgn',
						'data':json,
						'type':'post',
						'success':function(str){
							var json=eval('('+str+')')
							document.cookie="user="+ escape(json.resv1str) +";path=/";
							
							if(json.resv1lng=='0'){
								alert('登陆失败')
							}else if(json.resv1lng=='1'){
								name =escape(json.resv3str);
								document.cookie="entName="+ escape(name) +";path=/";
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
							}else if(json.resv1lng > '1'){
								$("#loginBtn").attr("disabled","disabled");
								oLoginEntbox.style.display="";
								var dthtml='';
								var userID=json.responseData[0].userId;
								for (var ii = 0; ii < json.responseData.length; ii++) {	
								dthtml += '<option value="'+json.responseData[ii].id +'">';
								dthtml += json.responseData[ii].name;
								dthtml += '</option>'; 
								
								}
								$("#checkEnt").after(dthtml);

									$("#loginEnt").change(function(){
										
										name = $(this).find("option:selected").text();
										document.cookie="entName="+ escape(name) +";path=/";
										if($("#loginEnt").val()!="请选择企业"){
								         var entprise_id=$(this).val();
								         
										 ajax({
											  type: 'POST',
											  data: {
												  entId:$(this).val(),
												  userId:userID
											  },
											  url: '/'+app+'/lgn/rln',
											  success:function(str){
												  console.log(str)
												  var json=eval('('+str+')')
												 if(json.responseCode=="0"){
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
												  }
											  }
										     })
										}
									}) 
							
							}
						}					
					})
				}
				
			}
			
			
			
}
