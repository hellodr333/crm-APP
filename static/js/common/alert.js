
//	确认提示
	function makeSure(id,str){
		$('#'+id).html(' <h3 class="alert fade in hide text-center"   id="box" style="width:400px ;position:absolute;left:50%;top:200px;margin-left:-200px;z-index:200000;padding:30px 50px;font-size:20px;">'+str+'</h3>')
			$('#box').show();	
		
		setTimeout(function(){
			$('#box').hide('1000');
		},800)
		
		
		/*	//	确认关闭按钮
			$(document).delegate(".sureClose",'click',function(){
				$(this).parent().hide();
			})*/
	}
	
	
/*	<button type="button"   class="sureClose close" style="position:absolute;left:80%;top:60px;z-index:200000;font-size:25px;">×</button>\*/