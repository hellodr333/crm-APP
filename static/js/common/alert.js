
//	确认提示
	function makeSure(id,str){
		$('#'+id).html(' <h3 class="alert fade in hide text-center"   id="box" style="width:400px ;position:fixed;left:50%;top:200px;margin-left:-200px;z-index:200000;padding:30px 50px;font-size:20px;">'+str+'</h3>')
			$('#box').show();	
		
		setTimeout(function(){
			$('#box').hide('1000');
		},800)
		
		
		/*	//	确认关闭按钮
			$(document).delegate(".sureClose",'click',function(){
				$(this).parent().hide();
			})*/
	}
	
	
//提交提示
    
	function makeSub(id,str){
		$('#'+id).html(' <h3 class="alert fade in hide text-center"   id="box1" style="width:400px ;position:fixed;left:50%;top:200px;margin-left:-200px;z-index:200000;padding:40px 60px;font-size:20px;">'+str+'<input type="button" value="确认"style=" margin-top:30px;margin-right:50px;color: rgb(255, 255, 255);background:#c09853" id="makeSure"><input type="button" value="取消" style="margin-top:30px;color: rgb(255, 255, 255);background:#c09853" id="makeNo"></h3>')
			$('#box1').show();	
		//确认关闭按钮
		
		
	}
	
	
	
/*	<button type="button"   class="sureClose close" style="position:absolute;left:80%;top:60px;z-index:200000;font-size:25px;">×</button>\*/